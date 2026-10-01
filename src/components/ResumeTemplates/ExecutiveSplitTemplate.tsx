import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { themeTokenMap, getFontFamilyClass, getDensitySpacing } from '../../utils/themeStyles';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Globe, Car, Check } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const ExecutiveSplitTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const theme = themeTokenMap[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontStyle);
  const spacing = getDensitySpacing(config.density);

  return (
    <div
      className={`bg-white text-slate-800 ${fontClass} shadow-sm min-h-[1050px] flex flex-col md:flex-row overflow-hidden border`}
      style={{ borderColor: theme.border }}
    >
      {/* Left Sidebar */}
      <div
        className="w-full md:w-[32%] p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border
        }}
      >
        <div className="space-y-5">
          {/* Photo & Contacts */}
          {data.showPhoto && data.photoUrl && (
            <div className="flex justify-center mb-2">
              <img
                src={data.photoUrl}
                alt={data.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-sm border-2"
                style={{ borderColor: theme.accentBorder }}
              />
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: theme.headerText, borderColor: theme.border }}
            >
              Контакты
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
                <span>{data.workFormat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
                <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-slate-900 transition-colors">
                  {data.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
                <a href={`mailto:${data.email}`} className="hover:text-slate-900 truncate transition-colors">
                  {data.email}
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: theme.headerText, borderColor: theme.border }}
            >
              Навыки
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded text-[11px] leading-tight font-medium"
                  style={{
                    backgroundColor: theme.badgeBg,
                    color: theme.badgeText,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education in sidebar */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: theme.headerText, borderColor: theme.border }}
            >
              Образование
            </h3>
            {data.education.map((edu) => (
              <div key={edu.id} className="text-xs space-y-0.5">
                <div className="font-semibold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600 leading-tight">{edu.university}</div>
                <div className="text-slate-500 text-[11px]">{edu.faculty}</div>
                <div className="text-[11px] font-medium" style={{ color: theme.accentText }}>
                  {edu.year}
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: theme.headerText, borderColor: theme.border }}
            >
              Языки
            </h3>
            <div className="space-y-1 text-xs">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-slate-500 text-[11px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Info bottom of sidebar */}
        <div className="pt-4 mt-4 border-t text-[11px] text-slate-500 space-y-1" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
            <span>Права категории B</span>
          </div>
        </div>
      </div>

      {/* Right Column: Main Content */}
      <div className={`w-full md:w-[68%] p-6 sm:p-8 flex flex-col justify-between ${spacing.fontSize}`}>
        <div className={spacing.sectionGap}>
          {/* Header Title & Name */}
          <div className="pb-4 border-b" style={{ borderColor: theme.border }}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data.name}
              </h1>
              {data.showSalary && (
                <span
                  className="px-2.5 py-0.5 text-xs font-bold rounded"
                  style={{ backgroundColor: theme.accentBg, color: theme.accentText }}
                >
                  {data.salary}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-semibold mt-1" style={{ color: theme.accent }}>
              {data.title}
            </p>
          </div>

          {/* Summary */}
          <div>
            <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
              О себе
            </h2>
            <p className="mt-1.5 text-slate-700 text-justify leading-relaxed">
              {data.about}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
              Опыт работы
            </h2>

            <div className={`mt-2 ${spacing.itemGap}`}>
              {data.experience.map((job) => (
                <div key={job.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.accent }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="font-bold text-slate-900 text-sm">
                      {job.company} — <span className="font-semibold" style={{ color: theme.accent }}>{job.role}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    {job.specialization} · {job.location}
                  </div>
                  <ul className={`mt-2 ${spacing.bulletGap}`}>
                    {job.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: theme.accent }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Training */}
          <div>
            <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
              Курсы и повышение квалификации
            </h2>
            <div className="mt-2 space-y-2">
              {data.courses.map((course) => (
                <div key={course.id} className="p-2.5 rounded border text-xs" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
                  <div className="font-semibold text-slate-900">{course.title}</div>
                  <div className="text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-2">
                    <span>{course.institution}</span>
                    <span>·</span>
                    <span className="text-slate-500">{course.direction}</span>
                    <span className="font-semibold" style={{ color: theme.accentText }}>({course.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="pt-3 mt-4 border-t text-[11px] text-slate-400 flex justify-between items-center" style={{ borderColor: theme.border }}>
          <span>Готов к быстрому выходу на работу</span>
          <span>Junior QA / LLM Evaluation Specialist</span>
        </div>
      </div>
    </div>
  );
};
