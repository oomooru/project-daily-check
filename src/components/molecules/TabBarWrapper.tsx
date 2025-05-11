import React from 'react';
import { View, StyleSheet } from 'react-native';
import FloatingButton from '../atoms/FloatingButton';

interface TabBarWrapperProps {
  children: React.ReactNode;
  onFloatingButtonPress: () => void;
}

const TabBarWrapper: React.FC<TabBarWrapperProps> = ({
  children,
  onFloatingButtonPress,
}) => {
  return (
    <View style={styles.container}>
      {children}
      <FloatingButton
        onPress={onFloatingButtonPress}
        style={styles.floatingButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 83 + 16,
    right: 16,
  },
});

export default TabBarWrapper;