import React from 'react';
import { Download, Printer, Code2, Sparkles } from 'lucide-react';

interface Props {
  onDownloadHtml: () => void;
  onPrint: () => void;
  onOpenCode: () => void;
  onOpenTips: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<Props> = ({
  onDownloadHtml,
  onPrint,
  onOpenCode,
  onOpenTips,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="no-print bg-[#111113] text-[#f2efeb] border-b-[1.5px] border-[#f2efeb] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#f2efeb] hover:text-[var(--accent)] transition-colors"
        >
          СТРОЙКОВ / QA
        </a>
        <span className="hidden sm:inline-block font-code text-[10px] text-[var(--accent)] bg-[var(--ink-faint)] px-2 py-0.5 border border-[var(--accent)]/30 rounded">
          HTML RESUME
        </span>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-6 font-code text-[11px] uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('preview')}
          className={`transition-colors ${
            activeTab === 'preview'
              ? 'text-[var(--accent)] underline underline-offset-8 font-semibold'
              : 'text-[#f2efeb]/70 hover:text-[#f2efeb]'
          }`}
        >
          [01] Дизайны
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
      <div className="flex items-center gap-2.5">
        <button
          onClick={onPrint}
          className="px-3 sm:px-4 py-2 text-xs font-display font-extrabold text-[#f2efeb] bg-transparent border border-[#f2efeb] hover:bg-[#f2efeb] hover:text-[#111113] transition-all uppercase cursor-pointer"
        >
          Печать / PDF
        </button>
        <button
          onClick={onDownloadHtml}
          className="px-3 sm:px-4 py-2 text-xs font-display font-extrabold text-[#111113] bg-[var(--accent)] hover:opacity-90 transition-all uppercase cursor-pointer flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Скачать .HTML</span>
        </button>
      </div>
    </header>
  );
};
