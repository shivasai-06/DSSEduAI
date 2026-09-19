import React, { useState, useEffect, useMemo } from 'react';
import { User, Briefcase, Mail, Save, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { CAREER_CATALOG } from '../data/careers';
import type { CareerCategory } from '../data/careers';

const CATEGORIES: ('All' | CareerCategory)[] = [
  'All',
  'AI & Machine Learning',
  'Data & Analytics',
  'Software Development',
  'Cybersecurity',
  'Cloud & DevOps',
  'Design & Product',
  'Emerging Technology'
];

export default function Profile() {
  const { profile, user, refreshProfile, loading: authLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [targetCareer, setTargetCareer] = useState('');
  
  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CareerCategory>('All');
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setTargetCareer(profile.target_career || '');
    }
  }, [profile]);

  const filteredCareers = useMemo(() => {
    return CAREER_CATALOG.filter(career => {
      const matchesSearch = career.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            career.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    if (!user) {
      setError('You must be logged in to update your profile.');
      setSaving(false);
      return;
    }
    
    if (!targetCareer) {
      setError('Please select a target career from the catalog.');
      setSaving(false);
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: name.trim(),
          target_career: targetCareer.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      setSuccess('Profile updated successfully!');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500 font-medium">Loading profile...</div>
      </div>
    );
  }

  const email = profile?.email || user?.email || 'No email';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
      
      {/* Basic Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="h-24 bg-gradient-to-r from-primary-500 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md absolute -top-10 flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
          
          <div className="pt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    className="bg-gray-50 text-gray-500 cursor-not-allowed block w-full pl-10 sm:text-sm border-gray-200 rounded-md py-2 px-3 border"
                    value={email}
                  />
                </div>
                <p className="mt-1 text-[10px] uppercase font-bold tracking-wider text-gray-400">Managed by Google Auth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Selection Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Choose Your Target Career</h2>
          </div>
          <p className="text-gray-600 text-sm">Select the role you want to master. We will build a personalized curriculum around this choice.</p>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search careers..."
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 px-3 border shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === category 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCareers.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p>No careers found matching "{searchQuery}".</p>
                <button 
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-2 text-primary-600 font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredCareers.map(career => {
                const isSelected = targetCareer === career.name;
                return (
                  <div 
                    key={career.id}
                    onClick={() => setTargetCareer(career.name)}
                    className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col h-full ${
                      isSelected 
                        ? 'border-primary-600 bg-primary-50 shadow-md ring-1 ring-primary-600' 
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-primary-600">
                        <CheckCircle2 size={24} className="fill-white" />
                      </div>
                    )}
                    
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">
                      {career.category}
                    </span>
                    <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                      {career.name}
                    </h3>
                    <p className={`text-sm flex-grow ${isSelected ? 'text-primary-700' : 'text-gray-600'}`}>
                      {career.shortDescription}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-primary-700' : 'text-gray-400'}`}>
                        {career.requiredSkills.length} Core Skills
                      </span>
                      <button
                        type="button"
                        className={`text-sm font-bold px-3 py-1 rounded-md transition-colors ${
                          isSelected 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
