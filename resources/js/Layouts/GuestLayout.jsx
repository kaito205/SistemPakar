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
              <img
                src="/img/logo.png?v=2"
                alt="DepresiCheck Logo"
                className="w-12 h-12 object-contain group-hover:scale-105 transition"
              />
              <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300 bg-clip-text text-transparent">
                DepresiCheck
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
          <img
            src="/img/logo.png?v=2"
            alt="DepresiCheck Logo"
            className="w-24 h-24 object-contain brightness-0 invert mb-8 animate-bounce-slow"
            style={{
              animation: "bounce 4s ease-in-out infinite",
            }}
          />
          <h2 className="text-3xl font-extrabold tracking-wide mb-4">
            Sistem Pakar Diagnosa Depresi
          </h2>
          <p className="text-teal-150 text-sm sm:text-base font-medium leading-relaxed">
            Mendukung kesehatan mental mahasiswa tingkat akhir melalui evaluasi
            klinis mandiri menggunakan metode Certainty Factor (CF) secara cepat
            dan akurat.
          </p>
        </div>
      </div>
    </div>
  );
}
