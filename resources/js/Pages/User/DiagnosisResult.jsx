import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

// Depresi categories
const DEPRESI_DICT = {
    "M1": { id: "M1", name: "Depresi Ringan (Mild/Minor)", badgeColor: "bg-teal-50 text-teal-750 border-teal-200 dark:bg-slate-800 dark:text-teal-400 dark:border-slate-700" },
    "M2": { id: "M2", name: "Depresi Sedang (Moderate)", badgeColor: "bg-teal-100 text-teal-850 border-teal-300 dark:bg-slate-800 dark:text-teal-300 dark:border-slate-700" },
    "M3": { id: "M3", name: "Depresi Berat (Severe/Major)", badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-slate-800 dark:text-rose-400 dark:border-slate-700" }
};

// Article details
const ARTICLES = {
    "M1": {
        judul: "Mild Depression / Minor Depression (Depresi Ringan)",
        url_gambar: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/10/04084507/Ini-Ciri-Ciri-Depresi-Ringan-yang-Masih-Sering-Diabaikan.jpg",
        isi: "Mild depression atau minor depression dan dysthymic disorder. Pada depresi ringan, mood yang rendah datang dan pergi dan penyakit datang setelah kejadian stressfull yang spesifik. Individu akan merasa cemas dan juga tidak bersemangat. Perubahan gaya hidup biasanya dibutuhkan untuk mengurangi depresi jenis ini. Minor depression ditandai dengan adanya dua gejala pada depressive episode namun tidak lebih dari lima gejala depresi muncul selama dua minggu berturut-turut."
    },
    "M2": {
        judul: "Moderate Depression (Depresi Sedang)",
        url_gambar: "https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg",
        isi: "Pada depresi sedang mood yang rendah berlangsung terus dan individu mengalami simtom fisik juga walaupun berbeda-beda tiap individu. Perubahan gaya hidup saja tidak cukup dan bantuan luar (seperti konseling) diperlukan untuk mengatasinya secara efektif agar tidak berkembang menjadi depresi mayor."
    },
    "M3": {
        judul: "Severe Depression / Major Depression (Depresi Berat)",
        url_gambar: "https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg",
        isi: "Depresi berat adalah penyakit yang tingkat depresinya parah. Individu akan mengalami gangguan serius dalam kemampuan untuk bekerja, tidur, makan, dan menikmati hal yang menyenangkan. Sangat penting untuk mendapatkan bantuan medis secepat mungkin. Major depression ditandai dengan adanya lima atau lebih gejala yang ditunjukkan dalam major depressive episode dan berlangsung selama dua minggu berturut-turut."
    }
};

export default function DiagnosisResult() {
    // Dark Mode State
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setDarkMode(isDark);
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    const [apiResults, setApiResults] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggleDetails = () => {
        console.log('Toggle clicked, current state:', showDetails);
        setShowDetails(prev => {
            console.log('Setting showDetails to:', !prev);
            return !prev;
        });
    };

    useEffect(() => {
        const savedResults = localStorage.getItem('depresicheck_results');
        const savedInfo = localStorage.getItem('depresicheck_user_info');
        if (savedResults) {
            setApiResults(JSON.parse(savedResults));
        }
        if (savedInfo) {
            setUserInfo(JSON.parse(savedInfo));
        }
    }, []);

    if (!apiResults || !apiResults.results || apiResults.results.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-center items-center p-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-slate-200/50">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6 text-teal-650">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-2">Belum Ada Hasil Diagnosis</h2>
                    <p className="text-slate-550 text-sm mb-6 leading-relaxed">
                        Anda belum melakukan diagnosis depresi. Silakan isi kuesioner terlebih dahulu untuk melihat hasil diagnosa Anda.
                    </p>
                    <Link href="/diagnosa" className="inline-block w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-xl shadow-lg shadow-teal-500/20 transition text-center">
                        Isi Kuesioner Sekarang
                    </Link>
                </div>
            </div>
        );
    }

    const highest = apiResults.results[0];
    const results = apiResults.results;
    const matchedSymptoms = apiResults.matched_symptoms;
    const article = ARTICLES[highest.depression_level.code];

    return (
        <>
            <Head title="Hasil Diagnosa Depresi - DepresiCheck" />

            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white pb-20 dark:bg-slate-950 dark:text-slate-200">
                {/* Navbar */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 px-6 fixed top-0 w-full z-40 shadow-sm shadow-slate-100/30 dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-slate-950/20">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/img/logo.png?v=2" alt="DepresiCheck Logo" className="w-9 h-9 object-contain" />
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
                                    <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072-7.072 5 5 0 01-7.072 7.072z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            <Link href="/diagnosa" className="text-sm font-bold text-teal-605 dark:text-teal-400 hover:underline">
                                Ulangi Tes
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 pt-28">
                    
                    {/* Header Announcement */}
                    <div className="text-center mb-8">
                        <span className="text-xs uppercase tracking-widest text-teal-650 dark:text-teal-400 font-bold mb-2 block">Hasil Analisis</span>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">Laporan Diagnosis Depresi</h1>
                    </div>

                    {/* Student Identity Card */}
                    {userInfo && (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800/80 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-slate-405 dark:text-slate-500 font-bold mb-1">Identitas Mahasiswa</h3>
                                <div className="text-lg font-extrabold text-slate-900 dark:text-white">{userInfo.nama}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    NIM: <span className="font-mono font-bold">{userInfo.nim}</span> &bull; {userInfo.prodi} (Angkatan {userInfo.angkatan})
                                </div>
                            </div>
                            <div className="inline-flex self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-teal-500/10 text-teal-650 dark:text-teal-400 font-bold text-xs">
                                Diagnosa Mandiri
                            </div>
                        </div>
                    )}

                    {/* Result Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:bg-slate-900 dark:border-slate-800/80 dark:shadow-none mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/[0.02] rounded-full blur-3xl -z-10 animate-pulse"></div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {/* Left: Score Circle */}
                            <div className="relative flex-shrink-0 w-36 h-36 rounded-full border-4 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 shadow-inner">
                                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5 animate-pulse">Keyakinan</div>
                                <div className="text-3xl font-black text-teal-605 dark:text-teal-400">{(highest.cf * 100).toFixed(1)}%</div>
                                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">CF: {parseFloat(highest.cf).toFixed(3)}</div>

                                <svg className="absolute -inset-1 w-[152px] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="46"
                                        fill="transparent"
                                        stroke="url(#tealGradient)"
                                        strokeWidth="4"
                                        strokeDasharray="289"
                                        strokeDashoffset={289 - (289 * highest.cf)}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#0d9488" />
                                            <stop offset="100%" stopColor="#0d9488" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Right: Diagnosis Category Details */}
                            <div className="text-center sm:text-left flex-grow">
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${DEPRESI_DICT[highest.depression_level.code]?.badgeColor || 'bg-teal-50 text-teal-700 border-teal-200'} mb-3`}>
                                    {highest.depression_level.code} &bull; {DEPRESI_DICT[highest.depression_level.code]?.name}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                                    {highest.depression_level.name}
                                </h2>
                                <p className="text-slate-650 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    Berdasarkan perhitungan Certainty Factor dari 15 butir gejala yang diinputkan, Anda diestimasikan berada dalam kategori <span className="text-teal-600 font-extrabold">{highest.depression_level.name}</span> dengan tingkat kepastian <span className="text-teal-600 font-extrabold">{(highest.cf * 100).toFixed(2)}%</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Article Section */}
                    {article && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none mb-8">
                            <div className="h-64 sm:h-80 w-full overflow-hidden relative">
                                <img src={article.url_gambar} alt={article.judul} className="w-full h-full object-cover opacity-90 transition" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2 block">Kriteria Depresi</span>
                                    <h3 className="text-2xl font-black text-white">{article.judul}</h3>
                                </div>
                            </div>
                            <div className="p-6 sm:p-10 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                    {article.isi}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Personalized Suggestions (S) based on Symptoms */}
                    {matchedSymptoms.length > 0 && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Saran Penanganan Berdasarkan Gejala Anda</h3>
                            <div className="space-y-6">
                                {matchedSymptoms.map((item) => {
                                    const symptom = item.symptom;
                                    return (
                                        <div key={symptom.id} className="flex gap-4 items-start p-4 bg-teal-500/[0.02] dark:bg-teal-500/[0.04] border border-teal-500/10 dark:border-teal-500/20 rounded-2xl">
                                            <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-650 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                                                {symptom.code}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                                    Mengalami {symptom.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                                                    {symptom.suggestion}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Detailed Calculations Accordion Button */}
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rincian Perhitungan Matematis</h3>
                        <button
                            onClick={toggleDetails}
                            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-350 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-750 dark:text-teal-400 shadow-sm transition text-xs font-bold flex items-center gap-2"
                        >
                            {showDetails ? 'Sembunyikan Rumus' : 'Tampilkan Perhitungan Pakar'}
                            <svg className={`w-4 h-4 transition ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Detailed Math Calculations Box */}
                    {showDetails && (
                        <div className="space-y-8">
                            <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-xl border border-teal-200 dark:border-teal-800">
                                <p className="text-sm text-teal-800 dark:text-teal-300">
                                    <strong>Debug Info:</strong> Results: {results?.length || 0}, Matched Symptoms: {matchedSymptoms?.length || 0}
                                </p>
                            </div>

                            {/* Summary list of CFs */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {results && results.length > 0 ? results.map((res) => {
                                    const isWinner = res.depression_level.code === highest.depression_level.code;
                                    const depresiInfo = DEPRESI_DICT[res.depression_level.code];
                                    return (
                                        <div key={res.depression_level.code} className={`p-4 rounded-2xl border ${
                                            isWinner ? 'bg-teal-50/30 border-teal-300 dark:bg-teal-950/20 dark:border-teal-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm dark:shadow-none'
                                        }`}>
                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{res.depression_level.code}</div>
                                            <div className="font-extrabold text-sm text-slate-800 dark:text-white truncate">{depresiInfo?.name || res.depression_level.name}</div>
                                            <div className={`text-xl font-black mt-1 ${isWinner ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                                {(res.cf * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="col-span-3 text-center text-slate-400">No results available</div>
                                )}
                            </div>

                            {/* Chosen Category Table Calculation */}
                            <div className="bg-white border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/10 dark:shadow-none">
                                <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div className="font-bold text-slate-800 dark:text-white text-sm">
                                        Matriks Gejala & CF Kombinasi untuk <span className="text-teal-600 dark:text-teal-400">{DEPRESI_DICT[highest.depression_level.code]?.name}</span>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded self-start">
                                        Formula: CF_i = CF_pakar * CF_user
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                        <thead className="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-[10px]">
                                            <tr>
                                                <th className="px-6 py-4">Kode</th>
                                                <th className="px-6 py-4">Gejala Terdeteksi</th>
                                                <th className="px-6 py-4 text-center">CF Pakar</th>
                                                <th className="px-6 py-4 text-center">CF User</th>
                                                <th className="px-6 py-4 text-right">CF Hasil (CF_i)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                            {matchedSymptoms && matchedSymptoms.length > 0 ? matchedSymptoms.map((item) => {
                                                const symptom = item.symptom;
                                                return (
                                                    <tr key={symptom.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50">
                                                        <td className="px-6 py-4 font-mono font-bold text-teal-600 dark:text-teal-400">{symptom.code}</td>
                                                        <td className="px-6 py-4 max-w-xs truncate">{symptom.name}</td>
                                                        <td className="px-6 py-4 text-center font-mono">{symptom.expert_cf.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.user_cf.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-right font-mono font-bold text-teal-600 dark:text-teal-400">{item.calculated_cf.toFixed(4)}</td>
                                                    </tr>
                                                );
                                            }) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 dark:text-slate-600">
                                                        Tidak ada gejala yang cocok terdeteksi untuk penyakit ini.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Sequential Combinations Steps */}
                            {matchedSymptoms && matchedSymptoms.length > 1 && (
                                <div className="bg-white border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/10 dark:shadow-none">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Penggabungan Certainty Factor Berurutan (CF_combine)</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                                        Menggabungkan CF_i dari masing-masing gejala secara rekursif menggunakan rumus:
                                        <br />
                                        <code className="text-teal-600 dark:text-teal-450 font-mono font-semibold block my-1">CF_gabungan = CF_old + CF_new * (1 - CF_old)</code>
                                    </p>

                                    <div className="font-mono text-xs text-slate-650 dark:text-slate-350 space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <div>Step 1 (Inisial CF_1): <span className="text-teal-600 dark:text-teal-400 font-bold">{matchedSymptoms[0]?.calculated_cf.toFixed(4)}</span></div>
                                        {matchedSymptoms.slice(1).map((item, idx) => {
                                            const currentCf = item.calculated_cf;
                                            const prevCf = matchedSymptoms[idx].calculated_cf;
                                            const combinedCf = prevCf + currentCf * (1 - prevCf);
                                            return (
                                                <div key={item.symptom.id} className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
                                                    <div>Step {idx + 2} (Gabungkan dengan {item.symptom.code}):</div>
                                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                                        CF_gabungan = {prevCf.toFixed(5)} + ({currentCf.toFixed(5)} * (1 - {prevCf.toFixed(5)})) = {combinedCf.toFixed(5)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2 font-bold text-teal-600 dark:text-teal-400">
                                            Hasil Akhir CF: {highest.cf.toFixed(5)}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Back and Restart Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <Link href="/diagnosa" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-lg shadow-teal-500/20 text-center transition">
                            Ulangi Diagnosis
                        </Link>
                        <Link href="/" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-350 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 text-slate-700 text-center font-bold shadow-sm transition">
                            Kembali ke Beranda
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
}
