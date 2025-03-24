import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { forgotPassword } from '../services/user';
const RememberPasswordScreen = () => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRememberPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu DNI y email para recuperar la contraseña.');
      return;
    }
    
    setLoading(true);

    setLoading(false);

    const result = await forgotPassword(email);

    Alert.alert('Éxito', 'Te hemos enviado un correo para recuperar tu contraseña. Recuerda revisar tambien la bandeja de spam');
  };

  return (
    <View >
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Remember password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRememberPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Enviar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B88A',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
    borderRadius: 8,
  },
});

export default RememberPasswordScreen;
