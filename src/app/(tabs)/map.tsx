import React from "react";
import { View } from "react-native";
import MapScreen from "@/src/screens/MapScreen"; // Asegúrate de que la ruta es correcta

const MapTs = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapScreen />
    </View>
  );
};

export default MapTs;