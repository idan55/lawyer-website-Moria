import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function OfficeMap({ lat, lng, label }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (map.current) return undefined;
    if (!mapContainer.current) return undefined;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 17.4,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    markerRef.current = new mapboxgl.Marker({ color: "#c1121f" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${label}</strong>`))
      .addTo(map.current);

    map.current.on("load", () => {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 17.6,
        essential: true,
      });
      markerRef.current?.togglePopup();
    });

    return () => {
      markerRef.current?.remove();
      map.current?.remove();
      markerRef.current = null;
      map.current = null;
    };
  }, [lat, lng, label]);

  useEffect(() => {
    if (!map.current || !markerRef.current) return;

    markerRef.current.setLngLat([lng, lat]);
    map.current.flyTo({
      center: [lng, lat],
      zoom: 17.6,
      essential: true,
    });
  }, [lat, lng]);

  return <div ref={mapContainer} className="mapbox-canvas" />;
}

export default OfficeMap;
