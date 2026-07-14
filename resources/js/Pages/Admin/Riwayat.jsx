import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head } from "@inertiajs/react";

// Mock diagnostic logs database representing test history
const INITIAL_LOGS = [
  {
    id: 101,
    name: "Ahmad Faisal",
    email: "faisal@mahasiswa.univ.ac.id",
    date: "14 Juli 2026, 17:05",
    score: 84.3,
    level: "Depresi Sedang (M2)",
    type: "M2",
    answers: { D1: 0.8, D3: 0.6, D5: 0.8, D8: 0.4, D11: 0.6, D14: 0.8, D15: 0.8 },
    suggestions: [
      "Cobalah menulis buku harian emosi untuk melepaskan beban pikiran.",
      "Lakukan konseling dengan konselor sebaya atau dosen pembimbing.",
      "Susun jadwal harian yang realistis dan jangan menuntut diri terlalu keras."
    ]
  },
  {
    id: 102,
    name: "Siti Rahmawati",
    email: "siti.rahma@mahasiswa.univ.ac.id",
    date: "14 Juli 2026, 16:12",
    score: 92.1,
    level: "Depresi Berat (M3)",
    type: "M3",
    answers: { D1: 1.0, D3: 0.8, D4: 0.8, D7: 0.6, D9: 0.8, D11: 1.0, D12: 0.8, D15: 0.8 },
    suggestions: [
      "Sangat disarankan segera menjadwalkan sesi dengan psikolog profesional.",
      "Bicarakan kondisi ini dengan keluarga dekat atau teman tepercaya.",
      "Hindari mengisolasi diri, tetaplah berada di lingkungan yang aman."
    ]
  },
  {
    id: 103,
    name: "Budi Santoso",
    email: "budi.s@mahasiswa.univ.ac.id",
    date: "13 Juli 2026, 21:40",
    score: 42.0,
    level: "Depresi Ringan (M1)",
    type: "M1",
    answers: { D2: 0.6, D13: 0.8 },
    suggestions: [
      "Lakukan olahraga ringan secara rutin 3 kali seminggu.",
      "Perbaiki pola makan dengan gizi seimbang secara teratur."
    ]
  },
  {
    id: 104,
    name: "Dina Lestari",
    email: "dina.l@mahasiswa.univ.ac.id",
    date: "13 Juli 2026, 11:15",
    score: 58.5,
    level: "Depresi Sedang (M2)",
    type: "M2",
    answers: { D1: 0.6, D5: 0.8, D10: 0.6, D11: 0.6, D12: 0.8, D15: 0.6 },
    suggestions: [
      "Coba teknik relaksasi pernapasan dalam setiap kali merasa cemas.",
      "Kurangi konsumsi kafein dan buat rutinitas tidur yang tenang."
    ]
  },
  {
    id: 105,
    name: "Rian Hidayat",
    email: "rian.h@mahasiswa.univ.ac.id",
    date: "12 Juli 2026, 09:30",
    score: 18.2,
    level: "Normal (Tidak Depresi)",
    type: "Normal",
    answers: { D1: 0.4, D11: 0.2 },
    suggestions: [
      "Pertahankan gaya hidup sehat dan aktivitas positif Anda."
    ]
  }
];

export default function Riwayat() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const openDetailModal = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const handleDelete = (id) => {
    if (confirm(`Apakah Anda yakin ingin menghapus log diagnosa #${id}?`)) {
      setLogs(logs.filter((log) => log.id !== id));
    }
  };

  // Filter & Search logic
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter =
      filterLevel === "all" || log.type === filterLevel;

    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout>
      <Head title="Riwayat Diagnosa" />

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Riwayat Diagnosa Pengguna</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Daftar log data hasil pengujian Certainty Factor mahasiswa beserta resep saran penanganan pakar.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari nama atau email mahasiswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-850 dark:bg-slate-900/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter Hasil:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-850 dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">Semua Kategori</option>
            <option value="M1">Depresi Ringan (M1)</option>
            <option value="M2">Depresi Sedang (M2)</option>
            <option value="M3">Depresi Berat (M3)</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs uppercase text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold w-[120px]">ID Log</th>
                <th scope="col" className="px-6 py-4 font-bold w-[240px]">Mahasiswa</th>
                <th scope="col" className="px-6 py-4 font-bold w-[180px]">Tanggal Tes</th>
                <th scope="col" className="px-6 py-4 font-bold w-[120px]">Skor CF</th>
                <th scope="col" className="px-6 py-4 font-bold">Hasil Kategori</th>
                <th scope="col" className="px-6 py-4 font-bold text-right w-[150px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-450 italic">
                    Tidak ada riwayat diagnosa yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">
                      #{log.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-white">{log.name}</span>
                        <span className="text-xs text-slate-400">{log.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-450">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {log.score.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        log.type === "M3"
                          ? "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                          : log.type === "M2"
                          ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                          : log.type === "M1"
                          ? "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20"
                          : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700"
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openDetailModal(log)}
                          className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-350 font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL LOOKUP MODAL */}
      {isModalOpen && selectedLog && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Rincian Diagnosa #{selectedLog.id}
                </h3>
                <p className="text-xs text-slate-400">{selectedLog.name} &bull; {selectedLog.date}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[450px] overflow-y-auto pr-2 no-scrollbar">
              {/* Score summary panel */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Hasil Klasifikasi</h4>
                  <p className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">{selectedLog.level}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Tingkat Keyakinan (CF)</h4>
                  <p className="text-xl font-mono font-extrabold text-teal-600 dark:text-teal-400 mt-0.5">{selectedLog.score.toFixed(1)}%</p>
                </div>
              </div>

              {/* Answers Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Input Gejala yang Dialami</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(selectedLog.answers).map(([code, value]) => (
                    <div
                      key={code}
                      className="p-2.5 rounded-xl border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950/60 flex items-center justify-between"
                    >
                      <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">{code}</span>
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions Panel */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Saran Penanganan Pakar</h4>
                <div className="space-y-2.5">
                  {selectedLog.suggestions.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-teal-500/[0.03] border border-teal-500/10 text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-850 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all focus:outline-none"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
