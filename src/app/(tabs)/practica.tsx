import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const Practica = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(auth)/login");
  };

  return (
    <View>
      <Text>Página de práctica</Text>
      <Button title="Ir a Ejemplo 2" onPress={handleNavigate} />
    </View>
  );
};

export default Practica;
