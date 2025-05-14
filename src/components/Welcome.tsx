import { View, Text, StyleSheet, TouchableOpacity, Alert, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import useUserStore from '../stores/userStore';
import { userRents, userLastRent } from '../services/user';
import { endRent } from '../services/rent';
import ImageList from './Auth/ImageList';
import SafetyTips from './Auth/safetyTips';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER || '';

const tips = [
  "Using a bike instead of a car helps reduce CO₂ emissions.",
  "Cycling improves your physical and mental health.",
  "A bike takes up 10 times less space than a car.",
  "A bike is quiet and doesn't pollute 🚲",
  "Each kilometer on a bike saves you money and emissions.",
  "Riding a bike is an eco-friendly way to travel.",
  "Cycling regularly can help reduce stress and anxiety.",
  "A bike is a great way to explore your city in a sustainable way.",
  "Every pedal counts towards a cleaner, greener planet 🌍",
  "Biking helps you stay active while commuting.",
  "Choose a bike and enjoy the freedom of the open road.",
  "With a bike, you're not just saving money, you're saving the environment.",
  "Cycling is a great low-impact exercise for all ages.",
  "Pedal your way to a healthier lifestyle and a cleaner world.",
  "Switching to cycling reduces traffic congestion and pollution.",
  "Biking is a fun way to stay fit while reducing your carbon footprint.",
  "By biking, you contribute to cleaner air and less noise pollution.",
  "Bicycles use less energy than any other mode of transport.",
  "A bike ride can boost your mood and help you feel more energized.",
  "Cycling can help you avoid traffic jams and save time.",
  "Every time you choose a bike, you make a positive impact on the environment.",
  "Bikes are a sustainable alternative to driving for short trips.",
  "Riding a bike is an efficient way to stay healthy and get around.",
  "Cycling helps improve cardiovascular health and strengthens muscles.",
  "Biking is not just for commuting—it's a fun activity to enjoy with friends or family."
];

export default function WelcomeScreen() {
  const user = useUserStore((state) => state.user);
  const userName = user?.name || "User";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    location: "Unknown",
    temperature: 0,
    condition: "Loading...",
  });
  const [ecoTip, setEcoTip] = useState("");
  const [userRentData, setUserRentData] = useState<any[] | null>(null);
  const [lastRent, setLastRent] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setEcoTip(tips[Math.floor(Math.random() * tips.length)]);
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setWeatherData(prev => ({ ...prev, location: "Permission denied" }));
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchUserRents = useCallback(async () => {
    if (!user || !user.id) return;
    try {
      const data = await userRents(user.id);
      setUserRentData(data);
    } catch (error) {
      console.error("Error fetching user rents:", error);
    }
  }, [user]);

  const fetchLastRent = useCallback(async () => {
    if (!user || !user.id) return;
    try {
      const data = await userLastRent(user.id);
      setLastRent(data);
    } catch (error) {
      console.error("Error fetching last rent:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUserRents();
    fetchLastRent();
  }, [fetchUserRents, fetchLastRent]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUserRents();
      await fetchLastRent();
      setEcoTip(tips[Math.floor(Math.random() * tips.length)]);
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData({
        location: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleEndRent = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const rent = userRentData?.[0];

      if (!rent) {
        Alert.alert("No active rent found");
        return;
      }

      await endRent(rent.id, rent.bike_id);
      Alert.alert("Rent ended successfully");

      const updatedRents = await userRents(user.id);
      setUserRentData(updatedRents);

      const latest = await userLastRent(user.id);
      setLastRent(latest);
    } catch (error) {
      console.error("Error ending rent:", error);
      Alert.alert("Failed to end rent");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text style={styles.helloText}>{getGreeting()},</Text>
          <Text style={styles.nameText}>{userName} 👋</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker-radius" size={24} color="#007BFF" />
            <Text style={styles.locationText}>{weatherData.location}</Text>
          </View>

          <Text style={styles.dateText}>{formatDate(currentDate)}</Text>

          <View style={styles.weatherContainer}>
            <MaterialCommunityIcons name="weather-partly-cloudy" size={48} color="#FFA500" />
            <View>
              <Text style={styles.temperatureText}>{weatherData.temperature}°C</Text>
              <Text style={styles.conditionText}>{weatherData.condition}</Text>
            </View>
          </View>
        </View>

        {userRentData && userRentData.length > 0 && (
          <View style={styles.rentCard}>
            <Text style={styles.statusTitle}>🚴‍♂️ Active rental</Text>
            <Text style={styles.statusItem}>📅 Start: {new Date(userRentData[0].start_date).toLocaleString('es-ES')}</Text>
            <Text style={styles.statusItem}>📌 Status: {userRentData[0].status === 'ongoing' ? 'In use' : userRentData[0].status}</Text>

            <TouchableOpacity style={styles.endButton} onPress={handleEndRent}>
              <Text style={styles.endButtonText}>End Ride</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* !userRentData?.length && */}
        { !userRentData?.length && lastRent && (
          <View style={styles.rentCard}>
            <Text style={styles.statusTitle}>🕓 Your Last Trip</Text>
            <Text style={styles.statusItem}>📅 Start: {new Date(lastRent.start_date).toLocaleString('es-ES')}</Text>
            <Text style={styles.statusItem}>🏁 End: {new Date(lastRent.end_date).toLocaleString('es-ES')}</Text>
            <Text style={styles.statusItem}>📌 Status: {lastRent.status}</Text>
          </View>
        )}

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>💡 {ecoTip}</Text>
        </View>

        <Text style={styles.flatlistText}>Explore Our Bike Collection</Text>
        <ImageList />
        <Text style={styles.flatlistText}>Safety Tips</Text>
        <SafetyTips />
        <View />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#F4F6F8',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  helloText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 6,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperatureText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
  },
  conditionText: {
    fontSize: 16,
    color: '#666',
  },
  rentCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
  },
  statusItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  endButton: {
    marginTop: 16,
    backgroundColor: '#E53935',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quoteContainer: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#00796B',
  },
  flatlistText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#444',
  },
});
