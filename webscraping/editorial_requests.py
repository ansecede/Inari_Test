from config import API_URL

import requests

first_20_url = f"{API_URL}/primeros20"
last_editorial_url = f"{API_URL}/lastentry"
insert_one_url = f"{API_URL}"


def insert_last_20_editorials(entries):
    response = requests.post(first_20_url, json=entries)

    print(response.json())
    return response.json()


def get_last_entry():
    response = requests.get(last_editorial_url)

    return response.json()


def insert_entry(entry):
    response = requests.post(API_URL, json=entry)

    print(response.json())
    return response.json()
