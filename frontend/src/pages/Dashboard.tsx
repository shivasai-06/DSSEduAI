import { useState, useEffect } from 'react';
import { Trophy, Target, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { getCareerRequirements } from '../data/careerRequirements';
import { normalizeCareerName } from '../utils/careerMatcher';
import { generateRoadmap } from '../utils/roadmapGenerator';

export default function Dashboard() {
  const { user, profile } = useAuth();
  
  const firstName = profile?.name ? profile.name.split(' ')[0] : 'User';
  const targetCareer = profile?.target_career || 'Not set';

  const [loading, setLoading] = useState(true);
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [overallReadiness, setOverallReadiness] = useState(0);
  const [roadmapProgress, setRoadmapProgress] = useState<any[]>([]);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [skillsMastered, setSkillsMastered] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user || !profile) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch assessments
        const { data: assessments, error: fetchError } = await supabase
          .from('assessments')
          .select('id, topic, score, taken_at')
          .eq('user_id', user.id)
          .order('taken_at', { ascending: false });
          
        if (fetchError) throw fetchError;
        
        // Save top 5 recent assessments
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
            // Build Chart Data
            const mapNodes = careerReqs.requiredSkills.map(req => ({
              name: req.topic,
              current: highestScores[req.topic] || 0,
              target: req.targetLevel
            }));
            setChartData(mapNodes);
            
            // Skills Mastered
            setSkillsMastered(mapNodes.filter(n => n.current >= n.target).length);
            
            // Build Roadmap for readiness and progress
            const generatedRoadmap = generateRoadmap(careerReqs, highestScores);
            setOverallReadiness(generatedRoadmap.overallReadiness);
            
            // Load progress
            const savedProgress = localStorage.getItem(`roadmap_progress_${user.id}`);
            const moduleProgress = savedProgress ? JSON.parse(savedProgress) : {};
            
            // Count courses
            let total = 0;
            let completed = 0;
            const inProgress: any[] = [];
            
            generatedRoadmap.weeklyPlan.forEach(week => {
              week.items.forEach(item => {
                total++;
                const status = moduleProgress[item.id] || 'Not Started';
                if (status === 'Completed') {
                  completed++;
                } else if (status === 'In Progress' || status === 'Not Started') {
                  inProgress.push({
                    id: item.id,
                    title: item.moduleTitle,
                    provider: 'EduAI Modules',
                    duration: 'Self-paced',
                    skillsAddressed: item.topics
                  });
                }
              });
            });
            
            setTotalCourses(total);
            setCompletedCourses(completed);
            
            // Show up to 3 in-progress/next modules
            setRoadmapProgress(inProgress.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [user, profile]);

  if (loading) {
    return <div className="text-gray-500 max-w-4xl mx-auto">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
          <p className="text-gray-500">Target Career: <span className="font-semibold text-primary-600">{targetCareer}</span></p>
        </div>
        <Link to="/assessment" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 shadow-sm flex items-center gap-2 transition-colors">
          <Target size={18} /> Take Daily Assessment
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <Trophy className="text-yellow-500" size={20} />
            <span className="font-medium text-sm">Overall Readiness</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{overallReadiness}%</div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${overallReadiness}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <BookOpen className="text-blue-500" size={20} />
            <span className="font-medium text-sm">Modules Completed</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {completedCourses} / {totalCourses}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <Target className="text-purple-500" size={20} />
            <span className="font-medium text-sm">Skills Mastered</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {skillsMastered}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <Clock className="text-green-500" size={20} />
            <span className="font-medium text-sm">Study Time (Week)</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">--</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Readiness Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Skill Readiness</h2>
              <Link to="/skill-gaps" className="text-sm text-primary-600 font-medium hover:underline">View details</Link>
            </div>
            <div className="h-64">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="current" fill="#3b82f6" name="Current Level" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target Level" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a target career in your profile to view your skill readiness chart.
                </div>
              )}
            </div>
          </div>

          {/* Current Learning */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
              <Link to="/roadmap" className="text-sm text-primary-600 font-medium hover:underline">View roadmap</Link>
            </div>
            <div className="space-y-4">
              {roadmapProgress.length > 0 ? roadmapProgress.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-primary-100 hover:bg-primary-50/50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.provider} • {course.duration}</p>
                    <div className="flex gap-2 mt-2">
                      {course.skillsAddressed.map((skill: string) => (
                        <span key={skill} className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to="/roadmap" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary-600 hover:bg-primary-50 hover:border-primary-200">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              )) : (
                 <div className="text-gray-500 p-4 bg-gray-50 rounded-lg text-center border border-gray-100">
                    Your learning modules will appear here based on your skill gaps.
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Data */}
        <div className="space-y-6">
          {/* Recent Assessments */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Assessments</h2>
            <div className="space-y-4">
              {recentAssessments.length > 0 ? recentAssessments.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{result.topic}</p>
                    <p className="text-xs text-gray-500">{new Date(result.taken_at).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-sm font-bold ${
                    result.score >= 80 ? 'bg-green-100 text-green-700' : 
                    result.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {result.score}%
                  </div>
                </div>
              )) : (
                 <p className="text-gray-500 text-sm">No recent assessments found.</p>
              )}
            </div>
          </div>

          {/* AI Mentor Callout */}
          <div className="bg-gradient-to-br from-primary-600 to-purple-700 p-6 rounded-xl text-white shadow-md">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Sparkles size={20}/> Need Guidance?</h2>
            <p className="text-primary-100 text-sm mb-4">Your AI Mentor is ready to help you plan your studies, understand concepts, and practice coding.</p>
            <Link to="/mentor" className="block text-center w-full bg-white text-primary-700 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Chat with AI Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
