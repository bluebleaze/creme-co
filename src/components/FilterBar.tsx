"use client";
import React from 'react';
import { Search, Filter, ArrowUpDown, X, BookOpen } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  courses: string[];
  selectedCourse: string;
  onCourseChange: (c: string) => void;
  statusFilter: string;
  onStatusChange: (s: string) => void;
  sortBy: 'due' | 'newest' | 'priority';
  onSortChange: (s: 'due' | 'newest' | 'priority') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  courses,
  selectedCourse,
  onCourseChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3 mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="task-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari tugas, topik materi, atau mata pelajaran..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Course select */}
          <div className="relative">
            <select
              id="course-filter-select"
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer max-w-[200px] truncate"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <BookOpen className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort order select */}
          <div className="relative">
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="appearance-none pl-8 pr-8 py-2 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="due">Tenggat Terdekat</option>
              <option value="priority">Prioritas Tertinggi</option>
              <option value="newest">Terbaru Ditambahkan</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course quick-tags pills if multiple */}
      {courses.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 text-[11px] font-medium mr-1 shrink-0">Kelas:</span>
          <button
            onClick={() => onCourseChange('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCourse === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Semua
          </button>
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => onCourseChange(course)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer max-w-[180px] truncate ${
                selectedCourse === course
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
