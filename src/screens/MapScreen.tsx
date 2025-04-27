import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Button
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getBikes } from '@/src/services/bike';
import { getLocation } from '@/src/services/location';

const bikeIcons = {
  Normal: require('@/src/assets/images/bike.png'),
  Electric: require('@/src/assets/images/electric-bike.png'),
  Tandem: require('@/src/assets/images/tandem.png'),
};

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
  const [selectedBikeType, setSelectedBikeType] = useState<'normal' | 'electric' | 'tandem' | null>(null);

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

  const handleSelectBikeType = (type: 'normal' | 'electric' | 'tandem') => {
    const bikeCounts = countBikesByTypeAtLocation(selectedLocation?.id || '');
    if (bikeCounts[type] > 0) {
      setSelectedBikeType(type);
    }
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
              setSelectedBikeType(null);
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
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  <Text style={styles.stationName}>{selectedLocation.location_name}</Text>
                  {(() => {
                    const bikeCounts = countBikesByTypeAtLocation(selectedLocation.id);
                    return (
                      <View style={styles.bikeOptionsColumn}>
                        {(['normal', 'electric', 'tandem'] as const).map((type) => {
                          const label = type.charAt(0).toUpperCase() + type.slice(1);
                          const isSelected = selectedBikeType === type;
                          const isAvailable = bikeCounts[type] > 0;
                          return (
                            <TouchableOpacity
                              key={type}
                              style={[
                                styles.bikeOptionRow,
                                !isAvailable && styles.disabledOption
                              ]}
                              onPress={() => handleSelectBikeType(type)}
                              disabled={!isAvailable}
                            >
                              <View style={styles.bikeInfo}>
                                <Image
                                  source={bikeIcons[label as keyof typeof bikeIcons]}
                                  style={[
                                    styles.bikeIcon,
                                    !isAvailable && styles.disabledIcon
                                  ]}
                                />
                                <Text style={[
                                  styles.bikeLabel,
                                  !isAvailable && styles.disabledText
                                ]}>
                                  {label}: {bikeCounts[type]}
                                </Text>
                              </View>
                              {isAvailable && (
                                <View
                                  style={[
                                    styles.radioButton,
                                    isSelected ? styles.selectedRadioButton : styles.unselectedRadioButton,
                                  ]}
                                >
                                  {isSelected && <View style={styles.innerCircle} />}
                                </View>
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  })()}
                  <Button 
                    title="Continue" 
                    onPress={() => {}} 
                    disabled={!selectedBikeType} 
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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
    marginBottom: 15,
    textAlign: 'center',
  },
  bikeOptionsColumn: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  bikeOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  bikeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeLabel: {
    fontSize: 17,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  bikeIcon: {
    width: 40,
    height: 40,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unselectedRadioButton: {
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedRadioButton: {
    borderColor: '#0FB88A',
    backgroundColor: '#F0FFF4',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0FB88A',
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapScreen;