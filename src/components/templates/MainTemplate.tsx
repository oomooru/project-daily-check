import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MainTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({ 
  header, 
  content 
}) => {

  const {top} = useSafeAreaInsets();

  return(
    <View style={styles.container}>
      <View style={[styles.statusBarPlaceHolder, {height: top}]} />
      <View style={styles.header}>{header}</View>
      <View style={styles.content}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarPlaceHolder: {
    backgroundColor: '#fff'
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  content: {
    flex: 1
  }
});
