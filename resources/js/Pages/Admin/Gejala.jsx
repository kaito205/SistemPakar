import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

<<<<<<< HEAD
export default function Gejala({ symptoms = [] }) {
=======
// Initial list of the 15 symptoms from the research paper
const INITIAL_GEJALA = [
  { code: "D1", name: "Kesedihan", weight: 1.0, desc: "Perasaan sedih, muram, atau hampa yang terus-menerus dirasakan." },
  { code: "D2", name: "Pesimis", weight: 0.2, desc: "Memandang masa depan secara suram dan merasa tidak ada harapan." },
  { code: "D3", name: "Kegagalan", weight: 0.2, desc: "Merasa sering gagal dalam hidup atau tidak berguna bagi orang lain." },
  { code: "D4", name: "Kehilangan Kenikmatan", weight: 0.8, desc: "Hilangnya minat atau kesenangan dalam aktivitas sehari-hari." },
  { code: "D5", name: "Perasaan Bersalah", weight: 0.2, desc: "Sering menyalahkan diri sendiri atas berbagai hal secara berlebihan." },
  { code: "D6", name: "Perasaan Dihukum", weight: 0.2, desc: "Merasa sedang menerima hukuman atas kesalahan masa lalu." },
  { code: "D7", name: "Pikiran Bunuh Diri", weight: 0.6, desc: "Munculnya pikiran menyakiti diri sendiri atau mengakhiri hidup." },
  { code: "D8", name: "Gelisah", weight: 0.2, desc: "Perasaan cemas, tegang, dan ketidakmampuan untuk relaks." },
  { code: "D9", name: "Kehilangan Ketertarikan", weight: 0.6, desc: "Kehilangan minat untuk bersosialisasi atau berinteraksi dengan lingkungan sekitar." },
  { code: "D10", name: "Keraguan", weight: 0.2, desc: "Kesulitan mengambil keputusan, bahkan untuk hal sederhana sekalipun." },
  { code: "D11", name: "Kehilangan Energi", weight: 0.2, desc: "Rasa tidak berenergi dan lemas berkepanjangan sepanjang hari." },
  { code: "D12", name: "Perubahan Pola Tidur", weight: 0.2, desc: "Gangguan tidur berupa insomnia (sulit tidur) atau hipersomnia (tidur berlebih)." },
  { code: "D13", name: "Perubahan Nafsu Makan", weight: 0.2, desc: "Nafsu makan berkurang secara drastis atau meningkat secara signifikan." },
  { code: "D14", name: "Sulit Konsentrasi", weight: 0.2, desc: "Susah memfokuskan pikiran saat belajar, membaca, atau bekerja." },
  { code: "D15", name: "Kelelahan", weight: 0.2, desc: "Rasa lelah fisik dan mental yang sangat nyata meskipun tanpa aktivitas berat." }
];

export default function Gejala({ gejalas }) {
  const [gejalaList, setGejalaList] = useState(gejalas || INITIAL_GEJALA);
>>>>>>> bcae1534fe7ce13ce61724b60568e7f51424eb73
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  // Form states
  const [currentId, setCurrentId] = useState(null);
  const [currentCode, setCurrentCode] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentWeight, setCurrentWeight] = useState(0.2);
  const [currentDesc, setCurrentDesc] = useState("");

  const openAddModal = () => {
    setModalMode("add");
    setCurrentId(null);
    
    // Dynamically calculate next symptom code (e.g. D16)
    const maxCodeNumber = symptoms.reduce((max, s) => {
      const num = parseInt(s.code.substring(1));
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    setCurrentCode(`D${maxCodeNumber + 1}`);
    
    setCurrentName("");
    setCurrentWeight(0.2);
    setCurrentDesc("");
    setIsModalOpen(true);
  };

  const openEditModal = (gejala) => {
    setModalMode("edit");
    setCurrentId(gejala.id);
    setCurrentCode(gejala.code);
    setCurrentName(gejala.name);
    setCurrentWeight(gejala.weight);
    setCurrentDesc(gejala.desc);
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
        weight: parseFloat(currentWeight),
        desc: currentDesc
      }, {
        onSuccess: () => closeModal()
      });
    } else {
      router.put(`/admin/gejala/${currentId}`, {
        name: currentName,
        weight: parseFloat(currentWeight),
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
      <Head title="Kelola Gejala" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Kelola Data Gejala</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manajemen indikator gejala depresi beserta pembobotan pakar Certainty Factor (CF).
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Gejala
        </button>
      </div>

      {/* Symptoms Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs uppercase text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold w-[100px]">Kode</th>
                <th scope="col" className="px-6 py-4 font-bold w-[220px]">Nama Gejala</th>
                <th scope="col" className="px-6 py-4 font-bold w-[140px]">Bobot Pakar</th>
                <th scope="col" className="px-6 py-4 font-bold">Deskripsi Klinis</th>
                <th scope="col" className="px-6 py-4 font-bold text-right w-[150px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {symptoms.map((g) => (
                <tr key={g.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">
                    {g.code}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                    {g.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20 font-mono">
                      {g.weight.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs sm:text-sm max-w-[280px] whitespace-normal break-words text-slate-650 dark:text-slate-400">
                    {g.desc}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openEditModal(g)}
                        className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(g.id, g.code)}
                        className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-350 font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TAMBAH / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {modalMode === "add" ? "Tambah Data Gejala" : `Edit Gejala ${currentCode}`}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                    Kode Gejala
                  </label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === "edit"}
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                    Bobot CF Pakar
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="-1"
                    max="1"
                    required
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Nama Gejala
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Perasaan Sedih, Hilang Energi"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Deskripsi Klinis
                </label>
                <textarea
                  rows="3"
                  placeholder="Penjelasan medis atau ciri perilaku gejala..."
                  value={currentDesc}
                  onChange={(e) => setCurrentDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-650 dark:text-slate-300 font-semibold text-sm transition-all focus:outline-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all focus:outline-none"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="p-3 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white">Konfirmasi Hapus</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus data gejala <span className="font-extrabold text-slate-850 dark:text-white">"{deleteCode}"</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
