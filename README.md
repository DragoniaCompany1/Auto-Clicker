<div align="center">

# ⚡ A click - Enterprise Auto Clicker & Task Automation Suite

![Version](https://img.shields.io/badge/version-1.0.0-00F0FF?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-8338EC?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-FF007A?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/stack-Electron%20%7C%20React%2018%20%7C%20TypeScript%20%7C%20Native%20C-00FF87?style=for-the-badge)

<p align="center">
  <b>A click</b> adalah aplikasi desktop <i>Enterprise-Grade Auto Clicker & Task Automation Suite</i> berkecepatan tinggi yang dirancang dengan antarmuka modern <b>Cyberpunk Glassmorphism Dark Theme</b>. Dilengkapi dengan engine injeksi sinyal mouse OS native (Native X11 C-Daemon & Win32 User32 API), mode kecepatan tanpa batas (0ms delay), sekuensial multi-target, perekam makro, serta benchmark CPS real-time.
</p>

<p align="center">
  Dibuat oleh: <b>axel (drgxel)</b> & <b>M.B.A</b>
</p>

---

</div>

## 🌟 Fitur Utama (Key Features)

### 🎯 1. Single Clicker & Mode Turbo (0ms Uncapped Speed)
- **Interval Presisi Tinggi**: Pengaturan waktu hingga hitungan Jam, Menit, Detik, dan Milidetik (ms).
- **Mode Turbo Uncapped (0ms Delay)**: Menembakkan sinyal klik secepat batas fisik hardware dan antrean event OS (hingga 1000+ CPS).
- **Kontrol Tombol Mouse**: Klik Kiri (Left), Klik Kanan (Right), Klik Tengah (Middle).
- **Tipe Klik**: Single Click, Double Click, Triple Click, dan Long Hold (Tahan).
- **Target Lokasi**:
  - *Ikuti Kursor Saat Ini*: Mengklik otomatis di mana pun kursor kustom Anda berada.
  - *Koordinat Tetap (X, Y)*: Mengunci target koordinat layar tertentu dengan fitur **Picker Overlay (F7)**.

### 📍 2. Multi-Target Sequential Clicker
- Eksekusi klik sekuensial pada banyak titik $(X_1, Y_1), (X_2, Y_2), \dots, (X_n, Y_n)$ secara otomatis.
- Pengaturan jeda waktu kustom (*delay after*) per titik koordinat target.
- Manajemen daftar target yang mudah (tambah, edit nama, ubah koordinat, hapus).

### 🎬 3. Perekam Makro & Sequence Playback
- **Record & Playback**: Merekam urutan pergerakan kursor mouse dan aksi klik secara real-time.
- **Kecepatan Putar Ulang (Playback Speed)**: Pilihan kecepatan 1x (Normal), 2x (Fast), dan 5x (Ultra Speed).
- Ekspor & impor makro untuk otomatisasi alur kerja berulang.

### ⚡ 4. Penguji Kecepatan CPS Benchmark
- Penguji kecepatan respon klik kursor atau Auto Clicker secara otomatis selama 5 detik.
- Visualisasi **CPS (Clicks Per Second)** rata-rata dan *Peak CPS* (kecepatan puncak).

### ⌨️ 5. Sistem Hotkey Global (Pintasan Keyboard OS)
Semua hotkey bekerja di tingkat OS, tetap dapat merespons meskipun aplikasi sedang diminimalkan atau saat game berada dalam mode *Full Screen*.

| Hotkey | Fungsi |
| :--- | :--- |
| **`F6`** | Mulai / Hentikan Auto Clicker (*Start/Stop Toggle*) |
| **`F7`** | Ambil Koordinat Layar Saat Ini (*Pick Location*) |
| **`F8`** | Sakelar Mode Turbo Speed (*Uncapped 0ms Toggle*) |
| **`F9`** | Mulai / Hentikan Perekam Makro (*Macro Recording*) |
| **`Escape`** | Darurat Henti Seketika (*Emergency Kill Switch*) |

### 📁 6. Manajer Profil & Preset Game
- Simpan dan muat konfigurasi preset siap pakai (seperti *Roblox Fast CPS*, *Uncapped 0ms Speed*, *Mining Simulator*, dll).
- Ekspor dan impor profil dalam format file JSON.

### 🔊 7. Sound FX Engine
- Umpan balik audio interaktif saat klik, start, dan stop menggunakan **Web Audio API** tanpa ketergantungan file aset eksternal.
- Sakelar tombol mute/unmute audio dengan cepat di header.

---

## 🏗️ Arsitektur & Teknologi (Tech Stack)

| Komponen | Teknologi |
| :--- | :--- |
| **Runtime & Core** | [Electron](https://www.electronjs.org/) 34+ & Node.js |
| **Frontend UI** | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Styling & Theme** | Modern Glassmorphic Dark Gaming Theme, Outfit & JetBrains Mono Fonts |
| **Linux Click Engine** | High-performance Native C Binary (`native_clicker`) via X11 XTest API Daemon Pipe |
| **Windows Click Engine** | Win32 User32 API (`mouse_event` & `SendInput`) via PowerShell / Native Hooks |
| **Packaging & Build** | [Electron-Builder](https://www.electron.build/) (Exe, AppImage, Deb, Portable) |

---

## 🚀 Panduan Instalasi & Penggunaan

### 📋 Prasyarat (Prerequisites)
- **Node.js**: v18.0.0 atau lebih baru (Rekomendasi: Node.js v20+)
- **npm**: v9.0.0 atau lebih baru
- **GCC / C Compiler** (Khusus pengguna Linux untuk mengompilasi `native_clicker` C daemon):
  ```bash
  # Arch Linux / Manjaro
  sudo pacman -S gcc libxtst libx11

  # Ubuntu / Debian
  sudo apt install build-essential libxtst-dev libx11-dev
  ```

### 💻 1. Mode Pengembangan (Development / Testing)
Jalankan aplikasi tanpa kompilasi binary untuk keperluan pengujian:

```bash
# 1. Clone repositori ini / buka direktori proyek
cd /home/drgxel/Documents/rb

# 2. Kompilasi binary native C clicker (untuk Linux)
gcc -O3 native_clicker.c -o native_clicker -lXtst -lX11

# 3. Jalankan server pengembangan Vite + Electron
npm run dev
```

### 📦 2. Kompilasi Standalone Executable (Electron Builder)
Untuk mengompilasi aplikasi menjadi file executable (.exe untuk Windows, .AppImage / .deb untuk Linux):

```bash
# Jalankan skrip pembangun produksi
npm run electron:build
```
Hasil file installer / executable akan tersimpan di dalam folder `release/`.

---

## 📂 Struktur Direktori Proyek

```
/home/drgxel/Documents/rb/
├── package.json                   # Dependensi & script npm
├── electron-builder.json          # Konfigurasi Packaging Executable
├── vite.config.ts                 # Setup Bundler Vite + Electron
├── tsconfig.json                  # Konfigurasi TypeScript Renderer
├── tsconfig.electron.json         # Konfigurasi TypeScript Main Process
├── LICENSE                        # Teks Lisensi MIT (axel drgxel & M.B.A)
├── native_clicker.c               # Engine C Native X11 Daemon (Linux)
├── native_clicker                 # Binary terkompilasi X11 Clicker
├── electron/
│   ├── main.ts                    # Main Process Electron & Dynamic Daemon Pipe
│   └── preload.ts                 # ContextBridge IPC APIs
└── src/
    ├── main.tsx                   # React Root Entry Point
    ├── index.css                  # Enterprise Cyberpunk Glassmorphic CSS System
    ├── App.tsx                    # Shell Layout & State Handler Utama
    ├── types.ts                   # Type Definitions (ClickOptions, MultiTarget, Macro)
    ├── components/
    │   ├── Header.tsx             # Header Aplikasi & Branding
    │   ├── Navigation.tsx         # Tab Navigation Bar
    │   ├── SingleClicker.tsx      # Panel Auto Clicker & Turbo Speed Controls
    │   ├── MultiTargetPanel.tsx   # Panel Sekuensial Banyak Titik Koordinat
    │   ├── MacroRecorder.tsx      # Panel Perekam & Pemutar Aksi Mouse
    │   ├── CPSBenchmark.tsx       # Tool Uji Kecepatan CPS Real-Time
    │   ├── ProfilesPanel.tsx      # Manajer Preset & Profil JSON
    │   ├── HotkeysPanel.tsx       # Pengaturan Pintasan Keyboard Global
    │   ├── StatsPanel.tsx         # HUD Statistik CPS & Total Klik
    │   └── AboutPanel.tsx         # Informasi Pengembang & Teks Lisensi Interaktif
    └── services/
        └── audio.ts               # Generator Efek Suara Web Audio API
```

---

## 👥 Pengembang (Developers)

Aplikasi **A click** dirancang dan dikembangkan oleh:
- 👨‍💻 **axel ([drgxel](https://github.com/drgxel))**
- 👨‍💻 **M.B.A**

---

## 📄 Lisensi (License)

Proyek ini dilisensikan di bawah **Lisensi MIT** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

```text
Copyright (c) 2026 axel (drgxel) & M.B.A

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```
