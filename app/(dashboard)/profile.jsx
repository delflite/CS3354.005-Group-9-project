import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useUser } from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'
import { useSkills } from '../../hooks/useSkills'




const Profile = () => {

  
  const {logout, user} = useUser()
  const {otherUserSkills, fetchAllSkills} = useSkills()
  
  useEffect(() => {
  
          if (user)
          {
              fetchAllSkills()
          }
      }, [user])


  return (
    <ThemedView style={styles.container} safe = {true}>

      <ThemedText title = {true} style = {styles.heading}>
        {user.name}
      </ThemedText>

      {otherUserSkills.length > 0 ? (
                otherUserSkills.map((skill) => (
                  <TouchableOpacity key={skill.$id}>
                    <ThemedText>
                        {skill.userId} - {skill.skill}
                    </ThemedText>
                  </TouchableOpacity>
                ))
            ) : (
                <ThemedText>No new matches</ThemedText>
            )}
      
      

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