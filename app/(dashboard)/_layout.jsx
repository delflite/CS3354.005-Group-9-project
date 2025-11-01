import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import UserOnly from "../../components/auth/UserOnly"


const DashboardLayout = () => {
    const colorScheme = useColorScheme() 
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserOnly>
    <Tabs
        screenOptions = {{headerShown: false, tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor}}>

    
        <Tabs.Screen name = "profile" options={{title: 'Profile'}}/> 
        <Tabs.Screen name = "create" options={{title: 'Create'}}/> 
        <Tabs.Screen name = "skills" options={{title: 'Skills'}}/>
    </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout

