import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { themeTokenMap, getFontFamilyClass } from '../../utils/themeStyles';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const CompactAtsTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const theme = themeTokenMap[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontStyle);

  return (
    <div
      className={`bg-white text-slate-900 ${fontClass} p-8 text-[12.5px] leading-snug min-h-[1050px] flex flex-col justify-between`}
    >
      <div>
        {/* ATS-Standard Header */}
        <div className="text-center pb-3 border-b-2 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {data.name}
          </h1>
          <div className="text-sm font-semibold text-slate-800 mt-0.5">
            {data.title}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 text-xs text-slate-700 mt-1.5">
            <span>{data.location}</span>
            <span>•</span>
            <span>{data.workFormat}</span>
            <span>•</span>
            <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
              {data.phone}
            </a>
            <span>•</span>
            <a href={`mailto:${data.email}`} className="hover:underline">
              {data.email}
            </a>
            {data.showSalary && (
              <>
                <span>•</span>
                <span className="font-semibold text-slate-900">{data.salary}</span>
              </>
            )}
          </div>
        </div>

        {/* Sections in Linear ATS Order */}
        <div className="space-y-3.5 mt-3.5">
          {/* Section: Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              О себе
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed">
              {data.about}
            </p>
          </div>

          {/* Section: Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Навыки и стек
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="text-slate-400 select-none">•</span>
                  <span className="text-slate-800">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Опыт работы
            </h2>

            {data.experience.map((job) => (
              <div key={job.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900 text-xs">
                    {job.company} — <span className="font-semibold text-slate-800">{job.role}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600">
                    {job.period}
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 italic">
                  {job.specialization} | {job.location}
                </div>

                <ul className="space-y-1 mt-1 pl-1">
                  {job.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                      <span className="text-slate-400 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Образование
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600">, {edu.university} ({edu.faculty})</span>
                </div>
                <span className="text-[11px] text-slate-600 font-semibold">{edu.year}</span>
              </div>
            ))}
          </div>

          {/* Section: Courses */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Курсы и повышение квалификации
            </h2>
            <div className="space-y-1 text-xs">
              {data.courses.map((course) => (
                <div key={course.id} className="flex justify-between items-baseline">
                  <span className="text-slate-800">
                    <strong>{course.title}</strong> — {course.institution}, {course.direction}
                  </span>
                  <span className="text-[11px] text-slate-600 shrink-0 ml-2 font-medium">{course.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Additional (Compact single row at the bottom) */}
      <div className="pt-3 border-t border-slate-300 text-xs text-slate-700 flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="font-bold text-slate-900">Языки: </span>
          {data.languages.map((l) => `${l.language} — ${l.level}`).join('; ')}
        </div>
        <div>
          <span className="font-bold text-slate-900">Дополнительно: </span>
          {data.additionalInfo.join(', ')}
        </div>
      </div>
    </div>
  );
};
