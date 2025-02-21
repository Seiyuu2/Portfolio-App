import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
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
      description: `In a realm once blessed with divine magic and grandeur, the gods have long since abandoned their creation, leaving behind a world steeped in decay and despair. Once-celebrated cities and sacred pantheons are now mere shadows of their former glory, while the skies remain silent witnesses to a bygone golden age of heroic defiance and mythic battles.
  
  Cataclysmic events—most notably the Convergence—shattered ancient realms and reduced that illustrious era to scattered legends, leaving behind vast, perilous landscapes marked by the ruins of forgotten civilizations, ancient wars, and fractured magic.
  
  The world is as varied as it is desolate: grim industrial empires choke the heavens with smoke and machinery, while decaying knightly kingdoms cling to crumbling ideals of honor, masking deep-seated corruption. Diverse peoples—from venerable races like dwarves and elves to emergent groups such as tieflings and genasi—navigate these broken lands, where survival is a daily act of defiance against an encroaching void. In this harsh environment, even paladins and clerics question their faith, knights resort to mercenary lives, and mages flirt with forbidden arts in a relentless quest for meaning. Yet, amid the pervasive gloom, a spark of resilience endures—an indomitable will to kindle hope and forge a path forward, one defiant step at a time.`
    },
  
  

    {
      id: '2',
      title: 'Project Two: Age of Ashes Short Novel',
      description: `In a world reduced to ruins and silence, two solitary warriors meet in a final, fateful duel. Ark Sator—a man forged by loss and burdened with the memories of fallen comrades—fights not for survival but to honor the sacrifices of his past. Opposing him is the enigmatic 13th Blade, a tormented soul whose every strike is driven by grief and the desperate desire to erase the legacy of a broken world.
  
  Their battle unfolds against a backdrop of ash-choked skies and desolate plains, transforming each clash of steel into a symbolic struggle between the forces of remembrance and oblivion. Ultimately, the duel poses a haunting question: in a realm where even hope has turned to dust, can the valor of memory withstand the relentless pull of despair?`
    },
    {
      id: '3',
      title: 'Project Three: Redoran the Knight of the Broken Blade',
      description: `Redoran, once a knight of great promise, now wanders a haunted land carrying the weight of his own failures. His broken blade mirrors the fractures within his soul—a symbol of lost honor, regret, and the echoes of comrades he could not save. Reluctantly drawn into a quest for redemption, he is joined by the mysterious Lantern Bearer.
  
  Together, they traverse the cursed Ashen Vale, a realm where the past lives on through spectral warriors, twisted creatures, and the relentless manifestations of inner demons. Each step of Redoran’s journey forces him to confront the painful truths of his history, transforming brutal battles into moments of introspection. In the midst of a world steeped in sorrow and ruin, his struggle becomes not just a fight for survival, but a quest to reclaim his dignity—and to discover that even the most shattered soul can be mended.`
    },
  ];

  // Background image sources
  const lightBg = { uri: 'https://i.imgur.com/0QrXiV0.jpeg' }; // Light mode wallpaper
  const darkBg = { uri: 'https://i.imgur.com/zyldN83.png' };  // Dark mode wallpaper

  // Animated value for background crossfade
  const bgAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isDarkMode ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode, bgAnim]);

  // Interpolate opacities for light and dark backgrounds
  const lightOpacity = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const darkOpacity = bgAnim;

  const renderProject = ({ item }) => (
    <ProjectCard project={item} theme={theme} />
  );

  return (
    <View style={styles.container}>
      {/* Background Crossfade */}
      <Animated.Image
        source={lightBg}
        style={[styles.imageBackground, { opacity: lightOpacity }]}
        resizeMode="cover"
      />
      <Animated.Image
        source={darkBg}
        style={[styles.imageBackground, { opacity: darkOpacity }]}
        resizeMode="cover"
      />

      {/* Main Content */}
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
              <Image source={require('./assets/LyleMain.jpg')} style={styles.profileImage} />

                <Text style={[styles.name, { color: theme.text }]}>
                  Kurt Lyle T. Paulino
                </Text>
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
    </View>
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
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject, 
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  // Section wrapper: ensures the section container is centered
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
    width: '50%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginTop: 10,
  },
});
