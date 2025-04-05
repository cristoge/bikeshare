import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useUserStore from '../stores/userStore'; // Asegúrate de importar tu store

const ProfileCard = () => {
  const user = useUserStore((state) => state.user); // accede al user desde el store

  // Por si acaso no hay datos, evitamos errores con fallback
  const dni = user?.dni || 'Sin DNI';
  const name = user?.name || 'Nombre no disponible';
  const email = user?.email || 'Correo no disponible';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Perfil</Text>
      </View>

      <View style={styles.buttonList}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Feather name="user" size={20} color="#333" style={styles.icon} />
          <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Feather name="mail" size={20} color="#333" style={styles.icon} />
          <Text style={styles.buttonText}>{email}</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Feather name="credit-card" size={20} color="#333" style={styles.icon} />
          <Text style={styles.buttonText}>{dni}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0FFF4',
    marginVertical: 5,
  },
});

export default ProfileCard;
