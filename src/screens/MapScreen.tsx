import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
            latitude: 41.3851,
            longitude: 2.1734,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
