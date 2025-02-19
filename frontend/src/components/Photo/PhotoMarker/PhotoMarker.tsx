import { Marker } from "react-leaflet";
import Photo from "../../../models/Photo";
import PhotoPreview from "../PhotoPreview/PhotoPreview";
import React from "react";
import L from "leaflet";

interface PhotoMarkerProps {
  photo: Photo;
}

function PhotoMarker({ photo }: PhotoMarkerProps) {

    const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-circle" style="background-color: ${photo.decades[0].colorHex};">
                    <img src="/assets/shooting-angles/ground-level.svg" alt="marker-icon" />
                 </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -20],
      });

  return (
    <Marker key={photo.id} position={photo.coordinates} icon={customIcon}>
      <PhotoPreview photo={photo} />
    </Marker>
  );
}

export default PhotoMarker;
