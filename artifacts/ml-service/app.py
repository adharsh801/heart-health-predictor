import os
import pickle
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")
DATASET_PATH = os.path.join(os.path.dirname(__file__), "heart_disease_dataset.csv")

model = None
scaler = None

FEATURE_COLUMNS = [
    "age", "sex", "chest_pain_type", "resting_blood_pressure", "cholesterol",
    "fasting_blood_sugar", "resting_ecg", "max_heart_rate", "exercise_induced_angina",
    "st_depression", "st_slope", "num_major_vessels", "thalassemia"
]


def train_model():
    global model, scaler

    df = pd.read_csv(DATASET_PATH)
    X = df[FEATURE_COLUMNS]
    y = df["heart_disease"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained! Accuracy: {accuracy:.4f}")

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)

    with open(SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)

    return accuracy


def load_model():
    global model, scaler
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
        print("Model loaded from disk.")
        return True
    return False


@app.route("/ml/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


@app.route("/ml/predict", methods=["POST"])
def predict():
    global model, scaler

    if model is None or scaler is None:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    missing = [col for col in FEATURE_COLUMNS if col not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    try:
        features = [float(data[col]) for col in FEATURE_COLUMNS]
        input_df = pd.DataFrame([features], columns=FEATURE_COLUMNS)
        input_scaled = scaler.transform(input_df)

        prediction = int(model.predict(input_scaled)[0])
        probability = float(model.predict_proba(input_scaled)[0][1])
        risk_level = "High Risk" if prediction == 1 else "Low Risk"

        return jsonify({
            "prediction": prediction,
            "probability": probability,
            "risk_level": risk_level
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    if not load_model():
        train_model()

    port = int(os.environ.get("ML_PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
