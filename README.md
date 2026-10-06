# RIDA-AFAEK

Platform Penghimpunan Isu Strategis dan Kebutuhan Riset Perangkat Daerah Provinsi Nusa Tenggara Timur
(Riset dan Inovasi Daerah – Arena Forum Aspirasi, Evaluasi, dan Kaji-Riset), Bapperida Provinsi NTT.

Situs statis (HTML, CSS, JavaScript tanpa proses build). Data dibaca dari Google Sheets yang diterbitkan ke web.

## Isi repositori

| Berkas | Fungsi |
|---|---|
| `index.html` | Beranda dan dasbor |
| `config.js` | Seluruh pengaturan tautan dan alamat layanan (satu-satunya berkas yang perlu disunting) |
| `apps-script/kemitraan.gs` | Kode Google Apps Script: penerima permohonan intervensi mitra dan penghitung pengunjung |
| `.nojekyll` | Mencegah GitHub Pages memproses berkas dengan Jekyll |

## Menayangkan melalui GitHub Pages

1. Buat repositori baru di GitHub, lalu unggah seluruh isi folder ini (termasuk `.nojekyll`).
2. Buka **Settings → Pages**. Pada *Build and deployment*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu simpan.
3. Setelah beberapa menit situs tersedia di `https://<nama-akun>.github.io/<nama-repositori>/`.

## Menyambungkan data

Semua pengaturan berada pada `config.js`.

1. **Tanggapan Google Form** (`SHEET_CSV_URL`): pada spreadsheet tanggapan pilih *Berkas → Bagikan → Publikasikan ke web*, format CSV, lalu tempel tautannya. Dasbor memuat ulang data tiap 60 detik. Perlu diingat bahwa lembar yang diterbitkan dapat dibaca siapa pun yang memegang tautan; terbitkan lembar turunan yang hanya berisi kolom yang dibutuhkan.
2. **Dokumen Renstra** (`RENSTRA_PUB_URL`): lembar kerja terbit dengan kolom B (nama OPD) dan kolom D (dokumen). Aktifkan opsi *Publikasikan ulang secara otomatis saat ada perubahan*. Hyperlink pada kolom D terbaca dari versi HTML terbit.
3. **Permohonan mitra dan penghitung pengunjung** (`MT_ENDPOINT`, `VISIT_URL`, `MT_CSV`):
   - Buka spreadsheet, *Ekstensi → Apps Script*, tempel isi `apps-script/kemitraan.gs`.
   - *Terapkan → Deployment baru → Aplikasi web* (jalankan sebagai: Saya; akses: Siapa saja), lalu salin URL-nya ke `MT_ENDPOINT` dan `VISIT_URL`.
   - Terbitkan lembar turunan tanpa kolom surel sebagai CSV, lalu tempel tautannya ke `MT_CSV` (petunjuk ada pada komentar berkas `.gs`).
4. **Login admin** (`ADMIN_URL`): isi dengan alamat halaman login. Halaman tujuan harus memiliki autentikasi sendiri.

## Catatan

- Selama `SHEET_CSV_URL` dan `MT_CSV` kosong, dasbor menampilkan data contoh yang ditandai pada halaman.
- Pemetaan keterkaitan RPJMD–Renstra–RKPD pada profil perangkat daerah bersifat awal dan perlu diverifikasi dengan dokumen resmi.
- Sumber rujukan: Perubahan RKPD Provinsi NTT 2025 dan RPJMD Provinsi NTT 2025–2029 (Perda No. 6 Tahun 2025).
