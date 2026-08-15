/**************************************************************
 * OTTER'S CORNER — PHÚC NGUYÊN
 * GOOGLE APPS SCRIPT API
 *
 * API:
 * /exec?action=wishes
 *
 * Website chỉ nhận:
 * - họ và tên
 * - lời chúc
 *
 * Không trả về:
 * - email
 * - timestamp
 * - số tiền donate
 * - thông tin riêng tư khác
 **************************************************************/


/* ============================================================
   CONFIG
============================================================ */

const SPREADSHEET_ID =
  "1z0Cvoltb0STKUVKDeYnIQfkzhRyT7CsSreyg_638dt4";


const SHEET_GID =
  1010577208;


/*
 * Tên câu hỏi lời chúc trong Google Form.
 *
 * Script sẽ tìm gần đúng theo từ khóa,
 * nên không cần phải giống 100%.
 */
const WISH_KEYWORDS = [
  "lời chúc",
  "chúc tốt lành",
  "thắp sáng một vì sao"
];


/*
 * Tên người.
 */
const NAME_KEYWORDS = [
  "họ và tên",
  "họ tên",
  "tên"
];


/* ============================================================
   WEB APP
============================================================ */

function doGet(e) {

  try {

    const action =
      e &&
      e.parameter &&
      e.parameter.action
        ? String(e.parameter.action)
        : "wishes";


    if (action === "wishes") {

      return jsonResponse(
        getPublicWishes()
      );

    }


    return jsonResponse({

      success: false,

      error:
        "Action không hợp lệ."

    });


  } catch (error) {

    return jsonResponse({

      success: false,

      error:
        error.message || String(error)

    });

  }

}


/* ============================================================
   GET PUBLIC WISHES
============================================================ */

function getPublicWishes() {

  const sheet =
    getResponseSheet();


  if (!sheet) {

    throw new Error(
      "Không tìm thấy sheet câu trả lời Google Form."
    );

  }


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (
    !values ||
    values.length < 2
  ) {

    return {

      success: true,

      wishes: []

    };

  }


  const headers =
    values[0].map(
      value =>
        normalizeText(value)
    );


  const nameIndex =
    findColumnIndex(
      headers,
      NAME_KEYWORDS
    );


  const wishIndex =
    findColumnIndex(
      headers,
      WISH_KEYWORDS
    );


  /*
   * Nếu không tìm được cột lời chúc,
   * trả về lỗi rõ ràng.
   */

  if (wishIndex === -1) {

    throw new Error(
      "Không tìm thấy cột chứa lời chúc trong Sheet."
    );

  }


  const wishes = [];


  for (
    let row = 1;
    row < values.length;
    row++
  ) {

    const current =
      values[row];


    const wish =
      String(
        current[wishIndex] || ""
      ).trim();


    if (!wish) {
      continue;
    }


    let name = "";


    if (nameIndex !== -1) {

      name =
        String(
          current[nameIndex] || ""
        ).trim();

    }


    /*
     * Không trả timestamp.
     * Không trả email.
     * Không trả tiền.
     * Không trả các câu trả lời khác.
     */

    wishes.push({

      name:
        name || "Một người bạn",

      wish:
        wish

    });

  }


  return {

    success: true,

    wishes: wishes

  };

}


/* ============================================================
   FIND RESPONSE SHEET BY GID
============================================================ */

function getResponseSheet() {

  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  const sheets =
    spreadsheet.getSheets();


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
   * Nếu GID không còn đúng,
   * lấy sheet đầu tiên để tránh API chết hoàn toàn.
   */

  if (sheets.length > 0) {

    return sheets[0];

  }


  return null;

}


/* ============================================================
   FIND COLUMN
============================================================ */

function findColumnIndex(
  headers,
  keywords
) {

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    const header =
      headers[i];


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
        header.includes(keyword)
      ) {

        return i;

      }

    }

  }


  return -1;

}


/* ============================================================
   NORMALIZE VIETNAMESE TEXT
============================================================ */

function normalizeText(text) {

  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /đ/g,
      "d"
    )
    .trim();

}


/* ============================================================
   JSON RESPONSE
============================================================ */

function jsonResponse(data) {

  return ContentService

    .createTextOutput(
      JSON.stringify(data)
    )

    .setMimeType(
      ContentService.MimeType.JSON
    );

}
