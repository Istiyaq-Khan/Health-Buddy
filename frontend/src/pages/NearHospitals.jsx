import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import hospitalImg from '../assets/image.png'; 
import userImg from '../assets/red-location-icon-1.png';
import 'leaflet/dist/leaflet.css';
import { MapPin, RefreshCw, Navigation, Building2, Phone, AlertCircle } from 'lucide-react';

// Custom icons
const hospitalIcon = new L.Icon({
  iconUrl: hospitalImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const userIcon = new L.Icon({
  iconUrl: userImg,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
});

const NearHospitals = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getUserLocation = () => {
    setLoading(true);
    setErrorMsg("");
    if (!navigator.geolocation) {
      setErrorMsg("আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(coords);
        fetchHospitals(coords.lat, coords.lon);
      },
      (err) => {
        console.error('Error getting location:', err);
        setErrorMsg("লোকেশন নেওয়ার অনুমতি দিন বা আবার চেষ্টা করুন।");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    getUserLocation();
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
        { headers: { 'Content-Type': 'text/plain' } }
      );
      const results = response.data.elements || [];
      setHospitals(results);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 font-display bg-dark text-white py-4">
      <div className="container-fluid px-3 px-lg-5">
        
        {/* Top Bar Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--color-rule)' }}>
          <div>
            <h2 className="display-6 fw-bold text-white mb-1 d-flex align-items-center gap-2">
              <MapPin className="text-emerald-400" style={{ color: '#10b981' }} />
              আশেপাশের হাসপাতাল (Nearby Hospitals)
            </h2>
            <p className="text-muted small mb-0">
              ১৫ কিলোমিটার ব্যাসার্ধের সকল হাসপাতাল ও ডায়াগনস্টিক সেন্টার
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="badge-emerald font-mono">
              <Building2 size={14} /> {hospitals.length} টি হাসপাতাল
            </span>

            {location && (
              <button 
                className="btn btn-glass btn-sm rounded-pill font-display d-flex align-items-center gap-2"
                onClick={() => fetchHospitals(location.lat, location.lon)}
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span>রিফ্রেশ</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="alert border-0 rounded-xl mb-4 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Workspace (Map + List) */}
        {location ? (
          <div className="row g-4">
            
            {/* Interactive Map */}
            <div className="col-12 col-lg-8">
              <div className="glass-panel overflow-hidden border-0 box-glow" style={{ height: '75vh', borderRadius: 'var(--radius-lg)' }}>
                <MapContainer
                  center={[location.lat, location.lon]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.lat, location.lon]} icon={userIcon}>
                    <Popup>
                      <div className="text-success fw-bold font-display">
                        📍 আপনার বর্তমান অবস্থান
                      </div>
                    </Popup>
                  </Marker>
                  {hospitals.map((h, i) => {
                    const lat = h.lat || h.center?.lat;
                    const lon = h.lon || h.center?.lon;
                    if (!lat || !lon) return null;
                    const name = h.tags?.name || h.tags?.['name:bn'] || 'Unnamed Hospital';
                    return (
                      <Marker key={i} position={[lat, lon]} icon={hospitalIcon}>
                        <Popup>
                          <div className="font-display">
                            <strong className="text-success">🏥 {name}</strong>
                            {h.tags?.phone && <div className="small text-muted">📞 {h.tags.phone}</div>}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            {/* Hospital Directory Cards */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel p-3 h-100 d-flex flex-column" style={{ height: '75vh', overflow: 'hidden' }}>
                <h6 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                  <Navigation size={18} className="text-emerald-400" style={{ color: '#10b981' }} />
                  নিকটস্থ হাসপাতাল তালিকা ({hospitals.length})
                </h6>

                <div className="flex-grow-1 overflow-auto pe-1 d-flex flex-column gap-2">
                  {hospitals.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                      <Building2 size={32} className="mb-2 opacity-40" />
                      <p className="small mb-0">১৫ কিমির মধ্যে কোন হাসপাতাল ডাটা পাওয়া যায়নি।</p>
                    </div>
                  ) : (
                    hospitals.map((h, i) => {
                      const name = h.tags?.name || h.tags?.['name:bn'] || 'নামবিহীন হাসপাতাল';
                      return (
                        <div key={i} className="glass-card p-3 border-0 transition-all">
                          <div className="d-flex align-items-start gap-2">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                              <Building2 size={18} />
                            </div>
                            <div className="flex-grow-1 min-w-0">
                              <h6 className="fw-semibold text-white mb-1 text-truncate" style={{ fontSize: '0.9rem' }}>
                                {name}
                              </h6>
                              {h.tags?.['addr:street'] && (
                                <p className="small text-muted mb-1 text-truncate" style={{ fontSize: '0.78rem' }}>
                                  📍 {h.tags['addr:street']}
                                </p>
                              )}
                              {h.tags?.phone && (
                                <p className="small text-emerald-400 mb-0 d-flex align-items-center gap-1" style={{ color: '#34d399', fontSize: '0.78rem' }}>
                                  <Phone size={12} /> {h.tags.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="glass-panel p-5 text-center my-5 mx-auto box-glow" style={{ maxWidth: '450px' }}>
            <div className="spinner-border text-emerald mb-3" style={{ color: '#10b981' }} role="status"></div>
            <h5 className="fw-bold text-white mb-1">📡 আপনার লোকেশন ডিটেক্ট করা হচ্ছে...</h5>
            <p className="text-muted small mb-0">অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NearHospitals;
