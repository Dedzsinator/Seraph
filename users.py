from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Define roles to insert into Roles table
roles = ["Admin", "Buyer", "VIP Buyer"]
roles_inserts = "\n".join([f"INSERT INTO Roles (RoleName) VALUES ('{role}');" for role in roles])

# Generate Users data
num_users = 100  # Adjust this number as needed
users_data = []
for _ in range(num_users):
    username = fake.user_name()
    email = fake.email()
    password_hash = fake.sha256(raw_output=False)  # Simulate a hashed password
    salt = fake.sha256(raw_output=False)  # Simulate a salt
    created_at = fake.date_time_this_year().strftime('%Y-%m-%d %H:%M:%S')
    is_active = random.choice([0, 1])
    users_data.append((username, email, password_hash, salt, created_at, is_active))

users_inserts = "\n".join([
    f"INSERT INTO Users (Username, Email, PasswordHash, Salt, CreatedAt, IsActive) VALUES "
    f"('{user[0]}', '{user[1]}', '{user[2]}', '{user[3]}', '{user[4]}', {user[5]});"
    for user in users_data
])

# Generate UserProfiles data with links to Users table
user_profiles_inserts = "\n".join([
    f"INSERT INTO UserProfiles (UserID, FirstName, LastName, Bio, ProfilePic) VALUES "
    f"({i+1}, '{fake.first_name()}', '{fake.last_name()}', '{fake.sentence(nb_words=10)}', 'https://via.placeholder.com/150');"
    for i in range(num_users)
])

# Assign random roles to users in UserRoles table
user_roles_inserts = "\n".join([
    f"INSERT INTO UserRoles (UserID, RoleID) VALUES ({user_id}, {random.randint(1, len(roles))});"
    for user_id in range(1, num_users + 1)
])

# Select top buyers (subset of users) and generate TopBuyers data
num_top_buyers = min(5, num_users)  # Limit top buyers to a subset of users
top_buyers_data = []
for rank in range(1, num_top_buyers + 1):
    user_id = random.randint(1, num_users)  # Randomly select a user
    total_purchases = round(random.uniform(100, 10000), 2)  # Generate a random total purchase amount
    last_purchase_date = fake.date_time_this_year().strftime('%Y-%m-%d %H:%M:%S')
    top_buyers_data.append((user_id, total_purchases, last_purchase_date, rank))

top_buyers_inserts = "\n".join([
    f"INSERT INTO TopBuyers (UserID, TotalPurchases, LastPurchaseDate, Rank) VALUES "
    f"({buyer[0]}, {buyer[1]}, '{buyer[2]}', {buyer[3]});"
    for buyer in top_buyers_data
])

# Combine all inserts into one script
sql_script = f"""
-- Insert Roles
{roles_inserts}

-- Insert Users
{users_inserts}

-- Insert UserProfiles
{user_profiles_inserts}

-- Insert UserRoles
{user_roles_inserts}

-- Insert TopBuyers
{top_buyers_inserts}
"""

# Write the SQL script to a file
with open("user_inserts.sql", "w") as file:
    file.write(sql_script)

print("SQL script has been saved to 'user_inserts.sql'")
