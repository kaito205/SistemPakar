import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head } from "@inertiajs/react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  // Form states
  const [currentCode, setCurrentCode] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentWeight, setCurrentWeight] = useState(0.2);
  const [currentDesc, setCurrentDesc] = useState("");

  const openAddModal = () => {
    setModalMode("add");
    setCurrentCode(`D${gejalaList.length + 1}`);
    setCurrentName("");
    setCurrentWeight(0.2);
    setCurrentDesc("");
    setIsModalOpen(true);
  };

  const openEditModal = (gejala) => {
    setModalMode("edit");
    setCurrentCode(gejala.code);
    setCurrentName(gejala.name);
    setCurrentWeight(gejala.weight);
    setCurrentDesc(gejala.desc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newGejala = {
        code: currentCode,
        name: currentName,
        weight: parseFloat(currentWeight),
        desc: currentDesc
      };
      setGejalaList([...gejalaList, newGejala]);
    } else {
      setGejalaList(
        gejalaList.map((g) =>
          g.code === currentCode
            ? { ...g, name: currentName, weight: parseFloat(currentWeight), desc: currentDesc }
            : g
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (code) => {
    if (confirm(`Apakah Anda yakin ingin menghapus gejala ${code}?`)) {
      setGejalaList(gejalaList.filter((g) => g.code !== code));
    }
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
              {gejalaList.map((g) => (
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
                  <td className="px-6 py-4 text-xs sm:text-sm max-w-[320px] truncate md:max-w-none">
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
                        onClick={() => handleDelete(g.code)}
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
    </AppLayout>
  );
}
