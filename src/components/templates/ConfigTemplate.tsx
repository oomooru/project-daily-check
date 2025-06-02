import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/Colors';

interface ConfigTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const ConfigTemplate: React.FC<ConfigTemplateProps> = ({ 
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
    backgroundColor: colors.background
  },
  statusBarPlaceHolder: {
    backgroundColor: colors.background
  },
  header: {
    alignItems: 'center',
    padding: 16,
    height: 72,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary
  },
  content: {
    flex: 1,
    backgroundColor: colors.background
  }
});
