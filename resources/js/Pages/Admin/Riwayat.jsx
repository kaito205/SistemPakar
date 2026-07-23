import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

export default function Riwayat({ logs = [] }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = (log) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedLog(null);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan riwayat diagnosa ini?")) {
      router.delete(`/admin/riwayat/${id}`);
    }
  };

  return (
    <AppLayout>
      <Head title="Riwayat Diagnosa - Admin Sistem Pakar" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>Riwayat Diagnosa Pasien</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Daftar rekam jejak pemeriksaan diagnosa penyakit Diabetes Melitus yang telah dilakukan pengunjung.
            </p>
          </div>
          <div className="px-3.5 py-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 rounded-xl font-bold text-xs border border-teal-200/60 dark:border-teal-800/60">
            Total {logs.length} Rekam Diagnosa
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-6">Nama Pasien / Pengunjung</th>
                  <th className="py-4 px-6">Identitas / Informasi</th>
                  <th className="py-4 px-6">Hasil Diagnosa</th>
                  <th className="py-4 px-6">Nilai CF Kepastian</th>
                  <th className="py-4 px-6">Tanggal Diagnosa</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-sm">
                      Belum ada riwayat diagnosa yang tersimpan.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6 font-bold text-slate-800 dark:text-white">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400">
                        {item.identity}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.disease_code === 'P001'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300'
                            : item.disease_code === 'P002'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300'
                        }`}>
                          {item.disease_name}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-teal-600 dark:text-teal-400">
                        {item.score}%
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        {item.date}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openDetail(item)}
                          className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-600 dark:bg-teal-950/40 dark:hover:bg-teal-900/50 dark:text-teal-400 rounded-lg text-xs font-medium transition"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-400 rounded-lg text-xs font-medium transition"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailOpen && selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-white">
                Detail Diagnosa: {selectedLog.name}
              </h3>
              <button onClick={closeDetail} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block">Hasil Terdiagnosa:</span>
                  <span className="font-bold text-slate-800 dark:text-white text-sm">{selectedLog.disease_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tingkat Kepastian (CF):</span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400 text-sm">{selectedLog.score}%</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Gejala Yang Dipilih &amp; Bobot Keyakinan Pengguna:
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {Object.entries(selectedLog.answers || {}).map(([code, val]) => (
                    <div key={code} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 px-3 py-2 rounded-lg text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {code} - {typeof val === 'object' ? val.name : val}
                      </span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">
                        CF User: {typeof val === 'object' ? val.user_cf : val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Solusi &amp; Rekomendasi Medis:
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-teal-50/50 dark:bg-teal-950/30 p-3 rounded-xl border border-teal-100 dark:border-teal-900">
                  {(selectedLog.solutions || []).map((sol, idx) => (
                    <li key={idx}>{sol}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
              <button
                onClick={closeDetail}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
