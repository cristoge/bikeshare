import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockTrips = [
  {
    id: '1',
    date: '24 Mar',
    from: 'Casa',
    to: 'Oficina',
    price: '€8.50',
  },
  {
    id: '2',
    date: '23 Mar',
    from: 'Oficina',
    to: 'Supermercado',
    price: '€12.30',
  },
  {
    id: '3',
    date: '22 Mar',
    from: 'Gimnasio',
    to: 'Casa',
    price: '€7.80',
  },
];

export const RecentTrips = () => {
  const renderTrip = ({ item }: any) => (
    <View style={styles.tripItem}>
      <View style={styles.tripDate}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <View style={styles.tripDetails}>
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <View style={styles.dot} />
            <Text style={styles.locationText}>{item.from}</Text>
          </View>
          <View style={styles.locationLine} />
          <View style={styles.locationItem}>
            <View style={[styles.dot, styles.dotDestination]} />
            <Text style={styles.locationText}>{item.to}</Text>
          </View>
        </View>
        
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Viajes Recientes</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
      
      <FlatList
        data={mockTrips}
        renderItem={renderTrip}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tripItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tripDate: {
    width: 50,
    marginRight: 15,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  tripDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ecc71',
    marginRight: 8,
  },
  dotDestination: {
    backgroundColor: '#e74c3c',
  },
  locationLine: {
    width: 2,
    height: 15,
    backgroundColor: '#ddd',
    marginLeft: 3,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 15,
  },
});