import { Tabs } from "expo-router"

const TabsLayout = () =>{
  return <Tabs>
    <Tabs.Screen name="index"/>
    <Tabs.Screen name="practica"/>
  </Tabs>
}
export default TabsLayout