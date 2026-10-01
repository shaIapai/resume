import { ResumeData, ResumeConfig } from '../types/resume';
import { themeTokenMap } from './themeStyles';

export function generateStandaloneHtml(data: ResumeData, config: ResumeConfig): string {
  const theme = themeTokenMap[config.colorTheme];
  const templateName = {
    'modern-tech': 'Modern Tech',
    'executive-split': 'Executive Two-Column',
    'swiss-minimal': 'Swiss Minimalist',
    'ai-terminal': 'AI & QA Terminal',
    'compact-ats': 'Strict 1-Page ATS'
  }[config.template];

  // Base font family
  const fontCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #1e293b;
      line-height: 1.5;
      padding: 24px 16px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .resume-page {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      overflow: hidden;
      min-height: 1050px;
    }

    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .resume-page {
        box-shadow: none !important;
        border: none !important;
        max-width: 100% !important;
        min-height: auto !important;
      }
      @page {
        size: A4;
        margin: 10mm;
      }
    }
  `;

  // Render specific template markup
  let templateBody = '';

  if (config.template === 'executive-split') {
    templateBody = `
      <div style="display: flex; min-height: 1050px;">
        <!-- Left Sidebar -->
        <div style="width: 32%; background-color: ${theme.cardBg}; border-right: 1px solid ${theme.border}; padding: 28px 20px; font-size: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            ${data.showPhoto && data.photoUrl ? `
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="${data.photoUrl}" alt="${data.name}" style="width: 110px; height: 110px; object-fit: cover; border-radius: 12px; border: 2px solid ${theme.accentBorder};" />
              </div>
            ` : ''}

            <!-- Contacts -->
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; border-bottom: 1px solid ${theme.border}; padding-bottom: 4px; margin-bottom: 8px;">
                Контакты
              </h3>
              <p style="margin-bottom: 6px;">📍 ${data.location}</p>
              <p style="margin-bottom: 6px;">💼 ${data.workFormat}</p>
              <p style="margin-bottom: 6px;">📞 <a href="tel:${data.phone.replace(/[^0-9+]/g, '')}" style="color: inherit; text-decoration: none;">${data.phone}</a></p>
              <p style="margin-bottom: 6px;">✉️ <a href="mailto:${data.email}" style="color: inherit; text-decoration: none;">${data.email}</a></p>
            </div>

            <!-- Skills -->
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; border-bottom: 1px solid ${theme.border}; padding-bottom: 4px; margin-bottom: 8px;">
                Навыки
              </h3>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${data.skills.map(s => `<span style="display: inline-block; background: ${theme.badgeBg}; color: ${theme.badgeText}; border: 1px solid ${theme.border}; padding: 3px 6px; border-radius: 3px; font-size: 10.5px; font-weight: 500;">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Education -->
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; border-bottom: 1px solid ${theme.border}; padding-bottom: 4px; margin-bottom: 8px;">
                Образование
              </h3>
              ${data.education.map(e => `
                <div style="margin-bottom: 6px;">
                  <strong style="color: ${theme.headerText};">${e.degree}</strong><br/>
                  <span style="color: #64748b; font-size: 11px;">${e.university}</span><br/>
                  <span style="color: #64748b; font-size: 10.5px;">${e.faculty}</span><br/>
                  <span style="color: ${theme.accentText}; font-size: 10.5px; font-weight: 600;">${e.year}</span>
                </div>
              `).join('')}
            </div>

            <!-- Languages -->
            <div>
              <h3 style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; border-bottom: 1px solid ${theme.border}; padding-bottom: 4px; margin-bottom: 8px;">
                Языки
              </h3>
              ${data.languages.map(l => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <strong>${l.language}</strong>
                  <span style="color: #64748b;">${l.level}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="border-top: 1px solid ${theme.border}; padding-top: 12px; font-size: 11px; color: #64748b;">
            🚘 Права категории B
          </div>
        </div>

        <!-- Right Main -->
        <div style="width: 68%; padding: 32px 28px; font-size: 13px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <!-- Header -->
            <div style="border-bottom: 1px solid ${theme.border}; padding-bottom: 14px; margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h1 style="font-size: 26px; font-weight: 800; color: ${theme.headerText}; letter-spacing: -0.5px;">${data.name}</h1>
                ${data.showSalary ? `<span style="font-size: 12px; font-weight: 700; color: ${theme.accentText}; background: ${theme.accentBg}; padding: 2px 8px; border-radius: 4px;">${data.salary}</span>` : ''}
              </div>
              <h2 style="font-size: 15px; font-weight: 600; color: ${theme.accent}; margin-top: 4px;">${data.title}</h2>
            </div>

            <!-- About -->
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; margin-bottom: 6px;">О себе</h3>
              <p style="color: #334155; line-height: 1.6; text-align: justify;">${data.about}</p>
            </div>

            <!-- Experience -->
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; margin-bottom: 8px;">Опыт работы</h3>
              ${data.experience.map(j => `
                <div style="border-left: 2px solid ${theme.accent}; padding-left: 12px; margin-bottom: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-weight: 700; font-size: 14px; color: #0f172a;">${j.company} — <span style="color: ${theme.accent}; font-weight: 600;">${j.role}</span></span>
                    <span style="font-size: 11px; color: #64748b; font-weight: 500;">${j.period}</span>
                  </div>
                  <div style="font-size: 11.5px; color: #64748b; font-style: italic; margin-top: 2px;">${j.specialization} · ${j.location}</div>
                  <ul style="margin-top: 8px; padding-left: 14px; color: #334155; line-height: 1.5; font-size: 12.5px;">
                    ${j.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>

            <!-- Courses -->
            <div>
              <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: ${theme.headerText}; margin-bottom: 8px;">Курсы и повышение квалификации</h3>
              ${data.courses.map(c => `
                <div style="background: ${theme.cardBg}; border: 1px solid ${theme.border}; border-radius: 4px; padding: 8px 10px; margin-bottom: 6px; font-size: 11.5px;">
                  <strong style="color: #0f172a;">${c.title}</strong><br/>
                  <span style="color: #64748b;">${c.institution} · ${c.direction} (${c.year})</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="border-top: 1px solid ${theme.border}; padding-top: 10px; font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
            <span>Готов к работе: Удалённо / Санкт-Петербург</span>
            <span>Junior QA Tester</span>
          </div>
        </div>
      </div>
    `;
  } else if (config.template === 'swiss-minimal') {
    templateBody = `
      <div style="padding: 36px 32px; font-size: 13px; line-height: 1.6;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 4px;">CURRICULUM VITAE // QA</div>
              <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; color: #0f172a;">${data.name}</h1>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 4px;">
                <span style="font-size: 16px; font-weight: 500; color: #334155;">${data.title}</span>
                ${data.showSalary ? `<span style="font-family: monospace; font-size: 11px; border: 1px solid #cbd5e1; padding: 2px 6px;">${data.salary}</span>` : ''}
              </div>
            </div>
            ${data.showPhoto && data.photoUrl ? `
              <img src="${data.photoUrl}" alt="${data.name}" style="width: 85px; height: 85px; object-fit: cover; filter: grayscale(100%); border: 1px solid #0f172a;" />
            ` : ''}
          </div>
          <div style="font-family: monospace; font-size: 11px; color: #475569; margin-top: 12px;">
            ${data.location} / ${data.workFormat} / <a href="tel:${data.phone.replace(/[^0-9+]/g, '')}" style="color: inherit;">${data.phone}</a> / <a href="mailto:${data.email}" style="color: inherit;">${data.email}</a>
          </div>
        </div>

        <!-- Section 1: About -->
        <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
          <div style="width: 25%; font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8;">01. О себе</div>
          <div style="width: 75%; color: #1e293b; text-align: justify;">${data.about}</div>
        </div>

        <!-- Section 2: Skills -->
        <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
          <div style="width: 25%; font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8;">02. Навыки</div>
          <div style="width: 75%; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px;">
            ${data.skills.map((s, i) => `<div><span style="font-family: monospace; color: #94a3b8;">[${i+1 < 10 ? '0'+(i+1) : i+1}]</span> ${s}</div>`).join('')}
          </div>
        </div>

        <!-- Section 3: Experience -->
        <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
          <div style="width: 25%; font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8;">03. Опыт</div>
          <div style="width: 75%;">
            ${data.experience.map(j => `
              <div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #0f172a;">
                  <span>${j.company} · ${j.role}</span>
                  <span style="font-family: monospace; font-size: 11px; color: #64748b;">${j.period}</span>
                </div>
                <div style="font-size: 11.5px; color: #64748b; font-style: italic; margin-bottom: 6px;">${j.specialization} — ${j.location}</div>
                <ul style="padding-left: 14px; font-size: 12px; color: #334155;">
                  ${j.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 4: Education & Courses -->
        <div style="display: flex; margin-bottom: 20px;">
          <div style="width: 25%; font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8;">04. Образование</div>
          <div style="width: 75%; font-size: 12px;">
            ${data.education.map(e => `
              <div style="margin-bottom: 8px;">
                <strong style="color: #0f172a;">${e.degree}</strong><br/>
                <span>${e.university} (${e.faculty})</span> · <span style="font-family: monospace; color: #64748b;">${e.year}</span>
              </div>
            `).join('')}
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 8px;">
              <span style="font-family: monospace; font-size: 10.5px; color: #94a3b8; text-transform: uppercase;">Повышение квалификации:</span>
              ${data.courses.map(c => `
                <div style="margin-top: 4px;"><strong>${c.title}</strong> — ${c.institution} (${c.year})</div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #0f172a; padding-top: 12px; margin-top: 20px; display: flex; justify-content: space-between; font-family: monospace; font-size: 11px; color: #64748b;">
          <span>ЯЗЫКИ: ${data.languages.map(l => `${l.language} (${l.level})`).join(' · ')}</span>
          <span>ПРАВА: КАТЕГОРИЯ B · САНКТ-ПЕТЕРБУРГ</span>
        </div>
      </div>
    `;
  } else {
    // Default: Modern Tech & Compact ATS
    templateBody = `
      <div style="padding: 36px 32px; font-size: 13px; line-height: 1.55;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid ${theme.border}; padding-bottom: 20px; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${data.name}</h1>
              ${data.showSalary ? `<span style="font-size: 12px; font-weight: 600; color: ${theme.accentText}; background: ${theme.accentBg}; padding: 3px 8px; border-radius: 4px;">${data.salary}</span>` : ''}
            </div>
            <h2 style="font-size: 16px; font-weight: 600; color: ${theme.accent}; margin-top: 4px;">${data.title}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; font-size: 12px; color: #475569;">
              <span>📍 ${data.location} · ${data.workFormat}</span>
              <span>|</span>
              <span>📞 <a href="tel:${data.phone.replace(/[^0-9+]/g, '')}" style="color: inherit; text-decoration: none;">${data.phone}</a></span>
              <span>|</span>
              <span>✉️ <a href="mailto:${data.email}" style="color: inherit; text-decoration: none;">${data.email}</a></span>
            </div>
          </div>
          ${data.showPhoto && data.photoUrl ? `
            <img src="${data.photoUrl}" alt="${data.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; border: 2px solid ${theme.border};" />
          ` : ''}
        </div>

        <!-- Section: About -->
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${theme.headerText}; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${theme.accent};"></span> О себе
          </h3>
          <p style="color: #334155; line-height: 1.6; text-align: justify;">${data.about}</p>
        </div>

        <!-- Section: Skills -->
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${theme.headerText}; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${theme.accent};"></span> Навыки и компетенции
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px;">
            ${data.skills.map(s => `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: ${theme.accent}; font-weight: bold;">•</span> <span style="color: #334155;">${s}</span></div>`).join('')}
          </div>
        </div>

        <!-- Section: Experience -->
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${theme.headerText}; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${theme.accent};"></span> Опыт работы
          </h3>
          ${data.experience.map(j => `
            <div style="background: ${theme.cardBg}; border: 1px solid ${theme.border}; border-radius: 6px; padding: 12px 14px; margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 700; font-size: 14px; color: #0f172a;">${j.company} — <span style="color: ${theme.accent};">${j.role}</span></span>
                <span style="font-size: 11.5px; color: #64748b; font-weight: 500;">${j.period}</span>
              </div>
              <div style="font-size: 11.5px; color: #64748b; font-style: italic; margin-top: 2px;">${j.specialization} · ${j.location}</div>
              <ul style="margin-top: 8px; padding-left: 16px; color: #334155; font-size: 12px; line-height: 1.5;">
                ${j.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Section: Two columns for Education & Courses -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${theme.headerText}; margin-bottom: 6px;">Образование</h3>
            ${data.education.map(e => `
              <div style="font-size: 12px;">
                <strong style="color: #0f172a;">${e.degree}</strong><br/>
                <span style="color: #475569;">${e.university}</span><br/>
                <span style="color: #64748b; font-size: 11px;">${e.faculty}</span><br/>
                <span style="color: ${theme.accentText}; font-weight: 600; font-size: 11px;">${e.year}</span>
              </div>
            `).join('')}
          </div>

          <div>
            <h3 style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${theme.headerText}; margin-bottom: 6px;">Повышение квалификации</h3>
            <div style="font-size: 11.5px;">
              ${data.courses.map(c => `
                <div style="margin-bottom: 6px;">
                  <strong style="color: #0f172a;">${c.title}</strong><br/>
                  <span style="color: #64748b;">${c.institution} · ${c.direction} (${c.year})</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer: Additional Info (Languages, License) - 1 Page Fit! -->
        <div style="border-top: 1px solid ${theme.border}; padding-top: 12px; display: flex; justify-content: space-between; font-size: 11.5px; color: #475569;">
          <div>
            <strong>Языки:</strong> ${data.languages.map(l => `${l.language}: ${l.level}`).join(' · ')}
          </div>
          <div>
            ${data.additionalInfo[0]}
          </div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Резюме — ${data.name} | ${data.title}</title>
  <style>
    ${fontCss}
  </style>
</head>
<body>
  <div class="resume-page">
    ${templateBody}
  </div>
</body>
</html>`;
}

export function downloadHtmlFile(htmlContent: string, fileName: string = 'Oleg_Stroykov_QA_Resume.html') {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
