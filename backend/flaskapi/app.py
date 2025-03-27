from flask import Flask, request, jsonify
from flask_cors import CORS  
import time  
from llama3 import call_llama_3
from scraper import scrape_agriculture_news  

app = Flask(__name__)
CORS(app)

@app.route("/scrape", methods=["GET"])
def scrape():
    data = scrape_agriculture_news()
    return jsonify({"message": "Scraped data added", "data": data})


@app.route("/chat", methods=["POST"])
def chat():
    start_time = time.time()  

    data = request.json
    user_question = data.get("message", "")

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    context = ""

    response = call_llama_3(f"Context:\n{context}\nUser Question: {user_question}")

    print("Chat response time:", time.time() - start_time) 

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
