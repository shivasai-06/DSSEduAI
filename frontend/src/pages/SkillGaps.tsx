import { mockSkills } from '../services/mockData';

export default function SkillGaps() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h1>
      <p className="text-gray-600">Detailed breakdown of your current skills versus industry requirements.</p>
      
      <div className="grid gap-4 mt-6">
        {mockSkills.map(skill => {
          const gap = skill.targetLevel - skill.currentLevel;
          return (
            <div key={skill.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/3">
                <h3 className="font-bold text-gray-900">{skill.name}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-md mt-2 inline-block ${
                  skill.category === 'technical' ? 'bg-blue-100 text-blue-700' :
                  skill.category === 'soft' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </span>
              </div>
              
              <div className="md:w-2/3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current: <span className="font-bold text-gray-900">{skill.currentLevel}%</span></span>
                  <span className="text-primary-600 font-bold">Target: {skill.targetLevel}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
                  <div className="bg-primary-600 h-3 absolute left-0 top-0" style={{ width: `${skill.currentLevel}%` }}></div>
                  <div className="bg-primary-200 h-3 absolute top-0" style={{ left: `${skill.currentLevel}%`, width: `${Math.max(0, gap)}%` }}></div>
                </div>
                {gap > 0 && <p className="text-xs text-primary-600 font-medium pt-1">Gap: {gap}% to master</p>}
                {gap <= 0 && <p className="text-xs text-green-600 font-medium pt-1">Target Reached!</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
