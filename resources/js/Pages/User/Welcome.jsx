import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function Welcome({
    auth,
    dbSymptoms = [],
    diseases = [],
}) {
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

    // Typewriter effect state
    const words = ["dini", "akurat", "mandiri"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const currentWord = words[currentWordIndex];
        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayedText(currentWord.substring(0, displayedText.length + 1));
                setTypingSpeed(120);

                if (displayedText.length + 1 === currentWord.length) {
                    setIsDeleting(true);
                    setTypingSpeed(2000);
                }
            } else {
                setDisplayedText(currentWord.substring(0, displayedText.length - 1));
                setTypingSpeed(60);

                if (displayedText.length === 0) {
                    setIsDeleting(false);
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                    setTypingSpeed(500);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIndex, typingSpeed]);

    // FAQ state
    const faqData = [
        {
            question: "Apa itu Sistem Pakar Diagnosa Diabetes Melitus?",
            answer: "Sistem Pakar ini adalah aplikasi berbasis web yang mengadopsi cara berpikir seorang dokter pakar untuk mendiagnosa risiko dan jenis penyakit Diabetes Melitus (Tipe 1 dan Tipe 2) berdasarkan gejala yang dirasakan pengguna.",
        },
        {
            question: "Bagaimana Metode Certainty Factor (CF) Bekerja?",
            answer: "Certainty Factor mengukur derajat kepastian dengan mengalikan bobot keyakinan pengguna (0.0 sampai 1.0) dengan bobot kepakaran dokter pada tiap gejala, kemudian mengombinasikannya secara sistematis untuk menghasilkan persentase tingkat kepastian diagnosa.",
        },
        {
            question: "Apakah Hasil Diagnosa Ini Pengganti Dokter?",
            answer: "Sistem ini dirancang untuk deteksi awal dan edukasi kesehatan masyarakat. Hasil diagnosa dapat digunakan sebagai rujukan awal saat berkonsultasi langsung dengan dokter medis.",
        },
    ];
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <>
            <Head title="Sistem Pakar Diagnosa Penyakit Diabetes Melitus - Certainty Factor" />

            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white transition-colors duration-300">
                {/* Header Navbar */}
                <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-3">
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
                                    Sistem Pakar Diabetes
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            <a href="#beranda" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Beranda</a>
                            <a href="#tentang-penyakit" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Jenis Diabetes</a>
                            <a href="#gejala-3p" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Gejala Utama (3P)</a>
                            <a href="#gejala" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Basis Pengetahuan</a>
                            <a href="#faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition">FAQ</a>
                        </nav>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-teal-500 transition"
                                title="Toggle Theme"
                            >
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    {darkMode ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    )}
                                </svg>
                            </button>

                            {auth?.user && (
                                <Link
                                    href={route("dashboard")}
                                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition flex items-center gap-1.5"
                                >
                                    <span>Panel Admin</span>
                                    <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            )}

                            <Link
                                href={route("diagnosa.form")}
                                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition hover:scale-[1.02] flex items-center gap-1.5"
                            >
                                <span>Mulai Diagnosa</span>
                                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section id="beranda" className="relative pt-16 pb-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-bold text-xs mb-6">
                            Algoritma Certainty Factor Berbasis Web
                        </span>

                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight mb-6">
                            Diagnosa Risiko Diabetes Melitus Secara{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                                {displayedText}
                            </span>
                            <span className="animate-pulse">|</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Aplikasi Sistem Pakar untuk membantu mendeteksi risiko Diabetes Melitus Tipe 1 dan Tipe 2 dengan perhitungan persentase bobot keyakinan dari pakar medis.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={route("diagnosa.form")}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Konsultasi &amp; Diagnosa Sekarang</span>
                            </Link>
                            <a
                                href="#tentang-penyakit"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-teal-500 transition duration-300 flex items-center justify-center gap-2"
                            >
                                <span>Pelajari Diabetes</span>
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Jenis Diabetes Section */}
                <section id="tentang-penyakit" className="py-20 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                Klasifikasi Penyakit Diabetes Melitus
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                Diabetes melitus adalah penyakit menahun yang ditandai dengan kadar gula darah puasa &ge; 126 mg/dl atau sewaktu &gt; 200 mg/dl.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {diseases.map((d) => (
                                <div key={d.code} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-black text-xs">
                                                {d.code}
                                            </span>
                                            <span className="text-xs text-slate-400 font-semibold">
                                                {d.symptomsCount} Indikator Gejala Pakar
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                            {d.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-6">
                                            {d.description}
                                        </p>

                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                                <span>Solusi &amp; Pencegahan Pakar:</span>
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-xs whitespace-pre-line leading-relaxed">
                                                {d.solution}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gejala Utama 3P Section */}
                <section id="gejala-3p" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-teal-600 dark:text-teal-400 font-black text-xs tracking-widest uppercase mb-2 block">Indikator Klinis Kunci</span>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                Mengenal Gejala Utama Diabetes (3P)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                Tiga gejala utama paling khas yang dialami oleh penderita Diabetes Melitus Tipe 1 maupun Tipe 2.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Poliuri (G001)</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Sering buang air kecil terutama pada malam hari akibat ginjal yang bekerja ekstra menarik air dari darah untuk membuang kelebihan glukosa.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Polidipsi (G003)</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Sering merasa haus berlebihan akibat kadar gula tinggi menyerap cairan jaringan tubuh sehingga tubuh mudah mengalami dehidrasi.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                                <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Polifagi (G002)</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Sering merasa lapar dan banyak makan karena sel-sel tubuh tidak dapat memproses glukosa menjadi energi akibat kekurangan atau resistensi insulin.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Basis Pengetahuan Gejala (G001 - G026) */}
                <section id="gejala" className="py-20 bg-slate-100/70 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                Basis Pengetahuan (26 Indikator Gejala)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                Seluruh gejala klinis yang tervalidasi oleh dokter pakar kesehatan untuk diagnosa Certainty Factor.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {dbSymptoms.map((s) => (
                                <div key={s.code} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3">
                                    <span className="px-2 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold text-[10px]">
                                        {s.code}
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-1">{s.name}</h4>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                Pertanyaan Sering Diajukan (FAQ)
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqData.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full p-6 text-left font-bold text-slate-800 dark:text-white flex justify-between items-center text-sm"
                                    >
                                        <span>{item.question}</span>
                                        <span className="font-mono text-lg">{openFaq === index ? "−" : "+"}</span>
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center text-xs text-slate-500">
                    <div className="max-w-7xl mx-auto px-4">
                        <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Aplikasi Sistem Pakar Diagnosa Penyakit Diabetes Melitus Dengan Algoritma Certainty Factor Berbasis Web
                        </p>
                        <p>&copy; {new Date().getFullYear()} DiabeCF &bull; Berdasarkan Jurnal Ilmiah SOLIDITAS (2020)</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
