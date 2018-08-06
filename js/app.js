var maps;
var userPosition;

function initMap() {
	userPosition = {
		lat: -23.5576364,
		lng: -46.6628473
	};
	maps = new google.maps.Map(document.getElementById('map'), {
		center: userPosition,
		zoom: 14
	});

	//Pegar dados Json
	var features = restaurantes.map(function (r) {
		return {
			position: new google.maps.LatLng(r.latitude, r.longitude),
			type: 'info'
		}
	});
	// Criar pins
	features.forEach(function (feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			map: maps
		});
	});
}

var arrRestaurants = [];

function getRestaurantsOfData() {
	restaurantes.map(function (r) {
		arrRestaurants.push(r.name)
		arrRestaurants.push(r.type)
	});

	arrRestaurants = arrRestaurants.filter(function (x, y) {
		return arrRestaurants.indexOf(x) === y;

	});

	$("#restaurants").autocomplete({
		source: arrRestaurants
	});
}

function createImg(img, index) {
	return '<img src="' + img + '" class="d-flex set-img" id="' + index + '">';
}

function showRestaurants(rest) {
	rest.map(function (r, i) {
		showImg(r, i);
	});
}

function showImg(restaurant, index) {
	var img = createImg(restaurant.image, index);
	$("#list-restaurants").append(img);

	$("#" + index).on("click", function () {
		$("#modalRestaurants").modal();
		$("#modalRestaurantslLabel").html(restaurant.name);
		var map = '<iframe src="https://maps.google.com/maps?q=' + restaurant.latitude + ',' + restaurant.longitude + '&hl=es;z=14&amp;output=embed" class="map"</iframe>';
		console.log(map);
		$("#modalRestaurantslMap").html(map);
		$("#modalRestaurantslDescription").html(restaurant.description);
	});
}

$("#search").click(function () {
	var search = $("#restaurants").val();
	$("#list-restaurants").empty();
	var arrFilteredRestaurants = [];
	restaurantes.map(function (r) {
		if (r.name === search || r.type === search) {
			arrFilteredRestaurants.push(r);
		}
	});
	if (arrFilteredRestaurants.length === 0) {
		showRestaurants(restaurantes);
	} else {
		showRestaurants(arrFilteredRestaurants);
	}
});

$(document).ready(function () {
	$("#screen-one").delay("3000").fadeToggle("slow");
	$("#screen-two").delay("3000").fadeIn("slow");
	initMap();
	getRestaurantsOfData();
	showRestaurants(restaurantes);
});








// $(function(){
//   $("#screen-two").fadeIn("fast");
//   getLocation();
//   initMap();
//   console.log(userPosition);
//   getRestaurantsOfData();
//   $("#restaurants").autocomplete({
//     source: arrRestaurants
//   });
// });

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		console.log("Seu browser não suporta Geolocalização.")
	}
}

function showPosition(position) {
	userPosition = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.log("Usuário rejeitou a solicitação de Geolocalização.")
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Localização indisponível.")
			break;
		case error.TIMEOUT:
			console.log("A requisição expirou.")
			break;
		case error.UNKNOWN_ERROR:
			console.log("Algum erro desconhecido aconteceu.")
			break;
	}

	userPosition = {
		lat: -23.5576364,
		lng: -46.6628473
	};
}