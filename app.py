import flask
from flask import jsonify
import pickle
from flask import request
import json
from sklearn.metrics import *
import pandas as pd
import numpy as np

# Use pickle to load the pre-trained model
with open(f"model/model.pkl", "rb") as f:
    model = pickle.load(f)

app = flask.Flask(__name__, template_folder="templates")


@app.route("/", methods=["GET", "POST"])
def main():
    return(flask.render_template("main.html"))


@app.route('/processdata', methods=["POST"])
def process_data():
    # Load data from request
    json_data = request.form['input_data']

    # Process data from json blob to list
    data = json.loads(json_data)

    # Generate predictions from model
    predictions = model.predict_proba([data]).tolist()

    # Return the predictions
    return flask.render_template("results.html", predictions = predictions)


if __name__ == "__main__":
    app.run(debug=True)
