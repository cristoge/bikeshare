import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getUsers } from '../services/user';
import { User } from '../types/dataTypes';

const TestScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    if (data) {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View>
      <Button title="Obtener Usuarios" onPress={fetchUsers} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.orangeText}>{item.id}</Text>
            <Text>{item.role}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orangeText: {
    color: 'orange',
  },
});

export default TestScreen;
