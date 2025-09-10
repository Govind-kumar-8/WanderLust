mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listings.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listings.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 10 }).setHTML(
      `<h4>${listings.location}</h4><p>Extact location will be provided after bookings</p>`
    )
  )
  .addTo(map);
