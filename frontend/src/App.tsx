import "leaflet/dist/leaflet.css";
import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import Photo from "./models/Photo";
import PhotoPolygon from "./components/Photo/PhotoPolygon/PhotoPolygon";
import PhotoMarker from "./components/Photo/PhotoMarker/PhotoMarker";

function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const response = await fetch("http://localhost:3000/photos");
    const data = await response.json();
    setPhotos(data);
  };

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
            <PhotoMarker photo={photo}/>
            <PhotoPolygon photo={photo}/>
          </>
        );
      })}
    </MapContainer>
  );
}

export default App;
