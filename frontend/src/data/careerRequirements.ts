import { CAREER_CATALOG } from './careers';

export interface CareerSkillRequirement {
  topic: string;
  category: 'technical' | 'soft' | 'core';
  targetLevel: number;
}

export interface CareerRequirement {
  id: string;
  title: string;
  description: string;
  requiredSkills: CareerSkillRequirement[];
}

export const careerRequirements: CareerRequirement[] = CAREER_CATALOG.map(career => ({
  id: career.id,
  title: career.name,
  description: career.description,
  requiredSkills: career.requiredSkills
}));

export function getCareerRequirements(title: string): CareerRequirement | undefined {
  return careerRequirements.find(
    c => c.title.toLowerCase() === title.toLowerCase() || c.id === title.toLowerCase()
  );
}
