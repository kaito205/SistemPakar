import React, { useEffect, useState } from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { ThemeProvider } from "@/Components/context/ThemeContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { usePage } from "@inertiajs/react";

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { flash } = usePage<any>().props;

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      setToast({ type: "success", message: flash.success });
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    } else if (flash?.error) {
      setToast({ type: "error", message: flash.error });
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="min-h-screen xl:flex bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6 relative">
          {children}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div
          style={{ zIndex: 9999 }}
          className={`fixed top-6 right-6 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-500 transform ${
            visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
          } ${
            toast.type === "success"
              ? "bg-emerald-50/90 border-emerald-100 dark:bg-emerald-950/90 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50/90 border-rose-100 dark:bg-rose-950/90 dark:border-rose-800 text-rose-800 dark:text-rose-350"
          }`}
        >
          {toast.type === "success" ? (
            <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          ) : (
            <span className="p-1.5 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60">
              {toast.type === "success" ? "Berhasil" : "Gagal"}
            </span>
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
          <button onClick={() => setVisible(false)} className="ml-4 hover:opacity-75 focus:outline-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
