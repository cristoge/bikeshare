import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type BillingCycle = 'monthly' | 'annually';

type Plan = {
  id: string;
  title: string;
  priceMonthly: string;
  priceAnnually: string;
  benefits: string[];
};

const plans: Plan[] = [
  {
    id: 'basic',
    title: 'Basic',
    priceMonthly: '€2.49 / month',
    priceAnnually: '€24.99 / year',
    benefits: [
      'Access to standard bikes',
      'Up to 1 hour daily ride time',
      'Basic customer support',
    ],
  },
  {
    id: 'plus',
    title: 'Plus',
    priceMonthly: '€3.99 / month',
    priceAnnually: '€39.99 / year',
    benefits: [
      'Everything in Basic',
      'Up to 2 hours daily ride time',
      'Priority support',
      'Access to electric bikes',
    ],
  },
  {
    id: 'premium',
    title: 'Premium',
    priceMonthly: '€5.49 / month',
    priceAnnually: '€54.99 / year',
    benefits: [
      'Everything in Plus',
      'Unlimited ride time',
      'Personal accident insurance',
      'VIP member rewards',
    ],
  },
];

const MembershipsScreen: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const togglePlan = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan((prev) => (prev === id ? null : id));
  };

  const getPlanLabel = (planId: string) => {
    switch (planId) {
      case 'plus':
        return 'Plus ⭐';
      case 'premium':
        return 'Premium 🌟';
      default:
        return 'Basic';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Membership Plans</Text>
        <Text style={styles.paragraph}>
          Choose the plan that best suits your riding needs. You can change your plan or cancel anytime.
        </Text>

        <View style={styles.billingToggle}>
          <TouchableOpacity
            onPress={() => setBillingCycle('monthly')}
            style={[
              styles.billingOption,
              billingCycle === 'monthly' && styles.billingOptionSelected,
            ]}
          >
            <Text
              style={[
                styles.billingText,
                billingCycle === 'monthly' && styles.billingTextSelected,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBillingCycle('annually')}
            style={[
              styles.billingOption,
              billingCycle === 'annually' && styles.billingOptionSelected,
            ]}
          >
            <Text
              style={[
                styles.billingText,
                billingCycle === 'annually' && styles.billingTextSelected,
              ]}
            >
              Annually
            </Text>
          </TouchableOpacity>
        </View>

        {plans.map((plan) => (
          <View key={plan.id} style={styles.planContainer}>
            <TouchableOpacity onPress={() => togglePlan(plan.id)}>
              <Text style={styles.planTitle}>{getPlanLabel(plan.id)}</Text>
              <Text style={styles.planPrice}>
                {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnually}
              </Text>
            </TouchableOpacity>
            {expandedPlan === plan.id && (
              <View style={styles.planDetails}>
                {plan.benefits.map((benefit, index) => (
                  <Text key={index} style={styles.benefit}>
                    • {benefit}
                  </Text>
                ))}
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    color: '#4B5563',
  },
  billingToggle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  billingOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#D1D5DB',
  },
  billingOptionSelected: {
    backgroundColor: '#10B88A',
    borderColor: '#10B88A',
  },
  billingText: {
    fontSize: 14,
    color: '#374151',
  },
  billingTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  planContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  planDetails: {
    marginTop: 10,
  },
  benefit: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 5,
  },
  joinButton: {
    marginTop: 15,
    backgroundColor: '#10B88A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MembershipsScreen;
