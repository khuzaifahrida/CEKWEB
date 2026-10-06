/* Apps Script penerima permohonan intervensi mitra.
 * Cara pakai: buka spreadsheet (mis. "Isu dari RPJMD dan renstra") > Ekstensi > Apps Script > tempel kode ini
 * > Terapkan > Deployment baru > Aplikasi web (Jalankan sebagai: Saya; Akses: Siapa saja)
 * > salin URL ke konstanta MT_ENDPOINT pada rida-afaek.html.
 * Lembar "Permohonan": kolom Surel (D) bersifat internal. Terbitkan ke web lembar turunan tanpa kolom D,
 * mis. di lembar "Publik": =QUERY(Permohonan!A:L;"select A,B,C,E,F,G,H,I,J,K,L") lalu terbitkan sebagai CSV ke MT_CSV.
 * Bapperida mengisi kolom Bukti Kerja Sama (I), Dokumen Hasil (K) berupa tautan Drive, dan Status (L) setelah verifikasi. */
const SHEET_NAME = "Permohonan";
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Waktu","Lembaga","Jenis Mitra","Surel","OPD","Masalah","Kontribusi","Uraian","Bukti Kerja Sama","Rencana Keluaran","Dokumen Hasil","Status"]);
  }
  sh.appendRow([new Date(), d.lembaga, d.jenis, d.em, d.opd, d.isu,
    (d.kontr || []).join("; "), d.ur, d.bukti, (d.keluaran || []).join("; "), "", "Diajukan"]);
  return ContentService.createTextOutput("ok");
}

/* Penghitung pengunjung: GET ?act=hit menambah hitungan (sekali per sesi peramban), GET ?act=get hanya membaca.
 * URL Web App yang sama dapat dipakai untuk MT_ENDPOINT dan VISIT_URL. Menggunakan lembar "Statistik". */
function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("Statistik");
  if (!sh) {
    sh = ss.insertSheet("Statistik");
    sh.getRange("B2").setNumberFormat("@");
    sh.getRange("A1:B3").setValues([["total", 0], ["tanggal", ""], ["hari", 0]]);
  }
  const today = Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd");
  let total = Number(sh.getRange("B1").getValue());
  let tgl = String(sh.getRange("B2").getValue());
  let hari = Number(sh.getRange("B3").getValue());
  if (tgl !== today) { tgl = today; hari = 0; }
  if (e && e.parameter && e.parameter.act === "hit") { total++; hari++; }
  sh.getRange("B1:B3").setValues([[total], [tgl], [hari]]);
  lock.releaseLock();
  return ContentService.createTextOutput(JSON.stringify({ total: total, hari: hari }))
    .setMimeType(ContentService.MimeType.JSON);
}
