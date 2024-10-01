$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        donutPredictions();
    });
});

// call Flask API endpoint
function donutPredictions() {
    // Obtener valores del formulario
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

    // crear el payload
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
    };

    // Realizar una solicitud POST al endpoint de Flask
    $.ajax({
        type: "POST",
        url: "/donutPredictions", // Cambié a /donutPredictions
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // Imprimirlo
            console.log(returnedData);
            var prob = parseFloat(returnedData["prediction"]);
            buildDonut(prob);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function buildDonut(prob){
    // Data
    var satis = prob;
    var unsatis = 1 - prob;

    var data = [{
        values: [satis, unsatis],
        labels: ['Satisfied', 'Unsatisfied'],
        domain: {column: 0},
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }];
      
    var layout = {
        title: 'Passenger Satisfaction',
        annotations: [{
            font: {
                size: 20
            },
            showarrow: false,
            text: 'Satisfaction',
            x: 0.5,
            y: 0.5
        }],
        height: 400,
        width: 600,
        showlegend: false,
        grid: {rows: 1, columns: 2}
    };
      
    Plotly.newPlot('donut', data, layout);  
}