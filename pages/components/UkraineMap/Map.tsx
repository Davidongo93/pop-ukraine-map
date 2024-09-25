'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { oblastsPopulation } from '../../../public/data/oblastPopulation'; // Ajusta la ruta según tu estructura de carpetas

// Definir un tipo que represente las claves de los oblasts
type OblastKey = keyof typeof oblastsPopulation;

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
