import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import {
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  Cpu,
  Bot,
  GraduationCap,
  Sparkles,
  ArrowDown,
  Terminal,
  Car,
  FileText
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
  onDownloadHtml: () => void;
  onPrint: () => void;
  onSwitchToA4: () => void;
  onUpdatePhoto?: (newPhotoUrl: string) => void;
}

const sectionIds = [
  { id: 'section-cover', label: '01. Обложка' },
  { id: 'section-about', label: '02. О себе' },
  { id: 'section-experience', label: '03. Яндекс Крауд' },
  { id: 'section-skills', label: '04. Стек & QA' },
  { id: 'section-education', label: '05. Образование' },
  { id: 'section-contact', label: '06. Оффер & Контакты' },
];

export const ResumeLongread: React.FC<Props> = ({
  data,
  config,
  onDownloadHtml,
  onPrint,
  onSwitchToA4,
  onUpdatePhoto,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('section-cover');

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + container.clientHeight / 3;
      for (const item of sectionIds) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#111113] text-[#f2efeb] scroll-smooth"
    >
      {/* Top Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Right Pagination Dots (Sticky Longread Spy) */}
      <nav
        aria-label="Навигация по разделам"
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 p-2 bg-[#111113]/90 backdrop-blur border border-[#f2efeb]/20 rounded-full"
      >
        {sectionIds.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center justify-end p-1.5 focus:outline-none"
              title={item.label}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2 py-0.5 font-code text-[10px] text-[#111113] bg-[var(--accent)] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-[var(--accent)] scale-150 ring-2 ring-[var(--accent)]/40'
                    : 'bg-[#f2efeb]/30 group-hover:bg-[#f2efeb]/70'
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-24">
        {/* ========================================================
            PAGE 01: HERO & COVER
           ======================================================== */}
        <section
          id="section-cover"
          className="min-h-[85vh] flex flex-col justify-center relative border-b border-[#f2efeb]/15 pb-16 pt-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Meta indicator badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-code text-xs text-[var(--accent)] bg-[var(--ink-faint)] border border-[var(--accent)]/40 px-3 py-1 font-semibold">
                [01 // КАРТОЧКА СОИСКАТЕЛЯ]
              </span>
              <span className="font-code text-xs text-[#f2efeb]/60">
                JUNIOR QA · ТЕСТИРОВАНИЕ ИИ-ПРОДУКТОВ
              </span>
              {data.showSalary && (
                <span className="font-code text-xs text-[#111113] bg-[var(--accent)] px-2.5 py-0.5 font-bold">
                  {data.salary}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#f2efeb] leading-[0.95]">
                  {data.name}
                </h1>
                <p className="font-display text-lg sm:text-xl font-semibold text-[var(--accent)]">
                  {data.title}
                </p>

                <p className="text-sm text-[#f2efeb]/80 leading-relaxed max-w-lg">
                  Специалист с практическим опытом ручного тестирования диалоговых сценариев и оценки качества ответов голосового ассистента «Алиса» (Яндекс Крауд).
                </p>

                {/* Contacts Pills */}
                <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-code">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{data.location} · {data.workFormat}</span>
                  </div>
                  <a
                    href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{data.phone}</span>
                  </a>
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{data.email}</span>
                  </a>
                </div>
              </div>

              {/* Photo Frame */}
              {data.showPhoto && data.photoUrl && (
                <div className="md:col-span-5 flex justify-center md:justify-end">
                  <div className="relative group">
                    <label className="cursor-pointer block">
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const file = e.dataTransfer.files?.[0];
                          if (file && onUpdatePhoto) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              if (res) onUpdatePhoto(res);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-[#f2efeb] bg-[#111113] brutalist-shadow overflow-hidden relative"
                      >
                        <img
                          src={data.photoUrl}
                          alt={data.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {/* Hover Overlay with Upload Action */}
                        <div className="absolute inset-0 bg-[#111113]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <span className="font-code text-xs text-[var(--accent)] font-bold mb-1">
                            [ЗАМЕНИТЬ ФОТОГРАФИЮ]
                          </span>
                          <span className="text-[11px] text-[#f2efeb]/90 leading-snug">
                            Нажмите или перетащите файл с компьютера
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && onUpdatePhoto) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              if (res) onUpdatePhoto(res);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <div className="absolute -bottom-3 -left-3 bg-[#111113] border border-[var(--accent)] px-2.5 py-1 font-code text-[10px] text-[var(--accent)] font-bold pointer-events-none">
                      VERIFIED QA // OLEG
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scroll Down Prompt */}
            <div className="pt-8 flex items-center justify-between">
              <button
                onClick={() => scrollToSection('section-about')}
                className="flex items-center gap-2 font-code text-xs text-[var(--accent)] hover:underline cursor-pointer group"
              >
                <span>ЧИТАТЬ ПОДРОБНЕЕ О ПРОФИЛЕ</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSwitchToA4}
                  className="px-3 py-1.5 font-code text-xs border border-[#f2efeb]/40 hover:border-[#f2efeb] text-[#f2efeb] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Печатный лист A4</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PAGE 02: ABOUT & PHILOSOPHY
           ======================================================== */}
        <section
          id="section-about"
          className="min-h-[75vh] flex flex-col justify-center border-b border-[#f2efeb]/15 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="font-code text-xs text-[var(--accent)]">
                [02 // О СЕБЕ & ПОДХОД К ТЕСТИРОВАНИЮ]
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#f2efeb]">
                ВНИМАНИЕ К ДЕТАЛЯМ И ОЦЕНКА КАЧЕСТВА ИИ
              </h2>
            </div>

            <div className="p-6 bg-[var(--ink-faint)] border-l-4 border-[var(--accent)] space-y-4">
              <p className="text-base sm:text-lg text-[#f2efeb] leading-relaxed text-justify font-light">
                {data.about}
              </p>
            </div>

            {/* Core Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 border border-[#f2efeb]/20 bg-[#111113] space-y-1.5">
                <div className="font-display text-3xl font-extrabold text-[var(--accent)]">
                  1+ ГОД
                </div>
                <div className="font-code text-xs text-[#f2efeb] font-semibold">
                  Опыт тестирования
                </div>
                <div className="text-xs text-[#f2efeb]/60">
                  Более года ручной оценки диалоговых сценариев голосового ассистента в Яндексе
                </div>
              </div>

              <div className="p-5 border border-[#f2efeb]/20 bg-[#111113] space-y-1.5">
                <div className="font-display text-3xl font-extrabold text-[#f2efeb]">
                  HIGH VOL
                </div>
                <div className="font-code text-xs text-[#f2efeb] font-semibold">
                  Большие объемы данных
                </div>
                <div className="text-xs text-[#f2efeb]/60">
                  Ежедневный регресс и валидация сотен кейсов с сохранением концентрации
                </div>
              </div>

              <div className="p-5 border border-[#f2efeb]/20 bg-[#111113] space-y-1.5">
                <div className="font-display text-3xl font-extrabold text-[var(--accent)]">
                  AI READY
                </div>
                <div className="font-code text-xs text-[#f2efeb] font-semibold">
                  ChatGPT, Claude, Python
                </div>
                <div className="text-xs text-[#f2efeb]/60">
                  Регулярное использование ИИ-инструментов в работе и знание основ Python
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PAGE 03: YANDEX CROWD / ALICE EXPERIENCE
           ======================================================== */}
        <section
          id="section-experience"
          className="min-h-[85vh] flex flex-col justify-center border-b border-[#f2efeb]/15 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="space-y-2">
                <div className="font-code text-xs text-[var(--accent)]">
                  [03 // ФЛАГМАНСКИЙ ОПЫТ РАБОТЫ]
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#f2efeb]">
                  ЯНДЕКС КРАУД — ГОЛОСОВОЙ АССИСТЕНТ «АЛИСА»
                </h2>
              </div>
              <span className="font-code text-xs text-[var(--accent)] bg-[var(--ink-faint)] border border-[var(--accent)]/40 px-3 py-1">
                ИЮНЬ 2022 — АВГУСТ 2023 (1 ГОД 3 МЕСЯЦА)
              </span>
            </div>

            <div className="p-6 border border-[#f2efeb]/20 bg-[#111113] space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#f2efeb]/15 pb-4">
                <div>
                  <div className="font-display text-xl font-bold text-[#f2efeb]">
                    Ассесор 2-й категории
                  </div>
                  <div className="font-code text-xs text-[var(--accent)] mt-0.5">
                    Оценка и тестирование ответов ИИ-ассистента · Москва (удаленно)
                  </div>
                </div>
                <div className="font-code text-xs text-[#f2efeb]/60">
                  ЯНДЕКС КРАУД
                </div>
              </div>

              {/* Highlight list */}
              <div className="space-y-4">
                <div className="font-code text-xs text-[#f2efeb]/70 uppercase tracking-wider">
                  Ключевые обязанности и достижения:
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {data.experience[0]?.highlights.map((bullet, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="p-3.5 bg-[var(--ink-faint)] border border-[#f2efeb]/10 flex items-start gap-3"
                    >
                      <span className="font-code text-[var(--accent)] font-bold text-xs mt-0.5">
                        0{idx + 1}.
                      </span>
                      <p className="text-sm text-[#f2efeb]/90 leading-relaxed">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* QA Context Box */}
              <div className="p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/30 rounded flex items-start gap-3 text-xs text-[#f2efeb]/80">
                <Bot className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--accent)] font-code">QA-значение данного опыта:</strong>
                  <p className="mt-1 leading-relaxed">
                    Проверка соответствия ответов строгим оракулам гайдлайнов, валидация контекста диалога, выявление логических галлюцинаций моделей и краевых условий (edge cases) при высоких требованиях к точности (KPI).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PAGE 04: SKILLS & QA STACK
           ======================================================== */}
        <section
          id="section-skills"
          className="min-h-[85vh] flex flex-col justify-center border-b border-[#f2efeb]/15 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="font-code text-xs text-[var(--accent)]">
                [04 // СТЕК & КОМПЕТЕНЦИИ]
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#f2efeb]">
                НАВЫКИ И ТЕХНОЛОГИЧЕСКИЙ АРСЕНАЛ
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill, idx) => {
                const isAi =
                  skill.includes('ИИ') ||
                  skill.includes('ChatGPT') ||
                  skill.includes('Python');
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className={`p-4 border transition-all ${
                      isAi
                        ? 'border-[var(--accent)] bg-[var(--ink-faint)]'
                        : 'border-[#f2efeb]/20 bg-[#111113] hover:border-[#f2efeb]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-code text-[10px] text-[#f2efeb]/50">
                        SKILL_0{idx + 1}
                      </span>
                      {isAi && (
                        <span className="font-code text-[9px] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded font-bold">
                          AI FOCUS
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-sm text-[#f2efeb] mt-2">
                      {skill}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Extra Technical Group */}
            <div className="p-4 bg-[var(--ink-faint)] border border-[#f2efeb]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-code">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent)]" />
                <span>ДОПОЛНИТЕЛЬНО:</span>
                <span className="text-[var(--accent)]">Языки: {data.languages.map(l => `${l.language} (${l.level})`).join(', ')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#f2efeb]/70">
                <Car className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Права категории B</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PAGE 05: EDUCATION & COURSES
           ======================================================== */}
        <section
          id="section-education"
          className="min-h-[75vh] flex flex-col justify-center border-b border-[#f2efeb]/15 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="font-code text-xs text-[var(--accent)]">
                [05 // ОБРАЗОВАНИЕ & КВАЛИФИКАЦИЯ]
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#f2efeb]">
                ВЫСШЕЕ ОБРАЗОВАНИЕ И СПЕЦИАЛЬНЫЕ КУРСЫ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Higher Education */}
              <div className="p-6 border border-[#f2efeb]/20 bg-[#111113] space-y-4">
                <div className="flex items-center gap-2 text-xs font-code text-[var(--accent)]">
                  <GraduationCap className="w-4 h-4" />
                  <span>БАЗОВОЕ ОБРАЗОВАНИЕ</span>
                </div>

                {data.education.map((edu) => (
                  <div key={edu.id} className="space-y-1.5">
                    <div className="font-display text-lg font-bold text-[#f2efeb]">
                      {edu.degree}
                    </div>
                    <div className="text-sm text-[#f2efeb]/80">
                      {edu.university}
                    </div>
                    <div className="text-xs text-[#f2efeb]/60">
                      {edu.faculty}
                    </div>
                    <div className="font-code text-xs text-[var(--accent)] pt-2 font-bold">
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>

              {/* Courses: HSE Data & Python */}
              <div className="p-6 border border-[#f2efeb]/20 bg-[#111113] space-y-4">
                <div className="flex items-center gap-2 text-xs font-code text-[var(--accent)]">
                  <Sparkles className="w-4 h-4" />
                  <span>КУРСЫ И СПЕЦИАЛИЗАЦИЯ</span>
                </div>

                <div className="space-y-4">
                  {data.courses.map((course) => (
                    <div key={course.id} className="p-3 bg-[var(--ink-faint)] border border-[#f2efeb]/10 space-y-1">
                      <div className="font-bold text-xs text-[#f2efeb]">
                        {course.title}
                      </div>
                      <div className="text-[11px] text-[#f2efeb]/70">
                        {course.institution} · <span className="text-[var(--accent)]">{course.direction}</span> ({course.year})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            PAGE 06: CONTACTS & FINAL OFFER
           ======================================================== */}
        <section
          id="section-contact"
          className="min-h-[80vh] flex flex-col justify-center pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="font-code text-xs text-[var(--accent)]">
                [06 // КОНТАКТЫ & СВЯЗЬ]
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#f2efeb]">
                ГОТОВ К НОВЫМ QA-ЗАДАЧАМ
              </h2>
            </div>

            <div className="p-8 border-2 border-[var(--accent)] bg-[#111113] brutalist-shadow space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f2efeb]/20 pb-6">
                <div>
                  <div className="font-display text-2xl font-bold text-[#f2efeb]">
                    {data.name}
                  </div>
                  <div className="font-code text-sm text-[var(--accent)] mt-1">
                    {data.title}
                  </div>
                </div>

                {data.showSalary && (
                  <div className="font-display text-xl font-extrabold text-[#111113] bg-[var(--accent)] px-4 py-2 text-center">
                    {data.salary}
                  </div>
                )}
              </div>

              {/* Direct clickable contact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-code text-xs">
                <a
                  href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`}
                  className="p-3.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-2.5"
                >
                  <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#f2efeb]/50">ТЕЛЕФОН</div>
                    <div>{data.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="p-3.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-2.5"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#f2efeb]/50">EMAIL</div>
                    <div className="truncate">{data.email}</div>
                  </div>
                </a>

                <div className="p-3.5 bg-[var(--ink-faint)] border border-[#f2efeb]/20 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#f2efeb]/50">ЛОКАЦИЯ</div>
                    <div>{data.location} (Удаленно)</div>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onDownloadHtml}
                    className="px-6 py-3 font-display font-extrabold text-sm text-[#111113] bg-[var(--accent)] hover:opacity-90 transition-all uppercase cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать резюме (.HTML)</span>
                  </button>

                  <button
                    onClick={onPrint}
                    className="px-5 py-3 font-display font-extrabold text-sm text-[#f2efeb] bg-transparent border border-[#f2efeb] hover:bg-[#f2efeb] hover:text-[#111113] transition-all uppercase cursor-pointer flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Печать / В PDF</span>
                  </button>
                </div>

                <button
                  onClick={onSwitchToA4}
                  className="font-code text-xs text-[var(--accent)] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Переключиться на 1-страничный лист A4 &rarr;</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
