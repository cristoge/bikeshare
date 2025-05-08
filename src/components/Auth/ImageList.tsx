import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';

const imageData = [
  {
    id: '1',
    imageUrl: require('../../assets/images/real-bike.png'),
    description: 'This is our simple bike, perfect for short and flat trips.',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/electric_bike.png'),
    description: 'A classic road bike, perfect for commuting.',
  },
];

const ImageList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");

  const openModal = (image: any, description: string) => {
    setSelectedImage(image);
    setSelectedDescription(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
    setSelectedDescription("");
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => openModal(item.imageUrl, item.description)} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={item.imageUrl} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true} // Esto es para que la FlatList sea horizontal
        showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal
        contentContainerStyle={styles.flatListContent} // Añadido espacio entre los elementos
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedImage && <Image source={selectedImage} style={styles.modalImage} />}
            <Text style={styles.modalDescription}>{selectedDescription}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,  // Añadir margen horizontal para separar las columnas
  },
  cardContainer: {
    margin: 10,  // Esto asegura que cada tarjeta tenga un espacio entre ellas
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: 250,  // Fijo para que todas las cards tengan el mismo tamaño
    height: 150,  // Fijo para que todas las cards tengan el mismo tamaño
    elevation: 4,  // Sombra para darle el efecto de tarjeta
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    justifyContent: 'center', // Centra la imagen dentro de la tarjeta
    alignItems: 'center',
  },
  image: {
    width: 150,  // Tamaño fijo para todas las imágenes dentro de las tarjetas
    height: 130, // Tamaño fijo para todas las imágenes dentro de las tarjetas
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ImageList;
