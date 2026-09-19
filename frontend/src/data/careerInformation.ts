import { CAREER_CATALOG } from './careers';

export interface CareerInformation {
  id: string;
  name: string;
  description: string;
  coreResponsibilities: string[];
  importantSkills: string[];
  expectedSkillLevels: string;
  technologies: string[];
}

export const careerInformationData: CareerInformation[] = CAREER_CATALOG.map(career => ({
  id: career.id,
  name: career.name,
  description: career.description,
  coreResponsibilities: career.coreResponsibilities,
  importantSkills: career.importantSkills,
  expectedSkillLevels: career.expectedSkillLevels,
  technologies: career.technologies
}));

export function getCareerInformation(title: string): CareerInformation | undefined {
  return careerInformationData.find(
    c => c.name.toLowerCase() === title.toLowerCase() || c.id === title.toLowerCase()
  );
}
