import { StyleSheet, Text, View, Image } from 'react-native'
import {Link} from 'expo-router'
import 'react-native-url-polyfill/auto'
import React from 'react'
import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView style = {styles.container}>

      
      <ThemedText style = {styles.title} title = {true}> mySkills </ThemedText>
      <Spacer/>
      <Link href = "/login" style = {styles.link}>
      <ThemedText>Login</ThemedText>
      </Link>
      <Link href = "/register" style = {styles.link}>
      <ThemedText>Register</ThemedText>
      </Link>
      <Link href = "/profile" style = {styles.link}>
      <ThemedText>Profile</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create
({
    container: 
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
      
    },

    link: {
      marginVertical: 10,
      borderBottomWidth: 1
    }
})