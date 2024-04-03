from flask import Flask, request, jsonify
from chat import get_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to handle queries with "I do not understand" response
def handle_unknown_query(query):
    with open("unknown_queries.txt", "a") as file:
        file.write(query + "\n")

# Route to predict responses
@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # Get response from chat module
    response = get_response(text)

    # Check if response is "I do not understand"
    if response == "I do not understand...":
        handle_unknown_query(text)

    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=False)
