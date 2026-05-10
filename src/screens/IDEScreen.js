import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme/colors';

export default function IDEScreen({ route }) {
  const { techId } = route.params || {};

  let uri = 'https://www.jdoodle.com/online-java-compiler/';
  if (techId === 'python') uri = 'https://www.jdoodle.com/python3-programming-online/';
  if (techId === 'html' || techId === 'css') uri = 'https://www.jdoodle.com/html-css-javascript-online-editor/';
  if (techId === 'react') uri = 'https://codesandbox.io/s/react-new';

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      />
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
});
