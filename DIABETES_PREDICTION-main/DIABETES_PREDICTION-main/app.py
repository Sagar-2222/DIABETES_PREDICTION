from flask import Flask, render_template, request
import numpy as np
import pickle

# Load trained model and scaler
model = pickle.load(open('diabetes_model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the form in the correct order
        pregnancies = float(request.form['pregnancies'])
        glucose = float(request.form['glucose'])
        bloodpressure = float(request.form['bloodpressure'])
        skinthickness = float(request.form['skinthickness'])
        insulin = float(request.form['insulin'])
        bmi = float(request.form['bmi'])
        dpf = float(request.form['dpf'])
        age = float(request.form['age'])
        
        # Create input array in correct order
        input_data = np.array([[pregnancies, glucose, bloodpressure, skinthickness, 
                               insulin, bmi, dpf, age]])
        
        # Scale the input data
        input_data_scaled = scaler.transform(input_data)

        # Make a prediction
        prediction = model.predict(input_data_scaled)
        result = "Diabetic 😢" if prediction[0] == 1 else "Not Diabetic 😊"
        
        return render_template('result.html', prediction=result)

    except Exception as e:
        return render_template('result.html', prediction=f"Error: Invalid Input - {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)