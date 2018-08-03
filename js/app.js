$(document).ready(function () {
  $("#screen-one").delay("3000").fadeToggle("slow");
  $("#screen-two").delay("3000").fadeIn("slow");
});

function initMap() {

  var uluru = {lat: -25.344, lng: 131.036};

  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});

  var marker = new google.maps.Marker({position: uluru, map: map});
}

// var mapa;
// function initMap() {
//  mapa = new google.maps.Map(document.getElementById('map'), {
//    center: {lat: -23.5576364,
//             lng: -46.6628473},
//    zoom: 14
//  });

// //Pegar dados Json
// var features = restaurantes.map(function(r){
// return {
//    position: new google.maps.LatLng(r.latitude, r.longitude),
//    type: 'info'
//   }
// });
// // Criar os pontos.
// features.forEach(function(feature) {
//   var marker = new google.maps.Marker({
//     position: feature.position,
//     // icon: icons[feature.type],
//     map: mapa
//   });
// });
// }