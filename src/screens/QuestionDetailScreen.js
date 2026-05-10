import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { translateText, INDIAN_LANGUAGES } from '../utils/translate';

export default function QuestionDetailScreen({ route, navigation }) {
  const { question } = route.params;
  
  const [selectedLang, setSelectedLang] = useState('en');
  const [translatedQuestion, setTranslatedQuestion] = useState(question.question);
  const [translatedAnswer, setTranslatedAnswer] = useState(question.answer);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleLanguageChange = async (langCode) => {
    if (langCode === selectedLang) return;
    
    setSelectedLang(langCode);
    if (langCode === 'en') {
      setTranslatedQuestion(question.question);
      setTranslatedAnswer(question.answer);
      return;
    }

    setIsTranslating(true);
    try {
      const q = await translateText(question.question, langCode);
      const a = await translateText(question.answer, langCode);
      setTranslatedQuestion(q);
      setTranslatedAnswer(a);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const renderLangItem = ({ item }) => {
    const isSelected = selectedLang === item.code;
    return (
      <TouchableOpacity 
        style={[styles.langBadge, isSelected && styles.langBadgeSelected]}
        onPress={() => handleLanguageChange(item.code)}
      >
        <Text style={[styles.langText, isSelected && styles.langTextSelected]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.langSelector}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={INDIAN_LANGUAGES}
          keyExtractor={item => item.code}
          renderItem={renderLangItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {isTranslating && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loaderText}>Translating to {INDIAN_LANGUAGES.find(l => l.code === selectedLang)?.name}...</Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Q</Text>
          </View>
          <Text style={styles.questionTitle}>{translatedQuestion}</Text>
        </View>

        {question.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: question.image }} style={styles.questionImage} />
          </View>
        )}

        <View style={styles.answerSection}>
          <Text style={styles.sectionTitle}>Answer</Text>
          <Text style={styles.answerText}>{translatedAnswer}</Text>
        </View>

        {question.example ? (
          <View style={styles.exampleSection}>
            <Text style={styles.sectionTitle}>Example (Code)</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{question.example}</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity 
          style={styles.ideButton}
          onPress={() => navigation.navigate('IDE', { techId: route.params?.techId })}
        >
          <Ionicons name="code-slash" size={24} color="#fff" />
          <Text style={styles.ideButtonText}>Try in IDE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  langSelector: {
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  langBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  langTextSelected: {
    color: '#fff',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: colors.primary + '10',
    padding: 8,
    borderRadius: 8,
  },
  loaderText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  imageContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  questionImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  answerSection: {
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  answerText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  exampleSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    marginBottom: 24,
  },
  codeBlock: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  codeText: {
    color: '#E2E8F0',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
  },
  ideButton: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  ideButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
