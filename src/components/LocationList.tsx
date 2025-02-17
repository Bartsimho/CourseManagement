import React from 'react';
import { LocationOption } from '../types';
import { MapPin } from 'lucide-react';
import { calculateDistance } from '../utils/distance';

interface LocationListProps {
  locations: LocationOption[];
  userLocation: [number, number] | null;
  onSelect: (id: number) => void;
}

export const LocationList: React.FC<LocationListProps> = ({ locations, userLocation, onSelect }) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="space-y-4">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onSelect(location.id)}
            className="w-full group overflow-hidden rounded-lg hover:ring-2 hover:ring-[#D9D9D9] transition-all"
          >
            <div className="relative">
              <img 
                src={location.image} 
                alt={location.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#D9D9D9]" />
                      <h3 className="font-medium text-[#D9D9D9] text-lg">{location.name}</h3>
                    </div>
                    {'distance' in location && userLocation && (
                      <span className="text-[#D9D9D9] text-sm">
                        {Math.round((location as any).distance)} yards away
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#D9D9D9] mt-1">{location.description}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};