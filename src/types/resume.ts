export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    jobTitle: string;
    summary: string;
    profileImage?: string;
  };
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    link: string;
    description: string;
  }>;
  languages: string[];
  customization: {
    primaryColor: string;
    fontFamily: string;
    sectionSpacing?: number;
    fontSize?: number;
    summarySpacing?: number;
    experienceSpacing?: number;
    educationSpacing?: number;
    skillsSpacing?: number;
    projectsSpacing?: number;
  };
}

export type TemplateId = 
  | 'modern' | 'elegant' | 'minimal' | 'professional' | 'creative' | 'executive'
  | 'tech' | 'academic' | 'sidebar' | 'geometric' | 'pastel' | 'high_impact'
  | 'compact' | 'functional' | 'chrono' | 'hybrid' | 'retro' | 'glassy'
  | 'dark' | 'infographic' | 'startup' | 'minimalist_pro' | 'gradient' | 'board' | 'journal';
