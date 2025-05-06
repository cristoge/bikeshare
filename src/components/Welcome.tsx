import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import useUserStore from '../stores/userStore';
import { userRents } from '../services/user';
import { Button } from 'react-native';
const API_KEY = process.env.EXPO_PUBLIC_WEATHER || '';

const consejos = [
  "Usar la bici en vez del coche ayuda a reducir el CO₂.",
  "Moverte en bici mejora tu salud física y mental.",
  "Una bici ocupa 10 veces menos espacio que un coche.",
  "Una bici no contamina y es silenciosa 🚲",
  "Cada kilómetro en bici te ahorra dinero y emisiones.",
];

export default function WelcomeScreen() {
  const user = useUserStore((state) => state.user);
  const userName = user?.name || "Usuario";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    location: "Desconocido",
    temperature: 0,
    condition: "Cargando...",
  });

  const [ecoTip, setEcoTip] = useState("");
  const [bikeStats, setBikeStats] = useState({
    available: 3, // hardcodeado por ahora
    reservation: null, // o un objeto con datos reales
  });

  useEffect(() => {
    setEcoTip(consejos[Math.floor(Math.random() * consejos.length)]);

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setWeatherData(prev => ({ ...prev, location: "Permiso denegado" }));
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
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
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };
  const ejemplo = ()=>{
    userRents(user.id)
  }
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

      {/* 🟢 Estado del sistema */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Estado actual</Text>
        <Text style={styles.statusItem}>🚲 Bicis disponibles cerca: {bikeStats.available}</Text>
        <Text style={styles.statusItem}>
          📋 Reserva activa: {bikeStats.reservation ? "Sí" : "No tienes reservas"}
        </Text>
        <Button
          title="Llamar a ejemplo"
          onPress={ejemplo}
          color="#007BFF"
        />
      </View>

      {/* 🌱 Consejo ecológico */}
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
});
