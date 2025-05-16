import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserRents } from '../services/rent';
import useUserStore from '../stores/userStore';
import TripItem from './TripItem';
export const RecentTrips = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchUserRents = async () => {
      try {
        const data = await getUserRents(user.id);
        setTrips(data);
      } catch (error) {
        setError('Error al obtener los viajes');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRents();
  }, [user.id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Trips</Text>
        <Ionicons name="chevron-down" size={24} color="#0FB88A" />
      </View>

      <FlatList
        data={trips}
        renderItem={({ item, index }) => (
          <TripItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  listContent: {
    paddingBottom: 16,
  },
});
