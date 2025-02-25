import "./PhotoMarker.css"
import { Marker } from "react-leaflet";
import Photo from "../../../models/Photo";
import PhotoPreview from "../PhotoPreview/PhotoPreview";
import { useState } from "react";
import L from "leaflet";
import PhotoPolygon from "../PhotoPolygon/PhotoPolygon";

interface PhotoMarkerProps {
  photo: Photo;
  onClick: () => void;
}

function PhotoMarker({ photo, onClick }: PhotoMarkerProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const customIcon = L.divIcon({
    className: "photo-marker",
    html: `<div class="marker-circle" style="background-color: ${
      photo.decades[0].backgroundColorHex
    }; border: 4px solid ${isPopupOpen ? "black" : "white"};">
                    <img src="${
                      photo.viewSubcategory.iconURL
                    }" alt="marker-icon" />
                 </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });

  return (
    <div className="photo-marker">
      <Marker
        key={photo.id}
        position={photo.coordinates}
        icon={customIcon}
        eventHandlers={{
          popupopen: () => setIsPopupOpen(true),
          popupclose: () => setIsPopupOpen(false),
        }}
      >
        <PhotoPreview photo={photo} onClick={onClick} />

        {isPopupOpen && <PhotoPolygon photo={photo} />}
      </Marker>
    </div>
  );
}

export default PhotoMarker;
