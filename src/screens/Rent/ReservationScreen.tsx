import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { createRent, createReservation } from '../../services/rent';
import { useRouter } from 'expo-router';
const bikeIcons = {
  normal: require('@/src/assets/images/bike.png'),
  electric: require('@/src/assets/images/electric-bike.png'),
  tandem: require('@/src/assets/images/tandem.png'),
};
export default function ReservationScreen() {
  const { bikeId, model, locationName, userId,locationId } = useLocalSearchParams();
  const [mode, setMode] = useState<'rent' | 'reserve'>('rent');
  const [reservationTime, setReservationTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [creatingTrip, setCreatingTrip] = useState(false); 
  const navigateToHome = () => {
    router.push("/(tabs)");
  }
  const onTimeChange = (event: any, selectedDate?: Date): void => {
    const currentDate: Date = selectedDate || reservationTime;
    setShowPicker(Platform.OS === 'ios');
    setReservationTime(currentDate);
  };
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleReservation = async () => {
    if (!bikeId || !userId) {
      alert('Missing data');
      return;
    }
  
    try {
      setCreatingTrip(true);
  
      // Esperar 3 segundos antes de crear la reserva o el alquiler
      await wait(3000);
  
      if (mode === 'rent') {
        await createRent(userId as string, bikeId as string,locationId as string);
        alert('Rental started');
      } else {
        await createReservation(userId as string, bikeId as string);
        alert('Reservation created');
      }
  
      setCreatingTrip(false);
  
      navigateToHome();
  
    } catch (err) {
      alert('Error processing action');
      console.error(err);
      setCreatingTrip(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>BIKE SHARE RECEIPT</Text>
        <Text style={styles.subText}>You're about to reserve a bike</Text>

        <View style={styles.card}>
          <Image source={bikeIcons[model as keyof typeof bikeIcons]} style={styles.bikeImage} />
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: 'bold' }}>Model:</Text> {model}
          </Text>
          <Text style={styles.infoText}>Bike ID: {bikeId?.slice(0, 5)}</Text>

        </View>

        <View style={styles.separator} />

        <View style={styles.card}>
          <Text style={styles.infoTitle}>Pickup Location</Text>
          <Text style={styles.infoText}>{locationName}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.card}>
          <Text style={styles.infoTitle}>Choose an option</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.optionButton, mode === 'rent' && styles.optionButtonActive]}
              onPress={() => setMode('rent')}
            >
              <Text style={mode === 'rent' ? styles.activeText : styles.inactiveText}>Rent now</Text>
            </TouchableOpacity>
            <TouchableOpacity
  style={[
    styles.optionButton,
    mode === 'reserve' && styles.optionButtonActive,
    { opacity: 0.5 } // se ve medio transparente
  ]}
  disabled={true} // deshabilita el botón
>
  <Text style={[styles.inactiveText, { color: '#999' }]}>Reserve for later</Text>
</TouchableOpacity>
          </View>

          {mode === 'reserve' && (
            <View style={styles.timePicker}>
              <Text style={styles.infoTitle}>Select reservation time</Text>
              <Button title="Pick time" onPress={() => setShowPicker(true)} />
              {showPicker && (
                <DateTimePicker
                  value={reservationTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
              <Text style={styles.timeText}>
                Selected time: {reservationTime.getHours()}:
                {reservationTime.getMinutes().toString().padStart(2, '0')}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
          <Text style={styles.reserveText}>{mode === 'rent' ? 'Rent now' : 'Reserve'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
  visible={creatingTrip}
  transparent
  animationType="fade"
  onRequestClose={() => {}}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <ActivityIndicator size="large" color="#0FB88A" />
      <Text style={styles.loadingText}>Your journey is about to begin…</Text>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 60,
    paddingVertical: 60,
    paddingHorizontal: 30,
    flexGrow: 1,
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  bikeImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  separator: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 15,
  },
  timePicker: {
    alignItems: 'center',
    marginTop: 10,
  },
  timeText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  reserveButton: {
    backgroundColor: '#10B88A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  reserveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#F9F9F9',
  },
  optionButtonActive: {
    borderColor: '#10B88A',
    backgroundColor: '#E6FAF4',
  },
  activeText: {
    color: '#10B88A',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#333',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
});
