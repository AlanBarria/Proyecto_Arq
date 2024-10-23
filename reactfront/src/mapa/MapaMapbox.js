import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsbHlmdXUiLCJhIjoiY20ybGRua3h1MGF6MTJqb285MThrcnhyMyJ9.u_9eCXSGqIvNWBXEzxmdbg'; // Asegúrate de usar tu token de acceso

const MapView = () => {
  const mapDiv = useRef(null);
  const [userLocation, setUserLocation] = useState([0, 0]);

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (mapDiv.current && userLocation[0] !== 0 && userLocation[1] !== 0) {
      const map = new mapboxgl.Map({
        container: mapDiv.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });

      // Crear un marcador en la ubicación del usuario
      const marker = new mapboxgl.Marker()
        .setLngLat(userLocation)
        .addTo(map);

      // Opcional: Centrar el mapa en el marcador
      map.flyTo({
        center: userLocation,
        essential: true // Esto asegura que la animación se realice
      });
    }
  }, [userLocation]);

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: 'orange',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {userLocation ? `Lat: ${userLocation[1]}, Lng: ${userLocation[0]}` : 'Cargando...'}
    </div>
  );
};

export default MapView;