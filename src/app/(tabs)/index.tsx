import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import WelcomeScreen from '@/src/components/Welcome';
import ProfileScreen from '@/src/screens/ProfileScreen';
const App = () => {
  return (
        <View>
          <ProfileScreen />
        </View>
      );
};

export default App;
