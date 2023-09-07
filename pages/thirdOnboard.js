import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Image, LogBox, TouchableWithoutFeedback, Text } from "react-native";
import { useSpring, animated, config } from '@react-spring/native'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

function ThirdOnboard() {
  const navigation = useNavigation();
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadFontsAsync = async () => {
    await Font.loadAsync({
      'NunitoBlack': require('../assets/fonts/NunitoSans-Black.ttf'),
      'NunitoLight': require('../assets/fonts/NunitoSans-Light.ttf'),
      'NunitoRegular': require('../assets/fonts/NunitoSans-Regular.ttf'),
    });
  };

  const [toggle, setToggle] = useState(false)
  const [viewToggle, setViewToggle] = useState(false) 

  const buttonPress = () => {
    setToggle(true)
    setTimeout(() => {
      navigation.navigate("Home")
    }, 350);
  }

  const fillAnim = useSpring({
    from: { x: '0%' },
    to: { x: toggle ? '200%' : '0%' },
    config: toggle ? config.molasses : config.stiff,
  });

  const backgroundStyle = useSpring({
    backgroundColor: '#246A5D',
    position: 'absolute',
    borderRadius: 1000,
    bottom: toggle ? -80 : 80,
    zIndex: 1,
    config: toggle ? config.slow : config.stiff

  })

  const buttonStyle = useSpring({
    width: 300,
    height: 60,
    backgroundColor: "#79A3A2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.8,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 40,
    position: 'absolute',
    bottom: 80,
    zIndex: 2,
  })

  const viewStyle = useSpring({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: viewToggle ? 1 : 0,
    marginTop: viewToggle ? 0 : 50,
    config: config.slow,
    
  })

  const isFocused = useIsFocused();
  useEffect(() => {
    async function prepare() {
      try {
        await loadFontsAsync();

        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
      }
    }

    prepare();
    if (isFocused) {
      setViewToggle(true)
    } else {
      setTimeout(() => {
        setViewToggle(false)
        setToggle(false)
      }, 500);
    }
  }, [isFocused]);


  const onLayoutRootView = useCallback(async () => {
    if (dataLoaded) {

      await SplashScreen.hideAsync();
    }
  }, [dataLoaded]);

  if (!dataLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <animated.View style={{ ...viewStyle }}>
        <Image style={{ width: '100%', height: 'auto', aspectRatio: 1, }} source={require('../images/sched.gif')} />
        <Text style={styles.title}>Stay Organized</Text>
        <Text style={styles.body}>Time management can reduce your stress, </Text>
        <Text style={styles.body}>it just takes a little bit of planning.</Text>
        {/* <animated.View style={{ height: fillAnim.x, width: fillAnim.x, ...backgroundStyle }} /> */}
      </animated.View>

      <TouchableWithoutFeedback onPress={() => buttonPress()}>
        <animated.View style={{ ...buttonStyle }}>
          <Text style={styles.text}>Done</Text>
        </animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}
export default ThirdOnboard

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#76A29E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#246A5D',
    width: 300,
    height: 60,
    position: 'absolute',
    borderRadius: 90,
    bottom: 80,
  },
  background1: {
    backgroundColor: 'yellow',
    width: 90,
    height: 90,
    position: 'absolute',
    borderRadius: 30,
  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: '#236467',
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.8,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 40,
    position: 'absolute',
    bottom: 90,

  },
  text: {
    color: "#FFF",
    fontFamily: 'NunitoRegular',
    fontSize: 20
  },
  title: {
    color: 'white',
    fontFamily: "NunitoBlack",
    fontSize: 35,
  },
  body: {
    color: 'white',
    fontFamily: "NunitoLight",
    fontSize: 15,
  }

}); 