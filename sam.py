import pandas as pd

# Load the dataset (e.g., CSV file)
dataset = pd.read_csv('crop_yield.csv')  # Replace with your file path

# Specify the column name or index
column_name = 'Season'  # Replace with your column name, or use dataset.columns[0] for the first column

# Find unique elements
unique_elements = dataset[column_name].unique()

# Print the unique elements
print(f"Unique elements in column '{column_name}': {unique_elements}")