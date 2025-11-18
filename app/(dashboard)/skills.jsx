import { StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useSkills } from '../../hooks/useSkills'
import { Colors } from '../../constants/Colors'
import ThemedCard from '../../components/ThemedCard'
import { useRouter } from 'expo-router'

const Skills = () => {

  const { skills } = useSkills()
  const router = useRouter()

  return (
    <ThemedView style={styles.container} safe = {true}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.heading}>
        Your Skills
      </ThemedText>
      <Spacer/>

      <FlatList
        data={skills}
        keyExtractor={(item) => item.$id}
        contentContainerStyle = {styles.list}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => router.push(`/skills/${item.$id}`)}>
            <ThemedCard style = {styles.card}>
              <ThemedText style = {styles.title}>
                {item.skill}
              </ThemedText>
            </ThemedCard>
          </TouchableOpacity>
        )}
      />

    </ThemedView>
  )
}

export default Skills

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    
    heading: {
        fontWeight: "bold",
        fontSize: 18
    },
    list:
    {
      marginTop: 40
    },
    card:
    {
      width: "90%",
      marginHorizontal: "5%",
      marginVertical: 10,
      padding: 10,
      paddingLeft: 14,
      borderLeftColor: Colors.primary,
      borderLeftWidth: 4
    },
    title:
    {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10
    }
    

})