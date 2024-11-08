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
    def __init__(self, csv_directory: str, output_file: str, artist_csv: str):
        self.csv_directory = csv_directory
        self.output_file = output_file
        self.artist_csv = artist_csv
        self.artist_id_map = {}  # To maintain consistent artist IDs
        self.art_id_map = {}     # To maintain mapping between titles and art IDs
        self.user_id_counter = 1  # To generate sequential user IDs
        
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
                    'Price': None
                },
                'transformations': {
                    'ArtistID': self._get_or_create_artist_id,
                    'Category': lambda x: random.choice(['Painting', 'Sculpture', 'Digital', 'Photography'])
                }
            },
            # Add mappings for other tables as required...
        }

    def _sanitize_string(self, value: str) -> str:
        return str(value).replace("'", "''") if value else 'NULL'

    def _hash_password(self, password: str, salt: str) -> str:
        return hashlib.sha256((password + salt).encode()).hexdigest()

    def _get_or_create_artist_id(self, row: Dict) -> int:
        artist_name = row['Artist']
        if artist_name not in self.artist_id_map:
            self.artist_id_map[artist_name] = len(self.artist_id_map) + 1
        return self.artist_id_map[artist_name]

    def _create_user_and_get_id(self, artist_name: str) -> str:
        user_id = self.user_id_counter
        self.user_id_counter += 1
        return user_id

    def _format_value(self, value: Any) -> str:
        if value is None:
            return 'NULL'
        elif isinstance(value, (int, float)):
            return str(value)
        elif isinstance(value, datetime):
            return f"'{value.strftime('%Y-%m-%d %H:%M:%S')}'"
        else:
            return f"'{self._sanitize_string(str(value))}'"

    def _generate_insert_statement(self, table_name: str, columns: List[str], values: List[Any]) -> str:
        values_str = ', '.join(self._format_value(v) for v in values)
        return f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({values_str});\n"

    def _generate_artist_inserts(self) -> List[str]:
        with open(self.artist_csv, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header
            insert_statements = []
            for row in reader:
                artist_name = row[0]
                username = f"{self._sanitize_string(artist_name.lower().replace(' ', ''))}{random.randint(100, 999)}"
                password = f"{artist_name}{random.randint(1000, 9999)}"
                salt = secrets.token_hex(16)
                password_hash = self._hash_password(password, salt)
                user_id = self._create_user_and_get_id(artist_name)
                
                user_insert = self._generate_insert_statement(
                    'Users',
                    ['Username', 'Email', 'PasswordHash', 'Salt', 'CreatedAt', 'IsActive'],
                    [
                        username,
                        f"{username}@example.com",
                        password_hash,
                        salt,
                        datetime.now(),
                        1
                    ]
                )
                insert_statements.append(user_insert)
            return insert_statements

    def generate_sql_file(self):
        """Generate SQL file with all insert statements."""
        with open(self.output_file, 'w', encoding='utf-8') as f:
            f.write("-- Generated SQL Insert Statements\n")
            f.write("-- Generated at: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n\n")
            
            # Generate artist user profiles first
            artist_inserts = self._generate_artist_inserts()
            f.writelines(artist_inserts)
            
            # Process other CSV files as per mappings
            # ... rest of your table processing

# Example usage:
if __name__ == "__main__":
    generator = SeraphSQLGenerator(
        csv_directory=".",
        output_file="seraph_artists.sql",
        artist_csv="artists.csv"
    )
    generator.generate_sql_file()
