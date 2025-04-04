import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image  } from 'react-native';
import { login } from '../services/user';

import { useRouter } from 'expo-router';
const LoginScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleNavigate = () => {
    router.push("/(auth)/register");
  }
  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result) {
      Alert.alert('Inicio de sesión exitoso', `Bienvenido ${result.user.email}`);
      router.replace('/(tabs)'); // 🔁 esto reemplaza la pantalla de login
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };
  return (
    <View >
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text>
          {loading ? 'Cargando...' : 'Send'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.rememberButton} onPress={handleNavigate}>Remember password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 45,
  },

  input: {
    width: '70%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1.3,
    marginHorizontal: '15%',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    width: 120,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B88A',
  },

  rememberButton: {
    color: '#10B88A',
    textAlign: 'center',
    marginTop: 15,
  },

  logo: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: '28%',
    borderRadius:8,
  }

});

export default LoginScreen;
