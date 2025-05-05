import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="login"

        options={{ 
          title: 'Log in', 
          headerStyle:{backgroundColor:'#0FB88A'},
        }} 
      />
      <Stack.Screen 
        name="register"
        options={{ 
          title: 'Sign up', 
          headerStyle:{backgroundColor:'#0FB88A'},
        }}/>
      <Stack.Screen
        name="forgot"
        options={{ 
          title: 'Forgot Password', 
          headerStyle:{backgroundColor:'#0FB88A'},
        }}/>
    </Stack>
  );
};

export default AuthLayout;
