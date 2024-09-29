from flask import Flask, jsonify, render_template, request
import pandas as pd
import numpy as np
from modelHelper import ModelHelper

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

modelHelper = ModelHelper()

#################################################
# Flask Routes
#################################################

# HTML ROUTES - HOME
@app.route("/")
def home():
    return render_template("home.html")

# HTML ROUTES - TABLEAU1
@app.route("/tableau1")
def tableau1():
    return render_template("tableau1.html")

# HTML ROUTES - TABLEAU2
@app.route("/tableau2")
def tableau2():
    return render_template("tableau2.html")

# HTML ROUTES - MODEL
@app.route("/model")
def model():
    return render_template("index.html")

# HTML ROUTES - REPORT
@app.route("/report")
def report():
    return render_template("report.html")

# HTML ROUTES - ABOUT US 
@app.route("/about_us")
def about_us():
    return render_template("about_us.html")

# HTML ROUTES - SOURCES
@app.route("/sources")
def sources():
    return render_template("sources.html")

@app.route("/predictions", methods=["POST"])
def predictions():
    content = request.json["data"]
    print(content)

    # parse
    gender = content["gender"]
    customer_type = content["customer_type"]
    age = int(content["age"])
    type_of_travel = content["type_of_travel"]
    travel_class = content["travel_class"]
    flight_distance = int(content["flight_distance"])
    inflight_wifi_service = content["inflight_wifi_service"]
    departure_arrival_time_convenient = content["departure_arrival_time_convenient"]
    ease_of_online_booking = content["ease_of_online_booking"]
    gate_location = content["gate_location"]
    food_and_drink = content["food_and_drink"]
    online_boarding = content["online_boarding"]
    seat_comfort = content["seat_comfort"]
    inflight_entertainment = content["inflight_entertainment"]
    on_board_service = content["on_board_service"]
    leg_room_service = content["leg_room_service"]
    baggage_handling = content["baggage_handling"]
    checkin_service = content["checkin_service"]
    inflight_service = content["inflight_service"]
    cleanliness = content["cleanliness"]
    departure_delay_in_minutes = int(content["departure_delay_in_minutes"])
    arrival_delay_in_minutes = float(content["arrival_delay_in_minutes"])

    preds = modelHelper.predictions(gender, customer_type, age, type_of_travel, travel_class, flight_distance, inflight_wifi_service, departure_arrival_time_convenient,
               ease_of_online_booking, gate_location, food_and_drink, online_boarding, seat_comfort, inflight_entertainment, on_board_service,
               leg_room_service, baggage_handling, checkin_service, inflight_service, cleanliness, departure_delay_in_minutes, arrival_delay_in_minutes)

    return(jsonify({"ok": True, "prediction": str(preds)}))

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

# Run the App
if __name__ == '__main__':
    app.run(debug=True)