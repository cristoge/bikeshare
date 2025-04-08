import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TouchableHighlight
} from 'react-native';
import { registerAndLogin } from '../services/user'; 
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);  // Estado de la modal

  const handleRegister = async () => {
    if (!name || !dni || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    setLoading(true);
    const result = await registerAndLogin(email, password, name, dni);
    setLoading(false);

    if (result) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Could not create the account. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in the details to register and start using the app.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#aaa"
            />

            <View style={styles.dniContainer}>
              <TextInput
                style={styles.input}
                placeholder="DNI"
                value={dni}
                onChangeText={setDni}
                placeholderTextColor="#aaa"
                keyboardType="numeric"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
            />

            
            <View style={styles.whyContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.whyText}>Why we need your DNI</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Registrarse'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Modal para mostrar la información */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Why we need your DNI</Text>
                <Text style={styles.modalText}>
                  We require your DNI to verify your identity and ensure the security of your account.
                </Text>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
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
    minHeight: 1200,
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 20,
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
  dniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  whyContainer: {
    width: '100%',
    alignItems: 'flex-end',  
    marginBottom: 10,
  },
  whyText: {
    color: '#10B88A',
    fontSize: 13,  
  },
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
  loginLink: {
    color: '#10B88A',
    marginTop: 20,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#10B88A',
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterScreen;
