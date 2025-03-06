# Todo List Application

Aplikasi Todo List sederhana yang dibangun menggunakan:

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Python Flask
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## Fitur Aplikasi

- Menambahkan tugas baru.
- Melihat daftar tugas.
- Menghapus atau menyelesaikan tugas.
- Frontend responsif dengan desain modern menggunakan TailwindCSS.

---

## Persyaratan

Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstal:

1. **Docker** - [Cara Instalasi Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose** (biasanya sudah termasuk dalam instalasi Docker)

---

## Cara Menjalankan Aplikasi

### 1. Clone Repository

Clone repository ini ke lokal Anda:

```bash
git clone <link-repository>
cd todo-list
```

### 2. Jalankan Docker Compose

Pastikan Docker sudah terinstal di sistem Anda. Kemudian jalankan perintah berikut untuk membangun dan menjalankan aplikasi:

```bash
docker-compose up --build
```

Perintah ini akan:

- Membangun image Docker untuk frontend, backend, dan database.
- Menjalankan container untuk semua layanan.

### 3. Terapkan Migrasi Database

Setelah semua container berjalan, Anda perlu menerapkan migrasi database secara manual. Ikuti langkah-langkah berikut:

1. Ambil ID container backend dengan perintah:

   ```bash
   docker ps -a
   ```

   Cari container backend (biasanya bernama `todo-list-backend`) dan salin **Container ID**.

2. Jalankan migrasi database menggunakan perintah berikut:

   ```bash
   docker exec -it <container-id> flask db upgrade
   ```

   Ganti `<container-id>` dengan ID container backend yang Anda salin sebelumnya.

3. Setelah migrasi selesai, keluar dari terminal.

### 4. Akses Aplikasi

- **Frontend**: Buka browser dan akses aplikasi di:
  ```
  http://localhost:3000/
  ```
- **Backend API**: Backend dapat diakses di:
  ```
  http://localhost:5000/api/
  ```

---

## Struktur Proyek

```
todo-list/
├── client/               # Frontend React + TypeScript + TailwindCSS
│   ├── src/              # Kode sumber frontend
│   ├── Dockerfile        # Konfigurasi Docker untuk frontend
│   └── package.json      # Dependensi frontend
├── server/               # Backend Python Flask
│   ├── app.py            # Kode Python Utama
│   ├── migrations/       # Skrip migrasi database
│   ├── requests/         # Skrip test request ke API
│   ├── Dockerfile        # Konfigurasi Docker untuk backend
│   └── requirements.txt  # Dependensi backend
├── docker-compose.yml    # Konfigurasi Docker Compose
└── README.md             # Dokumentasi proyek
```

---

## Troubleshooting

### 1. Error Saat Membangun Container

Jika Anda mengalami error saat menjalankan `docker-compose up --build`, pastikan:

- Docker dan Docker Compose sudah terinstal dengan benar.
- Port `3000` (frontend) dan `5000` (backend) tidak digunakan oleh aplikasi lain.
