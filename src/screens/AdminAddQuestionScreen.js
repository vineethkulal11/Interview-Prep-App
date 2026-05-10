import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';
import { categories, technologies } from '../data/initialData';
import { colors } from '../theme/colors';

export default function AdminAddQuestionScreen({ navigation }) {
  const { addQuestion } = useContext(AppContext);
  const [selectedTech, setSelectedTech] = useState(technologies[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [example, setExample] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!question || !answer) {
      Alert.alert('Error', 'Question and Answer are required');
      return;
    }
    
    addQuestion(selectedTech, selectedCategory, { question, answer, example, image: imageUri });
    Alert.alert('Success', 'Question added successfully', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Select Technology</Text>
      <View style={styles.categoryContainer}>
        {technologies.map((tech) => (
          <TouchableOpacity
            key={tech.id}
            style={[
              styles.categoryChip,
              selectedTech === tech.id && { backgroundColor: tech.color, borderColor: tech.color }
            ]}
            onPress={() => setSelectedTech(tech.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedTech === tech.id && { color: '#fff' }
            ]}>{tech.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Difficulty</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === cat.id && { color: '#fff' }
            ]}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Question</Text>
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="Enter question"
        multiline
      />

      <Text style={styles.label}>Answer</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Enter detailed answer"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Code Example (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea, styles.codeArea]}
        value={example}
        onChangeText={setExample}
        placeholder="Enter code snippet"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Attach Image (Optional)</Text>
      <View style={styles.imageButtonsRow}>
        <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
          <Text style={styles.imageBtnText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBtn} onPress={takePhoto}>
          <Text style={styles.imageBtnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Question</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 120,
  },
  codeArea: {
    fontFamily: 'monospace',
    backgroundColor: '#F1F5F9',
  },
  imageButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  imageBtn: {
    flex: 1,
    backgroundColor: colors.border,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageBtnText: {
    color: colors.text,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
