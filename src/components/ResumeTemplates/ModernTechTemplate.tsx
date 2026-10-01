import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { themeTokenMap, getFontFamilyClass, getDensitySpacing } from '../../utils/themeStyles';
import { Mail, Phone, MapPin, Briefcase, Award, GraduationCap, CheckCircle2, DollarSign } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const ModernTechTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const theme = themeTokenMap[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontStyle);
  const spacing = getDensitySpacing(config.density);

  return (
    <div
      className={`bg-white text-slate-800 ${fontClass} ${spacing.padding} ${spacing.fontSize} leading-relaxed shadow-sm min-h-[1050px] flex flex-col justify-between`}
      style={{
        borderColor: theme.border,
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-6 pb-6 border-b" style={{ borderColor: theme.border }}>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {data.name}
              </h1>
              {data.showSalary && (
                <span
                  className="px-2.5 py-0.5 text-xs font-semibold rounded-md flex items-center gap-1"
                  style={{ backgroundColor: theme.accentBg, color: theme.accentText }}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  {data.salary}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg font-semibold mt-1" style={{ color: theme.accent }}>
              {data.title}
            </p>

            {/* Contacts Bar */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-3 text-xs sm:text-[13px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {data.location} · {data.workFormat}
              </span>
              <span className="text-slate-300">|</span>
              <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {data.phone}
              </a>
              <span className="text-slate-300">|</span>
              <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {data.email}
              </a>
            </div>
          </div>

          {data.showPhoto && data.photoUrl && (
            <div className="shrink-0">
              <img
                src={data.photoUrl}
                alt={data.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border-2 shadow-sm"
                style={{ borderColor: theme.border }}
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className={`mt-5 ${spacing.sectionGap}`}>
          {/* Summary / About */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
                О себе
              </h2>
            </div>
            <p className="text-slate-700 text-justify leading-relaxed">
              {data.about}
            </p>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
                Ключевые навыки
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent }} />
                  <span className="text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
                Опыт работы
              </h2>
            </div>

            <div className={spacing.itemGap}>
              {data.experience.map((job) => (
                <div key={job.id} className="p-3.5 rounded-lg border" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {job.company}
                      </span>
                      <span className="text-slate-400 mx-1.5">—</span>
                      <span className="font-semibold" style={{ color: theme.accent }}>
                        {job.role}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {job.period}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-0.5">
                    {job.specialization} · {job.location}
                  </div>

                  <ul className={`mt-2.5 ${spacing.bulletGap}`}>
                    {job.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: theme.accent }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Two Columns: Education & Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4" style={{ color: theme.accent }} />
                <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
                  Образование
                </h2>
              </div>
              {data.education.map((edu) => (
                <div key={edu.id} className="text-slate-700">
                  <div className="font-semibold text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{edu.university}</div>
                  <div className="text-xs text-slate-500">{edu.faculty}</div>
                  <div className="text-xs font-medium mt-1" style={{ color: theme.accentText }}>
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>

            {/* Courses */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4" style={{ color: theme.accent }} />
                <h2 className={spacing.headingSize} style={{ color: theme.headerText }}>
                  Повышение квалификации
                </h2>
              </div>
              <div className="space-y-2">
                {data.courses.map((course) => (
                  <div key={course.id} className="text-xs">
                    <div className="font-semibold text-slate-800 leading-snug">{course.title}</div>
                    <div className="text-slate-600 mt-0.5">
                      {course.institution} · <span className="text-slate-500">{course.direction}</span> ({course.year})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Additional Info (Languages & License) - Solves the 2nd page overflow! */}
      <div className="pt-4 mt-4 border-t flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-800">Языки:</span>
          {data.languages.map((l, i) => (
            <span key={i}>
              <strong className="text-slate-700">{l.language}</strong>: {l.level}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>{data.additionalInfo[0]}</span>
        </div>
      </div>
    </div>
  );
};
