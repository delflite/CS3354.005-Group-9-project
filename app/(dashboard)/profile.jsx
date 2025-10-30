import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useUser } from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {

  const {logout, user} = useUser()
  return (
    <ThemedView style={styles.container} safe = {true}>

      <ThemedText title = {true} style = {styles.heading}>
        {user.email}
      </ThemedText>

      <Spacer/>
      <ThemedButton onPress = {logout}>
        <Text style = {{color: '#f2f2f2'}} >Logout</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
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
    heading: {
        fontWeight: "bold",
        fontSize: 18
    }

})