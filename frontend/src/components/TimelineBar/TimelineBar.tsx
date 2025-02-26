import "./TimelineBar.css"
import { useEffect, useRef, useState } from "react";
import Decade from "../../models/Decade";

function TimelineBar() {
  const [decades, setDecades] = useState<Decade[]>([]);

  const fetchDecades = async () => {
    const response = await fetch("https://memorial-cidade-backend-production.up.railway.app/decades");
    const data = await response.json();
    setDecades(data);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonScrollAmount = 230;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= buttonScrollAmount;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += buttonScrollAmount;
    }
  };

  useEffect(() => {
    fetchDecades();
  }, []);

  return (
    <div className="timeline-bar">
      <div className="border">
        <button className="scroll-button left" onClick={scrollLeft}>
          <img src="/assets/chevron-left.svg"></img>
        </button>

        <div className="content" ref={scrollRef}>
          {decades.map((decade) => (
            <button
              className="decade-button" key={decade.id}
              style={{
                backgroundColor: decade.backgroundColorHex,
                color: decade.fontColorHex,
              }}
            >
              <p>{decade.name}</p>
            </button>
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>
          <img src="/assets/chevron-right.svg"></img>
        </button>
      </div>
    </div>
  );
}

export default TimelineBar;
