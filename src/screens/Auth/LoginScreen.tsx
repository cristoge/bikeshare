import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../../services/user';

import Logo from '../../components/Auth/Logo';
import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';
import AuthLink from '../../components/Auth/AuthLink';

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      <Logo />
      <Text style={styles.title}>Welcome</Text>
      <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AuthInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AuthButton onPress={handleLogin} loading={loading} text="Log in" />
      <AuthLink text="Don't have an account? Sign up" onPress={() => router.push("/(auth)/register")} />
      <AuthLink text="Forgot Password?" onPress={() => router.push("/(auth)/forgot")} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
});

export default LoginScreen;
