# Website PT Rizqi Barakah Abadi — Tahap 1

Static site (HTML/CSS/JS murni, tanpa build step) — landing page perusahaan lengkap.

## Struktur

```
rba-website/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── logo.png
└── README.md
```

## Section yang tersedia

1. **Hero** — tagline utama + kartu visual "purchase manifest"
2. **Tentang Kami** — profil singkat + kartu legalitas (NIB, skala usaha, domisili)
3. **Visi & Misi**
4. **Fokus Usaha** — 4 kategori: Printer & Consumable, AC & Ventilasi, ATK & Consumable Kantor, Peralatan Operasional
5. **FAQ** — accordion, 5 pertanyaan umum
6. **Kontak** — info kontak (email & alamat dari data NIB) + form

Data legalitas (NIB, alamat, email) diambil dari dokumen NIB resmi yang dilampirkan. **Cek kembali** semua data ini sebelum publish — terutama alamat dan email, pastikan itu yang memang ingin ditampilkan ke publik.

## Cara deploy ke Cloudflare Pages (gratis, tanpa domain dulu)

### 1. Push ke GitHub

```bash
cd rba-website
git init
git add .
git commit -m "Initial company profile site"
```

Buat repo baru di https://github.com/new (misal nama: `rba-website`), lalu:

```bash
git remote add origin https://github.com/USERNAME/rba-website.git
git branch -M main
git push -u origin main
```

### 2. Connect ke Cloudflare Pages

1. Buka https://dash.cloudflare.com → menu **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git**
2. Login/authorize GitHub, pilih repo `rba-website`
3. Build settings — karena ini static HTML murni, **kosongkan** build command, dan set **Build output directory** ke `/` (root)
4. Klik **Save and Deploy**

Setelah deploy selesai (biasanya <1 menit), situs akan langsung bisa diakses di:
```
https://rba-website-xxx.pages.dev
```

Setiap kali kamu `git push` ke branch `main`, Cloudflare Pages otomatis build ulang dan deploy — ini yang dimaksud continuous deployment.

### 3. (Tahap 2 nanti) Custom domain

Setelah beli domain, tinggal masuk ke project Pages ini → tab **Custom domains** → **Set up a custom domain** → ikuti instruksi DNS (kalau domain juga didaftarkan/dikelola di Cloudflare, ini otomatis).

## Catatan pengembangan

- Form kontak saat ini **belum terhubung ke backend** (murni placeholder). Untuk membuatnya berfungsi tanpa server sendiri, opsi termudah:
  - Cloudflare Worker + kirim ke email via API pihak ketiga (Resend, dsb), atau
  - Layanan form gratis seperti Formspree/Web3Forms sebagai jembatan sementara
- Warna, font, dan struktur mengikuti sistem desain berbasis dunia bisnis RBA sendiri: motif *registration mark* (tanda cetak) dan kartu bergaya "job ticket" untuk bagian layanan — supaya terasa spesifik ke bisnis IT + printer, bukan template generik.
