import os
import requests
from dotenv import load_dotenv

# Load API Key
load_dotenv()
API_KEY = os.getenv("TOGETHER_AI_API_KEY")

def call_llama_3(user_question):
    context = " "

    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        "messages": [
            {"role": "system", "content": "You are an expert in agriculture. Use the provided context to answer."},
            {"role": "user", "content": f"Context: {context} \n\nQuestion: {user_question}"}
        ],
        "max_tokens": 200
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post("https://api.together.ai/v1/chat/completions", json=payload, headers=headers)

    try:
        data = response.json()
        
        print("API Response:", data)

        if "error" in data:
            return f"API Error: {data['error']['message']}"

       
        if "choices" not in data:
            return f"Unexpected API Response: {data}"

        return data["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException as e:
        return f"Request Error: {str(e)}"

    except Exception as e:
        return f"Unexpected Error: {str(e)}"
