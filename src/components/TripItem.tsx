import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  item: any;
  index: number;
}

const TripItem = ({ item, index }: Props) => {
  const animation = useRef(new Animated.Value(0)).current;
  const maxTranslate = 410;
  const duration = 3000 + index * 1000;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: maxTranslate,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const translateX = animation.interpolate({
    inputRange: [0, maxTranslate],
    outputRange: [0, maxTranslate],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.tripCard}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Ionicons name="bicycle-outline" size={24} color="#0FB88A" style={{ marginBottom: 8 }} />
      </Animated.View>
      <Text style={styles.date}>{formatDate(item.start_date)}</Text>
      <Text style={styles.time}>
        {formatTime(item.start_date)} - {formatTime(item.end_date)}
      </Text>
    </View>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
