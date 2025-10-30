import { Keyboard, StyleSheet, Text } from 'react-native'
import React from 'react'
import {Link, useRouter} from 'expo-router'
import { useState } from 'react'
import  ThemedButton  from '../../components/ThemedButton'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { Colors } from '../../constants/Colors'
import ThemedTextInput from '../../components/ThemedTextInput'
import { TouchableWithoutFeedback } from 'react-native'
import { useUser } from '../../hooks/useUser'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const {login} = useUser()
    const router = useRouter()

    const handleSubmit = async () => {

        setError(null)

        try{
          await login(email, password)
          router.push('/profile')
        }catch (error) {
          setError(error.message)
        }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style = {styles.container}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.title}>
        Login to Your Account
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
        <Text style = {{color: '#f2f2f2'}}>Login</Text>
      </ThemedButton>
      <Spacer/>

      {error && <Text style = {styles.error}>{error}</Text>}

      <Spacer height = {20}/>
      <Link href = '/register'>
        <ThemedText style = {{textAlign: 'center'}}>
          Register instead
        </ThemedText>
          
      </Link>

    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

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
    },
    btn: {
      backgroundColor: Colors.primary,
      padding: 15,
      borderRadius: 5
    },
    pressed: {
      opacity: 0.8
    },

    error: {
      color: Colors.warning,
      padding: 10,
      backgroundColor: '#f5c1c8',
      borderColor: Colors.warning,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 10
    }
})