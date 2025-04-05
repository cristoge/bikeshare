import { Tabs } from "expo-router"
import { Image } from "react-native"
const TabsLayout = () =>{
  return <Tabs>
  <Tabs.Screen 
    name="index" 
    options={{
      title:'home',
      headerShown: false,
      tabBarIcon: () => (
        <Image 
          source={require('../../assets/images/home.png')} 
          style={{ width: 24, height: 24 }} 
        />
      ),
    }} 
  />
  <Tabs.Screen 
    name="map" 
    options={{
      headerShown: false,
      title:'Map',
      tabBarIcon: () => (
        <Image 
          source={require('../../assets/images/map.png')} 
          style={{ width: 24, height: 24 }} 
        />
      ),
    }} 
  />
  <Tabs.Screen 
    name="account" 
    options={{
      headerShown: false,
      title:'account',
      tabBarIcon: () => (
        <Image 
          source={require('../../assets/images/account.png')} 
          style={{ width: 24, height: 24 }} 
        />
      ),
    }} 
  />
</Tabs>


}
export default TabsLayout
