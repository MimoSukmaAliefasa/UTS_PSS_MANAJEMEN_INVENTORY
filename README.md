# Proyek Manajemen Stok Barang

## Deskripsi Proyek
Proyek ini bertujuan untuk membangun sistem manajemen stok barang dengan fitur-fitur utama seperti pengelolaan kategori barang, pemasok, dan item. Pengguna dapat mengakses berbagai ringkasan statistik mengenai stok, kategori, dan pemasok barang. Sistem ini dilengkapi dengan fitur autentikasi menggunakan JWT untuk memastikan hanya admin yang dapat mengakses API yang sensitif.

## Fitur Utama
1. **Autentikasi**:
   - Login menggunakan username dan password, menghasilkan token JWT untuk akses lebih lanjut.
   
2. **Create - read Barang (Items)**:
   - Menambah, data barang.
   - Menampilkan daftar barang.
   
3. **Create - read Kategori (Categories)**:
   - Menambah kategori barang.
   - Menampilkan daftar kategori.
   
4. **Create - read Pemasok (Suppliers)**:
   - Menambah data pemasok.
   - Menampilkan daftar pemasok.
   
5. **Ringkasan Per kategroi**:
   - Menampilkan ringkasan per kategori, termasuk jumlah barang per kategori, total
nilai stok tiap kategori, dan rata-rata harga barang dalam kategori tersebut

6. **Ringkasan bareng**:
    - Menampilkan ringkasan barang yang disuplai oleh masing-masing pemasok,
termasuk jumlah barang per pemasok dan total nilai barang yang disuplai.

7. **Ringkasan keseluruhan sistem**:
    - Menampilkan ringkasan dari keseluruhan sistem, termasuk total jumlah barang, nilai
stok keseluruhan, jumlah kategori, dan jumlah pemasok.

## Teknologi yang Digunakan
- **Node.js**: Sebagai runtime untuk aplikasi.
- **Express.js**: Untuk routing dan middleware.
- **Sequelize**: Untuk ORM dan interaksi dengan database.
- **JWT**: Untuk autentikasi dan otorisasi.
- **Bcrypt**: Untuk enkripsi password.
- **PostgreSQL**: Untuk database yang digunakan.

## Alur Pengerjaan Proyek
1. **Clone Repository**
2. **Instalasi Dependensi**
``` bash 
npm init -y
npm install express sequelize sequelize-cli jsonwebtoken bcryptjs
```
3. **Instalasi Sequelize CLI**
```bash 
npm install --save-dev sequelize-cli
```

4. **Instalasi Sequelize**
```bash
npx sequelize-cli init
```

5. **Create Database**
```bash
npx sequelize-cli db:create
```

5. **Konfigurasi Database**
Buka file config/config.json dan sesuaikan pengaturan database dengan kredensial MySQL Anda:
```bash
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "your_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

6. **Menjalankan Migrasi**
```bash
npx sequelize-cli db:migrate
```

7. **Menjalankan Server**
```bash
npm start
```

## Penggunaan API
### 1. **Login** - `POST /login`
Endpoint untuk login menggunakan username dan password.

**Request Body:**
```bash
{
  "username": "admin1",
  "password": "password1"
}
```
**Response Body:**
```bash
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```
### 2. **Item** 
- `POST /create-items`: Menambah item baru
**Request Body:**
```bash
{
  "name": "Smartphone",
  "description": "Smartphone dengan layar besar",
  "price": 5000000,
  "quantity": 10,
  "category_id": 1,
  "supplier_id": 3
}
```
- `GET /items`: Menampilkan item baru
**Response Body:**
```bash
[
  {
    "id": 1,
    "name": "Smartphone",
    "description": "Smartphone dengan layar besar",
    "price": 5000000,
    "quantity": 10,
    "category_id": 1,
    "supplier_id": 3
  }
]
```
### 3. **Category** 
- `POST /create-category`: Menambah kategori baru
**Request Body:**
```bash
{
    "name": "Elektronik",
    "description": "Peralatan elektronik rumah tangga",
}
```
- `GET /items`: Menampilkan item baru
**Response Body:**
```bash
[
    {
        "id": 1,
        "name": "Elektronik",
        "description": "Peralatan elektronik rumah tangga",
        "created_by": 1,
        "createdAt": "2025-04-25T20:31:18.803Z",
        "updatedAt": "2025-04-25T20:31:18.803Z"
    },
    {
        "id": 2,
        "name": "Alat Tulis",
        "description": "Perlengkapan kantor dan sekolah",
        "created_by": 2,
        "createdAt": "2025-04-25T20:31:18.803Z",
        "updatedAt": "2025-04-25T20:31:18.803Z"
    },
]
```
### 4. **Supplier** 
- `POST /create-supplier`: Menambah pemasok baru.
**Request Body:**
```bash
{
        "name": "PT Sumber Makmur",
        "contact_info": "08123456789",
    },
```
- `GET /supplier`: Menampilkan daftar pemasok.
**Response Body:**
```bash
[
    {
        "id": 1,
        "name": "PT Sumber Makmur",
        "contact_info": "08123456789",
        "created_by": 1,
        "createdAt": "2025-04-25T20:31:18.809Z",
        "updatedAt": "2025-04-25T20:31:18.809Z"
    },
    {
        "id": 2,
        "name": "CV Pena Jaya",
        "contact_info": "08567890123",
        "created_by": 2,
        "createdAt": "2025-04-25T20:31:18.809Z",
        "updatedAt": "2025-04-25T20:31:18.809Z"
    }
]
```
## Menjalankan aplikasi dengan docker
1. Install Docker & Docker Compose.
2. Clone repository dari GitHub.
3. Buka folder proyek di VSCode.
4. Periksa Docker dan Docker Compose sudah terpasang.
5. Jalankan aplikasi dengan ```docker-compose up --build```
6. Akses aplikasi di http://localhost:3000.
7. Uji API menggunakan Postman.
8. Gunakan ```docker-compose down``` untuk menghentikan kontainer.

