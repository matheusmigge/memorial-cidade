import { Polygon } from "react-leaflet";
import Photo from "../../../models/Photo";

interface PhotoViewProps {
  photo: Photo;
}

function PhotoPolygon({ photo }: PhotoViewProps) {

  type LatLng = [number, number];

  const vertex: LatLng = photo.coordinates; // Coordenadas do vértice
  const baseAngle = 42; // Ângulo de abertura do triângulo
  const height = 100; // Altura do triângulo (em metros)
  const rotationAngle = photo.compassDirection; // Rotação do triângulo (em graus)

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
    
    <Polygon pathOptions={{ color: "red" }} positions={[trianglePoints]} />
  );
}

export default PhotoPolygon;
