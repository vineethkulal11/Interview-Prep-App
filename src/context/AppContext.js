import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialQuestions } from '../data/initialData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('user'); // default is user (guest)
  const [currentUser, setCurrentUser] = useState(null);
  const [questions, setQuestions] = useState(initialQuestions);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedQuestions = await AsyncStorage.getItem('@tech_questions');
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        }
        
        const storedPosts = await AsyncStorage.getItem('@saved_posts');
        if (storedPosts) {
          setSavedPosts(JSON.parse(storedPosts));
        }

        const loggedInUser = await AsyncStorage.getItem('@current_user');
        if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          setCurrentUser(user);
          setUserRole(user.role);
        }
      } catch (e) {
        console.error('Failed to load data from storage', e);
      }
    };
    loadData();
  }, []);

  const addQuestion = async (techId, categoryId, newQuestion) => {
    const updatedQuestions = { ...questions };
    if (!updatedQuestions[techId]) updatedQuestions[techId] = {};
    if (!updatedQuestions[techId][categoryId]) updatedQuestions[techId][categoryId] = [];
    
    updatedQuestions[techId][categoryId].push({
      id: Date.now().toString(),
      ...newQuestion
    });
    
    setQuestions(updatedQuestions);
    await AsyncStorage.setItem('@tech_questions', JSON.stringify(updatedQuestions));
  };

  const savePost = async (url) => {
    // Avoid duplicates
    if (!savedPosts.some(post => post.url === url)) {
      const newPost = { id: Date.now().toString(), url, dateAdded: new Date().toISOString() };
      const updatedPosts = [newPost, ...savedPosts];
      setSavedPosts(updatedPosts);
      await AsyncStorage.setItem('@saved_posts', JSON.stringify(updatedPosts));
    }
  };

  const removePost = async (id) => {
    const updatedPosts = savedPosts.filter(post => post.id !== id);
    setSavedPosts(updatedPosts);
    await AsyncStorage.setItem('@saved_posts', JSON.stringify(updatedPosts));
  };

  const login = async (email, password) => {
    // Hardcoded admin for simplicity, but could be fetched from DB
    if (email === 'admin@admin.com' && password === 'admin') {
      const user = { email, role: 'admin' };
      setCurrentUser(user);
      setUserRole('admin');
      await AsyncStorage.setItem('@current_user', JSON.stringify(user));
      return true;
    }
    throw new Error('Invalid admin credentials');
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserRole('user'); // Revert to guest user
    await AsyncStorage.removeItem('@current_user');
  };

  return (
    <AppContext.Provider value={{ 
      userRole, currentUser, questions, savedPosts, 
      login, logout, addQuestion, savePost, removePost 
    }}>
      {children}
    </AppContext.Provider>
  );
};
