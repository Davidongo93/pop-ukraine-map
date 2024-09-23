import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Carga el componente de mapa dinámicamente para evitar el problema de 'window'
const MapComponent = dynamic(() => import('../MapComponent/MapComponent'), { ssr: false });

const GeoJsonMap: React.FC = () => {
  const [hoveredOblast, setHoveredOblast] = useState<OblastKey | null>(null);

  return (
    <div className="relative">
      <MapComponent
        setHoveredOblast={setHoveredOblast}
        hoveredOblast={hoveredOblast}
      />
    </div>
  );
};

export default GeoJsonMap;
