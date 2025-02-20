// Test comment
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Switch,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => setIsDarkMode(prev => !prev);

  // Define theme colors based on dark mode state
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#121212',
    card: isDarkMode ? '#1E1E1E' : '#F8F8F8',
    accent: isDarkMode ? '#BB86FC' : '#6200EE',
  };

  // Compute the wrapper background: semi-transparent white for light mode, grey for dark mode
  const wrapperBg = isDarkMode ? 'rgba(128,128,128,0.5)' : 'rgba(255,255,255,0.7)';

  // Dummy project data with additional details and an image URL
  const projects = [
    {
      id: '1',
      title: 'Project One: DnD Canrael',
      description:
        'A Vast DND world with expansive lore and 4 Continents and a fully homebrew setting, a Grimdark Post Modern world where the age of machines has long since come to an end, where magic is the poison which is the bane of the old worlds life. A 5e Adventure that has spanned 6 years of my life already.',
      image: 'https://placekitten.com/300/200',
    },
    {
      id: '2',
      title: 'Project Two: Age of Ashes Short Novel',
      description:
        'A Short story set in Canrael',
      image: 'https://placekitten.com/301/200',
    },
    {
      id: '3',
      title: 'Project Three: Redoran the Knight of the Broken Blade',
      description:
        'A Short story set in Canrael',
      image: 'https://placekitten.com/302/200',
    },
  ];

  // Conditional background image sources
  const lightBg = { uri: 'https://i.imgur.com/0QrXiV0.jpeg' }; // Light mode wallpaper
  const darkBg = { uri: 'https://i.imgur.com/zyldN83.png' };  // Dark mode wallpaper

  const renderProject = ({ item }) => (
    <ProjectCard project={item} theme={theme} />
  );

  return (
    <ImageBackground
      source={isDarkMode ? darkBg : lightBg}
      style={[styles.imageBackground, { backgroundColor: theme.background }]}
      resizeMode="cover"
    >
      <FlatList
        style={styles.flatList}
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            {/* Profile Section */}
            <View style={[styles.sectionWrapper, { backgroundColor: wrapperBg }]}>
              <View style={styles.header}>
                <Image
                  source={{ uri: 'https://placekitten.com/200/200' }}
                  style={styles.profileImage}
                />
                <Text style={[styles.name, { color: theme.text }]}>Kurt Lyle T. Paulino</Text>
                <Text style={[styles.bio, { color: theme.text }]}>
                  A Writer, Gamer, Computer Science student currently semi active as a voice actor and novelist!
                </Text>
              </View>
            </View>

            {/* Skills Section */}
            <View style={[styles.sectionWrapper, { backgroundColor: wrapperBg }]}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {['Writing', 'React', 'React Native', 'Voice Acting', 'League of Legends'].map(
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
            </View>

            {/* Contact Section */}
            <View style={[styles.sectionWrapper, { backgroundColor: wrapperBg }]}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact</Text>
                <Text style={[styles.contactText, { color: theme.text }]}>
                  Email: Kurt_Lyle_Paulino@dlsl.edu.ph
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://www.instagram.com/sei__taku/')}
                >
                  <Text style={[styles.contactLink, { color: theme.accent }]}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Seiyuu2')}>
                  <Text style={[styles.contactLink, { color: theme.accent }]}>GitHub</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Projects Section Header */}
            <View style={[styles.sectionWrapper, { backgroundColor: wrapperBg }]}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Projects</Text>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={[styles.sectionWrapper, { backgroundColor: wrapperBg }]}>
            <View style={styles.section}>
              {/* Theme Toggle Section */}
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Theme Toggle</Text>
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
          </View>
        }
      />
    </ImageBackground>
  );
}

// ProjectCard component to render individual project items with expandable details
function ProjectCard({ project, theme }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(prev => !prev);

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
          <Text style={[styles.projectDescription, { color: theme.text, textAlign: 'center' }]}>
            {project.description}
          </Text>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  // Section wrapper: now dynamically styled via inline prop; base styles remain for padding & borderRadius
  sectionWrapper: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    padding: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 10,
    width: '100%',
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
    width: '60%',
    marginTop: 10,
  },
});
