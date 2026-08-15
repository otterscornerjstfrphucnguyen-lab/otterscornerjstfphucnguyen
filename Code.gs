/**
 * =========================================================
 * OTTER'S CORNER - PUBLIC WISH API
 * =========================================================
 *
 * API CHỈ TRẢ:
 *   - Họ và tên
 *   - Lời chúc
 *
 * KHÔNG TRẢ:
 *   - Email
 *   - Số điện thoại
 *   - Facebook / Instagram / Threads
 *   - Số tiền donate
 *   - Bill chuyển khoản
 *
 */


const SPREADSHEET_ID =
  "1_f4yFSaR9QrMNIUk8iA0Maw4C2Z2-S25vRwS6qaQaiw";


/**
 * GET
 */
function doGet() {

  try {

    const spreadsheet =
      SpreadsheetApp.openById(
        SPREADSHEET_ID
      );

    const sheet =
      spreadsheet.getSheets()[0];

    const values =
      sheet.getDataRange().getDisplayValues();


    if (
      !values ||
      values.length < 2
    ) {

      return jsonResponse([]);

    }


    const headers =
      values[0].map(
        header =>
          String(header)
            .trim()
            .toLowerCase()
      );


    /*
      Tìm cột Họ và Tên
    */

    const nameIndex =
      findHeader(
        headers,
        [
          "họ và tên",
          "họ và tên:",
          "ho va ten",
          "ho ten"
        ]
      );


    /*
      Tìm cột lời chúc.
      Không cần ghi chính xác 100%.
    */

    const messageIndex =
      findHeaderContains(
        headers,
        [
          "lời chúc",
          "loi chuc",
          "hãy gửi một lời chúc",
          "hãy gửi lời chúc"
        ]
      );


    /*
      Nếu không tìm thấy cột
    */

    if (
      nameIndex === -1 ||
      messageIndex === -1
    ) {

      return jsonResponse([]);

    }


    const result = [];


    for (
      let i = 1;
      i < values.length;
      i++
    ) {

      const row =
        values[i];


      const name =
        String(
          row[nameIndex] || ""
        ).trim();


      const message =
        String(
          row[messageIndex] || ""
        ).trim();


      /*
        Chỉ public nếu có cả tên
        và lời chúc.
      */

      if (
        !name ||
        !message
      ) {

        continue;

      }


      result.push({

        name: name,

        message: message

      });

    }


    return jsonResponse(result);


  } catch (error) {

    return jsonResponse({

      error: true,

      message:
        String(error)

    });

  }

}


/**
 * Tìm header chính xác
 */
function findHeader(
  headers,
  possibleNames
) {

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    if (
      possibleNames.includes(
        headers[i]
      )
    ) {

      return i;

    }

  }

  return -1;

}


/**
 * Tìm header có chứa từ khóa
 */
function findHeaderContains(
  headers,
  keywords
) {

  for (
    let i = 0;
    i < headers.length;
    i++
  ) {

    for (
      let j = 0;
      j < keywords.length;
      j++
    ) {

      if (
        headers[i].includes(
          keywords[j]
        )
      ) {

        return i;

      }

    }

  }

  return -1;

}


/**
 * JSON response
 */
function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}
