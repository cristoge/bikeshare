import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const comingSoon = () => {
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [buttonText, setButtonText] = useState('NOTIFY ME');
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const intervalRef = useRef<NodeJS.Timeout>();

  
  const calculateTimeLeft = () => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14); 
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft('Launching soon!');
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    
    calculateTimeLeft();
    intervalRef.current = setInterval(calculateTimeLeft, 1000);

    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fadeAnim]);

  const handlePress = () => {
    setButtonText('THANKS!');
    setTimeout(() => setButtonText('NOTIFY ME'), 2000);
  };

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Image 
          source={require('../assets/icon.png')}
          style={styles.image}
        />
        <Text style={styles.title}>COMING SOON</Text>
        <Text style={styles.countdown}>{timeLeft}</Text>
        <Text style={styles.subtitle}>We're working on something amazing!</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C3E50',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 10,
  },
  countdown: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E74C3C',
    marginVertical: 15,
    letterSpacing: 1,
    fontVariant: ['tabular-nums'],
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default comingSoon;