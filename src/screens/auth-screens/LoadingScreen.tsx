import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Animated} from 'react-native';

interface Props {
  navigation: any;
}

const LoadingScreen = ({navigation}: Props) => {
  const [logoIndex, setLogoIndex] = useState(0);
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
    navigateToHomeScreen();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start(() => {
      setLogoIndex(logoIndex + 1);
    });
  };

  const navigateToHomeScreen = () => {
    setTimeout(() => {
      navigation.navigate('DashboardScreen');
    }, 5000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Image
        source={require('../../../assets/images/logo.png')}
        style={{
          overflow: 'hidden',
          opacity: opacityValue,
        }}
      />
    </View>
  );
};

export default LoadingScreen;
