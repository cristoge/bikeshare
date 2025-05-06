import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import useUserStore from '../stores/userStore';
import { userRents } from '../services/user';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER || '';

const tips = [
  "Using a bike instead of a car helps reduce CO₂ emissions.",
  "Cycling improves your physical and mental health.",
  "A bike takes up 10 times less space than a car.",
  "A bike is quiet and doesn't pollute 🚲",
  "Each kilometer on a bike saves you money and emissions.",
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
  const [bikeStats, setBikeStats] = useState({
    available: 3, // hardcoded for now
    reservation: null,
  });

  const [userRentData, setUserRentData] = useState<any[] | null>(null);

  useEffect(() => {
    setEcoTip(tips[Math.floor(Math.random() * tips.length)]);

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

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

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchUserRents = async () => {
      try {
        const data = await userRents(user.id);
        setUserRentData(data);
      } catch (error) {
        console.error("Error fetching user rents:", error);
      }
    };
    fetchUserRents();
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
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

      {/* 🚴 Active Rental */}
      {userRentData && userRentData.length > 0 && (
        <View style={styles.rentCard}>
          <Text style={styles.statusTitle}>🚴‍♂️ Active rental</Text>
          <Text style={styles.statusItem}>📅 Start: {new Date(userRentData[0].start_date).toLocaleString('en-US')}</Text>
          <Text style={styles.statusItem}>📌 Status: {userRentData[0].status === 'ongoing' ? 'In use' : userRentData[0].status}</Text>
        </View>
      )}

      {/* 🌱 Eco Tip */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>💡 {ecoTip}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F3F5',
    padding: 24,
    justifyContent: 'space-between',
  },
  helloText: {
    fontSize: 26,
    color: '#343A40',
    fontWeight: '300',
  },
  nameText: {
    fontSize: 34,
    color: '#343A40',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '600',
    color: '#212529',
  },
  dateText: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 16,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperatureText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#343A40',
  },
  conditionText: {
    fontSize: 16,
    color: '#495057',
    marginTop: 4,
  },
  quoteContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#E9ECEF',
    borderRadius: 16,
  },
  quoteText: {
    fontSize: 16,
    color: '#495057',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  statusItem: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  rentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
});
