const ticketMasterApiKey = "IoUptOnWtiIUKp6lNP8RET0crIirQd0T";
const googleMapsApiKey = "AIzaSyCOzjrDoygKdBVPmnzbjQ17zvw49Nbofvg";

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

    // sort response cards by event date

    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=Charlotte&apikey=IoUptOnWtiIUKp6lNP8RET0crIirQd0T",
        method: "GET",
        dataType: "json"
    }).done(function(response){
        console.log(response);
        const sortedDate = [];
        const ball = '<i class="fas fa-basketball-ball"></i>';
        const music = '<i class="fas fa-music"></i>';
        const comedy = '<i class="fab fa-jenkins"></i>';

        // sort responses by Date of event
        for(var i = 0; i < 12; i++) {
            sortedDate.push(response._embedded.events[i]);
            console.log(sortedDate);
        }

        sortedDate.sort(function(a,b) {
            return new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate);
        })


        for(var i = 0; i < sortedDate.length; i++) {
            const responseSeg = sortedDate[i].classifications[0].segment.name; 
            var favicon;
            switch (responseSeg) {
                case "Sports":
                    favicon = ball;
                    break;
                case "Music":
                    favicon = music;
                    break;
                default:
                    favicon = comedy;
            }


            let newDiv = $("<div class='col-sm-4 card inline top'>");
            let newImg = $("<img class='card-img-top center img-fluid rounded'src=" + sortedDate[i].images[9].url + " alt=Image />");
            let cardHeader = $("<h5 class='card-title text-center'>" + sortedDate[i].name + "</h5>");
            let cardP = $("<p class='card-text text-center'>" + sortedDate[i]._embedded.venues[0].name + "/ Date " + sortedDate[i].dates.start.localDate + "</p>")
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
        
            // Modal functionality
        }
        const modal = $("#modal");
        const modalContent = $("#modalContent");


        // When the user clicks on the button, open the modal
        $(".info").on("click", modalCall);

        function modalCall() {
            modal.css("display", "block");
            let index = this.value;
            let modalImage = $("<img class='img-fluid rounded' src=" + response._embedded.events[index].images[9].url + " alt=Image />");
            // GOOGLE MAPS DIRECTIONS PLACE HOLDER IMAGE BELOW
            let placeholder = $("<img class='col img-fluid rounded' src=images/placeholder.jpg alt=Image />");
            let closeBtn = $("<span id='close'><button class='btn btn-danger'>Close</button></span>");
            closeBtn.css("float", "right"); 
            let newDivRow = $("<div class='row'></div>");
            let contentDiv = $("<div class='col-sm-6'></div>");
            let mapDiv = $("<div id='map' class='col-sm-6'></div>");


            // Google maps
            var map;
            function initMap() {
                map = new google.maps.Map($("#map"), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            }   );
            }


            // Need to style modal images
            modalContent.append(closeBtn)
                        .append(newDivRow);
            newDivRow.append(contentDiv)
                        .append(mapDiv);
            contentDiv.append(modalImage);
            // mapDiv.append(placeholder);
            

            closeBtn.on("click", function() {
                modal.css("display", "none");
                modalContent.empty();
            });
   
        }

    }).fail(function(error){
        alert("Error");
    })
}



