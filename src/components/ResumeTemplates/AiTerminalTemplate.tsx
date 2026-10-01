import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { themeTokenMap, getFontFamilyClass, getDensitySpacing } from '../../utils/themeStyles';
import { Terminal, Cpu, Bot, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const AiTerminalTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const theme = themeTokenMap[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontStyle);
  const spacing = getDensitySpacing(config.density);

  return (
    <div
      className={`bg-white text-slate-900 ${fontClass} ${spacing.padding} ${spacing.fontSize} min-h-[1050px] flex flex-col justify-between border-t-8`}
      style={{ borderTopColor: theme.accent }}
    >
      <div>
        {/* Terminal / Tech Header */}
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>QA_PROFILE // AI_TESTING_ENGINEER</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">Junior Level</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {data.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-300">
                {data.title}
              </p>
            </div>

            {data.showPhoto && data.photoUrl && (
              <div className="relative">
                <img
                  src={data.photoUrl}
                  alt={data.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border-2 border-slate-700 shadow"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold rounded">
                  OPEN
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats / Contacts Terminal Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>📍 {data.location} ({data.workFormat})</span>
              <span>📞 {data.phone}</span>
              <span>✉️ {data.email}</span>
            </div>
            {data.showSalary && (
              <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                💰 {data.salary}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className={spacing.sectionGap}>
          {/* Key Competence / Profile Summary */}
          <div className="p-4 rounded-lg border bg-slate-50/70" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Bot className="w-4 h-4" style={{ color: theme.accent }} />
              <span>Специализация & Профиль</span>
            </div>
            <p className="text-slate-700 text-justify leading-relaxed">
              {data.about}
            </p>
          </div>

          {/* AI & QA Tech Matrix */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Cpu className="w-4 h-4" style={{ color: theme.accent }} />
              <span>Технологический стек и QA-компетенции</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.skills.map((skill, idx) => {
                const isAi = skill.includes('ИИ') || skill.includes('ChatGPT') || skill.includes('Python');
                return (
                  <div
                    key={idx}
                    className="p-2 rounded border flex items-center justify-between"
                    style={{
                      borderColor: isAi ? theme.accentBorder : theme.border,
                      backgroundColor: isAi ? theme.accentBg : '#ffffff'
                    }}
                  >
                    <span className="font-medium text-slate-800">{skill}</span>
                    {isAi && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase" style={{ color: theme.accentText }}>
                        KEY
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Experience: Alice / Yandex Crowd */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <CheckSquare className="w-4 h-4" style={{ color: theme.accent }} />
              <span>Практический опыт тестирования</span>
            </div>

            {data.experience.map((job) => (
              <div key={job.id} className="p-4 rounded-lg border space-y-2" style={{ borderColor: theme.border }}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <span className="text-base font-bold text-slate-900">{job.company}</span>
                    <span className="text-slate-400 mx-2">—</span>
                    <span className="font-semibold" style={{ color: theme.accent }}>{job.role}</span>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                    {job.period}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-500">
                  {job.specialization} · {job.location}
                </div>

                <ul className={`mt-2 ${spacing.bulletGap}`}>
                  {job.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="font-mono font-bold select-none" style={{ color: theme.accent }}>&gt;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Qualifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg border" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-800 mb-2">
                <BookOpen className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                <span>Образование</span>
              </div>
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 mt-0.5">{edu.university}</div>
                  <div className="text-slate-500 text-[11px]">{edu.faculty}</div>
                  <div className="text-xs font-mono font-medium mt-1 text-slate-600">{edu.year}</div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg border" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-800 mb-2">
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                <span>ИИ & Data Аналитика</span>
              </div>
              <div className="space-y-2 text-xs">
                {data.courses.map((course) => (
                  <div key={course.id}>
                    <div className="font-semibold text-slate-800">{course.title}</div>
                    <div className="text-slate-500 text-[11px]">{course.institution} ({course.year})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-3 mt-4 border-t flex flex-wrap items-center justify-between text-xs font-mono text-slate-500" style={{ borderColor: theme.border }}>
        <div>LANGUAGES: {data.languages.map((l) => `${l.language} [${l.level}]`).join(' | ')}</div>
        <div>DRIVER_LICENSE: CAT_B // READY FOR QA TESTS</div>
      </div>
    </div>
  );
};
