import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import hospitalImg from '../assets/image.png'; 

const hospitalIcon = new L.Icon({
  iconUrl: hospitalImg,
  iconSize: [28, 28],
});

const NearHospitals = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLocation(coords);
      fetchHospitals(coords.lat, coords.lon);
    });
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
    const response = await axios.post(
      'https://overpass-api.de/api/interpreter',
      query,
      {
        headers: { 'Content-Type': 'text/plain' },
      }
    );
    const results = response.data.elements;
    setHospitals(results);
  };

  return (
    <div className="container mt-4">
      <h2>📍 আশেপাশের হাসপাতাল</h2>
      {location ? (
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={13}
          style={{ height: '80vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lon]}>
            <Popup>🧍 তুমি এখানে আছো</Popup>
          </Marker>
          {hospitals.map((h, i) => {
            const lat = h.lat || h.center?.lat;
            const lon = h.lon || h.center?.lon;
            return (
              <Marker key={i} position={[lat, lon]} icon={hospitalIcon}>
                <Popup>
                  🏥 {h.tags?.name || 'Unnamed Hospital'}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <p>📡 তোমার লোকেশন নিচ্ছি... একটু অপেক্ষা করো</p>
      )}
    </div>
  );
};

export default NearHospitals;
