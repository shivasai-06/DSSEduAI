export type PriorityLevel = 'High Priority' | 'Medium Priority' | 'Low Priority' | 'Not Assessed';

export interface LearningModule {
  id: string;
  title: string;
  topics: string[];
}

export interface RoadmapSkill {
  topic: string; // e.g. "Python"
  priority: PriorityLevel;
  gap: number;
  modules: LearningModule[];
  project?: string; // e.g. "Build a CLI calculator."
}

export interface RoadmapStage {
  id: string; // 'stage-1', 'stage-2', etc.
  title: string; // 'Foundation', 'Core Skills', 'Advanced Skills', 'Projects', 'Career Preparation'
  skills: RoadmapSkill[]; // The skills assigned to this stage
}

export interface RoadmapModuleItem {
  id: string; // Composite ID: `${skill.topic}-${module.id}`
  skillTopic: string;
  moduleTitle: string;
  topics: string[];
  priority: PriorityLevel;
}

export interface WeeklyPlan {
  weekNumber: number;
  items: RoadmapModuleItem[];
  project?: {
    skillTopic: string;
    description: string;
  };
}

export type ModuleStatus = 'Not Started' | 'In Progress' | 'Completed';
