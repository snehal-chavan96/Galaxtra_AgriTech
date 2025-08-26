import chromadb
from sentence_transformers import SentenceTransformer
import hashlib

# Load ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="agriculture_data")

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_id(text):
    """Generate a unique ID using SHA256 hash."""
    return hashlib.sha256(text.encode()).hexdigest()[:16]  # Shortened hash ID

def store_document(text):
    """Stores a single document if it does not already exist."""
    try:
        vector = embedding_model.encode(text).tolist()
        doc_id = generate_id(text)

        # Check if document exists
        existing_doc = collection.get(ids=[doc_id])
        if existing_doc and "ids" in existing_doc and existing_doc["ids"]:
            return {"message": "Document already exists"}

        # Store document
        collection.add(ids=[doc_id], embeddings=[vector], metadatas=[{"text": text}])
        return {"message": "Document stored successfully"}

    except Exception as e:
        return {"error": str(e)}

def store_bulk_documents(text_list):
    """Stores multiple documents in bulk to improve efficiency."""
    try:
        ids = []
        vectors = []
        metadatas = []

        for text in text_list:
            doc_id = generate_id(text)

            # Check if document already exists
            existing_doc = collection.get(ids=[doc_id])
            if existing_doc and "ids" in existing_doc and existing_doc["ids"]:
                continue  # Skip if document already exists

            # Encode and store
            ids.append(doc_id)
            vectors.append(embedding_model.encode(text).tolist())
            metadatas.append({"text": text})

        # Add all new documents in bulk
        if ids:
            collection.add(ids=ids, embeddings=vectors, metadatas=metadatas)
            return {"message": f"{len(ids)} documents stored successfully"}
        else:
            return {"message": "No new documents to store"}

    except Exception as e:
        return {"error": str(e)}




# import chromadb
# from sentence_transformers import SentenceTransformer
# import hashlib

# from concurrent.futures import ThreadPoolExecutor


# # Load ChromaDB
# chroma_client = chromadb.PersistentClient(path="./chroma_db")
# collection = chroma_client.get_or_create_collection(name="agriculture_data")

# # Load embedding model
# embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# def generate_id(text):
#     """Generate a unique ID using SHA256 hash."""
#     return hashlib.sha256(text.encode()).hexdigest()[:16]  # Shortened hash ID

# def is_duplicate(text):
#     """Check if a document already exists based on exact text match."""
#     doc_id = generate_id(text)  # Generate hash ID for text

#     # Query ChromaDB for existing document ID
#     results = collection.get(ids=[doc_id])

#     # If ID exists, it's a duplicate
#     if results and results.get("ids") and doc_id in results["ids"]:
#         return True

#     return False

# def store_document(text):
#     """Stores a single document if it does not already exist."""
#     try:
#         if is_duplicate(text):  
#             # print(f"Skipping duplicate document: {text[:30]}...")  # Debug log
#             return {"message": "Document already exists"}  # Avoid storing duplicate data

#         vector = embedding_model.encode(text).tolist()
#         doc_id = generate_id(text)

#         # Store new document
#         collection.add(ids=[doc_id], embeddings=[vector], metadatas=[{"text": text}])
#         # print(f"Stored new document: {text[:30]}...")  # Debug log
#         return {"message": "Document stored successfully"}

#     except Exception as e:
#         print(f"Error storing document: {str(e)}")  # Debug log
#         return {"error": str(e)}


# def encode_text(text):
#     return embedding_model.encode(text).tolist()


# def store_bulk_documents(text_list):
#     """Stores multiple documents in bulk, skipping duplicates."""
#     try:
#         ids = []
#         vectors = []
#         metadatas = []

#         for text in text_list:
#             if is_duplicate(text):  
#                 continue  # Skip duplicates

#             doc_id = generate_id(text)
#             ids.append(doc_id)
#             vectors.append(embedding_model.encode(text).tolist())
#             metadatas.append({"text": text})

#         # Add new documents
#         if ids:
#             collection.add(ids=ids, embeddings=vectors, metadatas=metadatas)
#             return {"message": f"{len(ids)} documents stored successfully"}
#         else:
#             return {"message": "No new documents to store"}

#     except Exception as e:
#         return {"error": str(e)}







# def store_bulk_documents(text_list):
#     try:
#         with ThreadPoolExecutor() as executor:
#             encoded_vectors = list(executor.map(encode_text, text_list))

#         ids = [generate_id(text) for text in text_list if not is_duplicate(text)]
#         metadatas = [{"text": text} for text in text_list if not is_duplicate(text)]

#         if ids:
#             collection.add(ids=ids, embeddings=encoded_vectors, metadatas=metadatas)
#             return {"message": f"{len(ids)} documents stored successfully"}
#         else:
#             return {"message": "No new documents to store"}

#     except Exception as e:



# import sys
# import json
# import chromadb
# from sentence_transformers import SentenceTransformer
# import hashlib

# # Load ChromaDB
# chroma_client = chromadb.PersistentClient(path="./chroma_db")
# collection = chroma_client.get_or_create_collection(name="agriculture_data")

# # Load embedding model
# embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# def generate_id(text):
#     """Generate a unique ID using SHA256 hash."""
#     return hashlib.sha256(text.encode()).hexdigest()[:16]  # Shortened hash ID

# def store_document(text):
#     """Stores a single document if it does not already exist."""
#     try:
#         vector = embedding_model.encode(text).tolist()
#         doc_id = generate_id(text)

#         # Check if document exists
#         existing_doc = collection.get(ids=[doc_id])
#         if existing_doc and "ids" in existing_doc and existing_doc["ids"]:
#             return {"message": "Document already exists"}

#         # Store document
#         collection.add(ids=[doc_id], embeddings=[vector], metadatas=[{"text": text}])
#         return {"message": "Document stored successfully"}

#     except Exception as e:
#         return {"error": str(e)}

# if __name__ == "__main__":
#     try:
#         input_data = json.loads(sys.stdin.read())  # Read input from Node.js
#         text = input_data.get("text", "")

#         if not text:
#             print(json.dumps({"error": "Text is required"}))
#             sys.exit(1)

#         result = store_document(text)
#         print(json.dumps(result))  # Return JSON output to Node.js

#     except Exception as e:
#         print(json.dumps({"error": str(e)}))
#         sys.exit(1)
#         return {"error": str(e)}