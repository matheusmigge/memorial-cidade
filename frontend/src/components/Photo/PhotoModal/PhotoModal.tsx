import React from "react";
import Photo from "../../../models/Photo";
import "./PhotoModal.css";

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

function PhotoModal({ photo, isOpen, onClose }: PhotoModalProps) {

  if (!isOpen) return null;
  if (!photo) return null;

  return (
    <div className="photo-modal">
      <div className="fog-background" onClick={onClose} />
      <div className="photo-container">
        <div className="details-container">
          <div className="title-section">
            <h1>
              {photo.yearStart}
              {photo.yearEnd ? `~${photo.yearEnd}` : ""} - {photo.title}
            </h1>
            <h2>© {photo.sourceCollection}</h2>
          </div>

          <div className="contributor-section">
            <h1>Comentário</h1>
            <p className="comment">"{photo.contributorComment}"</p>
            <p className="autor">
              Contribuição de {photo.contributorName} <br />
              Publicado em{" "}
              {new Date(photo.publicationDate).toLocaleDateString()}.
            </p>
          </div>

          <div className="source-section">
            <h1>Fonte</h1>
            <a
              href="https://museudacidadedorecife.org/acervo/fotografia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.sourceReference}
            </a>
          </div>
        </div>
        <div className={`scrollable-container`}>
          <img className= {`img`} src={photo.url}></img>
          <iframe
            className={`google-street-view-embed`}
            src={photo.googleStreetViewEmbedLink}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <button className="close-button" onClick={onClose}>
        <img src="/assets/close-button.svg" alt="fechar"></img>
      </button>
    </div>
  );
}
export default PhotoModal;
