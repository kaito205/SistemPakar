import { Head, Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const GEJALA_LIST = [
  { kode_gejala: "D1", gejala: "Kesedihan" },
  { kode_gejala: "D2", gejala: "Pesimis" },
  { kode_gejala: "D3", gejala: "Kegagalan" },
  { kode_gejala: "D4", gejala: "Kehilangan Kenikmatan" },
  { kode_gejala: "D5", gejala: "Perasaan Bersalah" },
  { kode_gejala: "D6", gejala: "Perasaan dihukum" },
  { kode_gejala: "D7", gejala: "Pikiran Bunuh Diri" },
  { kode_gejala: "D8", gejala: "Gelisah" },
  { kode_gejala: "D9", gejala: "Kehilangan Ketertarikan" },
  { kode_gejala: "D10", gejala: "Keraguan" },
  { kode_gejala: "D11", gejala: "Kehilangan Energi" },
  { kode_gejala: "D12", gejala: "Perubahan Pola Tidur" },
  { kode_gejala: "D13", gejala: "Perubahan Nafsu Makan" },
  { kode_gejala: "D14", gejala: "Sulit Konsentrasi" },
  { kode_gejala: "D15", gejala: "Kelelahan" },
];

const KONDISI_CHOICES = [
  {
    kondisi: "Sangat Yakin",
    nilai: 1.0,
    color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/10",
    activeColor:
      "ring-2 ring-teal-500 bg-teal-50 border-transparent text-teal-900 font-bold",
  },
  {
    kondisi: "Yakin",
    nilai: 0.8,
    color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/10",
    activeColor:
      "ring-2 ring-teal-500 bg-teal-50 border-transparent text-teal-900 font-bold",
  },
  {
    kondisi: "Cukup Yakin",
    nilai: 0.6,
    color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/10",
    activeColor:
      "ring-2 ring-teal-500 bg-teal-50 border-transparent text-teal-900 font-bold",
  },
  {
    kondisi: "Sedikit Yakin",
    nilai: 0.4,
    color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/10",
    activeColor:
      "ring-2 ring-teal-500 bg-teal-50 border-transparent text-teal-900 font-bold",
  },
  {
    kondisi: "Tidak Tahu",
    nilai: 0.2,
    color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/10",
    activeColor:
      "ring-2 ring-teal-500 bg-teal-50 border-transparent text-teal-900 font-bold",
  },
  {
    kondisi: "Tidak Yakin",
    nilai: 0.0,
    color: "border-slate-200 hover:bg-slate-50 text-slate-700 bg-slate-50/20",
    activeColor:
      "ring-2 ring-slate-400 bg-slate-100 border-transparent text-slate-800 font-bold",
  },
  {
    kondisi: "Mungkin Tidak",
    nilai: -0.4,
    color: "border-slate-200 hover:bg-slate-50 text-slate-700 bg-slate-50/20",
    activeColor:
      "ring-2 ring-slate-400 bg-slate-100 border-transparent text-slate-800 font-bold",
  },
];

export default function DiagnosisForm() {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
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

  const [activeIndex, setActiveIndex] = useState(-1); // -1 is Step 0 (Data Diri)
  const [answers, setAnswers] = useState({});

  // Student Identity States
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("Teknik Informatika");
  const [angkatan, setAngkatan] = useState("2022");

  const handleSelectOption = (value) => {
    setAnswers({
      ...answers,
      [activeIndex]: value,
    });

    if (activeIndex < GEJALA_LIST.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < GEJALA_LIST.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (activeIndex === 0) {
      setActiveIndex(-1); // Back to Data Diri
    }
  };

  const countAnswered = Object.keys(answers).length;
  const isCompleted = countAnswered === GEJALA_LIST.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countAnswered < GEJALA_LIST.length) {
      alert(
        `Harap selesaikan semua pertanyaan terlebih dahulu! Baru menjawab ${countAnswered} dari ${GEJALA_LIST.length} pertanyaan.`
      );
      return;
    }

    const formattedAnswers = GEJALA_LIST.map((item, idx) => {
      return [item.kode_gejala, answers[idx]];
    });

    localStorage.setItem(
      "depresicheck_answers",
      JSON.stringify(formattedAnswers)
    );

    // Save Student Identity
    const userInfo = { nama, nim, prodi, angkatan };
    localStorage.setItem("depresicheck_user_info", JSON.stringify(userInfo));

    router.visit("/diagnosa/hasil");
  };

  const currentGejala = activeIndex >= 0 ? GEJALA_LIST[activeIndex] : null;
  const currentSelectedValue = activeIndex >= 0 ? answers[activeIndex] : null;

  return (
    <>
      <Head title="Form Diagnosa Depresi - DepresiCheck" />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-teal-500 selection:text-white dark:bg-slate-950 dark:text-slate-200">
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 px-6 shadow-sm shadow-slate-100/30 dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-slate-950/20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/img/logo.png?v=2"
                alt="DepresiCheck Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                DepresiCheck
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <svg
                    className="w-4 h-4 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072-7.072 5 5 0 01-7.072 7.072z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
            {/* Left Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:bg-slate-900 dark:border-slate-880/80 dark:shadow-none lg:col-span-8 w-full min-h-[480px] flex flex-col justify-between">
              {activeIndex === -1 ? (
                // Step 0: Data Diri Form
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!nama || !nim) {
                      alert("Harap isi Nama dan NIM Anda!");
                      return;
                    }
                    setActiveIndex(0);
                  }}
                  className="flex flex-col justify-between h-full min-h-[380px]"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 font-semibold">
                      <span>Registrasi Pengguna</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                        Langkah 1 dari 2
                      </span>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug text-slate-900 dark:text-white mb-2">
                        Identitas Mahasiswa
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Harap masukkan identitas Anda sebelum memulai analisis
                        tingkat depresi.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama lengkap Anda"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                          NIM (Nomor Induk Mahasiswa)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan NIM Anda"
                          value={nim}
                          onChange={(e) => setNim(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                            Program Studi
                          </label>
                          <select
                            value={prodi}
                            onChange={(e) => setProdi(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 text-sm"
                          >
                            <option value="Teknik Informatika">
                              Teknik Informatika
                            </option>
                            <option value="Sistem Informasi">
                              Sistem Informasi
                            </option>
                            <option value="Teknik Industri">
                              Teknik Industri
                            </option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                            Angkatan
                          </label>
                          <select
                            value={angkatan}
                            onChange={(e) => setAngkatan(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 text-sm"
                          >
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition text-sm flex items-center gap-2"
                    >
                      Mulai Diagnosis
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              ) : (
                // Original Question Form Layout
                <>
                  <div>
                    <div className="flex justify-between items-center text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 font-semibold">
                      <span>Kuesioner Gejala</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                        Pertanyaan {activeIndex + 1} dari {GEJALA_LIST.length}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
                      <div
                        className="h-full bg-teal-500 transition-all duration-300"
                        style={{
                          width: `${
                            ((activeIndex + 1) / GEJALA_LIST.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Question Title */}
                    <div className="mb-8">
                      <span className="text-sm font-bold text-teal-600 dark:text-teal-450 mb-2 block">
                        {currentGejala.kode_gejala}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug text-slate-900 dark:text-white">
                        Apakah Anda mengalami gejala{" "}
                        <span className="text-teal-600 dark:text-teal-400">
                          {currentGejala.gejala}
                        </span>
                        ?
                      </h2>
                    </div>

                    {/* Choices Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {KONDISI_CHOICES.map((choice) => {
                        const isSelected =
                          currentSelectedValue === choice.nilai;
                        return (
                          <button
                            key={choice.nilai}
                            type="button"
                            onClick={() => handleSelectOption(choice.nilai)}
                            className={`flex items-center justify-between p-4 rounded-xl border text-left font-semibold transition duration-150 ${
                              isSelected
                                ? choice.nilai === 0 || choice.nilai === -0.4
                                  ? "ring-2 ring-slate-500 dark:ring-slate-400 bg-slate-150 dark:bg-slate-800/80 border-transparent text-slate-800 dark:text-slate-100 font-bold"
                                  : "ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-955/20 border-transparent text-teal-900 dark:text-teal-300 font-bold"
                                : `border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-slate-800/50`
                            }`}
                          >
                            <span>{choice.kondisi}</span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? "border-transparent bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900"
                                  : "border-slate-300 dark:border-slate-700"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="4.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stepper Navigation Actions */}
                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-6 mt-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition text-sm font-semibold flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Sebelumnya
                    </button>

                    {activeIndex === GEJALA_LIST.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-lg shadow-teal-500/20 hover:scale-105 transition text-sm flex items-center gap-2"
                      >
                        Kirim Hasil
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentSelectedValue === undefined}
                        className="px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 dark:disabled:hover:bg-slate-800 transition text-sm font-semibold flex items-center gap-2"
                      >
                        Berikutnya
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Right Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/10 dark:bg-slate-900 dark:border-slate-800/80 dark:shadow-none lg:col-span-4 w-full">
              {activeIndex === -1 ? (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                    Informasi Tes
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-4 leading-relaxed font-medium">
                    <p>
                      Tes ini terdiri dari <strong>15 pertanyaan</strong>{" "}
                      indikator gejala klinis depresi mahasiswa akhir.
                    </p>
                    <p>
                      Pilihlah tingkat keyakinan (Sangat Yakin, Yakin, dsb)
                      secara jujur sesuai yang Anda rasakan selama 2 minggu
                      terakhir.
                    </p>
                    <p>
                      Data Anda tersimpan secara terenkripsi untuk kepentingan
                      diagnosis awal kesehatan mental.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                    Navigasi Soal
                  </h3>

                  <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
                    {GEJALA_LIST.map((item, idx) => {
                      const isAnswered = answers[idx] !== undefined;
                      const isActive = activeIndex === idx;

                      return (
                        <button
                          key={item.kode_gejala}
                          onClick={() => setActiveIndex(idx)}
                          className={`h-10 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center border ${
                            isActive
                              ? "border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/10 scale-105"
                              : isAnswered
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-350 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-600"
                          }`}
                        >
                          {item.kode_gejala.replace("D", "")}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                      <div className="w-3.5 h-3.5 rounded bg-teal-500 text-white flex items-center justify-center font-bold text-[8px]">
                        01
                      </div>
                      <span>Aktif sekarang</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-[8px]">
                        &bull;
                      </div>
                      <span>Sudah dijawab</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                      <div className="w-3.5 h-3.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 flex items-center justify-center font-bold text-[8px]">
                        &bull;
                      </div>
                      <span>Belum dijawab</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Footer Disclaimer */}
        <footer className="py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-600 px-6">
          Disclaimer: Kuesioner ini dirancang untuk mendeteksi dini gejala
          depresi mahasiswa akhir. Hasil dari sistem pakar ini bukan pengganti
          diagnosis medis resmi.
        </footer>
      </div>
    </>
  );
}
