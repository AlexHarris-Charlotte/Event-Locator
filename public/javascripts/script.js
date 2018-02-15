const apiKey = "IoUptOnWtiIUKp6lNP8RET0crIirQd0T";

var submitButton = $("#submit");
submitButton.on("click", submit);


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
        for(var i = 0; i < 4; i++) {
            if(i === 0) {let newDivRow = $("<div class='row paddingFix'>" +
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded'src=" + response._embedded.events[0].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[0].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[0]._embedded.venues[0].name + "/ Date " + response._embedded.events[0].dates.start.localDate + "</p> </div>" +  
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[1].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[1].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[1]._embedded.venues[0].name + "/ Date " + response._embedded.events[1].dates.start.localDate + "</p> </div>" + 
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[2].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[2].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[2]._embedded.venues[0].name + "/ Date " + response._embedded.events[2].dates.start.localDate + "</p> </div> </div>");
            newDivRow.addClass("row");
            appendDiv.append(newDivRow);
        } else if(i === 1) {
            let newDivRow = $("<div class='row paddingFix'>" +
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[3].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[3].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[3]._embedded.venues[0].name + "/ Date " + response._embedded.events[3].dates.start.localDate + "</p> </div>" +  
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[4].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[4].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[4]._embedded.venues[0].name + "/ Date " + response._embedded.events[4].dates.start.localDate + "</p> </div>" + 
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[5].images[9].url + "<div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[5].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[5]._embedded.venues[0].name + "/ Date " + response._embedded.events[5].dates.start.localDate + "</p> </div> </div>");
            newDivRow.addClass("row");
            appendDiv.append(newDivRow);
        } else if(i === 2) {
            let newDivRow = $("<div class='row paddingFix'>" +
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[6].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[6].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[6]._embedded.venues[0].name + "/ Date " + response._embedded.events[6].dates.start.localDate + "</p> </div>" +  
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[7].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[7].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[7]._embedded.venues[0].name + "/ Date " + response._embedded.events[7].dates.start.localDate + "</p> </div>" + 
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[8].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[8].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[8]._embedded.venues[0].name + "/ Date " + response._embedded.events[8].dates.start.localDate + "</p> </div> </div>");
            newDivRow.addClass("row");
            appendDiv.append(newDivRow);
        } else {
            let newDivRow = $("<div class='row paddingFix'>" +
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[9].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[9].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[9]._embedded.venues[0].name + "/ Date " + response._embedded.events[9].dates.start.localDate + "</p> </div>" +  
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[10].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[10].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[10]._embedded.venues[0].name + "/ Date " + response._embedded.events[10].dates.start.localDate + "</p> </div>" + 
            "<div class='col-sm-4 card inline'> <img class='card-img-top image center img-fluid rounded' src=" + response._embedded.events[11].images[9].url + " alt=Image <div class=card-body> <h5 class='card-title text-center'>" + response._embedded.events[11].name + "</h5> <p class='card-text text-center'>" + response._embedded.events[11]._embedded.venues[0].name + "/ Date " + response._embedded.events[11].dates.start.localDate + "</p> </div> </div>");
            appendDiv.append(newDivRow);
        }
        }
    })

}

