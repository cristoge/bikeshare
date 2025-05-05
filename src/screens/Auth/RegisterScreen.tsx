import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerAndLogin } from '../../services/user';

import Logo from '../../components/Auth/Logo';
import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';
import AuthLink from '../../components/Auth/AuthLink';
import WhyDniModal from '../../components/Auth/WhyDni';

const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = async () => {
    if (!name || !dni || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    setLoading(true);
    const result = await registerAndLogin(email, password, name, dni);
    setLoading(false);

    if (result) {
      router.replace('/(tabs)');
    } else {
      alert('Could not create the account. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            <Logo />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in the details to register and start using the app.
            </Text>

            <AuthInput placeholder="Full Name" value={name} onChangeText={setName} />
            <AuthInput placeholder="DNI" value={dni} onChangeText={setDni} keyboardType="numeric" />
            <AuthInput placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <AuthInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <View style={styles.whyContainer}>
              <AuthLink text="Why we need your DNI" onPress={() => setModalVisible(true)} />
            </View>

            <AuthButton onPress={handleRegister} loading={loading} text="Register" />
            <AuthLink text="Already have an account? Log in" onPress={() => router.push('/(auth)/login')} />
          </View>

          <WhyDniModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flexGrow: 1,
    minHeight: 1000,
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  whyContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default RegisterScreen;
