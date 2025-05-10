import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useUserStore from '../../stores/userStore';
import { updateUserName } from '@/src/services/user';

const ProfileCard = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');

  const handleSave = async () => {
    if (!user?.id) return;

    const success = await updateUserName(user.id, newName);

    if (success) {
      setUser({ ...user, name: newName });
      setEditing(false);
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
    } else {
      Alert.alert('Error', 'No se pudo actualizar el nombre');
    }
  };

  const dni = user?.dni || 'Sin DNI';
  const email = user?.email || 'Correo no disponible';

  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión, como limpiar el store o llamar a un servicio de logout
    Alert.alert('Cerrar sesión', 'Aquí iría la lógica de logout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Perfil</Text>
      </View>

      <View style={styles.buttonList}>
        <View style={styles.button}>
          <Feather name="user" size={20} color="#333" style={styles.icon} />
          {editing ? (
            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
              placeholder="Nuevo nombre"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text style={styles.buttonText}>{user?.name || 'Nombre no disponible'}</Text>
          )}
          <View style={styles.editActions}>
            {editing ? (
              <>
                <TouchableOpacity onPress={() => setEditing(false)}>
                  <Feather name="x" size={18} color="#ff3b30" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={{ marginLeft: 10 }}>
                  <Feather name="check" size={18} color="#34c759" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setEditing(true)}>
                <Feather name="edit-2" size={18} color="#0FB88A" />
              </TouchableOpacity>
            )}
          </View>
        </View>

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

        <View style={styles.separator} />

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#ff3b30" style={styles.icon} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0FFF4',
    marginVertical: 5,
  },
  editActions: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
    marginLeft: 10,
    flex: 1,
  },
});

export default ProfileCard;
