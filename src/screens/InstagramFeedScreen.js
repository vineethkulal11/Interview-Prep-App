import React, { useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { colors } from '../theme/colors';

export default function InstagramFeedScreen({ route, navigation }) {
  const { userRole, savePost } = useContext(AppContext);
  let initialUrl = route.params?.url || 'https://www.instagram.com/explore/tags/codinginterview/';
  
  // Transform post URLs to embed format to bypass login when directly accessing a post
  if (route.params?.url) {
    if ((initialUrl.includes('/p/') || initialUrl.includes('/reel/')) && !initialUrl.includes('embed')) {
      initialUrl = initialUrl.split('?')[0]; // Remove query params
      if (!initialUrl.endsWith('/')) {
        initialUrl += '/';
      }
      initialUrl += 'embed/';
    }
  }

  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  const handleSave = () => {
    let urlToSave = currentUrl;
    // Save the standard URL instead of the embed URL if it was converted
    if (urlToSave.includes('/embed')) {
      urlToSave = urlToSave.replace(/\/embed\/?$/, '/');
    }

    if (urlToSave.includes('instagram.com')) {
      savePost(urlToSave);
      Alert.alert('Success', 'Post saved to curated list!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', 'Not a valid Instagram URL.');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: initialUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        onNavigationStateChange={(navState) => {
          setCurrentUrl(navState.url);
        }}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      />
      
      {/* Show floating Save button only to admins when exploring (not viewing a specific saved post) */}
      {userRole === 'admin' && !route.params?.url && (
        <TouchableOpacity style={styles.floatingBtn} onPress={handleSave}>
          <Ionicons name="bookmark" size={24} color="#fff" />
          <Text style={styles.floatingBtnText}>Save Current View</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    gap: 8,
  },
  floatingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
