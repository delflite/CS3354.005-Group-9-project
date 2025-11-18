import { StyleSheet, Text, View } from 'react-native'
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useSkills } from '../../../hooks/useSkills'
import ThemedLoader from "../../../components/ThemedLoader"
import { Colors } from '../../../constants/Colors'

const SkillDetails = () => {

    const [skill, setSkill] = useState(null)
    const {id} = useLocalSearchParams()
    const { fetchSkillById, deleteSkill } = useSkills()
    const router = useRouter()

    const handleDelete = async () =>
    {
      await deleteSkill(id)
      setSkill(null)
      router.replace('/skills')
    }




    useEffect(() => {

      async function loadSkill() {

        const skillData = await fetchSkillById(id)
        setSkill(skillData)
        
      }

      loadSkill()

    }, [id])

    


    if (!skill)
    {
      return (
        <ThemedView safe = {true} style = {styles.container}>
          <ThemedLoader/>
        </ThemedView>
      )
    }

  return (
    <ThemedView safe = {true} style={styles.container}>
        <Spacer/>
        <ThemedText style = {styles.title}>{skill.skill}</ThemedText>

        <ThemedButton style={styles.delete} onPress = {handleDelete}>
          <Text style = {{color: '#fff', textAlign: 'center'}}>
            Delete Skill
          </Text>
        </ThemedButton>
    </ThemedView>
  )
}



export default SkillDetails

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center"
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: "center",
        
    },
    delete:
    {
      marginTop: 40,
      backgroundColor: Colors.warning,
      width: 200,
      alignSelf: 'center'
    }
})