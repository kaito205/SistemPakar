import React from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  // Mock data representing recent diagnostics
  const RECENT_DIAGNOSES = [
    { id: 1, name: "Ahmad Faisal", date: "14 Juli 2026, 17:05", score: 84.3, level: "Depresi Sedang (M2)", type: "M2" },
    { id: 2, name: "Siti Rahmawati", date: "14 Juli 2026, 16:12", score: 92.1, level: "Depresi Berat (M3)", type: "M3" },
    { id: 3, name: "Budi Santoso", date: "13 Juli 2026, 21:40", score: 42.0, level: "Depresi Ringan (M1)", type: "M1" },
    { id: 4, name: "Dina Lestari", date: "13 Juli 2026, 11:15", score: 58.5, level: "Depresi Sedang (M2)", type: "M2" },
    { id: 5, name: "Rian Hidayat", date: "12 Juli 2026, 09:30", score: 18.2, level: "Normal (Tidak Depresi)", type: "Normal" }
  ];

  return (
    <AppLayout>
      <Head title="Dashboard Admin" />

      {/* Welcome Greeting Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Overview Panel</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selamat datang kembali, Administrator. Berikut adalah rangkuman statistik aktivitas diagnosa terkini.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-650 dark:text-slate-350 border border-slate-200/50 dark:border-slate-700/50">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          Sistem Aktif & Terpantau
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Diagnosa */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/[0.03] rounded-full blur-lg"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Total Diagnosa</span>
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-650 dark:text-teal-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">154</span>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">+12% mgg ini</span>
          </div>
        </div>

        {/* Card 2: Depresi Ringan */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/[0.03] rounded-full blur-lg"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Depresi Ringan (M1)</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-650 dark:text-emerald-400">
              <span className="font-bold text-xs">M1</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">68</span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">44.1% dari total</span>
          </div>
        </div>

        {/* Card 3: Depresi Sedang */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/[0.03] rounded-full blur-lg"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Depresi Sedang (M2)</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-650 dark:text-amber-400">
              <span className="font-bold text-xs">M2</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">52</span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">33.7% dari total</span>
          </div>
        </div>

        {/* Card 4: Depresi Berat */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/[0.03] rounded-full blur-lg"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Depresi Berat (M3)</span>
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-650 dark:text-rose-400">
              <span className="font-bold text-xs">M3</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">34</span>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Tindakan Cepat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Analytical Chart & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend & Distribution Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mock Trend Chart View */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Tren Kunjungan & Diagnosa</h3>
                <p className="text-xs text-slate-400">Statistik aktivitas harian dalam satu minggu terakhir.</p>
              </div>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Minggu Ini</span>
            </div>

            {/* Premium SVG Mock Chart */}
            <div className="relative h-60 w-full flex items-end justify-between px-2 pt-6 border-b border-slate-100 dark:border-slate-800">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-10 pb-6 pt-6">
                <div className="w-full border-t border-slate-400"></div>
                <div className="w-full border-t border-slate-400"></div>
                <div className="w-full border-t border-slate-400"></div>
                <div className="w-full border-t border-slate-400"></div>
              </div>

              {/* Bar Columns */}
              {[
                { label: "Sen", value: 40, active: 15 },
                { label: "Sel", value: 65, active: 25 },
                { label: "Rab", value: 85, active: 40 },
                { label: "Kam", value: 50, active: 18 },
                { label: "Jum", value: 110, active: 55 },
                { label: "Sab", value: 95, active: 48 },
                { label: "Ahd", value: 120, active: 62 }
              ].map((day, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 group z-10">
                  <div className="relative w-8 bg-slate-100 dark:bg-slate-800/40 rounded-t-lg flex flex-col justify-end overflow-hidden transition-all duration-300 hover:bg-slate-200/50" style={{ height: `${day.value * 1.5}px` }}>
                    <div className="w-full bg-teal-500/80 dark:bg-teal-500/60 rounded-t-lg" style={{ height: `${day.active * 1.5}px` }}></div>
                  </div>
                  <span className="mt-3 text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500">{day.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-800"></span>
                <span>Total Pengunjung</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-500"></span>
                <span>Penyelesaian Tes</span>
              </div>
            </div>
          </div>

          {/* Recent Log Table */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Aktivitas Diagnosa Terbaru</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3 w-[180px]">Nama Mahasiswa</th>
                    <th className="pb-3 w-[150px]">Waktu Pengujian</th>
                    <th className="pb-3 w-[100px]">Skor CF</th>
                    <th className="pb-3">Hasil Kategori</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {RECENT_DIAGNOSES.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="py-3 font-bold text-slate-800 dark:text-white">{d.name}</td>
                      <td className="py-3 text-slate-450 dark:text-slate-400">{d.date}</td>
                      <td className="py-3 font-mono font-bold text-slate-700 dark:text-slate-300">{d.score.toFixed(1)}%</td>
                      <td className="py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          d.type === "M3"
                            ? "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                            : d.type === "M2"
                            ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                            : d.type === "M1"
                            ? "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20"
                            : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700"
                        }`}>
                          {d.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Parameter Status & Health */}
        <div className="space-y-8">
          {/* Knowledge Base Status Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6">Status Parameter</h3>
            
            <div className="space-y-5">
              {/* Parameter 1: Gejala */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-teal-500/10 text-teal-650 dark:text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Gejala Depresi</h4>
                    <p className="text-[10px] text-slate-400">15 Kode Gejala Terdaftar</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-white bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-lg">15</span>
              </div>

              {/* Parameter 2: Aturan CF */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-teal-500/10 text-teal-650 dark:text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Kombinasi Aturan CF</h4>
                    <p className="text-[10px] text-slate-400">3 Kategori Aturan Pakar</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-white bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-lg">3</span>
              </div>

              {/* Parameter 3: Keadaan Sistem */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-teal-500/10 text-teal-650 dark:text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Keamanan Akses</h4>
                    <p className="text-[10px] text-slate-400">Enkripsi Rute Terproteksi</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-lg">AKTIF</span>
              </div>
            </div>
          </div>

          {/* Quick Support Actions */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-xl"></div>
            <h3 className="font-extrabold text-lg mb-2">Butuh Bantuan Teknis?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Jika terdapat kendala sinkronisasi data pakar atau penyesuaian aturan klinis depresi, silakan buka dokumentasi manual pengembang.
            </p>
            <a
              href="https://github.com/kaito205/SistemPakar"
              target="_blank"
              className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition duration-250 focus:outline-none"
            >
              Buka Repositori Proyek
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
