import type { User, Skill, Course, AssessmentResult } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  targetCareer: 'Full Stack Developer',
};

export const mockSkills: Skill[] = [
  { id: 's1', name: 'React.js', currentLevel: 75, targetLevel: 90, category: 'technical' },
  { id: 's2', name: 'Node.js', currentLevel: 40, targetLevel: 85, category: 'technical' },
  { id: 's3', name: 'TypeScript', currentLevel: 60, targetLevel: 80, category: 'technical' },
  { id: 's4', name: 'Database Design', currentLevel: 30, targetLevel: 70, category: 'core' },
  { id: 's5', name: 'System Architecture', currentLevel: 20, targetLevel: 75, category: 'core' },
  { id: 's6', name: 'Communication', currentLevel: 80, targetLevel: 90, category: 'soft' },
];

export const mockRoadmap: Course[] = [
  { id: 'c1', title: 'Advanced React Patterns', provider: 'Frontend Masters', duration: '4 weeks', status: 'completed', skillsAddressed: ['React.js'] },
  { id: 'c2', title: 'Node.js API Design', provider: 'Coursera', duration: '6 weeks', status: 'in_progress', skillsAddressed: ['Node.js', 'Database Design'] },
  { id: 'c3', title: 'TypeScript for Professionals', provider: 'Udemy', duration: '3 weeks', status: 'not_started', skillsAddressed: ['TypeScript'] },
  { id: 'c4', title: 'System Design Interview Prep', provider: 'Educative', duration: '8 weeks', status: 'not_started', skillsAddressed: ['System Architecture'] },
];

export const mockAssessments: AssessmentResult[] = [
  { date: '2023-10-01', score: 85, topic: 'React Basics' },
  { date: '2023-10-15', score: 62, topic: 'Node.js Fundamentals' },
  { date: '2023-11-02', score: 78, topic: 'TypeScript Advanced' },
];
