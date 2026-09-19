import type { CareerRequirement } from '../data/careerRequirements';
import { learningCurriculum } from '../data/learningModules';
import type { RoadmapStage, RoadmapSkill, PriorityLevel, WeeklyPlan, RoadmapModuleItem } from '../types/roadmap';

interface RoadmapResult {
  stages: RoadmapStage[];
  weeklyPlan: WeeklyPlan[];
  overallReadiness: number;
  skillsToImprove: string[];
  estimatedWeeks: number;
}

export function generateRoadmap(
  careerReqs: CareerRequirement,
  userScores: Record<string, number>
): RoadmapResult {
  
  // 1. Calculate gaps and determine priority
  const skillsToLearn: RoadmapSkill[] = [];
  
  let totalTarget = 0;
  let totalCurrent = 0;

  careerReqs.requiredSkills.forEach(req => {
    totalTarget += req.targetLevel;
    
    // Check if assessed
    const isAssessed = userScores[req.topic] !== undefined;
    const currentScore = isAssessed ? userScores[req.topic] : 0;
    
    totalCurrent += Math.min(currentScore, req.targetLevel); // Cap at target for readiness math

    const gap = req.targetLevel - currentScore;

    // Only include if there is a gap (or not assessed)
    if (gap > 0 || !isAssessed) {
      let priority: PriorityLevel = 'Low Priority';
      if (!isAssessed) {
        priority = 'Not Assessed';
      } else if (gap >= 40) {
        priority = 'High Priority';
      } else if (gap >= 20) {
        priority = 'Medium Priority';
      }

      const curriculum = learningCurriculum[req.topic] || {
        modules: [
          { id: `basic-1`, title: `Introduction to ${req.topic}`, topics: ['Fundamentals', 'Core Concepts'] },
          { id: `basic-2`, title: `Advanced ${req.topic}`, topics: ['Best Practices', 'Practical Application'] }
        ],
        project: `Build a practical project utilizing ${req.topic}`
      };
      
      skillsToLearn.push({
        topic: req.topic,
        priority,
        gap,
        modules: curriculum.modules,
        project: curriculum.project
      });
    }
  });

  // Calculate Readiness %
  const overallReadiness = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
  
  // Sort by Priority (Not Assessed first, then largest gap)
  skillsToLearn.sort((a, b) => {
    if (a.priority === 'Not Assessed' && b.priority !== 'Not Assessed') return -1;
    if (b.priority === 'Not Assessed' && a.priority !== 'Not Assessed') return 1;
    return b.gap - a.gap;
  });

  const skillsToImprove = skillsToLearn.map(s => s.topic);

  // 2. Build Stages
  const stage1Skills: RoadmapSkill[] = []; // Foundation (Not Assessed or High Gap core/technical)
  const stage2Skills: RoadmapSkill[] = []; // Core Skills (Medium gap)
  const stage3Skills: RoadmapSkill[] = []; // Advanced Skills (Small gap)
  
  skillsToLearn.forEach(skill => {
    if (skill.priority === 'Not Assessed' || skill.gap >= 40) {
      stage1Skills.push(skill);
    } else if (skill.gap >= 20) {
      stage2Skills.push(skill);
    } else {
      stage3Skills.push(skill);
    }
  });

  const stages: RoadmapStage[] = [];
  
  if (stage1Skills.length > 0) {
    stages.push({ id: 'stage-1', title: 'Foundation', skills: stage1Skills });
  }
  if (stage2Skills.length > 0) {
    stages.push({ id: 'stage-2', title: 'Core Skills', skills: stage2Skills });
  }
  if (stage3Skills.length > 0) {
    stages.push({ id: 'stage-3', title: 'Advanced Skills', skills: stage3Skills });
  }

  // 3. Extract projects for Stage 4
  const projects: RoadmapSkill[] = skillsToLearn
    .filter(skill => skill.project)
    .map(skill => ({
      topic: `${skill.topic} Project`,
      priority: skill.priority,
      gap: skill.gap,
      modules: [{ id: `proj-${skill.topic}`, title: skill.project!, topics: ['Practical Application'] }]
    }));

  if (projects.length > 0) {
    stages.push({ id: 'stage-4', title: 'Projects', skills: projects });
  }

  // Stage 5: Career Prep is static
  stages.push({
    id: 'stage-5', 
    title: 'Career Preparation', 
    skills: [{
      topic: 'Career',
      priority: 'High Priority',
      gap: 100,
      modules: [{ id: 'prep-1', title: 'Portfolio & Interviews', topics: ['Resume Building', 'Mock Interviews'] }]
    }]
  });

  // 4. Generate Weekly Plan (Distribute Modules)
  const weeklyPlan: WeeklyPlan[] = [];
  let currentWeek = 1;

  // Distribute 2 modules per week
  let currentWeekItems: RoadmapModuleItem[] = [];

  const addModuleToWeek = (skill: RoadmapSkill, mod: any) => {
    currentWeekItems.push({
      id: `${skill.topic}-${mod.id}`,
      skillTopic: skill.topic,
      moduleTitle: mod.title,
      topics: mod.topics,
      priority: skill.priority
    });

    if (currentWeekItems.length >= 2) {
      weeklyPlan.push({
        weekNumber: currentWeek,
        items: [...currentWeekItems]
      });
      currentWeek++;
      currentWeekItems = [];
    }
  };

  // Add all normal modules
  stages.filter(s => s.id === 'stage-1' || s.id === 'stage-2' || s.id === 'stage-3').forEach(stage => {
    stage.skills.forEach(skill => {
      skill.modules.forEach(mod => {
        addModuleToWeek(skill, mod);
      });
    });
  });

  // Add projects
  if (projects.length > 0) {
    // flush current week if it has items before adding projects
    if (currentWeekItems.length > 0) {
      weeklyPlan.push({ weekNumber: currentWeek, items: [...currentWeekItems] });
      currentWeek++;
      currentWeekItems = [];
    }

    projects.forEach(proj => {
      weeklyPlan.push({
        weekNumber: currentWeek,
        items: [],
        project: {
          skillTopic: proj.topic.replace(' Project', ''),
          description: proj.modules[0].title
        }
      });
      currentWeek++;
    });
  }

  // Add Career Prep
  if (currentWeekItems.length > 0) {
    weeklyPlan.push({ weekNumber: currentWeek, items: [...currentWeekItems] });
    currentWeek++;
    currentWeekItems = [];
  }
  
  weeklyPlan.push({
    weekNumber: currentWeek,
    items: [{
      id: 'career-prep-1',
      skillTopic: 'Career',
      moduleTitle: 'Portfolio & Interviews',
      topics: ['Resume Building', 'Mock Interviews'],
      priority: 'High Priority'
    }]
  });

  return {
    stages,
    weeklyPlan,
    overallReadiness,
    skillsToImprove,
    estimatedWeeks: weeklyPlan.length
  };
}
