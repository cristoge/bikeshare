import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getBikes } from '@/src/services/bike';

// Iconos (asegúrate de tener estos archivos)
const bikeIcons = {
  Normal: require('@/src/assets/images/bike.png'),
  Electrica: require('@/src/assets/images/electric-bike.png'),
  Tandem: require('@/src/assets/images/tandem.png')
};

const MapScreen = () => {
  const [allBikes, setAllBikes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBikeType, setSelectedBikeType] = useState(null);

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

  // Función actualizada para el nuevo modelo
  const countBikesByType = (bikes) => {
    const counts = {
      Normal: 0,
      Electrica: 0,
      Tandem: 0
    };
    
    bikes.forEach(bike => {
      if (bike.model === 'normal') counts.Normal++;
      if (bike.model === 'electric') counts.Electrica++;
      if (bike.model === 'tandem') counts.Tandem++;
    });
    
    return counts;
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
        {getUniqueLocations().map((location, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            onPress={() => {
              setSelectedLocation(location);
              setSelectedBikeType(null);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

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
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.bikeItem,
                        selectedBikeType === type && styles.selectedBikeItem,
                        count === 0 && styles.disabledBikeItem
                      ]}
                      onPress={() => count > 0 && setSelectedBikeType(type)}
                      disabled={count === 0}
                    >
                      <View style={styles.bikeInfo}>
                        <Image 
                          source={bikeIcons[type]} 
                          style={styles.bikeIcon} 
                        />
                        <Text style={styles.bikeTypeText}>
                          {type}: {count}
                        </Text>
                      </View>
                      {selectedBikeType === type && (
                        <View style={styles.selectionIndicator}>
                          <Text style={styles.checkIcon}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.continueButton,
                  !selectedBikeType && styles.disabledButton
                ]}
                onPress={() => {
                  if (selectedBikeType) {
                    
                    setModalVisible(false);
                  }
                }}
                disabled={!selectedBikeType}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'flex-end', 
  },
  modalContainer: {
    width: '100%', 
    backgroundColor: 'white',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0, 
    alignSelf: 'flex-end',
    paddingBottom: 20, 
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  bikesContainer: {
    marginVertical: 10,
  },
  bikeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  selectedBikeItem: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  disabledBikeItem: {
    opacity: 0.5,
  },
  bikeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeIcon: {
    width: 54,
    height: 54,
    marginRight: 12,
    resizeMode: 'contain',
  },
  bikeTypeText: {
    fontSize: 24,
  },
  selectionIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    color: 'red',
    backgroundColor: 'white',
    borderColor: 'red',
    
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextCancel: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default MapScreen;