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
import { login } from '../services/user';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    router.push("/(auth)/register");
  };

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result) {
      Alert.alert('Inicio de sesión exitoso', `Bienvenido ${result.user.email}`);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Log in'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.registerLink}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.registerLink}>Forgot Password?</Text>
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
    marginBottom: 25,
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
  registerLink: {
    color: '#10B88A',
    marginTop: 20,
    fontSize: 14,
  },
});

export default LoginScreen;
