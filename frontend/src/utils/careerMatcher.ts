import { CAREER_CATALOG } from '../data/careers';

export function normalizeCareerName(careerName: string | null | undefined): string | null {
  if (!careerName) return null;

  const normalized = careerName.trim().toLowerCase();

  const match = CAREER_CATALOG.find(c => c.name.toLowerCase() === normalized || c.id === normalized);
  if (match) {
    return match.name;
  }

  // Handle some common legacy edge cases manually just in case
  switch (normalized) {
    case 'ml engineer':
    case 'ml-engineer':
      return 'Machine Learning Engineer';
    case 'full-stack developer':
    case 'full-stack-developer':
      return 'Full Stack Developer';
    case 'cybersecurity-analyst':
      return 'Cybersecurity Analyst';
    case 'cybersecurity-engineer':
      return 'Cybersecurity Engineer';
  }

  return careerName.trim();
}
