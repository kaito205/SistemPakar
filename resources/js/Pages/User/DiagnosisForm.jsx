import { Head, Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const KONDISI_CHOICES = [
  {
    kondisi: "Sangat Yakin",
    nilai: 1.0,
    desc: "Sangat yakin mengalami gejala ini (CF = 1.0)",
    badge: "1.0",
  },
  {
    kondisi: "Yakin",
    nilai: 0.8,
    desc: "Yakin mengalami gejala ini (CF = 0.8)",
    badge: "0.8",
  },
  {
    kondisi: "Cukup Yakin",
    nilai: 0.6,
    desc: "Cukup yakin mengalami gejala ini (CF = 0.6)",
    badge: "0.6",
  },
  {
    kondisi: "Sedikit Yakin",
    nilai: 0.4,
    desc: "Sedikit merasa mengalami gejala ini (CF = 0.4)",
    badge: "0.4",
  },
  {
    kondisi: "Tidak Yakin / Tidak Merasakan",
    nilai: 0.0,
    desc: "Tidak merasakan gejala ini sama sekali (CF = 0.0)",
    badge: "0.0",
  },
];

export default function DiagnosisForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);

  // Form states
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [step, setStep] = useState(0); // 0 = Data Pasien, 1 = Kuesioner Gejala
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    fetch("/api/symptoms")
      .then((res) => res.json())
      .then((data) => {
        setSymptoms(data);
        setLoadingSymptoms(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingSymptoms(false);
      });
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

  const handleStartQuestions = (e) => {
    e.preventDefault();
    if (!nama.trim()) {
      setErrorMessage("Nama pasien wajib diisi.");
      return;
    }
    setErrorMessage("");
    setStep(1);
  };

  const handleAnswerChange = (symptomId, userCf) => {
    setAnswers((prev) => ({
      ...prev,
      [symptomId]: userCf,
    }));
  };

  const handleSubmitDiagnosis = async () => {
    setSubmitting(true);
    setErrorMessage("");

    const responsesArray = symptoms.map((s) => ({
      symptom_id: s.id,
      user_cf: answers[s.id] !== undefined ? answers[s.id] : 0.0,
    }));

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      const res = await axios.post("/diagnosa/process", {
        nama,
        nim,
        prodi,
        angkatan,
        responses: responsesArray,
      }, {
        headers: {
          "X-CSRF-TOKEN": token || "",
        }
      });

      const result = res.data;

      if (result.success) {
        sessionStorage.setItem("diagnosis_result", JSON.stringify({
          user_info: { nama, nim, prodi, angkatan },
          top_result: result.top_result,
          results: result.results,
          solutions: result.solutions,
        }));
        router.visit("/diagnosa/hasil");
      } else {
        setErrorMessage(result.message || "Gagal memproses diagnosa.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Terjadi kesalahan pada server (CSRF/Network). Silakan coba lagi.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head title="Form Diagnosa Diabetes Melitus - Certainty Factor" />

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
                  Form Konsultasi Diagnosa
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
                href="/"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:border-teal-500 transition"
              >
                &larr; Kembali
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 fill-none stroke-current shrink-0" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 0 ? (
            /* Step 0: Patient Identity */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none max-w-xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-4 border border-teal-200/60 dark:border-teal-800/60">
                  <svg className="w-7 h-7 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Identitas Pengunjung / Pasien
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Silakan isi informasi diri Anda sebelum memulai pengisian gejala klinis.
                </p>
              </div>

              <form onSubmit={handleStartQuestions} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Masukkan nama lengkap..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Identitas / Usia (Opsional)
                  </label>
                  <input
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="misal: Usia 25 tahun atau NIK"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Pekerjaan / Lokasi (Opsional)
                    </label>
                    <input
                      type="text"
                      value={prodi}
                      onChange={(e) => setProdi(e.target.value)}
                      placeholder="misal: Jakarta"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Jenis Kelamin / Ket (Opsional)
                    </label>
                    <input
                      type="text"
                      value={angkatan}
                      onChange={(e) => setAngkatan(e.target.value)}
                      placeholder="Laki-laki / Perempuan"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-lg shadow-teal-600/30 transition hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Mulai Pengisian Gejala</span>
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            /* Step 1: Symptoms Questionnaire */
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Kuesioner Gejala Diabetes Melitus
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Pilihlah tingkat keyakinan (0.0 - 1.0) untuk setiap gejala klinis yang Anda rasakan.
                  </p>
                </div>
                <div className="px-4 py-2 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-2xl font-bold text-xs border border-teal-200/60 dark:border-teal-800/60 shrink-0">
                  Pasien: {nama}
                </div>
              </div>

              {loadingSymptoms ? (
                <div className="text-center py-16 text-slate-400">
                  Memuat data gejala klinis...
                </div>
              ) : (
                <div className="space-y-6">
                  {symptoms.map((symptom) => {
                    const currentVal = answers[symptom.id] !== undefined ? answers[symptom.id] : 0.0;
                    return (
                      <div
                        key={symptom.id}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-3 py-1 bg-teal-600 text-white font-black text-xs rounded-xl shadow-sm">
                            {symptom.code}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {symptom.name}
                            </h3>
                            {symptom.description && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {symptom.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                          {KONDISI_CHOICES.map((choice) => {
                            const isSelected = currentVal === choice.nilai;
                            return (
                              <button
                                key={choice.nilai}
                                type="button"
                                onClick={() => handleAnswerChange(symptom.id, choice.nilai)}
                                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between ${
                                  isSelected
                                    ? "bg-teal-600 text-white border-teal-600 font-bold shadow-md shadow-teal-600/20 scale-[1.02]"
                                    : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <span className="text-xs font-semibold mb-1">{choice.kondisi}</span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    isSelected
                                      ? "bg-white/20 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                  }`}
                                >
                                  CF: {choice.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      &larr; Ubah Identitas
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleSubmitDiagnosis}
                      className="px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 transition hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                    >
                      <span>{submitting ? "Memproses Perhitungan Certainty Factor..." : "Proses Diagnosa Sekarang"}</span>
                      {!submitting && (
                        <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
