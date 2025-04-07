import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import useUserStore from '../stores/userStore'; // Asegúrate de tener la importación correcta

const API_KEY = 'd6eed58cf552ee0bcc8d9c5d68d24bdf'; // Reemplaza con tu clave de OpenWeatherMap

export default function WelcomeScreen() {
  // Obtén el usuario desde el store
  const user = useUserStore((state) => state.user);
  // Usa el nombre si existe, o "Usuario" como fallback
  const userName = user?.name || "Usuario";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    location: "Desconocido",
    temperature: 0,
    condition: "Cargando...",
  });

  useEffect(() => {
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
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`);
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
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.nameText}>{userName}!</Text>
      </View>

      {/* Motivational Quote */}

      <View style={styles.card}>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#FF6B6B" />
            <Text style={[styles.locationText, { fontWeight: 'bold' }]}>{weatherData.location}</Text>
        </View>
      
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        
        <View style={styles.weatherContainer}>
          <View style={styles.weatherInfo}>
            <MaterialCommunityIcons name="weather-cloudy" size={48} color="#FFB100" />
            <Text style={[styles.conditionText, { fontWeight: 'bold' }]}>{weatherData.condition}</Text>
          </View>
          <Text style={styles.temperatureText}>{weatherData.temperature}°C</Text>
        </View>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "La movilidad sostenible comienza con un solo paso."
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 28,
    color: '#343A40',
    fontWeight: '300',
  },
  nameText: {
    fontSize: 32,
    color: '#343A40',
    fontWeight: '700',
  },
  quoteContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  quoteText: {
    fontSize: 18,
    color: '#495057',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 18,
    color: '#495057',
    marginLeft: 8,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  conditionText: {
    fontSize: 16,
    color: '#495057',
    marginTop: 8,
  },
  temperatureText: {
    fontSize: 48,
    color: '#343A40',
    fontWeight: '600',
  },
});
