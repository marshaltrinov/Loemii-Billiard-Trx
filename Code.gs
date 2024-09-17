function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index.html');
}

function processForm(formObject) {
  var sheetId = '1yPRCQrY_Va3tbrTZ-HpyfyXRte9aqI7HQQOVDQiZAfg'; // Replace with your actual Spreadsheet ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Transaksi");

  if (!sheet) {
    Logger.log("Sheet 'Transaksi' not found!");
    return "Error: Sheet 'Transaksi' not found!";
  }

  // Ensure headers are in place
  var headers = ["Timestamp", "Nama", "No. Telp", "Durasi", "Biaya"];
  var range = sheet.getRange(1, 1, 1, headers.length);
  var existingHeaders = range.getValues()[0];

  if (existingHeaders.join() !== headers.join()) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  // Append the form data to the sheet
  var rowData = [
    new Date(),
    formObject.nama,
    formObject.noTelp,
    formObject.durasi,
    formObject.biaya
  ];
  sheet.appendRow(rowData);

  return "Data berhasil disimpan!";
}

function getRentalCount() {
  var sheetId = '1yPRCQrY_Va3tbrTZ-HpyfyXRte9aqI7HQQOVDQiZAfg'; // Replace with your actual Spreadsheet ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Transaksi");

  if (!sheet) {
    Logger.log("Sheet 'Transaksi' not found!");
    return "Error: Sheet 'Transaksi' not found!";
  }

  // Get the number of rows with data
  var numRows = sheet.getLastRow() - 1; // Subtract 1 for header row
  return numRows;
}
