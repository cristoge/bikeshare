import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="login"

        options={{ 
          title: 'Iniciar Sesión', 
          headerStyle:{backgroundColor:'#0FB88A'},
        }} 
      />
      <Stack.Screen 
        name="register"
        options={{ 
          title: 'Forgot Password', 
          headerStyle:{backgroundColor:'#0FB88A'},
        }}/>
    </Stack>
  );
};

export default AuthLayout;
