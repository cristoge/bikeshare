import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserStats } from '../components/totalStats';
import { RecentTrips } from '../components/recentTrips';
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome para los iconos

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.name}>Hi, User</Text>
        </View>
        <View>
          <UserStats userData={{ totalTrips: 120, co2Saved: 45 }} />
        </View>
        {/* Lista de botones */}
        <View style={styles.buttonList}>
          <TouchableOpacity style={styles.button}>
            <Icon name="user" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="history" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Ride History</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="bicycle" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Freerides</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="star" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Become a Member</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="clipboard" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Plans</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="question-circle" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button}>
            <Icon name="envelope" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de log out al final */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonList: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10, // Espacio entre el icono y el texto
  },
  icon: {
    marginRight: 10, // Espacio entre el icono y el texto
  },
  separator: {
    height: 1,
    backgroundColor: '#F0FFF4', 
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

