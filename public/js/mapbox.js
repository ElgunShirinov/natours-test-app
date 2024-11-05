/* eslint-disable */
const displayMap = locations => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxndW4tc2hpcmlub3YiLCJhIjoiY20yZWszejB0MWU3NzJrcjJrbDBhdGZ3eiJ9.W1rjrlKbEEw9Dt9oIqf_Zw';

  // Initialize the Mapbox map
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: false,
    projection: 'globe',
    zoom: 6,
    center: [-118.113491, 34.111745],
    interactive: true,
  });

  // Suppress missing image warnings
  const originalWarn = console.warn;
  map.on('styleimagemissing', function (e) {
    // Temporarily disable warnings for missing images
    console.warn = function () {};
    // console.log(`Suppressing missing image: ${e.id}`);
    setTimeout(() => {
      console.warn = originalWarn; // Restore warning functionality after 100ms
    }, 100);
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker element
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker to the map
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup with location details
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  // Fit the map to the bounds to include all locations
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
