import React from 'react';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Help and Credits</h2>
        <p className="mb-4">
          This map utilizes technologies such as Nx monorepo, NextJs, Leaflet, GeoJSON, Redux, and Tailwind CSS.
        </p>
        
        <h3 className="text-md font-semibold mb-2">How to use the map:</h3>
        <p className="mb-4">
          Use the <span className="font-bold">Oblast</span> and <span className="font-bold">Roads</span> buttons to toggle visibility of Ukraine’s regions and road networks on the map. Hover over regions to view population details.
        </p>
        
        <h3 className="text-md font-semibold mb-2">Resources and Credits:</h3>
        <ul className="list-disc ml-5 mb-4">
          <li>
            <a
              href="https://github.com/org-scn-design-studio-community/sdkcommunitymaps/blob/master/geojson/Europe/Ukraine-regions.json"
              target="_blank"
              className="text-blue-500 underline"
            >
              Ukraine Regions GeoJSON
            </a>
          </li>
          <li>
            <a
              href="https://www.statsilk.com/maps/convert-esri-shapefile-map-geojson-format"
              target="_blank"
              className="text-blue-500 underline"
            >
              Convert Shapefile to GeoJSON
            </a>
          </li>
          <li>
            <a
              href="https://mapcruzin.com/free-ukraine-arcgis-maps-shapefiles.htm"
              target="_blank"
              className="text-blue-500 underline"
            >
              Free Ukraine ArcGIS Maps
            </a>
          </li>
          <li>
            <a
              href="https://geojson.io/"
              target="_blank"
              className="text-blue-500 underline"
            >
              GeoJSON Editor
            </a>
          </li>
        </ul>
        
        <h3 className="text-md font-semibold mb-2">Author:</h3>
        <p className="mb-4">David Orlando Miranda Roa</p>
        <p className="mb-4">Contact: <a href="mailto:domirandar@unal.edu.co" className="text-blue-500 underline">domirandar@unal.edu.co</a></p>

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HelpDialog;
