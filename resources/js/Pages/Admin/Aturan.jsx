import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

export default function Aturan({ diseases = [], symptoms = [], rules = [] }) {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(diseases[0]?.id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  const [currentRuleId, setCurrentRuleId] = useState(null);
  const [currentSymptomId, setCurrentSymptomId] = useState("");
  const [currentCfPakar, setCurrentCfPakar] = useState(0.8);

  const filteredRules = rules.filter(r => String(r.disease_id) === String(selectedDiseaseId));
  const activeDisease = diseases.find(d => String(d.id) === String(selectedDiseaseId));

  const openAddModal = () => {
    setModalMode("add");
    setCurrentRuleId(null);
    setCurrentSymptomId(symptoms[0]?.id || "");
    setCurrentCfPakar(0.8);
    setIsModalOpen(true);
  };

  const openEditModal = (rule) => {
    setModalMode("edit");
    setCurrentRuleId(rule.id);
    setCurrentSymptomId(rule.symptom_id);
    setCurrentCfPakar(rule.cf_pakar);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRuleId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      router.post("/admin/aturan", {
        disease_id: selectedDiseaseId,
        symptom_id: currentSymptomId,
        cf_pakar: parseFloat(currentCfPakar),
      }, {
        onSuccess: () => closeModal()
      });
    } else {
      router.put(`/admin/aturan/${currentRuleId}`, {
        cf_pakar: parseFloat(currentCfPakar),
      }, {
        onSuccess: () => closeModal()
      });
    }
  };

  const handleDeleteRule = (id, symptomName) => {
    if (confirm(`Hapus aturan gejala "${symptomName}" dari penyakit ini?`)) {
      router.delete(`/admin/aturan/${id}`);
    }
  };

  return (
    <AppLayout>
      <Head title="Aturan CF Pakar - Admin Sistem Pakar" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span>Aturan Basis Pengetahuan &amp; Bobot CF Pakar</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Pengaturan bobot keyakinan kepakaran (MB - MD / CF Pakar) antara Gejala dan Diagnosa Diabetes Melitus.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 transition duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Aturan Gejala
          </button>
        </div>

        {/* Filter Disease Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          {diseases.map((disease) => {
            const isActive = String(disease.id) === String(selectedDiseaseId);
            return (
              <button
                key={disease.id}
                onClick={() => setSelectedDiseaseId(disease.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span>{disease.code}</span>
                <span>&bull;</span>
                <span>{disease.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Disease Info Card */}
        {activeDisease && (
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Deskripsi: </span>
              <span className="text-slate-600 dark:text-slate-400">{activeDisease.description}</span>
            </div>
            <div className="shrink-0 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold text-teal-600 dark:text-teal-400">
              Total {filteredRules.length} Gejala Terkait
            </div>
          </div>
        )}

        {/* Table of Rules */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-6">Kode Gejala</th>
                  <th className="py-4 px-6">Nama Gejala Klinis</th>
                  <th className="py-4 px-6">Bobot CF Pakar (0.0 - 1.0)</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredRules.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">
                      Belum ada aturan gejala terdaftar untuk penyakit ini.
                    </td>
                  </tr>
                ) : (
                  filteredRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 font-bold text-xs rounded-lg border border-teal-200/60 dark:border-teal-800/60">
                          {rule.symptom_code}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800 dark:text-white">
                        {rule.symptom_name}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-teal-500 h-full rounded-full"
                              style={{ width: `${rule.cf_pakar * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-slate-800 dark:text-white text-xs">
                            {rule.cf_pakar}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(rule)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-400 rounded-lg text-xs font-medium transition"
                        >
                          Edit Bobot
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id, rule.symptom_name)}
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

      {/* Modal Add / Edit Rule */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-white">
                {modalMode === "add" ? "Tambah Aturan Gejala & CF" : "Edit Bobot CF Pakar"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Penyakit Terpilih
                </label>
                <input
                  type="text"
                  value={`${activeDisease?.code} - ${activeDisease?.name}`}
                  disabled
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm"
                />
              </div>

              {modalMode === "add" ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Gejala
                  </label>
                  <select
                    value={currentSymptomId}
                    onChange={(e) => setCurrentSymptomId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                  >
                    {symptoms.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                  <span>Nilai Bobot Certainty Factor Pakar (0.0 - 1.0)</span>
                  <span className="text-teal-600 font-bold">{currentCfPakar}</span>
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={currentCfPakar}
                  onChange={(e) => setCurrentCfPakar(e.target.value)}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.0 (Tidak Yakin)</span>
                  <span>0.5 (Cukup)</span>
                  <span>1.0 (Mutlak)</span>
                </div>
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
                  Simpan Aturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
