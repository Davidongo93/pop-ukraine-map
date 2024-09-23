import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOblasts, toggleRoads } from '../../redux/reducers/mapReducer';
import { RootState } from '../../redux/store';

const MapControls: React.FC = () => {
  const dispatch = useDispatch();
  const showOblasts = useSelector((state: RootState) => state.map.showOblasts);
  const showRoads = useSelector((state: RootState) => state.map.showRoads);

  return (
    <div className="fixed top-4 right-4 flex flex-col space-y-4 z-50">
      {/* Botón para mostrar u ocultar Oblasts */}
      <button
        className={`w-14 h-14 flex justify-center items-center rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none
          ${showOblasts ? 'bg-blue-500' : 'bg-blue-400'} bg-opacity-60 border border-blue-400 text-white`}
        onClick={() => dispatch(toggleOblasts())}
        title={showOblasts ? 'Ocultar Oblasts' : 'Mostrar Oblasts'}
      >
        O
      </button>

      {/* Botón para mostrar u ocultar Carreteras */}
      <button
        className={`w-14 h-14 flex justify-center items-center rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none
          ${showRoads ? 'bg-red-500' : 'bg-red-400'} bg-opacity-60 border border-red-400 text-white`}
        onClick={() => dispatch(toggleRoads())}
        title={showRoads ? 'Ocultar Carreteras' : 'Mostrar Carreteras'}
      >
        R
      </button>
    </div>
  );
};

export default MapControls;
