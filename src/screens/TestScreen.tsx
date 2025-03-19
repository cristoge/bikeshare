import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { login } from '../services/user';
import { changeDni } from '../services/user';
const LoginScreen = () => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result) {
      Alert.alert('Inicio de sesión exitoso', `Bienvenido ${result.user.email}`);
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };
  const handleChangeDni = async () => {
    const result = await changeDni(dni);
    if (result) {
      Alert.alert('DNI actualizado', 'Tu DNI ha sido actualizado correctamente.');
    } else {
      Alert.alert('Error', 'No se pudo actualizar el DNI.');
    }
  };
  return (
    <View >
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Cargando...' : 'Enviar'} onPress={handleLogin} disabled={loading} />
      <Text style={styles.title}>Actualizar DNI</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo DNI"
        keyboardType="numeric"
        value={dni}
        onChangeText={setDni}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangeDni}>
        <Text style={styles.buttonText}>Actualizar DNI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
