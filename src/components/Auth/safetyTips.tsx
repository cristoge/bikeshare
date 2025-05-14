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

const bikeSafetyTips = [
  {
    id: '1',
    imageUrl: require('../../assets/images/tips/helmet.jpg'),
    description:
      'Always wear a helmet to protect your head in case of an accident. Make sure it fits properly and is secured before riding.',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/tips/brake.jpg'),
    description:
      'Check your brakes before riding. Make sure they are in good condition and respond well to ensure safe stopping during your ride.',
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/tips/intersection.jpg'),
    description:
      'When approaching intersections, always slow down, signal your intentions, and be aware of traffic around you.',
  },
  {
    id: '4',
    imageUrl: require('../../assets/images/tips/light.png'),
    description:
      'Ensure you are visible by wearing bright colors, especially in low-light conditions, and using front and rear lights on your bike.',
  },
];

const SafetyTipsList = () => {
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
        data={bikeSafetyTips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={340} // width + margin
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
    backgroundColor: '#0FB88A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SafetyTipsList;
