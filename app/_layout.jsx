import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from "../constants/Colors"
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'
import { SkillsProvider } from '../contexts/SkillsContext'
import { LocationProvider } from '../contexts/LocationContext'
import { AllUserLocProvider } from '../contexts/AllUserLocContext'


const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    

  return (
    <UserProvider>
      <SkillsProvider>
        <LocationProvider>
          <AllUserLocProvider>
        <StatusBar value = "auto"/>
        <Stack screenOptions = {{headerStyle: {backgroundColor: theme.background},
                                  headerTintColor: theme.text}}>

          <Stack.Screen name = "(auth)" options = {{headerShown: false}}/>
          <Stack.Screen name = "(dashboard)" options = {{headerShown: false}}/>
          <Stack.Screen name = "index" options = {{title: 'Home'}}/>
          <Stack.Screen name = "login" options = {{title: 'Login'}}/>
        </Stack>
          </AllUserLocProvider>
        </LocationProvider> 
      </SkillsProvider>
    </UserProvider>
      
    
  )
}

export default RootLayout

const styles = StyleSheet.create({})