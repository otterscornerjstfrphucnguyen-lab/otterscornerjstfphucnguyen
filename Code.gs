/*
=========================================================
 OTTER'S CORNER — GOOGLE APPS SCRIPT
 PHÚC NGUYÊN
=========================================================

MỤC ĐÍCH:

Website CHỈ nhận:

1. Họ và tên
2. Lời chúc

Các thông tin khác KHÔNG được gửi về website:

- Email
- Số điện thoại
- Facebook / Instagram / Threads
- Số tiền donate
- Bill chuyển khoản

=========================================================
*/


/*
=========================================================
 GOOGLE SHEET
=========================================================
*/

const SHEET_ID =
  "1_f4yFSaR9QrMNIUk8iA0Maw4C2Z2-S25vRwS6qaQaiw";


const SHEET_NAME =
  "Câu trả lời biểu mẫu 1";


/*
=========================================================
 API
=========================================================
*/

function doGet() {

  const result =
    getPublicWishes();


  return ContentService

    .createTextOutput(
      JSON.stringify(result)
    )

    .setMimeType(
      ContentService.MimeType.JSON
    );

}


/*
=========================================================
 LẤY DỮ LIỆU CÔNG KHAI
=========================================================
*/

function getPublicWishes() {

  const sheet =
    SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_NAME);


  if (!sheet) {

    throw new Error(
      "Không tìm thấy sheet: " +
      SHEET_NAME
    );

  }


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (
    values.length < 2
  ) {

    return [];

  }


  /*
    Hàng đầu tiên
    = tiêu đề Google Form
  */

  const headers =
    values[0].map(
      normalizeHeader
    );


  /*
    Tìm cột Họ và Tên
  */

  const nameIndex =
    findHeader(
      headers,
      [
        "họ và tên",
        "ho va ten",
        "họ tên",
        "ho ten"
      ]
    );


  /*
    Tìm cột lời chúc
  */

  const wishIndex =
    findHeader(
      headers,
      [

        "hãy gửi một lời chúc tốt lành đến phúc nguyên để thắp sáng một vì sao trên bầu trời bạn nhé",

        "lời chúc",

        "loi chuc"

      ]
    );


  /*
    FALLBACK

    Theo sheet bạn đã gửi:

    B = Họ và Tên
    H = Lời chúc

    Javascript bắt đầu từ 0:

    B = index 1
    H = index 7
  */

  const safeNameIndex =
    nameIndex >= 0
      ? nameIndex
      : 1;


  const safeWishIndex =
    wishIndex >= 0
      ? wishIndex
      : 7;


  const result = [];


  /*
    Đọc từng dòng
  */

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    const row =
      values[i];


    const name =
      cleanText(
        row[safeNameIndex]
      );


    const message =
      cleanText(
        row[safeWishIndex]
      );


    /*
      Chỉ tạo sao khi:

      có tên
      +
      có lời chúc
    */

    if (
      !name ||
      !message
    ) {

      continue;

    }


    /*
      QUAN TRỌNG:

      Chỉ push 2 trường.

      Không push các dữ liệu riêng tư.
    */

    result.push({

      name:
        name,

      message:
        message

    });

  }


  return result;

}


/*
=========================================================
 CHUẨN HÓA HEADER
=========================================================
*/

function normalizeHeader(
  value
) {

  return String(
    value || ""
  )

    .trim()

    .toLowerCase()

    .normalize(
      "NFD"
    )

    .replace(
      /[\u0300-\u036f]/g,
      ""
    )

    .replace(
      /\s+/g,
      " "
    );

}


/*
=========================================================
 TÌM HEADER
=========================================================
*/

function findHeader(
  headers,
  candidates
) {

  const normalizedCandidates =
    candidates.map(
      normalizeHeader
    );


  /*
    Tìm chính xác trước
  */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      normalizedCandidates
        .includes(
          headers[i]
        )
    ) {

      return i;

    }

  }


  /*
    Nếu không có,
    tìm gần đúng.
  */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      normalizedCandidates.some(
        candidate =>
          headers[i].includes(
            candidate
          ) ||
          candidate.includes(
            headers[i]
          )
      )
    ) {

      return i;

    }

  }


  return -1;

}


/*
=========================================================
 CLEAN TEXT
=========================================================
*/

function cleanText(
  value
) {

  return String(
    value || ""
  )
    .trim()
    .slice(
      0,
      5000
    );

}
