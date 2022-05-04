import { View, Text } from "react-native";
import React from "react";
import LottieView from 'lottie-react-native';
import { globalStyles } from '../styles/global';

const LoadingPage = () => {
  return (
    <View style={globalStyles.loading}>
      {/* <LottieView source={require('../../assets/loading_animate.json')} autoPlay /> */}
      <Text>LoadingPage</Text>
    </View>
  );
};

export default LoadingPage;