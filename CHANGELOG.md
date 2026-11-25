## [Unreleased]

### Added
- Menambahkan slide penutup dengan status tautan resmi dan dialog informasi hukum.
- Menambahkan slide kuis edukatif dengan tiga pertanyaan, umpan balik, hasil, dan pilihan mengulang.
- Menambahkan slide risiko dengan pernyataan risiko, penjelasan setiap topik, dan status dokumen resmi.
- Menambahkan slide biaya dengan kartu penjelasan yang dapat dibuka, termasuk rollover yang masih perlu diverifikasi.
- Menambahkan slide testimoni fiktif dengan carousel tiga contoh dan dialog detail.
- Menambahkan slide video demo dengan poster, detail, navigasi carousel, dan penanda ketika video belum tersedia.
- Menambahkan slide simulasi edukatif BUY/SELL dengan pilihan produk, input harga dan lot, hasil kotor, serta penjelasan biaya yang belum diverifikasi.
- Menambahkan slide galeri Solid dengan ilustrasi aplikasi dan tampilan gambar yang dapat diperbesar.
- Menambahkan slide perbandingan Gold Mini dan Gold Mikro dengan kartu pilihan, tabel spesifikasi sementara, dan catatan verifikasi.
- Menambahkan garis penghubung animasi pada diagram peran di slide ekosistem.
- Menambahkan slide ekosistem dengan filter kategori, diagram peran interaktif, kartu penjelasan, dan catatan verifikasi.
- Menambahkan slide pengantar dengan ringkasan, dialog pengantar dan gambar, serta daftar bab yang dapat dibuka langsung.

### Changed
- Membuat header ikut bergulir bersama konten slide agar ruang baca tidak terhalang header tetap.
- Memindahkan nomor besar ke area konten agar ikut bergulir, sementara header dan navigasi tetap di tempat.
- Menganimasikan setiap digit nomor header secara terpisah sehingga hanya digit yang berubah ikut bergeser.
- Menambahkan animasi vertikal pada nomor besar header saat berpindah bab, mengikuti arah navigasi.
- Memulihkan transisi halaman dari cover ke pengantar, sambil mempertahankan transisi konten saja antar bab.
- Menetapkan header dan navigasi slide pada posisinya saat hanya konten berganti dan bergeser antar bab.
- Mengecilkan tombol dan ikon navigasi Prev dan Next pada slide.
- Mengubah label navigasi bawah pada slide menjadi Prev dan Next.
- Menyesuaikan tata letak, warna, dan proporsi cover brosur dengan desain referensi agar tampilan pembuka lebih konsisten di layar ponsel.
- Memisahkan efek cahaya dan gambar ponsel pada cover agar ukuran dan tampilannya dapat diatur secara terpisah.
- Menempatkan gambar ponsel dan efek cover sebagai layer absolute dalam satu container.
- Menyesuaikan proporsi dan posisi ponsel terhadap efek cahaya sesuai referensi cover.
- Memperbesar gambar ponsel pada cover agar lebih menonjol di atas efek cahaya.
- Memperbesar komposisi ponsel dan efek cahaya cover secara bersamaan.

### Fixed
- Mengurangi ruang kosong bawah pada bottom sheet yang muncul akibat tambahan safe area di iOS.
- Memperbaiki sisi angka animasi header yang terpotong dengan memberi ruang pada bentuk angka miring.
- Mengurangi ruang kosong di bawah konten slide agar sesuai dengan tinggi navigasi bawah.
- Menghapus tambahan safe area pada navigasi slide agar tombol tidak terdorong terlalu tinggi di tampilan iOS.
- Memicu pemuatan ulang stylesheet global agar tema dan styling slide pengantar terbaca pada server development.
- Memusatkan gambar ponsel pada efek cahaya di cover agar kedua layer sejajar.
- Membatasi komposisi gambar cover agar tidak menabrak logo atau menyebabkan scroll horizontal setelah diperbesar.
- Memperjelas efek cahaya di belakang ponsel pada cover dengan mengembalikan opacity aset dan memperbesar area efek.
- Memperkuat efek cahaya transparan pada cover agar terlihat di atas latar hitam.
- Menyesuaikan tinggi area gambar cover dengan ruang viewport yang tersedia agar tombol dan catatan tetap terlihat pada layar ponsel.
- Memastikan warna emas dan jarak aman cover tetap tampil ketika variabel tema belum tersedia, serta mengecilkan judul agar sesuai lebar layar.
- Menghapus tambahan safe area pada cover agar jarak bawah tidak dihitung dua kali di viewport iOS.
