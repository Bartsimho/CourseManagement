import React from 'react';
import { MapPin } from 'lucide-react';

interface SelectionButtonProps {
  onClick: () => void;
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 bg-[#D9D9D9] text-[#4B4B4B] rounded-lg hover:bg-opacity-90 transition-all"
    >
      <MapPin className="w-5 h-5" />
      <span className="font-medium">Course Selection</span>
    </button>
  );
};