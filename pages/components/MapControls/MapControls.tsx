import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOblasts, toggleRoads } from '../../../redux/reducers/mapReducer';
import { RootState } from '../../../redux/store';
import { FaMapSigns, FaRoad, FaInfoCircle } from 'react-icons/fa';
import HelpDialog from '../HelpDialog/HelpDialog';

const MapControls: React.FC = () => {
  const dispatch = useDispatch();
  const showOblasts = useSelector((state: RootState) => state.map.showOblasts);
  const showRoads = useSelector((state: RootState) => state.map.showRoads);
  const [isDialogOpen, setDialogOpen] = useState(false); // Estado para manejar el diálogo

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col space-y-4 z-50">
      <button
        className={`map-button oblast ${showOblasts ? 'bg-blue-500' : 'bg-blue-400'}`}
        onClick={() => dispatch(toggleOblasts())}
        title={showOblasts ? 'Ocultar Oblasts' : 'Mostrar Oblasts'}
      >
        <FaMapSigns className="text-xl" />
      </button>

      <button
        className={`map-button roads ${showRoads ? 'bg-red-500' : 'bg-red-400'}`}
        onClick={() => dispatch(toggleRoads())}
        title={showRoads ? 'Ocultar Carreteras' : 'Mostrar Carreteras'}
      >
        <FaRoad className="text-xl" />
      </button>

      <button
        className="map-button bg-gray-500"
        onClick={toggleDialog}
        title="Mostrar Ayuda"
      >
        <FaInfoCircle className="text-xl" />
      </button>

      <HelpDialog isOpen={isDialogOpen} onClose={toggleDialog} />
    </div>
  );
};

export default MapControls;
