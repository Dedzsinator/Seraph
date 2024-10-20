import requests
import csv
import random

# Constants
HARVARD_API_URL = "https://api.harvardartmuseums.org/object"
HARVARD_API_KEY = "bf26671b-2bcf-453e-a0ba-2bbdd03c47c3"  # Replace with your actual API key
CLASSIFICATIONS = ["Arms and Armor", "Coin", "Manuscripts", "Musical Instruments", "Prints"]  # Add more classifications as needed

# Function to read existing CSV data
def read_csv(filename):
    try:
        with open(filename, mode="r", newline="", encoding="utf-8") as file:
            reader = csv.reader(file)
            next(reader)  # Skip header
            return list(reader)
    except FileNotFoundError:
        return []

# Function to save data to CSV files
def save_to_csv(filename, data):
    with open(filename, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerows(data)

# Function to fetch data from the Harvard API for a given classification
def fetch_harvard_data(classification):
    params = {
        "apikey": HARVARD_API_KEY,
        "size": 100,  # Number of records to fetch per classification
        "hasimage": 1,
        "classification": classification,
    }
    response = requests.get(HARVARD_API_URL, params=params)
    return response.json()

# Extract relevant data from the Harvard API
harvard_art_pieces = []
for classification in CLASSIFICATIONS:
    data = fetch_harvard_data(classification)
    for item in data["records"]:
        title = item.get("title", "Unknown Title")
        artist = item.get("people", [{}])[0].get("name", "Unknown Artist")
        creation_date = item.get("dated", "Unknown Date")
        image_url = item.get("primaryimageurl", "No Image URL")
        description = item.get("description", "No Description")
        price = round(random.uniform(1000, 10000), 2)  # Random price between 1000 and 10000

        harvard_art_pieces.append([title, artist, creation_date, image_url, description, price])
        print(f"Harvard ({classification}): {title}")

# Read existing data
existing_regular_site_data = read_csv("regular_site_data.csv")
existing_auction_data = read_csv("auction_data.csv")

# Convert existing data to sets for faster lookup
existing_regular_site_set = set(tuple(row) for row in existing_regular_site_data)
existing_auction_set = set(tuple(row) for row in existing_auction_data)

# Shuffle and split data into 70-30 ratio
random.shuffle(harvard_art_pieces)
split_index = int(len(harvard_art_pieces) * 0.7)
regular_site_data = harvard_art_pieces[:split_index]
auction_data = harvard_art_pieces[split_index:]

# Filter out existing data
new_regular_site_data = [row for row in regular_site_data if tuple(row) not in existing_regular_site_set]
new_auction_data = [row for row in auction_data if tuple(row) not in existing_auction_set]

# Save new data to CSV files
save_to_csv("regular_site_data.csv", new_regular_site_data)
save_to_csv("auction_data.csv", new_auction_data)

print("Data saved to CSV files successfully.")