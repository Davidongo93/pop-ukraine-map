import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

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
