var sheetName = "contact";
var sheetObj = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

// 允許 CORS 預檢
function doOptions(e) {
    return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}

// GET：支援分頁
function doGet(e) {
    const fieldMap = {
        姓名: "name",
        電子郵件: "email",
        主旨: "subject",
        訊息內容: "content",
        發送時間: "created_at",
    };

    try {
        var page = e.parameter.page ? parseInt(e.parameter.page, 10) : 1;
        var limit = e.parameter.limit ? parseInt(e.parameter.limit, 10) : 20;
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 20;

        var lastRow = sheetObj.getLastRow();
        if (lastRow <= 1) {
            return corsJson_({ ok: true, data: [], page: page, limit: limit, total: 0 });
        }

        var headers = sheetObj.getRange(1, 1, 1, sheetObj.getLastColumn()).getValues()[0];
        var totalData = lastRow - 1; // 扣掉表頭
        var totalPages = Math.ceil(totalData / limit);

        var startIndex = totalData - (page - 1) * limit;
        var endIndex = Math.max(1, startIndex - limit + 1);

        var numRows = startIndex - endIndex + 1;
        var startRow = endIndex + 1;

        var values = sheetObj.getRange(startRow, 1, numRows, headers.length).getValues();
        var data = values.reverse().map(function (row) {
            var obj = {};
            headers.forEach(function (h, i) {
                let field = fieldMap[h] || h;
                obj[field] = row[i];
            });
            return obj;
        });

        return corsJson_({
            ok: true,
            data: data,
            page: page,
            limit: limit,
            total: totalData,
            totalPages: totalPages,
        });
    } catch (err) {
        return corsJson_({ ok: false, error: String(err) });
    }
}

// POST：寫入資料（created_at 由系統自動產生）
function doPost(e) {
    try {
        var params = e.parameter;
        var created_at = Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy-MM-dd HH:mm:ss");

        sheetObj.appendRow([params.name, params.email, params.subject, params.content, created_at]);

        return corsJson_({ ok: true, from: "doPost", data: { ...params, created_at: created_at } });
    } catch (err) {
        return corsJson_({ ok: false, error: String(err) });
    }
}

// Helper：JSON + CORS
function corsJson_(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
