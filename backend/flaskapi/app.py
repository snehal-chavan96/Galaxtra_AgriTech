from flask import Flask, request, jsonify
from flask_cors import CORS  
import time  
from store import store_document
from retrieval import retrieve_relevant_data
from llama3 import call_llama_3
from scraper import scrape_agriculture_news  

app = Flask(__name__)

# Allow multiple frontend origins
CORS(app, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173" 
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/scrape", methods=["GET"])
def scrape():
    data = scrape_agriculture_news()
    return jsonify({"message": "Scraped data added", "data": data})

@app.route("/add_data", methods=["POST"])
def add_data():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    result = store_document(text)
    return jsonify(result)

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    try:
        if request.method == "OPTIONS":  
            return jsonify({"message": "CORS Preflight Passed"}), 200

        start_time = time.time()  

        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400
        
        user_question = data.get("message", "")
        user_name = data.get("name", "")

        if not user_question:
            return jsonify({"error": "Question is required"}), 400

        # Debugging logs
        print(f"Received question: {user_question}")
        print(f"User name: {user_name}")

        # Retrieve relevant data
        relevant_data = retrieve_relevant_data(user_question)
        context = "\n".join(relevant_data)

        # Personalize response
        prompt = f"Context:\n{context}\nUser Question: {user_question}"
        if user_name:
            prompt = f"{user_name}, " + prompt  

        # Call Llama-3 for response
        response = call_llama_3(prompt)

        print("Chat response time:", time.time() - start_time)  

        return jsonify({"response": response})

    except Exception as e:
        print(f"Error in /chat: {e}")  # Print error to backend logs
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)

# from flask import Flask, request, jsonify
# from flask_cors import CORS  
# import time  
# from store import store_document,store_bulk_documents
# from retrieval import retrieve_relevant_data
# from llama3 import call_llama_3
# from scraper import scrape_agriculture_news  

# app = Flask(__name__)
# CORS(app)

# @app.route("/scrape", methods=["GET"])
# def scrape():
#     data = scrape_agriculture_news()
#     return jsonify({"message": "Scraped data added", "data": data})

# @app.route("/add_data", methods=["POST"])
# def add_data():
#     data = request.json
#     text = data.get("text")  # Single text entry
#     texts = data.get("texts")  # Multiple texts as a list

#     if text:
#         # Handle single text input
#         result = store_document(text)
#         return jsonify({"message": "Single document added", "result": result})

#     elif texts and isinstance(texts, list):
#         # Handle multiple texts input
#         result = store_bulk_documents(texts)
#         return jsonify({"message": "Multiple documents added", "result": result})

#     else:
#         return jsonify({"error": "Provide either 'text' (string) or 'texts' (list)"}), 400

# @app.route("/chat", methods=["POST"])
# def chat():
#     # start_time = time.time()  # Track time

#     data = request.json
#     user_question = data.get("message", "")

#     if not user_question:
#         return jsonify({"error": "Question is required"}), 400

#     # Retrieve context first
#     relevant_data = retrieve_relevant_data(user_question)
#     context = "\n".join(relevant_data)

#     # Call Llama-3 with context
#     response = call_llama_3(f"Context:\n{context}\nUser Question: {user_question}")

#     # print("Chat response time:", time.time() - start_time)  # Debug time

#     return jsonify({"response": response})

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)
