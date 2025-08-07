import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import hospitalImg from '../assets/image.png'; 
import 'leaflet/dist/leaflet.css';

const hospitalIcon = new L.Icon({
  iconUrl: hospitalImg,
  iconSize: [28, 28],
});

const NearHospitals = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        console.log('User Location:', coords); // Debugging log
        setLocation(coords);
        fetchHospitals(coords.lat, coords.lon);
      },
      (err) => console.error('Error getting location:', err)
    );
  }, []);

  const fetchHospitals = async (lat, lon) => {
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:15000,${lat},${lon});
        way["amenity"="hospital"](around:15000,${lat},${lon});
        relation["amenity"="hospital"](around:15000,${lat},${lon});
      );
      out center;
    `;
    try {
      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        query,
        {
          headers: { 'Content-Type': 'text/plain' },
        }
      );
      const results = response.data.elements;
      console.log('Hospitals Data:', results); // Debugging log
      setHospitals(results);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#0B0F0E', minHeight: '100vh', color: '#FFFFFF' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success mb-0">📍 আশেপাশের হাসপাতাল</h2>
        {location && (
          <button className="btn btn-outline-success btn-sm" onClick={() => fetchHospitals(location.lat, location.lon)}>
            🔄 রিফ্রেশ
          </button>
        )}
      </div>

      {location ? (
        <div className="rounded overflow-hidden border border-success shadow" style={{ height: '80vh' }}>
          <MapContainer
            center={[location.lat, location.lon]}  // This should center the map on the user's location
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lon]}>
              <Popup className="text-success">🧍 তুমি এখানে আছো</Popup>
            </Marker>
            {hospitals.map((h, i) => {
              const lat = h.lat || h.center?.lat;
              const lon = h.lon || h.center?.lon;
              return (
                <Marker key={i} position={[lat, lon]} icon={hospitalIcon}>
                  <Popup className="text-success">
                    🏥 {h.tags?.name || 'Unnamed Hospital'}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="text-center">
            <div className="spinner-border text-success mb-3" role="status"></div>
            <p className="text-white">📡 তোমার লোকেশন নিচ্ছি... একটু অপেক্ষা করো</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearHospitals;
