/**
 * RIDA-AFAEK: Visitor Tracking (Google Apps Script)
 * Deploy sebagai Web App dengan execute sebagai "Me" dan allow "Anyone"
 * Deployment URL → masukkan ke VISIT_URL di config.js
 */

const SHEET_ID = "YOUR_SPREADSHEET_ID"; // Ganti dengan ID spreadsheet Anda
const SHEET_NAME = "Visitors"; // Nama sheet untuk menyimpan data pengunjung

/**
 * doGet: Menangani GET request dari halaman web
 * Query params:
 *   - act=hit  : Catat pengunjung baru (jika belum dalam session)
 *   - act=get  : Ambil statistik pengunjung (tanpa mencatat)
 */
function doGet(e) {
  const action = e.parameter.act || "get";
  const timestamp = new Date();
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  // Inisialisasi sheet jika belum ada data
  if (!sheet.getLastRow()) {
    sheet.appendRow(["Timestamp", "Session", "Date", "Hour"]);
  }
  
  const today = Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd");
  const hour = Utilities.formatDate(timestamp, "Asia/Jakarta", "HH");
  
  if (action === "hit") {
    // Catat hit baru
    const sessionId = Utilities.getUuid();
    sheet.appendRow([
      Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      sessionId,
      today,
      hour
    ]);
    SpreadsheetApp.getActiveSpreadsheet().flush();
  }
  
  // Hitung statistik
  const data = sheet.getDataRange().getValues().slice(1); // Skip header
  const today_visits = data.filter(row => row[2] === today).length;
  const total_visits = data.length;
  
  // Response JSON
  return ContentService
    .createTextOutput(JSON.stringify({
      hari: today_visits,
      total: total_visits,
      timestamp: Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      updated_at: new Date().getTime()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

/**
 * Statistik per jam (opsional: untuk grafik detail)
 * Akses via: VISIT_URL?act=hourly
 */
function getHourlyStats() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues().slice(1);
  const today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  
  const hourly = {};
  for (let h = 0; h < 24; h++) {
    hourly[String(h).padStart(2, "0")] = 0;
  }
  
  data.forEach(row => {
    if (row[2] === today) {
      const hour = row[3];
      hourly[hour]++;
    }
  });
  
  return hourly;
}
