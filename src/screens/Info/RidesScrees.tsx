import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';

const FreeRides = () => {
  const [inputCode, setInputCode] = useState('');
  const [freeRides, setFreeRides] = useState(0);
  const VALID_CODE = 'STANDARD 20';

  const handleRedeem = () => {
    if (inputCode.trim().toUpperCase() === VALID_CODE) {
      setFreeRides(5);
      Alert.alert('Success!', 'You have received 5 free rides!');
    } else {
      Alert.alert('Invalid Code', 'The code you entered is not valid.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎁 Special Promotion</Text>
      <Text style={styles.paragraph}>Enter your promo code to receive exclusive benefits.</Text>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/gift.png')}
          style={styles.logo}
        />

        <Text style={styles.cardTitle}>Redeem the code to get your discount!</Text>
        <Text style={styles.cardDescription}>
          Use the following code when paying with your credit card and enjoy the benefit.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your code"
          value={inputCode}
          onChangeText={setInputCode}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.button} onPress={handleRedeem}>
          <Text style={styles.buttonText}>Redeem Now</Text>
        </TouchableOpacity>

        {freeRides > 0 && (
          <Text style={styles.successMessage}>🎉 You have {freeRides} free rides available.</Text>
        )}

        <Text style={styles.validity}>Valid until May 20, 2026</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make ScrollView take up the full screen
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 22,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827',
  },
  cardDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    color: '#059669',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  validity: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default FreeRides;