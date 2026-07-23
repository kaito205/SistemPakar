import React from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  stats = { total: 0, p001: 0, p002: 0, healthy: 0 },
  recentDiagnoses = [],
  symptomsCount = 0,
  diseasesCount = 0,
  rulesCount = 0,
  trendData = []
}) {
  return (
    <AppLayout>
      <Head title="Dashboard Admin - Sistem Pakar Diabetes" />

      {/* Welcome Greeting Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Dashboard Sistem Pakar Diabetes Melitus</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Selamat datang, Administrator Pakar. Ringkasan aktivitas diagnosa Certainty Factor (CF).
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-xs font-semibold text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          Sistem Pakar Aktif (Algoritma Certainty Factor)
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Diagnosa */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Total Diagnosa</span>
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.total}</span>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">kasus terpantau</span>
          </div>
        </div>

        {/* Card 2: Diabetes Tipe 1 (P001) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Diabetes Tipe 1 (P001)</span>
            <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs">
              P001
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.p001}</span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {stats.total > 0 ? ((stats.p001 / stats.total) * 100).toFixed(1) : 0}% dari total
            </span>
          </div>
        </div>

        {/* Card 3: Diabetes Tipe 2 (P002) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Diabetes Tipe 2 (P002)</span>
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
              P002
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.p002}</span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {stats.total > 0 ? ((stats.p002 / stats.total) * 100).toFixed(1) : 0}% dari total
            </span>
          </div>
        </div>

        {/* Card 4: Sehat / Normal */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative overflow-hidden group hover:scale-[1.02] transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold tracking-wider">Sehat / Normal</span>
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              P000
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.healthy}</span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {stats.total > 0 ? ((stats.healthy / stats.total) * 100).toFixed(1) : 0}% dari total
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Diagnoses & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Diagnoses Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Riwayat Diagnosa Terbaru</h3>
              <p className="text-xs text-slate-400">5 aktivitas pemeriksaan pasien terakhir</p>
            </div>
            <Link
              href="/admin/riwayat"
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-4">Nama Pasien</th>
                  <th className="py-3 px-4">Hasil Diagnosa</th>
                  <th className="py-3 px-4">Tingkat CF</th>
                  <th className="py-3 px-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentDiagnoses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-slate-400">
                      Belum ada data diagnosa pasien.
                    </td>
                  </tr>
                ) : (
                  recentDiagnoses.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                        {item.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.disease_code === 'P001'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300'
                            : item.disease_code === 'P002'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300'
                        }`}>
                          {item.disease_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-extrabold text-teal-600 dark:text-teal-400">
                        {item.score}%
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {item.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Knowledge Base Statistics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Informasi Pakar</h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Jenis Penyakit</div>
                  <div className="text-xl font-black text-slate-800 dark:text-white">{diseasesCount} Jenis</div>
                </div>
                <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600">
                  <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Indikator Gejala</div>
                  <div className="text-xl font-black text-slate-800 dark:text-white">{symptomsCount} Gejala</div>
                </div>
                <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600">
                  <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Aturan Relasi &amp; CF Pakar</div>
                  <div className="text-xl font-black text-slate-800 dark:text-white">{rulesCount} Aturan</div>
                </div>
                <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600">
                  <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/admin/aturan"
              className="w-full inline-block py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-xs transition"
            >
              Kelola Aturan Basis Pengetahuan &rarr;
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
