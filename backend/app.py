from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("models/model.pkl")
encoders = joblib.load("models/encoders.pkl")


@app.route("/")
def home():
    return "Crop Price Prediction Backend Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        input_data = pd.DataFrame([data])

        categorical_cols = [
            "Location",
            "Soil type",
            "Irrigation",
            "Crops",
            "Season"
        ]

        for col in categorical_cols:
            input_data[col] = input_data[col].astype(str).str.strip()

            known_labels = encoders[col].classes_

            if input_data[col].iloc[0] not in known_labels:
                return jsonify({
                        "error": f"Invalid value for {col}. Allowed: {list(known_labels[:10])}"
                })

            input_data[col] = encoders[col].transform(
                input_data[col]
    )

        prediction = model.predict(input_data)

        return jsonify({
    "predicted_price": round(float(prediction[0]), 2),

    "trendData": [
       {"month": "Jan", "price": prediction[0] * 0.60},
    {"month": "Feb", "price": prediction[0] * 0.65},
    {"month": "Mar", "price": prediction[0] * 0.70},
    {"month": "Apr", "price": prediction[0] * 0.75},
    {"month": "May", "price": prediction[0] * 0.80},
    {"month": "Jun", "price": prediction[0] * 0.84},
    {"month": "Jul", "price": prediction[0] * 0.88},
    {"month": "Aug", "price": prediction[0] * 0.91},
    {"month": "Sep", "price": prediction[0] * 0.95},
    {"month": "Oct", "price": prediction[0] * 0.97},
    {"month": "Nov", "price": prediction[0] * 0.99},
    {"month": "Dec", "price": prediction[0]}
    ],

    "cropCompare": [
        {"crop": data["Crops"], "value": prediction[0]},
        {"crop": "Coffee", "value": prediction[0] * 0.90},
        {"crop": "Coconut", "value": prediction[0] * 0.82},
        {"crop": "Cotton", "value": prediction[0] * 0.76},
        {"crop": "Cashew", "value": prediction[0] * 0.94},
        {"crop": "Groundnut", "value": prediction[0] * 0.86}
    ],

    "seasonData": [
        {"name": "Kharif", "value": prediction[0] * 0.45},
        {"name": "Rabi", "value": prediction[0] * 0.35},
        {"name": "Summer", "value": prediction[0] * 0.20}
    ]
})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    import os

app.run(
    host="0.0.0.0",
    port=int(os.environ.get("PORT", 5002))
)