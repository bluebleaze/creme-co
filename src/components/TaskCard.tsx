"use client";
import React from 'react';
import { 
  Check, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Youtube, 
  BookOpen, 
  FileText, 
  MessageSquareText, 
  ChevronRight,
  AlertCircle,
  Loader2,
  Trash2,
  ListChecks,
  Paperclip
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TodoTask } from '../types';

interface TaskCardProps {
  task: TodoTask;
  onToggleComplete: (taskId: string) => void;
  onAnalyzeWithAI: (taskId: string) => void;
  onOpenDetails: (task: TodoTask) => void;
  onOpenChat: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onAnalyzeWithAI,
  onOpenDetails,
  onOpenChat,
  onDeleteTask,
}) => {
  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!task.isCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch (err) {
        // fallback ignore
      }
    }
    onToggleComplete(task.id);
  };

  // Due date status calculation
  let dueBadgeColor = 'bg-slate-100 text-slate-600 border-slate-200';
  let isOverdue = false;
  if (task.dueTimestamp && !task.isCompleted) {
    const diffHours = (task.dueTimestamp - Date.now()) / (1000 * 3600);
    if (diffHours < 0) {
      isOverdue = true;
      dueBadgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (diffHours <= 24) {
      dueBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
    } else if (diffHours <= 48) {
      dueBadgeColor = 'bg-orange-50 text-orange-800 border-orange-200';
    }
  }

  const checklistTotal = task.aiAnalysis?.checklist?.length || 0;
  const checklistDone = task.aiAnalysis?.checklist?.filter(c => c.done)?.length || 0;

  return (
    <div
      id={`task-card-${task.id}`}
      className={`group relative rounded-2xl p-5 border transition-all duration-200 ${
        task.isCompleted
          ? 'bg-slate-50/70 border-slate-200/60 opacity-85'
          : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Completion Checkbox */}
        <button
          id={`task-checkbox-${task.id}`}
          onClick={handleCheck}
          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition cursor-pointer shrink-0 ${
            task.isCompleted
              ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xs'
              : 'border-2 border-slate-300 hover:border-indigo-500 bg-white'
          }`}
          title={task.isCompleted ? 'Tandai belum selesai' : 'Tandai sudah selesai'}
        >
          {task.isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header metadata: Course Name + Due Date + Source */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 max-w-[220px] truncate">
              {task.courseName}
            </span>

            {task.dueDateStr && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${dueBadgeColor}`}>
                <Clock className="w-3 h-3" />
                {task.dueDateStr}
                {isOverdue && ' (Terlewat)'}
              </span>
            )}

            {task.points !== undefined && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                {task.points} Poin
              </span>
            )}

            {task.syncSource === 'classroom' ? (
              <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Google Classroom
              </span>
            ) : (
              <span className="ml-auto hidden sm:inline-flex text-[11px] font-medium text-slate-400">
                Manual Task
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(task)}
            className={`text-base font-bold tracking-tight cursor-pointer hover:text-indigo-600 transition ${
              task.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
            }`}
          >
            {task.title}
          </h3>

          {/* Description Preview */}
          {task.description && (
            <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Classroom Attachments (if teacher attached docs/videos) */}
          {task.materials && task.materials.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Paperclip className="w-3 h-3" /> Materi Guru:
              </span>
              {task.materials.slice(0, 3).map((mat, idx) => {
                const title = mat.driveFile?.driveFile?.title || mat.youtubeVideo?.title || mat.link?.title || 'Lampiran';
                const link = mat.driveFile?.driveFile?.alternateLink || mat.youtubeVideo?.alternateLink || mat.link?.url || '#';
                return (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 max-w-[150px] truncate transition"
                  >
                    {mat.youtubeVideo ? <Youtube className="w-3 h-3 text-red-500" /> : <FileText className="w-3 h-3 text-blue-500" />}
                    <span className="truncate">{title}</span>
                  </a>
                );
              })}
            </div>
          )}

          {/* AI Analysis / Recommendation Preview Box */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            {task.aiLoading ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/70 text-indigo-700 text-xs font-medium animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>AI sedang menganalisis tugas & mengkurasi sumber belajar + video YouTube...</span>
              </div>
            ) : task.aiAnalysis ? (
              <div className="bg-gradient-to-br from-indigo-50/60 to-violet-50/40 border border-indigo-100/80 rounded-xl p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Rekomendasi Belajar AI Siap</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-semibold">
                      {task.aiAnalysis.difficulty}
                    </span>
                  </div>

                  {checklistTotal > 0 && (
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-100">
                      <ListChecks className="w-3 h-3 text-indigo-600" />
                      <span>{checklistDone}/{checklistTotal} Langkah</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-700 line-clamp-1 mb-2.5">
                  {task.aiAnalysis.summary}
                </p>

                {/* Sources & YouTube quick links pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {task.aiAnalysis.sources?.length > 0 && (
                    <button
                      onClick={() => onOpenDetails(task)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/80 transition cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3 text-indigo-600" />
                      <span>{task.aiAnalysis.sources.length} Sumber Web</span>
                    </button>
                  )}

                  {task.aiAnalysis.youtubeVideos?.length > 0 && (
                    <button
                      onClick={() => onOpenDetails(task)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200/80 transition cursor-pointer"
                    >
                      <Youtube className="w-3.5 h-3.5 text-rose-600" />
                      <span>{task.aiAnalysis.youtubeVideos.length} Video YouTube</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenDetails(task)}
                    className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Buka Panduan Lengkap <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Dapatkan rangkuman, daftar checklist, link referensi web & video YouTube yang relevan.
                </p>
                <button
                  id={`btn-analyze-${task.id}`}
                  onClick={() => onAnalyzeWithAI(task.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Kurasi Sumber & YouTube AI</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              {/* Ask AI about this specific task */}
              <button
                id={`btn-chat-task-${task.id}`}
                onClick={() => onOpenChat(task.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
              >
                <MessageSquareText className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tanya AI Soal Tugas Ini</span>
              </button>

              {/* Classroom Link */}
              {task.classroomLink && (
                <a
                  href={task.classroomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                  title="Buka langsung di Google Classroom"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Classroom</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onOpenDetails(task)}
                className="px-2.5 py-1 rounded-lg font-semibold text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
              >
                Detail
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                title="Hapus tugas dari daftar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
