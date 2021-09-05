// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a dark layer that wil be an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Satellite: satelliteStreets
}

// Create the map object with center, zoom and default layers
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Access the toronto neighborhoods data via GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/karengut97/Mapping_Earthquakes/main/torontoNeighborhoods.json"

// Access the toronto data GeoJSON URL
// let torontoData = "https://raw.githubusercontent.com/karengut97/Mapping_Earthquakes/main/torontoRoutes.json"

// Access the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/karengut97/Mapping_Earthquakes/main/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      color: "blue",
      fillColor: "yellow",
      weight: 1,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
      }
  }).addTo(map);
});
