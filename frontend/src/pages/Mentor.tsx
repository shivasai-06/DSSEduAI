import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Mentor() {
  const [msg, setMsg] = useState('');
  
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Mentor</h1>
        <p className="text-gray-600">Your personal tutor available 24/7 to answer questions.</p>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <Bot className="text-primary-600" size={24} />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-6 py-4 max-w-[80%]">
              <p className="text-gray-800">Hi Alex! I see you're currently working on "Node.js API Design". How can I help you today? Are you stuck on a specific concept?</p>
            </div>
          </div>
          
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
              <User className="text-gray-500" size={24} />
            </div>
            <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%]">
              <p>Can you explain what middleware is in Express?</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <Bot className="text-primary-600" size={24} />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-6 py-4 max-w-[80%]">
              <p className="text-gray-800">Think of middleware as an assembly line worker. When a request comes in, it passes down the line. Each middleware function can inspect the request, modify it, end the process entirely, or pass it to the next worker using `next()`. For example, a logging middleware writes down the request details and then calls `next()`.</p>
            </div>
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <form className="relative flex items-center" onSubmit={e => e.preventDefault()}>
            <input 
              type="text" 
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Ask me anything..." 
              className="w-full bg-white border border-gray-300 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="absolute right-2 text-white bg-primary-600 p-2 rounded-lg hover:bg-primary-700">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
