import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getBikes } from '@/src/services/bike';

const MapScreen = () => {
  
  const [allBikes, setAllBikes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const initialRegion = {
    latitude: 41.3851,  
    longitude: 2.1734,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const bikesData = await getBikes();
        if (bikesData) setAllBikes(bikesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  
  const getUniqueLocations = () => {
    const locationsMap = {};
    allBikes.forEach(bike => {
      if (bike.location) {
        const locKey = `${bike.location.latitude}-${bike.location.longitude}`;
        if (!locationsMap[locKey]) {
          locationsMap[locKey] = bike.location;
        }
      }
    });
    return Object.values(locationsMap);
  };

  const getBikesAtLocation = (location) => {
    return allBikes.filter(bike => 
      bike.location?.latitude === location.latitude &&
      bike.location?.longitude === location.longitude &&
      bike.status === 'available'
    );
  };

  const countBikesByType = (bikes) => {
    return {
      normal: bikes.filter(b => b.model?.model_name === 'Normal').length,
      electric: bikes.filter(b => b.model?.model_name === 'Electica').length,
      tandem: bikes.filter(b => b.model?.model_name === 'Tandem').length
    };
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
      {/* Mapa principal */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {getUniqueLocations().map((location, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            onPress={() => {
              setSelectedLocation(location);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      {/* Modal de detalles - VERSIÓN CORREGIDA */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedLocation && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedLocation.location_name}
                </Text>
                <Text style={styles.modalSubtitle}>
                  {selectedLocation.address}
                </Text>
                
                <View style={styles.bikesContainer}>
                  {Object.entries(countBikesByType(getBikesAtLocation(selectedLocation))).map(([type, count]) => (
                    <View key={type} style={styles.bikeRow}>
                      <Text style={styles.bikeType}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}:
                      </Text>
                      <Text style={styles.bikeCount}>{count}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  bikesContainer: {
    marginVertical: 10,
  },
  bikeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bikeType: {
    fontSize: 16,
  },
  bikeCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;