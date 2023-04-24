from editorial_requests import insert_last_20_editorials
from editorials_utils import get_available_editorials

import requests
from bs4 import BeautifulSoup


def main():
    editorials_info = {"info": []}
    available_editorials = get_available_editorials()

    for editorial in available_editorials:
        info = {"title": "", "caption": "", "publish_date_text": "", "publish_date_utc": "",
                "paragraph_qty": "", "body": []}

        editorial_a_tag = editorial.find("a")
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

        editorials_info["info"].append(info)

    print(editorials_info)
    # insert_last_20_editorials(editorials_info)


if __name__ == "__main__":
    main()
