import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Assessment() {
  const [step, setStep] = useState(0);
  
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center py-16">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
        <p className="text-gray-600 mb-8">We've updated your skill profile and adjusted your learning roadmap.</p>
        <button onClick={() => setStep(0)} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">React Advanced Concepts</h1>
        <span className="text-sm font-medium text-gray-500">Question 1 of 10</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '10%' }}></div>
      </div>
      
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">What is the primary purpose of useMemo in React?</h2>
        
        <div className="space-y-3">
          {[
            'To memorize the component state between renders.',
            'To memoize expensive calculations and prevent unnecessary re-computations.',
            'To force a component to re-render synchronously.',
            'To store global application state.'
          ].map((option, i) => (
            <button key={i} className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors">
              {option}
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700">
            Next Question <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
