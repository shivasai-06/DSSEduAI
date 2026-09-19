import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { getCareerRequirements } from '../data/careerRequirements';
import { normalizeCareerName } from '../utils/careerMatcher';
import { Link } from 'react-router-dom';
import { Target, AlertCircle } from 'lucide-react';

interface SkillGapData {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'core';
  currentLevel: number;
  targetLevel: number;
}

export default function SkillGaps() {
  const { user, profile } = useAuth();
  
  const [skillGaps, setSkillGaps] = useState<SkillGapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndCalculateGaps() {
      if (!user || !profile) {
        setLoading(false);
        return;
      }
      
      if (!profile.target_career) {
        setLoading(false);
        return; // UI will handle this state
      }

      const normalizedCareer = normalizeCareerName(profile.target_career);
      const careerReqs = normalizedCareer ? getCareerRequirements(normalizedCareer) : null;
      
      if (!careerReqs) {
        setError(`No requirements mapped yet for the career: ${profile.target_career}`);
        setLoading(false);
        return;
      }

      try {
        // Fetch user's assessment scores
        const { data: assessments, error: fetchError } = await supabase
          .from('assessments')
          .select('topic, score')
          .eq('user_id', user.id);
          
        if (fetchError) throw fetchError;
        
        // Find the maximum score for each topic (in case they took it multiple times)
        const highestScores: Record<string, number> = {};
        assessments?.forEach((assessment) => {
          const currentMax = highestScores[assessment.topic] || 0;
          if (assessment.score > currentMax) {
            highestScores[assessment.topic] = assessment.score;
          }
        });
        
        // Build the skill gaps list
        const calculatedGaps: SkillGapData[] = careerReqs.requiredSkills.map(req => {
          return {
            id: req.topic.toLowerCase().replace(/\s+/g, '-'),
            name: req.topic,
            category: req.category,
            targetLevel: req.targetLevel,
            currentLevel: highestScores[req.topic] || 0
          };
        });
        
        setSkillGaps(calculatedGaps);
      } catch (err: any) {
        console.error("Error calculating skill gaps:", err);
        setError("Failed to load your skill gaps.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchAndCalculateGaps();
  }, [user, profile]);

  if (loading) {
    return <div className="text-gray-500">Calculating your skill gaps...</div>;
  }

  if (!profile?.target_career) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
        <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Target Career Set</h2>
        <p className="text-gray-600 mb-6">
          To analyze your skill gaps, we need to know what career you are aiming for.
        </p>
        <Link 
          to="/profile" 
          className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Update Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h1>
          <p className="text-gray-600">
            Targeting: <span className="font-bold text-primary-600">{profile.target_career}</span>
          </p>
        </div>
        
        <Link 
          to="/assessment" 
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Take Assessment
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      <div className="grid gap-4 mt-6">
        {skillGaps.length === 0 && !error ? (
          <p className="text-gray-500">No skill gaps found for this career path.</p>
        ) : (
          skillGaps.map(skill => {
            const gap = skill.targetLevel - skill.currentLevel;
            return (
              <div key={skill.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-shadow">
                <div className="md:w-1/3">
                  <h3 className="font-bold text-gray-900">{skill.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md mt-2 inline-block uppercase tracking-wider ${
                    skill.category === 'technical' ? 'bg-blue-100 text-blue-700' :
                    skill.category === 'soft' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {skill.category}
                  </span>
                </div>
                
                <div className="md:w-2/3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Current: <span className="font-bold text-gray-900">{skill.currentLevel}%</span></span>
                    <span className="text-primary-600 font-bold">Target: {skill.targetLevel}%</span>
                  </div>
                  
                  {/* Progress Bar Component */}
                  <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-primary-600 h-3 absolute left-0 top-0 transition-all duration-500" 
                      style={{ width: `${Math.min(skill.currentLevel, 100)}%` }}
                    ></div>
                    {/* The Gap Indicator (only if current < target) */}
                    {gap > 0 && (
                      <div 
                        className="bg-yellow-400 h-3 absolute top-0 transition-all duration-500 opacity-60" 
                        style={{ left: `${skill.currentLevel}%`, width: `${gap}%` }}
                      ></div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    {gap > 0 ? (
                      <p className="text-xs text-yellow-600 font-bold">Gap: {gap}% to master</p>
                    ) : (
                      <p className="text-xs text-green-600 font-bold">Target Reached! 🎉</p>
                    )}
                    
                    {gap > 0 && (
                      <Link to="/assessment" className="text-xs text-primary-600 hover:text-primary-700 font-medium underline">
                        Assess Skill
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
