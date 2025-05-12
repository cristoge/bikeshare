import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const commingSoon = () => {
  return (
  <View style={styles.container}>
    <Image 
      source={require('../assets/icon.png')} 
      style={styles.image}
    />
    <Text style={styles.text}>Coming Soon</Text>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
  width: 200,
  height: 200,
  marginBottom: 30,
}
});

export default commingSoon;