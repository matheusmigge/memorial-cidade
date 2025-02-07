import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  return (
    <MapContainer center={[-8.0433112, -34.934217]} zoom={13} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" <<< minimalist version 
      />
      <Marker position={[-8.0638485,-34.8750566]}>
        <Popup>
          <img
            src="https://blogs.diariodepernambuco.com.br/diretodaredacao/wp-content/uploads/2017/02/m_berzin.jpg"
            style={{ width: "100%", borderRadius: "5px" }}
          />

          <div className="text-container">
            <h1>1944 - Bairro do Recife, Ponte Maurício de Nassau</h1>
            <p>© Acervo do Museu da Cidade do Recife</p>
          </div>

          <div className="tag-container">
            <div className="tag">
              <img src="/src/assets/svg-icons/decade.svg" />
              <h1>1940s</h1>
            </div>

            <div className="tag">
              <img src="/src/assets/svg-icons/shooting-angles/ground-level.svg" />
              <h1>Vista à pé</h1>
            </div>

            <div className="tag">
              <img src="/src/assets/svg-icons/neighborhood.svg" />
              <h1>Bairro do Recife</h1>
            </div>

            <div className="tag">
              <img src="/src/assets/svg-icons/theme.svg" />
              <h1>Bairro do Recife</h1>
            </div>

            <div className="tag">
              <img src="/src/assets/svg-icons/theme.svg" />
              <h1>Cotidiano</h1>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
