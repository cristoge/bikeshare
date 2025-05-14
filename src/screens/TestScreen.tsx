import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getRouteByRentId } from '@/src/services/test';  
import { getLocationNameById } from '@/src/services/test'; 

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      if (typeof id === 'string') {
        const route = await getRouteByRentId(id);
        setRouteData(route);

        if (route) {
          const startLocName = await getLocationNameById(route.start_location_id);
          const endLocName = await getLocationNameById(route.final_location_id);
          setStartLocation(startLocName);
          setEndLocation(endLocName);
        }
      }
      setLoading(false);
    };

    fetchRoute();
  }, [id]);

  return (
    <View style={{ padding: 20 }}>
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
          <Text>Inicio: {startLocation || 'Cargando...'}</Text>
          <Text>Fin: {endLocation || 'Cargando...'}</Text>
        </>
      ) : (
        <Text>No se encontró una ruta para este viaje.</Text>
      )}
    </View>
  );
};

export default TripDetail;
