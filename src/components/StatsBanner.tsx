"use client";
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ListTodo, 
  AlertCircle, 
  CheckCheck,
  Zap
} from 'lucide-react';
import { TodoTask } from '../types';

interface StatsBannerProps {
  tasks: TodoTask[];
  onQuickFilter: (status: 'all' | 'pending' | 'completed' | 'ai-ready') => void;
  currentFilter: string;
  syncNotification: string | null;
  onDismissNotification: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  tasks,
  onQuickFilter,
  currentFilter,
  syncNotification,
  onDismissNotification,
}) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const pending = total - completed;
  const aiAnalyzed = tasks.filter(t => t.aiAnalysis && !t.isCompleted).length;
  
  // Urgent tasks: due within 48 hours or overdue
  const urgentTasks = tasks.filter(t => {
    if (t.isCompleted || !t.dueTimestamp) return false;
    const diff = (t.dueTimestamp - Date.now()) / (1000 * 3600);
    return diff < 48;
  }).length;

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* Real-time Sync Alert Notification if any */}
      {syncNotification && (
        <div 
          id="sync-notification-alert"
          className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCheck className="w-4 h-4" />
            </div>
            <p className="font-medium text-xs sm:text-sm">{syncNotification}</p>
          </div>
          <button
            onClick={onDismissNotification}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 px-2 py-1 rounded-md hover:bg-emerald-100/60 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <button
          id="stat-filter-all-btn"
          onClick={() => onQuickFilter('all')}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer ${
            currentFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold tracking-wide ${currentFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
              SEMUA TUGAS
            </span>
            <div className={`p-1.5 rounded-lg ${currentFilter === 'all' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
              <ListTodo className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{total}</span>
            <span className={`text-xs ${currentFilter === 'all' ? 'text-slate-400' : 'text-slate-500'}`}>tugas terdata</span>
          </div>
        </button>

        {/* Pending / Active Tasks */}
        <button
          id="stat-filter-pending-btn"
          onClick={() => onQuickFilter('pending')}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer ${
            currentFilter === 'pending'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-slate-800 border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold tracking-wide ${currentFilter === 'pending' ? 'text-indigo-100' : 'text-indigo-600'}`}>
              PERLU DIKERJAKAN
            </span>
            <div className={`p-1.5 rounded-lg ${currentFilter === 'pending' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-50 text-indigo-600'}`}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{pending}</span>
            {urgentTasks > 0 && (
              <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${
                currentFilter === 'pending' ? 'bg-indigo-800 text-amber-300' : 'bg-amber-100 text-amber-800'
              }`}>
                {urgentTasks} mendesak
              </span>
            )}
          </div>
        </button>

        {/* AI Analyzed & Sources Ready */}
        <button
          id="stat-filter-ai-ready-btn"
          onClick={() => onQuickFilter('ai-ready')}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer ${
            currentFilter === 'ai-ready'
              ? 'bg-violet-700 text-white border-violet-700 shadow-sm'
              : 'bg-white text-slate-800 border-slate-200/80 hover:border-violet-200 hover:bg-violet-50/20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold tracking-wide ${currentFilter === 'ai-ready' ? 'text-violet-200' : 'text-violet-600'}`}>
              AI SOURCES READY
            </span>
            <div className={`p-1.5 rounded-lg ${currentFilter === 'ai-ready' ? 'bg-violet-800 text-violet-200' : 'bg-violet-50 text-violet-600'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{aiAnalyzed}</span>
            <span className={`text-xs ${currentFilter === 'ai-ready' ? 'text-violet-200' : 'text-slate-500'}`}>
              siap YouTube & materi
            </span>
          </div>
        </button>

        {/* Completed Progress */}
        <button
          id="stat-filter-completed-btn"
          onClick={() => onQuickFilter('completed')}
          className={`p-4 rounded-2xl text-left border transition cursor-pointer ${
            currentFilter === 'completed'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
              : 'bg-white text-slate-800 border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold tracking-wide ${currentFilter === 'completed' ? 'text-emerald-100' : 'text-emerald-700'}`}>
              SELESAI ({completionPercentage}%)
            </span>
            <div className={`p-1.5 rounded-lg ${currentFilter === 'completed' ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-50 text-emerald-600'}`}>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{completed}</span>
            <span className={`text-xs ${currentFilter === 'completed' ? 'text-emerald-200' : 'text-slate-500'}`}>
              dari {total} total
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
