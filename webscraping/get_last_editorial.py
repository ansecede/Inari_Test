from editorials_utils import get_available_editorials

import requests
from bs4 import BeautifulSoup


def get_last_editorial():
    info = {"title": "", "caption": "", "publish_date_text": "", "publish_date_utc": "",
            "paragraph_qty": "", "body": []}

    available_editorials = get_available_editorials()
    last_editorial = available_editorials[0]

    editorial_a_tag = last_editorial.find("a")
    path = editorial_a_tag["href"]

    editorial_route = f"https://www.eluniverso.com{path}"
    editorial_response = requests.get(editorial_route)
    editorial_soup = BeautifulSoup(editorial_response.text, "html.parser")

    article = editorial_soup.find("div", class_="content")
    # El primer h1 es el título y el p que le sigue el subtitulo
    info["title"] = article.find("h1").text.strip()
    info["caption"] = article.find("p").text.strip()

    date = article.find("p", class_="date")
    info["publish_date_text"] = date.text.strip()
    info["publish_date_utc"] = date.find("time")["datetime"]

    article_body = article.find("section", class_="article-body")
    paragraphs = article_body.find_all("p", class_="prose-text")

    info["body"] = [paragraph.text.strip() for paragraph in paragraphs]
    info["paragraph_qty"] = len(paragraphs)
