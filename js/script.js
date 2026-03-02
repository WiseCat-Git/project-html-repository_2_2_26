// Tool 1: Highlight current page in the navigation
(function highlightCurrentNav() {
  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const current = window.location.pathname.split("/").pop() || "index.html";

    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (href === current) {
        a.setAttribute("aria-current", "page");
        a.classList.add("onpage");
      }
    });
  });
})();

// Tool 2: Back-to-top button
(function backToTopButton() {
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "back-to-top";
    btn.textContent = "Back to top";
    btn.style.display = "none";

    document.body.appendChild(btn);

    function toggleButton() {
      btn.style.display = window.scrollY > 300 ? "block" : "none";
    }

    window.addEventListener("scroll", toggleButton);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();

/*
  Google Maps API callback.
  Requirements beyond base:
  1) Multiple markers
  2) InfoWindow
  3) Polyline connecting points
*/
window.initMap = function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) {
    return; // only run on map.html
  }

  // Example coordinates (edit to your preferred places)
  const places = [
    { name: "Cali, Colombia", position: { lat: 3.4516, lng: -76.5320 } },
    { name: "Bogotá, Colombia", position: { lat: 4.7110, lng: -74.0721 } },
    { name: "Medellín, Colombia", position: { lat: 6.2442, lng: -75.5812 } }
  ];

  const map = new google.maps.Map(mapEl, {
    center: places[0].position,
    zoom: 6,
    mapTypeControl: true
  });

  const info = new google.maps.InfoWindow();

  const path = [];

  places.forEach((p) => {
    const marker = new google.maps.Marker({
      map,
      position: p.position,
      title: p.name
    });

    marker.addListener("click", () => {
      info.setContent(`<div><strong>${p.name}</strong></div>`);
      info.open({ map, anchor: marker });
    });

    path.push(p.position);
  });

  // Polyline feature
  new google.maps.Polyline({
    map,
    path,
    geodesic: true,
    strokeOpacity: 0.9,
    strokeWeight: 3
  });
};