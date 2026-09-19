import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { getCareerRequirements } from '../data/careerRequirements';
import { getCareerInformation } from '../data/careerInformation';
import { generateRoadmap } from '../utils/roadmapGenerator';
import { normalizeCareerName } from '../utils/careerMatcher';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, ChevronRight, Briefcase, Code, BrainCircuit, Layout, Calendar, Circle, PlayCircle } from 'lucide-react';
import type { ModuleStatus } from '../types/roadmap';

interface SkillMapNode {
  topic: string;
  category: 'technical' | 'soft' | 'core';
  targetLevel: number;
  currentLevel: number;
}

export default function Roadmap() {
  const { user, profile } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'map' | 'plan'>('plan');
  
  // Data State
  const [skillMap, setSkillMap] = useState<SkillMapNode[]>([]);
  const [roadmapData, setRoadmapData] = useState<ReturnType<typeof generateRoadmap> | null>(null);
  
  // Progress State (localStorage)
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleStatus>>({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedCareer = normalizeCareerName(profile?.target_career);
  const careerInfo = normalizedCareer ? getCareerInformation(normalizedCareer) : null;
  const careerReqs = normalizedCareer ? getCareerRequirements(normalizedCareer) : null;

  useEffect(() => {
    async function fetchUserProgress() {
      if (!user || !profile?.target_career || !careerReqs) {
        setLoading(false);
        return;
      }

      try {
        const { data: assessments, error: fetchError } = await supabase
          .from('assessments')
          .select('topic, score')
          .eq('user_id', user.id);
          
        if (fetchError) throw fetchError;
        
        const highestScores: Record<string, number> = {};
        assessments?.forEach((assessment) => {
          const currentMax = highestScores[assessment.topic] || 0;
          if (assessment.score > currentMax) {
            highestScores[assessment.topic] = assessment.score;
          }
        });
        
        // 1. Build Career Map (Step 9)
        const mapNodes: SkillMapNode[] = careerReqs.requiredSkills.map(req => ({
          topic: req.topic,
          category: req.category,
          targetLevel: req.targetLevel,
          currentLevel: highestScores[req.topic] || 0
        }));
        setSkillMap(mapNodes);

        // 2. Build Personalized Learning Roadmap (Step 10)
        const generatedRoadmap = generateRoadmap(careerReqs, highestScores);
        setRoadmapData(generatedRoadmap);

        // 3. Load Progress from localStorage
        const savedProgress = localStorage.getItem(`roadmap_progress_${user.id}`);
        if (savedProgress) {
          setModuleProgress(JSON.parse(savedProgress));
        }

      } catch (err: any) {
        console.error("Error fetching roadmap data:", err);
        setError("Failed to load your career roadmap.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserProgress();
  }, [user, profile, careerReqs]);

  const updateModuleProgress = (moduleId: string, status: ModuleStatus) => {
    if (!user) return;
    const newProgress = { ...moduleProgress, [moduleId]: status };
    setModuleProgress(newProgress);
    localStorage.setItem(`roadmap_progress_${user.id}`, JSON.stringify(newProgress));
  };

  if (loading) {
    return <div className="text-gray-500 max-w-4xl mx-auto">Building your personalized learning roadmap...</div>;
  }

  // --- Empty States ---
  if (!profile?.target_career) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center mt-10">
        <Target className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Target Career Set</h2>
        <p className="text-gray-600 mb-8">
          Choose your target career to generate your personalized learning roadmap.
        </p>
        <Link 
          to="/profile" 
          className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-sm"
        >
          Update Profile
        </Link>
      </div>
    );
  }

  if (!careerInfo || !careerReqs) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center mt-10">
        <Target className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unsupported Career</h2>
        <p className="text-gray-600 mb-8">
          Roadmap data is not yet available for this career: <strong>{profile.target_career}</strong>
        </p>
        <Link 
          to="/profile" 
          className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-sm"
        >
          Choose a Different Career
        </Link>
      </div>
    );
  }

  const hasAssessments = skillMap.some(s => s.currentLevel > 0);
  if (!hasAssessments) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center mt-10">
        <BrainCircuit className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Completed</h2>
        <p className="text-gray-600 mb-8">
          Complete your skill assessment to generate a personalized roadmap tailored to your actual skill gaps.
        </p>
        <Link 
          to="/assessment" 
          className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-sm"
        >
          Take Assessment
        </Link>
      </div>
    );
  }

  // --- Helper Functions ---
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <BrainCircuit size={20} className="text-purple-600" />;
      case 'technical': return <Code size={20} className="text-blue-600" />;
      case 'soft': return <Layout size={20} className="text-green-600" />;
      default: return <CheckCircle2 size={20} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Not Assessed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'High Priority': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium Priority': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low Priority': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ModuleStatus) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={24} className="text-green-500" />;
      case 'In Progress': return <PlayCircle size={24} className="text-primary-500" />;
      default: return <Circle size={24} className="text-gray-300" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* 1. ROADMAP SUMMARY HEADER */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Target Career</p>
              <h1 className="text-3xl font-bold">{careerInfo.name}</h1>
            </div>
            
            <div className="flex gap-8">
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1 text-right">Readiness</p>
                <p className="text-3xl font-bold text-green-400 text-right">{roadmapData?.overallReadiness}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1 text-right">Est. Duration</p>
                <p className="text-3xl font-bold text-right">{roadmapData?.estimatedWeeks} Weeks</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white border-t border-gray-100 flex flex-col md:flex-row gap-6 justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Current Stage</p>
            <p className="font-medium text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              {roadmapData?.stages[0]?.title || 'Complete'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Skills to Improve</p>
            <div className="flex flex-wrap gap-2">
              {roadmapData?.skillsToImprove.slice(0, 4).map(skill => (
                <span key={skill} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {(roadmapData?.skillsToImprove.length || 0) > 4 && (
                <span className="text-xs font-medium bg-gray-50 text-gray-500 px-2 py-1 rounded">
                  +{(roadmapData?.skillsToImprove.length || 0) - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('plan')}
          className={`pb-4 px-4 font-bold transition-colors relative ${activeTab === 'plan' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Learning Plan
          {activeTab === 'plan' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('map')}
          className={`pb-4 px-4 font-bold transition-colors relative ${activeTab === 'map' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Career Skill Map
          {activeTab === 'map' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"></div>}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* =========================================
          TAB 1: PERSONALIZED LEARNING PLAN
          ========================================= */}
      {activeTab === 'plan' && roadmapData && (
        <div className="space-y-12">
          
          {/* Week by Week Timeline */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Calendar className="text-primary-600" size={24} />
              Week-by-Week Timeline
            </h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent">
              {roadmapData.weeklyPlan.map((week, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white font-bold text-sm">
                    W{week.weekNumber}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow">
                    
                    {week.project ? (
                      <div className="bg-primary-50 -m-5 p-5 rounded-2xl border border-primary-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Code size={16} className="text-primary-600" />
                          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">{week.project.skillTopic} Project</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{week.project.description}</h3>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {week.items.map(item => {
                          const status = moduleProgress[item.id] || 'Not Started';
                          return (
                            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-gray-500 uppercase">{item.skillTopic}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                                  {item.priority}
                                </span>
                              </div>
                              <div className="flex items-start gap-3">
                                <button 
                                  onClick={() => {
                                    const nextStatus: ModuleStatus = status === 'Not Started' ? 'In Progress' : status === 'In Progress' ? 'Completed' : 'Not Started';
                                    updateModuleProgress(item.id, nextStatus);
                                  }}
                                  className="mt-1 shrink-0 transition-transform active:scale-95"
                                  title="Click to toggle status"
                                >
                                  {getStatusIcon(status)}
                                </button>
                                <div>
                                  <h4 className={`font-bold ${status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.moduleTitle}</h4>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.topics.join(' • ')}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB 2: CAREER SKILL MAP (From Step 9)
          ========================================= */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Career Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{careerInfo.name}</h2>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {careerInfo.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Core Responsibilities</h3>
                  <ul className="space-y-2">
                    {careerInfo.coreResponsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Expected Skill Levels</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {careerInfo.expectedSkillLevels}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {careerInfo.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Career Skill Map */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="text-primary-600" size={24} />
                Career Skill Map
              </h2>
              
              <p className="text-sm text-gray-600 mb-8">
                This map visualizes the fundamental skills required for your target career compared against your current assessment scores. Close the gaps to become job-ready!
              </p>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {skillMap.map((node) => {
                  const gap = node.targetLevel - node.currentLevel;
                  const isMastered = gap <= 0;
                  
                  return (
                    <div key={node.topic} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {isMastered ? (
                          <CheckCircle2 size={24} className="text-green-500" />
                        ) : (
                          getCategoryIcon(node.category)
                        )}
                      </div>
                      
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{node.topic}</h3>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{node.category}</span>
                        </div>
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-gray-500">Current: {node.currentLevel}%</span>
                            <span className="text-primary-600">Target: {node.targetLevel}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-100 rounded-full h-2 relative overflow-hidden">
                            <div 
                              className={`h-2 absolute left-0 top-0 transition-all duration-500 ${isMastered ? 'bg-green-500' : 'bg-primary-500'}`}
                              style={{ width: `${Math.min(node.currentLevel, 100)}%` }}
                            ></div>
                          </div>

                          {!isMastered && (
                            <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
                              <span className="text-xs text-yellow-600 font-bold">Gap: {gap}%</span>
                              <Link to="/assessment" className="text-xs text-primary-600 hover:text-primary-800 font-medium underline">
                                Assess Now
                              </Link>
                            </div>
                          )}
                          {isMastered && (
                            <div className="pt-2 border-t border-gray-50">
                              <span className="text-xs text-green-600 font-bold">Ready for career!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
