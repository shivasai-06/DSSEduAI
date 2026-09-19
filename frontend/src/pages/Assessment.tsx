import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { questions } from '../data/assessmentQuestions';
import type { Question } from '../data/assessmentQuestions';
import { Link } from 'react-router-dom';
const TOPICS = [
  'Python',
  'Java',
  'SQL',
  'HTML/CSS',
  'JavaScript',
  'Data Structures',
  'Cybersecurity',
  'AI/ML'
];

interface PastAssessment {
  id: string;
  topic: string;
  score: number;
  taken_at: string;
}

export default function Assessment() {
  const { user } = useAuth();
  
  const [step, setStep] = useState(0); // 0: Select Topic, 1: Quiz, 2: Result
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  
  const [pastAssessments, setPastAssessments] = useState<PastAssessment[]>([]);
  const [loadingPast, setLoadingPast] = useState(true);

  useEffect(() => {
    if (user && step === 0) {
      loadPastAssessments();
    }
  }, [user, step]);

  const loadPastAssessments = async () => {
    if (!user) return;
    setLoadingPast(true);
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('id, topic, score, taken_at')
        .eq('user_id', user.id)
        .order('taken_at', { ascending: false });
        
      if (error) throw error;
      setPastAssessments(data || []);
    } catch (err: any) {
      console.error("Failed to load past assessments:", err);
    } finally {
      setLoadingPast(false);
    }
  };

  const handleStartAssessment = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    if (topicQuestions.length === 0) {
      setError(`No questions found for ${topic}`);
      return;
    }
    
    // Select exactly 10 questions
    const selected10 = topicQuestions.slice(0, 10);
    
    setSelectedTopic(topic);
    setQuizQuestions(selected10);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(selected10.length).fill(-1));
    setStep(1);
    setError(null);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!user) {
      setError("You must be logged in to save your assessment.");
      return;
    }

    if (selectedAnswers.includes(-1)) {
      setError("Please answer all questions before submitting.");
      return;
    }
    
    setSaving(true);
    setError(null);
    
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    // Calculate score (10 points per correct answer for 10 questions = 100 max)
    const score = correctCount * 10;
    
    try {
      const { error: insertError } = await supabase
        .from('assessments')
        .insert([{
          user_id: user.id,
          topic: selectedTopic,
          score: score,
          taken_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;
      
      setFinalScore(score);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to save assessment results.');
    } finally {
      setSaving(false);
    }
  };

  const getSkillLevel = (score: number) => {
    if (score <= 30) return 'Beginner';
    if (score <= 60) return 'Developing';
    if (score <= 80) return 'Intermediate';
    return 'Advanced';
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-red-600 bg-red-100';
      case 'Developing': return 'text-yellow-600 bg-yellow-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Step 0: Select Topic
  if (step === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Assessment</h1>
          <p className="text-gray-600 mb-8">Select a topic to test your knowledge. Each assessment contains 10 questions (10 points each).</p>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleStartAssessment(topic)}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary-500 hover:shadow-md transition-all text-center flex flex-col items-center justify-center h-32 group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{topic}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Previous Assessments Section */}
        {user && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <History className="text-primary-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Previous Assessments</h2>
            </div>
            
            {loadingPast ? (
              <p className="text-gray-500">Loading your history...</p>
            ) : pastAssessments.length === 0 ? (
              <p className="text-gray-500 text-sm">You haven't taken any assessments yet. Select a topic above to get started!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pastAssessments.map((item) => {
                      const level = getSkillLevel(item.score);
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.topic}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{item.score}%</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSkillLevelColor(level)}`}>
                              {level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(item.taken_at).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Step 2: Assessment Complete
  if (step === 2 && finalScore !== null) {
    const level = getSkillLevel(finalScore);
    const correctAnswers = finalScore / 10;
    const incorrectAnswers = 10 - correctAnswers;

    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
        <p className="text-gray-600 mb-8">You have successfully completed the {selectedTopic} assessment.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Final Score</p>
            <p className="text-3xl font-bold text-gray-900">{finalScore}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Skill Level</p>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSkillLevelColor(level)}`}>
              {level}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Correct</p>
            <p className="text-xl font-bold text-green-600">{correctAnswers}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Incorrect</p>
            <p className="text-xl font-bold text-red-600">{incorrectAnswers}</p>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">Your results have been saved securely to your profile.</p>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => {
              handleStartAssessment(selectedTopic as string);
            }} 
            className="bg-white text-primary-700 border border-primary-200 px-6 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Retake Assessment
          </button>
          <button 
            onClick={() => {
              setStep(0);
              setSelectedTopic(null);
            }} 
            className="bg-white text-gray-700 border border-gray-200 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Skill Assessment
          </button>
          <Link 
            to="/dashboard"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Continue to Skill Gaps
          </Link>
        </div>
      </div>
    );
  }

  // Step 1: Quiz UI
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{selectedTopic} Assessment</h1>
        <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-primary-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === i;
            return (
              <button 
                key={i} 
                onClick={() => handleAnswerSelect(i)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  isSelected 
                    ? 'border-primary-500 bg-primary-50 text-primary-900 ring-1 ring-primary-500' 
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
          <button 
            onClick={handlePrevQuestion} 
            disabled={isFirstQuestion || saving}
            className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-0 transition-colors"
          >
            <ArrowLeft size={18} /> Previous
          </button>
          
          {isLastQuestion ? (
            <button 
              onClick={handleSubmitAssessment} 
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Submit Assessment'} <CheckCircle2 size={18} />
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswers[currentQuestionIndex] === -1}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
