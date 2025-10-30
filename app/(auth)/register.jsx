import { Keyboard, StyleSheet, Text } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import { useState } from 'react'
import ThemedButton from '../../components/ThemedButton'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import { TouchableWithoutFeedback } from 'react-native'
import {useUser} from "../../hooks/useUser"


const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { register} = useUser()

    const handleSubmit = async () => {
        setError(null)

        try{
          await register(email, password)
          
        }catch (error) {
          setError(error.message)
        }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style = {styles.container}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.title}>
        Register For an Account
      </ThemedText>
      <Spacer/>

      <ThemedTextInput 
        style = {{width: '80%', marginBottom: 20}}
        placeholder='Email'
        keyboardType = "email-address"
        onChangeText = {setEmail}
        value = {email}
        />

        <ThemedTextInput 
        style = {{width: '80%', marginBottom: 20}}
        placeholder='Password'
        onChangeText = {setPassword}
        value = {password}
        secureTextEntry
        />

      <Spacer/>

      <ThemedButton onPress = {handleSubmit}>
        <Text style = {{color: '#f2f2f2'}}>Register</Text>
      </ThemedButton>

      <Spacer height = {20}/>
      <Link href = '/login'>
        <ThemedText style = {{textAlign: 'center'}}>
          Login
        </ThemedText>
          
      </Link>

    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

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
        fontSize: 18
    },

    link: {
      marginVertical: 10,
      borderBottomWidth: 1
    }
})