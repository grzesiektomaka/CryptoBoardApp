import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

import animations from '../assets/animations/8707-loading.json'
 
export default class Loader extends React.Component {

  render() {
    return (
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={animations}
        animationStyle={styles.lottie}
        speed={1}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});