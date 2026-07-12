import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

const GEJALA_LIST = [
    { kode_gejala: "G001", gejala: "Sering Merasa Sedih" },
    { kode_gejala: "G002", gejala: "Sering kelelahan melakukan aktifitas ringan" },
    { kode_gejala: "G003", gejala: "Kurang konsentrasi dalam belajar" },
    { kode_gejala: "G004", gejala: "Mudah merasa bosan" },
    { kode_gejala: "G005", gejala: "Sering Melamun" },
    { kode_gejala: "G006", gejala: "Tidak semangat melakukan sesuatu" },
    { kode_gejala: "G007", gejala: "Merasa Risau" },
    { kode_gejala: "G008", gejala: "Pesimis" },
    { kode_gejala: "G009", gejala: "Sering menangis secara tiba-tiba" },
    { kode_gejala: "G010", gejala: "Gangguan susah Tidur" },
    { kode_gejala: "G011", gejala: "Merasa Cemas Berlebihan" },
    { kode_gejala: "G012", gejala: "Kecewa dengan diri sendiri" },
    { kode_gejala: "G013", gejala: "Terganggu dengan banyak hal" },
    { kode_gejala: "G014", gejala: "Sering murung" },
    { kode_gejala: "G015", gejala: "Kehilangan minat terhadap hoby" },
    { kode_gejala: "G016", gejala: "Merasa kesepian" },
    { kode_gejala: "G017", gejala: "Sering merasa bersalah" },
    { kode_gejala: "G018", gejala: "Merasa dihakimi" },
    { kode_gejala: "G019", gejala: "Membenci Diri Sendiri" },
    { kode_gejala: "G020", gejala: "Mudah tersinggung" },
    { kode_gejala: "G021", gejala: "Kehilangan Nafsu makan" },
    { kode_gejala: "G022", gejala: "Khawatir tentang penampilan" },
    { kode_gejala: "G023", gejala: "Mudah Marah" },
    { kode_gejala: "G024", gejala: "Suka menyendiri" },
    { kode_gejala: "G025", gejala: "Pikiran Untuk Bunuh Diri" },
    { kode_gejala: "G026", gejala: "Sulit mengambil keputusan" },
    { kode_gejala: "G027", gejala: "Sulit melakukan kegiatan dengan Baik" },
    { kode_gejala: "G028", gejala: "Ada penambahan dan penurunan berat badan" },
    { kode_gejala: "G029", gejala: "Kurang percaya diri" }
];

const KONDISI_CHOICES = [
    { kondisi: "Pasti", nilai: 1.0, color: "border-red-200 hover:bg-red-50 text-red-700 bg-red-50/20", activeColor: "ring-2 ring-red-500 bg-red-50/80 border-transparent text-red-900 font-bold" },
    { kondisi: "Hampir Pasti", nilai: 0.8, color: "border-orange-200 hover:bg-orange-50 text-orange-700 bg-orange-50/20", activeColor: "ring-2 ring-orange-500 bg-orange-50/80 border-transparent text-orange-900 font-bold" },
    { kondisi: "Kemungkinan Besar", nilai: 0.6, color: "border-amber-200 hover:bg-amber-50 text-amber-700 bg-amber-50/20", activeColor: "ring-2 ring-amber-500 bg-amber-50/80 border-transparent text-amber-900 font-bold" },
    { kondisi: "Mungkin", nilai: 0.4, color: "border-teal-200 hover:bg-teal-50 text-teal-700 bg-teal-50/20", activeColor: "ring-2 ring-teal-500 bg-teal-50/80 border-transparent text-teal-900 font-bold" },
    { kondisi: "Tidak Yakin", nilai: 0.2, color: "border-sky-200 hover:bg-sky-50 text-sky-700 bg-sky-50/20", activeColor: "ring-2 ring-sky-500 bg-sky-50/80 border-transparent text-sky-900 font-bold" },
    { kondisi: "Tidak Tahu / Tidak", nilai: 0.0, color: "border-slate-200 hover:bg-slate-55 text-slate-600 bg-slate-50/20", activeColor: "ring-2 ring-slate-550 bg-slate-100 border-transparent text-slate-800 font-bold" }
];

export default function DiagnosisForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleSelectOption = (value) => {
        setAnswers({
            ...answers,
            [activeIndex]: value
        });
        
        if (activeIndex < GEJALA_LIST.length - 1) {
            setTimeout(() => {
                setActiveIndex((prev) => prev + 1);
            }, 250);
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
        }
    };

    const countAnswered = Object.keys(answers).length;
    const isCompleted = countAnswered === GEJALA_LIST.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (countAnswered < GEJALA_LIST.length) {
            alert(`Harap selesaikan semua pertanyaan terlebih dahulu! Baru menjawab ${countAnswered} dari ${GEJALA_LIST.length} pertanyaan.`);
            return;
        }

        const formattedAnswers = GEJALA_LIST.map((item, idx) => {
            return [item.kode_gejala, answers[idx]];
        });

        localStorage.setItem('depresicheck_answers', JSON.stringify(formattedAnswers));
        router.visit('/diagnosa/hasil');
    };

    const currentGejala = GEJALA_LIST[activeIndex];
    const currentSelectedValue = answers[activeIndex];

    return (
        <>
            <Head title="Form Diagnosa Depresi - DepresiCheck" />
            
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-orange-500 selection:text-white">
                {/* Navbar */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 px-6 shadow-sm shadow-slate-100/30">
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
                        
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                            Progres: <span className="text-orange-600 font-bold">{countAnswered}</span> / {GEJALA_LIST.length} Dijawab
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
                        
                        {/* Left Card */}
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/20 lg:col-span-8 w-full min-h-[480px] flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center text-xs uppercase tracking-wider text-slate-400 mb-6 font-semibold">
                                    <span>Kuesioner Gejala</span>
                                    <span className="font-mono text-orange-600 font-bold">Pertanyaan {activeIndex + 1} dari {GEJALA_LIST.length}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                                        style={{ width: `${((activeIndex + 1) / GEJALA_LIST.length) * 100}%` }}
                                    ></div>
                                </div>

                                {/* Question Title */}
                                <div className="mb-8">
                                    <span className="text-sm font-bold text-orange-600 mb-2 block">{currentGejala.kode_gejala}</span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug text-slate-900">
                                        Apakah Anda merasa {currentGejala.gejala.toLowerCase()}?
                                    </h2>
                                </div>

                                {/* Choices Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {KONDISI_CHOICES.map((choice) => {
                                        const isSelected = currentSelectedValue === choice.nilai;
                                        return (
                                            <button
                                                key={choice.nilai}
                                                type="button"
                                                onClick={() => handleSelectOption(choice.nilai)}
                                                className={`flex items-center justify-between p-4 rounded-xl border text-left font-semibold transition duration-150 ${
                                                    isSelected ? choice.activeColor : `border-slate-200 text-slate-700 ${choice.color}`
                                                }`}
                                            >
                                                <span>{choice.kondisi}</span>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                    isSelected ? 'border-transparent bg-slate-800 text-white' : 'border-slate-300'
                                                }`}>
                                                    {isSelected && (
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stepper Navigation Actions */}
                            <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={activeIndex === 0}
                                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-100 transition text-sm font-semibold flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Sebelumnya
                                </button>

                                {activeIndex === GEJALA_LIST.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-orange-550 text-white font-extrabold shadow-lg shadow-orange-500/20 hover:scale-105 transition text-sm flex items-center gap-2"
                                    >
                                        Kirim Hasil
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={currentSelectedValue === undefined}
                                        className="px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:hover:bg-slate-50 transition text-sm font-semibold flex items-center gap-2"
                                    >
                                        Berikutnya
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/20 lg:col-span-4 w-full">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Navigasi Soal</h3>
                            
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
                                                    ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/10 scale-105' 
                                                    : isAnswered
                                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                                                        : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-350'
                                            }`}
                                        >
                                            {item.kode_gejala.replace('G', '')}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 text-xs space-y-3">
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <div className="w-3.5 h-3.5 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-[8px]">01</div>
                                    <span>Aktif sekarang</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <div className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-[8px]">&bull;</div>
                                    <span>Sudah dijawab</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <div className="w-3.5 h-3.5 rounded bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-[8px]">&bull;</div>
                                    <span>Belum dijawab</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Disclaimer */}
                <footer className="py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 px-6">
                    Disclaimer: Kuesioner ini dirancang untuk mendeteksi dini gejala depresi mahasiswa akhir. Hasil dari sistem pakar ini bukan pengganti diagnosis medis resmi.
                </footer>
            </div>
        </>
    );
}
