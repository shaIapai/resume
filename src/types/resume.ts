export interface JobExperience {
  id: string;
  company: string;
  role: string;
  specialization: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  faculty: string;
  university: string;
  year: string;
}

export interface CourseItem {
  id: string;
  title: string;
  institution: string;
  direction: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  workFormat: string;
  phone: string;
  email: string;
  telegram?: string;
  salary: string;
  showSalary: boolean;
  photoUrl: string;
  showPhoto: boolean;
  about: string;
  skills: string[];
  experience: JobExperience[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: { language: string; level: string }[];
  additionalInfo: string[];
}

export type TemplateId = 
  | 'modern-tech' 
  | 'executive-split' 
  | 'swiss-minimal' 
  | 'ai-terminal' 
  | 'compact-ats';

export type ColorTheme = 
  | 'slate-indigo' 
  | 'graphite-monochrome' 
  | 'emerald-clean' 
  | 'nordic-navy' 
  | 'amber-warm';

export type FontStyle = 'inter' | 'jakarta' | 'fira';

export type Density = 'comfortable' | 'compact' | 'ultra-compact';

export interface ResumeConfig {
  template: TemplateId;
  colorTheme: ColorTheme;
  fontStyle: FontStyle;
  density: Density;
  zoom: number;
  highlightAiSkills: boolean;
}
