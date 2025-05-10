import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const imageData = [
  {
    id: '1',
    imageUrl: require('../../assets/images/real-bike.png'),
    description:
      'Discover our simple bike, designed for short and smooth rides. Perfect for city commutes and leisurely trips!',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/electric_bike.png'),
    description:
      'Experience the power of our electric bike, built for long journeys and uphill adventures. Effortlessly conquer any terrain!',
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/tandem_bike.png'),
    description:
      'The perfect tandem bike for couples or friends! Ride together and enjoy the journey, side by side!',
  },
];

const ImageList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');

  const openModal = (image: any, description: string) => {
    setSelectedImage(image);
    setSelectedDescription(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
    setSelectedDescription('');
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => openModal(item.imageUrl, item.description)}
      style={styles.cardContainer}>
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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={340} // ancho + margen
        decelerationRate="fast"
      />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.modalImage} />
            )}
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

const CARD_WIDTH = 320;
const CARD_MARGIN = 10;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  flatListContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  cardContainer: {
    marginRight: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: CARD_WIDTH,
    height: 180,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ImageList;
