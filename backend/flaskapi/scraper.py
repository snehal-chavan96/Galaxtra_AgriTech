import requests
import json
from bs4 import BeautifulSoup
from store import store_bulk_documents  # Use bulk insertion

# Function to scrape agricultural news
# def scrape_agriculture_news():
#     url = "https://www.krishijagran.com/"  # Example agriculture website
#     headers = {"User-Agent": "Mozilla/5.0"}

#     response = requests.get(url, headers=headers)
#     soup = BeautifulSoup(response.text, "html.parser")

#     articles = soup.find_all("h2", class_="title")  # Modify as per the website structure

#     scraped_data = []
#     for article in articles[:5]:  # Limit to 5 latest news
#         title = article.text.strip()
#         link = article.find("a")["href"]
#         full_text = f"{title} - Read more at {link}"
#         scraped_data.append(full_text)

#     # Store in ChromaDB using bulk insertion
#     if scraped_data:
#         store_bulk_documents(scraped_data)

#     return scraped_data


# 2============================================================

# def scrape_agriculture_news():
#     url = "https://www.fao.org/newsroom/en"  # Updated FAO news website
#     headers = {"User-Agent": "Mozilla/5.0"}

#     response = requests.get(url, headers=headers)
    
#     if response.status_code != 200:
#         print("Error: Failed to fetch the page")
#         return []

#     soup = BeautifulSoup(response.text, "html.parser")

#     articles = soup.find_all("div", class_="card-body")  # Updated structure

#     scraped_data = []
#     for article in articles[:5]:  # Limit to 5 latest news
#         p_tags = article.find_all("p")

#         # Extract the second <p> tag's text
#         second_p_text = p_tags[1].text.strip() if len(p_tags) >= 2 else "No second <p> tag found"

#         # Extract the <a> tag's text
#         a_tag = article.find("a")
#         link_text = a_tag.text.strip() if a_tag else "No <a> tag found"

#         full_text = f"{link_text} - {second_p_text}"
#         scraped_data.append(full_text)

#     # Store in ChromaDB using bulk insertion
#     if scraped_data:
#         store_bulk_documents(scraped_data)

#     return scraped_data

# =====================3 =====================

def scrape_agriculture_news():
    """Fetch agricultural data from the Hugging Face dataset API."""
    url = "https://datasets-server.huggingface.co/rows?dataset=AnuradhaPoddar%2FAgricultureDataset&config=default&split=train&offset=0&length=5800"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("Error: Failed to fetch the dataset")
        return []

    data = response.json()

    # Debugging: Print the sample data structure
    print("Sample Data Structure:", json.dumps(data, indent=4))

    # Extracting relevant rows
    rows = data.get("rows", [])  # Ensure we access "rows" correctly

    scraped_data = []
    for row in rows:
        row_data = row.get("row", {})  # Access actual data inside each row

        # Extract specific fields (Modify these field names based on the dataset structure)
        title = row_data.get("title", "No Title Found")
        description = row_data.get("description", "No Description Available")

        full_text = f"{title} - {description}"
        scraped_data.append(full_text)

    # Store in ChromaDB using bulk insertion
    if scraped_data:
        store_bulk_documents(scraped_data)

    return scraped_data


# Run scraper when executed
if __name__ == "_main_":
    scraped_articles = scrape_agriculture_news()
    print("Scraped & Stored Articles:", scraped_articles)


# import sys
# import json
# import requests
# from bs4 import BeautifulSoup
# from store import store_bulk_documents

# # Function to scrape agricultural news
# def scrape_agriculture_news():
#     url = "https://www.krishijagran.com/"
#     headers = {"User-Agent": "Mozilla/5.0"}

#     response = requests.get(url, headers=headers)
#     soup = BeautifulSoup(response.text, "html.parser")

#     articles = soup.find_all("h2", class_="title")

#     scraped_data = []
#     for article in articles[:5]:  # Limit to 5 latest news
#         title = article.text.strip()
#         link = article.find("a")["href"]
#         full_text = f"{title} - Read more at {link}"

#         if not is_duplicate(full_text):  # ✅ Avoid storing duplicate articles
#             scraped_data.append(full_text)

#     if scraped_data:
#         store_bulk_documents(scraped_data)

#     return {"scraped_articles": scraped_data}

# if __name__ == "__main__":
#     result = scrape_agriculture_news()
#     # print(json.dumps(result, indent=4))


# import requests
# from bs4 import BeautifulSoup
# from store import store_bulk_documents  # Use bulk insertion

# # Function to scrape agricultural news
# def scrape_agriculture_news():
#     url = "https://www.krishijagran.com/"  # Example agriculture website
#     headers = {"User-Agent": "Mozilla/5.0"}

#     response = requests.get(url, headers=headers)
#     soup = BeautifulSoup(response.text, "html.parser")

#     articles = soup.find_all("h2", class_="title")  # Modify as per the website structure

#     scraped_data = []
#     for article in articles[:5]:  # Limit to 5 latest news
#         title = article.text.strip()
#         link = article.find("a")["href"]
#         full_text = f"{title} - Read more at {link}"
#         scraped_data.append(full_text)

#     # Store in ChromaDB using bulk insertion
#     if scraped_data:
#         store_bulk_documents(scraped_data)

#     return scraped_data

# # Run scraper when executed
# if __name__ == "__main__":
#     scraped_articles = scrape_agriculture_news()
#     print("Scraped & Stored Articles:", scraped_articles)
