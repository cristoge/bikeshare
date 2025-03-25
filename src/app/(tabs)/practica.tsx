import React from 'react';
import { View } from 'react-native';
import { UserStats } from '@/src/components/totalStats';
import { RecentTrips } from '@/src/components/recentTrips';
import WelcomeScreen from '@/src/components/Welcome';

const PracticaTs = () => {
  const userData = {
    totalTrips: 42,
    co2Saved: 15.8,
  };

  return (
    <View>
      <UserStats userData={userData} />
    </View>
  );  
};

export default PracticaTs;
