import { Tabs } from "expo-router";
import { Image } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0FB88A", // Color cuando está activo (verde personalizado)
        tabBarInactiveTintColor: "#666",   // Color cuando no está activo
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
          title: "Map",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/map.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: "account",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/account.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
