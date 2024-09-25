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
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <>
    <div className="fixed top-4 right-4 flex flex-col space-y-4 z-50">
      <button
        className={`map-button ${showOblasts ? 'oblast' : ''}`}
        onClick={() => dispatch(toggleOblasts())}
        title={showOblasts ? 'Ocultar Oblasts' : 'Mostrar Oblasts'}
      >
        <FaMapSigns className="text-xl" />
      </button>

      <button
        className={`map-button  ${showRoads ? 'roads' : ''}`}
        onClick={() => dispatch(toggleRoads())}
        title={showRoads ? 'Ocultar Carreteras' : 'Mostrar Carreteras'}
      >
        <FaRoad className="text-xl" />
      </button>

      <button
        className="map-button about"
        onClick={toggleDialog}
        title="Mostrar Ayuda"
      >
        <FaInfoCircle className="text-xl" />
      </button>

    </div>
      <HelpDialog isOpen={isDialogOpen} onClose={toggleDialog} />
      </>
  );
};

export default MapControls;
