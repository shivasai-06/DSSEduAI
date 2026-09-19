import { mockRoadmap } from '../services/mockData';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function Roadmap() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Career Roadmap</h1>
        <p className="text-gray-600">Your personalized path to becoming a Full Stack Developer.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-8 relative">
        <div className="absolute left-12 top-12 bottom-12 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-12">
          {mockRoadmap.map((course) => (
            <div key={course.id} className="relative flex items-start gap-8 z-10">
              <div className="bg-white p-1">
                {course.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500 bg-white" size={28} />
                ) : course.status === 'in_progress' ? (
                  <Clock className="text-primary-600 bg-white" size={28} />
                ) : (
                  <Circle className="text-gray-300 bg-white" size={28} />
                )}
              </div>
              
              <div className={`flex-1 p-6 rounded-xl border ${
                course.status === 'in_progress' ? 'border-primary-200 bg-primary-50/30 shadow-sm' : 
                course.status === 'completed' ? 'border-gray-200 bg-gray-50' : 'border-gray-200 border-dashed opacity-70'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{course.duration}</span>
                </div>
                <p className="text-gray-600 mb-4">{course.provider}</p>
                <div className="flex gap-2">
                  {course.skillsAddressed.map(skill => (
                    <span key={skill} className="text-xs font-medium bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-md shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
