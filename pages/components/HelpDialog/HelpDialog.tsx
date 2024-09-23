import React from 'react';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">Help and Credits</h2>
        <p className="mb-2">This map utilizes technologies such as React, Redux, and Tailwind CSS.</p>
        <p className="mb-4">Credits to all the resources used.</p>
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
