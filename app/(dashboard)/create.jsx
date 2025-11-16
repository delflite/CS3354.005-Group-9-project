import { Keyboard, StyleSheet, Text } from 'react-native'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import { TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import ThemedTextInput from '../../components/ThemedTextInput'
import { useSkills } from '../../hooks/useSkills'
import { useRouter } from 'expo-router'


const Create = () => {
  

  const [skill, setSkill] = useState("")
  const [loading, setLoading] = useState(false)

  const { createSkill } = useSkills()
  const router = useRouter()

  const pickImage = async() =>
  {
    const result = await ImagePicker.launchImageLibraryAsync
    ({
      mediaTypes: ['images'],
      allowsEditing: true
    })

  }

  const handleSubmit = async () =>
  {
    if (!skill.trim())
    {
      return
    }
    
    setLoading(true)
    
    await createSkill({skill})

    setSkill("")

    router.replace('/skills')

    setLoading(false)

  }

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <ThemedView style={styles.container}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.heading}>
        Add Skill
      </ThemedText>

      <TouchableOpacity onPress = {pickImage}>
        <Text style = {{color: 'white'}}>Upload Image</Text>
      </TouchableOpacity>

      <ThemedTextInput
        style = {styles.input}
        placeholder = "Skill"
        value = {skill}
        onChangeText = {setSkill}
      />
        
      

      <ThemedButton onPress = {handleSubmit} disabled = {loading}>
        <Text style = {{color: '#f2f2f2'}}>
          {loading ? "Saving..." : "Add Skill"}
        </Text>
      </ThemedButton>

    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

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
        fontSize: 18,
        textAlign: 'center'
    },
    input: {
      padding: 20,
      borderRadius: 6,
      alignSelf: 'stretch',
      marginHorizontal: 40

    },
    multiline: {
      padding: 20,
      borderRadius: 6,
      minHeight: 100,
      alignSelf: 'stretch',
      marginHorizontal: 40
    }

})