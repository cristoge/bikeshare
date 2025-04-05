import { Stack } from "expo-router";

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
    </Stack>
  );
};

export default OptionsLayout;
