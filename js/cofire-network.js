const mapNode = document.getElementById("cofire-map");

if (mapNode && window.L) {
  const cofireSites = [
    { no: 1, name: "Roo Community Fish Reserve", location: "S00032.969'/E034007.642'", area: 1118, county: "Homabay", lat: -0.549483, lng: 34.127367 },
    { no: 2, name: "Sondu-Miriu River Mouth", location: "S00002.590'/E034037.941'", area: 1230, county: "Homabay", lat: -0.043167, lng: 34.63235 },
    { no: 3, name: "Awach River Mouth Community Fish Reserve", location: "S00020.380'/E034038.380'", area: 840, county: "Homabay", lat: -0.339667, lng: 34.639667 },
    { no: 4, name: "Ngothe Bay Community Fish Reserve", location: "S00000.363'/E034034.164'", area: 780, county: "Homabay", lat: -0.00605, lng: 34.5694 },
    { no: 5, name: "Lela Community Fish Reserve", location: "S00021.028'/E034042.043'", area: 712, county: "Homabay", lat: -0.350467, lng: 34.700717 },
    { no: 6, name: "Otiwa Community Fish Reserve", location: "S00008.821'/E034034.230'", area: 1040, county: "Kisumu", lat: -0.147017, lng: 34.5705 },
    { no: 7, name: "Nyamarwaka Community Fish Reserve", location: "S00010.212'/E034026.819'", area: 530, county: "Kisumu", lat: -0.1702, lng: 34.446983 },
    { no: 8, name: "Kusa Community Fish Reserve", location: "S00018.084'/E034052.083'", area: 744, county: "Kisumu", lat: -0.3014, lng: 34.86805 },
    { no: 9, name: "Sio River Mouth Community Fish Reserve", location: "N00013.267'/E034000.603'", area: 580, county: "Busia", lat: 0.221117, lng: 34.01005 },
    { no: 10, name: "Nzoia River Mouth Community Fish Reserve", location: "N00003.495'/E033057.102'", area: 1300, county: "Busia", lat: 0.05825, lng: 33.9517 },
    { no: 11, name: "Lake Kanyaboli Community Fish Reserve", location: "N00003.924'/E034008.917'", area: 1120, county: "Siaya", lat: 0.0654, lng: 34.148617 },
    { no: 12, name: "Lake Sare-Namboyo Community Fish Reserve", location: "N00003.158'/E034008.992'", area: 500, county: "Siaya", lat: 0.052633, lng: 34.149867 },
    { no: 13, name: "Kokach Community Fish Reserve", location: "S00004.334'/E034022.746'", area: 490, county: "Siaya", lat: -0.072233, lng: 34.3791 },
    { no: 14, name: "Kadedi Community Fish Reserve", location: "S00011.649'/E034021.317'", area: 520, county: "Siaya", lat: -0.19415, lng: 34.355283 },
    { no: 15, name: "Kadimo Bay Community Fish Reserve", location: "S00003.008'/E034009.001'", area: 712, county: "Siaya", lat: -0.050133, lng: 34.150017 },
  ];

  const countyColor = {
    Homabay: "#e66f2c",
    Kisumu: "#2f6b4f",
    Busia: "#2c7fb8",
    Siaya: "#8b5fbf",
  };

  const map = L.map("cofire-map", {
    zoomControl: true,
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const points = [];

  cofireSites.forEach((site) => {
    const marker = L.circleMarker([site.lat, site.lng], {
      radius: 7,
      fillColor: countyColor[site.county] || "#2f6b4f",
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    }).addTo(map);

    marker.bindPopup(
      `<strong>${site.no}. ${site.name}</strong><br/>County: ${site.county}<br/>Area: ${site.area} Ha<br/>Location: ${site.location}`
    );

    points.push([site.lat, site.lng]);
  });

  map.fitBounds(L.latLngBounds(points), { padding: [24, 24] });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
