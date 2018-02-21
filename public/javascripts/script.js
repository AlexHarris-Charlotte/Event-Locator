$(document).ready(function(){
    const ticketMasterApiKey = "IoUptOnWtiIUKp6lNP8RET0crIirQd0T";
    const googleMapsApiKey = "AIzaSyCOzjrDoygKdBVPmnzbjQ17zvw49Nbofvg";
    const googleDirectionsApiKey = "AIzaSyD0H1DmmVSQsRAnDiBtOaNowbFy5y3j1m8";

    var submitButton = $("#submit");
    submitButton.on("click", submit);

    const contentRow1 = $("#contentRow1");
    const contentRow2 = $("#contentRow2");
    const contentRow3 = $("#contentRow3");
    const contentRow4 = $("#contentRow4");
    const contentRowArr = [contentRow1, contentRow2, contentRow3, contentRow4,]

    const options = {
        enableHighAccuracy: true,
        timeout: 1000*30,
        maximumAge: 1000 * 60
    }

    var uCoords;

    function success(pos) {
        let coordinates = pos.coords;
        let userLat = coordinates.latitude
        let userLng = coordinates.longitude
        let userCoordinates = [userLat, userLng];
        uCoords = userCoordinates;
        console.log(uCoords);
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsMap;
    function initMap(destLat, destLng) {
        var city = new google.maps.LatLng(destLat, destLng);
        var mapOptions = {
            zoom: 8,
            center: city
        }
        // var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsMap = new google.maps.Map(document.getElementById('modalRowRight'), mapOptions);
        directionsDisplay.setMap(directionsMap);
    }


    function calcRoute(destLat, destLng, startLatLng) {
        var directionsService = new google.maps.DirectionsService();
        var venueLocation = new google.maps.LatLng(destLat, destLng);
        var start = new google.maps.LatLng(startLatLng[0], startLatLng[1]);
        var request = {
        origin: start,
        destination: venueLocation,
        travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            console.log("OK!!!!!")
            directionsDisplay.setDirections(result);
        }
        });
    }


    // need to style route text display



    function calculateAndDisplayRoute(startLatLng, destLat, destLng, directionsService, directionsDisplay) {
        var start = new google.maps.LatLng(startLatLng[0], startLatLng[1]);
        var directionsService = new google.maps.DirectionsService();
        var venueLocation = new google.maps.LatLng(destLat, destLng);
        directionsService.route({
          origin: start,
          destination: venueLocation,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

    // function displayRoute(startLatLng, destLat, destLng, service, display) {
    //     var start = new google.maps.LatLng(startLatLng[0], startLatLng[1]);
    //     var venueLocation = new google.maps.LatLng(destLat, destLng);
    //     console.log("Apples");
    //     service.route({
    //       origin: start,
    //       destination: venueLocation,
    //     //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
    //       travelMode: 'DRIVING',
    //       avoidTolls: true
    //     }, function(response, status) {
    //       if (status === 'OK') {
    //         display.setDirections(response);
    //       } else {
    //         alert('Could not display directions due to: ' + status);
    //       }
    //     });
    //   }
      



    function submit (event) {
        event.preventDefault;
        const keyword = $("#entertain").val().trim();
        const locationInput = $("#location").val().trim();
        const infoButton = $("<button class='infoBtn'>")
        const buttonDiv = $("#pageButtons");
        const nextPage = $("<button id='next' class='btn btn-success'>Next Page >></button>");
        var bodyState = 1;
        var pageBody = $("#body");
        const page1Arr = [];
        const page2Arr = [];
        const page3Arr = [];
        const page4Arr = [];
        const page5Arr = [];

        

        // Empties the content rows so repeated clicks do not append repeated Data
        for(var i = 0; i < contentRowArr.length; i++) {
            contentRowArr[i].empty();
        }

        // URL works. Use (localhost:8080)
        // http-server -c-1     <-- starts server on localhost

        $.ajax({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=Charlotte&size=45&apikey=IoUptOnWtiIUKp6lNP8RET0crIirQd0T",
            method: "GET",
            dataType: "json"
        }).done(function(response){
            console.log(response);
            const sortedDate = [];
            const ball = '<i class="fas fa-basketball-ball"></i>';
            const music = '<i class="fas fa-music"></i>';
            const comedy = '<i class="fab fa-jenkins"></i>';

            // sort responses by Date of event
            for(var i = 0; i < response._embedded.events.length; i++) {
                sortedDate.push(response._embedded.events[i]);
                console.log(sortedDate);
            }

            sortedDate.sort(function(a,b) {
                return new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate);
            })


            // Create Page buttons to remove events and render new events
            // Use a for Loop to 


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

           
                var newDiv = $("<div class='col-sm-4 card inline top'>");
                let newImg = $("<img class='card-img-top center img-fluid rounded'src=" + sortedDate[i].images[9].url + " alt=Image />");
                let cardHeader = $("<h5 class='card-title text-center'>" + sortedDate[i].name + "</h5>");
                let venue = $("<p class='card-text text-center'> Venue: " + sortedDate[i]._embedded.venues[0].name + "</p>"); 
                let dateTime =  $("<p class='card-text text-center'> Date: " + sortedDate[i].dates.start.localDate + "</p>");
                let newButton = $("<button class='btn btn-success center info' value=" + i + "> More Info  " + favicon + "</button");
                newDiv.append(newImg)
                    .append(cardHeader)
                    .append(venue)
                    .append(dateTime)
                    .append(newButton);
                
                // Assigns a data attribute to each container div to correlate them to the 
                // body page state
                if(i < 9) {
                    newDiv.attr("data-page", 1);
                    page1Arr.push(newDiv);
                } else if(i < 18) {
                    newDiv.attr("data-page", 2);
                    page2Arr.push(newDiv);
                } else if(i < 27) {
                    newDiv.attr("data-page", 3);
                    page3Arr.push(newDiv);
                } else if(i < 36) {
                    newDiv.attr("data-page", 4);
                    page4Arr.push(newDiv);
                } else {
                    newDiv.attr("data-page", 5);
                    page5Arr.push(newDiv);
                }

                newDiv.append(newImg)
                    .append(cardHeader)
                    .append(venue)
                    .append(dateTime)
                    .append(newButton);
                
                for(var i = 0; i < 9; i++) {
                    if(bodyState = 1) {
                        if(i < 3) {
                            contentRow1.append(newDiv);
                        } else if(i < 6) {
                            contentRow2.append(newDiv);
                        } else {
                            contentRow3.append(newDiv);
                        }
                    }
                }


                if(i < 3) {
                    contentRow1.append(newDiv);
                } else if(i > 2 && i < 6) {
                    contentRow2.append(newDiv);
                } else if(i > 5 && i < 9) {
                    contentRow3.append(newDiv);
                }// else {
                //     contentRow4.append(newDiv);
                // }
            
            }

            for(var i = 1; i < sortedDate.length / 9 + 1; i++) {
                var numberedButton = $("<button class='btn btn-primary pageButtons' value=" + i + ">Page " + i + "</button>");
                buttonDiv.append(numberedButton);
            }
            buttonDiv.append(nextPage);

            $(".pageButtons").on("click", function() {
                // empty content rows first
                pageBody.attr("data-page", this.value);;
            })





            // Modal functionality
            const modal = $("#modal");
            const modalRowLeft = $("#modalRowLeft");
            const modalRowRight = $("#modalRowRight");
            const closeBtn = $("#close");

            // When the user clicks on the button, open the modal
            $(".info").on("click", modalCall);


            function modalCall() {
                modal.css("display", "block");
                let index = this.value;
                const saleStart = sortedDate[index].sales.public.startDateTime.slice(0, 9);
                const saleEnd = sortedDate[index].sales.public.endDateTime.slice(0, 9);
                let cardHeader = $("<h5 class='card-title text-center'>" + sortedDate[index].name + "</h5>");
                let modalImage = $("<img class='img-fluid rounded' src=" + sortedDate[index].images[9].url + " alt=Image />");
                let venueLat = parseFloat(sortedDate[index]._embedded.venues[0].location.latitude);
                let venueLng = parseFloat(sortedDate[index]._embedded.venues[0].location.longitude);
                // let venueCoords = 
                let saleStartDate = $("<p class='text-center'>Ticket Sales Start: " + saleStart + "</p>");
                let saleEndDate = $("<p class='text-center'>Ticket Sales End: " + saleEnd + "</p>");
                let priceRange = $("<p class='text-center'>Price Range: $" + sortedDate[index].priceRanges[0].min.toString() + " - $" + sortedDate[index].priceRanges[0].max.toString() + "</p>");
                console.log(venueLat);
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                modalRowLeft.append(cardHeader)
                            .append(modalImage)
                            .append(saleStartDate)
                            .append(saleEndDate)
                            .append(priceRange)
                            .append(calculateAndDisplayRoute(uCoords, venueLat, venueLng, directionsService, directionsDisplay)); 
                calcRoute(venueLat, venueLng, uCoords);
                console.log(directionsService);
                console.log(directionsDisplay);
                modalRowRight.append(initMap(venueLat, venueLng));               

                closeBtn.on("click", function() {
                    modal.css("display", "none");
                    modalRowLeft.empty();
                    modalRowRight.empty();
                });
    
            }

        }).fail(function(error){
            alert("Error");
        })
    }

})
