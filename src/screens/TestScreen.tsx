import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import {
  getRouteByRentId,
  getLocationDetailsById,
  calculateDistance,
  getBikeModelById,
} from '@/src/services/test';

const bikeIcons = {
  normal: require('@/src/assets/images/bike.png'),
  electric: require('@/src/assets/images/electric-bike.png'),
  tandem: require('@/src/assets/images/tandem.png'),
};

export default function TripDetail() {
  const { id, bike_id, start_date, end_date } = useLocalSearchParams();
  const [routeData, setRouteData] = useState<any>(null);
  const [startLocation, setStartLocation] = useState<string | null>(null);
  const [endLocation, setEndLocation] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [startCoords, setStartCoords] = useState<any>(null);
  const [endCoords, setEndCoords] = useState<any>(null);
  const [bikeModel, setBikeModel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      if (typeof id === 'string') {
        const route = await getRouteByRentId(id);
        setRouteData(route);

        if (route) {
          const startLocDetails = await getLocationDetailsById(route.start_location_id);
          const endLocDetails = await getLocationDetailsById(route.final_location_id);

          setStartLocation(startLocDetails?.name || 'Unknown');
          setEndLocation(endLocDetails?.name || 'Unknown');

          if (startLocDetails && endLocDetails) {
            const dist = calculateDistance(
              startLocDetails.latitude,
              startLocDetails.longitude,
              endLocDetails.latitude,
              endLocDetails.longitude
            );
            setDistance(dist);

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

        const model = await getBikeModelById(bike_id as string);
        setBikeModel(model);
      }

      setLoading(false);
    };

    fetchRoute();
  }, [id]);

  const getBikeIcon = () => {
    if (!bikeModel) return null;
    return bikeIcons[bikeModel as keyof typeof bikeIcons] || bikeIcons.normal;
  };

  const formatDate = (isoString: string | string[] | undefined) => {
    if (!isoString || typeof isoString !== 'string') return 'Unknown';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trip Details 🚲</Text>
        <Text style={styles.subtitle}>All the information about your ride</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0FB88A" style={{ marginTop: 20 }} />
      ) : (
        <>
          <View style={styles.card}>
            <View style={styles.inlineRow}>
              <Feather name="shopping-bag" size={20} color="#0FB88A" style={{ marginRight: 8 }} />
              <Text style={styles.label}>MODEL:</Text>
              <Text style={styles.label}> {bikeModel || 'Loading...'} </Text>
            </View>

            {bikeModel && (
              <Image source={getBikeIcon()} style={styles.bikeImage} resizeMode="contain" />
            )}

            <View style={styles.inlineRow}>
              <MaterialIcons name="schedule" size={20} color="#0FB88A" style={{ marginRight: 8 }} />
              <Text style={styles.label}>Start Time</Text>
            </View>
            <Text style={styles.value}>{formatDate(start_date)}</Text>

            <View style={styles.inlineRow}>
              <MaterialIcons name="schedule" size={20} color="#0FB88A" style={{ marginRight: 8 }} />
              <Text style={styles.label}>End Time</Text>
            </View>
            <Text style={styles.value}>{formatDate(end_date)}</Text>
          </View>

          {routeData ? (
            <View style={styles.card}>
              <View style={styles.inlineRow}>
                <Feather name="map-pin" size={20} color="#0FB88A" style={{ marginRight: 8 }} />
                <Text style={styles.label}>Route</Text>
              </View>
              <Text style={styles.value}>From: {startLocation}</Text>
              <Text style={styles.value}>To: {endLocation}</Text>

              <View style={styles.inlineRow}>
                <Feather name="map" size={20} color="#0FB88A" style={{ marginRight: 8 }} />
                <Text style={styles.label}>Distance</Text>
              </View>
              <Text style={styles.value}>{distance?.toFixed(2)} km</Text>
            </View>
          ) : (
            <Text style={styles.info}>No route data available.</Text>
          )}

{startCoords && endCoords && (
  <View style={styles.mapContainer}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: (startCoords.latitude + endCoords.latitude) / 2,
        longitude: (startCoords.longitude + endCoords.longitude) / 2,
        latitudeDelta: Math.max(
          Math.abs(startCoords.latitude - endCoords.latitude) * 1.5,
          0.05
        ),
        longitudeDelta: Math.max(
          Math.abs(startCoords.longitude - endCoords.longitude) * 1.5,
          0.05
        ),
      }}
    >
      <Marker coordinate={startCoords} title={startLocation || 'Start'} />
      <Marker coordinate={endCoords} title={endLocation || 'End'} />
      <Polyline
        coordinates={[startCoords, endCoords]}
        strokeColor="#2980b9"
        strokeWidth={4}
      />
    </MapView>
  </View>
)}

        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  label: {
    fontSize: 13,
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#1e1e1e',
    fontWeight: '600',
    marginTop: 8,
  },
  bikeImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    marginVertical: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
    borderColor: '#d1d1d1',
    borderWidth: 1,
  },
  map: {
    flex: 1,
  },
  info: {
    textAlign: 'center',
    fontSize: 16,
    color: '#adb5bd',
    marginVertical: 20,
  },
});
