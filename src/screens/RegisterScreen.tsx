import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { createUser} from '../services/user';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    
    setLoading(true);
    const result = await createUser(email, password);
    setLoading(false);

    if (result) {
      Alert.alert('Registro exitoso', `Bienvenido ${name}`);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'No se pudo crear la cuenta. Verificá los datos e intentá de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>
        Completá los datos para registrarte y empezar a usar la app.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Registrarse'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.loginLink}>¿Ya tenés cuenta? Iniciá sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#10B88A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#10B88A',
    marginTop: 20,
    fontSize: 14,
  },
});

export default RegisterScreen;
