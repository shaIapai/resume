import React from 'react';
import { TemplateId } from '../../types/resume';

interface Props {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

interface TemplateOption {
  id: TemplateId;
  name: string;
  tagline: string;
  badge: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    tagline: 'Современный IT-стандарт',
    badge: 'TOP CHOICE'
  },
  {
    id: 'executive-split',
    name: 'Executive Two-Column',
    tagline: 'Двухколоночный Pro (1 стр.)',
    badge: 'SIDEBAR'
  },
  {
    id: 'swiss-minimal',
    name: 'Swiss Grid',
    tagline: 'Швейцарский минимализм',
    badge: 'EDITORIAL'
  },
  {
    id: 'ai-terminal',
    name: 'AI & QA Specialist',
    tagline: 'Фокус на ИИ и LLM-стек',
    badge: 'AI QA'
  },
  {
    id: 'compact-ats',
    name: 'Strict 1-Page ATS',
    tagline: 'Стандарт для HR-парсеров',
    badge: '100% ATS'
  }
];

export const TemplateSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col gap-2">
      {templates.map((t) => {
        const isActive = selected === t.id;
        return (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`border p-3 transition-all cursor-pointer relative ${
              isActive
                ? 'border-[var(--accent)] bg-[var(--ink-faint)]'
                : 'border-[var(--ink-faint)] bg-transparent hover:border-[#f2efeb]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-code text-[9px] text-[var(--accent)] font-semibold">
                {t.badge}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </div>
            <h3 className="font-display text-sm font-bold text-[#f2efeb] leading-tight">
              {t.name}
            </h3>
            <p className="text-[11px] text-[var(--ink-dim)] mt-0.5">
              {t.tagline}
            </p>
          </div>
        );
      })}
    </div>
  );
};
