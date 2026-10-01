import { ColorTheme, FontStyle, Density } from '../types/resume';

export interface ThemeTokens {
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  headerText: string;
  subText: string;
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  border: string;
}

export const themeTokenMap: Record<ColorTheme, ThemeTokens> = {
  'slate-indigo': {
    accent: '#4f46e5',
    accentBg: '#eef2ff',
    accentBorder: '#c7d2fe',
    accentText: '#4338ca',
    headerText: '#0f172a',
    subText: '#475569',
    cardBg: '#f8fafc',
    badgeBg: '#f1f5f9',
    badgeText: '#334155',
    border: '#e2e8f0'
  },
  'graphite-monochrome': {
    accent: '#18181b',
    accentBg: '#f4f4f5',
    accentBorder: '#d4d4d8',
    accentText: '#18181b',
    headerText: '#18181b',
    subText: '#52525b',
    cardBg: '#fafafa',
    badgeBg: '#f4f4f5',
    badgeText: '#27272a',
    border: '#e4e4e7'
  },
  'emerald-clean': {
    accent: '#059669',
    accentBg: '#ecfdf5',
    accentBorder: '#a7f3d0',
    accentText: '#047857',
    headerText: '#0f172a',
    subText: '#475569',
    cardBg: '#f8fafc',
    badgeBg: '#ecfdf5',
    badgeText: '#065f46',
    border: '#e2e8f0'
  },
  'nordic-navy': {
    accent: '#0284c7',
    accentBg: '#f0f9ff',
    accentBorder: '#bae6fd',
    accentText: '#0369a1',
    headerText: '#0f172a',
    subText: '#334155',
    cardBg: '#f8fafc',
    badgeBg: '#f0f9ff',
    badgeText: '#075985',
    border: '#e2e8f0'
  },
  'amber-warm': {
    accent: '#d97706',
    accentBg: '#fffbeb',
    accentBorder: '#fde68a',
    accentText: '#b45309',
    headerText: '#1c1917',
    subText: '#57534e',
    cardBg: '#fafaf9',
    badgeBg: '#fef3c7',
    badgeText: '#78350f',
    border: '#e7e5e4'
  }
};

export const getFontFamilyClass = (font: FontStyle) => {
  switch (font) {
    case 'jakarta':
      return 'font-["Plus_Jakarta_Sans",sans-serif]';
    case 'fira':
      return 'font-["Fira_Code",monospace]';
    case 'inter':
    default:
      return 'font-["Inter",sans-serif]';
  }
};

export const getDensitySpacing = (density: Density) => {
  switch (density) {
    case 'ultra-compact':
      return {
        sectionGap: 'space-y-3',
        itemGap: 'space-y-1.5',
        padding: 'p-6',
        fontSize: 'text-xs',
        headingSize: 'text-xs font-bold uppercase tracking-wider',
        bulletGap: 'space-y-0.5'
      };
    case 'compact':
      return {
        sectionGap: 'space-y-4',
        itemGap: 'space-y-2',
        padding: 'p-8',
        fontSize: 'text-[13px]',
        headingSize: 'text-sm font-bold uppercase tracking-wider',
        bulletGap: 'space-y-1'
      };
    case 'comfortable':
    default:
      return {
        sectionGap: 'space-y-6',
        itemGap: 'space-y-3',
        padding: 'p-10',
        fontSize: 'text-sm',
        headingSize: 'text-sm font-bold uppercase tracking-wide',
        bulletGap: 'space-y-1.5'
      };
  }
};
