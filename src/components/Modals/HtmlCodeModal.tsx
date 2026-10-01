import React, { useState } from 'react';
import { Copy, Check, Download, X, Code2 } from 'lucide-react';
import { downloadHtmlFile } from '../../utils/exportHtml';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  templateName: string;
}

export const HtmlCodeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  htmlCode,
  templateName
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    downloadHtmlFile(htmlCode, `Oleg_Stroykov_${templateName.replace(/\s+/g, '_')}_Resume.html`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                HTML-код резюме ({templateName})
              </h2>
              <p className="text-xs text-slate-400">
                Автономный HTML5 файл со встроенными стилями и поддержкой печати A4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопировано!' : 'Копировать HTML'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать .html</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Code Viewer */}
        <div className="flex-1 p-4 overflow-auto bg-slate-950">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
            {htmlCode}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Сгенерировано для Олега Стройкова · QA Tester</span>
          <span>Размер: ~{(htmlCode.length / 1024).toFixed(1)} КБ · Без внешних JS библиотек</span>
        </div>
      </div>
    </div>
  );
};
