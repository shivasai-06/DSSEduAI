import { supabase } from './supabase';
// Force HMR reload for port 8001
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';

export async function askMentor(message: string): Promise<string> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (session) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/gemini/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      return data.response;
    } else {
      return data.response || "Sorry, I couldn't connect to EduAI Mentor right now. Please try again.";
    }
  } catch (err) {
    console.error('Mentor API Error:', err);
    return "Sorry, I couldn't connect to EduAI Mentor right now. Please try again.";
  }
}
