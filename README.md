# Klinik CRM - Frontend

Klinik CRM adalah aplikasi frontend Customer Relationship Management untuk operasional klinik. Aplikasi ini berfokus pada pengelolaan percakapan pasien, data pasien, appointment, campaign marketing, loyalty/rewards, notifikasi aktivitas, serta pengaturan klinik dan integrasi WhatsApp.

Project ini dibangun sebagai Single Page Application menggunakan React, Vite, React Router, Tailwind CSS, shadcn/ui, Radix UI, Axios, dan ApexCharts.

---

## Daftar Isi

- [Ringkasan Fitur](#ringkasan-fitur)
- [Tech Stack](#tech-stack)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Environment Variable](#environment-variable)
- [Menjalankan Project](#menjalankan-project)
- [Struktur Folder](#struktur-folder)
- [Penjelasan Folder dan File](#penjelasan-folder-dan-file)
- [Routing Aplikasi](#routing-aplikasi)
- [Arsitektur Frontend](#arsitektur-frontend)
- [Service API](#service-api)
- [Komponen UI](#komponen-ui)
- [Panduan Pengembangan](#panduan-pengembangan)
- [Build dan Deploy](#build-dan-deploy)

---

## Ringkasan Fitur

- Dashboard operasional dengan chart, insight chatbot, funnel, handling chart, dan live activity.
- Unified inbox untuk percakapan WhatsApp/pasien, termasuk chat area, profil pasien, handoff, dan pesan live via Server-Sent Events.
- Database pasien dengan tabel, filter, badge status, pagination, detail panel, timeline, statistik, catatan internal, dan quick actions.
- Appointment schedule untuk membuat, mencari, menampilkan, dan menghapus jadwal booking pasien.
- Marketing campaign untuk membuat campaign, memilih template, mengelola segmentasi, melihat status, dan membaca tabel campaign.
- Loyalty/rewards untuk ringkasan poin dan katalog reward.
- Settings untuk general clinic information, localization, operating hours, WhatsApp API, chatbot settings, role management, dan security/audit log.
- Autentikasi login/logout dengan token, refresh token, route protection, dan session storage di browser.
- Notifikasi aktivitas pada layout utama dengan mark read dan mark all read.

---

## Tech Stack

| Area | Teknologi | Keterangan |
| --- | --- | --- |
| Framework | React 19 | Library utama untuk UI berbasis komponen. |
| Build tool | Vite 8 | Dev server, HMR, dan production bundling. |
| Routing | React Router DOM 7 | Routing SPA dan route protection. |
| Styling | Tailwind CSS 4 | Utility-first CSS dan CSS variables. |
| UI kit | shadcn/ui + Radix UI | Komponen reusable berbasis primitive accessible. |
| Icon | Lucide React | Icon library untuk navigasi dan tombol. |
| HTTP client | Axios | REST API client dengan interceptor token. |
| Chart | ApexCharts + React ApexCharts | Visualisasi dashboard. |
| Date | date-fns + react-day-picker | Formatting tanggal dan date picker. |
| Linting | ESLint | Quality check untuk JavaScript/React. |

---

## Persyaratan Sistem

Pastikan environment lokal memiliki:

- Node.js versi modern, disarankan Node 18 atau lebih baru.
- npm, mengikuti lockfile yang tersedia di `package-lock.json`.
- Git untuk version control.

Cek versi:

```bash
node --version
npm --version
git --version
```

---

## Instalasi

Clone repository lalu install dependency:

```bash
git clone <repository-url>
cd klinik-CRM
npm install
```

Jika folder `node_modules/` sudah ada, dependency sudah pernah diinstall. Tetap jalankan `npm install` setelah ada perubahan pada `package.json` atau `package-lock.json`.

---

## Environment Variable

Project menggunakan environment variable Vite. Buat atau update file `.env` di root project:

```env
VITE_API_URL=https://contoh-domain-api.com
```

Keterangan:

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `VITE_API_URL` | Ya | Base URL backend API yang dipakai oleh Axios dan EventSource/SSE. |

Catatan:

- Semua variable yang ingin dibaca di browser harus diawali prefix `VITE_`.
- Konfigurasi API dibaca dari `src/lib/axios.js`.
- Beberapa stream realtime memakai `EventSource`, sehingga backend harus mendukung koneksi SSE dan CORS yang sesuai.

---

## Menjalankan Project

Development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Script tersedia di `package.json`:

| Script | Perintah | Fungsi |
| --- | --- | --- |
| `dev` | `vite` | Menjalankan dev server dengan HMR. |
| `build` | `vite build` | Membuat bundle production ke folder `dist/`. |
| `preview` | `vite preview` | Preview bundle production secara lokal. |
| `lint` | `eslint .` | Mengecek kualitas kode. |

---

## Struktur Folder

Struktur utama project:

```text
klinik-CRM/
|-- .env                         -> Konfigurasi environment lokal.
|-- .gitattributes               -> Aturan atribut Git.
|-- .gitignore                   -> File/folder yang diabaikan Git.
|-- components.json              -> Konfigurasi shadcn/ui dan alias komponen.
|-- eslint.config.js             -> Konfigurasi ESLint.
|-- index.html                   -> HTML entry untuk Vite.
|-- jsconfig.json                -> Konfigurasi JavaScript dan path alias.
|-- package.json                 -> Script dan daftar dependency.
|-- package-lock.json            -> Lockfile dependency npm.
|-- README.md                    -> Dokumentasi project.
|-- vercel.json                  -> Konfigurasi deploy Vercel.
|-- vite.config.js               -> Konfigurasi Vite, React, Tailwind, dan alias.
|-- dist/                        -> Output build production.
|-- node_modules/                -> Dependency hasil instalasi npm.
|-- public/                      -> Asset statis publik.
`-- src/                         -> Source code aplikasi.
```

Struktur `src/`:

```text
src/
|-- App.jsx                      -> Definisi router, protected route, dan halaman.
|-- App.css                      -> Style tambahan level aplikasi.
|-- index.css                    -> Global CSS, Tailwind, theme variable.
|-- main.jsx                     -> Entry point React ke DOM.
|-- assets/                      -> Asset internal yang diimport oleh source code.
|-- components/                  -> Komponen reusable lintas halaman.
|-- hooks/                       -> Custom hook global.
|-- layouts/                     -> Layout utama aplikasi.
|-- lib/                         -> Helper, konfigurasi library, dan util kecil.
|-- pages/                       -> Modul halaman berdasarkan route.
|-- services/                    -> API client per domain fitur.
`-- utils/                       -> Utility formatting umum.
```

Struktur modul halaman:

```text
src/pages/
|-- auth/                        -> Halaman login dan form autentikasi.
|-- dashboard/                   -> Dashboard operational overview.
|-- inbox/                       -> Unified inbox dan percakapan pasien.
|-- patients/                    -> Database pasien dan detail pasien.
|-- appointments/                -> Jadwal appointment dan booking baru.
|-- marketing/                   -> Campaign marketing dan template pesan.
|-- loyalty/                     -> Poin, rewards, dan katalog loyalty.
|-- feedback/                    -> Placeholder feedback/support.
`-- settings/                    -> Pengaturan klinik, integrasi, role, security.
```

---

## Penjelasan Folder dan File

### Root Project

| Path | Penjelasan |
| --- | --- |
| `index.html` | Template HTML yang menjadi entry Vite. React akan mount ke elemen root di file ini. |
| `vite.config.js` | Mengaktifkan plugin React dan Tailwind CSS. Juga mendefinisikan alias `@` ke folder `src`. |
| `components.json` | Konfigurasi shadcn/ui, style `radix-vega`, mode JavaScript (`tsx: false`), alias `@/components`, `@/lib`, `@/hooks`, dan icon library Lucide. |
| `jsconfig.json` | Membantu editor memahami alias import JavaScript. |
| `eslint.config.js` | Aturan lint untuk React hooks, React refresh, globals, dan JavaScript modern. |
| `vercel.json` | Konfigurasi deployment untuk Vercel. |
| `.env` | Environment lokal. Minimal berisi `VITE_API_URL`. |
| `dist/` | Hasil build production. Folder ini dibuat oleh `npm run build`. |
| `public/` | Asset statis yang bisa diakses langsung dari root URL aplikasi. |

### `public/`

| Path | Penjelasan |
| --- | --- |
| `public/favicon.svg` | Favicon aplikasi. |
| `public/icons.svg` | Kumpulan icon SVG statis. |

### `src/assets/`

| Path | Penjelasan |
| --- | --- |
| `hero.png` | Asset gambar internal. |
| `react.svg`, `vite.svg` | Asset bawaan/pendukung dari template atau eksperimen awal. |

### `src/components/`

Komponen yang dapat dipakai lintas halaman.

| Path | Penjelasan |
| --- | --- |
| `app-sidebar.jsx` | Sidebar utama aplikasi, berisi navigasi modul CRM. |
| `nav-main.jsx` | Komponen navigasi menu utama. |
| `nav-projects.jsx` | Komponen daftar project/menu tambahan pada sidebar. |
| `nav-user.jsx` | Komponen informasi dan menu user. |
| `team-switcher.jsx` | Komponen switcher klinik/team. |
| `datePicker.jsx` | Komponen date picker reusable. |
| `index.jsx` | Barrel file, saat ini kosong. |
| `ui/` | Komponen shadcn/ui seperti button, card, table, dialog, sidebar, tooltip, input, dan lain-lain. |

Komponen penting di `src/components/ui/`:

```text
alert.jsx, avatar.jsx, badge.jsx, breadcrumb.jsx, button.jsx,
calendar.jsx, card.jsx, checkbox.jsx, collapsible.jsx, dialog.jsx,
dropdown-menu.jsx, field.jsx, input.jsx, input-group.jsx, label.jsx,
popover.jsx, progress.jsx, scroll-area.jsx, select.jsx, separator.jsx,
sheet.jsx, sidebar.jsx, skeleton.jsx, switch.jsx, table.jsx,
textarea.jsx, tooltip.jsx, uploadLogo.jsx
```

### `src/hooks/`

Custom hook global.

| Path | Penjelasan |
| --- | --- |
| `use-mobile.js` | Deteksi breakpoint mobile untuk UI responsive. |
| `useActivityNotifications.js` | Mengambil notifikasi aktivitas, menghitung unread, mark read, dan mark all read. |
| `useNotificationSound.js` | Helper untuk audio notifikasi. |

### `src/layouts/`

| Path | Penjelasan |
| --- | --- |
| `MainLayout.jsx` | Layout utama setelah login. Berisi sidebar, topbar, search, notification bell, avatar user, logout, dan outlet untuk page aktif. |

### `src/lib/`

| Path | Penjelasan |
| --- | --- |
| `axios.js` | Instance Axios global dengan `baseURL`, token Authorization, refresh token saat 401, dan redirect ke `/login` jika session gagal diperbarui. |
| `date.js` | Helper tanggal ringkas. |
| `settings-options.js` | Opsi statis untuk halaman settings. |
| `utils.js` | Helper `cn()` untuk merge class Tailwind menggunakan `clsx` dan `tailwind-merge`. |

### `src/services/`

Service adalah lapisan komunikasi API. UI dan hooks sebaiknya memanggil file service, bukan langsung memanggil Axios.

| Path | Domain | Penjelasan |
| --- | --- | --- |
| `auth.service.js` | Auth | Login, logout, refresh token, simpan session, hapus session, baca user/token dari browser storage. |
| `activity.service.js` | Activity | Activity logs, notification, audit logs, login logs, mark read, mark all read. |
| `appointment.service.js` | Appointment | Ambil appointment, cari berdasarkan nomor telepon, buat appointment, hapus appointment. |
| `patients.service.js` | Patients | CRUD pasien, cari pasien berdasarkan phone, RM, ID. |
| `marketing.service.js` | Marketing | Ambil campaign, buat campaign, update campaign berdasarkan nama. |
| `settings.service.js` | Settings | Health check, chatbot settings, update chatbot settings, stream status WhatsApp/RME. |
| `unifiendBox.service.js` | Inbox | Pesan, latest messages, send, broadcast, handoff, reply handoff, stream pesan terbaru dan chat. |
| `users.service.js` | Users | CRUD user untuk modul user roles/team members. |

### `src/utils/`

| Path | Penjelasan |
| --- | --- |
| `formatMessage.js` | Utility formatting pesan. |
| `formatTime.js` | Utility formatting waktu. |

---

## Detail Modul Halaman

### `src/pages/auth/`

```text
auth/
|-- login.jsx                    -> Halaman login.
`-- components/
    `-- login-form.jsx           -> Form login dan submit credential.
```

Login memakai `auth.service.js`. Setelah token tersimpan, route yang dilindungi dapat diakses.

### `src/pages/dashboard/`

```text
dashboard/
|-- index.jsx
`-- components/
    |-- chatbotInsight.jsx
    |-- conversationsChart.jsx
    |-- conversionFunnelChart.jsx
    |-- handlingChart.jsx
    `-- liveActivity.jsx
```

Modul dashboard menampilkan gambaran operasional CRM: insight chatbot, chart percakapan, funnel konversi, handling chart, dan aktivitas live.

### `src/pages/inbox/`

```text
inbox/
|-- index.jsx
|-- hooks/
|   |-- useChatMessages.hook.js
|   |-- usePatientProfile.hook.js
|   `-- useUnifiendInbox.hooks.js
`-- components/
    |-- chatArea/
    |   |-- index.jsx
    |   |-- chat-header.jsx
    |   |-- message-bubble.jsx
    |   |-- message-input.jsx
    |   `-- statusDivider.jsx
    |-- inboxList/
    |   |-- index.jsx
    |   |-- chat-item.jsx
    |   `-- filter-tabs.jsx
    `-- profilePanel/
        |-- index.jsx
        `-- patientsEditModal.jsx
```

Inbox adalah pusat percakapan pasien. Modul ini memisahkan daftar chat, area percakapan, dan panel profil pasien. Data pesan dan realtime stream berasal dari `unifiendBox.service.js`.

### `src/pages/patients/`

```text
patients/
|-- index.jsx
|-- data/
|   `-- dummyPatients.js
|-- utils/
|   `-- patientHelpers.js
`-- components/
    |-- patientsHeader.jsx
    |-- patientsToolbar.jsx
    |-- patientsTable.jsx
    |-- patientRow.jsx
    |-- patientStatusBadge.jsx
    |-- patientTags.jsx
    |-- patientPagination.jsx
    |-- filters/
    |   |-- searchInput.jsx
    |   |-- tagsFilter.jsx
    |   |-- visitFilter.jsx
    |   |-- frequencyFilter.jsx
    |   `-- moreFilters.jsx
    `-- detail/
        |-- patientDetailPanel.jsx
        |-- patientProfile.jsx
        |-- patientStats.jsx
        |-- patientTimeline.jsx
        |-- patientInternalNotes.jsx
        `-- patientQuickActions.jsx
```

Modul pasien mengelola data pasien dalam bentuk tabel dan panel detail. Untuk integrasi backend, gunakan `patients.service.js`.

### `src/pages/appointments/`

```text
appointments/
|-- index.jsx
|-- hooks/
|   `-- useAppointments.hook.js
`-- components/
    |-- appointment.header.jsx
    |-- appointment.search.jsx
    |-- appointment.list.jsx
    |-- appointment.calendar.jsx
    |-- new.booking.modal.jsx
    |-- today.schedule.jsx
    |-- doctors.card.jsx
    `-- insights.card.jsx
```

Modul appointment mengatur jadwal pasien, pencarian booking, jadwal hari ini, daftar dokter, dan modal booking baru.

### `src/pages/marketing/`

```text
marketing/
|-- index.jsx
|-- data/
|   `-- dummyCampaigns.js
`-- components/
    |-- marketingHeader.jsx
    |-- marketingStats.jsx
    |-- marketingStatCard.jsx
    |-- campaignsToolbar.jsx
    |-- campaignsTable.jsx
    |-- campaignRow.jsx
    |-- campaignStatusBadge.jsx
    |-- campaignSegmentBadge.jsx
    |-- campaignDatePicker.jsx
    |-- createCampaignPanel.jsx
    |-- messagePreview.jsx
    |-- templateSelector.jsx
    `-- progressBar.jsx
```

Modul marketing dipakai untuk membuat dan memonitor campaign. API campaign berada di `marketing.service.js`.

### `src/pages/loyalty/`

```text
loyalty/
|-- index.jsx
`-- components/
    |-- loyaltystats.jsx
    `-- rewardscatalog.jsx
```

Modul loyalty menampilkan statistik poin dan katalog reward.

### `src/pages/settings/`

```text
settings/
|-- index.jsx
|-- components/
|   |-- sidebar.jsx
|   `-- settingTabs.jsx
|-- general/
|   |-- index.jsx
|   `-- components/
|       |-- clinicInformation.jsx
|       |-- LocalizationSettings.jsx
|       `-- operatingHours.jsx
|-- whatsapp-api/
|   |-- index.jsx
|   |-- components/
|   |   `-- api-credential.jsx
|   `-- hooks/
|       `-- useConnectionStatus.js
|-- chatbot-settings/
|   |-- index.jsx
|   |-- components/
|   |   |-- aiPersone.jsx
|   |   |-- hybridAI.jsx
|   |   `-- transparancy.jsx
|   `-- hooks/
|       `-- useChatbotSettings.js
|-- user-roles/
|   |-- index.jsx
|   |-- components/
|   |   |-- rolePermissions.jsx
|   |   `-- teamMembers.jsx
|   `-- hooks/
|       `-- useTeamMembers.js
`-- security/
    |-- index.jsx
    |-- components/
    |   |-- accountSecurity.jsx
    |   |-- recentLogin.jsx
    |   `-- systemAuditLog.jsx
    `-- hooks/
        `-- useSecurityActivity.js
```

Settings menjadi pusat konfigurasi aplikasi. Beberapa bagian mengambil data dari `settings.service.js`, `users.service.js`, dan `activity.service.js`.

### `src/pages/feedback/`

```text
feedback/
`-- index.jsx
```

Modul feedback/support saat ini masih minimal.

---

## Routing Aplikasi

Routing didefinisikan di `src/App.jsx` menggunakan `createBrowserRouter`.

| Route | Komponen | Akses | Keterangan |
| --- | --- | --- | --- |
| `/login` | `LoginPage` | Public | Halaman login. |
| `/` | Redirect ke `/dashboard` | Protected | Root diarahkan ke dashboard. |
| `/dashboard` | `Dashboard` | Protected | Operational overview. |
| `/inbox` | `Inbox` | Protected | Inbox dan percakapan. |
| `/patients` | `Patients` | Protected | Database pasien. |
| `/appointments` | `Appointments` | Protected | Jadwal appointment. |
| `/marketing` | `Marketing` | Protected | Campaign marketing. |
| `/loyalty` | `Loyalty` | Protected | Loyalty dan rewards. |
| `/feedback` | `Feedback` | Protected | Feedback/support. |
| `/settings` | `General` | Protected | General settings sebagai child index. |
| `/settings/whatsapp-api` | `WhatsapApi` | Protected | Integrasi WhatsApp API. |
| `/settings/chatbot-settings` | `ChatbotSettings` | Protected | Pengaturan chatbot. |
| `/settings/user-roles` | `UserRoles` | Protected | Role dan team members. |
| `/settings/security` | `Security` | Protected | Security, login log, audit log. |

Route protection:

- `ProtectedRoute` memeriksa token melalui `getAccessToken()`.
- Jika token tidak ada, user diarahkan ke `/login`.
- Route setelah login menggunakan `MainLayout`.
- Judul halaman di topbar diambil dari properti `handle.title` pada route.

---

## Arsitektur Frontend

### Alur Entry Point

```text
index.html
  -> src/main.jsx
    -> src/App.jsx
      -> RouterProvider
        -> ProtectedRoute
          -> MainLayout
            -> Page aktif lewat Outlet
```

### Pola Modul

Project memakai pola modular berbasis halaman:

- `pages/<module>/index.jsx` menjadi entry page.
- `pages/<module>/components/` berisi komponen khusus modul tersebut.
- `pages/<module>/hooks/` berisi logic data/state khusus modul tersebut.
- `services/` menyimpan panggilan API lintas modul.
- `components/ui/` menyimpan komponen design system.
- `components/` di luar `ui/` menyimpan komponen layout/navigasi lintas halaman.

### Alias Import

Alias `@` mengarah ke `src`.

Contoh:

```jsx
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
```

Konfigurasi alias berada di:

- `vite.config.js`
- `components.json`
- `jsconfig.json`

---

## Service API

### Axios Global

File: `src/lib/axios.js`

Fungsi utama:

- Membuat instance Axios dengan `baseURL: import.meta.env.VITE_API_URL`.
- Menambahkan header `Authorization: Bearer <token>` saat token tersedia.
- Menangani response `401` dengan mencoba `refreshAuthToken()`.
- Jika refresh token gagal, session dihapus dan user diarahkan ke `/login`.

### Auth Session

File: `src/services/auth.service.js`

Token dan user disimpan di browser storage:

- `access_token`
- `token`
- `refresh_token`
- `user`

Endpoint yang digunakan:

| Fungsi | Method | Endpoint |
| --- | --- | --- |
| `login` | `POST` | `/api/auth/login` |
| `logout` | `POST` | `/api/auth/logout` |
| `refreshAuthToken` | `POST` | `/api/auth/refresh` |

### Endpoint Domain Lain

| Domain | Endpoint utama |
| --- | --- |
| Activity | `/api/activity`, `/api/activity/notifications`, `/api/activity/audit`, `/api/activity/logins` |
| Appointment | `/api/appointment`, `/api/appointment/appointments`, `/api/appointment/appointments/by-phone` |
| Patients | `/api/patients`, `/api/patients/by-phone`, `/api/patients/rm/:noRM`, `/api/patients/:id` |
| Marketing | `/api/marketing/campaigns`, `/api/marketing/campaigns/by-name/:campaignName` |
| Messages/Inbox | `/api/messages`, `/api/messages/latest`, `/api/messages/:phone_number`, `/api/send`, `/api/send/broadcast` |
| Handoff | `/api/handoff`, `/api/handoff/:phone_number`, `/api/handoff/:phone_number/reply` |
| Settings | `/`, `/api/chatbot-settings`, `/api/status/whatsapp-connection`, `/api/status/rme-connection` |
| Users | `/api/users`, `/api/users/:id` |

### Realtime/SSE

Beberapa fitur memakai `EventSource`:

- `getLatestMessagesStream(limit)` untuk stream pesan terbaru.
- `getChatMessagesStream(phone_number)` untuk stream chat per nomor telepon.
- `getWhatsAppConnectionStream()` untuk status koneksi WhatsApp.
- `getRmeConnectionStream()` untuk status koneksi RME.

Pastikan backend mengirim response SSE valid dan CORS memperbolehkan origin frontend.

---

## Komponen UI

Project menggunakan shadcn/ui dengan style `radix-vega`. Komponen UI berada di `src/components/ui/`.

Contoh penggunaan:

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contoh Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Simpan</Button>
      </CardContent>
    </Card>
  );
}
```

Helper class:

```jsx
import { cn } from "@/lib/utils";

<div className={cn("rounded-md", isActive && "bg-primary text-white")} />
```

---

## Panduan Pengembangan

### Menambah Halaman Baru

1. Buat folder baru di `src/pages/<nama-modul>/`.
2. Tambahkan `index.jsx` sebagai entry page.
3. Jika perlu, buat `components/`, `hooks/`, `data/`, atau `utils/` di dalam modul.
4. Daftarkan route di `src/App.jsx`.
5. Tambahkan menu sidebar jika halaman harus muncul di navigasi.

Contoh struktur:

```text
src/pages/reports/
|-- index.jsx
|-- components/
`-- hooks/
```

### Menambah Service API

1. Buat file di `src/services/<domain>.service.js`.
2. Import `api` dari `@/lib/axios`.
3. Export fungsi async sesuai kebutuhan UI.

Contoh:

```js
import { api } from "@/lib/axios";

export const getReports = async () => {
  const res = await api.get("/api/reports");
  return res.data;
};
```

### Menambah Komponen Reusable

- Komponen global lintas halaman: `src/components/`.
- Komponen design system: `src/components/ui/`.
- Komponen khusus halaman: `src/pages/<module>/components/`.

### Naming Convention yang Terlihat di Project

- Komponen React memakai ekstensi `.jsx`.
- Custom hook memakai prefix `use`, contoh `useAppointments.hook.js`.
- Service memakai suffix `.service.js`.
- Komponen modul sering memakai nama domain, contoh `appointment.list.jsx`, `patientsTable.jsx`, `campaignRow.jsx`.

### Praktik yang Disarankan

- Gunakan import alias `@/` agar path tetap pendek.
- Letakkan logic API di `services/`, bukan langsung di komponen.
- Letakkan state/data fetching khusus halaman di `hooks/`.
- Pertahankan komponen UI kecil dan spesifik.
- Jalankan `npm run lint` sebelum commit.
- Jangan hardcode base URL API di komponen; gunakan `VITE_API_URL`.

---

## Build dan Deploy

Build production:

```bash
npm run build
```

Output build berada di:

```text
dist/
```

Deploy Vercel:

- File `vercel.json` sudah tersedia.
- Pastikan environment variable `VITE_API_URL` juga diset di dashboard Vercel.
- Setelah deploy, cek route protected dan refresh halaman langsung pada route nested seperti `/settings/security`.

---

## Catatan Maintenance

- README ini mendokumentasikan struktur project saat ini berdasarkan isi folder dan file yang ada di repository.
- Jika modul baru ditambahkan, update bagian `Struktur Folder`, `Routing Aplikasi`, dan `Service API`.
- Jika dependency berubah, update bagian `Tech Stack`.
- Jika endpoint backend berubah, update bagian `Service API` dan hook/service terkait.
