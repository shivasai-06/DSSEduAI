import { mockRoadmap } from '../services/mockData';
import { Award, Target, Zap } from 'lucide-react';

export default function Progress() {
  const completed = mockRoadmap.filter(c => c.status === 'completed').length;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-md">
          <Award size={32} className="mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-1">Current Streak</h3>
          <p className="text-4xl font-extrabold">12 Days</p>
          <p className="text-sm mt-2 opacity-80">Keep it up! You're doing great.</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-md">
          <Target size={32} className="mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-1">Modules Completed</h3>
          <p className="text-4xl font-extrabold">{completed}</p>
          <p className="text-sm mt-2 opacity-80">Out of {mockRoadmap.length} total modules.</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-md">
          <Zap size={32} className="mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-1">XP Earned</h3>
          <p className="text-4xl font-extrabold">4,250</p>
          <p className="text-sm mt-2 opacity-80">Top 15% of all learners.</p>
        </div>
      </div>
    </div>
  );
}
