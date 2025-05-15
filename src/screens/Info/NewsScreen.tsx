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

const updates = [
  {
    id: 'server-maintenance',
    title: 'Server Maintenance 🚧',
    version: '1.2.0',
    description:
      'Our servers are currently down for maintenance and will remain closed until June 1st. We’re working hard to bring everything back online safely and securely.',
    features: [
      'Critical security patches applied',
      'Database optimizations in progress',
      'Infrastructure upgrades under way',
      'Stress testing for improved stability',
    ],
    availability: ['Barcelona'],
    notes: [
      'Full service will resume on June 1st at 00:00 UTC.',
      'You may experience intermittent access during brief testing windows.',
      'Thank you for your patience and understanding!',
    ],
  },
  {
    id: 'annual-plan',
    title: 'New Annual Plan Available 🎉',
    version: '1.1.0',
    description:
      'We are introducing a new Annual Plan to provide more value for our loyal users. Enjoy discounted rates, priority customer support, and exclusive benefits with the new plan.',
    features: [
      'Get a full year of unlimited access at a discounted rate.',
      'Priority customer support with direct assistance.',
      'Access to exclusive features and updates.',
      'Flexible cancellation and refund policy.',
    ],
    availability: ['Barcelona'],
    notes: [
      'Sign up for the new plan directly in the app.',
      'Terms and conditions apply.',
    ],
  },
  {
    id: 'app-improvement',
    title: 'App Improvement: Enhanced Performance ⚡',
    version: '1.0.5',
    description:
      'We have made significant improvements to the app’s performance to provide you with a smoother and faster experience. Enjoy a more responsive interface and quicker loading times.',
    features: [
      'Optimized app performance for faster response time.',
      'Improved memory usage to reduce app crashes.',
      'UI/UX enhancements for a more fluid experience.',
      'Bug fixes for a more stable platform.',
    ],
    availability: ['Barcelona'],
    notes: [
      'Ensure you have the latest update for optimal performance.',
      'If you experience any issues, please contact support.',
    ],
  },
  {
    id: 'tandem-bike',
    title: 'New Bike Added: Tandem 🚲',
    version: '0.6.0',
    description:
      'We’re excited to announce the arrival of the new Tandem Bike, designed for you to enjoy rides with a friend or partner. Here’s everything you need to know:',
    features: [
      '2 seats & 2 sets of pedals: Built for two people riding together.',
      'Special reservation system: Invite another user to join the ride.',
      'Enhanced stability: Reinforced wheels and extended frame.',
      'Adjustable power assist: Adapts to the combined weight and slope.',
      'Dual safety gear: Two helmets and synchronized braking.',
    ],
    availability: ['Barcelona'],
    notes: [
      'Only the booking user can control the bike.',
      'The second rider must accept the invite before the ride.',
      'Solo use of the tandem bike is not allowed for safety reasons.',
    ],
  },
];

const UpdatesScreen: React.FC = () => {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * UpdatesScreen component displays a list of updates and news available for the app.
 * Users can view details about each update, including the version, description,
 * key features, availability, and important notes. The updates can be expanded
 * or collapsed by tapping on them.
 *
 * @returns A React component that renders a list of updates with expandable details.
 */

/*******  61daa7bc-a8b9-499e-8ba4-a0a99fdeef0d  *******/  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);

  const toggleUpdate = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedUpdate((prev) => (prev === id ? null : id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>News & Updates</Text>
        <Text style={styles.paragraph}>
          Stay up to date with the latest changes and new features in the app.
        </Text>

        {updates.map((update) => (
          <View key={update.id} style={styles.updateContainer}>
            <TouchableOpacity onPress={() => toggleUpdate(update.id)}>
              <Text style={styles.updateTitle}>{update.title}</Text>
              <Text style={styles.updateVersion}>Version {update.version}</Text>
            </TouchableOpacity>
            {expandedUpdate === update.id && (
              <View style={styles.updateDetails}>
                <Text style={styles.updateDescription}>{update.description}</Text>
                <Text style={styles.sectionHeader}>Key Features:</Text>
                {update.features.map((feature, index) => (
                  <Text key={index} style={styles.detailItem}>
                    • {feature}
                  </Text>
                ))}
                <Text style={styles.sectionHeader}>Availability:</Text>
                {update.availability.map((location, index) => (
                  <Text key={index} style={styles.detailItem}>
                    • {location}
                  </Text>
                ))}
                <Text style={styles.sectionHeader}>Important Notes:</Text>
                {update.notes.map((note, index) => (
                  <Text key={index} style={styles.detailItem}>
                    • {note}
                  </Text>
                ))}
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
  updateContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  updateVersion: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  updateDetails: {
    marginTop: 10,
  },
  updateDescription: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#111827',
  },
  detailItem: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 5,
  },
});

export default UpdatesScreen;
