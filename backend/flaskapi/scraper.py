import requests
from bs4 import BeautifulSoup

# Function to scrape agricultural news
def scrape_agriculture_news():
    url = "https://www.krishijagran.com/" 
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    articles = soup.find_all("h2", class_="title") 

    scraped_data = []
    for article in articles[:5]: 
        title = article.text.strip()
        link = article.find("a")["href"]
        full_text = f"{title} - Read more at {link}"
        scraped_data.append(full_text)

    return scraped_data

# Run scraper when executed
if __name__ == "__main__":
    scraped_articles = scrape_agriculture_news()
    print("Scraped & Stored Articles:", scraped_articles)
