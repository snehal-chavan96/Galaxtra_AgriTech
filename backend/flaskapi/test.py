import requests

# API Endpoint
url = "https://datasets-server.huggingface.co/info?dataset=AnuradhaPoddar%2FAgricultureDataset"

# Fetch API Response
response = requests.get(url)
data = response.json()

# Extract total rows
total_rows = data.get("dataset_info", {}).get("default", {}).get("splits", {}).get("train", {}).get("num_examples", "Not Found")

print(f"Total rows in the dataset: {total_rows}")
