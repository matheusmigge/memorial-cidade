import "./ExplorePage.css";
import Photo from "../models/Photo";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import PhotoMarker from "../components/Photo/PhotoMarker/PhotoMarker";
import PhotoModal from "../components/Photo/PhotoModal/PhotoModal";
import TimelineBar from "../components/TimelineBar/TimelineBar";

function ExplorePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const fetchPhotos = async () => {
    const response = await fetch("https://memorial-cidade-backend-production.up.railway.app/photos");
    const data = await response.json();
    setPhotos(data);
  };

  function handleSeePhotoClick(photo: Photo) {
    setSelectedPhoto(photo);
  }

  function handleSeePhotoClose() {
    setSelectedPhoto(null);
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <PhotoModal
        isOpen={!!selectedPhoto}
        onClose={handleSeePhotoClose}
        photo={selectedPhoto}
      />

      <MapContainer
        center={[-8.0433112, -34.934217]}
        zoom={13}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {photos.map((photo) => (
          <PhotoMarker
            key={photo.id}
            photo={photo}
            onClick={() => handleSeePhotoClick(photo)}
          />
        ))}
      </MapContainer>

      <TimelineBar/>
    </>
  );
}

export default ExplorePage;
