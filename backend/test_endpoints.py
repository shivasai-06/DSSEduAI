import httpx

print("Testing Health")
r = httpx.get("http://127.0.0.1:8001/api/v1/health")
print(r.status_code, r.text)

print("Testing AI Mentor (No Auth)")
r = httpx.post("http://127.0.0.1:8001/api/v1/ai/mentor", json={"message": "What should I learn next?"})
print(r.status_code, r.text)
