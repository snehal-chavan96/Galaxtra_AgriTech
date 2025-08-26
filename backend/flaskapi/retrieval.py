from store import collection, embedding_model

def retrieve_relevant_data(query):
    query_vector = embedding_model.encode(query).tolist()
    
    # Fetch results from the vector database
    results = collection.query(query_embeddings=[query_vector], n_results=3)

    # Check if metadatas exist and contain results
    if not results or "metadatas" not in results or not results["metadatas"] or not results["metadatas"][0]:
        return [
            "I couldn't find exact data, but you might find useful insights here:",
            "- [Google Search](https://www.google.com/search?q=" + query.replace(" ", "+") + ")",
            "- [Wikipedia](https://en.wikipedia.org/wiki/Special:Search?search=" + query.replace(" ", "+") + ")",
            "- [Other trusted sources relevant to the topic]"
        ]

    # Debugging: Print metadata to check structure
    print("Retrieved Metadata:", results["metadatas"])

    # Extract and sort results by relevance (if "score" exists)
    sorted_results = sorted(
        results["metadatas"][0], 
        key=lambda x: x.get("score", 0), 
        reverse=True
    )

    # Ensure the "text" key exists before returning
    return [res.get("text", "No relevant text found.") for res in sorted_results]



# ======================================================
# from store import collection, embedding_model

# def retrieve_relevant_data(query):
#     query_vector = embedding_model.encode(query).tolist()
#     results = collection.query(query_embeddings=[query_vector], n_results=3)  # Increased to 3

#     if "metadatas" not in results or not results["metadatas"][0]:
#           return [
#             "I couldn't find exact data, but you might find useful insights here:",
#             "- [Google Search](https://www.google.com/search?q=" + query.replace(" ", "+") + ")",
#             "- [Wikipedia](https://en.wikipedia.org/wiki/Special:Search?search=" + query.replace(" ", "+") + ")",
#             "- [Other trusted sources relevant to the topic]"
#         ]


#     # Extract and sort by relevance
#     sorted_results = sorted(results["metadatas"][0], key=lambda x: x.get("score", 0), reverse=True)
    
#     return [res["text"] for res in sorted_results]



# ======================================================
# def retrieve_relevant_data(query):
#     query_vector = embedding_model.encode(query).tolist()
#     results = collection.query(query_embeddings=[query_vector], n_results=3)  # Increased to 3

#     if "metadatas" not in results or not results["metadatas"][0]:
#         return ["No relevant data found"]

#     # Extract and sort by relevance
#     sorted_results = sorted(results["metadatas"][0], key=lambda x: x.get("score", 0), reverse=True)
    
#     return [res["text"] for res in sorted_results]
