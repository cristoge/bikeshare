import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)'
      options={{
        headerShown:false,
      }}/>
      <Stack.Screen 
        name="(auth)" 
        options={{
          headerShown: false, 
        }} 
      />
      <Stack.Screen 
        name="(options)" 
        options={{ 
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default RootLayout;
