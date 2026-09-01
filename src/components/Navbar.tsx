"use client";
import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  RefreshCw, 
  Plus, 
  MessageSquareText, 
  LogOut, 
  LogIn, 
  CheckCircle2,
  FolderSync,
  Settings
} from 'lucide-react';
import { UserProfile } from '../services/classroomService';

interface NavbarProps {
  userProfile: UserProfile | null;
  isConnected: boolean;
  isSyncing: boolean;
  onConnectGoogle: () => void;
  onDisconnectGoogle: () => void;
  onSyncClassroom: () => void;
  onOpenCreateTask: () => void;
  onOpenChat: (taskId?: string) => void;
  onSimulateNewTask: () => void;
  onOpenSettings: () => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  isConnected,
  isSyncing,
  onConnectGoogle,
  onDisconnectGoogle,
  onSyncClassroom,
  onOpenCreateTask,
  onOpenChat,
  onSimulateNewTask,
  onOpenSettings,
  pendingCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-lg tracking-tight">
                  Classroom<span className="text-indigo-600">AI</span> Sync
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Auto-Sync & AI Sources
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Sistem pencatatan to-do list otomatis & kurasi sumber belajar AI
              </p>
            </div>
          </div>

          {/* Actions & Connection Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Chatbot Trigger */}
            <button
              id="navbar-open-chat-btn"
              onClick={() => onOpenChat()}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition cursor-pointer"
              title="Buka Chatbot AI Tutor"
            >
              <MessageSquareText className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline">Tanya AI</span>
            </button>

            {/* Manual Add Task */}
            <button
              id="navbar-create-task-btn"
              onClick={onOpenCreateTask}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Tambah Tugas</span>
            </button>

            {/* Google Classroom Connection Status */}
            {isConnected ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {/* Sync Now Button */}
                <button
                  id="navbar-sync-classroom-btn"
                  onClick={onSyncClassroom}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan'}</span>
                </button>

                {/* User Profile Badge */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-1 pr-2">
                  {userProfile?.picture ? (
                    <img
                      src={userProfile.picture}
                      alt={userProfile.name}
                      className="w-7 h-7 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {userProfile?.name?.charAt(0) || 'G'}
                    </div>
                  )}
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-tight max-w-[120px] truncate">
                      {userProfile?.name || 'Classroom Terhubung'}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Auto-Sync Aktif
                    </p>
                  </div>
                  <button
                    id="navbar-settings-btn"
                    onClick={onOpenSettings}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-200/60 transition cursor-pointer ml-1"
                    title="Pengaturan Personalisasi AI"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    id="navbar-logout-btn"
                    onClick={onDisconnectGoogle}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200/60 transition cursor-pointer ml-1"
                    title="Putuskan Hubungan Akun Google"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Simulate New Task Button (For fast preview testing) */}
                <button
                  id="navbar-simulate-sync-btn"
                  onClick={onSimulateNewTask}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition cursor-pointer"
                  title="Simulasi penambahan tugas baru dari guru"
                >
                  <FolderSync className="w-3.5 h-3.5 text-amber-600" />
                  Simulasi Sync Tugas
                </button>

                {/* Connect Google Classroom Button */}
                <button
                  id="navbar-connect-google-btn"
                  onClick={onConnectGoogle}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>Sambungkan Classroom</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
