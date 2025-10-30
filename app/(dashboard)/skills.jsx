import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'

const Skills = () => {
  return (
    <ThemedView style={styles.container} safe = {true}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.heading}>
        Your Skills
      </ThemedText>

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