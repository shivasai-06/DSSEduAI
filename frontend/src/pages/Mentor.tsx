import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { askMentor } from '../services/mentorApi';

interface Message {
  role: 'user' | 'mentor';
  content: string;
}

const STARTER_PROMPTS = [
  "Create a study plan for me",
  "What skills should I learn for AI Engineering?",
  "Explain Python functions simply",
  "Give me a Data Structures practice quiz",
  "Help me improve my skill gaps",
  "Suggest a project I can build"
];

export default function Mentor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setMsg('');
    setIsLoading(true);

    try {
      const response = await askMentor(userMessage.content);
      setMessages(prev => [...prev, { role: 'mentor', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'mentor', 
        content: "Sorry, I couldn't connect to EduAI Mentor right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(msg);
    }
  };

  // Adjust textarea height automatically
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  if (!user) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <Bot className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600">Please log in to chat with your EduAI Mentor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            EduAI Mentor
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Ready
            </span>
          </h1>
          <p className="text-gray-600">Your personalized AI learning companion</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-primary-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Hi! I'm EduAI Mentor. I can help you learn, practice, plan your career, and work on your skill gaps.</h2>
              <p className="text-gray-600 mb-8 text-lg">
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm text-gray-700 font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, i) => (
                <div key={i} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' ? 'bg-gray-200' : 'bg-primary-100'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="text-gray-500" size={24} />
                    ) : (
                      <Bot className="text-primary-600" size={24} />
                    )}
                  </div>
                  <div className={`px-6 py-4 max-w-[80%] whitespace-pre-wrap ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-2xl rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <Bot className="text-primary-600" size={24} />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-6 py-4 flex items-center gap-3 text-gray-600">
                    <span className="text-sm font-medium">EduAI Mentor is thinking...</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="relative flex items-end bg-white border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 overflow-hidden">
            <textarea 
              value={msg}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..." 
              className="w-full min-h-[56px] resize-none pl-4 pr-14 py-4 focus:outline-none bg-transparent"
              rows={1}
            />
            <button 
              onClick={() => {
                handleSend(msg);
                // reset textarea height
                const textarea = document.querySelector('textarea');
                if (textarea) textarea.style.height = 'auto';
              }}
              disabled={!msg.trim() || isLoading}
              className="absolute right-2 bottom-2 text-white bg-primary-600 p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center w-10 h-10"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-400">Press Enter to send, Shift + Enter for newline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
