import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import PhotoPreview from "./components/Photo/PhotoPreview/PhotoPreview";
import Photo from "./models/Photo";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const response = await fetch("http://localhost:3000/photos");
    const data = await response.json();
    setPhotos(data);
  };

  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<div class="marker-circle" style="background-color: #34A0A4;">
              <img src="/assets/shooting-angles/ground-level.svg" alt="marker-icon" />
           </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });

  useEffect(() => {
    fetchPhotos(); // Chama a função para buscar as fotos
  }, []);

  type LatLng = [number, number];

  const vertex: LatLng = [-8.0638485, -34.8750566]; // Coordenadas do vértice
  const baseAngle = 42; // Ângulo de abertura do triângulo
  const height = 100; // Altura do triângulo (em metros)
  const rotationAngle = 80; // Rotação do triângulo (em graus)

  const metersToDegrees = (
    meters: number,
    latitude: number
  ): [number, number] => {
    const latDegrees = meters / 111111; // 1 grau ≈ 111111 metros
    const lonDegrees = meters / (111111 * Math.cos((latitude * Math.PI) / 180));
    return [latDegrees, lonDegrees];
  };

  const rotatePoint = (
    point: LatLng,
    center: LatLng,
    angle: number
  ): LatLng => {
    const rad = (angle * Math.PI) / 180; // Converter para radianos
    const [latC, lonC] = center;
    const [latP, lonP] = point;

    // Converter para coordenadas relativas ao centro
    const dLat = latP - latC;
    const dLon = lonP - lonC;

    // Aplicar rotação
    const newLat = dLat * Math.cos(rad) - dLon * Math.sin(rad);
    const newLon = dLat * Math.sin(rad) + dLon * Math.cos(rad);

    // Converter de volta para coordenadas globais
    return [latC + newLat, lonC + newLon];
  };

  const calculateTriangleByHeight = (
    vertex: LatLng,
    baseAngle: number,
    height: number,
    rotationAngle: number
  ): LatLng[] => {
    const [latA, lonA] = vertex;
    const halfAngle = (baseAngle / 2) * (Math.PI / 180); // Converter para radianos

    // Cálculo da base do triângulo
    const base = 2 * height * Math.tan(halfAngle);

    // Converter altura e base para graus geográficos
    const [heightLat] = metersToDegrees(height, latA);
    const [, baseLon] = metersToDegrees(base / 2, latA);

    // Ponto D (meio da base) -> deslocado para frente em relação a A
    const latD = latA + heightLat;

    // Ponto B e C -> afastados do ponto D pela metade da base
    const latB = latD;
    const lonB = lonA - baseLon;

    const latC = latD;
    const lonC = lonA + baseLon;

    // Aplicar rotação nos pontos B e C
    const rotatedB = rotatePoint([latB, lonB], vertex, rotationAngle);
    const rotatedC = rotatePoint([latC, lonC], vertex, rotationAngle);

    return [vertex, rotatedB, rotatedC];
  };

  const trianglePoints = calculateTriangleByHeight(
    vertex,
    baseAngle,
    height,
    rotationAngle
  );

  return (
    <MapContainer
      center={[-8.0433112, -34.934217]}
      zoom={13}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {photos.map((photo) => {
        return (
          <Marker key={photo.id} position={photo.coordinates} icon={customIcon}>
            <PhotoPreview photo={photo}></PhotoPreview>
          </Marker>
        );
      })}

      <Polygon pathOptions={{ color: "red" }} positions={[trianglePoints]} />
    </MapContainer>
  );
}

export default App;
