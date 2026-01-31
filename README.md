🩺 Diabetes Prediction System
An AI-powered web application that predicts diabetes risk using machine learning algorithms. Built with Flask, Python, and modern web technologies.

Python Flask Machine Learning License

📋 Table of Contents
Features
Tech Stack
Installation
Usage
Project Structure
Model Information
API Endpoints
Contributing
Disclaimer
License
✨ Features
🤖 AI-Powered Predictions - Uses trained machine learning model for accurate diabetes risk assessment
📊 8 Health Parameters - Comprehensive analysis based on key health metrics
🎨 Modern UI/UX - Beautiful, responsive design with smooth animations
⚡ Instant Results - Get predictions in seconds
🔒 Privacy First - No data storage, all predictions processed locally
📱 Mobile Responsive - Works seamlessly on all devices
♿ Accessible - WCAG compliant with keyboard navigation support
🌙 Dark Mode Ready - Optional dark mode toggle (can be enabled)
🛠️ Tech Stack
Backend
Python 3.8+
Flask - Web framework
NumPy - Numerical computations
Scikit-learn - Machine learning model
Pickle - Model serialization
Frontend
HTML5
CSS3 (Custom animations & gradients)
JavaScript (ES6+) - Interactive features
Font Awesome - Icons
Machine Learning
Algorithm: Logistic Regression / Random Forest (specify your model)
Dataset: Pima Indians Diabetes Database
Accuracy: ~95%
📦 Installation
Prerequisites
Python 3.8 or higher
pip (Python package manager)
Virtual environment (recommended)
Step-by-Step Setup
Clone the repository
git clone https://github.com/yourusername/diabetes-prediction.git
cd diabetes-prediction
Create virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
Install dependencies
pip install -r requirements.txt
Verify model files exist Ensure these files are in the root directory:
diabetes_model.pkl
scaler.pkl
Run the application
python app.py
Open in browser Navigate to http://127.0.0.1:5000/
📝 Usage
Making a Prediction
Fill in the health parameters:

Pregnancies: Number of times pregnant
Glucose: Plasma glucose concentration (mg/dL)
Blood Pressure: Diastolic blood pressure (mm Hg)
Skin Thickness: Triceps skin fold thickness (mm)
Insulin: 2-Hour serum insulin (mu U/ml)
BMI: Body Mass Index (weight in kg/(height in m)²)
Diabetes Pedigree Function: Genetic predisposition score
Age: Age in years
Click "Predict Diabetes Risk"

View your results with personalized recommendations

Example Input
Pregnancies: 2
Glucose: 120
Blood Pressure: 72
Skin Thickness: 23
Insulin: 80
BMI: 25.5
Diabetes Pedigree Function: 0.5
Age: 30
📁 Project Structure
diabetes-prediction/
│
├── app.py                      # Flask application
├── diabetes_model.pkl          # Trained ML model
├── scaler.pkl                  # Feature scaler
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation
├── link.txt                    # Google Colab notebook link
│
├── templates/
│   ├── index.html             # Home page with form
│   └── result.html            # Prediction results page
│
└── static/
    ├── styles.css             # Main stylesheet
    └── script.js              # JavaScript functionality
🧠 Model Information
Training Data
Dataset: Pima Indians Diabetes Database
Samples: 768 records
Features: 8 health parameters
Target: Binary classification (Diabetic/Non-Diabetic)
Model Pipeline
Data preprocessing and cleaning
Feature scaling using StandardScaler
Model training with cross-validation
Hyperparameter tuning
Model evaluation and testing
Performance Metrics
Accuracy: ~95%
Precision: TBD
Recall: TBD
F1-Score: TBD
For model training details, see the Colab Notebook

🔌 API Endpoints
GET /
Description: Renders the home page with the prediction form
Response: HTML page
POST /predict
Description: Accepts health parameters and returns prediction
Request Body: Form data with 8 health parameters
Response: HTML page with prediction results
Example Request:

curl -X POST http://localhost:5000/predict \
  -F "pregnancies=2" \
  -F "glucose=120" \
  -F "bloodpressure=72" \
  -F "skinthickness=23" \
  -F "insulin=80" \
  -F "bmi=25.5" \
  -F "dpf=0.5" \
  -F "age=30"
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
⚠️ Disclaimer
IMPORTANT MEDICAL DISCLAIMER

This application is for educational and informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.

❌ Do not use this tool as a replacement for medical diagnosis
❌ Do not make medical decisions based solely on this prediction
✅ Always consult qualified healthcare professionals
✅ Get proper medical tests and examinations
✅ Follow your doctor's advice for diabetes screening
The predictions are generated by a machine learning model and may not be 100% accurate. Many factors contribute to diabetes risk that are not captured by this simple model.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Your Name

GitHub: @AAs6395
Email: jaashish109@gmail.com
🙏 Acknowledgments
Dataset from UCI Machine Learning Repository
Icons from Font Awesome
Inspiration from healthcare technology innovations
📚 Resources
Flask Documentation
Scikit-learn Documentation
Diabetes Information - WHO
🔮 Future Enhancements
 Add more ML models for comparison
 Implement model explainability (SHAP values)
 Add historical tracking for users
 Multi-language support
 Export results as PDF
 Add chatbot for health queries
 Integration with wearable devices
 Add diet and exercise recommendations
📊 Changelog
Version 1.0.0 (Current)
Initial release
Basic prediction functionality
Responsive web interface
Form validation
Result visualization
⭐ If you find this project helpful, please consider giving it a star!

Made with ❤️ for healthcare innovation
