import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const Practica = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(auth)/login");
  };
  // return (
  //   <View>
  //     <StationCard name="Station Name" latitude={41.3851} longitude={2.1734} distance="100m" />
  //   </View>
  // );
  return (
    <View>
      <Text>Página de práctica</Text>
      <Button title="Iniciar Sesion" onPress={handleNavigate} />
    </View>
  );
};

export default Practica;
