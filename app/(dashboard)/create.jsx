import { Keyboard, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useSkills } from '../../hooks/useSkills'
import { useRouter } from 'expo-router'
import { TouchableWithoutFeedback } from 'react-native'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { launchImageLibrary } from 'react-native-image-picker'
import { storage } from '../../lib/appwrite'
import { ID} from 'appwrite'
import { Image } from 'react-native'


const Create = () => {

  const [skill, setSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()

  const {createSkill} = useSkills()
  const router = useRouter()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsEditing: true
    })

    if (!result.canceled)
    {
      setImage(result.assets[0])
      
    }
  }

  const uploadImageToAppwrite = async(image) => {

    if(!image) return null

    

    try{

      const result = await storage.createFile({
        bucketId: '69045ed10026d56ca66a',
        fileId: ID.unique(),
        file: {
          name: image.name || `skill-${Date.now()}.png`,
          type: image.type,
          size: image.size || 0,
          uri: image.uri,
          
        },
        permissions: []
        
        
    })
      return result.$id
    
    }catch (error){
      console.error("Error uploading file: ", error)
      return null
    }

  }
  
    
  

  const handleSubmit = async () =>{
    if(!skill.trim()) return

    setLoading(true)

    try {
      //const imageFileId = await uploadImageToAppwrite(image)
      
      
      /*await createSkill({
        skill,
        imageFileId
      })*/

      setSkill("")
      router.replace('/skills')
    }catch (error){
      console.log("Error creating skill: ", error)
    }

    setLoading(false)
    
  }

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <ThemedView style={styles.container}>

      <Spacer/>
      <ThemedText title = {true} style = {styles.heading}>
        Add Skill
      </ThemedText>

      <Spacer/>

      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: 'white', textDecorationLine: 'underline' }}>
          {image ? 'Change Image' : 'Upload Image'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source = {{uri: image.uri}}
          style = {{width: 120, height: 100, marginTop: 10, borderRadius: 6}}
        />
      )}

      <Spacer/>

      <ThemedTextInput
        style = {styles.input}
        placeholder = "Skill"
        value = {skill}
        onChangeText = {setSkill}
      />

      <Spacer/>

      <ThemedButton onPress = {handleSubmit} disabled = {loading}>
        <Text style = {{color: '#fff'}}>
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