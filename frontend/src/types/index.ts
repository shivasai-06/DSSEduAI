export interface User {
  id: string;
  name: string;
  email: string;
  targetCareer: string;
  avatarUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  category: 'technical' | 'soft' | 'core';
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  skillsAddressed: string[];
}

export interface AssessmentResult {
  date: string;
  score: number;
  topic: string;
}
