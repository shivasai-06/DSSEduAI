import { Link } from 'react-router-dom';
import { BrainCircuit, Target, ArrowRight, Map } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            DS
          </div>
          <span className="text-2xl font-bold text-gray-900">DSSEduAI</span>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 px-4 py-2 font-medium">Log in</Link>
          <Link to="/dashboard" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Bridge the Gap Between <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
            Education and Industry
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          DSSEduAI is your personal AI mentor. We analyze your current skills, identify exactly what you need to learn for your dream career, and generate a customized roadmap just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
            Start Learning <ArrowRight size={20} />
          </Link>
          <Link to="#demo" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
            Explore Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How DSSEduAI Works</h2>
            <p className="text-lg text-gray-600">A seamless journey from assessment to career readiness.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Skill Gap Analysis</h3>
              <p className="text-gray-600">We evaluate your current knowledge and compare it against real-time industry requirements for your target role.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Map size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Adaptive Roadmap</h3>
              <p className="text-gray-600">Our AI generates a step-by-step curriculum tailored to your learning style, focusing only on what you actually need.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. AI Mentor Support</h3>
              <p className="text-gray-600">Get 24/7 personalized guidance, project ideas, and instant answers to your technical questions as you learn.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              DS
            </div>
            <span className="text-xl font-bold text-white">DSSEduAI</span>
          </div>
          <p>© 2026 DSSEduAI Hackathon Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
