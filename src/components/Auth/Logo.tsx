import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo: React.FC = () => (
  <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
);

const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default Logo;
