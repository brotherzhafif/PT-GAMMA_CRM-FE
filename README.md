# 🏥 Klinik CRM - Frontend

Sistem Customer Relationship Management (CRM) untuk klinik yang dibangun dengan teknologi modern dan user interface yang intuitif.

---

## 📋 Daftar Isi

- [📋 Daftar Isi](#-daftar-isi)
- [🚀 Teknologi Stack](#-teknologi-stack)
- [💻 Persyaratan Sistem](#-persyaratan-sistem)
- [📦 Instalasi](#-instalasi)
- [⚙️ Setup & Konfigurasi](#️-setup--konfigurasi)
- [▶️ Menjalankan Project](#️-menjalankan-project)
- [📁 Struktur Project](#-struktur-project)
- [🎨 Komponen & UI](#-komponen--ui)
- [📊 Apex Chart - Implementasi & Penggunaan](#-apex-chart---implementasi--penggunaan)
- [🔧 Scripts yang Tersedia](#-scripts-yang-tersedia)
- [📚 Panduan Pengembangan](#-panduan-pengembangan)
- [🐛 ESLint & Code Quality](#-eslint--code-quality)

---

## 🚀 Teknologi Stack

### **Frontend Framework & Build Tool**

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **React** | 19.2.5 | JavaScript library untuk membangun user interfaces dengan komponen reusable |
| **Vite** | 8.0.10 | Build tool modern yang cepat dan efisien menggantikan Webpack |
| **React Router DOM** | 7.14.2 | Library routing untuk navigasi multi-page dalam SPA (Single Page Application) |
| **JavaScript** | ES6+ | Bahasa pemrograman, menggunakan JSConfig (bukan TypeScript) |

### **Styling & Design System**

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **Tailwind CSS** | 4.2.4 | Utility-first CSS framework untuk styling yang cepat dan konsisten |
| **Tailwindcss/Vite** | 4.2.4 | Plugin Vite untuk integrasi Tailwind CSS |
| **Shadcn UI** | 4.6.0 | Koleksi komponen React yang dapat dikustomisasi berbasis Radix UI |
| **Radix UI** | 1.4.3 | Library primitif UI yang accessible dan unstyled untuk perancangan komponen |
| **Class Variance Authority** | 0.7.1 | Library untuk membuat class-based styling patterns yang powerful |
| **Tailwind Merge** | 3.5.0 | Utility untuk menggabungkan Tailwind classes dengan aman |
| **CLSX** | 2.1.1 | Library utility untuk conditional className manipulation |

### **Icons & Typography**

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **Lucide React** | 1.12.0 | Icon library modern dengan +430 SVG icons yang dapat dikustomisasi |
| **Fontsource Variable Inter** | 5.2.8 | Variable font family Inter yang dapat dimuat secara lokal |

### **Animasi & Effects**

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **TW Animate CSS** | 1.4.0 | Library animasi berbasis Tailwind CSS untuk efek visual yang smooth |

### **Development Tools**

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **ESLint** | 10.2.1 | Linter untuk menganalisis dan enforce code quality standards |
| **@ESLint/js** | 10.0.1 | Config ESLint yang recommended |
| **Vite Plugin React** | 6.0.1 | Plugin Vite untuk Fast Refresh dan JSX support |
| **ESLint Plugin React Hooks** | 7.1.1 | Lint rules untuk React Hooks best practices |
| **ESLint Plugin React Refresh** | 0.5.2 | Lint rules untuk Vite React refresh compatibility |

---

## 💻 Persyaratan Sistem

Sebelum memulai, pastikan sistem Anda memiliki:

- **Node.js** ≥ 16.x (disarankan v18 atau v20)
- **npm** ≥ 8.x atau **yarn** ≥ 1.22.x (atau **bun**)
- **Git** untuk version control
- Text editor/IDE (VS Code disarankan)

**Cek versi installed:**
```bash
node --version
npm --version
git --version
```

---

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/brotherzhafif/PT-GAMMA_CRM-FE.git
cd klinik-CRM
```

### 2. Install Dependencies
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan bun
bun install
```

### 3. Verifikasi Instalasi
```bash
npm list react
npm list vite
npm list tailwindcss
```

---

## ⚙️ Setup & Konfigurasi

### Konfigurasi Path Aliases

Project sudah dikonfigurasi dengan path aliases di `vite.config.js`:

```js
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"), 
  },
}
```

Gunakan `@` untuk import dari folder `src` (lebih clean):
```js
// ❌ Tanpa alias
import { Button } from '../../../components/ui/button'

// ✅ Dengan alias
import { Button } from '@/components/ui/button'
```

### Konfigurasi Tailwind CSS

Konfigurasi Tailwind ada di `components.json`:

```json
{
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## ▶️ Menjalankan Project

### Development Mode
```bash
npm run dev
```
- Server akan berjalan di `http://localhost:5173`
- Hot Module Replacement (HMR) aktif otomatis
- Refresh halaman saat file berubah

### Build untuk Production
```bash
npm run build
```
- Menghasilkan optimized bundle di folder `dist/`
- File-file akan diminify dan dioptimasi

### Preview Build Production
```bash
npm run preview
```
- Preview hasil build production secara lokal
- Berguna untuk test sebelum deploy

### Check & Fix Code Quality
```bash
npm run lint
```
- Melakukan analisis code menggunakan ESLint
- Menampilkan warning dan error dalam code

---

## 📁 Struktur Project

```
klinik-CRM/
├── public/                 # Assets statis (favicon, dll)
├── src/
│   ├── assets/            # Gambar, video, font lokal
│   ├── components/        # Komponen React reusable
│   │   ├── ui/           # Komponen UI dari Shadcn
│   │   ├── app-sidebar.jsx
│   │   ├── nav-main.jsx
│   │   ├── nav-projects.jsx
│   │   ├── nav-user.jsx
│   │   └── team-switcher.jsx
│   ├── hooks/            # Custom React Hooks
│   │   └── use-mobile.js
│   ├── layouts/          # Layout templates
│   │   └── MainLayout.jsx
│   ├── lib/              # Utility functions
│   │   └── utils.js
│   ├── pages/            # Page components (route-based)
│   │   ├── appointments/
│   │   ├── dashboard/
│   │   ├── inbox/
│   │   ├── loyalty/
│   │   ├── marketing/
│   │   ├── patients/
│   │   └── settings/
│   ├── App.jsx           # Root component
│   ├── App.css           # Global styles
│   ├── main.jsx          # Entry point
│   └── index.css         # Base styles (Tailwind imports)
├── components.json       # Shadcn/UI config
├── vite.config.js       # Vite configuration
├── jsconfig.json        # JavaScript path aliases
├── eslint.config.js     # ESLint rules
├── package.json         # Dependencies & scripts
├── tailwind.config.js   # Tailwind configuration (auto-generated)
├── postcss.config.js    # PostCSS configuration (auto-generated)
└── README.md           # Documentation (file ini)
```

---

## 🎨 Komponen & UI

### Shadcn UI Components

Semua komponen UI dari Shadcn telah diintegrasikan di `src/components/ui/`:

- **Avatar** - Menampilkan profil user dengan inisial atau gambar
- **Breadcrumb** - Navigasi hierarki halaman
- **Button** - Tombol dengan berbagai variant
- **Collapsible** - Konten yang dapat dikembangkan/dikecilkan
- **Dropdown Menu** - Menu dropdown dengan opsi
- **Input** - Input field untuk form
- **Separator** - Garis pemisah visual
- **Sheet** - Sheet/drawer component
- **Sidebar** - Navigation sidebar
- **Skeleton** - Loading placeholder
- **Tooltip** - Tooltip informatif

**Cara menggunakan:**
```jsx
import { Button } from '@/components/ui/button'

export default function App() {
  return <Button variant="outline">Click me</Button>
}
```

### Custom Components

Komponen custom untuk aplikasi klinik:
- `app-sidebar.jsx` - Sidebar utama aplikasi
- `nav-main.jsx` - Navigation menu utama
- `nav-projects.jsx` - Navigation projects
- `nav-user.jsx` - User profile & settings
- `team-switcher.jsx` - Pengganti team/clinic

---

## 📊 Apex Chart - Implementasi & Penggunaan

### ❓ Apa itu Apex Chart?

**ApexCharts** adalah library JavaScript modern untuk membuat interactive charts dan graphs yang responsif. Library ini sempurna untuk dashboard CRM dengan berbagai tipe chart seperti:
- Line Chart (trend data)
- Area Chart (visualisasi area)
- Bar Chart (perbandingan data)
- Pie/Donut Chart (komposisi data)
- Scatter Chart (korelasi data)
- Dan banyak lagi...

### 📦 Instalasi Apex Chart

#### Step 1: Install Package
```bash
npm install apexcharts react-apexcharts
```

#### Step 2: Verifikasi Instalasi
```bash
npm list apexcharts react-apexcharts
```

Jika berhasil, output akan menampilkan versi package.

### 🚀 Cara Menggunakan Apex Chart

#### Contoh 1: Simple Line Chart
```jsx
import React from 'react'
import Chart from 'react-apexcharts'

export default function LineChartExample() {
  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#3b82f6'],
    title: {
      text: 'Grafik Pendapatan Bulanan',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yaxis: {
      title: {
        text: 'Penjualan ($)',
      },
    },
  }

  const series = [
    {
      name: 'Pendapatan',
      data: [30, 40, 35, 50, 49, 60],
    },
  ]

  return <Chart options={options} series={series} type="line" height={350} />
}
```

#### Contoh 2: Bar Chart
```jsx
import React from 'react'
import Chart from 'react-apexcharts'

export default function BarChartExample() {
  const options = {
    chart: {
      type: 'bar',
    },
    colors: ['#10b981'],
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Jumlah Pasien per Dokter',
      align: 'left',
    },
    xaxis: {
      categories: ['Dr. Ahmad', 'Dr. Siti', 'Dr. Budi', 'Dr. Rina'],
    },
    yaxis: {
      title: {
        text: 'Jumlah Pasien',
      },
    },
  }

  const series = [
    {
      name: 'Pasien',
      data: [45, 52, 38, 47],
    },
  ]

  return <Chart options={options} series={series} type="bar" height={350} />
}
```

#### Contoh 3: Donut Chart
```jsx
import React from 'react'
import Chart from 'react-apexcharts'

export default function DonutChartExample() {
  const options = {
    chart: {
      type: 'donut',
    },
    colors: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
    labels: ['Operasi Gigi', 'Pembersihan', 'Perawatan Akar', 'Lainnya'],
    title: {
      text: 'Distribusi Layanan',
      align: 'left',
    },
    legend: {
      position: 'bottom',
    },
  }

  const series = [30, 25, 35, 10]

  return <Chart options={options} series={series} type="donut" height={350} />
}
```

#### Contoh 4: Implementasi di Dashboard
```jsx
// src/pages/dashboard/index.jsx
import React from 'react'
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Dashboard() {
  // Chart options & series dapat berasal dari API
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
    },
    colors: ['#3b82f6'],
    stroke: { curve: 'smooth' },
  }

  const chartSeries = [
    {
      name: 'Kunjungan Pasien',
      data: [120, 140, 130, 160, 150, 170, 190],
    },
  ]

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Statistik Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={400}
          />
        </CardContent>
      </Card>
    </div>
  )
}
```

### 🎨 Customization Tips

#### 1. Warna Custom (Tailwind)
```jsx
const options = {
  colors: ['#3b82f6', '#10b981', '#f59e0b'], // Tailwind colors
}
```

#### 2. Responsive Chart
```jsx
const options = {
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: '100%',
        },
      },
    },
  ],
}
```

#### 3. Dark Mode Support
```jsx
const options = {
  chart: {
    background: 'transparent',
  },
  theme: {
    mode: isDarkMode ? 'dark' : 'light',
  },
}
```

### 📚 Dokumentasi Lengkap

- Website: [apexcharts.com](https://apexcharts.com)
- React Docs: [react-apexcharts](https://github.com/apexcharts/react-apexcharts)
- Contoh Interaktif: [apexcharts.com/react-charts](https://apexcharts.com/docs/react-charts/)

---

## 🔧 Scripts yang Tersedia

```bash
# Development server dengan hot reload
npm run dev

# Build production
npm run build

# Preview build production
npm run preview

# Lint & check code quality
npm run lint
```

---

## 📚 Panduan Pengembangan

### Membuat Komponen Reusable

Simpan di `src/components/`:
```jsx
// src/components/PatientCard.jsx
export default function PatientCard({ name, status, image }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
      <h3 className="font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-500">{status}</p>
    </div>
  )
}
```

### Membuat Custom Hook

Simpan di `src/hooks/`:
```js
// src/hooks/useFetchData.js
import { useState, useEffect } from 'react'

export function useFetchData(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
```

### Styling dengan Tailwind + Shadcn

```jsx
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-900">Judul</h1>
      <Button className="w-full">Klik Saya</Button>
    </div>
  )
}
```

### Best Practices

✅ **DO:**
- Gunakan path aliases (`@/`) untuk import
- Pisahkan logic dari UI components
- Gunakan custom hooks untuk reusable logic
- Commit dengan pesan yang jelas

❌ **DON'T:**
- Jangan import dengan relative path yang panjang
- Jangan mix styling (Tailwind + inline CSS berlebihan)
- Jangan lupa `.jsx` extension untuk React components
- Jangan hardcode API URLs (gunakan env variables)

---

## 🐛 ESLint & Code Quality

### Konfigurasi ESLint

Sudah dikonfigurasi di `eslint.config.js` untuk enforce:
- React/JSX best practices
- React Hooks rules
- Code consistency

### Menjalankan Linter

```bash
# Check errors & warnings
npm run lint

# Beberapa error dapat diperbaiki otomatis (jika editor support ESLint)
```

### ESLint Rules yang Diterapkan

- `react/jsx-uses-react` - JSX support
- `react-hooks/rules-of-hooks` - Aturan React Hooks
- `react-hooks/exhaustive-deps` - Dependency array validation
- `react-refresh/only-export-components` - Export components only

---

## 🚀 Next Steps

1. **Install Apex Chart** (seperti panduan di atas)
2. **Mulai membuat Dashboard** dengan charts
3. **Integrate dengan Backend API** untuk real data
4. **Setup Environment Variables** untuk API endpoints
5. **Deploy ke Production** (Vercel, Netlify, atau server sendiri)

---

## 📞 Support & Resources

- **Dokumentasi React:** https://react.dev
- **Dokumentasi Vite:** https://vitejs.dev
- **Dokumentasi Tailwind:** https://tailwindcss.com
- **Dokumentasi Shadcn/UI:** https://ui.shadcn.com
- **Dokumentasi ApexCharts:** https://apexcharts.com

---

**Happy Coding! 🚀**
