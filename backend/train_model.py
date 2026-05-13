import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
data = pd.read_csv(
    "dataset/dataset.csv",
    engine="python",
    on_bad_lines="skip"
)

# Convert numeric columns
numeric_cols = [
    "Year",
    "Area",
    "Rainfall",
    "Temperature",
    "yeilds",
    "Humidity",
    "price"
]

for col in numeric_cols:
    data[col] = pd.to_numeric(data[col], errors="coerce")

data = data.dropna()

# Encode categorical
encoders = {}

categorical_cols = [
    "Location",
    "Soil type",
    "Irrigation",
    "Crops",
    "Season"
]

for col in categorical_cols:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    encoders[col] = le

# Features
X = data[
    [
        "Year",
        "Location",
        "Area",
        "Rainfall",
        "Temperature",
        "Soil type",
        "Irrigation",
        "yeilds",
        "Humidity",
        "Crops",
        "Season"
    ]
]

# Target
y = data["price"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train
model = RandomForestRegressor(
    n_estimators=300,
    random_state=42
)

model.fit(X_train, y_train)

# Predict
preds = model.predict(X_test)

# Accuracy metrics
mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)

print("\n===== MODEL ACCURACY =====")
print("MAE:", round(mae, 2))
print("R2 Score:", round(r2, 4))

# Save
joblib.dump(model, "models/model.pkl")
joblib.dump(encoders, "models/encoders.pkl")

print("\nModel trained successfully")
print("Saved in models/")
print("Rows used:", len(data))