const isp = document.getElementById("isp");
const loc = document.getElementById("location");
const ip = document.getElementById("ip");
const timezone = document.getElementById("timezone");
const form = document.getElementById("form");

// Custom icon setup
// used chatgpt to generate the icon points correctly
const customIcon = L.icon({
    iconUrl: "../assets/images/icon-location.svg",
    shadowUrl: "../assets/images/icon-shadow.svg",

    iconSize: [46, 56], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [23, 56], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 54], // the same for the shadow
    popupAnchor: [0, -56], // point from which the popup should open relative to the iconAnchor
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const customIP = e.target.elements.customIP.value;
    getInfo(customIP);
});

const elements = {
    isp,
    loc,
    ip,
    timezone,
};
// map object
var map;

window.onload = async () => {
    initMap();
    getInfo();
};

const initMap = (defaultView = 15) => {
    if (defaultView <= 0) {
        throw Error("View value can't be less than 1");
    }
    map = L.map("map").setView([10, 10], defaultView);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
};

const fetchData = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
};

const getInfo = async (ipAddress = null) => {
    let url =
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_qt63kKKXxEiUXOd5PKf3Z0vfaW6wu";
    if (ipAddress) {
        url += `&ipAddress=${ipAddress}`;
    }
    const data = await fetchData(url);
    const { lat, lng, timezone, city, region, postalCode } = data.location;
    const { ip, isp } = data;
    updateData(ip, isp, city, region, timezone, postalCode);
    updateMap(lat, lng);
};

const updateData = (ip, isp, city, region, timezone, postalCode) => {
    elements.ip.textContent = ip;
    elements.isp.textContent = isp;
    elements.loc.textContent = city + " , " + region + " " + postalCode;
    elements.timezone.textContent = "UTC " + timezone;
};

const updateMap = (lat, lng) => {
    L.marker([lat, lng], { icon: customIcon }).addTo(map);
    map.setView([lat, lng], 15);
};
