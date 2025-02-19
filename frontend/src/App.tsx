import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import PhotoPreview from "./components/Photo/PhotoPreview/PhotoPreview";
import Photo from "./models/Photo";
import PhotoPolygon from "./components/Photo/PhotoPolygon/PhotoPolygon";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const response = await fetch("http://localhost:3000/photos");
    const data = await response.json();
    setPhotos(data);
  };

  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<div class="marker-circle" style="background-color: #34A0A4;">
              <img src="/assets/shooting-angles/ground-level.svg" alt="marker-icon" />
           </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });

  useEffect(() => {
    fetchPhotos(); // Chama a função para buscar as fotos
  }, []);

  return (
    <MapContainer
      center={[-8.0433112, -34.934217]}
      zoom={13}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {photos.map((photo) => {
        return (
          <>
            <Marker
              key={photo.id}
              position={photo.coordinates}
              icon={customIcon}
            >
              <PhotoPreview photo={photo}/>
            </Marker>
            <PhotoPolygon photo={photo}/>
          </>
        );
      })}
    </MapContainer>
  );
}

export default App;
