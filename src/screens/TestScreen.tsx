import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getRouteByRentId } from '@/src/services/test';
import { getLocationDetailsById } from '@/src/services/test'; 
import { calculateDistance } from '@/src/services/test'; 
import MapView, { Marker, Polyline } from 'react-native-maps';

const TripDetail = () => {
  const {
    id,
    bike_id,
    user_id,
    status,
    start_date,
    end_date,
  } = useLocalSearchParams();

  const [routeData, setRouteData] = useState<any>(null);
  const [startLocation, setStartLocation] = useState<string | null>(null);
  const [endLocation, setEndLocation] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [startCoords, setStartCoords] = useState<any>(null);
  const [endCoords, setEndCoords] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      if (typeof id === 'string') {
        const route = await getRouteByRentId(id);
        setRouteData(route);

        if (route) {
          const startLocDetails = await getLocationDetailsById(route.start_location_id);
          const endLocDetails = await getLocationDetailsById(route.final_location_id);

          setStartLocation(startLocDetails?.name || 'Desconocida');
          setEndLocation(endLocDetails?.name || 'Desconocida');

          if (startLocDetails && endLocDetails) {
            const distance = calculateDistance(
              startLocDetails.latitude,
              startLocDetails.longitude,
              endLocDetails.latitude,
              endLocDetails.longitude
            );
            setDistance(distance);

            // Establecemos las coordenadas para el mapa
            setStartCoords({
              latitude: startLocDetails.latitude,
              longitude: startLocDetails.longitude,
            });
            setEndCoords({
              latitude: endLocDetails.latitude,
              longitude: endLocDetails.longitude,
            });
          }
        }
      }
      setLoading(false);
    };

    fetchRoute();
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Trip ID: {id}</Text>
      <Text>Bike ID: {bike_id}</Text>
      <Text>User ID: {user_id}</Text>
      <Text>Status: {status}</Text>
      <Text>Start Date: {start_date}</Text>
      <Text>End Date: {end_date}</Text>

      {loading ? (
        <ActivityIndicator />
      ) : routeData ? (
        <>
          <Text style={{ marginTop: 20 }}>📍 Ruta encontrada:</Text>
          <Text>Inicio: {startLocation}</Text>
          <Text>Fin: {endLocation}</Text>
          <Text style={{ marginTop: 20 }}>Distancia recorrida: {distance?.toFixed(2)} km</Text>

          {/* Mapa de Google */}
          <MapView
            style={{ flex: 1, marginTop: 20 }}
            initialRegion={{
              latitude: startCoords?.latitude || 0,
              longitude: startCoords?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Marcadores de las ubicaciones */}
            <Marker coordinate={startCoords} title="Inicio" />
            <Marker coordinate={endCoords} title="Fin" />

            {/* Ruta entre las ubicaciones */}
            {startCoords && endCoords && (
              <Polyline
                coordinates={[startCoords, endCoords]}
                strokeColor="#0000FF"
                strokeWidth={3}
              />
            )}
          </MapView>
        </>
      ) : (
        <Text>No se encontró una ruta para este viaje.</Text>
      )}
    </View>
  );
};

export default TripDetail;
