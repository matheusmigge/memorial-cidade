import { Marker } from "react-leaflet";
import Photo from "../../../models/Photo";
import PhotoPreview from "../PhotoPreview/PhotoPreview";
import React, { useState } from "react";
import L from "leaflet";
import PhotoPolygon from "../PhotoPolygon/PhotoPolygon";

interface PhotoMarkerProps {
  photo: Photo;
}

function PhotoMarker({ photo }: PhotoMarkerProps) {
  const[isPopupOpen, setIsPopupOpen] = useState(false);

  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<div class="marker-circle" style="background-color: ${photo.decades[0].colorHex};">
                    <img src="${photo.viewSubcategory.iconURL}" alt="marker-icon" />
                 </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });

  return (
    <Marker
      key={photo.id}
      position={photo.coordinates}
      icon={customIcon}
      eventHandlers={{
        popupopen: () => setIsPopupOpen(true),
        popupclose: () => setIsPopupOpen(false),
      }}
    >
      <PhotoPreview photo={photo} />

      {isPopupOpen && <PhotoPolygon photo={photo} />}
    </Marker>
  );
}

export default PhotoMarker;
