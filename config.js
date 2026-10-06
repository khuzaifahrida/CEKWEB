/* Konfigurasi RIDA-AFAEK. Ubah nilai di bawah ini; tidak perlu menyunting index.html. */
window.RIDA_CONFIG = {
  // Tautan Google Form pengusulan riset/kajian OPD
  FORM_URL: "https://forms.gle/aSLm64Esid9QYE2V8",

  // Tautan CSV lembar tanggapan Google Form (Berkas > Bagikan > Publikasikan ke web > CSV).
  // Kosong = dasbor memakai data contoh.
  SHEET_CSV_URL: "",

  // Lembar kerja terbit "Isu dari RPJMD dan renstra" (kolom B = OPD, kolom D = dokumen Renstra).
  // Isi dengan tautan terbit berakhiran /pub (tanpa "html").
  RENSTRA_PUB_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKPVvwfsx0vMEKVl2eX8mrVkVwxKDhrPtmxPDuys8FSEAWpu25wjVZCLvy6jOy2eiU20mHUYfKu8zU/pub",

  // URL aplikasi web Google Apps Script (lihat apps-script/kemitraan.gs).
  // Dipakai untuk menerima permohonan intervensi mitra dan menghitung pengunjung.
  MT_ENDPOINT: "",
  VISIT_URL: "",

  // Tautan CSV terbit lembar "Publik" berisi permohonan mitra (tanpa kolom surel)
  MT_CSV: "",

  // Alamat halaman login admin
  ADMIN_URL: ""
};
