import React from 'react';
import { ColorTheme, FontStyle, Density, ResumeConfig } from '../../types/resume';
import { Palette, Sliders, Image, DollarSign, ZoomIn, ZoomOut, Edit3, Lightbulb, Code } from 'lucide-react';

interface Props {
  config: ResumeConfig;
  onChangeConfig: (newConfig: Partial<ResumeConfig>) => void;
  showPhoto: boolean;
  onTogglePhoto: () => void;
  onUploadPhoto?: (photoUrl: string) => void;
  showSalary: boolean;
  onToggleSalary: () => void;
  onOpenEdit: () => void;
  onOpenTips: () => void;
  onOpenCode: () => void;
}

const colorThemes: { id: ColorTheme; name: string; hex: string }[] = [
  { id: 'emerald-clean', name: 'Cyber Lime', hex: '#5ef38c' },
  { id: 'slate-indigo', name: 'Electric Indigo', hex: '#6366f1' },
  { id: 'nordic-navy', name: 'Cyan Azure', hex: '#38bdf8' },
  { id: 'amber-warm', name: 'Amber Gold', hex: '#f59e0b' },
  { id: 'graphite-monochrome', name: 'Monochrome', hex: '#f2efeb' }
];

const densityOptions: { id: Density; label: string }[] = [
  { id: 'comfortable', label: 'Std' },
  { id: 'compact', label: 'Comp' },
  { id: 'ultra-compact', label: 'Ultra 1-P' }
];

export const CustomizerToolbar: React.FC<Props> = ({
  config,
  onChangeConfig,
  showPhoto,
  onTogglePhoto,
  onUploadPhoto,
  showSalary,
  onToggleSalary,
  onOpenEdit,
  onOpenTips,
  onOpenCode
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onTogglePhoto}
          className={`py-2 px-2 text-[11px] font-code border transition-colors cursor-pointer text-center ${
            showPhoto
              ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--ink-faint)]'
              : 'border-[#f2efeb]/30 text-[#f2efeb]/60 hover:border-[#f2efeb]'
          }`}
        >
          Фото: {showPhoto ? 'ВКЛ' : 'ВЫКЛ'}
        </button>

        <button
          onClick={onToggleSalary}
          className={`py-2 px-2 text-[11px] font-code border transition-colors cursor-pointer text-center ${
            showSalary
              ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--ink-faint)]'
              : 'border-[#f2efeb]/30 text-[#f2efeb]/60 hover:border-[#f2efeb]'
          }`}
        >
          Зарплата: {showSalary ? 'ВКЛ' : 'ВЫКЛ'}
        </button>
      </div>

      {/* Upload user photo button */}
      <div>
        <label className="w-full py-1.5 px-2 font-code text-[10px] text-[#f2efeb] bg-transparent border border-[#f2efeb]/30 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
          <Image className="w-3 h-3 text-[var(--accent)]" />
          <span>Заменить / Загрузить фото</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onUploadPhoto) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const result = event.target?.result as string;
                  if (result) {
                    onUploadPhoto(result);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>

      {/* Density Segmented Control */}
      <div>
        <div className="font-code text-[10px] text-[var(--ink-dim)] uppercase tracking-wider mb-1.5 flex justify-between">
          <span>Плотность верстки</span>
          <span className="text-[var(--accent)]">1 страница A4</span>
        </div>
        <div className="grid grid-cols-3 bg-[var(--ink-faint)] p-1 border border-[var(--ink-faint)]">
          {densityOptions.map((d) => (
            <button
              key={d.id}
              onClick={() => onChangeConfig({ density: d.id })}
              className={`py-1 text-center font-code text-[10px] transition-all cursor-pointer ${
                config.density === d.id
                  ? 'bg-[#f2efeb] text-[#111113] font-bold shadow-sm'
                  : 'text-[var(--ink-dim)] hover:text-[#f2efeb]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Accent Picker */}
      <div>
        <div className="font-code text-[10px] text-[var(--ink-dim)] uppercase tracking-wider mb-1.5">
          Акцентный цвет
        </div>
        <div className="flex items-center gap-2">
          {colorThemes.map((c) => {
            const isSelected = config.colorTheme === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onChangeConfig({ colorTheme: c.id });
                  document.documentElement.style.setProperty('--accent', c.hex);
                }}
                title={c.name}
                className={`w-6 h-6 rounded-none border transition-transform cursor-pointer ${
                  isSelected
                    ? 'scale-110 border-white ring-2 ring-[var(--accent)]'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Zoom / Scale */}
      <div>
        <div className="font-code text-[10px] text-[var(--ink-dim)] uppercase tracking-wider mb-1.5 flex justify-between">
          <span>Масштаб листа</span>
          <span className="text-[var(--accent)]">{Math.round(config.zoom * 100)}%</span>
        </div>
        <div className="flex items-center gap-1.5 font-code text-xs">
          <button
            onClick={() => onChangeConfig({ zoom: Math.max(0.65, config.zoom - 0.1) })}
            className="flex-1 py-1 bg-transparent border border-[#f2efeb]/30 text-[#f2efeb] hover:border-[#f2efeb] text-center"
          >
            -10%
          </button>
          <button
            onClick={() => onChangeConfig({ zoom: 1.0 })}
            className="flex-1 py-1 bg-[var(--ink-faint)] border border-[var(--accent)]/50 text-[var(--accent)] text-center font-bold"
          >
            100%
          </button>
          <button
            onClick={() => onChangeConfig({ zoom: Math.min(1.2, config.zoom + 0.1) })}
            className="flex-1 py-1 bg-transparent border border-[#f2efeb]/30 text-[#f2efeb] hover:border-[#f2efeb] text-center"
          >
            +10%
          </button>
        </div>
      </div>

      {/* Action buttons inside sidebar */}
      <div className="space-y-2 pt-2 border-t border-[var(--ink-faint)]">
        <button
          onClick={onOpenEdit}
          className="w-full py-2.5 px-3 bg-[var(--accent)] text-[#111113] font-display font-extrabold text-xs tracking-tight uppercase hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Редактировать данные</span>
        </button>

        <button
          onClick={onOpenTips}
          className="w-full py-2 px-3 bg-transparent border border-[#f2efeb]/40 text-[#f2efeb] font-code text-[10px] uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Lightbulb className="w-3 h-3 text-[var(--accent)]" />
          <span>Советы для QA (Яндекс)</span>
        </button>

        <button
          onClick={onOpenCode}
          className="w-full py-2 px-3 bg-transparent border border-[#f2efeb]/20 text-[#f2efeb]/70 font-code text-[10px] uppercase hover:border-[#f2efeb] hover:text-[#f2efeb] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Code className="w-3 h-3" />
          <span>Просмотр HTML-кода</span>
        </button>
      </div>
    </div>
  );
};
