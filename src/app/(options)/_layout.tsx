import { Stack } from "expo-router";
import { Platform } from "react-native";

const OptionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
      name="profileCard"
      options={{ 
        title: 'My Profile', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen 
      name="contact"
      options={{ 
        title: 'Contact', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen 
      name="help"
      options={{ 
        title: 'Help', 
        
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen 
      name="plans"
      options={{ 
        title: 'Plans', 
        
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen
      name="reservation"
      options={{ 
        title: 'ejemplo', 
        headerShown: Platform.OS === 'ios' ? false : true,
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen
      name="FreeRides"
      options={{  
        title: 'Gifts', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen
      name="updates"
      options={{  
        title: 'Updates', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen
      name="recentRents"
      options={{  
        title: 'History', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
      <Stack.Screen
      name="Test"
      options={{  
        title: 'Test', 
        headerStyle:{backgroundColor:'#0FB88A'},
      }} 
      />
    </Stack>
    
  );
};

export default OptionsLayout;
