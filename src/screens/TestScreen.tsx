import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const TripDetail = () => {
  const {
    id,
    bike_id,
    user_id,
    status,
    start_date,
    end_date,

  } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Trip ID: {id}</Text>
      <Text>Bike ID: {bike_id}</Text>
      <Text>User ID: {user_id}</Text>
      <Text>Status: {status}</Text>
      <Text>Start Date: {start_date}</Text>
      <Text>End Date: {end_date}</Text>
    </View>
  );
};

export default TripDetail;
