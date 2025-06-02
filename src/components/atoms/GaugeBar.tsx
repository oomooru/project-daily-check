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

export const GaugeBar = ({ progress, isBackgroundVisible = true }: { progress: number, isBackgroundVisible: boolean }) => {
  const widthAnim = useSharedValue(0);
  const [gaugeBarWidth, setGaugeBarWidth] = useState(0);

  useEffect(() => {
    if (gaugeBarWidth === 0) return;

    widthAnim.value = withTiming(Math.max(progress, (GAUGE_BAR_HEIGHT / gaugeBarWidth * 100)), {
      duration: 300,
      easing: Easing.out(Easing.exp)
    });
  }, [progress, gaugeBarWidth]);

  const handleGaugeBarLayout = useCallback((e: LayoutChangeEvent) => {
    setGaugeBarWidth(Math.ceil(e.nativeEvent.layout.width));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthAnim.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.gaugeBarWrapper}>
        {gaugeBarWidth === 0 && (
          <View 
            style={styles.gaugeBarCalc} 
            onLayout={(e) => handleGaugeBarLayout(e)} 
          />
        )}
      
        {gaugeBarWidth !== 0 && (
          <View style={[styles.gaugeBarBackground, {backgroundColor: isBackgroundVisible ? colors.secondary : ''}]}>
            <Animated.View style={[animatedStyle, styles.gaugeBar]} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gaugeBarWrapper: {
    alignItems: 'flex-start',
    width: '100%',
    height: GAUGE_BAR_HEIGHT,
    marginBottom: 16
  },
  gaugeBarBackground: {
    width: '100%',
    height: GAUGE_BAR_HEIGHT,
    borderRadius: GAUGE_BAR_HEIGHT / 2
  },
  gaugeBarCalc: {
    width: '100%',
    height: 0
  },
  gaugeBar: {
    height: GAUGE_BAR_HEIGHT,
    backgroundColor: colors.primary,
    borderRadius: GAUGE_BAR_HEIGHT / 2
  }
});
