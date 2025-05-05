import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AuthLinkProps {
  onPress: () => void;
  text: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.link}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    color: '#10B88A',
    marginTop: 20,
    fontSize: 14,
  },
});

export default AuthLink;
