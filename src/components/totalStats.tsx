import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { getTotalRentsByUser } from '../services/rent';
import useUserStore from '../stores/userStore';

export const UserStats = () => {
  const [totalRents, setTotalRents] = useState<number>(0);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    const fetchTotalRents = async () => {
      try {
        const total = await getTotalRentsByUser(user.id);
        setTotalRents(total);
      } catch (error) {
        console.error('Error fetching total rents:', error);
      }
    };
    fetchTotalRents();
  }, [user]);

  const estimatedCO2Saved = (totalRents * 0.63).toFixed(2);

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <View style={styles.statIcon}>
          <Ionicons name="bicycle-outline" size={24} color="#2ecc71" />
        </View>
        <Text style={styles.statValue}>{totalRents}</Text>
        <Text style={styles.statLabel}>Total Rides</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <View style={styles.statIcon}>
          <MaterialCommunityIcons name="leaf" size={24} color="#27ae60" />
        </View>
        <Text style={styles.statValue}>{estimatedCO2Saved}kg</Text>
        <Text style={styles.statLabel}>CO₂ Saved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fff4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
});
