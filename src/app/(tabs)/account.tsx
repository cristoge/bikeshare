import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "@/src/screens/ProfileScreen";

const Account = () => {
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
      <ProfileScreen />
    </View>
  );
};

export default Account;
