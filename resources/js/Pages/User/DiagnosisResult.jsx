import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

// Symptom dictionary for lookup
const GEJALA_DICT = {
    "D1": "Kesedihan",
    "D2": "Pesimis",
    "D3": "Kegagalan",
    "D4": "Kehilangan Kenikmatan",
    "D5": "Perasaan Bersalah",
    "D6": "Perasaan dihukum",
    "D7": "Pikiran Bunuh Diri",
    "D8": "Gelisah",
    "D9": "Kehilangan Ketertarikan",
    "D10": "Keraguan",
    "D11": "Kehilangan Energi",
    "D12": "Perubahan Pola Tidur",
    "D13": "Perubahan Nafsu Makan",
    "D14": "Sulit Konsentrasi",
    "D15": "Kelelahan"
};

// Depresi categories
const DEPRESI_DICT = {
    "M1": { id: "M1", name: "Depresi Ringan (Mild/Minor)", badgeColor: "bg-teal-50 text-teal-750 border-teal-200 dark:bg-slate-800 dark:text-teal-400 dark:border-slate-700" },
    "M2": { id: "M2", name: "Depresi Sedang (Moderate)", badgeColor: "bg-teal-100 text-teal-850 border-teal-300 dark:bg-slate-800 dark:text-teal-300 dark:border-slate-700" },
    "M3": { id: "M3", name: "Depresi Berat (Severe/Major)", badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-slate-800 dark:text-rose-400 dark:border-slate-700" }
};

// Expert Rules (Certainty Factor weights from paper)
const RULES = [
    // M1 => Depresi Ringan (Mild)
    { kode_depresi: "M1", kode_gejala: "D2", pakar_cf: 0.2 },
    { kode_depresi: "M1", kode_gejala: "D13", pakar_cf: 1.0 },

    // M2 => Depresi Sedang (Moderate)
    { kode_depresi: "M2", kode_gejala: "D1", pakar_cf: 1.0 },
    { kode_depresi: "M2", kode_gejala: "D3", pakar_cf: 0.8 },
    { kode_depresi: "M2", kode_gejala: "D5", pakar_cf: 0.4 },
    { kode_depresi: "M2", kode_gejala: "D6", pakar_cf: 0.3 },
    { kode_depresi: "M2", kode_gejala: "D8", pakar_cf: 0.8 },
    { kode_depresi: "M2", kode_gejala: "D10", pakar_cf: 1.0 },
    { kode_depresi: "M2", kode_gejala: "D11", pakar_cf: 0.3 },
    { kode_depresi: "M2", kode_gejala: "D12", pakar_cf: 0.8 },
    { kode_depresi: "M2", kode_gejala: "D14", pakar_cf: 0.4 },
    { kode_depresi: "M2", kode_gejala: "D15", pakar_cf: 0.2 },

    // M3 => Depresi Berat (Severe)
    { kode_depresi: "M3", kode_gejala: "D4", pakar_cf: 0.5 },
    { kode_depresi: "M3", kode_gejala: "D7", pakar_cf: 0.8 },
    { kode_depresi: "M3", kode_gejala: "D9", pakar_cf: 1.0 }
];

// Symptom Solutions / Suggestions (S) from paper
const SUGGESTIONS = {
    "D1": "Cobalah untuk menyadari bahwa semua orang pada saat yang berbeda juga mengalami hal yang sama seperti Anda rasakan. Yakinkan diri, cepat atau lambat kesedihan ini akan berakhir.",
    "D2": "Saat keyakinan sudah mantap dalam hati, maka dia akan begitu semangat dalam berikhtiar, optimis, dan menyongsong masa depan yang lebih baik. Masa lalu boleh kelabu. Saat ini mungkin banyak masalah. Tetapi, tidak ada alasan kalau besok akan tetap seperti ini.",
    "D3": "Bersyukurlah jika anda mengalami kegagalan atau kemalangan. Karena dengan kegagalan anda sedang disiapkan untuk meraih kesuksesan yang lebih besar. Anda akan ditempa untuk menjadi lebih kuat dari sebelumnya.",
    "D4": "Mencobalah untuk membuka diri dan menerima masukan dari orang lain, tujuan nya agar kita tidak selalu terdiam karena terpikir sutu masalah.",
    "D5": "Perasaan bersalah muncul karena merasa Tertekan karena Berbagai Kewajiban Dalam penyusunan skripsi, dengan ini cobalah anda untuk mencoba dan berpikir positif dan terus mencoba.",
    "D6": "Perasaan dihukum muncul karena berawalkan dari kegagalan yang pernah anda alami secara terus menerus, untuk menetralisir itu perlu adanya dukungan dari orang lain, berusahalah terus karena sejatinya itu adalah ujian hidup yang harus anda lewati.",
    "D7": "Gunakan kesadaran Anda sebagai manusia utuh. Daripada memikirkan masalah atau pemecahannya, lebih baik kita bergerak ke jalan yang baru: jangan pikirkan masalah itu dulu. Dengan menggunakan kesadaran yang kita miliki, kita harus mengabaikan pikiran yang mengatakan bahwa situasi yang sedang kita hadapi itu sangat ‘complicated’. Ingat bahwa pikiran bukanlah diri kita yang sebenarnya. Dengan prinsip ini, gunakanlah kesadaran kita yang sepenuhnya sebagai ciptaan Allah yang utuh Intinya, kesadaran Anda harus mampu mengatakan, “Ini dapat diatasi”.",
    "D8": "Tantangan, pada hakikatnya bukan untuk dihindari, melainkan justru untuk dilakoni. Hidup itu sendiri adalah tantangan, adalah masalah. Mengapa kita mesti menghindar? Di sinilah kadang-kadang kita lupa pada kesejatian diri. Selalu berusaha dan katakan dalam hati ini pasti berahir dengan.",
    "D9": "Jangan selalu terdiam karena masalah yang ini, masih banyak yang harus anda lakukan cobalah bangkit “anda masih di tunggu” bangkitlah sekarang!!",
    "D10": "Sebetulnya, semangat yang kuat itu diperlukan untuk mengatasi semua keraguan dan cobaan yang bisa mematikan kesungguhannya untuk mencapai hal-hal penting atau besar yang diinginkannya.",
    "D11": "Yang pasti, setiap masalah yang nyata, pasti ada pemecahannya, dan tentu saja setiap usaha pasti ada hasilnya. Asal Anda tahu apa yang harus dilakukan, dan kenapa masalah itu terjadi, pemecahan sudah ada di tangan. Anda tinggal menggerakkan diri, perangi segala kemalasan yang membawa kerugian itu.",
    "D12": "Susah tidur atau Insomnia adalah paduan dari gejala dan akibat dari depresi dan kegelisahan. Karena otak menggunakan ‘sinyal’ serupa untuk mengatur jadwal tidur dan emosi, sangat sulit untuk menentukan mana yang harus dimunculkan lebih dulu.",
    "D13": "Pikirkan bagaimana rasa malas ini mempengaruhi kualitas hidup Anda, hubungan Anda, membuat Anda kehilangan kesempatan, kesehatan dan energi yang memburuk. Lalu buat daftar apa saja yang dapat Anda lakukan . Jangan biarkan diri anda tersikasa, anda masih dibutuhkan banyak orang.",
    "D14": "Anda harus belajar untuk mendorong diri sendiri untuk membatasi. Jika Anda menemukan konsentrasi Anda, lakukan trik sederhana tapi manjur ini. Ambillah nafas dalam-dalam dan perlahan. Ketika Anda mengambil nafas seperti itu, seketika itu juga otak Anda terstimulasi masuk pada frekwensi Low beta.",
    "D15": "Kelelahan anda muncul disebabkan karena pikiran anda yang lelah untuk memikirkan masalah ini. Jadi, cobalah untuk menenangankan diri dangan istirahat atau dengan mencari tempat yang bisa membuat anda tenang untuk sementara waktu."
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

    const [rawAnswers, setRawAnswers] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [calculations, setCalculations] = useState(null);
    const [selectedDepresi, setSelectedDepresi] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('depresicheck_answers');
        const savedInfo = localStorage.getItem('depresicheck_user_info');
        if (saved) {
            const parsed = JSON.parse(saved);
            setRawAnswers(parsed);
            calculateCF(parsed);
        }
        if (savedInfo) {
            setUserInfo(JSON.parse(savedInfo));
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
                const userVal = userAnswersMap[rule.kode_gejala] !== undefined ? userAnswersMap[rule.kode_gejala] : 0.0;
                const pakarWeight = rule.pakar_cf;
                const combinedCF = pakarWeight * userVal;

                // Include symptoms that are confirmed (val != 0)
                if (userVal !== 0.0) {
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

            // Combine Certainty Factors recursively
            let combinedResult = 0;
            const steps = [];
            
            if (cfValues.length > 0) {
                combinedResult = cfValues[0];
                steps.push(combinedResult);
                
                for (let i = 1; i < cfValues.length; i++) {
                    const nextVal = cfValues[i];
                    
                    // Standard Certainty Factor combination formula supporting positive/negative/mixed values
                    if (combinedResult >= 0 && nextVal >= 0) {
                        combinedResult = combinedResult + nextVal * (1 - combinedResult);
                    } else if (combinedResult < 0 && nextVal < 0) {
                        combinedResult = combinedResult + nextVal * (1 + combinedResult);
                    } else {
                        combinedResult = (combinedResult + nextVal) / (1 - Math.min(Math.abs(combinedResult), Math.abs(nextVal)));
                    }
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

    const { highest, results } = calculations;
    const article = ARTICLES[highest.kode_depresi];

    // Filter symptoms experienced by user (value > 0)
    const experiencedSymptoms = rawAnswers.filter(([code, val]) => val > 0.0);

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
                                <div className="text-3xl font-black text-teal-605 dark:text-teal-400">{(highest.value * 100).toFixed(1)}%</div>
                                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">CF: {parseFloat(highest.value).toFixed(3)}</div>
                                
                                <svg className="absolute -inset-1 w-[152px] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="46"
                                        fill="transparent"
                                        stroke="url(#tealGradient)"
                                        strokeWidth="4"
                                        strokeDasharray="289"
                                        strokeDashoffset={289 - (289 * highest.value)}
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
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${DEPRESI_DICT[highest.kode_depresi]?.badgeColor || 'bg-teal-50 text-teal-700 border-teal-200'} mb-3`}>
                                    {highest.kode_depresi} &bull; {DEPRESI_DICT[highest.kode_depresi]?.name}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                                    {DEPRESI_DICT[highest.kode_depresi]?.name}
                                </h2>
                                <p className="text-slate-650 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    Berdasarkan perhitungan Certainty Factor dari 15 butir gejala yang diinputkan, Anda diestimasikan berada dalam kategori <span className="text-teal-600 font-extrabold">{DEPRESI_DICT[highest.kode_depresi]?.name}</span> dengan tingkat kepastian <span className="text-teal-600 font-extrabold">{(highest.value * 100).toFixed(2)}%</span>.
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
                    {experiencedSymptoms.length > 0 && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Saran Penanganan Berdasarkan Gejala Anda</h3>
                            <div className="space-y-6">
                                {experiencedSymptoms.map(([code, val]) => {
                                    const symptomName = GEJALA_DICT[code];
                                    const suggestion = SUGGESTIONS[code];
                                    return (
                                        <div key={code} className="flex gap-4 items-start p-4 bg-teal-500/[0.02] dark:bg-teal-500/[0.04] border border-teal-500/10 dark:border-teal-500/20 rounded-2xl">
                                            <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-650 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                                                {code}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                                    Mengalami {symptomName}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                                                    {suggestion}
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
                            onClick={() => setShowDetails(!showDetails)}
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
                        <div className="space-y-8 animate-fadeIn">
                            
                            {/* Summary list of CFs */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {results.map((res) => {
                                    const isWinner = res.kode_depresi === highest.kode_depresi;
                                    return (
                                        <div key={res.kode_depresi} className={`p-4 rounded-2xl border ${
                                            isWinner ? 'bg-teal-50/30 border-teal-300 dark:bg-teal-950/20 dark:border-teal-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm dark:shadow-none'
                                        }`}>
                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{res.kode_depresi}</div>
                                            <div className="font-extrabold text-sm text-slate-800 dark:text-white truncate">{res.depresi}</div>
                                            <div className={`text-xl font-black mt-1 ${isWinner ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                                {(res.value * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Chosen Category Table Calculation */}
                            <div className="bg-white border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/10 dark:shadow-none">
                                <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div className="font-bold text-slate-800 dark:text-white text-sm">
                                        Matriks Gejala & CF Kombinasi untuk <span className="text-teal-600 dark:text-teal-400">{DEPRESI_DICT[highest.kode_depresi]?.name}</span>
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
                                            {highest.combinations.map((comb) => (
                                                <tr key={comb.kode_gejala} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50">
                                                    <td className="px-6 py-4 font-mono font-bold text-teal-600 dark:text-teal-400">{comb.kode_gejala}</td>
                                                    <td className="px-6 py-4 max-w-xs truncate">{comb.gejala}</td>
                                                    <td className="px-6 py-4 text-center font-mono">{comb.pakar_cf}</td>
                                                    <td className="px-6 py-4 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">{comb.user_cf}</td>
                                                    <td className="px-6 py-4 text-right font-mono font-bold text-teal-600 dark:text-teal-400">{comb.cf_i}</td>
                                                </tr>
                                            ))}
                                            {highest.combinations.length === 0 && (
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
                            {highest.steps.length > 1 && (
                                <div className="bg-white border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/10 dark:shadow-none">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Penggabungan Certainty Factor Berurutan (CF_combine)</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                                        Menggabungkan CF_i dari masing-masing gejala secara rekursif menggunakan rumus: 
                                        <br />
                                        <code className="text-teal-600 dark:text-teal-450 font-mono font-semibold block my-1">CF_gabungan = CF_old + CF_new * (1 - CF_old)</code>
                                    </p>
                                    
                                    <div className="font-mono text-xs text-slate-650 dark:text-slate-350 space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <div>Step 1 (Inisial CF_1): <span className="text-teal-600 dark:text-teal-400 font-bold">{highest.combinations[0]?.cf_i}</span></div>
                                        {highest.steps.slice(1).map((step, idx) => {
                                            const nextComb = highest.combinations[idx + 1];
                                            const prevStep = highest.steps[idx];
                                            return (
                                                <div key={idx} className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
                                                    <div>Step {idx + 2} (Gabungkan dengan {nextComb?.kode_gejala}):</div>
                                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                                        CF_gabungan = {prevStep.toFixed(5)} + ({nextComb?.cf_i} * (1 - {prevStep.toFixed(5)}))
                                                    </div>
                                                    <div className="text-teal-600 dark:text-teal-400 font-bold">CF_gabungan = {step.toFixed(6)} ({(step * 100).toFixed(2)}%)</div>
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
