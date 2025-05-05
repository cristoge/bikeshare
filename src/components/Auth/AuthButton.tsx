import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface AuthButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onPress, loading = false, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
    <Text style={styles.buttonText}>{loading ? 'Loading...' : text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default AuthButton;
