import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const comingSoon = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Image 
          source={require('../assets/icon.png')}
          style={styles.image}
        />
        <Text style={styles.title}>COMING SOON</Text>
        <Text style={styles.subtitle}>We're working on something amazing!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA', // Fondo más suave
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400, // Máximo ancho para tablets
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Para Android
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C3E50',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24, // Mejor legibilidad
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20, // Espaciado más equilibrado
  },
});

export default comingSoon;