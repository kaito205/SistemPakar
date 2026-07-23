import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

export default function Penyakit({ diseases = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  const [currentId, setCurrentId] = useState(null);
  const [currentCode, setCurrentCode] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");

  const openAddModal = () => {
    setModalMode("add");
    setCurrentId(null);
    const nextNum = diseases.length + 1;
    setCurrentCode(`P${String(nextNum).padStart(3, '0')}`);
    setCurrentName("");
    setCurrentDesc("");
    setCurrentSolution("");
    setIsModalOpen(true);
  };

  const openEditModal = (penyakit) => {
    setModalMode("edit");
    setCurrentId(penyakit.id);
    setCurrentCode(penyakit.code);
    setCurrentName(penyakit.name);
    setCurrentDesc(penyakit.description || "");
    setCurrentSolution(penyakit.solution || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      router.post("/admin/penyakit", {
        code: currentCode,
        name: currentName,
        description: currentDesc,
        solution: currentSolution,
      }, {
        onSuccess: () => closeModal()
      });
    } else {
      router.put(`/admin/penyakit/${currentId}`, {
        code: currentCode,
        name: currentName,
        description: currentDesc,
        solution: currentSolution,
      }, {
        onSuccess: () => closeModal()
      });
    }
  };

  const handleDelete = (id, name) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data penyakit "${name}"?`)) {
      router.delete(`/admin/penyakit/${id}`);
    }
  };

  return (
    <AppLayout>
      <Head title="Kelola Penyakit - Admin Sistem Pakar" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              <span>Kelola Jenis Penyakit Diabetes</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Daftar klasifikasi penyakit Diabetes Melitus beserta solusi pengobatan &amp; pencegahannya.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 transition duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Penyakit
          </button>
        </div>

        {/* List Cards / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diseases.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs rounded-full border border-teal-200 dark:border-teal-800">
                    {item.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.rules_count || item.symptomsCount || 0} Gejala Terkait
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                  {item.description || "Tidak ada deskripsi."}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Solusi &amp; Pencegahan:</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs whitespace-pre-line leading-relaxed">
                    {item.solution || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-400 rounded-lg text-xs font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-400 rounded-lg text-xs font-medium transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-white">
                {modalMode === "add" ? "Tambah Jenis Penyakit" : "Edit Jenis Penyakit"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Penyakit
                </label>
                <input
                  type="text"
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Penyakit
                </label>
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  required
                  placeholder="misal: Diabetes Tipe 1"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Penyakit
                </label>
                <textarea
                  rows="3"
                  value={currentDesc}
                  onChange={(e) => setCurrentDesc(e.target.value)}
                  placeholder="Penjelasan medis singkat..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Solusi &amp; Rekomendasi Pengobatan
                </label>
                <textarea
                  rows="4"
                  value={currentSolution}
                  onChange={(e) => setCurrentSolution(e.target.value)}
                  placeholder="Langkah pengobatan dan pencegahan..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 rounded-xl text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium shadow-md shadow-teal-600/20"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
