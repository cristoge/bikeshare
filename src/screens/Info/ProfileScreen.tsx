import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserStats } from '../../components/totalStats';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useRouter } from 'expo-router';
import useUserStore from '../../stores/userStore';
import { logout } from '../../services/user';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const userName = user?.name || "Usuario"; 

  const handleNavigate = () => {
    if (!user) {
      router.push("/(auth)/login"); 
    } else {
      router.push("/(options)/profileCard");
    }
  };

  const navigateToUpdates = () => {
    router.push('/(options)/updates');
  };

  const navigateToFreeRides = () => {
    router.push("/(options)/FreeRides");
  };

  const navigateToRecentRents = () => {
    router.push('/(options)/recentRents');
  };

  const navigateToContact = () => {
    router.push("/(options)/contact");
  };

  const navigateToHelp = () => {
    router.push("/(options)/help");
  };

  const navigateToPlans = () => {
    router.push("/(options)/plans");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
  {user ? (
    <>
      <Text style={styles.name}>Welcome back, {userName} 👋</Text>
      <Text style={styles.subtext}>Manage your account and activity</Text>
    </>
  ) : (
    <>
      <Text style={styles.name}>Welcome!</Text>
      <Text style={styles.subtext}>Log in to access your profile</Text>
    </>
  )}
</View>

        <View>
          <UserStats />
        </View>

        <View style={styles.buttonList}>
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Icon name="user" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>{user ? " Profile" : "Log In"}</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {user && (
            <>
              <TouchableOpacity style={styles.button} onPress={navigateToRecentRents}>
                <Icon name="history" size={20} color="#333" style={styles.icon} />
                <Text style={styles.buttonText}>Ride History</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={navigateToFreeRides}>
            <Icon name="ticket" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Freerides</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.button} onPress={navigateToUpdates}>
            <Icon name="clipboard" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>News & Updates</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.button} onPress={navigateToPlans}>
            <Icon name="star" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Plans</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.button} onPress={navigateToHelp}>
            <Icon name="question-circle" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.button} onPress={navigateToContact}>
            <Icon name="envelope" size={20} color="#333" style={styles.icon} />
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
            alert("You have logged out successfully!");
          }}
        >
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
    paddingTop: 40,
    paddingBottom: 20,
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
  logoutButton: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
