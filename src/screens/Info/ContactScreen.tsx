import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ContactScreen = () => {
  const openEmail = () => {
    Linking.openURL('mailto:contact@bikeshare.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+34613069127');
  };

  const openImpressum = () => {
    Linking.openURL('https://yourwebsite.com/impressum');
  };

  const openChat = () => {
    Linking.openURL('https://yourwebsite.com/chat');
  };

  const openFacebook = () => {
    Linking.openURL('https://facebook.com/bikeshare');
  };

  const openInstagram = () => {
    Linking.openURL('https://instagram.com/bikeshare');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact us</Text>
      <Text style={styles.paragraph}>
        You are welcome to give us a call or send us an e-mail with your rental details. No tricks or
        dark magic, we have some really lovely 100% humans in our stables ready to answer your request.
        Give us a call or write to us, then we'll do our very best to get you back on the streets again.
      </Text>

      <TouchableOpacity onPress={openEmail}>
        <Text style={styles.link}>📧 contact@bikeshare.com</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Opening hours:</Text>
      <Text style={styles.text}>Monday - Sunday from 07:00 to 19:00 (CET)</Text>

      <TouchableOpacity onPress={openPhone}>
        <Text style={styles.link}>📞 +34 613 06 91 27</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Support team available online:</Text>
      <Text style={styles.text}>Monday - Sunday from 07:00 to 19:00 (CET)</Text>

      <TouchableOpacity onPress={openChat}>
        <Text style={styles.link}>💬 Chat with us</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Social Media:</Text>
      <TouchableOpacity onPress={openFacebook}>
        <Text style={styles.link}>Facebook: Bikeshare</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openInstagram}>
        <Text style={styles.link}>Instagram: @bikeshare</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>More Information:</Text>
      <TouchableOpacity onPress={openImpressum}>
        <Text style={styles.link}>Legal: Impressum</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: '#10B88A',
    fontSize: 16,
    marginVertical: 10,
  },
  linkInline: {
    color: '#10B88A',
  },
  impressum: {
    marginTop: 30,
    fontSize: 16,
  },
});

export default ContactScreen;
