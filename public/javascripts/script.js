const apiKey = "IoUptOnWtiIUKp6lNP8RET0crIirQd0T";

var submitButton = $("#submit");
submitButton.on("click", submit);

const contentRow1 = $("#contentRow1");
const contentRow2 = $("#contentRow2");
const contentRow3 = $("#contentRow3");
const contentRow4 = $("#contentRow4");


function submit (event) {
    event.preventDefault;
    const keyword = $("#entertain").val().trim();
    const locationInput = $("#location").val().trim();
    const appendDiv = $("#append");
    const infoButton = $("<button class='infoBtn'>")

    console.log(keyword);
    console.log(locationInput);

    // URL works. Use (localhost:8080)
    // http-server -c-1     <-- starts server on localhost


    // can implement google maps api to get you directions + map from your current location
    // based on navigator object within browser

    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=Charlotte&apikey=IoUptOnWtiIUKp6lNP8RET0crIirQd0T",
        method: "GET",
        dataType: "json"
    }).done(function(response){
        console.log(response);
        for(var i = 0; i < 12; i++) {
            let newDiv = $("<div class='col-sm-4 card inline'>");
            let newImg = $("<img class='card-img-top image center img-fluid rounded'src=" + response._embedded.events[i].images[9].url + " alt=Image />");
            let cardHeader = $("<h5 class='card-title text-center'>" + response._embedded.events[i].name + "</h5>");
            let cardP = $("<p class='card-text text-center'>" + response._embedded.events[i]._embedded.venues[0].name + "/ Date " + response._embedded.events[i].dates.start.localDate + "</p>")
        
            newDiv.append(newImg)
                  .append(cardHeader)
                  .append(cardP);
            
            if(i < 3) {
                contentRow1.append(newDiv);
            } else if(i > 2 && i < 6) {
                contentRow2.append(newDiv);
            } else if(i > 5 && i < 9) {
                contentRow3.append(newDiv);
            } else {
                contentRow4.append(newDiv);
            }
        
        }
    })

}

