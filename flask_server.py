from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import logging
from sklearn.preprocessing import LabelEncoder

logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

try:
    # Load dataset
    crop_data = pd.read_csv('crop_yield.csv')
    crop_data = crop_data.dropna()
    crop_data = crop_data.sort_values(['Crop', 'State', 'Crop_Year'])
    crop_data['Previous_Yield'] = crop_data.groupby(['Crop', 'State'])['Yield'].shift(1)
    crop_data = crop_data.dropna(subset=['Previous_Yield'])
    logging.info("Dataset loaded successfully")

    # Initialize and fit LabelEncoders
    label_encoder_season = LabelEncoder()
    label_encoder_crop = LabelEncoder()
    label_encoder_state = LabelEncoder()

    label_encoder_season.fit(crop_data['Season'])
    label_encoder_crop.fit(crop_data['Crop'])
    label_encoder_state.fit(crop_data['State'])

    # Load model
    model = joblib.load('crop_yield_predictor.joblib')
    logging.info(f"Model loaded successfully: {type(model)}")

except Exception as e:
    logging.error(f"Initialization error: {e}")
    raise

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        logging.debug(f"Received data: {data}")

        # Validate input
        required_fields = ['season', 'crop', 'state', 'size']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        season = data['season']
        crop = data['crop']
        state = data['state']
        try:
            area = float(data['size'])
            if area <= 0:
                return jsonify({'error': 'Area must be positive'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid area value'}), 400

        # Handle season with spaces (from your model training)
        available_seasons = [s.strip() for s in label_encoder_season.classes_]
        if season not in available_seasons:
            return jsonify({
                'error': f'Invalid season: {season}. Valid options: {available_seasons}'
            }), 400

        # Find the exact season name with spaces as used in training
        matching_season = next(
            (s for s in label_encoder_season.classes_ if s.strip() == season),
            None
        )
        
        # Validate categories
        if crop not in label_encoder_crop.classes_:
            return jsonify({'error': f'Invalid crop: {crop}. Valid options: {list(label_encoder_crop.classes_)}'}), 400
        if state not in label_encoder_state.classes_:
            return jsonify({'error': f'Invalid state: {state}. Valid options: {list(label_encoder_state.classes_)}'}), 400

        # Encode inputs
        season_encoded = label_encoder_season.transform([matching_season])[0]
        crop_encoded = label_encoder_crop.transform([crop])[0]
        state_encoded = label_encoder_state.transform([state])[0]

        # Get previous yield
        previous_data = crop_data[(crop_data['Crop'] == crop) & (crop_data['State'] == state)]
        if previous_data.empty:
            previous_yield = crop_data[crop_data['Crop'] == crop]['Yield'].mean()
        else:
            previous_yield = previous_data['Previous_Yield'].iloc[-1]

        if pd.isna(previous_yield):
            return jsonify({'error': 'No historical data available for prediction'}), 400

        # Create input DataFrame
        input_df = pd.DataFrame({
            'Season_encoded': [season_encoded],
            'Area': [1],  # 1 hectare base
            'Crop_encoded': [crop_encoded],
            'State_encoded': [state_encoded],
            'Previous_Yield': [previous_yield]
        })

        # Make prediction
        yield_per_hectare = model.predict(input_df)[0]
        total_yield = yield_per_hectare * area

        return jsonify({
            'yield': round(float(total_yield), 2),
            'unit': 'tons',
            'season': season,
            'crop': crop,
            'state': state,
            'area': area
        })

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)