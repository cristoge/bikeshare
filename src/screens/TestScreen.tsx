import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export function LoginScreen() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere permiso de localización para esta función');
        return;
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      console.log(loc);
    } catch (error) {
      console.log('Error al obtener la localización', error);
    }
  };

  return (
    <View>
      <Button title="Obtener localización" onPress={getLocation} />
      {location && (
        <Text>
          Latitud: {location.coords.latitude}, Longitud: {location.coords.longitude}
        </Text>
      )}
    </View>
  );
}


export default LoginScreen;
