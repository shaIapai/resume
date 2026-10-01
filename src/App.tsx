/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { defaultResumeData } from './data/defaultResume';
import { ResumeData, ResumeConfig, TemplateId } from './types/resume';
import { Header } from './components/Header';
import { TemplateSelector } from './components/Controls/TemplateSelector';
import { CustomizerToolbar } from './components/Controls/CustomizerToolbar';
import { ModernTechTemplate } from './components/ResumeTemplates/ModernTechTemplate';
import { ExecutiveSplitTemplate } from './components/ResumeTemplates/ExecutiveSplitTemplate';
import { SwissMinimalTemplate } from './components/ResumeTemplates/SwissMinimalTemplate';
import { AiTerminalTemplate } from './components/ResumeTemplates/AiTerminalTemplate';
import { CompactAtsTemplate } from './components/ResumeTemplates/CompactAtsTemplate';
import { HtmlCodeModal } from './components/Modals/HtmlCodeModal';
import { EditResumeModal } from './components/Modals/EditResumeModal';
import { QaTipsModal } from './components/Modals/QaTipsModal';
import { generateStandaloneHtml, downloadHtmlFile } from './utils/exportHtml';
import {
  Download,
  Printer,
  Copy,
  Check,
  Code2,
  Sparkles,
  Maximize2
} from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [config, setConfig] = useState<ResumeConfig>({
    template: 'modern-tech',
    colorTheme: 'emerald-clean',
    fontStyle: 'inter',
    density: 'compact',
    zoom: 1.0,
    highlightAiSkills: true,
  });

  const [activeTab, setActiveTab] = useState('preview');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);

  // Generate standalone HTML string
  const generatedHtml = useMemo(() => {
    return generateStandaloneHtml(resumeData, config);
  }, [resumeData, config]);

  const handleUpdateConfig = (updates: Partial<ResumeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const templateNames: Record<TemplateId, string> = {
      'modern-tech': 'Modern_Tech',
      'executive-split': 'Executive_Split',
      'swiss-minimal': 'Swiss_Minimal',
      'ai-terminal': 'AI_Terminal',
      'compact-ats': 'Compact_ATS',
    };
    downloadHtmlFile(
      generatedHtml,
      `Резюме_Стройков_Олег_QA_${templateNames[config.template]}.html`
    );
  };

  const handleQuickCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopiedQuick(true);
      setTimeout(() => setCopiedQuick(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Render the selected template inside the paper
  const renderTemplate = () => {
    switch (config.template) {
      case 'executive-split':
        return <ExecutiveSplitTemplate data={resumeData} config={config} />;
      case 'swiss-minimal':
        return <SwissMinimalTemplate data={resumeData} config={config} />;
      case 'ai-terminal':
        return <AiTerminalTemplate data={resumeData} config={config} />;
      case 'compact-ats':
        return <CompactAtsTemplate data={resumeData} config={config} />;
      case 'modern-tech':
      default:
        return <ModernTechTemplate data={resumeData} config={config} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#111113] text-[#f2efeb] font-sans flex flex-col overflow-hidden select-auto">
      {/* Variation 2 Header */}
      <Header
        onDownloadHtml={handleDownload}
        onPrint={handlePrint}
        onOpenCode={() => setIsCodeModalOpen(true)}
        onOpenTips={() => setIsTipsModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Studio Grid: Sidebar + Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr] overflow-hidden">
        {/* Sidebar */}
        <aside className="no-print border-r-[1.5px] border-[#f2efeb] bg-[#111113] p-5 overflow-y-auto flex flex-col gap-6">
          {/* Section 01: Style selector */}
          <section>
            <div className="font-code text-[11px] text-[var(--accent)] font-semibold mb-3 flex items-center justify-between">
              <span>[01] ВЫБОР СТИЛЯ</span>
              <span className="text-[var(--ink-dim)]">5 СТИЛЕЙ</span>
            </div>
            <TemplateSelector
              selected={config.template}
              onSelect={(id) => handleUpdateConfig({ template: id })}
            />
          </section>

          {/* Section 02: Parameters */}
          <section>
            <div className="font-code text-[11px] text-[var(--accent)] font-semibold mb-3">
              [02] ПАРАМЕТРЫ
            </div>
            <CustomizerToolbar
              config={config}
              onChangeConfig={handleUpdateConfig}
              showPhoto={resumeData.showPhoto}
              onTogglePhoto={() =>
                setResumeData((prev) => ({ ...prev, showPhoto: !prev.showPhoto }))
              }
              onUploadPhoto={(newPhotoUrl) =>
                setResumeData((prev) => ({ ...prev, photoUrl: newPhotoUrl, showPhoto: true }))
              }
              showSalary={resumeData.showSalary}
              onToggleSalary={() =>
                setResumeData((prev) => ({ ...prev, showSalary: !prev.showSalary }))
              }
              onOpenEdit={() => setIsEditModalOpen(true)}
              onOpenTips={() => setIsTipsModalOpen(true)}
              onOpenCode={() => setIsCodeModalOpen(true)}
            />
          </section>

          {/* Summary status note */}
          <div className="mt-auto pt-3 border-t border-[var(--ink-faint)] text-[10px] font-code text-[var(--ink-dim)] space-y-1">
            <div className="flex justify-between">
              <span>СТАТУС:</span>
              <span className="text-[var(--accent)]">100% 1-СТРАНИЧНЫЙ A4</span>
            </div>
            <div className="flex justify-between">
              <span>ЯНДЕКС QA:</span>
              <span>ГОЛОСОВОЙ АССИСТЕНТ «АЛИСА»</span>
            </div>
          </div>
        </aside>

        {/* Content Area: Canvas with Dot Grid Background */}
        <div className="dot-grid p-4 sm:p-8 flex flex-col items-center overflow-y-auto relative">
          {/* Floating Canvas Quick Actions Bar */}
          <div className="no-print w-full max-w-[740px] mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-code text-[11px] text-[#f2efeb]/80">
                A4 PREVIEW · 210 × 297 MM
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickCopy}
                className="px-2.5 py-1 font-code text-[10px] text-[#f2efeb] bg-[#111113] border border-[#f2efeb]/40 hover:border-[#f2efeb] transition-colors cursor-pointer flex items-center gap-1"
                title="Копировать HTML-код"
              >
                {copiedQuick ? <Check className="w-3 h-3 text-[var(--accent)]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedQuick ? 'СКОПИРОВАНО' : 'HTML КОД'}</span>
              </button>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-2.5 py-1 font-code text-[10px] text-[var(--accent)] bg-[#111113] border border-[var(--accent)]/50 hover:bg-[var(--accent)] hover:text-[#111113] transition-colors cursor-pointer"
              >
                РЕДАКТИРОВАТЬ
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1 font-code text-[10px] text-[#111113] bg-[#f2efeb] hover:bg-white transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                <Printer className="w-3 h-3" />
                <span>ПЕЧАТЬ</span>
              </button>
            </div>
          </div>

          {/* Paper Canvas */}
          <div
            id="resume-print-container"
            className="w-full flex justify-center pb-12 transition-transform duration-200"
            style={{
              transform: `scale(${config.zoom})`,
              transformOrigin: 'top center',
            }}
          >
            <div
              id="resume-print-area"
              className="w-full max-w-[740px] bg-white text-[#111] brutalist-shadow transition-all"
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print px-4 sm:px-6 py-2.5 border-t-[1.5px] border-[#f2efeb] bg-[#111113] flex items-center justify-between font-code text-[11px] text-[var(--ink-dim)] z-30">
        <div className="flex items-center gap-3">
          <span>© 2026 STROIKOV OLEG</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#f2efeb]/80">JUNIOR QA & AI PRODUCTS</span>
        </div>

        <div className="text-[var(--accent)] font-semibold">
          100% FIT A4 SIZE · ZERO OVERFLOW
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleUpdateConfig({ zoom: 1.0 })}
            className="hover:text-[var(--accent)] cursor-pointer"
          >
            SCALE: {Math.round(config.zoom * 100)}%
          </button>
          <button
            onClick={handleDownload}
            className="text-[var(--accent)] hover:underline uppercase font-bold cursor-pointer"
          >
            СКАЧАТЬ .HTML
          </button>
        </div>
      </footer>

      {/* Modals */}
      <HtmlCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        htmlCode={generatedHtml}
        templateName={config.template}
      />

      <EditResumeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={resumeData}
        onSave={(newData) => setResumeData(newData)}
      />

      <QaTipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
      />
    </div>
  );
}
