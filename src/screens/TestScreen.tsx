import React from 'react';
import { View, Text, Button } from 'react-native';
import { getUsers } from '../services/user';
const TestScreen = () => {
  return (
    <View> 
      <Button title="Obtener Usuarios" onPress={getUsers} />
    </View>
  );
};

export default TestScreen;
