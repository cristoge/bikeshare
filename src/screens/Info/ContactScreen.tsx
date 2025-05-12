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
      <Text style={styles.title}>Contáctanos</Text>
      <Text style={styles.paragraph}>
        Estás bienvenido a llamarnos o enviarnos un correo electrónico con los detalles de tu alquiler. No usamos trucos ni magia oscura, tenemos a unos humanos muy agradables listos para atender tu solicitud. Llámanos o escríbenos, y haremos todo lo posible para que puedas salir nuevamente a las calles.
      </Text>

      <TouchableOpacity onPress={openEmail}>
        <Text style={styles.link}>📧 contact@bikeshare.com</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Horario de atención:</Text>
      <Text style={styles.text}>De lunes a domingo de 07:00 a 19:00 (CET)</Text>

      <TouchableOpacity onPress={openPhone}>
        <Text style={styles.link}>📞 +34 613 06 91 27</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Equipo de soporte disponible online:</Text>
      <Text style={styles.text}>De lunes a domingo de 07:00 a 19:00 (CET)</Text>

      <TouchableOpacity onPress={openChat}>
        <Text style={styles.link}>💬 Chatea con nosotros</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Redes Sociales:</Text>
      <TouchableOpacity onPress={openFacebook}>
        <Text style={styles.link}>Facebook: Bikeshare</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openInstagram}>
        <Text style={styles.link}>Instagram: @bikeshare</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Más información:</Text>
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
