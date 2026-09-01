"use client";
import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { Brain, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onSave: (prefs: UserPreferences) => void;
  onSkip: () => void;
  isSettingsMode?: boolean; // If true, it means it's accessed from settings (not initial login)
}

export function OnboardingModal({ isOpen, onSave, onSkip, isSettingsMode = false }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<UserPreferences>({
    learningStyle: '',
    explanationDetail: '',
    aiTone: '',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSave();
  };

  const handleSave = () => {
    onSave({
      learningStyle: prefs.learningStyle || 'Netral',
      explanationDetail: prefs.explanationDetail || 'Netral',
      aiTone: prefs.aiTone || 'Ramah',
    });
    // Reset step for next open
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg">
                {isSettingsMode ? 'Pengaturan Personalisasi AI' : 'Personalisasi AI Tutor'}
              </h2>
              <p className="text-xs text-slate-500">Langkah {step} dari 3</p>
            </div>
          </div>
          {isSettingsMode && (
            <button onClick={onSkip} className="text-slate-400 hover:text-slate-600 p-2">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-xl">Bagaimana gaya belajar yang paling kamu sukai?</h3>
              <p className="text-sm text-slate-500 mb-4">Kami akan menyesuaikan jenis referensi yang diberikan kepadamu.</p>
              
              {['Visual (Gambar, Video, Diagram)', 'Membaca / Menulis (Teks Ekstensif)', 'Praktik (Studi Kasus, Latihan)'].map(option => (
                <button
                  key={option}
                  onClick={() => setPrefs(prev => ({ ...prev, learningStyle: option }))}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    prefs.learningStyle === option 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                      : 'border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold">{option}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-xl">Seberapa detail penjelasan yang kamu inginkan?</h3>
              <p className="text-sm text-slate-500 mb-4">Mempengaruhi panjang rangkuman dan respon chatbot.</p>
              
              {['Singkat & Padat (To the point)', 'Sangat Detail (Mendalam)', 'Bertahap (Step-by-step)'].map(option => (
                <button
                  key={option}
                  onClick={() => setPrefs(prev => ({ ...prev, explanationDetail: option }))}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    prefs.explanationDetail === option 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                      : 'border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold">{option}</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-xl">Gaya bahasa AI seperti apa yang memotivasi kamu?</h3>
              <p className="text-sm text-slate-500 mb-4">Menentukan tone komunikasi asisten saat membantumu.</p>
              
              {['Santai & Ramah', 'Profesional & Tegas', 'Socratic (Memicu Berpikir Kritis)'].map(option => (
                <button
                  key={option}
                  onClick={() => setPrefs(prev => ({ ...prev, aiTone: option }))}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    prefs.aiTone === option 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                      : 'border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold">{option}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {!isSettingsMode ? (
            <button 
              onClick={() => {
                setStep(1);
                onSkip();
              }} 
              className="text-slate-500 hover:text-slate-700 font-semibold text-sm px-4 py-2"
            >
              Lewati (Skip)
            </button>
          ) : (
            <div />
          )}
          
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition"
          >
            <span>{step === 3 ? 'Simpan' : 'Lanjut'}</span>
            {step < 3 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
