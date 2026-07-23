import React from "react";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
  return (
    <div className="relative min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Left Side: Form Container */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 sm:px-12 lg:px-20 z-10">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Logo & Name */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/30 group-hover:scale-105 transition">
                <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Diabe<span className="text-teal-600 dark:text-teal-400">CF</span>
              </span>
            </Link>
          </div>

          {/* Form Card Container */}
          <div className="w-full bg-white dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side: Creative Banner */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-tr from-teal-900 via-teal-700 to-cyan-800 items-center justify-center overflow-hidden">
        {/* Decorative glowing blobs */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400/20 rounded-full blur-3xl"></div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-md text-center px-8 text-white flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-8 shadow-2xl">
            <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-wide mb-4">
            Sistem Pakar Diagnosa Diabetes Melitus
          </h2>
          <p className="text-teal-100 text-sm sm:text-base font-medium leading-relaxed">
            Membantu deteksi risiko Diabetes Melitus Tipe 1 dan Tipe 2 secara mandiri menggunakan metode Certainty Factor (CF) secara cepat dan akurat.
          </p>
        </div>
      </div>
    </div>
  );
}
