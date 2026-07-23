import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

export default function Gejala({ symptoms = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  const [currentId, setCurrentId] = useState(null);
  const [currentCode, setCurrentCode] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  const openAddModal = () => {
    setModalMode("add");
    setCurrentId(null);
    
    const maxCodeNumber = symptoms.reduce((max, s) => {
      const num = parseInt(s.code.replace(/\D/g, ''));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    setCurrentCode(`G${String(maxCodeNumber + 1).padStart(3, '0')}`);
    setCurrentName("");
    setCurrentDesc("");
    setIsModalOpen(true);
  };

  const openEditModal = (gejala) => {
    setModalMode("edit");
    setCurrentId(gejala.id);
    setCurrentCode(gejala.code);
    setCurrentName(gejala.name);
    setCurrentDesc(gejala.desc || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      router.post("/admin/gejala", {
        code: currentCode,
        name: currentName,
        desc: currentDesc
      }, {
        onSuccess: () => closeModal()
      });
    } else {
      router.put(`/admin/gejala/${currentId}`, {
        name: currentName,
        desc: currentDesc
      }, {
        onSuccess: () => closeModal()
      });
    }
  };

  const [deleteId, setDeleteId] = useState(null);
  const [deleteCode, setDeleteCode] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (id, code) => {
    setDeleteId(id);
    setDeleteCode(code);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    router.delete(`/admin/gejala/${deleteId}`, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        setDeleteCode("");
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Kelola Gejala - Admin Sistem Pakar" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <span>Kelola Data Gejala Diabetes</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Daftar indikator gejala klinis Diabetes Melitus (G001 - G026) sesuai acuan jurnal medis.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 transition duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Gejala
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-6">Kode</th>
                  <th className="py-4 px-6">Nama Gejala Klinis</th>
                  <th className="py-4 px-6">Deskripsi / Penjelasan</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {symptoms.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 font-bold text-xs rounded-lg border border-teal-200/60 dark:border-teal-800/60">
                        {item.code}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 max-w-md">
                      {item.desc || "-"}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-400 rounded-lg text-xs font-medium transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.code)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-400 rounded-lg text-xs font-medium transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-white">
                {modalMode === "add" ? "Tambah Gejala Baru" : `Edit Gejala ${currentCode}`}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Gejala
                </label>
                <input
                  type="text"
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  disabled={modalMode === "edit"}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Gejala
                </label>
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  required
                  placeholder="misal: Sering merasa haus (polidipsi)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi / Penjelasan
                </label>
                <textarea
                  rows="3"
                  value={currentDesc}
                  onChange={(e) => setCurrentDesc(e.target.value)}
                  placeholder="Penjelasan klinis gejala..."
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 text-xl">
              <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
              Hapus Gejala {deleteCode}?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
              Tindakan ini tidak dapat dibatalkan. Seluruh aturan CF pakar yang berhubungan dengan gejala ini juga akan terhapus.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium shadow-md shadow-rose-600/20"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
