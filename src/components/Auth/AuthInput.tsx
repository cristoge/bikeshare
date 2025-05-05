import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#aaa"
    keyboardType={placeholder === 'Email' ? 'email-address' : 'default'}
    {...rest}
  />
);

const styles = StyleSheet.create({
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
});

export default AuthInput;
