import React from 'react';
import { Download, Printer, Code2, Sparkles } from 'lucide-react';

interface Props {
  onDownloadHtml: () => void;
  onPrint: () => void;
  onOpenCode: () => void;
  onOpenTips: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: 'longread' | 'a4';
  setViewMode: (mode: 'longread' | 'a4') => void;
}

export const Header: React.FC<Props> = ({
  onDownloadHtml,
  onPrint,
  onOpenCode,
  onOpenTips,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
}) => {
  return (
    <header className="no-print bg-[#111113] text-[#f2efeb] border-b-[1.5px] border-[#f2efeb] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#f2efeb] hover:text-[var(--accent)] transition-colors"
        >
          СТРОЙКОВ / QA
        </a>

        {/* View Mode Switcher: Longread vs A4 Sheet */}
        <div className="flex items-center bg-[var(--ink-faint)] border border-[#f2efeb]/20 p-0.5 ml-2">
          <button
            onClick={() => setViewMode('longread')}
            className={`px-2.5 py-1 font-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
              viewMode === 'longread'
                ? 'bg-[var(--accent)] text-[#111113]'
                : 'text-[#f2efeb]/60 hover:text-[#f2efeb]'
            }`}
          >
            Лонгрид
          </button>
          <button
            onClick={() => setViewMode('a4')}
            className={`px-2.5 py-1 font-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
              viewMode === 'a4'
                ? 'bg-[#f2efeb] text-[#111113]'
                : 'text-[#f2efeb]/60 hover:text-[#f2efeb]'
            }`}
          >
            Лист A4
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="hidden lg:flex items-center gap-6 font-code text-[11px] uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('preview')}
          className={`transition-colors ${
            activeTab === 'preview'
              ? 'text-[var(--accent)] underline underline-offset-8 font-semibold'
              : 'text-[#f2efeb]/70 hover:text-[#f2efeb]'
          }`}
        >
          [01] Резюме
        </button>
        <button
          onClick={onOpenTips}
          className="text-[#f2efeb]/70 hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[var(--accent)]" />
          <span>[02] Советы QA</span>
        </button>
        <button
          onClick={onOpenCode}
          className="text-[#f2efeb]/70 hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
        >
          <Code2 className="w-3 h-3 text-[var(--accent)]" />
          <span>[03] HTML Код</span>
        </button>
      </nav>

      {/* Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="px-3 py-1.5 text-xs font-display font-extrabold text-[#f2efeb] bg-transparent border border-[#f2efeb] hover:bg-[#f2efeb] hover:text-[#111113] transition-all uppercase cursor-pointer"
        >
          Печать / PDF
        </button>
        <button
          onClick={onDownloadHtml}
          className="px-3 py-1.5 text-xs font-display font-extrabold text-[#111113] bg-[var(--accent)] hover:opacity-90 transition-all uppercase cursor-pointer flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Скачать .HTML</span>
        </button>
      </div>
    </header>
  );
};
