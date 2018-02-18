$(document).ready(function(){
    const options = {
        enableHighAccuracy: true,
        timeout: 1000*30,
        maximumAge: 1000 * 60
    }

    function success(pos) {
        let coordinates = pos.coords;
        let userLat = coordinates.latitude
        let userLng = coordinates.longitude
        console.log(userLat);
        console.log(userLng);
        var userCoordinates = [userLat, userLng];
        return userCoordinates;
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);


    function initMap(venueLat, venueLng) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var city = new google.maps.LatLng(venueLat, venueLng);
        var mapOptions = {
            zoom: 8,
            center: city
        }
        var map = new google.maps.Map(document.getElementById('modalRowRight'), mapOptions);
        directionsDisplay.setMap(map);
    }


    function calcRoute(venueLat, venueLng, userCoordinates) {
        var venueLocation = new google.maps.LatLng(venueLat, venueLng);
        var start = new google.maps.LatLng(userCoordinates[0], userCoordinates[1]);
        var request = {
        origin: start,
        destination: venueLocation,
        travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
        });
    }



    // function initMap() {

    //     var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    //     var mapOptions = {
    //       zoom:7,
    //       center: chicago
    //     }
    //     var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //     directionsDisplay.setMap(map);
    // }
    
    //   function calcRoute() {
    //     var start = document.getElementById('start').value;
    //     var end = document.getElementById('end').value;
    //     var request = {
    //       origin: start,
    //       destination: end,
    //       travelMode: 'DRIVING'
    //     };
    //     directionsService.route(request, function(result, status) {
    //       if (status == 'OK') {
    //         directionsDisplay.setDirections(result);
    //       }
    //     });
    //   }
})
