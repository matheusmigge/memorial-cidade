import "./PhotoPreview.css";
import React from "react";
import { Popup } from "react-leaflet";
import Photo from "../../../models/Photo";

interface PhotoPreviewProps {
  photo: Photo;
}

function PhotoPreview({ photo }: PhotoPreviewProps) {
  return (
    <Popup>
      <div className="photo-preview">
        <div className="photo-container">
          <img className="photo-img" src={photo.url} />

          <button className="see-photo-button">ver foto</button>
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

        <div className="tag-container">
          {photo.tags.map((tag) => (
            <button key={tag.id} className="tag">
              <img src={tag.category.iconURL} />
              <h1>{tag.name}</h1>
            </button>
          ))}
        </div>
      </div>
    </Popup>
  );
}

export default PhotoPreview;
