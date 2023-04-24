from config import EDITORIALS_URL

import requests
from bs4 import BeautifulSoup


def scrape_available_editorials():
    editorials_response = requests.get(EDITORIALS_URL)

    editorials_soup = BeautifulSoup(editorials_response.text, "html.parser")

    editorials = editorials_soup.find("ul", class_="feed")
    available_editorials = editorials.find_all("li")

    return available_editorials


def are_same_editorials(info1, info2):
    # antes de comparar, debo convertir las fechas con la libreria datetime

    return info1["title"] == info2["title"] and info1["publish_date_utc"] == info2["publish_date_utc"]
