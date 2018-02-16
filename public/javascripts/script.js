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

        const ball = '<i class="fas fa-basketball-ball"></i>';
        const music = '<i class="fas fa-music"></i>';
        const comedy = '<i class="fab fa-jenkins"></i>';

        for(var i = 0; i < 12; i++) {
            const responseSeg = response._embedded.events[i].classifications[0].segment.name; 
            var favicon;
            if(responseSeg === "Sports") {
                favicon = ball;
            } else if (responseSeg === "Music") {
                favicon = music;
            } else {
                favicon = comedy;
            }


            let newDiv = $("<div class='col-sm-4 card inline top'>");
            let newImg = $("<img class='card-img-top image center img-fluid rounded'src=" + response._embedded.events[i].images[9].url + " alt=Image />");
            let cardHeader = $("<h5 class='card-title text-center'>" + response._embedded.events[i].name + "</h5>");
            let cardP = $("<p class='card-text text-center'>" + response._embedded.events[i]._embedded.venues[0].name + "/ Date " + response._embedded.events[i].dates.start.localDate + "</p>")
            let newButton = $("<button class='btn btn-success center info' value=" + i + "> More Info  " + favicon + "</button");


            newDiv.append(newImg)
                  .append(cardHeader)
                  .append(cardP)
                  .append(newButton);
            
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
        
        // Modal functionality

        const modal = $("#modal");
        const modalContent = $("#modalContent");


        // When the user clicks on the button, open the modal
        $(".info").on("click", function() {
            modal.css("display", "block");
            let index = this.value;
            let modalImage = $("<img class='col-sm-6 img-fluid rounded' src=" + response._embedded.events[index].images[9].url + " alt=Image />");
            // GOOGLE MAPS DIRECTIONS PLACE HOLDER IMAGE BELOW
            let placeholder = $("<img class='col-sm-6 img-fluid rounded' src=images/placeholder.jpg alt=Image />");
            let closeBtn = $("<span id='close'><button class='btn btn-danger'>Close</button></span>"); 
            let newDivRow = $("<div class='row'></div>")

            // Probably a good idea to make 1 div per column and append like data
            // to each div so they are responsive together

            // Need to style modal images
            modalContent.append(closeBtn)
                        .append(newDivRow);
            newDivRow.append(modalImage)
                     .append(placeholder);

            closeBtn.on("click", function() {
                modal.css("display", "none");
                modalContent.empty();
            });
        })

        

  

    })

}

