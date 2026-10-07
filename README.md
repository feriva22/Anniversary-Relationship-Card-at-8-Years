# 8 Tahun — Ferico & Yohana 💗

Website kenangan perayaan 8 tahun hubungan, berisi perjalanan dari awal jadian
(8 Oktober 2018) hingga hari ini — lengkap dengan badai, duka, dan pilihan untuk tetap bersama.

## Cara Membuka

Cukup **klik dua kali** file `index.html`, atau:

```powershell
python -m http.server 8099
# lalu buka http://localhost:8099
```

## Struktur

```
index.html          → halaman utama
css/style.css       → tema romantis & elegan (pink/gold)
js/main.js          → counter hari, animasi scroll, halaman hati, lightbox
images/             → 12 foto babak + 24 foto galeri
images/galeri/      → foto galeri asli (sumber)
```

## Mengganti Foto

Semua foto saat ini masih **placeholder**. Timpa file dengan nama yang sama
di folder `images/` menggunakan foto asli (format JPG, rasio ideal 4:3 untuk
foto babak, 1:1 untuk galeri).

### Foto Babak Perjalanan (12 babak)

| File | Babak | Momen |
|---|---|---|
| `01-awal-mula.jpg` | 01 | Awal mula — 8 Oktober 2018 |
| `02-tahun-pertama.jpg` | 02 | Bertahan tanpa restu — 2018–2019 |
| `03-badai-2019.jpg` | 03 | Badai pertama, sempat berpisah — 2019 |
| `04-kembali-lagi.jpg` | 04 | Kembali dan lebih kuat |
| `05-dukungan-kuliah.jpg` | 05 | Dukungan Yohana sampai Ferico lulus — 2020–2022 |
| `06-restu-2024.jpg` | 06 | Restu akhirnya datang, Idul Fitri — April 2024 |
| `07-tunangan.jpg` | 07 | Hari pertunangan — 24 November 2024 |
| `08-maret-2025.jpg` | 08 | Kehilangan Bapak Ferico — Maret 2025 |
| `09-akhir-2025.jpg` | 09 | Goncangan komunikasi — akhir 2025 |
| `10-juli-2026.jpg` | 10 | Ayah Yohana berpulang + permintaan maaf Ferico — 19 Juli 2026 |
| `11-september-2026.jpg` | 11 | Kebenaran yang menyakitkan — September 2026 |
| `12-hari-ini.jpg` | 12 | Hari ini dan seterusnya |

### Galeri

24 foto asli sudah terpasang di `gallery-01.jpeg` sampai `gallery-24.jpeg`.
Klik foto di galeri untuk membuka tampilan besar (lightbox).

Foto asli disimpan di folder `images/galeri/`. Untuk mengganti atau menambah foto:

1. Tambahkan file baru ke `images/galeri/`
2. Salin ke `images/` dengan nama `gallery-XX.jpeg` (XX = 01, 02, 03, ...)
3. Sesuaikan jumlah di `js/main.js` pada baris `length: 24`

> Jika sebuah file belum ada, website otomatis menampilkan kotak placeholder
> dengan nama file yang harus diisi — jadi tidak akan terlihat rusak.

## Perjalanan 12 Babak

1. **Awal Mula** — 8 Oktober 2018
2. **Bertahan Tanpa Restu** — Yohana bertahan 2018–2019, bahkan berbohong kepada keluarganya sendiri
3. **Badai Pertama** — Yohana lelah dengan ketidakjelasan restu, sempat berpisah 2019
4. **Kembali** — memilih untuk bersama lagi
5. **Kamu yang Menopang Aku Sampai Lulus** — 2020–2022, Ferico lulus akhir 2022 berkat dukungan Yohana; 2022–2024 masih backstreet di kota yang sama
6. **Akhirnya Diakui** — Idul Fitri April 2024, Yohana mulai mendapat restu dan bisa mengunjungi rumah Ferico
7. **Hari Pertunangan** — 24 November 2024
8. **Kehilangan Bapak Ferico** — Maret 2025
9. **Goncangan Komunikasi** — akhir 2025
10. **Ayah Yohana Berpulang** — 19 Juli 2026, disertai permintaan maaf Ferico
11. **Kebenaran yang Menyakitkan** — September 2026
12. **Hari Ini, dan Setiap Hari Setelahnya**

## Fitur

- **Counter langsung** — menghitung hari, jam, menit, detik sejak 8 Oktober 2018
- **Timeline 12 babak** — setiap babak punya warna dan nuansa berbeda sesuai momen
- **Popup penutup** — foto babak 12 muncul otomatis sebagai popup ketika pengunjung tiba di Galeri Kenangan (sekali saja per sesi)
- **Animasi halaman hati** — hati beterbangan lembut di latar
- **Reveal saat scroll** — konten muncul halus saat digulir
- **Galeri + lightbox** — bisa diklik untuk melihat foto lebih besar
- **Responsif** — rapi di ponsel maupun desktop
- **Aksesibel** — menghormati `prefers-reduced-motion` dan tetap tampil tanpa JavaScript

## Kustomisasi Cepat

- **Tanggal mulai** — ubah `START_DATE` di `js/main.js`
- **Warna tema** — ubah variabel di bagian `:root` pada `css/style.css`
- **Teks cerita** — ubah langsung di `index.html` pada bagian `<article class="chapter">`
