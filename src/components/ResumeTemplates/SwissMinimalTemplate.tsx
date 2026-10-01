import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { themeTokenMap, getFontFamilyClass, getDensitySpacing } from '../../utils/themeStyles';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const SwissMinimalTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const theme = themeTokenMap[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontStyle);
  const spacing = getDensitySpacing(config.density);

  return (
    <div
      className={`bg-white text-slate-900 ${fontClass} ${spacing.padding} ${spacing.fontSize} min-h-[1050px] flex flex-col justify-between`}
    >
      <div>
        {/* Top Header: Swiss Typographic Grid */}
        <div className="border-b-2 pb-6" style={{ borderColor: theme.headerText }}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-slate-500 mb-1">
                Curriculum Vitae / QA Portfolio
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                {data.name}
              </h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-base sm:text-lg font-medium text-slate-700">
                  {data.title}
                </span>
                {data.showSalary && (
                  <span className="text-xs font-mono px-2 py-0.5 border text-slate-800" style={{ borderColor: theme.border }}>
                    {data.salary}
                  </span>
                )}
              </div>
            </div>

            {data.showPhoto && data.photoUrl && (
              <img
                src={data.photoUrl}
                alt={data.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 grayscale contrast-110 object-cover border border-slate-900"
              />
            )}
          </div>

          {/* Contact Bar: Pure typography separated by bullets */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-xs font-mono text-slate-600">
            <span>{data.location}</span>
            <span>/</span>
            <span>{data.workFormat}</span>
            <span>/</span>
            <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
              {data.phone}
            </a>
            <span>/</span>
            <a href={`mailto:${data.email}`} className="hover:underline">
              {data.email}
            </a>
          </div>
        </div>

        {/* Sections in clean editorial rhythm */}
        <div className={`mt-6 ${spacing.sectionGap}`}>
          {/* About */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                01. О себе
              </h2>
            </div>
            <div className="md:col-span-9">
              <p className="text-slate-800 leading-relaxed text-justify">
                {data.about}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                02. Навыки
              </h2>
            </div>
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-[10px]">[{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]</span>
                    <span className="text-slate-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                03. Опыт
              </h2>
            </div>
            <div className="md:col-span-9">
              {data.experience.map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {job.company} · {job.role}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 italic">
                    {job.specialization} — {job.location}
                  </div>
                  <ul className={`mt-2 ${spacing.bulletGap}`}>
                    {job.highlights.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-slate-400 font-mono text-[10px] select-none">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Courses */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-200">
            <div className="md:col-span-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                04. Образование
              </h2>
            </div>
            <div className="md:col-span-9 space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.university} ({edu.faculty})</div>
                  <div className="text-slate-400 font-mono">{edu.year}</div>
                </div>
              ))}

              <div className="pt-2 border-t border-dashed border-slate-200">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Курсы и квалификация:
                </div>
                {data.courses.map((course) => (
                  <div key={course.id} className="text-xs text-slate-700 py-0.5">
                    <strong>{course.title}</strong> — {course.institution} ({course.year})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Swiss Micro-data */}
      <div className="pt-4 mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500">
        <div>
          <span>ЯЗЫКИ: {data.languages.map((l) => `${l.language} (${l.level})`).join(' · ')}</span>
        </div>
        <div>
          <span>КАТЕГОРИЯ ПРАВ: B · САНКТ-ПЕТЕРБУРГ</span>
        </div>
      </div>
    </div>
  );
};
