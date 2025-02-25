import "./PhotoPreview.css";
import { Popup } from "react-leaflet";
import Photo from "../../../models/Photo";
import PhotoTags from "../PhotoTags/PhotoTags";

interface PhotoPreviewProps {
  photo: Photo;
  onClick: () => void;
}

function PhotoPreview({ photo, onClick }: PhotoPreviewProps) {
  
  return (
    <Popup>
      <div className="photo-preview">
        <div className="photo-container">
          <img className="photo-img" src={photo.url} />

          <button
            className="see-photo-button"
            onClick={() => onClick()}
          >
            ver foto
          </button>
        </div>

        <div className="text-container">
          <h1>
            {photo.yearStart}
            {photo.yearEnd ? `~${photo.yearEnd}` : ""} - {photo.title}
          </h1>
          <p>
            {photo.author} © {photo.sourceCollection}
          </p>
        </div>

        <PhotoTags photo={photo}/>
      </div>
    </Popup>
  );
}

export default PhotoPreview;
