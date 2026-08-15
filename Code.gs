/************************************************************
 * OTTER'S CORNER × PHÚC NGUYÊN
 *
 * GOOGLE APPS SCRIPT BACKEND
 *
 * Chức năng:
 * 1. Đọc Google Sheet câu trả lời.
 * 2. CHỈ trả về:
 *      - Họ và tên
 *      - Lời chúc
 * 3. Không trả về email / số tiền / thông tin riêng tư khác.
 * 4. Hỗ trợ JSONP để GitHub Pages có thể đọc dữ liệu.
 ************************************************************/


/* =========================================================
   CONFIG
========================================================= */


/*
 * ID Google Sheet của bạn.
 *
 * Lấy từ link:
 *
 * docs.google.com/spreadsheets/d/
 * 1z0Cvoltb0STKUVKDeYnIQfkzhRyT7CsSreyg_638dt4
 *
 */

const SPREADSHEET_ID =
  "1z0Cvoltb0STKUVKDeYnIQfkzhRyT7CsSreyg_638dt4";


/*
 * GID sheet câu trả lời mà bạn đã gửi.
 */

const SHEET_GID =
  1010577208;


/*
 * Số lượng lời chúc tối đa trả về.
 *
 * Nếu có rất nhiều lời chúc,
 * website sẽ không bị quá nặng.
 */

const MAX_WISHES =
  250;


/* =========================================================
   WEB APP
========================================================= */


function doGet(e) {

  try {

    const wishes =
      getPublicWishes();


    const result = {

      success: true,

      wishes: wishes,

      updatedAt:
        new Date().toISOString()

    };


    /*
     * Nếu frontend gửi:
     *
     * ?callback=abc123
     *
     * thì trả JSONP.
     */

    const callback =
      e &&
      e.parameter &&
      e.parameter.callback;


    if (callback) {

      /*
       * Chặn callback không hợp lệ.
       */

      if (
        !/^[a-zA-Z_$][0-9a-zA-Z_$]*$/
          .test(callback)
      ) {

        return ContentService
          .createTextOutput(
            "Invalid callback"
          )
          .setMimeType(
            ContentService.MimeType.TEXT
          );

      }


      const json =
        JSON.stringify(result);


      return ContentService
        .createTextOutput(
          callback +
          "(" +
          json +
          ");"
        )
        .setMimeType(
          ContentService.MimeType.JAVASCRIPT
        );

    }


    /*
     * Nếu mở trực tiếp Apps Script URL
     * thì trả JSON bình thường.
     */

    return ContentService
      .createTextOutput(
        JSON.stringify(result)
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );


  } catch (error) {

    const result = {

      success: false,

      wishes: [],

      error:
        String(error)

    };


    const callback =
      e &&
      e.parameter &&
      e.parameter.callback;


    if (callback) {

      return ContentService
        .createTextOutput(
          callback +
          "(" +
          JSON.stringify(result) +
          ");"
        )
        .setMimeType(
          ContentService.MimeType.JAVASCRIPT
        );

    }


    return ContentService
      .createTextOutput(
        JSON.stringify(result)
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

}


/* =========================================================
   GET PUBLIC WISHES
========================================================= */


function getPublicWishes() {

  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  /*
   * Tìm sheet theo GID.
   */

  const sheets =
    spreadsheet.getSheets();


  let sheet = null;


  for (
    let i = 0;
    i < sheets.length;
    i++
  ) {

    if (
      sheets[i].getSheetId() ===
      SHEET_GID
    ) {

      sheet =
        sheets[i];

      break;

    }

  }


  /*
   * Nếu không tìm thấy GID,
   * dùng sheet đầu tiên.
   */

  if (!sheet) {

    sheet =
      sheets[0];

  }


  if (!sheet) {

    return [];

  }


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (
    !values ||
    values.length < 2
  ) {

    return [];

  }


  const headers =
    values[0]
      .map(
        h =>
          normalizeHeader(h)
      );


  /*
   * Tìm cột tên.
   */

  const nameColumn =
    findNameColumn(
      headers
    );


  /*
   * Tìm cột lời chúc.
   */

  const wishColumn =
    findWishColumn(
      headers
    );


  /*
   * Nếu không tìm thấy lời chúc
   * thì không trả dữ liệu.
   */

  if (
    wishColumn === -1
  ) {

    return [];

  }


  const wishes = [];


  /*
   * Duyệt từ dưới lên để lời chúc mới
   * xuất hiện gần vị trí trung tâm.
   */

  for (
    let rowIndex =
      values.length - 1;

    rowIndex >= 1;

    rowIndex--
  ) {

    const row =
      values[rowIndex];


    if (!row) {
      continue;
    }


    let name =
      "";


    let message =
      "";


    if (
      nameColumn >= 0
    ) {

      name =
        String(
          row[nameColumn] ||
          ""
        ).trim();

    }


    message =
      String(
        row[wishColumn] ||
        ""
      ).trim();


    /*
     * Không có lời chúc
     * thì không tạo sao.
     */

    if (!message) {

      continue;

    }


    /*
     * Bảo vệ dữ liệu public:
     *
     * Không trả:
     * email
     * số điện thoại
     * tiền donate
     * timestamp
     * bất kỳ cột nào khác.
     */

    wishes.push({

      name:
        sanitizePublicText(
          name,
          80
        ),

      message:
        sanitizePublicText(
          message,
          1200
        )

    });


    if (
      wishes.length >=
      MAX_WISHES
    ) {

      break;

    }

  }


  /*
   * Đảo lại để thứ tự từ cũ -> mới.
   */

  wishes.reverse();


  return wishes;

}


/* =========================================================
   FIND NAME COLUMN
========================================================= */


function findNameColumn(
  headers
) {

  const exactCandidates = [

    "ho va ten",

    "ho ten",

    "ten",

    "ten cua ban",

    "ho va ten cua ban",

    "ten nguoi gui",

    "ho ten nguoi gui"

  ];


  /*
   * Ưu tiên exact match.
   */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      exactCandidates.includes(
        headers[i]
      )
    ) {

      return i;

    }

  }


  /*
   * Sau đó tìm header có chứa
   * "ho va ten".
   */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      headers[i].includes(
        "ho va ten"
      )
    ) {

      return i;

    }

  }


  return -1;

}


/* =========================================================
   FIND WISH COLUMN
========================================================= */


function findWishColumn(
  headers
) {

  const candidates = [

    "hay gui mot loi chuc tot lanh den phuc nguyen de thap sang mot vi sao tren bau troi ban nhe",

    "loi chuc",

    "loi chuc den phuc nguyen",

    "gui loi chuc",

    "chuc phuc"

  ];


  /*
   * Exact.
   */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      candidates.includes(
        headers[i]
      )
    ) {

      return i;

    }

  }


  /*
   * Tìm bằng từ khóa.
   */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    const header =
      headers[i];


    if (
      header.includes(
        "loi chuc"
      ) &&
      (
        header.includes(
          "phuc nguyen"
        ) ||
        header.includes(
          "vi sao"
        )
      )
    ) {

      return i;

    }

  }


  /*
   * Fallback:
   *
   * nếu không nhận diện được,
   * tìm cột có "loi chuc".
   */

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      headers[i].includes(
        "loi chuc"
      )
    ) {

      return i;

    }

  }


  return -1;

}


/* =========================================================
   NORMALIZE HEADER
========================================================= */


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
      /đ/g,
      "d"
    )
    .replace(
      /[^a-z0-9]+/g,
      " "
    )
    .trim();

}


/* =========================================================
   SANITIZE
========================================================= */


function sanitizePublicText(
  value,
  maxLength
) {

  let text =
    String(
      value || ""
    )
      .trim()
      .slice(
        0,
        maxLength
      );


  /*
   * Không cho HTML/script
   * đi vào dữ liệu public.
   */

  text =
    text
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      );


  return text;

}


/* =========================================================
   TEST
========================================================= */


/*
 * Bạn có thể chạy hàm này trong Apps Script
 * để kiểm tra Sheet có đọc được hay không.
 */

function testGetPublicWishes() {

  const wishes =
    getPublicWishes();


  Logger.log(
    JSON.stringify(
      wishes,
      null,
      2
    )
  );

}
