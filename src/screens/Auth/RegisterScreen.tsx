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

import { RegisterSchemaType,registerSchema } from '@/src/utils/validations';
import { z } from 'zod';

const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState<RegisterSchemaType>({
    name: '',
    dni: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterSchemaType, string>>>({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field: keyof RegisterSchemaType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error on change
  };

  const handleRegister = async () => {
    const validation = registerSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof RegisterSchemaType, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterSchemaType;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const result = await registerAndLogin(
      form.email,
      form.password,
      form.name,
      form.dni
    );
    setLoading(false);

    if (result) {
      router.replace('/(tabs)');
    } else {
      setErrors({ email: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            <Logo />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in the details to register and start using the app.
            </Text>

            <AuthInput
              placeholder="Full Name"
              value={form.name}
              onChangeText={(val) => handleChange('name', val)}
              error={errors.name}
            />
            <AuthInput
              placeholder="DNI"
              value={form.dni}
              onChangeText={(val) => handleChange('dni', val)}
              keyboardType="numeric"
              error={errors.dni}
            />
            <AuthInput
              placeholder="Email Address"
              value={form.email}
              onChangeText={(val) => handleChange('email', val)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <AuthInput
              placeholder="Password"
              value={form.password}
              onChangeText={(val) => handleChange('password', val)}
              secureTextEntry
              error={errors.password}
            />

            <View style={styles.whyContainer}>
              <AuthLink text="Why we need your DNI" onPress={() => setModalVisible(true)} />
            </View>

            <AuthButton onPress={handleRegister} loading={loading} text="Register" />
            <AuthLink
              text="Already have an account? Log in"
              onPress={() => router.push('/(auth)/login')}
            />
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
