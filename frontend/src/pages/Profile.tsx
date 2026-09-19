import { mockUser } from '../services/mockData';
import { User, Briefcase, Mail } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md absolute -top-12 flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
          
          <div className="pt-16">
            <h2 className="text-2xl font-bold text-gray-900">{mockUser.name}</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={18} />
                <span>{mockUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase size={18} />
                <span>Target Career: <span className="font-semibold text-primary-600">{mockUser.targetCareer}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
