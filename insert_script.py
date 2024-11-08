import os
import csv
import pandas as pd
from datetime import datetime, timedelta
import hashlib
import secrets
import random
from pathlib import Path
from typing import List, Dict, Any

class SeraphSQLGenerator:
    def __init__(self, csv_directory: str, output_file: str):
        self.csv_directory = csv_directory
        self.output_file = output_file
        self.artist_id_map = {}  # Map to maintain consistent artist IDs
        self.art_id_map = {}     # Map between titles and art IDs
        self.user_id_counter = 1  # Generate sequential user IDs

        self.table_mappings = {
            'art_pieces': {
                'required_columns': ['Title', 'Artist', 'Creation Date', 'Image URL', 'Description', 'Price'],
                'table_name': 'ArtPieces',
                'csv_to_db_mapping': {
                    'Title': 'Title',
                    'Artist': 'ArtistID',
                    'Creation Date': 'CreatedAt',
                    'Description': 'Description',
                    'Image URL': 'ImageURL',
                    'Price': 'Price'
                },
                'transformations': {
                    'ArtistID': self._get_or_create_artist_id
                }
            },
            'auction_data': {
                'required_columns': ['Title', 'Artist', 'Creation Date', 'Image URL', 'Description', 'Price'],
                'table_name': 'Auctions',
                'csv_to_db_mapping': {
                    'Title': None,
                    'Price': 'StartPrice',
                },
                'transformations': {
                    'ArtID': lambda row: self._get_art_id(row['Title']),
                    'ArtistID': self._get_or_create_artist_id,
                    'ReservePrice': lambda row: float(row['Price']) * 1.2,
                    'StartDate': lambda x: datetime.now(),
                    'EndDate': lambda x: datetime.now() + timedelta(days=7),
                    'IsActive': lambda x: 1
                }
            }
        }

    def _get_or_create_artist_id(self, row: Dict) -> int:
        """Get or create an artist ID and insert artist to Users table if new."""
        artist_name = row['Artist']
        if artist_name not in self.artist_id_map:
            self.artist_id_map[artist_name] = self.user_id_counter
            self.user_id_counter += 1
        return self.artist_id_map[artist_name]

    def generate_sql_file(self):
        """Generate SQL file with all insert statements."""
        try:
            with open(self.output_file, 'w', encoding='utf-8') as f:
                f.write("-- Generated SQL Insert Statements\n")
                f.write("-- Generated at: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n\n")
                
                file_order = ['art_pieces', 'auction_data']
                
                for file_prefix in file_order:
                    for file in os.listdir(self.csv_directory):
                        if not file.startswith(file_prefix):
                            continue
                        
                        file_path = Path(self.csv_directory) / file
                        mapping = self.table_mappings[file_prefix]
                        
                        insert_statements = self._process_csv_file(file_path, mapping)
                        f.writelines(insert_statements)
                
                print(f"\nSQL file generated successfully: {self.output_file}")
                
        except Exception as e:
            print(f"Error generating SQL file: {str(e)}")
