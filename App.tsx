import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Switch,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  // Define theme colors based on dark mode state
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#121212',
    card: isDarkMode ? '#1E1E1E' : '#F8F8F8',
    accent: isDarkMode ? '#BB86FC' : '#6200EE',
  };

  // Dummy project data with additional details and an image URL
  const projects = [
    {
      id: '1',
      title: 'Project One',
      description:
        'A cool project built with React Native. It features dynamic UI elements and thoughtful design to deliver a great user experience.',
      image: 'https://placekitten.com/300/200',
    },
    {
      id: '2',
      title: 'Project Two',
      description:
        'An amazing project built with Expo that showcases innovative ideas and efficient coding practices.',
      image: 'https://placekitten.com/301/200',
    },
    {
      id: '3',
      title: 'Project Three',
      description:
        'A portfolio piece highlighting mobile development skills with interactive elements and smooth animations.',
      image: 'https://placekitten.com/302/200',
    },
  ];

  const renderProject = ({ item }) => (
    <ProjectCard project={item} theme={theme} />
  );

  return (
    <FlatList
      // Apply the container style including background color here
      style={[styles.container, { backgroundColor: theme.background }]}
      ListHeaderComponent={
        <>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://placekitten.com/200/200' }}
              style={styles.profileImage}
            />
            <Text style={[styles.name, { color: theme.text }]}>John Doe</Text>
            <Text style={[styles.bio, { color: theme.text }]}>
              Mobile Developer with a passion for building beautiful and functional
              applications.
            </Text>
          </View>

          {/* Skills Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Skills</Text>
            <View style={styles.skillsContainer}>
              {['React Native', 'React', 'Node.js', 'Expo', 'JavaScript'].map(
                (skill) => (
                  <View
                    key={skill}
                    style={[styles.skillBadge, { backgroundColor: theme.accent }]}
                  >
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                )
              )}
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact</Text>
            <Text style={[styles.contactText, { color: theme.text }]}>
              Email: johndoe@example.com
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://linkedin.com/in/johndoe')}
            >
              <Text style={[styles.contactLink, { color: theme.accent }]}>
                LinkedIn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/johndoe')}>
              <Text style={[styles.contactLink, { color: theme.accent }]}>GitHub</Text>
            </TouchableOpacity>
          </View>

          {/* Projects Section Header */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Projects</Text>
          </View>
        </>
      }
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={renderProject}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={
        <View style={styles.section}>
          {/* Theme Toggle Section */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Theme Toggle
          </Text>
          <View style={styles.toggleContainer}>
            <Text style={{ color: theme.text }}>Light</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleSwitch}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={{ color: theme.text }}>Dark</Text>
          </View>
        </View>
      }
    />
  );
}

// ProjectCard component to render individual project items with expandable details
function ProjectCard({ project, theme }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <TouchableOpacity
      onPress={toggleExpanded}
      activeOpacity={0.8}
      style={[styles.projectCard, { backgroundColor: theme.card }]}
    >
      <Text style={[styles.projectTitle, { color: theme.text, textAlign: 'center' }]}>
        {project.title}
      </Text>
      {expanded && (
        <View style={styles.projectDetails}>
          <Text
            style={[
              styles.projectDescription,
              { color: theme.text, textAlign: 'center' },
            ]}
          >
            {project.description}
          </Text>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center', // Center all content horizontally
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 14,
    color: '#fff',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  contactLink: {
    fontSize: 16,
    marginBottom: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  projectCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDetails: {
    marginTop: 10,
    alignItems: 'center',
  },
  projectDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  projectImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: 10,
  },
});
