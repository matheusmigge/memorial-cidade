import "./PhotoTags.css"
import React from "react";
import Photo from "../../../models/Photo";

interface PhotoTagsProps {
  photo: Photo;
}

function PhotoTags({photo}: PhotoTagsProps) {

    return (
        <div className="photo-tags">
            {photo.tags.map((tag) => (
            <button key={tag.id} className="tag">
                <img src={tag.category.iconURL} />
                <h1>{tag.name}</h1>
            </button>
            ))}
        </div>
    )
}

export default PhotoTags