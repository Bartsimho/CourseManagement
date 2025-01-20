import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { Location } from '../types';
import { calculateDistance } from '../utils/distance';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Crosshair, Ruler } from 'lucide-react';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  location: Location;
}

function MapEvents() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [clickedLocation, setClickedLocation] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setClickedLocation([lat, lng]);
      
      if (userLocation) {
        const dist = calculateDistance(
          userLocation[0],
          userLocation[1],
          lat,
          lng
        );
        setDistance(dist);
      }
    },
  });

  useEffect(() => {
    map.locate();
    map.on('locationfound', (e) => {
      setUserLocation([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  const getMidpoint = (point1: [number, number], point2: [number, number]): [number, number] => {
    return [
      (point1[0] + point2[0]) / 2,
      (point1[1] + point2[1]) / 2
    ];
  };

  return (
    <>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            <div className="text-center">
              <p className="font-medium">Your Location</p>
              <p className="text-sm mt-1">
                {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      {clickedLocation && (
        <>
          <Marker position={clickedLocation}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">Selected Point</p>
                <p className="text-sm mt-1">
                  {clickedLocation[0].toFixed(6)}, {clickedLocation[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
          {userLocation && distance && (
            <>
              <Polyline
                positions={[userLocation, clickedLocation]}
                pathOptions={{ color: 'white', weight: 2 }}
              />
              <Marker 
                position={getMidpoint(userLocation, clickedLocation)}
                icon={L.divIcon({
                  className: 'distance-label',
                  html: `<div class="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                    ${Math.round(distance)} yards
                  </div>`,
                })}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-[#D9D9D9] text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Click to get coordinates
        </div>
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4" /> Your location will be shown
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4" /> Distance in yards
        </div>
      </div>
      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={location.coordinates}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          />
          <Marker position={location.coordinates}>
            <Popup>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm">{location.description}</p>
              </div>
            </Popup>
          </Marker>
          <MapEvents />
        </MapContainer>
      </div>
    </div>
  );
};