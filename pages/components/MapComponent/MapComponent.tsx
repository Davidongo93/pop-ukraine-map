import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { oblastsPopulation } from '../../../public/oblastPopulation';

// Cargar componentes de Leaflet de forma dinámica
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then((mod) => mod.GeoJSON), { ssr: false });

type OblastKey = keyof typeof oblastsPopulation;

interface MapComponentProps {
  setHoveredOblast: (oblast: OblastKey | null) => void;
  hoveredOblast: OblastKey | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ setHoveredOblast, hoveredOblast }) => {
  const showOblasts = useSelector((state: RootState) => state.map.showOblasts);
  const showRoads = useSelector((state: RootState) => state.map.showRoads);

  const [geojsonDataOblast, setGeojsonDataOblast] = useState<any>(null);
  const [geojsonDataRoads, setGeojsonDataRoads] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const [responseOblasts, responseRoads] = await Promise.all([
          fetch('/geo/map.geojson'),
          fetch('/geo/roads.geojson')
        ]);
        const dataOblasts = await responseOblasts.json();
        const dataRoads = await responseRoads.json();

        setGeojsonDataOblast(dataOblasts);
        setGeojsonDataRoads(dataRoads);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };
    fetchGeoJSON();
  }, []);

  const geojsonStyle = (feature: any) => {
    const oblastName = feature.properties.NAME_1 as OblastKey | undefined;
    return {
      color: '#3388ff',
      weight: 2,
      fillColor: oblastName === hoveredOblast ? '#00f' : '#ccc',
      fillOpacity: 0.5,
    };
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      mouseover: (event) => handleMouseOver(feature, layer, event.originalEvent),
      mousemove: (event) => {
        setTooltipPosition({ x: event.originalEvent.clientX, y: event.originalEvent.clientY });
      },
      mouseout: () => {
        setHoveredOblast(null);
      },
    });
  };

  const handleMouseOver = (feature: any, layer: L.Layer, event: MouseEvent) => {
    const oblastName = feature.properties.NAME_1 as OblastKey | undefined;

    if (oblastName && oblastName in oblastsPopulation) {
      setHoveredOblast(oblastName);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <>
      <MapContainer center={[48.3794, 31.1656]} zoom={6} style={{ height: '100vh', width: 'auto', zIndex: 0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {showRoads && geojsonDataRoads && (
          <GeoJSON
            data={geojsonDataRoads}
            style={{ color: '#FF0000', weight: 1 }}
          />
        )}

        {showOblasts && geojsonDataOblast && (
          <GeoJSON
            data={geojsonDataOblast}
            style={geojsonStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {hoveredOblast && tooltipPosition && (
        <div
          className="absolute p-4 bg-white border rounded shadow-lg"
          style={{ top: tooltipPosition.y + 10, left: tooltipPosition.x + 10, zIndex: 1000 }}
        >
          <p className="font-bold">{hoveredOblast}</p>
          <p>Población: {oblastsPopulation[hoveredOblast]?.toLocaleString()} habitantes</p>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
