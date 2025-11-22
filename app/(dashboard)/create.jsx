import { Keyboard, StyleSheet, Text, View } from 'react-native'
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
import { Picker } from '@react-native-picker/picker'

// ...existing code...
const Create = () => {
  
  const [skill, setSkill] = useState("")
  const [skillType, setSkillType] = useState("have")
  const [category, setCategory] = useState("cooking") // added category state
  const [showCategories, setShowCategories] = useState(false)
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
    
    await createSkill({

      skill: skill,
      skillType: skillType,
      category: category // include selected category
    })

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

      <Spacer/>

      <ThemedTextInput
        style = {styles.input}
        placeholder = "Skill"
        value = {skill}
        onChangeText = {setSkill}
      />

      {/* Category dropdown (simple, no external package) */}
      <View style={{ width: '80%', marginTop: 12 }}>
        <TouchableOpacity
          onPress={() => setShowCategories(v => !v)}
          style={styles.selector}
        >
          <Text style={styles.selectorText}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>

        {showCategories && (
          <View style={styles.dropdown}>
            {['cooking','handiwork','technical','sports'].map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => { setCategory(c); setShowCategories(false); Keyboard.dismiss(); }}
                style={[styles.option, c === category && styles.selectedOption]}
              >
                <Text style={[styles.optionText, c === category && styles.selectedOptionText]}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <TouchableOpacity onPress={() => setSkillType("teach")}>
          <Text style={{ padding: 10, color: "white",backgroundColor: skillType === "teach" ? "#045f16ff" : "#68090eff" }}>
            Teach
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSkillType("learn")}>
          <Text style={{ padding: 10, color: "white",backgroundColor: skillType === "learn" ? "#045f16ff" : "#68090eff" }}>
            Learn
          </Text>
        </TouchableOpacity>
      </View>

      <Spacer/>

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
   selector: {
     paddingVertical: 12,
     paddingHorizontal: 14,
     borderRadius: 6,
     borderWidth: 1,
     borderColor: '#444',
     backgroundColor: 'transparent'
   },
   selectorText: {
     color: 'white'
   },
   dropdown: {
     marginTop: 8,
     borderRadius: 6,
     overflow: 'hidden',
     borderWidth: 1,
     borderColor: '#333'
   },
   option: {
     paddingVertical: 10,
     paddingHorizontal: 12,
     backgroundColor: '#111',
   },
   optionText: {
     color: 'white'
   },
   selectedOption: {
     backgroundColor: '#045f16ff'
   },
   selectedOptionText: {
     color: '#fff',
     fontWeight: '600'
   },
    multiline: {
      padding: 20,
      borderRadius: 6,
      minHeight: 100,
      alignSelf: 'stretch',
      marginHorizontal: 40
    }

})