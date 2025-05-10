import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserRents } from '../services/rent';
import useUserStore from '../stores/userStore';

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

  const renderTrip = ({ item }: any) => (
    <View style={styles.tripCard}>
      <Ionicons name="bicycle-outline" size={24} color="#0FB88A" style={{ marginBottom: 8 }} />
      <Text style={styles.date}>{formatDate(item.start_date)}</Text>
      <Text style={styles.time}>
        {formatTime(item.start_date)} - {formatTime(item.end_date)}
      </Text>
    </View>
  );

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
        <Text style={styles.title}>Viajes Recientes</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>

      <FlatList
        data={trips}
        renderItem={renderTrip}
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
