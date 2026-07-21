import React, { useState } from "react";
import AppLayout from "@/Layouts/admin/AppLayout";
import { Head, router } from "@inertiajs/react";

export default function Tim({ team = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  
  // Form states
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [currentBio, setCurrentBio] = useState("");
  const [currentInitials, setCurrentInitials] = useState("");
  const [currentImagePath, setCurrentImagePath] = useState("");
  const [currentInstagram, setCurrentInstagram] = useState("");
  const [currentGithub, setCurrentGithub] = useState("");
  const [currentLinkedin, setCurrentLinkedin] = useState("");

  const openAddModal = () => {
    setModalMode("add");
    setCurrentId(null);
    setCurrentName("");
    setCurrentRole("");
    setCurrentBio("");
    setCurrentInitials("");
    setCurrentImagePath("");
    setCurrentInstagram("");
    setCurrentGithub("");
    setCurrentLinkedin("");
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setModalMode("edit");
    setCurrentId(member.id);
    setCurrentName(member.name);
    setCurrentRole(member.role);
    setCurrentBio(member.bio);
    setCurrentInitials(member.initials);
    setCurrentImagePath(member.imagePath || "");
    setCurrentInstagram(member.socials?.instagram || "");
    setCurrentGithub(member.socials?.github || "");
    setCurrentLinkedin(member.socials?.linkedin || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: currentName,
      role: currentRole,
      bio: currentBio,
      initials: currentInitials,
      imagePath: currentImagePath || null,
      instagram: currentInstagram || null,
      github: currentGithub || null,
      linkedin: currentLinkedin || null,
    };

    if (modalMode === "add") {
      router.post("/admin/tim", payload, {
        onSuccess: () => closeModal()
      });
    } else {
      router.put(`/admin/tim/${currentId}`, payload, {
        onSuccess: () => closeModal()
      });
    }
  };

  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    router.delete(`/admin/tim/${deleteId}`, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        setDeleteName("");
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Kelola Anggota Tim - Admin Panel" />

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Kelola Anggota Tim</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manajemen anggota kolaborasi tim pengembang proyek akhir sistem pakar.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Anggota
        </button>
      </div>

      {/* Team Members Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs uppercase text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold w-[80px]">Inisial</th>
                <th scope="col" className="px-6 py-4 font-bold w-[220px]">Nama</th>
                <th scope="col" className="px-6 py-4 font-bold w-[180px]">Peran</th>
                <th scope="col" className="px-6 py-4 font-bold">Bio</th>
                <th scope="col" className="px-6 py-4 font-bold w-[200px]">Sosial Media</th>
                <th scope="col" className="px-6 py-4 font-bold text-right w-[150px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">
                    {member.initials}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {member.imagePath ? (
                        <img src={member.imagePath} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center font-bold text-xs text-slate-500 dark:text-slate-400">
                          {member.initials}
                        </div>
                      )}
                      <span className="font-bold text-slate-800 dark:text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 text-xs sm:text-sm max-w-[280px] whitespace-normal break-words">
                    {member.bio}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {member.socials?.instagram && (
                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-teal-500/10 text-slate-650 hover:text-teal-600 text-xs font-semibold">Insta</a>
                      )}
                      {member.socials?.github && (
                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-teal-500/10 text-slate-650 hover:text-teal-600 text-xs font-semibold">Git</a>
                      )}
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-teal-500/10 text-slate-650 hover:text-teal-600 text-xs font-semibold">In</a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openEditModal(member)}
                        className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.name)}
                        className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-350 font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TAMBAH / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-4">
              {modalMode === "add" ? "Tambah Anggota Tim" : "Edit Anggota Tim"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="Contoh: Ikmal Nurhamdi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                />
              </div>

              {/* Initials & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inisial</label>
                  <input
                    type="text"
                    required
                    value={currentInitials}
                    onChange={(e) => setCurrentInitials(e.target.value)}
                    placeholder="Contoh: IN"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Peran (Role)</label>
                  <input
                    type="text"
                    required
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="Contoh: Frontend Developer"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bio Deskripsi</label>
                <textarea
                  required
                  rows={3}
                  value={currentBio}
                  onChange={(e) => setCurrentBio(e.target.value)}
                  placeholder="Jelaskan peran tugas pengerjaan secara detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none resize-none"
                />
              </div>

              {/* Image Path */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Path Gambar (Image Path)</label>
                <input
                  type="text"
                  value={currentImagePath}
                  onChange={(e) => setCurrentImagePath(e.target.value)}
                  placeholder="Contoh: /img/ikmal.jpeg"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                />
              </div>

              {/* Social Media Links */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sosial Media</label>
                <div>
                  <input
                    type="url"
                    value={currentInstagram}
                    onChange={(e) => setCurrentInstagram(e.target.value)}
                    placeholder="Link Instagram (https://instagram.com/...)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <input
                    type="url"
                    value={currentGithub}
                    onChange={(e) => setCurrentGithub(e.target.value)}
                    placeholder="Link GitHub (https://github.com/...)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <input
                    type="url"
                    value={currentLinkedin}
                    onChange={(e) => setCurrentLinkedin(e.target.value)}
                    placeholder="Link LinkedIn (https://linkedin.com/...)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors focus:outline-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors focus:outline-none"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="p-3 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white">Konfirmasi Hapus</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus <span className="font-extrabold text-slate-850 dark:text-white">"{deleteName}"</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
