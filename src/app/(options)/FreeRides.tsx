import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const FreeRides = () => {
  const [tripsAvailable, setTripsAvailable] = useState(0);

  // Función para manejar el clic del botón
  const handleGetFreeTrips = () => {
    setTripsAvailable(5);  // Al hacer clic, se asignan 5 viajes gratuitos
    Alert.alert('¡Éxito!', '¡Has obtenido 5 viajes gratis!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Uber_logo_2018.png' }} // Puedes reemplazar con el logo que prefieras
          style={styles.logo}
        />
        <Text style={styles.title}>¡Obtén 5 viajes gratis!</Text>
        <Text style={styles.description}>20% cashback en todos los viajes al usar tu tarjeta de crédito Standard Chartered.</Text>
        
        <Text style={styles.couponCode}>Código de cupón: STANDARD 20</Text>

        <TouchableOpacity style={styles.button} onPress={handleGetFreeTrips}>
          <Text style={styles.buttonText}>Canjear ahora</Text>
        </TouchableOpacity>

        {tripsAvailable > 0 && (
          <Text style={styles.successMessage}>Tienes {tripsAvailable} viajes gratis disponibles.</Text>
        )}
        
        <Text style={styles.validity}>Válido hasta el 30 de enero 2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fb88a', // Fondo verde brillante
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,  // Sombra para darle el efecto de tarjeta
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 15,
    textAlign: 'center',
  },
  couponCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 15,
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
  },
  validity: {
    fontSize: 12,
    color: '#495057',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default FreeRides;
