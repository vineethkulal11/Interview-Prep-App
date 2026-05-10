import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

import LoginScreen from '../screens/LoginScreen';
import TechnologiesScreen from '../screens/TechnologiesScreen';
import LevelsScreen from '../screens/LevelsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import QuestionDetailScreen from '../screens/QuestionDetailScreen';
import AdminAddQuestionScreen from '../screens/AdminAddQuestionScreen';
import IDEScreen from '../screens/IDEScreen';
import InstagramFeedScreen from '../screens/InstagramFeedScreen';
import SavedPostsScreen from '../screens/SavedPostsScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userRole, logout } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Technologies"
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerText,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Technologies" 
          component={TechnologiesScreen} 
          options={({ navigation }) => ({ 
            title: userRole === 'admin' ? 'Admin Dashboard' : 'Interview Prep',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => userRole === 'admin' ? logout() : navigation.navigate('Login')} 
                style={{ marginRight: 10 }}
              >
                <Ionicons name={userRole === 'admin' ? "log-out-outline" : "shield-half-outline"} size={28} color={colors.headerText} />
              </TouchableOpacity>
            ),
            headerLeft: userRole === 'admin' ? () => (
              <TouchableOpacity onPress={() => navigation.navigate('AdminAddQuestion')} style={{ marginLeft: 10 }}>
                <Ionicons name="add-circle" size={24} color={colors.secondary} />
              </TouchableOpacity>
            ) : null,
          })} 
        />
        <Stack.Screen 
          name="Levels" 
          component={LevelsScreen} 
          options={({ route }) => ({ title: route.params.techTitle })} 
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen} 
          options={({ route }) => ({ title: route.params.title })} 
        />
        <Stack.Screen 
          name="QuestionDetail" 
          component={QuestionDetailScreen} 
          options={{ title: 'Detail' }} 
        />
        <Stack.Screen 
          name="AdminAddQuestion" 
          component={AdminAddQuestionScreen} 
          options={{ title: 'Add New Question' }} 
        />
        <Stack.Screen 
          name="IDE" 
          component={IDEScreen} 
          options={({ route }) => ({ 
            title: `Practice IDE` 
          })} 
        />
        <Stack.Screen 
          name="InstagramFeed" 
          component={InstagramFeedScreen} 
          options={{ title: 'Instagram Tips' }} 
        />
        <Stack.Screen 
          name="SavedPosts" 
          component={SavedPostsScreen} 
          options={{ title: 'Curated Reels' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
