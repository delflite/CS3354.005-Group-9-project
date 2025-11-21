import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

import { allSkills } from '../constants/skills';

export default function SkillsByCategory() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Group skills by category
  const grouped = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <ThemedView style={styles.container}>
      <ThemedText title style={styles.header}>
        Skills by Category
      </ThemedText>

      <View style={styles.listContainer}>
        {Object.keys(grouped).map((category) => (
          <View key={category} style={styles.section}>
            <ThemedText title style={[styles.category, { color: theme.title }]}>
              {category}
            </ThemedText>

            {grouped[category].map((skill) => (
              <View key={skill.name} style={styles.skillItem}>
                <ThemedText style={styles.skillName}>• {skill.name}</ThemedText>

                <View style={styles.tagsContainer}>
                  {skill.tags.map((tag) => (
                    <ThemedText
                      key={tag}
                      style={[
                        styles.tag,
                        {
                          backgroundColor: theme.tagBackground || theme.background,
                          color: theme.text,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      {tag}
                    </ThemedText>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },

  listContainer: {
    width: '100%',
  },

  section: {
    marginBottom: 26,
  },

  category: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },

  skillItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },

  skillName: {
    fontSize: 16,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginLeft: 18,
  },

  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
});
