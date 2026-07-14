import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head } from "@inertiajs/react";

// List of all 15 symptoms for reference in the rule-builder checklist
const ALL_SYMPTOMS = [
  { code: "D1", name: "Kesedihan", weight: 1.0 },
  { code: "D2", name: "Pesimis", weight: 0.2 },
  { code: "D3", name: "Kegagalan", weight: 0.2 },
  { code: "D4", name: "Kehilangan Kenikmatan", weight: 0.8 },
  { code: "D5", name: "Perasaan Bersalah", weight: 0.2 },
  { code: "D6", name: "Perasaan Dihukum", weight: 0.2 },
  { code: "D7", name: "Pikiran Bunuh Diri", weight: 0.6 },
  { code: "D8", name: "Gelisah", weight: 0.2 },
  { code: "D9", name: "Kehilangan Ketertarikan", weight: 0.6 },
  { code: "D10", name: "Keraguan", weight: 0.2 },
  { code: "D11", name: "Kehilangan Energi", weight: 0.2 },
  { code: "D12", name: "Perubahan Pola Tidur", weight: 0.2 },
  { code: "D13", name: "Perubahan Nafsu Makan", weight: 0.2 },
  { code: "D14", name: "Sulit Konsentrasi", weight: 0.2 },
  { code: "D15", name: "Kelelahan", weight: 0.2 }
];

// Initial rules dataset from the research paper
const INITIAL_RULES = [
  {
    code: "M1",
    name: "Depresi Ringan",
    symptoms: ["D2", "D13"],
    color: "teal",
    description: "Kondisi depresi ringan yang umumnya dipicu oleh kejadian penuh stres spesifik. Ditandai dengan munculnya sekitar 2 hingga 5 gejala pemicu ringan."
  },
  {
    code: "M2",
    name: "Depresi Sedang",
    symptoms: ["D1", "D3", "D5", "D6", "D8", "D10", "D11", "D12", "D14", "D15"],
    color: "amber",
    description: "Kondisi depresi sedang dengan gejala yang berlangsung lebih konsisten, mempengaruhi aktivitas sosial harian, dan disertai simtom fisik."
  },
  {
    code: "M3",
    name: "Depresi Berat",
    symptoms: ["D4", "D7", "D9"],
    color: "rose",
    description: "Tingkat depresi berat yang mengganggu fungsi kehidupan vital dasar (seperti sulit tidur, nafsu makan hilang, atau munculnya pikiran melukai diri)."
  }
];

export default function Aturan() {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRule, setActiveRule] = useState(null);
  
  // Modal form checklist state
  const [checkedSymptoms, setCheckedSymptoms] = useState([]);

  const openEditModal = (rule) => {
    setActiveRule(rule);
    setCheckedSymptoms([...rule.symptoms]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (code) => {
    if (checkedSymptoms.includes(code)) {
      setCheckedSymptoms(checkedSymptoms.filter((item) => item !== code));
    } else {
      setCheckedSymptoms([...checkedSymptoms, code]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRules(
      rules.map((r) =>
        r.code === activeRule.code
          ? { ...r, symptoms: checkedSymptoms }
          : r
      )
    );
    setIsModalOpen(false);
  };

  // Helper to find symptom details
  const getSymptomDetails = (code) => {
    return ALL_SYMPTOMS.find((s) => s.code === code) || { name: "Tidak Dikenal", weight: 0.0 };
  };

  return (
    <AppLayout>
      <Head title="Aturan CF Pakar" />

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Basis Aturan Certainty Factor</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Konfigurasi hubungan relasi pemicu antara 15 Indikator Gejala (D) dengan 3 Kategori Diagnosa Depresi (M).
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {rules.map((rule) => {
          const isTeal = rule.color === "teal";
          const isAmber = rule.color === "amber";
          const isRose = rule.color === "rose";

          return (
            <div
              key={rule.code}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition duration-300"
            >
              <div>
                {/* Header Card */}
                <div className="flex justify-between items-center mb-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                    isTeal
                      ? "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20"
                      : isAmber
                      ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                      : "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                  }`}>
                    {rule.code} &bull; {rule.name}
                  </span>
                  
                  <button
                    onClick={() => openEditModal(rule)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-850 dark:text-slate-400 transition"
                    aria-label="Edit Aturan"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {rule.description}
                </p>

                {/* Associated Symptoms list */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gejala Terkait ({rule.symptoms.length})</h4>
                  
                  {rule.symptoms.length === 0 ? (
                    <p className="text-xs text-slate-450 italic">Tidak ada gejala yang diasosiasikan.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {rule.symptoms.map((sCode) => {
                        const sDetails = getSymptomDetails(sCode);
                        return (
                          <div
                            key={sCode}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-350"
                          >
                            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{sCode}</span>
                            <span>{sDetails.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Summary */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-[10px] sm:text-xs text-slate-400 font-medium">
                <span>Metode Kombinasi:</span>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300">CF Combine (Rekursif)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT RULE SYMPTOMS MODAL */}
      {isModalOpen && activeRule && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Konfigurasi Aturan CF - {activeRule.name}
                </h3>
                <p className="text-xs text-slate-400">Pilih gejala pemicu yang digunakan untuk kategori {activeRule.code}.</p>
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

            {/* Modal Form Checklist */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="max-h-[350px] overflow-y-auto pr-2 mb-6 space-y-2 no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_SYMPTOMS.map((symptom) => {
                    const isChecked = checkedSymptoms.includes(symptom.code);
                    return (
                      <div
                        key={symptom.code}
                        onClick={() => handleCheckboxChange(symptom.code)}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                          isChecked
                            ? "bg-teal-500/5 border-teal-500 text-teal-850 dark:text-teal-300 dark:border-teal-500/40"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="w-4 h-4 rounded text-teal-600 border-slate-350 focus:ring-teal-500/20"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400">
                            {symptom.code} &bull; Bobot {symptom.weight.toFixed(1)}
                          </span>
                          <span className="text-sm font-semibold">{symptom.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
