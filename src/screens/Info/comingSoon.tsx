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
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image 
        source={require('../assets/coming-soon.png')}
        style={styles.image}
      />
      <Text style={styles.title}>COMING SOON</Text>
      <Text style={styles.subtitle}>We're working on something amazing!</Text>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C3E50',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});

export default comingSoon;