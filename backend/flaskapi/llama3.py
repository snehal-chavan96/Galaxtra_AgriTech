import os
import requests
from langdetect import detect
from googletrans import Translator
from dotenv import load_dotenv
from retrieval import retrieve_relevant_data

# Load API Keys
load_dotenv()
AI_API_KEY = os.getenv("TOGETHER_AI_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# Initialize Translator
translator = Translator()

def get_weather(city):
    """Fetches current weather data for a given city using Weatherstack API."""
    BASE_URL = "http://api.weatherstack.com/current"

    params = {
        "access_key": WEATHER_API_KEY,
        "query": city
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if "current" in data:
        return f"The current weather in {data['location']['name']} is {data['current']['weather_descriptions'][0]} with a temperature of {data['current']['temperature']}°C and humidity of {data['current']['humidity']}%."
    return "Error fetching weather data. Please check the city name or API key."

def call_llama_3(user_question):
    # Detect language of the user input
    detected_lang = detect(user_question)

    # Check if the user is asking about the weather
    weather_keywords = ["weather", "temperature", "forecast", "humidity", "rain", "climate"]
    if any(keyword in user_question.lower() for keyword in weather_keywords):
        # Extract city name (assuming last word is the city)
        city = user_question.split()[-1]
        weather_response = get_weather(city)
        return weather_response

    # Retrieve relevant data for context
    retrieved_data = retrieve_relevant_data(user_question)
    context = " ".join(retrieved_data) if retrieved_data else "No specific data available."

    # Check if user wants a detailed response
    detailed_keywords = ["explain in detail", "give a detailed answer", "in detail", "elaborate", "describe extensively"]
    is_detailed_request = any(keyword in user_question.lower() for keyword in detailed_keywords)

    # Adjust max_tokens based on query type
    max_tokens = 500 if is_detailed_request else 300

    # Improved System Prompt
    system_prompt = f"""
    You are an advanced AI assistant specializing in Agritech, AI, and ML for smart farming. 
    Your goal is to provide highly **accurate, real-time, and actionable** advice on:

    ✔ Crop selection based on soil & climate  
    ✔ Weather-based farming recommendations  
    ✔ Disease and pest control solutions  
    ✔ Government schemes and subsidies for farmers  
    ✔ AI-driven precision farming techniques  
    ✔ Sustainable and organic farming methods  

    **Response Guidelines:**  
    - **For definitions or concepts**, provide a concise explanation first, then elaborate with practical examples.  
    - **For advice-based queries**, offer structured solutions in bullet points.  
    - **If the user asks an unclear question**, **ask for clarification instead of guessing**.  
    - **Always respond in the detected language ({detected_lang})**.  
    - **Keep responses short and conversational in 3-4 sentences unless a detailed answer is explicitly requested**.
    """

    # Construct payload for Llama-3
    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {user_question}"}
        ],
        "max_tokens": max_tokens
    }

    headers = {
        "Authorization": f"Bearer {AI_API_KEY}",
        "Content-Type": "application/json"
    }

    # Call the Together AI API
    response = requests.post("https://api.together.ai/v1/chat/completions", json=payload, headers=headers)

    try:
        data = response.json()

        # Debugging API response
        print("API Response:", data)

        # Check if an error occurred
        if "error" in data:
            return f"API Error: {data['error']['message']}"

        if "choices" not in data:
            return f"Unexpected API Response: {data}"

        ai_response = data["choices"][0]["message"]["content"]

        # If the response is in English but the user's question wasn't, translate back
        if detect(ai_response) == "en" and detected_lang != "en":
            ai_response = translator.translate(ai_response, src="en", dest=detected_lang).text

        return ai_response

    except requests.exceptions.RequestException as e:
        return f"Request Error: {str(e)}"

    except Exception as e:
        return f"Unexpected Error: {str(e)}"
