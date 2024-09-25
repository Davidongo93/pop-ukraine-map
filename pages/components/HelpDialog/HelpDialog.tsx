import React from 'react';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-20 bg-black bg-opacity-40 flex items-center justify-center z-60">
      <div className="bg-white p-12 rounded-lg shadow-lg w-100%">
        <h2 className="text-lg font-bold mb-2">Help and Credits</h2>
        <p className="mb-2">This map utilizes technologies such as Nx monorepo, NextJs, Leaflet, geojson, Redux, and Tailwind CSS.</p>
        <p className="mb-4">Credits to all the resources used.</p>
        <p className="mb-4"> https://github.com/org-scn-design-studio-community/sdkcommunitymaps/blob/master/geojson/Europe/Ukraine-regions.json</p>
        <p className="mb-4">https://www.statsilk.com/maps/convert-esri-shapefile-map-geojson-format</p>
        <p className="mb-4">https://mapcruzin.com/free-ukraine-arcgis-maps-shapefiles.htm</p>
        <p className="mb-4">https://geojson.io/</p>

        <p className="mb-2 font-semibold">Author: David Orlando Miranda Roa</p>
        <p className="mb-2 font-semibold">Contact: domirandar@unal.edu.co</p>
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HelpDialog;
