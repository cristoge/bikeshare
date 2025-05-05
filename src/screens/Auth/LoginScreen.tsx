import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../../services/user';

import Logo from '../../components/Auth/Logo';
import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';
import AuthLink from '../../components/Auth/AuthLink';

import { LoginSchemaType,loginSchema } from '@/src/utils/validations';
import { z } from 'zod';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState<LoginSchemaType>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginSchemaType, string>>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (field: keyof LoginSchemaType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error on change
  };

  const handleLogin = async () => {
    const validation = loginSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof LoginSchemaType, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginSchemaType;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);

    if (result) {
      router.replace('/(tabs)');
    } else {
      setErrors({ email: 'Invalid email or password' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <Text style={styles.title}>Welcome</Text>

      <AuthInput
        placeholder="Email"
        value={form.email}
        onChangeText={(val) => handleChange('email', val)}
        error={errors.email}
      />
      <AuthInput
        placeholder="Password"
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
        secureTextEntry
        error={errors.password}
      />

      <AuthButton onPress={handleLogin} loading={loading} text="Log in" />

      <AuthLink text="Don't have an account? Sign up" onPress={() => router.push('/(auth)/register')} />
      <AuthLink text="Forgot Password?" onPress={() => router.push('/(auth)/forgot')} />
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
