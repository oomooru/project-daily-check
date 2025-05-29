import { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { colors } from '../../constants/Colors';

const GAUGE_BAR_HEIGHT = 24;

export const GaugeBar = ({ progress }: { progress: number }) => {
  const widthAnim = useSharedValue(0);
  const [gaugeBarWidth, setGaugeBarWidth] = useState(0);

  useEffect(() => {
    widthAnim.value = withTiming(Math.max(progress, (GAUGE_BAR_HEIGHT / gaugeBarWidth * 100)), {
      duration: 300,
      easing: Easing.out(Easing.exp)
    });
  }, [progress]);

  const handleGaugeBarLayout = useCallback((e: LayoutChangeEvent) => {
    setGaugeBarWidth(Math.ceil(e.nativeEvent.layout.width));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthAnim.value}%`,
  }));

  return (
    <View style={styles.container}>
      {gaugeBarWidth === 0 && (
        <View 
          style={[styles.gaugeBarBackground, {height: 0}]} 
          onLayout={(e) => handleGaugeBarLayout(e)} 
        />
      )}
    
      {gaugeBarWidth !== 0 && (
        <View style={styles.gaugeBarBackground}>
          <Animated.View style={[animatedStyle, styles.gaugeBar]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    height: GAUGE_BAR_HEIGHT,
    marginBottom: 16
  },
  gaugeBarBackground: {
    width: '100%',
    height: GAUGE_BAR_HEIGHT,
    backgroundColor: colors.secondary,
    borderRadius: GAUGE_BAR_HEIGHT / 2
  },
  gaugeBar: {
    height: GAUGE_BAR_HEIGHT,
    backgroundColor: colors.primary,
    borderRadius: GAUGE_BAR_HEIGHT / 2
  }
});
