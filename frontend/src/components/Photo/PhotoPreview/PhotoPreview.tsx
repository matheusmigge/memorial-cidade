import React from "react";
import { Popup } from "react-leaflet";
import Photo from "../../../models/Photo";

interface PhotoPreviewProps {
  photo: Photo;
}

function PhotoPreview({ photo }: PhotoPreviewProps) {
  return (
    <Popup>
      <img src={photo.url} style={{ width: "100%", borderRadius: "15px" }} />

      <div className="text-container">
        <h1>{photo.title}</h1>
        <p>
          {photo.author} © {photo.sourceCollection}
        </p>
      </div>

      <div className="tag-container">
        {photo.tags.map((tag) => (
          <div key={tag.id} className="tag">
            <img src={tag.category.iconURL} />
            <h1>{tag.name}</h1>
          </div>
        ))}
      </div>
    </Popup>
  );
}

export default PhotoPreview;
