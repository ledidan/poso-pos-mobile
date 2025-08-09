// file: Ripple.js
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from "react-native-reanimated";

const Ripple = ({ delay }) => {
  const rippleAnimation = useSharedValue(0);

  useEffect(() => {
    rippleAnimation.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.out(Easing.ease),
        }),
        -1,
        false
      )
    );
  }, [rippleAnimation, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 1 + rippleAnimation.value * 3;
    const opacity = 0.5 * (1 - rippleAnimation.value);

    return {
      transform: [{ scale: scale }],
      opacity: opacity,
    };
  });

  return <Animated.View style={[styles.ripple, animatedStyle]} />;
};

const styles = StyleSheet.create({
  ripple: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 122, 255, 0.5)",
  },
});

export default Ripple;