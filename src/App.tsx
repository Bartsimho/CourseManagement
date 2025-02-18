import React, { useState, useEffect } from 'react';
import { SelectionButton } from './components/SelectionButton';
import { LocationList } from './components/LocationList';
import { LocationMap } from './components/LocationMap';
import { locations, locationOptions } from './data';
import { calculateDistance } from './utils/distance';

function App() {
  const [step, setStep] = useState<'initial' | 'selection' | 'map'>('initial');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [sortedLocations, setSortedLocations] = useState(locationOptions);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition((position) => {
        const userCoords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setUserLocation(userCoords);

        // Sort locations by distance from user
        const locationsWithDistance = locationOptions.map(location => {
          const fullLocation = locations.find(loc => loc.id === location.id);
          if (!fullLocation) return { ...location, distance: Infinity };
          
          const distance = calculateDistance(
            userCoords[0],
            userCoords[1],
            fullLocation.coordinates[0],
            fullLocation.coordinates[1]
          );
          
          return {
            ...location,
            distance
          };
        });

          const sorted = locationsWithDistance.sort((a, b) => a.distance - b.distance);
          setSortedLocations(sorted);
        },
        (error) => {
          console.error('Error watching position:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
  
      // Cleanup the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  const handleLocationSelect = (id: number) => {
    setSelectedLocation(id);
    setStep('map');
  };

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-[#4B4B4B] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {step === 'initial' && (
          <div className="flex flex-col items-center">
            <h1 className="text-[#D9D9D9] text-3xl font-bold mb-8">Course Selection</h1>
            <SelectionButton onClick={() => setStep('selection')} />
          </div>
        )}
        
        {step === 'selection' && (
          <div className="space-y-4 max-h-screen">
            <button
            onClick={() => setStep('initial')}
            className="text-[#D9D9D9] hover:underline flex items-center gap-2"
            >
              ← Back to start
            </button>
            <h2 className="text-[#D9D9D9] text-xl font-semibold mb-4">Select a Golf Course</h2>
              <div className="overflow-auto max-h-[calc(3.5*theme(height.48))] p-8">
                <LocationList
                  locations={sortedLocations}
                  userLocation={userLocation}
                  onSelect={handleLocationSelect}
                />
              </div>
          </div>
        )}
        
        {step === 'map' && selectedLocationData && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('selection')}
              className="text-[#D9D9D9] hover:underline flex items-center gap-2"
            >
              ← Back to selection
            </button>
            <div className="bg-[#D9D9D9] p-4 rounded-lg mb-4">
              <h2 className="text-[#4B4B4B] text-xl font-semibold">{selectedLocationData.name}</h2>
              <p className="text-[#4B4B4B] opacity-75">{selectedLocationData.description}</p>
            </div>
            <LocationMap location={selectedLocationData} userLocation={userLocation} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;