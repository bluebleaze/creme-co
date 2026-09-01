"use client";
import React from 'react';
import { X, Sparkles, FolderSync, PlusCircle, ArrowRight } from 'lucide-react';
import { TodoTask } from '../types';

interface SimulateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulate: (taskData: Omit<TodoTask, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => void;
}

const PRESET_CLASSROOM_ASSIGNMENTS = [
  {
    courseName: 'Algoritma & Struktur Data (TI-2B)',
    title: 'Tugas Praktikum 5: Implementasi Binary Search Tree & Graph BFS/DFS',
    description: 'Implementasikan struktur data pohon biner pencarian (Binary Search Tree) dengan operasi insert, search, delete, serta penelusuran graf Breadth-First Search (BFS) dan Depth-First Search (DFS) menggunakan bahasa C++ atau Python. Buat analisis kompleksitas waktu Big-O.',
    dueDateStr: 'Besok, 23:59 WIB',
    dueTimestamp: Date.now() + 30 * 3600 * 1000,
    points: 100,
    priority: 'high' as const,
    syncSource: 'classroom' as const,
    classroomLink: 'https://classroom.google.com',
  },
  {
    courseName: 'Jaringan Komputer & Cyber Security',
    title: 'Analisis Paket Data Jaringan dengan Wireshark & Penjelasan TCP 3-Way Handshake',
    description: 'Rekam traffic lalu lintas HTTP dan HTTPS menggunakan Wireshark. Analisis proses koneksi TCP Three-Way Handshake (SYN, SYN-ACK, ACK), dan jelaskan perbedaan enkripsi TLS/SSL pada port 443 dibandingkan port 80.',
    dueDateStr: '4 Hari Lagi, 20:00 WIB',
    dueTimestamp: Date.now() + 96 * 3600 * 1000,
    points: 90,
    priority: 'medium' as const,
    syncSource: 'classroom' as const,
    classroomLink: 'https://classroom.google.com',
  },
  {
    courseName: 'Fisika Komputasi & Diferensial',
    title: 'Simulasi Gerak Peluru dengan Hambatan Udara menggunakan Metode Euler-Cromer',
    description: 'Tuliskan kode simulasi numerik untuk memodelkan lintasan proyektil meriam yang dipengaruhi gaya gesek udara kuadratik. Bandingkan hasil numerik metode Runge-Kutta Orde 4 dan Euler terhadap solusi analitik ideal.',
    dueDateStr: '5 Hari Lagi, 18:00 WIB',
    dueTimestamp: Date.now() + 120 * 3600 * 1000,
    points: 100,
    priority: 'medium' as const,
    syncSource: 'classroom' as const,
    classroomLink: 'https://classroom.google.com',
  },
  {
    courseName: 'Desain Pengalaman Pengguna (UI/UX)',
    title: 'Prototyping & Usability Testing Aplikasi E-Learning Berbasis Mobile',
    description: 'Buatlah High-Fidelity Prototype di Figma untuk sistem manajemen tugas mahasiswa. Lakukan usability testing dengan minimal 5 responden menggunakan System Usability Scale (SUS) dan laporkan hasilnya.',
    dueDateStr: 'Minggu Depan, 23:59 WIB',
    dueTimestamp: Date.now() + 168 * 3600 * 1000,
    points: 100,
    priority: 'low' as const,
    syncSource: 'classroom' as const,
    classroomLink: 'https://classroom.google.com',
  },
];

export const SimulateTaskModal: React.FC<SimulateTaskModalProps> = ({
  isOpen,
  onClose,
  onSimulate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-200 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <FolderSync className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Simulasi Notifikasi Tugas Guru</h3>
              <p className="text-xs text-amber-900/80">
                Uji otomatisasi sinkronisasi Classroom & kurasi AI instan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Pilih salah satu contoh tugas Google Classroom di bawah ini untuk melihat bagaimana sistem langsung membuat item to-do list baru dan menghubungkannya dengan Gemini AI untuk mengirimkan sumber referensi web serta link video YouTube:
          </p>

          <div className="space-y-3">
            {PRESET_CLASSROOM_ASSIGNMENTS.map((preset, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 bg-slate-50/50 transition flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {preset.courseName}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {preset.dueDateStr}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {preset.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSimulate(preset);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kirim Tugas Ini & Auto-Sync dengan AI</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
