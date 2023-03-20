if (window.location.pathname == "/login" || window.location.pathname == "/") {
    localStorage.clear();
}

var form = document.getElementById("myForm");
function formSubmit() {
    form.submit();
}

document.getElementById("submitBtn").addEventListener("click", function (event) {
    var nomUsuari = form.elements["nom"].value;
    localStorage.setItem("nom", nomUsuari);
    console.log(localStorage.getItem("nom"));
    console.log(document.getElementsByName('nom').value);
    event.preventDefault()

    document.getElementById("myForm").submit()
})

var butMapa = document.getElementById('butMapa');
var map = L.map('map').setView([40.4167, -3.70325], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([0, 0]).addTo(map);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Tu navegador no soporta la geolocalización.');
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  map.setView([lat, lng], 13);

  marker.setLatLng([lat, lng]);
}

butMapa.addEventListener('click', getLocation);
  