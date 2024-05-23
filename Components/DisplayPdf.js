import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const DisplayPdf = () => {
  const route = useRoute();
  const pdf_url = route.params?.pdf_url;
  return (
    <View style={styles.container}>
      <Text>{pdf_url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DisplayPdf