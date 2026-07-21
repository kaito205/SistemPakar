import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

function TeamMemberCard({ name, role, bio, initials, imagePath, socials }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden border border-slate-200/60 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:shadow-slate-950/40 group cursor-pointer">
            {/* Full Photo Background */}
            {!imgError && imagePath ? (
                <img
                    src={imagePath}
                    alt={name}
                    onError={() => setImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <span className="text-slate-350 dark:text-slate-600 font-black text-5xl tracking-widest group-hover:text-teal-500/25 transition duration-500">
                        {initials}
                    </span>
                </div>
            )}

            {/* Dark Gradient Overlay - Fades in on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            {/* Hover Reveal Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                {/* Role Chip */}
                <span className="self-start px-2.5 py-0.5 rounded bg-teal-600 text-[8px] font-black tracking-widest text-white uppercase mb-2.5">
                    {role}
                </span>

                {/* Name */}
                <h4 className="text-base font-black text-white mb-2">{name}</h4>

                {/* Bio Description */}
                <p className="text-slate-200 text-[11px] leading-relaxed font-medium mb-4">
                    {bio}
                </p>

                {/* Social media links */}
                <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/10">
                    {socials.instagram && (
                        <a
                            href={socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7.5 h-7.5 rounded-full bg-white/15 hover:bg-teal-500 border border-white/5 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                            title="Instagram"
                        >
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    )}
                    {socials.github && (
                        <a
                            href={socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7.5 h-7.5 rounded-full bg-white/15 hover:bg-teal-500 border border-white/5 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                            title="GitHub"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                    {socials.linkedin && (
                        <a
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7.5 h-7.5 rounded-full bg-white/15 hover:bg-teal-500 border border-white/5 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                            title="LinkedIn"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Welcome({
    auth,
    dbSymptoms = [],
    levelRules = { M1: "D2, D13", M2: "10 Gejala (D1, D3...)", M3: "D4, D7, D9" },
    teamMembers = []
}) {
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

    // Typewriter effect state
    const words = ["diagnosa", "solusi", "atasi"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Carousel state
    const quotes = [
        "DepresiCheck adalah situs yang membantu mahasiswa akhir mengukur tingkat depresi mereka dengan mengisi formulir pertanyaan. Kami percaya bahwa mengetahui tingkat depresi Anda adalah langkah pertama dalam menemukan solusi dan menangani masalah ini.",
        "Ingatlah bahwa DepresiCheck bukanlah pengganti layanan profesional, jadi pastikan untuk selalu mencari bantuan medis yang tepat jika Anda mengalami gejala depresi.",
        "Kami membuat DepresiCheck sebagai proyek akhir untuk membantu teman-teman kami yang mungkin mengalami depresi untuk mengetahui tingkat depresi mereka dan menemukan solusi sesuai.",
    ];
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    // FAQ state
    const faqData = [
        {
            question: "Apa itu DepresiCheck?",
            answer: "DepresiCheck adalah sebuah situs yang membantu mahasiswa akhir mengukur tingkat depresi mereka dengan mengisi formulir pertanyaan. Kami menyediakan estimasi tingkat depresi dan saran solusi yang sesuai setelah pengisian.",
        },
        {
            question: "Siapa yang bisa mengakses DepresiCheck?",
            answer: "DepresiCheck ditujukan terutama untuk mahasiswa tingkat akhir yang rentan stres akademis, namun siapa saja dapat mengakses situs ini secara gratis dan bebas untuk mengenali gejalanya lebih dini.",
        },
        {
            question: "Apakah hasil dari DepresiCheck dapat diandalkan?",
            answer: "Hasil dari DepresiCheck berupa estimasi tingkat depresi menggunakan metode Certainty Factor dan bukan diagnosis klinis mutlak. Kami menyarankan Anda berkonsultasi dengan psikolog atau psikiater profesional jika mengalami gejala yang berkepanjangan.",
        },
        {
            question: "Bagaimana cara mengakses solusi yang ditawarkan?",
            answer: "Setelah menyelesaikan pengisian 29 butir kuesioner gejala, sistem akan memproses persentase keyakinan depresi Anda beserta rekomendasi artikel penanganan yang sesuai di halaman hasil.",
        },
    ];
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    // Dropdown state for Menu
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Contact Form state
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [contactSubmitted, setContactSubmitted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactSubmitted(true);
        setContactForm({ name: "", email: "", message: "" });
        setTimeout(() => setContactSubmitted(false), 5000);
    };

    // Typewriter effect logic
    useEffect(() => {
        const handleType = () => {
            const currentWord = words[currentWordIndex];
            if (!isDeleting) {
                setDisplayedText(
                    currentWord.substring(0, displayedText.length + 1),
                );
                setTypingSpeed(100);

                if (displayedText === currentWord) {
                    setIsDeleting(true);
                    setTypingSpeed(2000); // pause before starting to delete
                }
            } else {
                setDisplayedText(
                    currentWord.substring(0, displayedText.length - 1),
                );
                setTypingSpeed(50);

                if (displayedText === "") {
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

            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white scroll-smooth relative dark:bg-slate-950 dark:text-slate-200">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 border-b border-slate-200/60 shadow-sm shadow-slate-100/40 backdrop-blur-lg dark:bg-slate-950/80 dark:border-slate-800/80 dark:shadow-slate-900/40">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src="/img/logo.png?v=2"
                                        alt="DepresiCheck Logo"
                                        className="w-9 h-9 object-contain animate-entrance-scale"
                                    />
                                    <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                        DepresiCheck
                                    </span>
                                </Link>
                            </div>

                            {/* Nav Links */}
                            <div className="hidden md:flex items-center space-x-8">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="text-sm font-semibold text-slate-600 hover:text-teal-650 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : null}

                                <a
                                    href="#about"
                                    className="text-sm font-semibold text-slate-600 hover:text-teal-655 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                >
                                    Tentang
                                </a>
                                <a
                                    href="#gejala"
                                    className="text-sm font-semibold text-slate-600 hover:text-teal-655 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                >
                                    Daftar Gejala
                                </a>
                                <a
                                    href="#tingkat"
                                    className="text-sm font-semibold text-slate-600 hover:text-teal-655 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                >
                                    Tingkat Depresi
                                </a>
                                <a
                                    href="#faq"
                                    className="text-sm font-semibold text-slate-600 hover:text-teal-655 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                >
                                    FAQ
                                </a>
                                <a
                                    href="#kontak"
                                    className="text-sm font-semibold text-slate-600 hover:text-teal-655 dark:text-slate-300 dark:hover:text-teal-400 transition"
                                >
                                    Kontak
                                </a>
                            </div>

                            {/* Action Button & Dark Mode Toggle */}
                            <div className="flex items-center gap-3">
                                {/* Dark Mode Toggle */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition focus:outline-none"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? (
                                        // Sun Icon
                                        <svg
                                            className="w-5 h-5 text-teal-400"
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
                                        // Moon Icon
                                        <svg
                                            className="w-5 h-5 text-slate-600"
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

                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 transition text-sm font-bold"
                                    >
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link
                                        href="/diagnosa"
                                        className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-lg shadow-teal-500/20 transition text-sm"
                                    >
                                        Mulai Cek
                                    </Link>
                                )}

                                {/* Mobile Hamburger Toggle */}
                                <button
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition focus:outline-none md:hidden"
                                    aria-label="Toggle Mobile Menu"
                                >
                                    {mobileMenuOpen ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed top-20 left-0 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/60 dark:border-slate-800/80 shadow-lg backdrop-blur-lg z-50 py-6 px-6 flex flex-col gap-4 animate-fadeIn">
                        {auth.user && (
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-bold text-slate-850 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900"
                            >
                                Dashboard Admin
                            </Link>
                        )}
                        <a
                            href="#about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold text-slate-650 dark:text-slate-350 py-2 border-b border-slate-100 dark:border-slate-900"
                        >
                            Tentang
                        </a>
                        <a
                            href="#gejala"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold text-slate-650 dark:text-slate-350 py-2 border-b border-slate-100 dark:border-slate-900"
                        >
                            Daftar Gejala
                        </a>
                        <a
                            href="#tingkat"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold text-slate-650 dark:text-slate-350 py-2 border-b border-slate-100 dark:border-slate-900"
                        >
                            Tingkat Depresi
                        </a>
                        <a
                            href="#faq"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold text-slate-650 dark:text-slate-350 py-2 border-b border-slate-100 dark:border-slate-900"
                        >
                            FAQ
                        </a>
                        <a
                            href="#kontak"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold text-slate-655 dark:text-slate-350 py-2 border-b border-slate-100 dark:border-slate-900"
                        >
                            Kontak
                        </a>
                        <Link
                            href="/diagnosa"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold shadow-md shadow-teal-500/20 text-sm mt-2 block"
                        >
                            Mulai Cek Sekarang
                        </Link>
                    </div>
                )}

                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-between relative overflow-hidden bg-white dark:bg-slate-950 px-6 sm:px-12 lg:px-24">
                    {/* Background Soft Glow Orbs */}
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[120px] z-0 animate-pulse"></div>
                    <div
                        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[140px] z-0 animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>

                    {/* Corner Leaf Decorations (From Mockup) with Entrance Animations */}
                    {/* Top Left Leaf */}
                    <div className="absolute top-0 left-0 z-0 pointer-events-none animate-entrance-down">
                        <img
                            src="/img/leaf.png"
                            alt=""
                            className="w-40 sm:w-60 md:w-80 object-contain opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.32]"
                        />
                    </div>
                    {/* Top Right Leaf */}
                    <div className="absolute top-0 right-0 z-0 pointer-events-none animate-entrance-down">
                        <img
                            src="/img/leaf.png"
                            alt=""
                            className="w-40 sm:w-60 md:w-80 object-contain opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.32] scale-x-[-1] origin-top-right"
                        />
                    </div>
                    {/* Bottom Left Leaf */}
                    <div className="absolute bottom-0 left-0 z-0 pointer-events-none animate-entrance-up">
                        <img
                            src="/img/leaf.png"
                            alt=""
                            className="w-40 sm:w-60 md:w-80 object-contain opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.32] scale-y-[-1] origin-bottom-left"
                        />
                    </div>
                    {/* Bottom Right Leaf */}
                    <div className="absolute bottom-0 right-0 z-0 pointer-events-none animate-entrance-up">
                        <img
                            src="/img/leaf.png"
                            alt=""
                            className="w-40 sm:w-60 md:w-80 object-contain opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.32] scale-x-[-1] scale-y-[-1] origin-bottom-right"
                        />
                    </div>

                    {/* Subtle Decorative Background Rings and Dots (From Left to Right) */}
                    {/* Far Left: Medium Thin Ring */}
                    <div className="absolute top-24 left-10 w-48 h-48 rounded-full border border-teal-500/15 animate-float-badge-1 z-0 pointer-events-none"></div>
                    {/* Mid Left: Large Dashed Ring */}
                    <div
                        className="absolute bottom-36 left-16 w-80 h-80 rounded-full border border-dashed border-teal-500/10 animate-spin-slow z-0 pointer-events-none"
                        style={{ animationDuration: "60s" }}
                    ></div>
                    {/* Center Top: Small Dotted Accent Ring */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border border-dashed border-teal-500/15 flex items-center justify-center animate-spin-slow z-0 pointer-events-none">
                        <div className="w-2 h-2 bg-teal-500/30 rounded-full"></div>
                    </div>
                    {/* Mid Right: Floating Small Ring */}
                    <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full border border-teal-500/15 animate-float-badge-2 z-0 pointer-events-none"></div>
                    {/* Far Right: Huge Dotted Ring */}
                    <div
                        className="absolute bottom-16 right-12 w-[440px] h-[440px] rounded-full border border-dashed border-teal-500/10 animate-spin-slow z-0 pointer-events-none"
                        style={{ animationDuration: "80s" }}
                    ></div>

                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-24 pb-12 relative z-10">
                        {/* Left Side: Headline and Typewriter Outline Text */}
                        <div className="lg:col-span-6 flex flex-col items-start text-left animate-entrance-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 dark:text-teal-400 text-xs sm:text-sm text-teal-600 mb-6 font-semibold">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                Sistem Pakar Certainty Factor
                            </div>

                            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                Cek Tingkat{" "}
                                <span className="text-teal-600">Depresimu</span>{" "}
                                Sekarang!
                            </h1>

                            {/* Giant Outline Typewriter Text - Styled for light background */}
                            <div className="h-32 sm:h-44 mt-4 flex items-center">
                                <span className="text-transparent font-black uppercase tracking-wider text-6xl sm:text-8xl md:text-9xl [-webkit-text-stroke:2px_theme(colors.teal.200)] dark:[-webkit-text-stroke:2.5px_rgba(20,184,166,0.15)] bg-clip-text select-none">
                                    {displayedText}
                                    <span className="text-teal-500 [-webkit-text-stroke:0px] font-light animate-ping">
                                        |
                                    </span>
                                </span>
                            </div>

                            <p className="text-slate-550 dark:text-slate-400 max-w-lg mb-8 leading-relaxed text-sm sm:text-base -mt-2">
                                Lakukan screening tingkat kecemasan dan gejala
                                depresi secara mandiri menggunakan metode
                                Certainty Factor yang tervalidasi.
                            </p>

                            <Link
                                href="/diagnosa"
                                className="px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-lg shadow-xl shadow-teal-500/20 hover:scale-105 transition duration-300 flex items-center gap-2 group"
                            >
                                Isi form
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* Right Side: Circular Frame and 3D Illustration */}
                        <div className="lg:col-span-6 flex justify-center lg:justify-end relative animate-entrance-right">
                            <div className="relative w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 border border-slate-200 shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/40 flex items-center justify-center overflow-visible group">
                                <div className="absolute -inset-4 rounded-full border border-teal-500/[0.05] scale-95 group-hover:scale-105 transition-all duration-700 -z-10"></div>
                                <div className="absolute -inset-12 rounded-full border border-slate-100 scale-95 -z-20"></div>

                                {/* Rotating Dashed Accent Ring */}
                                <div className="absolute inset-0 rounded-full border border-dashed border-teal-500/20 animate-spin-slow pointer-events-none"></div>
                                {/* Soft pulsing background blur glow */}
                                <div className="absolute inset-4 rounded-full bg-teal-500/[0.02] blur-xl animate-pulse -z-10 pointer-events-none"></div>

                                {/* Swirling fluid organic watercolor frames like mockup */}
                                <div className="absolute inset-0 rounded-[45%_55%_60%_40%] border-2 border-teal-500/10 animate-spin-slow pointer-events-none"></div>
                                <div className="absolute -inset-3 rounded-[60%_40%_50%_50%] border border-teal-500/10 animate-spin-counter pointer-events-none"></div>

                                {/* Floating badges */}
                                <div className="absolute top-8 left-8 bg-white/95 border border-slate-200/80 dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-slate-950/40 px-4 py-2.5 rounded-2xl shadow-xl shadow-slate-200/30 flex items-center gap-2 animate-float-badge-1">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold">
                                        ✓
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                        Validasi Pakar
                                    </span>
                                </div>
                                <div className="absolute bottom-16 right-4 bg-white/95 border border-slate-200/80 dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-slate-950/40 px-4 py-2.5 rounded-2xl shadow-xl shadow-slate-200/30 flex items-center gap-2 animate-float-badge-2">
                                    <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-650 text-xs font-bold">
                                        ♥
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                        Kesehatan Mental
                                    </span>
                                </div>

                                {/* 3D Mindfulness Illustration */}
                                <img
                                    src="/img/hero.png"
                                    alt="Mental Health 3D Illustration"
                                    className="w-72 h-72 sm:w-[400px] sm:h-[400px] object-contain relative z-10 drop-shadow-xl animate-float"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Far Right Vertical Scroll Text */}
                    <div className="absolute right-6 bottom-24 hidden lg:flex flex-col items-center gap-4 z-20">
                        <a
                            href="#about"
                            className="writing-mode-vertical text-xs font-bold text-teal-600 hover:text-teal-500 transition tracking-widest uppercase flex items-center gap-3"
                        >
                            <span>ke bawah</span>
                            <span className="w-0.5 h-16 bg-slate-200 relative overflow-hidden">
                                <span className="absolute top-0 left-0 w-full h-1/2 bg-teal-500 animate-scrollDown"></span>
                            </span>
                        </a>
                    </div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="py-28 bg-slate-50 border-t border-slate-200/60 dark:bg-slate-900 dark:border-slate-850"
                >
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-xs uppercase tracking-widest text-teal-600 font-bold mb-3">
                            Tentang Aplikasi
                        </h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-12">
                            Kenali Kondisi Emosional Sejak Dini
                        </h3>

                        <div className="relative min-h-[220px] sm:min-h-[180px] bg-white dark:bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex items-center justify-center">
                            <div className="absolute -top-6 left-12 w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 text-3xl font-serif">
                                “
                            </div>

                            <div className="transition-all duration-500">
                                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                                    "{quotes[currentQuoteIndex]}"
                                </p>
                                <div className="text-teal-605 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                                    <span>Mental Health America</span>
                                    <span className="text-slate-300 dark:text-slate-700">
                                        &bull;
                                    </span>
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
                                    className={`w-3 h-3 rounded-full transition-all ${idx === currentQuoteIndex
                                            ? "bg-teal-500 w-8"
                                            : "bg-slate-350 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Daftar Gejala Section */}
                <section
                    id="gejala"
                    className="py-28 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-850"
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-xs uppercase tracking-widest text-teal-605 font-bold mb-3">
                                Indikator Gejala
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                {dbSymptoms.length} Gejala Depresi yang Dievaluasi
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
                                Berikut adalah gejala-gejala berdasarkan rujukan
                                jurnal klinis yang dianalisis oleh sistem pakar
                                menggunakan pembobotan keyakinan Certainty
                                Factor.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dbSymptoms.map((g) => (
                                <div
                                    key={g.code}
                                    className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl hover:border-teal-500/30 dark:hover:border-teal-500/25 transition duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-650 dark:text-teal-400 text-xs font-mono font-bold">
                                            {g.code}
                                        </span>
                                        <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-teal-605 dark:group-hover:text-teal-400 transition-colors">
                                            {g.name}
                                        </h4>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {g.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tingkat Depresi Section */}
                <section
                    id="tingkat"
                    className="py-28 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-850"
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-xs uppercase tracking-widest text-teal-605 font-bold mb-3">
                                Kategori Diagnosis
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                Klasifikasi Tingkat Depresi
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
                                Hasil analisis dari sistem pakar
                                diklasifikasikan ke dalam 3 tingkat depresi
                                berdasarkan kompleksitas gejala dan dampak
                                klinisnya.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card M1 */}
                            <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/10 dark:shadow-none relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/[0.03] rounded-full blur-xl"></div>
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-150 dark:bg-slate-900 dark:text-teal-400 dark:border-slate-800 mb-6">
                                        M1 &bull; Depresi Ringan
                                    </div>
                                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                                        Mild / Minor Depression
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                        Ditandai dengan munculnya sekitar 2
                                        hingga 5 gejala ringan yang biasanya
                                        dipicu oleh kejadian penuh stres yang
                                        spesifik (stressor luar). Mood buruk
                                        cenderung datang dan pergi.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs font-mono text-slate-400">
                                    <span>Gejala Utama:</span>
                                    <span className="font-bold text-teal-600 dark:text-teal-400">
                                        {levelRules.M1}
                                    </span>
                                </div>
                            </div>

                            {/* Card M2 */}
                            <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/10 dark:shadow-none relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/[0.05] rounded-full blur-xl"></div>
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-850 border border-teal-200 dark:bg-slate-900 dark:text-teal-300 dark:border-slate-800 mb-6">
                                        M2 &bull; Depresi Sedang
                                    </div>
                                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                                        Moderate Depression
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                        Mood buruk berlangsung terus-menerus
                                        disertai adanya simtom fisik/organik.
                                        Perubahan gaya hidup mandiri biasanya
                                        belum cukup, dan disarankan melakukan
                                        konseling dengan ahli/konselor.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs font-mono text-slate-400">
                                    <span>Total Asosiasi:</span>
                                    <span className="font-bold text-teal-600 dark:text-teal-400">
                                        {levelRules.M2}
                                    </span>
                                </div>
                            </div>

                            {/* Card M3 */}
                            <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/10 dark:shadow-none relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.02] rounded-full blur-xl"></div>
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-slate-900 dark:text-rose-400 dark:border-slate-800 mb-6">
                                        M3 &bull; Depresi Berat
                                    </div>
                                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                                        Severe / Major Depression
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                        Tingkat depresi parah yang mengganggu
                                        fungsi vital dasar (sulit tidur, nafsu
                                        makan hilang, motivasi mati). Sangat
                                        krusial mendapatkan terapi medis atau
                                        psikologis secepatnya.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs font-mono text-slate-400">
                                    <span>Gejala Kunci:</span>
                                    <span className="font-bold text-rose-600 dark:text-rose-400">
                                        {levelRules.M3}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section
                    id="faq"
                    className="py-28 bg-slate-50 border-t border-slate-200/60 dark:bg-slate-900 dark:border-slate-850"
                >
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-xs uppercase tracking-widest text-teal-605 font-bold mb-3">
                                Pusat Informasi
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                Frequently Asked Questions
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {faqData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm shadow-slate-100/55 dark:shadow-none transition"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaqIndex(
                                                openFaqIndex === idx
                                                    ? null
                                                    : idx,
                                            )
                                        }
                                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 text-base sm:text-lg focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-900/40 transition"
                                    >
                                        <span>{item.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${openFaqIndex === idx
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {openFaqIndex === idx && (
                                        <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 leading-relaxed text-sm sm:text-base">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Members Section */}
                <section id="team" className="py-28 bg-white dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-xs uppercase tracking-widest text-teal-600 font-bold mb-3">
                                Kolaborasi Tim
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                Project Akhir Sistem Pakar
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
                                Dikembangkan dengan penuh kepedulian oleh
                                Kelompok X untuk mendukung kesehatan mental
                                mahasiswa akhir.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member) => (
                                <TeamMemberCard
                                    key={member.id}
                                    name={member.name}
                                    role={member.role}
                                    bio={member.bio}
                                    initials={member.initials}
                                    imagePath={member.imagePath}
                                    socials={member.socials}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Kontak Section */}
                <section
                    id="kontak"
                    className="py-28 bg-slate-50 border-t border-slate-200/60 dark:bg-slate-900 dark:border-slate-850"
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-xs uppercase tracking-widest text-teal-605 font-bold mb-3">
                                Hubungi Kami
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                Dapatkan Dukungan & Bantuan
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
                                Kami siap mendengarkan. Punya pertanyaan atau saran terkait sistem pakar kami? Hubungi tim pendukung kami melalui formulir di bawah.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Contact Form */}
                            <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-[32px] border border-slate-200/60 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:shadow-none">
                                <h4 className="text-xl font-bold text-slate-850 dark:text-white mb-6">
                                    Kirim Pesan Langsung
                                </h4>
                                {contactSubmitted ? (
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-805 dark:text-emerald-300 flex items-start gap-3 animate-fadeIn">
                                        <svg className="w-6 h-6 shrink-0 text-emerald-600 dark:text-emerald-455" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
                                            <p className="text-xs mt-1 leading-normal opacity-90">Terima kasih atas pesan Anda. Tim pendukung kami akan segera menghubungi Anda kembali.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleContactSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                required
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                placeholder="Masukkan nama lengkap Anda..."
                                                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-transparent text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:text-white transition duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Alamat Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                placeholder="Masukkan alamat email aktif..."
                                                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-transparent text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:text-white transition duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pesan Anda</label>
                                            <textarea
                                                required
                                                rows="5"
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                placeholder="Tuliskan pertanyaan atau kendala Anda di sini..."
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-transparent text-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-800 dark:text-white transition duration-200"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full h-12 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-sm shadow-lg shadow-teal-500/20 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Kirim Pesan
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Info Cards */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Card 1: Email */}
                                <div className="p-6 rounded-[24px] border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950 flex items-start gap-4">
                                    <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5 className="font-extrabold text-slate-850 dark:text-white text-base">E-mail Bantuan</h5>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-1">Layanan aduan & feedback sistem</p>
                                        <a href="mailto:support@depresicheck.com" className="text-teal-600 dark:text-teal-400 text-sm font-bold mt-2 inline-block hover:underline">
                                            support@depresicheck.com
                                        </a>
                                    </div>
                                </div>

                                {/* Card 2: Lokasi */}
                                <div className="p-6 rounded-[24px] border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950 flex items-start gap-4">
                                    <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5 className="font-extrabold text-slate-850 dark:text-white text-base">Lokasi Kampus</h5>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-1">STMIK Mardira Indonesia</p>
                                        <p className="text-slate-600 dark:text-slate-350 text-sm font-medium mt-2 leading-relaxed">
                                            Jl. Soekarno-Hatta No. 211, Leuwipanjang, Bojongloa Kidul, Kota Bandung, Jawa Barat 40233
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3: Waktu Pelayanan */}
                                <div className="p-6 rounded-[24px] border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950 flex items-start gap-4">
                                    <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5 className="font-extrabold text-slate-850 dark:text-white text-base">Waktu Pelayanan</h5>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-1">Jam operasional konsultasi/dukungan</p>
                                        <p className="text-slate-600 dark:text-slate-350 text-sm font-bold mt-2">
                                            Senin - Jumat: 09:00 - 17:00 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer
                    id="footer"
                    className="bg-slate-900 text-slate-200 border-t border-slate-850 dark:bg-slate-950 dark:border-slate-900 py-16 px-6"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/img/logo.png?v=2"
                                    alt="DepresiCheck Logo"
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="text-base font-extrabold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                    DepresiCheck
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-8 justify-center text-sm text-slate-400">
                                <a
                                    href="#about"
                                    className="hover:text-teal-400 transition"
                                >
                                    Tentang
                                </a>
                                <a
                                    href="#gejala"
                                    className="hover:text-teal-400 transition"
                                >
                                    Gejala
                                </a>
                                <a
                                    href="#tingkat"
                                    className="hover:text-teal-400 transition"
                                >
                                    Kategori
                                </a>
                                <Link
                                    href="/diagnosa"
                                    className="hover:text-teal-400 transition"
                                >
                                    Mulai Cek
                                </Link>
                                <a
                                    href="#team"
                                    className="hover:text-teal-400 transition"
                                >
                                    Tim
                                </a>
                                <a
                                    href="#faq"
                                    className="hover:text-teal-400 transition"
                                >
                                    FAQ
                                </a>
                                <a
                                    href="#kontak"
                                    className="hover:text-teal-400 transition"
                                >
                                    Kontak
                                </a>
                            </div>

                            <p className="text-sm text-slate-550 dark:text-slate-600">
                                &copy; {new Date().getFullYear()} Kelompok X
                                Sistem Pakar. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
