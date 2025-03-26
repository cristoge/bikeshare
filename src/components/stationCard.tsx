import { View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface StationCardProps {
  name: string;
  latitude: number;
  longitude: number;
  distance: string;
}

export default function StationCard({ name, latitude, longitude, distance }: StationCardProps) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.9,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={true}
          zoomEnabled={true}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.stationName}>{name}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  mapContainer: {
    height: 120,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343A40',
  },
  distance: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
});