import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function DiagnosisResult() {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    const saved = sessionStorage.getItem("diagnosis_result");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal membaca hasil diagnosa", e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  if (!data || !data.top_result) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 font-sans flex flex-col justify-center items-center p-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-6 border border-teal-200 dark:border-teal-800">
            <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Belum Ada Hasil Diagnosa
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 leading-relaxed">
            Anda belum melakukan pengisian kuesioner diagnosa diabetes. Silakan isi form konsultasi terlebih dahulu.
          </p>
          <Link
            href="/diagnosa"
            className="inline-block w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/30 transition text-center text-xs"
          >
            Mulai Form Konsultasi &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const { user_info, top_result, results, solutions } = data;
  const isHealthy = !top_result || top_result.percentage === 0;

  return (
    <>
      <Head title="Hasil Diagnosa Certainty Factor - Diabetes Melitus" />

      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white text-xl shadow-lg shadow-teal-600/30">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
                  Diabe<span className="text-teal-600 dark:text-teal-400">CF</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Hasil Diagnosa Medis
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-teal-500 transition"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  )}
                </svg>
              </button>
              <Link
                href="/diagnosa"
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition flex items-center gap-1.5"
              >
                <span>Diagnosa Ulang</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Patient Card Header */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block mb-1">
                Laporan Diagnosa Sistem Pakar
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Hasil Diagnosa: {user_info?.nama}
              </h1>
              {user_info?.nim && user_info.nim !== '-' && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Identitas: {user_info.nim} • {user_info.prodi} ({user_info.angkatan})
                </p>
              )}
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Cetak Hasil</span>
            </button>
          </div>

          {/* Main Top Result Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-black text-xs rounded-full mb-3">
                  {isHealthy ? "P000" : top_result.disease_code}
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {isHealthy ? "Sehat / Tidak Terdeteksi Diabetes" : top_result.disease_name}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  {isHealthy
                    ? "Berdasarkan gejala yang diinputkan, Anda tidak menunjukkan derivasi gejala klinis yang mengarah pada Diabetes Melitus Tipe 1 maupun Tipe 2."
                    : top_result.description}
                </p>
              </div>

              {/* Certainty Factor Percentage Gauge Card */}
              <div className="shrink-0 text-center bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/60 dark:to-slate-900 p-6 rounded-3xl border border-teal-200/60 dark:border-teal-800/60 min-w-[200px]">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Tingkat Kepastian (CF)
                </div>
                <div className="text-5xl font-black text-teal-600 dark:text-teal-400 my-1">
                  {isHealthy ? "0.0" : top_result.percentage}%
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${isHealthy ? 0 : top_result.percentage}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block font-medium">
                  {isHealthy ? "Kondisi Sehat" : `CF Total: ${top_result.cf}`}
                </span>
              </div>
            </div>

            {/* Recommendations / Solutions Section */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Rekomendasi Medis, Pengobatan &amp; Pencegahan:</span>
              </h3>
              <ul className="space-y-2.5">
                {(solutions || []).map((sol, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison of All Diseases */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Hasil Perbandingan Derajat Kepastian Penyakit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(results || []).map((res) => (
                <div
                  key={res.disease_code}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">{res.disease_code}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">{res.disease_name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-teal-600 dark:text-teal-400 block">{res.percentage}%</span>
                    <span className="text-[10px] text-slate-400">CF: {res.cf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculation Breakdown Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Rincian Perhitungan Algoritma Certainty Factor (CF[H,E])</span>
              </span>
              <span>{showBreakdown ? "▲ Sembunyikan" : "▼ Tampilkan Rincian"}</span>
            </button>

            {showBreakdown && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Rumus dasar perkalian bobot Certainty Factor: <br />
                  <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-teal-600 dark:text-teal-400 font-mono text-[11px]">
                    CF[H,E] = CF_user &times; CF_pakar
                  </code>
                  <br />
                  Kemudian dikombinasikan secara berurutan: <br />
                  <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-teal-600 dark:text-teal-400 font-mono text-[11px]">
                    CF_comb = CF_old + CF_new &times; (1 - CF_old)
                  </code>
                </p>

                {(results || []).map((res) => (
                  <div key={res.disease_code} className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                      Gejala Terdeteksi pada {res.disease_code} ({res.disease_name}):
                    </h4>

                    {res.matched_symptoms.length === 0 ? (
                      <p className="text-xs text-slate-400">Tidak ada gejala terpilih yang cocok untuk penyakit ini.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                              <th className="p-2.5">Kode</th>
                              <th className="p-2.5">Gejala Klinis</th>
                              <th className="p-2.5">CF User</th>
                              <th className="p-2.5">CF Pakar</th>
                              <th className="p-2.5">CF[H,E] (Hasil)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {res.matched_symptoms.map((ms) => (
                              <tr key={ms.symptom_code}>
                                <td className="p-2.5 font-bold">{ms.symptom_code}</td>
                                <td className="p-2.5">{ms.symptom_name}</td>
                                <td className="p-2.5">{ms.user_cf}</td>
                                <td className="p-2.5">{ms.cf_pakar}</td>
                                <td className="p-2.5 font-bold text-teal-600 dark:text-teal-400">{ms.cf_he}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-block px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:border-teal-500 transition"
            >
              &larr; Kembali ke Beranda Utama
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
