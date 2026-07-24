# 🎵 Discord Music Bot

Bot musik Discord yang bisa memutar lagu dari **YouTube**, **Spotify** (link diubah otomatis ke YouTube), dan **SoundCloud**. Dibuat dengan `discord.js` v14 + `DisTube`.

## ✨ Fitur
- `/play <judul atau link>` — putar lagu / tambah ke antrian (bot otomatis join voice channel kamu)
- `/skip` — lewati lagu
- `/stop` — stop & kosongkan antrian
- `/pause` / `/resume` — jeda & lanjutkan
- `/queue` — lihat antrian
- `/volume <0-100>` — atur volume
- `/nowplaying` — info lagu yang sedang diputar

---

## 🛠️ Setup di macOS

### 1. Install Node.js

**Cara A — pakai Homebrew (direkomendasikan)**

Kalau belum punya Homebrew, install dulu:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Lalu install Node.js:
```bash
brew install node
```

**Cara B — download installer langsung**

Buka https://nodejs.org, download versi **LTS**, lalu install seperti aplikasi Mac biasa (`.pkg`).

### 2. Cek instalasi

Buka **Terminal** (`Cmd + Space` → ketik "Terminal" → Enter), lalu jalankan:
```bash
node -v
npm -v
```
Kalau muncul nomor versi (contoh `v20.11.1`), berarti sudah berhasil. Minimal butuh **Node.js v18 ke atas**.

### 3. Extract project

Extract file `discord-music-bot.zip` yang sudah diunduh (klik dua kali di Finder, atau lewat Terminal):
```bash
cd ~/Downloads
unzip discord-music-bot.zip
cd discord-music-bot
```

### 4. Install ffmpeg (untuk proses audio)

Package `ffmpeg-static` di project ini biasanya sudah otomatis sediakan binary ffmpeg untuk Mac (Intel maupun Apple Silicon M1–M4). Tapi jaga-jaga kalau nanti ada error terkait audio, install manual:
```bash
brew install ffmpeg
```

### 5. Install dependency project
```bash
npm install
```
Tunggu sampai selesai — akan muncul folder baru `node_modules`.

> ⚠️ Jangan pakai `sudo npm install`. Kalau ada error permission, install Node lewat **nvm** saja (lihat bagian bawah).

---

## 🤖 Buat Bot di Discord Developer Portal

1. Buka https://discord.com/developers/applications → **New Application** → beri nama bebas
2. Ke tab **Bot** → klik **Reset Token** → salin tokennya (ini `DISCORD_TOKEN`)
3. Masih di tab **Bot**, aktifkan **Message Content Intent** (di bagian Privileged Gateway Intents)
4. Ke tab **General Information** → salin **Application ID** (ini `CLIENT_ID`)
5. Ke tab **OAuth2 → URL Generator**:
   - Centang scope: `bot` dan `applications.commands`
   - Centang permission: `Connect`, `Speak`, `Send Messages`, `Embed Links`, `Use Slash Commands`
   - Salin URL yang muncul, buka di browser untuk invite bot ke server kamu

### Cara dapat Guild/Server ID (opsional, untuk testing)
1. Discord → Settings → **Advanced** → aktifkan **Developer Mode**
2. Klik kanan nama server kamu → **Copy Server ID**

---

## ⚙️ Konfigurasi Environment

Copy file template jadi `.env`:
```bash
cp .env.example .env
```

Buka file `.env` pakai text editor (VS Code, TextEdit, atau `nano .env` di Terminal), lalu isi:
```
DISCORD_TOKEN=token_bot_kamu
CLIENT_ID=application_id_kamu
GUILD_ID=id_server_kamu
```

**Soal GUILD_ID:**
- **Diisi** → slash command langsung muncul instan di 1 server itu saja (bagus untuk testing)
- **Dikosongkan** → command didaftarkan global ke semua server bot, tapi butuh ~1 jam untuk muncul

*(Opsional)* Untuk Spotify yang lebih stabil, buat app di https://developer.spotify.com/dashboard dan isi `SPOTIFY_CLIENT_ID` & `SPOTIFY_CLIENT_SECRET` — tanpa ini pun link Spotify tetap bisa diproses.

---

## 🚀 Menjalankan Bot

### 1. Daftarkan slash command (cukup sekali)
```bash
npm run deploy
```

### 2. Jalankan bot
```bash
npm start
```

Kalau berhasil akan muncul:
```
✅ Bot online sebagai NamaBot#1234
```

Sekarang coba ketik `/play <judul lagu>` di server Discord kamu — bot akan otomatis join ke voice channel yang sedang kamu tempati.

---

## 🔁 Menjalankan Terus-Menerus (Opsional)

Bot akan berhenti kalau Terminal ditutup atau Mac di-sleep. Kalau mau bot tetap online:

**Pakai pm2 (biar tetap jalan di background Mac)**
```bash
npm install -g pm2
pm2 start index.js --name music-bot
pm2 save
```

**Atau deploy ke cloud (Railway, dll)** supaya bot online 24/7 tanpa perlu Mac menyala terus.

---

## 🧯 Kalau `npm install` Error Permission (EACCES)

Jangan pakai `sudo`. Install Node lewat **nvm** (Node Version Manager) supaya semua package terinstall tanpa perlu izin admin:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Tutup dan buka lagi Terminal, lalu:
```bash
nvm install --lts
nvm use --lts
```

Setelah itu ulangi `npm install` di folder project.

---

## 📁 Struktur Folder
```
discord-music-bot/
├── commands/          # semua slash command
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── pause.js
│   ├── resume.js
│   ├── queue.js
│   ├── volume.js
│   └── nowplaying.js
├── events/            # event handler (Discord & DisTube)
│   ├── ready.js
│   ├── interactionCreate.js
│   ├── distubePlaySong.js
│   ├── distubeAddSong.js
│   ├── distubeFinish.js
│   └── distubeError.js
├── index.js           # entry point bot
├── deploy-commands.js # script daftarkan slash command
├── package.json
└── .env.example
```

---

## ❓ Troubleshooting

- **Bot tidak join voice channel**: pastikan role bot punya izin `Connect` & `Speak` di channel itu, dan kamu sendiri sedang berada di sebuah voice channel saat memakai `/play`.
- **Command tidak muncul**: jalankan ulang `npm run deploy`. Kalau `GUILD_ID` dikosongkan (global), bisa butuh waktu hingga 1 jam untuk muncul.
- **`command not found: node`**: Node.js belum terinstall atau Terminal perlu dibuka ulang setelah instalasi.
- **Error `Cannot find module ...`**: berarti `npm install` belum dijalankan atau gagal — coba jalankan ulang di folder project.
- **Error saat play YouTube**: YouTube sering update sistemnya, pastikan `@distube/yt-dlp` versi terbaru (`npm update`).
- **Suara terputus-putus**: cek koneksi internet, atau kalau di-hosting di cloud, cek lokasi server hosting.
