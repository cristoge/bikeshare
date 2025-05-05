import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

type Plan = {
  id: string;
  title: string;
  description: string;
  price: string;
  highlight: string;
};

const plans: Plan[] = [
  {
    id: 'monthly',
    title: 'Daily Rider',
    description:
      'For those who need a bike regularly, enjoy 2 hours of free time every day.\nPerfect if you ride frequently.',
    price: 'from €10 /month',
    highlight: '2 hours free time per day',
  },
  {
    id: 'annual',
    title: 'Annual Explorer',
    description:
      'Great for committed riders. Get 2 hours of free rides every day, all year long — at a better price.',
    price: 'from €90 /year',
    highlight: '2 hours daily & cheaper than monthly',
  },
];

const MembershipsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Memberships</Text>
      <Text style={styles.subtitle}>Choose a plan to suit how you ride</Text>

      <View style={styles.cardsContainer}>
        {plans.map((plan) => (
          <View key={plan.id} style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require('./assets/bike.png')} // reemplaza con tu imagen
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.description}>{plan.description}</Text>
            <Text style={styles.highlight}>✓ {plan.highlight}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
    backgroundColor: '#FF7A00',
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FF7A00',
    color: '#fff',
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imagePlaceholder: {
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    color: '#FF6600',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  highlight: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MembershipsScreen;
