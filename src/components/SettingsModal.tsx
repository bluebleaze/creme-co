"use client";
import React, { useState } from 'react';
import { UserPreferences, AIConfig } from '../types';
import { X, Save, Server, Key, Cpu, Link } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPreferences: UserPreferences | null;
  aiConfig: AIConfig | null;
  onSave: (prefs: UserPreferences, config: AIConfig) => void;
}

export function SettingsModal({ isOpen, onClose, userPreferences, aiConfig, onSave }: SettingsModalProps) {
  const [prefs, setPrefs] = useState<UserPreferences>(userPreferences || {
    learningStyle: 'Netral',
    explanationDetail: 'Netral',
    aiTone: 'Ramah',
  });
  
  const [config, setConfig] = useState<AIConfig>(aiConfig || {
    provider: 'gemini',
    apiKey: '',
    baseUrl: '',
    model: ''
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(prefs, config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pengaturan Aplikasi</h2>
            <p className="text-sm text-slate-500 mt-1">Konfigurasi AI dan Preferensi Belajar Anda</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* AI Settings Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Penyedia AI
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'gemini', label: 'Google Gemini', desc: 'Bawaan, Cloud' },
                { id: 'openai', label: 'OpenAI API', desc: 'Remote, Butuh Key' },
                { id: 'local', label: 'Local AI', desc: 'Ollama / LMStudio' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setConfig({ ...config, provider: opt.id as any })}
                  className={`p-4 text-left rounded-2xl border-2 transition-all ${config.provider === opt.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <div className={`font-bold ${config.provider === opt.id ? 'text-indigo-900' : 'text-slate-700'}`}>{opt.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            {config.provider !== 'gemini' && (
              <div className="space-y-4 mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                {config.provider === 'local' && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
                      <Server className="w-4 h-4 text-indigo-500" /> Base URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. http://localhost:11434/v1"
                      value={config.baseUrl || ''}
                      onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Catatan: AI lokal akan dijalankan langsung dari browser Anda, sehingga tidak mengalami kendala jaringan Cloud.
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
                    <Key className="w-4 h-4 text-indigo-500" /> API Key {config.provider === 'local' && '(Opsional)'}
                  </label>
                  <input
                    type="password"
                    placeholder={config.provider === 'openai' ? 'sk-...' : 'Biarkan kosong untuk Ollama'}
                    value={config.apiKey || ''}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
                    <Cpu className="w-4 h-4 text-indigo-500" /> Nama Model AI
                  </label>
                  <input
                    type="text"
                    placeholder={config.provider === 'openai' ? 'gpt-3.5-turbo' : 'llama3'}
                    value={config.model || ''}
                    onChange={(e) => setConfig({ ...config, model: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </section>

          {/* User Preferences */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preferensi Belajar</h3>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Gaya Belajar</label>
                <select 
                  value={prefs.learningStyle} 
                  onChange={e => setPrefs({...prefs, learningStyle: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                >
                  <option value="Netral">Netral / Umum</option>
                  <option value="Visual">Visual (Perbanyak Contoh Visual / Analogi)</option>
                  <option value="Membaca/Menulis">Membaca/Menulis (Penjelasan Teks Mendetail)</option>
                  <option value="Praktik">Praktik (Fokus pada Latihan & Kode/Soal)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Gaya Bahasa (Tone) AI</label>
                <select 
                  value={prefs.aiTone} 
                  onChange={e => setPrefs({...prefs, aiTone: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                >
                  <option value="Ramah">Ramah & Memotivasi</option>
                  <option value="Tegas">Tegas & Langsung (To the point)</option>
                  <option value="Sokratik">Sokratik (Memancing dengan Pertanyaan)</option>
                </select>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200"
          >
            <Save className="w-4 h-4" /> Simpan Pengaturan
          </button>
        </div>

      </div>
    </div>
  );
}
