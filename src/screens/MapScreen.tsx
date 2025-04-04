import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getBikes } from '@/src/services/bike';
import { getLocation } from '@/src/services/location';

interface Bike {
  id: string;
  current_location_id: string;
  status: 'available' | 'unavailable' | 'in_use';
  location: Location;
  model: 'tandem' | 'normal' | 'electric';
}

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  location_name: string;
}

const MapScreen = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const initialRegion = {
    latitude: 41.3851,
    longitude: 2.1734,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    const loadBikesAndLocations = async () => {
      try {
        setLoading(true);
        const bikeData = await getBikes();
        setBikes(bikeData || []);
        const locationData = await getLocation();
        setLocations(locationData || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBikesAndLocations();
  }, []);
  
  const countBikesByTypeAtLocation = (locationId: string) => {
    const bikeTypes = { tandem: 0, normal: 0, electric: 0 };
    bikes.forEach((bike) => {
      if (bike.current_location_id === locationId && bike.status === 'available') {
        bikeTypes[bike.model]++;
      }
    });
    return bikeTypes;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => {
              setSelectedLocation(location);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      {selectedLocation && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.stationName}>{selectedLocation.location_name}</Text>
              {(() => {
                const bikeCounts = countBikesByTypeAtLocation(selectedLocation.id);
                return (
                  <>
                    <Text style={styles.bikeCount}>Tandem: {bikeCounts.tandem}</Text>
                    <Text style={styles.bikeCount}>Normal: {bikeCounts.normal}</Text>
                    <Text style={styles.bikeCount}>Eléctrica: {bikeCounts.electric}</Text>
                  </>
                );
              })()}
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  bikeCount: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MapScreen;
