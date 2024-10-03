import pandas as pd
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        # model
        self.model = pickle.load(open("model_pipeline.pkl", 'rb'))

    def predictions(self, gender, customer_type, age, type_of_travel, travel_class, flight_distance, inflight_wifi_service, departure_arrival_time_convenient,
               ease_of_online_booking, gate_location, food_and_drink, online_boarding, seat_comfort, inflight_entertainment, on_board_service,
               leg_room_service, baggage_handling, checkin_service, inflight_service, cleanliness, departure_delay_in_minutes, arrival_delay_in_minutes):
        
        df = pd.DataFrame()
        df["gender"] = [gender]
        df["customer_type"] = [customer_type]
        df["age"] = [age]
        df["type_of_travel"] = [type_of_travel]
        df["travel_class"] = [travel_class]
        df["flight_distance"] = [flight_distance]
        df["inflight_wifi_service"] = [inflight_wifi_service]
        df["departure_arrival_time_convenient"] = [departure_arrival_time_convenient]
        df["ease_of_online_booking"] = [ease_of_online_booking]
        df["gate_location"] = [gate_location]
        df["food_and_drink"] = [food_and_drink]
        df["online_boarding"] = [online_boarding]
        df["seat_comfort"] = [seat_comfort]
        df["inflight_entertainment"] = [inflight_entertainment]
        df["on_board_service"] = [on_board_service]
        df["leg_room_service"] = [leg_room_service]
        df["baggage_handling"] = [baggage_handling]
        df["checkin_service"] = [checkin_service]
        df["inflight_service"] = [inflight_service]
        df["cleanliness"] = [cleanliness]
        df["departure_delay_in_minutes"] = [departure_delay_in_minutes]
        df["arrival_delay_in_minutes"] = [arrival_delay_in_minutes]
        
        # columns in order
        df = df.loc[:, ['gender', 'customer_type', 'age', 'type_of_travel',
        'travel_class', 'flight_distance', 'inflight_wifi_service',
        'departure_arrival_time_convenient', 'ease_of_online_booking',
        'gate_location', 'food_and_drink', 'online_boarding', 'seat_comfort',
        'inflight_entertainment', 'on_board_service', 'leg_room_service',
        'baggage_handling', 'checkin_service', 'inflight_service',
        'cleanliness', 'departure_delay_in_minutes', 'arrival_delay_in_minutes']]
        
        preds = self.model.predict_proba(df)
        return(preds[0][1])