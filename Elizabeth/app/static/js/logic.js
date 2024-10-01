$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        predictions();
    });
});


// call Flask API endpoint
function predictions() {
    var gender = $("#gender").val();
    var customer_type = $("#customer_type").val();
    var age = $("#age").val();
    var type_of_travel = $("#type_of_travel").val();
    var travel_class = $("#travel_class").val();
    var flight_distance = $("#flight_distance").val();
    var inflight_wifi_service = $("#inflight_wifi_service").val();
    var departure_arrival_time_convenient = $("#departure_arrival_time_convenient").val();
    var ease_of_online_booking = $("#ease_of_online_booking").val();
    var gate_location = $("#gate_location").val();
    var food_and_drink = $("#food_and_drink").val();
    var online_boarding = $("#online_boarding").val();
    var seat_comfort = $("#seat_comfort").val();
    var inflight_entertainment = $("#inflight_entertainment").val();
    var on_board_service = $("#on_board_service").val();
    var leg_room_service = $("#leg_room_service").val();
    var baggage_handling = $("#baggage_handling").val();
    var checkin_service = $("#checkin_service").val();
    var inflight_service = $("#inflight_service").val();
    var cleanliness = $("#cleanliness").val();
    var departure_delay_in_minutes = $("#departure_delay_in_minutes").val();
    var arrival_delay_in_minutes = $("#arrival_delay_in_minutes").val();

    // create the payload
    var payload = {
        "gender": gender,
        "customer_type": customer_type,
        "age": age,
        "type_of_travel": type_of_travel,
        "travel_class": travel_class,
        "flight_distance": flight_distance,
        "inflight_wifi_service": inflight_wifi_service,
        "departure_arrival_time_convenient": departure_arrival_time_convenient,
        "ease_of_online_booking": ease_of_online_booking,
        "gate_location": gate_location,
        "food_and_drink": food_and_drink,
        "online_boarding": online_boarding,
        "seat_comfort": seat_comfort,
        "inflight_entertainment": inflight_entertainment,
        "on_board_service": on_board_service,
        "leg_room_service": leg_room_service,
        "baggage_handling": baggage_handling,
        "checkin_service": checkin_service,
        "inflight_service": inflight_service,
        "cleanliness": cleanliness,
        "departure_delay_in_minutes": departure_delay_in_minutes,
        "arrival_delay_in_minutes": arrival_delay_in_minutes
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/predictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            var prob = parseFloat(returnedData["prediction"]);

            if (prob > 0.5) {
                $("#output").text(`The passenger is likely to be satisfied with the flight with a satisfaction rating of ${(prob * 100).toFixed(2)}%!!`);
            } else {
                $("#output").text(`Unfortunately, the passenger is unlikely to be satisfied with the flight with a satisfaction rating of ${(prob * 100).toFixed(2)}%!.`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
