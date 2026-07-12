import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

function TeamMemberCard({ name, role, bio, initials, imagePath, socials }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition duration-300 group flex flex-col justify-between min-h-[380px]">
            <div>
                {/* Photo or Initials Wrapper */}
                <div className="relative mb-6">
                    {!imgError && imagePath ? (
                        <img 
                            src={imagePath} 
                            alt={name} 
                            onError={() => setImgError(true)}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-md group-hover:scale-105 transition duration-300"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-600 flex items-center justify-center text-lg font-bold group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition duration-300">
                            {initials}
                        </div>
                    )}
                </div>

                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">{role}</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{name}</h4>
                <p className="text-slate-550 text-xs leading-relaxed mb-6">{bio}</p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100/60">
                {socials.instagram && (
                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition duration-200" title="Instagram">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                )}
                {socials.github && (
                    <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition duration-200" title="GitHub">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                )}
                {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition duration-200" title="LinkedIn">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Welcome({ auth }) {
    // Typewriter effect state
    const words = ['diagnosa', 'solusi', 'atasi'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Carousel state
    const quotes = [
        "DepresiCheck adalah situs yang membantu mahasiswa akhir mengukur tingkat depresi mereka dengan mengisi formulir pertanyaan. Kami percaya bahwa mengetahui tingkat depresi Anda adalah langkah pertama dalam menemukan solusi dan menangani masalah ini.",
        "Ingatlah bahwa DepresiCheck bukanlah pengganti layanan profesional, jadi pastikan untuk selalu mencari bantuan medis yang tepat jika Anda mengalami gejala depresi.",
        "Kami membuat DepresiCheck sebagai proyek akhir untuk membantu teman-teman kami yang mungkin mengalami depresi untuk mengetahui tingkat depresi mereka dan menemukan solusi sesuai."
    ];
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    // FAQ state
    const faqData = [
        {
            question: "Apa itu DepresiCheck?",
            answer: "DepresiCheck adalah sebuah situs yang membantu mahasiswa akhir mengukur tingkat depresi mereka dengan mengisi formulir pertanyaan. Kami menyediakan estimasi tingkat depresi dan saran solusi yang sesuai setelah pengisian."
        },
        {
            question: "Siapa yang bisa mengakses DepresiCheck?",
            answer: "DepresiCheck ditujukan terutama untuk mahasiswa tingkat akhir yang rentan stres akademis, namun siapa saja dapat mengakses situs ini secara gratis dan bebas untuk mengenali gejalanya lebih dini."
        },
        {
            question: "Apakah hasil dari DepresiCheck dapat diandalkan?",
            answer: "Hasil dari DepresiCheck berupa estimasi tingkat depresi menggunakan metode Certainty Factor dan bukan diagnosis klinis mutlak. Kami menyarankan Anda berkonsultasi dengan psikolog atau psikiater profesional jika mengalami gejala yang berkepanjangan."
        },
        {
            question: "Bagaimana cara mengakses solusi yang ditawarkan?",
            answer: "Setelah menyelesaikan pengisian 29 butir kuesioner gejala, sistem akan memproses persentase keyakinan depresi Anda beserta rekomendasi artikel penanganan yang sesuai di halaman hasil."
        }
    ];
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    
    // Dropdown state for Menu
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

    // Typewriter effect logic
    useEffect(() => {
        const handleType = () => {
            const currentWord = words[currentWordIndex];
            if (!isDeleting) {
                setDisplayedText(currentWord.substring(0, displayedText.length + 1));
                setTypingSpeed(100);

                if (displayedText === currentWord) {
                    setIsDeleting(true);
                    setTypingSpeed(2000); // pause before starting to delete
                }
            } else {
                setDisplayedText(currentWord.substring(0, displayedText.length - 1));
                setTypingSpeed(50);

                if (displayedText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIndex, typingSpeed]);

    // Auto rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="DepresiCheck - Kenali Tingkat Depresimu" />
            
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white scroll-smooth relative">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm shadow-slate-100/40">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/" className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/10">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.04 9.04 0 017 14.12v-3.108l2.22 1.055a3 3 0 002.56 0l2.22-1.055v3.108a9.04 9.04 0 01-2.3 2.453 1 1 0 01-1.4 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black tracking-widest text-slate-800 uppercase leading-none">
                                            DIAGNOSA
                                        </span>
                                        <span className="text-[10px] font-bold text-orange-600 tracking-wider uppercase mt-1 leading-none">
                                            TINGKAT DEPRESI MAHASISWA
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Nav Links */}
                            <div className="hidden md:flex items-center space-x-10">
                                {auth.user ? (
                                    <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">
                                        Dashboard
                                    </Link>
                                ) : null}
                                
                                {/* Dropdown Menu */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                                        onMouseEnter={() => setMenuDropdownOpen(true)}
                                        className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition flex items-center gap-1.5 focus:outline-none"
                                    >
                                        <span>Menu</span>
                                        <svg className={`w-4 h-4 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180 text-orange-550' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {menuDropdownOpen && (
                                        <div 
                                            onMouseLeave={() => setMenuDropdownOpen(false)}
                                            className="absolute left-0 mt-3 w-48 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl shadow-slate-200/50 animate-fadeIn"
                                        >
                                            <Link href="/diagnosa" className="block px-4 py-3 text-sm text-slate-700 hover:text-orange-600 hover:bg-slate-50 rounded-xl transition font-medium">
                                                Mulai Diagnosa
                                            </Link>
                                            <a href="#about" className="block px-4 py-3 text-sm text-slate-700 hover:text-orange-600 hover:bg-slate-50 rounded-xl transition font-medium">
                                                Daftar Gejala
                                            </a>
                                            <a href="#faq" className="block px-4 py-3 text-sm text-slate-700 hover:text-orange-600 hover:bg-slate-50 rounded-xl transition font-medium">
                                                Tingkat Depresi
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">Artikel</a>
                                <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">FAQ</a>
                                <a href="#footer" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">Kontak</a>
                            </div>

                            {/* Login Button */}
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition text-sm font-bold">
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link href="/login" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-605 text-white font-extrabold shadow-lg shadow-orange-500/20 transition text-sm">
                                        Login Admin
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-between relative overflow-hidden bg-white px-6 sm:px-12 lg:px-24">
                    {/* Background Soft Glow Orbs */}
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/[0.03] rounded-full blur-[120px] -z-10 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-24 pb-12">
                        
                        {/* Left Side: Headline and Typewriter Outline Text */}
                        <div className="lg:col-span-6 flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-orange-600 mb-6 font-semibold">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Sistem Pakar Certainty Factor
                            </div>
                            
                            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Cek Tingkat <span className="text-orange-500">Depresimu</span> Sekarang!
                            </h1>
                            
                            {/* Giant Outline Typewriter Text - Styled for light background */}
                            <div className="h-32 sm:h-44 mt-4 flex items-center">
                                <span className="text-transparent font-black uppercase tracking-wider text-6xl sm:text-8xl md:text-9xl [-webkit-text-stroke:2px_theme(colors.slate.300)] bg-clip-text select-none">
                                    {displayedText}
                                    <span className="text-orange-500 [-webkit-text-stroke:0px] font-light animate-ping">|</span>
                                </span>
                            </div>
                            
                            <p className="text-slate-500 max-w-lg mb-8 leading-relaxed text-sm sm:text-base -mt-2">
                                Lakukan screening tingkat kecemasan dan gejala depresi secara mandiri menggunakan metode Certainty Factor yang tervalidasi.
                            </p>

                            <Link href="/diagnosa" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-orange-500 text-white font-black text-lg shadow-xl shadow-orange-500/20 hover:scale-105 transition duration-300 flex items-center gap-2 group">
                                Isi form
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Right Side: Circular Frame and 3D Illustration */}
                        <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
                            <div className="relative w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-2xl shadow-slate-200/50 flex items-center justify-center overflow-visible group">
                                
                                <div className="absolute -inset-4 rounded-full border border-orange-500/[0.05] scale-95 group-hover:scale-105 transition-all duration-700 -z-10"></div>
                                <div className="absolute -inset-12 rounded-full border border-slate-100 scale-95 -z-20"></div>

                                {/* Floating badges */}
                                <div className="absolute top-8 left-8 bg-white/95 border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-xl shadow-slate-200/30 flex items-center gap-2 animate-bounce">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold">✓</div>
                                    <span className="text-[11px] font-bold text-slate-700">Validasi Pakar</span>
                                </div>
                                <div className="absolute bottom-16 right-4 bg-white/95 border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-xl shadow-slate-200/30 flex items-center gap-2 animate-bounce" style={{ animationDelay: '1.5s' }}>
                                    <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 text-xs font-bold">♥</div>
                                    <span className="text-[11px] font-bold text-slate-700">Kesehatan Mental</span>
                                </div>

                                {/* 3D Mindfulness Illustration */}
                                <img 
                                    src="/mindfulness.png" 
                                    alt="Mental Health 3D Illustration" 
                                    className="w-72 h-72 sm:w-[400px] sm:h-[400px] object-contain relative z-10 drop-shadow-xl animate-float"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Far Right Vertical Scroll Text */}
                    <div className="absolute right-6 bottom-24 hidden lg:flex flex-col items-center gap-4 z-20">
                        <a href="#about" className="writing-mode-vertical text-xs font-bold text-orange-600 hover:text-orange-500 transition tracking-widest uppercase flex items-center gap-3">
                            <span>ke bawah</span>
                            <span className="w-0.5 h-16 bg-slate-200 relative overflow-hidden">
                                <span className="absolute top-0 left-0 w-full h-1/2 bg-orange-500 animate-scrollDown"></span>
                            </span>
                        </a>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-28 bg-slate-50 border-t border-slate-200/60">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3">Tentang Aplikasi</h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-12">Kenali Kondisi Emosional Sejak Dini</h3>
                        
                        <div className="relative min-h-[220px] sm:min-h-[180px] bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-200/20 flex items-center justify-center">
                            <div className="absolute -top-6 left-12 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-3xl font-serif">
                                “
                            </div>
                            
                            <div className="transition-all duration-500">
                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic mb-6">
                                    "{quotes[currentQuoteIndex]}"
                                </p>
                                <div className="text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                                    <span>Mental Health America</span>
                                    <span className="text-slate-300">&bull;</span>
                                    <span>Certainty Factor</span>
                                </div>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex justify-center gap-2 mt-6">
                            {quotes.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuoteIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        idx === currentQuoteIndex ? 'bg-orange-500 w-8' : 'bg-slate-350 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Members Section */}
                <section id="team" className="py-28 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3">Kolaborasi Tim</h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Project Akhir Sistem Pakar</h3>
                            <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm sm:text-base">
                                Dikembangkan dengan penuh kepedulian oleh Kelompok X untuk mendukung kesehatan mental mahasiswa akhir.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <TeamMemberCard 
                                name="Ikmal Nurhamdi"
                                role="Ketua Kelompok"
                                bio="Memimpin koordinasi tim, analisis sistem pakar, pengumpulan rules Certainty Factor dan penulisan deskripsi sistem."
                                initials="IN"
                                imagePath="/img/ikmal.png"
                                socials={{
                                    instagram: "https://instagram.com/",
                                    github: "https://github.com/",
                                    linkedin: "https://linkedin.com/"
                                }}
                            />
                            <TeamMemberCard 
                                name="Muhammad Jaja Maulana"
                                role="Frontend Developer"
                                bio="Mewujudkan arsitektur kode React, integrasi Inertia, desain UI/UX bertema terang yang premium, serta transisi animasi kustom."
                                initials="MM"
                                imagePath="/img/jaja.png"
                                socials={{
                                    instagram: "https://instagram.com/",
                                    github: "https://github.com/",
                                    linkedin: "https://linkedin.com/"
                                }}
                            />
                            <TeamMemberCard 
                                name="Fauzi Gilang Raihan"
                                role="Backend Developer"
                                bio="Merancang struktur database, penanganan data diagnosis, skema kompilasi, serta penyusunan logika controller backend."
                                initials="FG"
                                imagePath="/img/gilang.png"
                                socials={{
                                    instagram: "https://instagram.com/",
                                    github: "https://github.com/",
                                    linkedin: "https://linkedin.com/"
                                }}
                            />
                            <TeamMemberCard 
                                name="Ikhwan Gifari"
                                role="Data Analis (Pakar)"
                                bio="Mencari data ahli/pakar, menganalisis gejala depresi mahasiswa, merumuskan nilai keyakinan Certainty Factor (MB & MD)."
                                initials="IG"
                                imagePath="/img/ikhwan.png"
                                socials={{
                                    instagram: "https://instagram.com/",
                                    github: "https://github.com/",
                                    linkedin: "https://linkedin.com/"
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-28 bg-slate-50 border-t border-slate-200/60">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3">Pusat Informasi</h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-4">
                            {faqData.map((item, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-100/55 transition">
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 text-base sm:text-lg focus:outline-none hover:bg-slate-50 transition"
                                    >
                                        <span>{item.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                                                openFaqIndex === idx ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {openFaqIndex === idx && (
                                        <div className="px-6 pb-6 text-slate-500 border-t border-slate-100 pt-4 leading-relaxed text-sm sm:text-base">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer id="footer" className="bg-slate-900 text-slate-200 border-t border-slate-850 py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.04 9.04 0 017 14.12v-3.108l2.22 1.055a3 3 0 002.56 0l2.22-1.055v3.108a9.04 9.04 0 01-2.3 2.453 1 1 0 01-1.4 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-base font-extrabold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                    DepresiCheck
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-8 justify-center text-sm text-slate-400">
                                <a href="#about" className="hover:text-orange-400 transition">Tentang</a>
                                <Link href="/diagnosa" className="hover:text-orange-400 transition">Mulai Cek</Link>
                                <a href="#team" className="hover:text-orange-400 transition">Tim</a>
                                <a href="#faq" className="hover:text-orange-400 transition">FAQ</a>
                            </div>

                            <p className="text-sm text-slate-500">
                                &copy; {new Date().getFullYear()} Kelompok X Sistem Pakar. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
