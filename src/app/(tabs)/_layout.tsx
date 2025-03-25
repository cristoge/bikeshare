import { Tabs } from "expo-router"

const TabsLayout = () =>{
  return <Tabs>
    <Tabs.Screen name="index" options={{ title: 'Home' }}/>
    <Tabs.Screen name="practica" options={{ title: 'Practice' }}/>
  </Tabs>
}
export default TabsLayout