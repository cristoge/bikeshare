import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const comingSoon = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [buttonText, setButtonText] = useState('NOTIFY ME');
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const intervalRef = useRef<NodeJS.Timeout>();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const calculateTimeLeft = () => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft('Launching now!');
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
          source={require('../--/assets/images/icon.png')}
          style={styles.image}
        />
        <Animated.Text 
          style={[
            styles.title, 
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          COMING SOON
        </Animated.Text>
        <Text style={styles.countdown}>{timeLeft}</Text>
        <Text style={styles.subtitle}>We're building an exceptional experience for you</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.footer}>© {new Date().getFullYear()} All Rights Reserved</Text>
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
    textAlign: 'center',
  },
  countdown: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E74C3C',
    marginVertical: 15,
    letterSpacing: 1,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#10B88A', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 25,
    shadowColor: '#10B88A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#95A5A6',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default comingSoon;