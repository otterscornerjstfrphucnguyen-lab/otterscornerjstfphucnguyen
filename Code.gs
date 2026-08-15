/********************************************************
 * PHÚC NGUYÊN — A LITTLE STAR
 *
 * GOOGLE APPS SCRIPT
 *
 * Chức năng:
 * 1. Nhận lời chúc từ website
 * 2. Lưu vào Google Sheets
 * 3. Trả danh sách lời chúc cho website
 * 4. Hỗ trợ JSONP để GitHub đọc dữ liệu
 ********************************************************/


/* =====================================================
   CONFIG
===================================================== */

const SHEET_NAME = "LOI_CHUC";


/* =====================================================
   GET SPREADSHEET
===================================================== */

function getSpreadsheet() {

  /*
   * Nếu Apps Script được tạo trực tiếp
   * từ Google Sheet:
   *
   * SpreadsheetApp.getActiveSpreadsheet()
   *
   * sẽ lấy đúng file Sheet đang gắn với project.
   */

  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();


  if (!spreadsheet) {

    throw new Error(
      "Không tìm thấy Google Spreadsheet."
    );

  }


  return spreadsheet;

}


/* =====================================================
   GET / CREATE SHEET
===================================================== */

function getWishSheet() {

  const spreadsheet =
    getSpreadsheet();


  let sheet =
    spreadsheet.getSheetByName(
      SHEET_NAME
    );


  /*
   * Nếu chưa có sheet thì tự tạo.
   */

  if (!sheet) {

    sheet =
      spreadsheet.insertSheet(
        SHEET_NAME
      );

  }


  /*
   * Nếu sheet chưa có header
   * thì tạo header.
   */

  if (
    sheet.getLastRow() === 0
  ) {

    sheet.appendRow([
      "THỜI GIAN",
      "HỌ VÀ TÊN",
      "LỜI CHÚC",
      "MÀU SAO"
    ]);


    /*
     * Format header
     */

    const header =
      sheet.getRange(
        1,
        1,
        1,
        4
      );


    header.setFontWeight(
      "bold"
    );


    header.setBackground(
      "#dceeff"
    );


    header.setFontColor(
      "#21486c"
    );


    sheet.setFrozenRows(1);

  }


  return sheet;

}


/* =====================================================
   DO GET
===================================================== */

function doGet(e) {

  try {

    const params =
      e &&
      e.parameter
        ? e.parameter
        : {};


    const action =
      params.action ||
      "getWishes";


    let result;


    /*
     * -----------------------------------------
     * ADD WISH
     * -----------------------------------------
     */

    if (
      action === "addWish"
    ) {

      result =
        addWish(params);

    }


    /*
     * -----------------------------------------
     * GET WISHES
     * -----------------------------------------
     */

    else {

      result =
        getWishes();

    }


    /*
     * -----------------------------------------
     * JSONP
     * -----------------------------------------
     */

    const callback =
      params.callback;


    if (callback) {

      /*
       * Chỉ cho phép tên callback
       * dạng JS an toàn.
       */

      const safeCallback =
        String(callback)
          .replace(
            /[^a-zA-Z0-9_$]/g,
            ""
          );


      return ContentService
        .createTextOutput(
          safeCallback +
          "(" +
          JSON.stringify(result) +
          ")"
        )
        .setMimeType(
          ContentService
            .MimeType
            .JAVASCRIPT
        );

    }


    /*
     * Nếu mở trực tiếp URL
     * thì trả JSON bình thường.
     */

    return ContentService
      .createTextOutput(
        JSON.stringify(result)
      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );


  } catch (error) {

    return createResponse(
      false,
      error.message
    );

  }

}


/* =====================================================
   DO POST
===================================================== */

function doPost(e) {

  try {

    const params =
      e &&
      e.parameter
        ? e.parameter
        : {};


    const result =
      addWish(params);


    return ContentService
      .createTextOutput(
        JSON.stringify(result)
      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );


  } catch (error) {

    return createResponse(
      false,
      error.message
    );

  }

}


/* =====================================================
   ADD WISH
===================================================== */

function addWish(params) {

  const name =
    cleanText(
      params.name
    );


  const message =
    cleanText(
      params.message
    );


  const color =
    cleanColor(
      params.color
    );


  /*
   * Kiểm tra dữ liệu.
   */

  if (!name) {

    return {
      success: false,
      error: "Thiếu họ và tên."
    };

  }


  if (!message) {

    return {
      success: false,
      error: "Thiếu lời chúc."
    };

  }


  /*
   * Giới hạn dữ liệu
   */

  if (
    name.length > 60
  ) {

    return {
      success: false,
      error:
        "Tên quá dài."
    };

  }


  if (
    message.length > 300
  ) {

    return {
      success: false,
      error:
        "Lời chúc quá dài."
    };

  }


  /*
   * Lấy sheet
   */

  const sheet =
    getWishSheet();


  /*
   * Lưu thời gian
   */

  const now =
    new Date();


  /*
   * Thêm dòng.
   */

  sheet.appendRow([
    now,
    name,
    message,
    color
  ]);


  /*
   * Format ngày.
   */

  const lastRow =
    sheet.getLastRow();


  sheet
    .getRange(
      lastRow,
      1
    )
    .setNumberFormat(
      "dd/MM/yyyy HH:mm:ss"
    );


  return {

    success: true,

    message:
      "Lời chúc đã được lưu.",

    wish: {

      id:
        now.getTime(),

      name:
        name,

      message:
        message,

      color:
        color,

      createdAt:
        now.toISOString()

    }

  };

}


/* =====================================================
   GET WISHES
===================================================== */

function getWishes() {

  const sheet =
    getWishSheet();


  const lastRow =
    sheet.getLastRow();


  /*
   * Chưa có dữ liệu
   */

  if (
    lastRow < 2
  ) {

    return {

      success:
        true,

      wishes:
        []

    };

  }


  /*
   * Lấy dữ liệu
   */

  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        4
      )
      .getValues();


  const wishes =
    values
      .map(
        (row, index) => {

          const date =
            row[0];


          return {

            id:
              date instanceof Date
                ? date.getTime()
                : Date.now() + index,

            name:
              String(row[1] || ""),

            message:
              String(row[2] || ""),

            color:
              cleanColor(row[3]),

            createdAt:
              date instanceof Date
                ? date.toISOString()
                : ""

          };

        }
      )
      .filter(
        wish =>
          wish.name &&
          wish.message
      );


  return {

    success:
      true,

    wishes:
      wishes

  };

}


/* =====================================================
   CLEAN TEXT
===================================================== */

function cleanText(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)
    .replace(
      /[\u0000-\u001F\u007F]/g,
      ""
    )
    .trim();

}


/* =====================================================
   CLEAN COLOR
===================================================== */

function cleanColor(value) {

  const allowed = [
    "yellow",
    "white",
    "blue",
    "pink"
  ];


  const color =
    String(
      value || "yellow"
    )
    .toLowerCase()
    .trim();


  if (
    allowed.includes(color)
  ) {

    return color;

  }


  return "yellow";

}


/* =====================================================
   RESPONSE
===================================================== */

function createResponse(
  success,
  message
) {

  return ContentService
    .createTextOutput(
      JSON.stringify({

        success:
          success,

        message:
          message

      })
    )
    .setMimeType(
      ContentService
        .MimeType
        .JSON
    );

}
