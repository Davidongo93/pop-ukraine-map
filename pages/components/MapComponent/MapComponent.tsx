import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { oblastsPopulation } from '../UkraineMap/oblastPopulation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


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
      const responseOblasts = await fetch('/geo/map.geojson');
      const dataOblasts = await responseOblasts.json();
      setGeojsonDataOblast(dataOblasts);

      const responseRoads = await fetch('/geo/roads.geojson');
      const dataRoads = await responseRoads.json();
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
      <MapContainer center={[48.3794, 31.1656]} zoom={6} style={{ height: '100vh', width: '90%' }}>
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

export default MapComponent;
