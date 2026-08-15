/************************************************************
 * OTTER'S CORNER × PHÚC NGUYÊN
 * GOOGLE APPS SCRIPT
 *
 * Chức năng:
 * 1. Đọc lời chúc từ Google Sheet
 * 2. Chỉ public HỌ TÊN + LỜI CHÚC
 * 3. Không public email / số tiền / thông tin riêng tư
 * 4. Frontend GitHub gọi API ?action=wishes
 ************************************************************/


/* =========================================================
   CẤU HÌNH
========================================================= */


/*
 * ID Google Sheet của bạn
 */
const SPREADSHEET_ID =
  "1z0Cvoltb0STKUVKDeYnIQfkzhRyT7CsSreyg_638dt4";


/*
 * GID của sheet câu trả lời
 */
const SHEET_GID =
  1010577208;


/*
 * Tên câu hỏi lời chúc.
 *
 * Script sẽ tìm header có chữ
 * "lời chúc" / "chúc" / tương tự.
 */
const WISH_HEADER_KEYWORDS = [
  "hãy gửi một lời chúc",
  "lời chúc",
  "lời nhắn",
  "wish"
];


/*
 * Các tên cột có thể chứa tên người gửi.
 */
const NAME_HEADER_KEYWORDS = [
  "họ và tên",
  "họ tên",
  "tên",
  "name"
];


/* =========================================================
   WEB APP
========================================================= */

function doGet(e) {

  const action =
    e &&
    e.parameter &&
    e.parameter.action
      ? e.parameter.action
      : "wishes";


  if (action === "wishes") {

    return jsonResponse({
      success: true,
      wishes: getPublicWishes()
    });

  }


  return jsonResponse({
    success: true,
    message:
      "Otter's Corner × Phúc Nguyên API is running."
  });

}


/* =========================================================
   LẤY SHEET
========================================================= */

function getResponseSheet() {

  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  const sheets =
    spreadsheet.getSheets();


  /*
   * Ưu tiên tìm đúng GID.
   */
  for (
    let i = 0;
    i < sheets.length;
    i++
  ) {

    if (
      sheets[i].getSheetId() ===
      Number(SHEET_GID)
    ) {

      return sheets[i];

    }

  }


  /*
   * Nếu không tìm thấy GID,
   * dùng sheet đầu tiên.
   */
  return sheets[0];

}


/* =========================================================
   TÌM CỘT
========================================================= */

function normalizeText(text) {

  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

}


function findColumnIndex(
  headers,
  keywords
) {

  const normalizedHeaders =
    headers.map(normalizeText);


  for (
    let i = 0;
    i < normalizedHeaders.length;
    i++
  ) {

    for (
      let j = 0;
      j < keywords.length;
      j++
    ) {

      const keyword =
        normalizeText(
          keywords[j]
        );


      if (
        normalizedHeaders[i]
          .includes(keyword)
      ) {

        return i;

      }

    }

  }


  return -1;

}


/* =========================================================
   ĐỌC LỜI CHÚC
========================================================= */

function getPublicWishes() {

  try {

    const sheet =
      getResponseSheet();


    if (!sheet) {
      return [];
    }


    const lastRow =
      sheet.getLastRow();

    const lastColumn =
      sheet.getLastColumn();


    /*
     * Chưa có dữ liệu
     */
    if (
      lastRow < 2 ||
      lastColumn < 1
    ) {

      return [];

    }


    const values =
      sheet
        .getRange(
          1,
          1,
          lastRow,
          lastColumn
        )
        .getDisplayValues();


    const headers =
      values[0];


    const nameColumn =
      findColumnIndex(
        headers,
        NAME_HEADER_KEYWORDS
      );


    const wishColumn =
      findColumnIndex(
        headers,
        WISH_HEADER_KEYWORDS
      );


    /*
     * Nếu không tìm thấy cột lời chúc,
     * không trả dữ liệu riêng tư.
     */
    if (wishColumn === -1) {

      return [];

    }


    const result = [];


    /*
     * Đọc từ dòng 2.
     */
    for (
      let row = 1;
      row < values.length;
      row++
    ) {

      const wish =
        String(
          values[row][wishColumn] || ""
        ).trim();


      /*
       * Không có lời chúc -> bỏ qua.
       */
      if (!wish) {
        continue;
      }


      let name =
        "Một người thương mến";


      if (
        nameColumn !== -1
      ) {

        const sheetName =
          String(
            values[row][nameColumn] || ""
          ).trim();


        if (sheetName) {
          name = sheetName;
        }

      }


      /*
       * CHỈ trả về:
       * - name
       * - wish
       *
       * Không trả:
       * - email
       * - timestamp
       * - số tiền
       * - câu trả lời khác
       * - thông tin riêng tư
       */
      result.push({

        id:
          row,

        name:
          cleanPublicText(name),

        wish:
          cleanPublicText(wish)

      });

    }


    return result;

  } catch (error) {

    console.error(
      error
    );

    return [];

  }

}


/* =========================================================
   LÀM SẠCH TEXT
========================================================= */

function cleanPublicText(text) {

  return String(text || "")
    .replace(
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(
      /<[^>]*>/g,
      ""
    )
    .trim();

}


/* =========================================================
   JSON RESPONSE
========================================================= */

function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}


/* =========================================================
   TEST
========================================================= */

function testWishes() {

  const wishes =
    getPublicWishes();


  console.log(
    JSON.stringify(
      wishes,
      null,
      2
    )
  );

}
