"use client";
import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  Youtube, 
  BookOpen, 
  CheckSquare, 
  Square, 
  Clock, 
  GraduationCap, 
  Lightbulb, 
  MessageSquareText, 
  Loader2, 
  FileText, 
  Save,
  Compass,
  CheckCircle2,
  Paperclip,
  Share2
} from 'lucide-react';
import { TodoTask } from '../types';

interface TaskDetailModalProps {
  task: TodoTask | null;
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeWithAI: (taskId: string) => void;
  onToggleChecklistItem: (taskId: string, checkId: string) => void;
  onSaveNotes: (taskId: string, notes: string) => void;
  onOpenChat: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onAnalyzeWithAI,
  onToggleChecklistItem,
  onSaveNotes,
  onOpenChat,
}) => {
  if (!isOpen || !task) return null;

  const [notes, setNotes] = useState(task.customNotes || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'sources' | 'youtube' | 'tips'>('overview');
  const [isSavedNotes, setIsSavedNotes] = useState(false);

  const handleSaveNotes = () => {
    onSaveNotes(task.id, notes);
    setIsSavedNotes(true);
    setTimeout(() => setIsSavedNotes(false), 2000);
  };

  const ai = task.aiAnalysis;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-800">
                {task.courseName}
              </span>
              {task.dueDateStr && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {task.dueDateStr}
                </span>
              )}
              {task.points !== undefined && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700">
                  {task.points} Poin
                </span>
              )}
              {task.syncSource === 'classroom' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Google Classroom
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {task.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {task.classroomLink && (
              <a
                href={task.classroomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                title="Buka di Google Classroom"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ringkasan & Deskripsi
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Checklist Langkah</span>
            {ai?.checklist && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 font-bold">
                {ai.checklist.filter(c => c.done).length}/{ai.checklist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sources'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sumber Belajar AI ({ai?.sources?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'youtube'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-rose-600" />
            <span>Rekomendasi YouTube ({ai?.youtubeVideos?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tips'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Tips & Strategi</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {/* AI Banner Prompt if not analyzed yet */}
          {!ai && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold text-base">Aktifkan Analisis & Sumber Belajar AI</h3>
                </div>
                <p className="text-xs text-indigo-100">
                  Gemini AI akan membedah tugas ini, menyusun langkah checklist, dan mengkurasi video YouTube serta referensi web resmi.
                </p>
              </div>
              <button
                id="modal-trigger-ai-analyze"
                onClick={() => onAnalyzeWithAI(task.id)}
                disabled={task.aiLoading}
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-sm transition cursor-pointer flex items-center gap-2 shrink-0"
              >
                {task.aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Analisis Tugas Sekarang</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* AI Quick Insight Box if available */}
              {ai && (
                <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Ringkasan AI & Parameter Tugas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">
                        Tingkat: {ai.difficulty}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                        Estimasi: ~{ai.estimatedMinutes} Menit
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    {ai.summary}
                  </p>

                  {ai.keyConcepts?.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Konsep Kunci yang Perlu Dipahami:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {ai.keyConcepts.map((concept, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/60"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Assignment Description from Google Classroom */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Instruksi Lengkap dari Pengajar:
                </h3>
                <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  {task.description || 'Tidak ada deskripsi detail dari guru/dosen.'}
                </div>

                {/* Materials / Attachments */}
                {task.materials && task.materials.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5" />
                      Materi & Lampiran Lampiran ({task.materials.length}):
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {task.materials.map((m, idx) => {
                        const title = m.driveFile?.driveFile?.title || m.youtubeVideo?.title || m.link?.title || m.form?.title || `Lampiran #${idx + 1}`;
                        const link = m.driveFile?.driveFile?.alternateLink || m.youtubeVideo?.alternateLink || m.link?.url || m.form?.formUrl || '#';
                        return (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 rounded-xl flex items-center justify-between gap-3 text-xs font-medium text-slate-800 transition"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {m.youtubeVideo ? (
                                <Youtube className="w-4 h-4 text-rose-600 shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                              )}
                              <span className="truncate">{title}</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Notes Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Catatan Pribadi & Todo Tambahan:</h3>
                  {isSavedNotes && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan
                    </span>
                  )}
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan catatan, draf jawaban, pertanyaan untuk dosen, atau ide di sini..."
                  rows={3}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Simpan Catatan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Langkah-Langkah Pengerjaan Tugas (AI Guided Checklist)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Centang setiap langkah saat kamu menyelesaikannya untuk mempermudah pengerjaan.
                    </p>
                  </div>
                </div>

                {ai?.checklist && ai.checklist.length > 0 ? (
                  <div className="space-y-2.5">
                    {ai.checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onToggleChecklistItem(task.id, item.id)}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                          item.done
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-500'
                            : 'bg-slate-50 hover:bg-indigo-50/40 border-slate-200/80 text-slate-800'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {item.done ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through text-slate-400' : ''}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-500 mb-3">Belum ada langkah checklist.</p>
                    <button
                      onClick={() => onAnalyzeWithAI(task.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Buat Langkah Otomatis dengan AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CURATED WEB SOURCES & DOCS */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Sumber Bacaan & Dokumentasi Terverifikasi AI
                    </h3>
                    <p className="text-xs text-slate-500">
                      Rujukan artikel, dokumentasi resmi, tutorial, dan materi akademis relevan.
                    </p>
                  </div>
                </div>

                {ai?.sources && ai.sources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ai.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 bg-slate-50/60 transition flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                              {src.type}
                            </span>
                            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                              {src.domain}
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition" />
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2">
                            {src.title}
                          </h4>
                          <p className="mt-1 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {src.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-indigo-600">
                          <span>Buka Referensi</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-500 mb-3">Sumber belajar belum dikurasi.</p>
                    <button
                      onClick={() => onAnalyzeWithAI(task.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Kurasi Sumber Belajar dengan AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RECOMMENDED YOUTUBE VIDEOS */}
          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-rose-600" />
                      Rekomendasi Video YouTube Pembelajaran
                    </h3>
                    <p className="text-xs text-slate-500">
                      Video penjelasan konsep, tutorial praktik, dan pembahasan topik terkait dari YouTube.
                    </p>
                  </div>
                </div>

                {ai?.youtubeVideos && ai.youtubeVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {ai.youtubeVideos.map((video, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/30 to-slate-50 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              <Youtube className="w-3 h-3 text-rose-600" />
                              {video.channel}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1.5">
                            {video.title}
                          </h4>

                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            <strong className="text-slate-800">Kenapa membantu:</strong> {video.reason}
                          </p>

                          {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                            <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100/60 mb-3">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                Poin Utama yang Dipelajari:
                              </span>
                              <ul className="text-xs text-slate-700 space-y-1">
                                {video.keyTakeaways.map((point, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-1.5">
                                    <span className="text-rose-500 font-bold">•</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <a
                          href={video.searchUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery || video.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          <span>Tonton di YouTube</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-500 mb-3">Belum ada kurasi video YouTube.</p>
                    <button
                      onClick={() => onAnalyzeWithAI(task.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Youtube className="w-3.5 h-3.5" /> Rekomendasikan Video YouTube dengan AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: STUDY TIPS & STRATEGY */}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Tips Belajar & Strategi Pengerjaan Maksimal</span>
                </div>

                {ai?.recommendedStrategy && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      Strategi yang Dianjurkan:
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                      {ai.recommendedStrategy}
                    </p>
                  </div>
                )}

                {ai?.studyTips && ai.studyTips.length > 0 ? (
                  <div className="space-y-2.5">
                    {ai.studyTips.map((tip, i) => (
                      <div
                        key={i}
                        className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start gap-2.5"
                      >
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-500 mb-2">Tips belajar belum dibuat.</p>
                    <button
                      onClick={() => onAnalyzeWithAI(task.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer"
                    >
                      Buat Tips dengan AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="modal-btn-open-chat"
            onClick={() => {
              onClose();
              onOpenChat(task.id);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition cursor-pointer"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Tanya Chatbot AI Soal Tugas Ini</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
