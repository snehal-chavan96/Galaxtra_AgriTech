from flask import Flask, request, jsonify
import os
import requests
from dotenv import load_dotenv
from flask_cors import CORS

# Load API Key
load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

def get_weather(city):
    """Fetches current weather data for a given city using Weatherstack API."""
    BASE_URL = "http://api.weatherstack.com/current"

    params = {
        "access_key": API_KEY,
        "query": city
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if "current" in data:
        return {
            "city": data['location']['name'],
            "temperature": data['current']['temperature'],
            "humidity": data['current']['humidity'],
            "weather": data['current']['weather_descriptions'][0]
        }
    return {"error": "Error fetching weather data. Please check the city name or API key."}

@app.route("/weather", methods=["GET"])
def weather_api():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City is required"}), 400

    weather_data = get_weather(city)
    return jsonify(weather_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
