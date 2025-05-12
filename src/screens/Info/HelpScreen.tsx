import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type HelpItem = {
  iconName: string;
  question: string;
  answer?: string;
};

const helpData: HelpItem[] = [
  {
    iconName: 'bicycle',
    question: "I can't find the vehicle I rented",
    answer:
      'Make sure you are at the correct pick-up location shown in the app. Check if the name on the handlebar info panel matches the one in the app. If the vehicle isn’t there, try pressing "Switch" to choose another nearby one. If no other bikes are available, press “Cancel” to get a full refund.',
  },
  {
    iconName: 'lock',
    question: 'I can’t lock my bike',
    answer:
      'Please ensure you’re within the designated drop-off area. Try manually pushing the lock down. If that doesn’t work, restart the app and try again. If issues persist, contact support.',
  },
  {
    iconName: 'unlock',
    question: 'I can’t unlock my bike',
    answer:
      'Make sure your Bluetooth is turned on and you have a stable internet connection. Try moving closer to the bike and press "Unlock" again. Restart the app if needed.',
  },
  {
    iconName: 'lock',
    question: 'I can’t lock my electric vehicle',
    answer:
      'Please ensure you are parked in a valid drop-off area. Hold the lock mechanism firmly and try again via the app. If the lock doesn’t engage, try restarting the app or contact support.',
  },
  {
    iconName: 'unlock',
    question: 'I can’t unlock my electric vehicle',
    answer:
      'Check that Bluetooth and location services are active. Make sure you are next to the vehicle. Tap “Unlock” again and wait for confirmation. If it fails, reboot the app or your phone.',
  },
  {
    iconName: 'wrench',
    question: 'I have a faulty vehicle',
    answer:
      'Sorry to hear that! Please stop riding if unsafe. Lock the vehicle and report the issue in the app using “Report Problem.” You can then choose another available vehicle nearby.',
  },
  {
    iconName: 'undo',
    question: 'I can’t return my vehicle',
    answer:
      'Check if you’re in the correct drop-off zone. The app should show a green indicator. Make sure the bike is properly locked and refresh the app to complete the return. Still stuck? Contact our support team.',
  },
  // Additional FAQs
  {
    iconName: 'location-arrow',
    question: 'How can I change my pickup location?',
    answer:
      'To change your pickup location, tap the map on the main screen and drag the pin to your desired location. The app will update with the nearest available vehicles to that new location.',
  },
  {
    iconName: 'credit-card',
    question: 'How do I update my payment method?',
    answer:
      'To update your payment method, go to the "Account" section in the app, then tap on "Payment Methods." You can add or edit your credit card or payment details from there.',
  },
];

const HelpScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQs</Text>

      {helpData.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <TouchableOpacity onPress={() => toggleIndex(index)}>
            <View style={styles.questionRow}>
              <Icon name={item.iconName} size={20} color="#FF6600" style={styles.icon} />
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.arrow}>{activeIndex === index ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {activeIndex === index && item.answer && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    width: 25,
    textAlign: 'center',
    color: '#10B88A',
  },
  question: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: '#999',
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default HelpScreen;
