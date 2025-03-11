import React from 'react';
import { View, Text, Button } from 'react-native';
import { getBikes } from '../services/bike';
const TestScreen = () => {
  return (
    <View> 
      <Button title="Obtener Usuarios" onPress={getBikes} />
    </View>
  );
};

export default TestScreen;
