import React from 'react';
import { X, CheckCircle, AlertTriangle, Sparkles, Target, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const QaTipsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Анализ и рекомендации по резюме для Олега
              </h2>
              <p className="text-xs text-slate-400">
                Как повысить конверсию откликов на позицию Junior QA / ИИ-тестировщика
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
          {/* Card 1: 1-Page Fix */}
          <div className="p-4 rounded-xl border border-emerald-800/60 bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Главная победа: Решение проблемы 2-й страницы</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              В вашем исходном PDF-резюме 3 строчки (Языки и Права) перевалили на пустую 2-ю страницу. Рекрутеры тратят на просмотр 6–8 секунд, и «висячие» страницы создают впечатление небрежной верстки. Во всех представленных HTML-шаблонах все блоки выверены так, чтобы <strong>100% умещаться ровно на один лист A4</strong>.
            </p>
          </div>

          {/* Card 2: Yandex Alice Experience */}
          <div className="p-4 rounded-xl border border-indigo-800/60 bg-indigo-950/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Target className="w-4 h-4 shrink-0" />
              <span>Как продавать опыт Яндекс Крауд (Алиса)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Слово «Ассесор» в резюме часто недооценивают. В современных IT-компаниях это называется <strong>LLM Evaluation / AI Model Testing / Диалоговое тестирование</strong>. Вы уже делали:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Тестирование соответствия гайдлайнам (Oracles / Acceptance Criteria).</li>
              <li>Поиск редких дефектов и edge-кейсов (граничные значения, галлюцинации моделей, нестыковки контекста).</li>
              <li>Регрессионную проверку на больших выборках с сохранением точности и темпа (high throughput QA).</li>
              <li>Баг-репорты разработчикам диалоговых систем.</li>
            </ul>
          </div>

          {/* Card 3: Keywords to land QA offers */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Ключевые слова для добавления в стек резюме</span>
            </div>
            <p className="text-slate-400">
              Чтобы автоматические ATS-фильтры на HeadHunter и Habr Карьере выдавали ваше резюме в топ выдачи, рекомендуется указывать:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-400">Теория QA:</strong> SDLC, STLC, тест-кейсы, чек-листы, баг-репорты, техники тест-дизайна (эквивалентные классы, граничные значения).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-400">Инструменты:</strong> DevTools (Console, Network), Postman (REST API basics), Swagger, Charles/Fiddler.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-400">Базы данных & Код:</strong> SQL (SELECT, JOIN), Python (вы уже изучали его в ПГНИУ!), Git, GitHub.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-400">Таск-трекеры:</strong> Jira, Kaiten, YouTrack, Confluence.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
