import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BRANCHES } from '../data/barbershopData';
import { Branch } from '../types/barbershop';
import { Language } from '../i18n/types';

interface BishkekGoogleMapProps {
  activeBranchId: 'erkindik' | 'tokombaeva';
  onSelectBranch: (branchId: 'erkindik' | 'tokombaeva') => void;
  language: Language;
}

export const BishkekGoogleMap: React.FC<BishkekGoogleMapProps> = ({
  activeBranchId,
  onSelectBranch,
  language,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [activeBranch.lat, activeBranch.lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false,
      });

      // High quality dark luxury cartography tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers for branches
      BRANCHES.forEach((branch) => {
        const isSelected = branch.id === activeBranchId;
        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="
              width: 38px;
              height: 38px;
              border-radius: 50%;
              background: ${isSelected ? '#d4ab53' : '#14171d'};
              color: ${isSelected ? '#0d0f12' : '#d4ab53'};
              border: 2px solid #d4ab53;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 14px rgba(0,0,0,0.5);
              cursor: pointer;
              font-family: sans-serif;
              font-weight: bold;
              transition: all 0.2s ease;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([branch.lat, branch.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          onSelectBranch(branch.id);
        });

        // Popup content with direct Google Maps route link
        const popupContent = document.createElement('div');
        popupContent.className = 'orden-map-popup';
        popupContent.innerHTML = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; color: #14171d; min-width: 200px;">
            <div style="font-size: 10px; font-weight: 700; color: #a77524; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">
              ORDEN Barbershop
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #111827; margin-bottom: 4px;">
              ${branch.name}
            </div>
            <div style="font-size: 11px; color: #4b5563; line-height: 1.3; margin-bottom: 8px;">
              ${branch.address}<br>
              <span style="color: #6b7280; font-size: 10px;">${branch.landmark}</span>
            </div>
            <div style="padding-top: 6px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
              <a href="${branch.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color: #a77524; font-weight: 700; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px;">
                Маршрут в Google Maps ↗
              </a>
              <a href="tel:${branch.phone.replace(/[^+\d]/g, '')}" style="color: #374151; font-size: 11px; font-weight: 600; text-decoration: none;">
                ${branch.phone}
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        markersRef.current[branch.id] = marker;
      });
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  // Update center and markers when active branch changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([activeBranch.lat, activeBranch.lng], 15, {
      duration: 1.2,
    });

    // Update marker styling and open popup
    BRANCHES.forEach((branch) => {
      const marker = markersRef.current[branch.id];
      if (!marker) return;

      const isSelected = branch.id === activeBranchId;
      const updatedIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${isSelected ? '44px' : '36px'};
            height: ${isSelected ? '44px' : '36px'};
            border-radius: 50%;
            background: ${isSelected ? '#d4ab53' : '#14171d'};
            color: ${isSelected ? '#0d0f12' : '#d4ab53'};
            border: 2px solid #d4ab53;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0,0,0,0.6);
            cursor: pointer;
            transition: all 0.25s ease;
          ">
            <svg width="${isSelected ? '24' : '18'}" height="${isSelected ? '24' : '18'}" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
          </div>
        `,
        iconSize: isSelected ? [44, 44] : [36, 36],
        iconAnchor: isSelected ? [22, 44] : [18, 36],
        popupAnchor: [0, -38],
      });

      marker.setIcon(updatedIcon);

      if (isSelected) {
        marker.openPopup();
      }
    });
  }, [activeBranchId, activeBranch]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-neutral-800 bg-[#0d0f12] shadow-xl">
      {/* Real Interactive Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Active Branch Chip */}
      <div className="absolute top-3 left-3 z-10 bg-[#0d0f12]/92 backdrop-blur-md border border-neutral-800 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-3 max-w-[280px]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#d4ab53] shrink-0 animate-pulse" />
        <div className="min-w-0">
          <div className="text-xs font-bold text-neutral-100 font-['Cinzel'] truncate">
            {activeBranch.shortName}
          </div>
          <div className="text-[10px] text-neutral-400 truncate">
            {activeBranch.address}
          </div>
        </div>
      </div>

      {/* Quick Google Maps Route button overlay */}
      <div className="absolute bottom-3 right-3 z-10">
        <a
          href={activeBranch.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#d4ab53] hover:bg-[#c69431] text-[#0d0f12] text-xs font-bold rounded-lg shadow-lg shadow-black/40 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Маршрут в Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
