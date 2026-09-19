import { useState, useEffect } from 'react';
import { Award, Target, Zap, BookOpen, CheckCircle2, TrendingUp, BrainCircuit, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { getCareerRequirements } from '../data/careerRequirements';
import { normalizeCareerName } from '../utils/careerMatcher';
import { generateRoadmap } from '../utils/roadmapGenerator';
import { Link } from 'react-router-dom';

export default function Progress() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [completedModules, setCompletedModules] = useState<any[]>([]);
  const [totalModules, setTotalModules] = useState(0);
  const [readiness, setReadiness] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [skillProgress, setSkillProgress] = useState<any[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);

  useEffect(() => {
    async function loadProgressData() {
      if (!user || !profile) {
        setLoading(false);
        return;
      }
      
      try {
        const { data: assessments, error: fetchError } = await supabase
          .from('assessments')
          .select('id, topic, score, taken_at')
          .eq('user_id', user.id)
          .order('taken_at', { ascending: false });
          
        if (fetchError) throw fetchError;
        setRecentAssessments(assessments?.slice(0, 5) || []);
        
        const highestScores: Record<string, number> = {};
        assessments?.forEach((assessment) => {
          const currentMax = highestScores[assessment.topic] || 0;
          if (assessment.score > currentMax) {
            highestScores[assessment.topic] = assessment.score;
          }
        });

        if (profile.target_career) {
          const normalizedCareer = normalizeCareerName(profile.target_career);
          const careerReqs = normalizedCareer ? getCareerRequirements(normalizedCareer) : null;
          
          if (careerReqs) {
            const mapNodes = careerReqs.requiredSkills.map(req => ({
              name: req.topic,
              current: highestScores[req.topic] || 0,
              target: req.targetLevel
            }));
            setSkillProgress(mapNodes);
            
            const generatedRoadmap = generateRoadmap(careerReqs, highestScores);
            setReadiness(generatedRoadmap.overallReadiness);
            setCurrentStage(generatedRoadmap.stages[0]?.title || 'Complete');
            
            // USE THE AUTHENTICATED USER ID TO SCOPE LOCALSTORAGE
            const savedProgress = localStorage.getItem(`roadmap_progress_${user.id}`);
            const moduleProgress = savedProgress ? JSON.parse(savedProgress) : {};
            
            let total = 0;
            const completedMods: any[] = [];
            
            generatedRoadmap.weeklyPlan.forEach(week => {
              week.items.forEach(item => {
                total++;
                const status = moduleProgress[item.id] || 'Not Started';
                if (status === 'Completed') {
                  completedMods.push({
                    id: item.id,
                    title: item.moduleTitle,
                    topics: item.topics
                  });
                }
              });
            });
            
            setTotalModules(total);
            setCompletedModules(completedMods);
          }
        }
      } catch (err) {
        console.error("Progress fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProgressData();
  }, [user, profile]);

  if (loading) {
    return <div className="text-gray-500 max-w-4xl mx-auto mt-10">Loading your personalized progress...</div>;
  }

  if (!profile?.target_career) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center mt-10">
        <Target className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Target Career Set</h2>
        <p className="text-gray-600 mb-8">
          We need to know your target career to track your personalized progress.
        </p>
        <Link to="/profile" className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
          Update Profile
        </Link>
      </div>
    );
  }

  const completionPercentage = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0;
  const xpEarned = completedModules.length * 250; // Mock 250 XP per module

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-500 mt-2">Track your journey toward becoming a <span className="font-bold text-primary-600">{profile.target_career}</span></p>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-primary-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                <Target size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Career Readiness</h3>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-extrabold text-gray-900">{readiness}%</p>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${readiness}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <BookOpen size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Course Progress</h3>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-extrabold text-gray-900">{completionPercentage}%</p>
              <p className="text-sm font-medium text-gray-500 mb-1">({completedModules.length}/{totalModules})</p>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <Zap size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">XP Earned</h3>
            <p className="text-4xl font-extrabold text-gray-900">{xpEarned.toLocaleString()}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">From completed modules</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-300 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <Activity size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Current Stage</h3>
            <p className="text-xl font-bold text-gray-900 line-clamp-2 mt-2">{currentStage}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Completed Modules Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Completed Modules</h2>
            </div>
            <span className="bg-white text-xs font-bold px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {completedModules.length} Total
            </span>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            {completedModules.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <BookOpen size={48} className="text-gray-200 mb-4" />
                <h3 className="text-gray-900 font-bold mb-2">No modules completed yet</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs">Start learning from your personalized roadmap to see your progress here.</p>
                <Link to="/roadmap" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Go to Roadmap
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {completedModules.map((mod, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{mod.title}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {mod.topics.map((t: string) => (
                          <span key={t} className="text-[10px] font-bold bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skill Progress Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Skill Progress</h2>
            </div>
            <Link to="/skill-gaps" className="text-sm font-medium text-primary-600 hover:underline">
              View Details
            </Link>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            {skillProgress.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <BrainCircuit size={48} className="text-gray-200 mb-4" />
                <h3 className="text-gray-900 font-bold mb-2">No skill data available</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs">Take an assessment to generate your personalized skill progress.</p>
                <Link to="/assessment" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Take Assessment
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {skillProgress.map((skill, idx) => {
                  const isMastered = skill.current >= skill.target;
                  const percentage = Math.min(Math.round((skill.current / skill.target) * 100), 100) || 0;
                  
                  return (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            {skill.name}
                            {isMastered && <CheckCircle2 size={14} className="text-green-500" />}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-gray-500">
                            {skill.current}% / {skill.target}% Target
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-500 ${isMastered ? 'bg-green-500' : 'bg-primary-500 group-hover:bg-primary-600'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
