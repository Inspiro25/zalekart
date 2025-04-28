import React, { useEffect } from "react";
import { Text, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

interface AnimatedLogoProps {
  onPress?: () => void;
}

const AnimatedLogo = ({ onPress }: AnimatedLogoProps) => {
  const { isDarkMode } = useTheme();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withTiming(isDarkMode ? 1 : 0, { duration: 500 });
  }, [isDarkMode]);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 15, stiffness: 100 }),
    );

    rotate.value = withSequence(
      withTiming(0.05, { duration: 100, easing: Easing.inOut(Easing.quad) }),
      withTiming(-0.05, { duration: 200, easing: Easing.inOut(Easing.quad) }),
      withTiming(0, { duration: 100, easing: Easing.inOut(Easing.quad) }),
    );

    if (onPress) onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}rad` }],
      color: interpolateColor(
        colorProgress.value,
        [0, 1],
        ["#ffffff", "#ffffff"],
      ),
    };
  });

  const letterAnimations = Array.from("ZaleKart").map((_, index) => {
    const delay = index * 50;
    const letterScale = useSharedValue(1);

    const letterStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: letterScale.value }],
      };
    });

    const animateLetter = () => {
      letterScale.value = withSequence(
        withTiming(1.4, { duration: 150, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 150, easing: Easing.inOut(Easing.quad) }),
      );
    };

    useEffect(() => {
      setTimeout(() => {
        animateLetter();
      }, delay);
    }, []);

    return { letterStyle, animateLetter };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle} className="flex-row">
        {Array.from("ZaleKart").map((letter, index) => (
          <Animated.Text
            key={index}
            style={letterAnimations[index].letterStyle}
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-white"}`}
          >
            {letter}
          </Animated.Text>
        ))}
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedLogo;
