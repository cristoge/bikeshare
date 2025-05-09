import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Alert,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Plan = {
  id: string;
  title: string;
  baseColor: string;
  price: string;
  benefits: string[];
};

const plans: Plan[] = [
  {
    id: 'basic',
    title: 'Basic',
    baseColor: '#A259FF',
    price: '€19.99 / month',
    benefits: [
      '✓ Access to standard bikes',
      '✓ Up to 1 hour daily ride time',
      '✓ Basic customer support',
    ],
  },
  {
    id: 'plus',
    title: 'Plus',
    baseColor: '#0099FF',
    price: '€29.99 / month',
    benefits: [
      '✓ Everything in Basic',
      '✓ Up to 2 hours daily ride time',
      '✓ Priority support',
      '✓ Access to electric bikes',
    ],
  },
  {
    id: 'premium',
    title: 'Premium',
    baseColor: '#FFA500',
    price: '€39.99 / month',
    benefits: [
      '✓ Everything in Plus',
      '✓ Unlimited ride time',
      '✓ Personal accident insurance',
      '✓ VIP member rewards',
    ],
  },
];

const HelpGreen = '#10B88A';

const MembershipsScreen: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan((prev) => (prev === id ? null : id));
  };

  const handleJoin = (planTitle: string) => {
    Alert.alert('Coming Soon', `Joining ${planTitle} is in progress...`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Membership Plans</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planWrapper}>
          <TouchableOpacity
            onPress={() => toggleExpand(plan.id)}
            activeOpacity={0.9}
            style={[styles.planHeader, { backgroundColor: plan.baseColor }]}
          >
            <Text style={styles.planTitle}>{plan.title}</Text>
          </TouchableOpacity>
          {expandedPlan === plan.id && (
            <View style={styles.planDetails}>
              <Text style={styles.price}>{plan.price}</Text>
              {plan.benefits.map((benefit, i) => (
                <Text key={i} style={styles.benefitText}>{benefit}</Text>
              ))}
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoin(plan.title)}
              >
                <Text style={styles.joinButtonText}>Join now</Text>
              </TouchableOpacity>
            </View>
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
  planWrapper: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  planHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  planTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  planDetails: {
    backgroundColor: '#fff',
    padding: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  joinButton: {
    marginTop: 15,
    backgroundColor: HelpGreen,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MembershipsScreen;
