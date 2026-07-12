import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

// Symptom dictionary for lookup
const GEJALA_DICT = {
    "G001": "Sering Merasa Sedih",
    "G002": "Sering kelelahan melakukan aktifitas ringan",
    "G003": "Kurang konsentrasi dalam belajar",
    "G004": "Mudah merasa bosan",
    "G005": "Sering Melamun",
    "G006": "Tidak semangat melakukan sesuatu",
    "G007": "Merasa Risau",
    "G008": "Pesimis",
    "G009": "Sering menangis secara tiba-tiba",
    "G010": "Gangguan susah Tidur",
    "G011": "Merasa Cemas Berlebihan",
    "G012": "Kecewa dengan diri sendiri",
    "G013": "Terganggu dengan banyak hal",
    "G014": "Sering murung",
    "G015": "Kehilangan minat terhadap hoby",
    "G016": "Merasa kesepian",
    "G017": "Sering merasa bersalah",
    "G018": "Merasa dihakimi",
    "G019": "Membenci Diri Sendiri",
    "G020": "Mudah tersinggung",
    "G021": "Kehilangan Nafsu makan",
    "G022": "Khawatir tentang penampilan",
    "G023": "Mudah Marah",
    "G024": "Suka menyendiri",
    "G025": "Pikiran Untuk Bunuh Diri",
    "G026": "Sulit mengambil keputusan",
    "G027": "Sulit melakukan kegiatan dengan Baik",
    "G028": "Ada penambahan dan penurunan berat badan",
    "G029": "Kurang percaya diri"
};

// Depresi categories
const DEPRESI_DICT = {
    "P001": { id: "P001", name: "Gangguan Mood", badgeColor: "bg-teal-50 text-teal-700 border-teal-200" },
    "P002": { id: "P002", name: "Depresi Ringan", badgeColor: "bg-sky-50 text-sky-700 border-sky-200" },
    "P003": { id: "P003", name: "Depresi Sedang", badgeColor: "bg-orange-50 text-orange-700 border-orange-200" },
    "P004": { id: "P004", name: "Depresi Berat", badgeColor: "bg-rose-50 text-rose-700 border-rose-200" }
};

// Expert Rules (Certainty Factor weights)
const RULES = [
    // P001 => Gangguan Mood
    { kode_depresi: "P001", kode_gejala: "G001", mb: 0.6, md: 0.2 },
    { kode_depresi: "P001", kode_gejala: "G002", mb: 0.4, md: 0.2 },
    { kode_depresi: "P001", kode_gejala: "G003", mb: 1.0, md: 0.0 },
    { kode_depresi: "P001", kode_gejala: "G004", mb: 0.4, md: 0.2 },
    { kode_depresi: "P001", kode_gejala: "G005", mb: 0.8, md: 0.2 },
    { kode_depresi: "P001", kode_gejala: "G007", mb: 0.4, md: 0.2 },

    // P002 => Depresi Ringan
    { kode_depresi: "P002", kode_gejala: "G001", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G002", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G006", mb: 1.0, md: 0.0 },
    { kode_depresi: "P002", kode_gejala: "G008", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G010", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G011", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G014", mb: 0.8, md: 0.0 },
    { kode_depresi: "P002", kode_gejala: "G015", mb: 0.6, md: 0.2 },
    { kode_depresi: "P002", kode_gejala: "G016", mb: 0.8, md: 0.0 },
    { kode_depresi: "P002", kode_gejala: "G022", mb: 0.6, md: 0.0 },

    // P003 => Depresi Sedang
    { kode_depresi: "P003", kode_gejala: "G001", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G009", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G010", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G011", mb: 0.6, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G012", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G013", mb: 1.0, md: 0.0 },
    { kode_depresi: "P003", kode_gejala: "G016", mb: 1.0, md: 0.0 },
    { kode_depresi: "P003", kode_gejala: "G017", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G020", mb: 0.6, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G022", mb: 1.0, md: 0.0 },
    { kode_depresi: "P003", kode_gejala: "G023", mb: 0.8, md: 0.2 },
    { kode_depresi: "P003", kode_gejala: "G027", mb: 0.6, md: 0.2 },

    // P004 => Depresi Berat
    { kode_depresi: "P004", kode_gejala: "G001", mb: 0.8, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G009", mb: 1.0, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G010", mb: 0.8, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G012", mb: 1.0, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G013", mb: 0.2, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G016", mb: 1.0, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G018", mb: 0.6, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G019", mb: 0.8, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G020", mb: 0.8, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G021", mb: 0.4, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G024", mb: 0.6, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G025", mb: 0.8, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G026", mb: 0.4, md: 0.2 },
    { kode_depresi: "P004", kode_gejala: "G027", mb: 0.6, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G028", mb: 1.0, md: 0.0 },
    { kode_depresi: "P004", kode_gejala: "G029", mb: 0.8, md: 0.0 }
];

// Article details
const ARTICLES = {
    "P001": {
        judul: "Gangguan Mood",
        url_gambar: "https://plus.unsplash.com/premium_photo-1668062843172-0129f25a1276?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
        isi: "Ganggguan mood yang terjadi pada seseorang ini umumnya terjadi karena banyaknya tekanan yang menimpa dirinya dan cenderung terlarut dalam tekanan dapat meningkatkan resiko berkembangnya gangguan mood yang kemudian dapat berubah menjadi depresi terutama depresi mayor. Hal ini terbukti pada suatu penelitian yang menemukan bahwa dalam sekitar empat dari lima kasus, depresi mayor diawali oleh peristiwa kehidupan yang penuh tekanan."
    },
    "P002": {
        judul: "Depresi Minor / Depresi Ringan",
        url_gambar: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/10/04084507/Ini-Ciri-Ciri-Depresi-Ringan-yang-Masih-Sering-Diabaikan.jpg",
        isi: "Depresi ringan ini di identikkan dengan depresi minor yang merupakan perasaan melankolis yang berlangsung sebentar dan disebabkan oleh sebuah kejadian yang tragis atau mengandung ancaman, atau kehilangan sesuatu yang penting dalam kehidupan si penderita (Meier, 2000: 20-21). Orang dengan depresi ringan ini setidaknya memiliki 2 dari gejala lainnya dan 2-3 dari gejala utama. (Maslim, 2003, 64)."
    },
    "P003": {
        judul: "Depresi Sedang",
        url_gambar: "https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg",
        isi: "Depresi sedang ini di alami oleh penderita selama kurang 2 minggu, dan orang dengan depresi sedang ini mengalami kesulitan nyata untuk meneruskan kegiatan social, pekerjaan dan urusan rumah tangga. Orang dengan depresi sedang ini setidaknya memiliki 2-3 dari gejala utama and 3-4 dari gejala lainnya (Maslim,  2003: 64)."
    },
    "P004": {
        judul: "Depresi Mayor / Depresi Berat",
        url_gambar: "https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg",
        isi: "Depresi mayor merupakan salah satu gangguan yang prevalensinya paling tinggi di antara berbagai gangguan (Davidson, 2006: 374). Depresi mayor adalah kemurungan yang dalam dan menyebar luas. Perasaan murung ini mampu menyedot semangat dan energy serta menyelubungi kehidupan si penderita seperti asap yang tebal dan menyesakkan dada. Depresi mayor ini dapat berlangsung cukup lama mulai dari empat belas hari sampai beberapa tahun. Hal ini menyebabkan penderita akan sangat sulit untuk berfungsi dengan baik di lingkungannya. Orang dengan depresi mayor ini juga terkadang disertai dengan keinginan untuk bunuh diri atau bahkan keinginan untuk mati."
    }
};

export default function DiagnosisResult() {
    const [rawAnswers, setRawAnswers] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [calculations, setCalculations] = useState(null);
    const [selectedDepresi, setSelectedDepresi] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('depresicheck_answers');
        if (saved) {
            const parsed = JSON.parse(saved);
            setRawAnswers(parsed);
            calculateCF(parsed);
        }
    }, []);

    const calculateCF = (answersList) => {
        const userAnswersMap = {};
        answersList.forEach(([code, val]) => {
            userAnswersMap[code] = val;
        });

        const results = [];

        Object.keys(DEPRESI_DICT).forEach((depresiCode) => {
            const categoryRules = RULES.filter(r => r.kode_depresi === depresiCode);
            const combinations = [];
            const cfValues = [];

            categoryRules.forEach((rule) => {
                const userVal = userAnswersMap[rule.kode_gejala] || 0.0;
                const pakarWeight = rule.mb - rule.md;
                const combinedCF = pakarWeight * userVal;

                if (userVal > 0.0) {
                    combinations.push({
                        kode_gejala: rule.kode_gejala,
                        gejala: GEJALA_DICT[rule.kode_gejala],
                        pakar_cf: pakarWeight.toFixed(2),
                        user_cf: userVal.toFixed(2),
                        cf_i: combinedCF.toFixed(4)
                    });
                    cfValues.push(combinedCF);
                }
            });

            let combinedResult = 0;
            const steps = [];
            
            if (cfValues.length > 0) {
                combinedResult = cfValues[0];
                steps.push(combinedResult);
                
                for (let i = 1; i < cfValues.length; i++) {
                    const nextVal = cfValues[i];
                    combinedResult = combinedResult + (nextVal * (1 - combinedResult));
                    steps.push(combinedResult);
                }
            }

            results.push({
                kode_depresi: depresiCode,
                depresi: DEPRESI_DICT[depresiCode].name,
                value: combinedResult,
                combinations,
                steps
            });
        });

        let highest = { value: -1 };
        results.forEach((res) => {
            if (res.value > highest.value) {
                highest = res;
            }
        });

        setCalculations({
            results,
            highest
        });
        
        setSelectedDepresi(highest.kode_depresi);
    };

    if (!rawAnswers || !calculations) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-center items-center p-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-slate-200/50">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6 text-orange-600">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-2">Belum Ada Hasil Diagnosis</h2>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        Anda belum melakukan diagnosis depresi. Silakan isi kuesioner terlebih dahulu untuk melihat hasil diagnosa Anda.
                    </p>
                    <Link href="/diagnosa" className="inline-block w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition">
                        Isi Kuesioner Sekarang
                    </Link>
                </div>
            </div>
        );
    }

    const { highest, results } = calculations;
    const article = ARTICLES[highest.kode_depresi];

    return (
        <>
            <Head title="Hasil Diagnosa Depresi - DepresiCheck" />

            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white pb-20">
                {/* Navbar */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 px-6 fixed top-0 w-full z-40 shadow-sm shadow-slate-100/30">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                DepresiCheck
                            </span>
                        </Link>
                        <Link href="/diagnosa" className="text-sm font-bold text-orange-600 hover:underline">
                            Ulangi Tes
                        </Link>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 pt-28">
                    
                    {/* Header Announcement */}
                    <div className="text-center mb-8">
                        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-2 block">Hasil Analisis</span>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">Laporan Diagnosis Depresi</h1>
                    </div>

                    {/* Result Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/[0.02] rounded-full blur-3xl -z-10 animate-pulse"></div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {/* Left: Score Circle */}
                            <div className="relative flex-shrink-0 w-36 h-36 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center bg-slate-50 shadow-inner">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 animate-pulse">Keyakinan</div>
                                <div className="text-3xl font-black text-orange-600">{(highest.value * 100).toFixed(1)}%</div>
                                <div className="text-[10px] font-mono text-slate-400 mt-1">CF: {parseFloat(highest.value).toFixed(3)}</div>
                                
                                <svg className="absolute -inset-1 w-[152px] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="46"
                                        fill="transparent"
                                        stroke="url(#orangeGradient)"
                                        strokeWidth="4"
                                        strokeDasharray="289"
                                        strokeDashoffset={289 - (289 * highest.value)}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f97316" />
                                            <stop offset="100%" stopColor="#f59e0b" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Right: Diagnosis Category Details */}
                            <div className="text-center sm:text-left flex-grow">
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${DEPRESI_DICT[highest.kode_depresi].badgeColor} mb-3`}>
                                    {highest.kode_depresi} &bull; {DEPRESI_DICT[highest.kode_depresi].name}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                                    {DEPRESI_DICT[highest.kode_depresi].name}
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    Berdasarkan perhitungan Certainty Factor dari 29 butir gejala yang diinputkan, Anda diestimasikan berada dalam kategori <span className="text-orange-650 font-extrabold">{DEPRESI_DICT[highest.kode_depresi].name}</span> dengan tingkat kepastian <span className="text-orange-650 font-extrabold">{(highest.value * 100).toFixed(2)}%</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Article Section */}
                    {article && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 mb-8">
                            <div className="h-64 sm:h-80 w-full overflow-hidden relative">
                                <img src={article.url_gambar} alt={article.judul} className="w-full h-full object-cover opacity-90 transition" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-2 block">Panduan Pemulihan</span>
                                    <h3 className="text-2xl font-black text-white">{article.judul}</h3>
                                </div>
                            </div>
                            <div className="p-6 sm:p-10 border-t border-slate-100">
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                    {article.isi}
                                </p>
                                
                                <div className="mt-8 p-4 bg-orange-500/[0.03] border border-orange-500/20 rounded-2xl flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-xs sm:text-sm text-orange-700 leading-relaxed font-semibold">
                                        <strong>Catatan Penting:</strong> Hasil kuesioner ini didasarkan pada kecocokan Certainty Factor sistem pakar. Jika Anda merasa kondisi emosional Anda sangat mengganggu aktivitas belajar atau kehidupan sehari-hari, mohon tidak ragu menghubungi layanan konseling mahasiswa atau psikolog terdekat.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Detailed Calculations Accordion Button */}
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Rincian Perhitungan Matematis</h3>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-350 text-orange-600 hover:text-orange-500 shadow-sm transition text-xs font-bold flex items-center gap-2"
                        >
                            {showDetails ? 'Sembunyikan Rumus' : 'Tampilkan Perhitungan Pakar'}
                            <svg className={`w-4 h-4 transition ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Detailed Math Calculations Box */}
                    {showDetails && (
                        <div className="space-y-8 animate-fadeIn">
                            
                            {/* Summary list of CFs */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {results.map((res) => {
                                    const isWinner = res.kode_depresi === highest.kode_depresi;
                                    return (
                                        <div key={res.kode_depresi} className={`p-4 rounded-2xl border ${
                                            isWinner ? 'bg-orange-50/50 border-orange-300' : 'bg-white border-slate-200 shadow-sm'
                                        }`}>
                                            <div className="text-[10px] text-slate-400 font-mono">{res.kode_depresi}</div>
                                            <div className="font-extrabold text-sm text-slate-800 truncate">{res.depresi}</div>
                                            <div className={`text-xl font-black mt-1 ${isWinner ? 'text-orange-600' : 'text-slate-400'}`}>
                                                {(res.value * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Chosen Category Table Calculation */}
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/10">
                                <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div className="font-bold text-slate-800 text-sm">
                                        Matriks Gejala & CF Kombinasi untuk <span className="text-orange-650">{DEPRESI_DICT[highest.kode_depresi].name}</span>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded self-start">
                                        Formula: CF_i = (MB - MD) * CF_user
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                                        <thead className="bg-slate-100 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                                            <tr>
                                                <th className="px-6 py-4">Kode</th>
                                                <th className="px-6 py-4">Gejala Terdeteksi</th>
                                                <th className="px-6 py-4 text-center">CF Pakar (MB-MD)</th>
                                                <th className="px-6 py-4 text-center">CF User</th>
                                                <th className="px-6 py-4 text-right">CF Hasil (CF_i)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {highest.combinations.map((comb) => (
                                                <tr key={comb.kode_gejala} className="hover:bg-slate-50/50">
                                                    <td className="px-6 py-4 font-mono font-bold text-orange-600">{comb.kode_gejala}</td>
                                                    <td className="px-6 py-4 max-w-xs truncate">{comb.gejala}</td>
                                                    <td className="px-6 py-4 text-center font-mono">{comb.pakar_cf}</td>
                                                    <td className="px-6 py-4 text-center font-mono text-emerald-600 font-bold">{comb.user_cf}</td>
                                                    <td className="px-6 py-4 text-right font-mono font-bold text-orange-600">{comb.cf_i}</td>
                                                </tr>
                                            ))}
                                            {highest.combinations.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                                        Tidak ada gejala yang cocok terdeteksi untuk penyakit ini.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Sequential Combinations Steps */}
                            {highest.steps.length > 1 && (
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/10">
                                    <h4 className="font-bold text-slate-900 text-sm mb-4">Penggabungan Certainty Factor Berurutan (CF_combine)</h4>
                                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                        Menggabungkan CF_i dari masing-masing gejala secara rekursif menggunakan rumus: 
                                        <br />
                                        <code className="text-orange-600 font-mono font-semibold block my-1">CF_gabungan(old, new) = CF_old + (CF_new * (1 - CF_old))</code>
                                    </p>
                                    
                                    <div className="font-mono text-xs text-slate-650 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div>Step 1 (Inisial CF_1): <span className="text-orange-600 font-bold">{highest.combinations[0]?.cf_i}</span></div>
                                        {highest.steps.slice(1).map((step, idx) => {
                                            const nextComb = highest.combinations[idx + 1];
                                            const prevStep = highest.steps[idx];
                                            return (
                                                <div key={idx} className="border-t border-slate-200 pt-2 mt-2">
                                                    <div>Step {idx + 2} (Gabungkan dengan {nextComb?.kode_gejala}):</div>
                                                    <div className="text-[10px] text-slate-400">
                                                        CF_gabungan = {prevStep.toFixed(5)} + ({nextComb?.cf_i} * (1 - {prevStep.toFixed(5)}))
                                                    </div>
                                                    <div className="text-orange-600 font-bold">CF_gabungan = {step.toFixed(6)} ({(step * 100).toFixed(2)}%)</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Back and Restart Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <Link href="/diagnosa" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-655 hover:to-orange-500 text-white font-extrabold shadow-lg shadow-orange-500/20 text-center transition">
                            Ulangi Diagnosis
                        </Link>
                        <Link href="/" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-center font-bold shadow-sm transition">
                            Kembali ke Beranda
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
}
