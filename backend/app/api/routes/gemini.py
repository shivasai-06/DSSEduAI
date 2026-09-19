from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.gemini_service import gemini_service
from app.api.deps import get_optional_user, get_supabase_client

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def gemini_chat(request: ChatRequest, current_user: dict | None = Depends(get_optional_user)):
    """
    Direct Gemini chat endpoint for EduAI Mentor.
    """
    if not request.message.strip():
        return {
            "success": False,
            "response": "Please enter a message to ask EduAI Mentor."
        }

    context_str = ""
    if current_user:
        try:
            supabase = get_supabase_client()
            user_id = current_user["id"]
            supabase.postgrest.auth(current_user["token"])
            
            # Fetch Profile
            profile_res = supabase.table("users").select("target_career").eq("id", user_id).execute()
            target_career = profile_res.data[0].get("target_career", "Unknown") if profile_res.data else "Unknown"

            # Fetch Assessments
            assessments_res = supabase.table("assessments").select("topic, score").eq("user_id", user_id).execute()
            assessments = assessments_res.data if assessments_res.data else []

            # Fetch Skills (with Skill name)
            skills_res = supabase.table("user_skills").select("current_level, target_level, skills(name)").eq("user_id", user_id).execute()
            skills = skills_res.data if skills_res.data else []
            
            # Fetch Roadmap/Progress
            roadmap_res = supabase.table("user_courses").select("status, courses(title)").eq("user_id", user_id).execute()
            roadmap = roadmap_res.data if roadmap_res.data else []

            # Build context strings
            assessment_text = "\n".join([f"- {a.get('topic')}: {a.get('score')}" for a in assessments]) if assessments else "None"
            
            skill_levels = []
            skill_gaps = []
            for s in skills:
                name = s.get('skills', {}).get('name', 'Unknown')
                curl = s.get('current_level', 0)
                tarl = s.get('target_level', 0)
                
                # Determine text level based on score (0-100)
                if curl < 30: level_word = "Beginner"
                elif curl < 70: level_word = "Intermediate"
                else: level_word = "Advanced"
                
                level_text = f"{name} — {level_word} (Score: {curl})"
                skill_levels.append(level_text)
                
                if tarl > curl:
                    gap_diff = tarl - curl
                    priority = "High Priority" if gap_diff > 30 else "Needs Improvement"
                    skill_gaps.append(f"{name} — {priority}")
            
            skills_text = "\n".join(skill_levels) if skill_levels else "None"
            gaps_text = "\n".join(skill_gaps) if skill_gaps else "None"
            
            roadmap_text = "\n".join([f"- {r.get('courses', {}).get('title', 'Unknown')} (Status: {r.get('status')})" for r in roadmap]) if roadmap else "None"
            
            context_str = f"Student target career:\n{target_career}\n\nAssessed skills:\n{assessment_text}\n\nSkill levels:\n{skills_text}\n\nSkill gaps:\n{gaps_text}\n\nCurrent roadmap & progress:\n{roadmap_text}"
            
        except Exception:
            pass

    try:
        response_text = gemini_service.generate_text(request.message, context_str if context_str else None)
        return {
            "success": True,
            "response": response_text
        }
    except Exception as e:
        return {
            "success": False,
            "response": "EduAI Mentor is temporarily unavailable."
        }
