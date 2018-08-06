var maps;

var userPosition = {
	center: {
		lat: -23.5576364,
		lng: -46.6628473
	},
	zoom: 14
};
var arrRestaurants = [];

// Pegando a localizacao do usuario
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		console.log("Seu browser não suporta Geolocalização.")
	}

	initMap(userPosition);
}

function showPosition(position) {
	userPosition = {
		center: {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		},
		zoom: 16
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
}

function initMap(userPosition) {
	maps = new google.maps.Map(document.getElementById('map'), userPosition);

	//Pegar dados Json
	var locals = restaurantes.map(function (r) {
		return {
			position: new google.maps.LatLng(r.latitude, r.longitude),
			type: 'info'
		}
	});
	// Criar pins
	locals.forEach(function (local) {
		var marker = new google.maps.Marker({
			position: local.position,
			map: maps
		});
	});
}

function getRestaurantsOfData() {
	restaurantes.map(function (r) {
		arrRestaurants.push(r.name)
		arrRestaurants.push(r.type)
	});

	arrRestaurants = arrRestaurants.filter(function (value, index) {
		return arrRestaurants.indexOf(value) === index;

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

function searchRestaurants() {
	var search = $("#restaurants").val().toLowerCase();
	$("#list-restaurants").empty();
	var arrFilteredRestaurants = [];
	restaurantes.map(function (r) {
		if (r.name.toLowerCase().indexOf(search) !== -1 || r.type.toLowerCase().indexOf(search) !== -1) {
			arrFilteredRestaurants.push(r);
		}
	});
	if (arrFilteredRestaurants.length === 0) {
		showRestaurants(restaurantes);
	} else {
		showRestaurants(arrFilteredRestaurants);
	}
}

$("#search").click(function () {
	searchRestaurants();
});

$("#restaurants").keyup(function () {
	searchRestaurants();
});

$(document).ready(function () {
	getLocation();
	$("#screen-one").delay("3000").fadeToggle("slow");
	$("#screen-two").delay("3000").fadeIn("slow");
	initMap(userPosition);
	getRestaurantsOfData();
	showRestaurants(restaurantes);
});