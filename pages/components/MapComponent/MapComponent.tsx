import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const oblastsPopulation = {
  "Donets'k": 4387702,
  "Dnipropetrovs'k": 3258705,
  'Kiev City': 2900920,
  'Kharkiv': 2720342,
  "L'viv": 2535476,
  'Odessa': 2387282,
  "Luhans'k": 2263676,
  'Crimea': 1963770,
  'Zaporizhzhya': 1755663,
  'Kiev': 1731673,
  'Vinnytsya': 1604270,
  'Poltava': 1440684,
  "Ivano-Frankivs'k": 1382721,
  "Khmel'nyts'kyy": 1296103,
  'Transcarpathia': 1259497,
  'Zhytomyr': 1249225,
  'Cherkasy': 1246166,
  'Rivne': 1162049,
  'Mykolayiv': 1159634,
  'Sumy': 1115051,
  "Ternopil'": 1066523,
  'Kherson': 1063803,
  'Chernihiv': 1047023,
  'Volyn': 1042855,
  'Kirovohrad': 974724,
  'Chernivtsi': 910001,
  'Sevastopol': 509992,
} as const;

type OblastKey = keyof typeof oblastsPopulation;

interface MapComponentProps {
  setHoveredOblast: (oblast: OblastKey | null) => void;
  hoveredOblast: OblastKey | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ setHoveredOblast, hoveredOblast }) => {
  const [geojsonDataOblast, setGeojsonDataOblast] = useState<any>(null);
  const [geojsonDataRoads, setGeojsonDataRoads] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [showOblasts, setShowOblasts] = useState(true);
  const [showRoads, setShowRoads] = useState(true);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      // Carga del GeoJSON para las oblasts
      const responseOblasts = await fetch('/geo/map.geojson');
      const dataOblasts = await responseOblasts.json();
      console.log(dataOblasts);
      setGeojsonDataOblast(dataOblasts);

      // Carga del GeoJSON para las carreteras
      const responseRoads = await fetch('/geo/roads.geojson');
      const dataRoads = await responseRoads.json();
      console.log(dataRoads);
      setGeojsonDataRoads(dataRoads);
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
      <div style={{ position: 'absolute', zIndex: 1000, background: 'white', padding: '10px' }}>
        <button onClick={() => setShowOblasts(prev => !prev)}>
          {showOblasts ? 'Ocultar Oblasts' : 'Mostrar Oblasts'}
        </button>
        <button onClick={() => setShowRoads(prev => !prev)}>
          {showRoads ? 'Ocultar Carreteras' : 'Mostrar Carreteras'}
        </button>
      </div>

      <MapContainer center={[48.3794, 31.1656]} zoom={6} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {showOblasts && geojsonDataOblast && (
          <GeoJSON
            data={geojsonDataOblast}
            style={geojsonStyle}
            onEachFeature={onEachFeature}
          />
        )}
        
        {showRoads && geojsonDataRoads && (
          <GeoJSON
            data={geojsonDataRoads}
            style={{ color: '#FF0000', weight: 1 }} // Estilo para las carreteras
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

export default MapComponent;
