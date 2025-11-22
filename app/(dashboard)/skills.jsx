import { StyleSheet, FlatList, Pressable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useSkills } from '../../hooks/useSkills'
import { Colors } from '../../constants/Colors'
import ThemedCard from '../../components/ThemedCard'
import { useRouter } from 'expo-router'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'cooking', label: 'Cooking' },
  { key: 'handiwork', label: 'Handiwork' },
  { key: 'technical', label: 'Technical' },
  { key: 'sports', label: 'Sports' },
]

const Skills = () => {
  const { skills } = useSkills()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCategories, setShowCategories] = useState(false)

  const filtered = skills.filter(
    (s) => selectedCategory === 'all' || (s.category && s.category === selectedCategory)
  )

  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Skills
      </ThemedText>
      <Spacer />

      <ThemedCard style={styles.card}>
        <ThemedText style={{ marginBottom: 8 }}>Category</ThemedText>

        <Pressable onPress={() => setShowCategories((v) => !v)} style={styles.selector}>
          <ThemedText>{categories.find(c => c.key === selectedCategory)?.label ?? 'Select'}</ThemedText>
        </Pressable>

        {showCategories && (
          <View style={styles.dropdown}>
            {categories.map((c) => (
              <Pressable
                key={c.key}
                onPress={() => { setSelectedCategory(c.key); setShowCategories(false) }}
                style={[styles.option, c.key === selectedCategory && styles.selectedOption]}
              >
                <ThemedText style={c.key === selectedCategory ? styles.selectedOptionText : null}>
                  {c.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </ThemedCard>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/skills/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.skill}</ThemedText>
              {item.category ? <ThemedText>{item.category}</ThemedText> : null}
            </ThemedCard>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ThemedText style={{ marginTop: 20 }}>No skills in this category.</ThemedText>}
      />
    </ThemedView>
  )
}

export default Skills

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 18
  },
  list: {
    marginTop: 20,
    paddingBottom: 40
  },
  card: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },

  selector: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'transparent'
  },
  dropdown: {
    marginTop: 8,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff'
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  selectedOption: {
    backgroundColor: Colors.primary
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600'
  }
})