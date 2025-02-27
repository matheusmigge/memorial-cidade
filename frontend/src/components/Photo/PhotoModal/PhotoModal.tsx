import Photo from "../../../models/Photo";
import PhotoTags from "../PhotoTags/PhotoTags";
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
            <h1 className="primary">
              {photo.yearStart}
              {photo.yearEnd ? `~${photo.yearEnd}` : ""} - {photo.title}
            </h1>
            <p className="secondary">© {photo.sourceCollection}</p>
          </div>

          <PhotoTags photo={photo}></PhotoTags>

          <div className="contributor-section">
            <p className="comment">"{photo.contributorComment}"</p>
            <p className="secondary">
              Contribuição de {photo.contributorName}. Publicado em{" "}
              {new Date(photo.publicationDate).toLocaleDateString()}.
            </p>
          </div>

          <div className="source-section">
            <h1 className="primary">Fonte</h1>
            <a
              className="secondary"
              href="https://museudacidadedorecife.org/acervo/fotografia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.sourceReference}
            </a>
          </div>
        </div>
        <div className={`scrollable-container`}>
          <a
            className="secondary"
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={`img`} src={photo.url}></img>
          </a>

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
