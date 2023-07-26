import React, { Component } from "react";
import { StyleSheet, View, Animated, Image, TouchableWithoutFeedback, Text } from "react-native";
import { withNavigation } from 'react-navigation';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  'OpenSemi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
  'OpenReg': require('../assets/fonts/OpenSans-Regular.ttf'),
  'OpenExtra': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  'OpenBold': require('../assets/fonts/OpenSans-Bold.ttf'),
  'NunitoBold': require('../assets/fonts/NunitoSans-Bold.ttf'),
  'NunitoBlack': require('../assets/fonts/NunitoSans-Black.ttf'),
  'NunitoLight': require('../assets/fonts/NunitoSans-Light.ttf'),
  'NunitoRegular': require('../assets/fonts/NunitoSans-Regular.ttf'),
};

class ThirdOnboard extends Component {
  state = {
    toggle: true,
    animation: new Animated.Value(0),
    fontsLoaded: false,
  }

  async componentDidMount() {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 100);
    await this._loadFontsAsync();
  }

  _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  };

  toggleOpen = () => {
    Animated.timing(this.state.animation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 0,

    }).start()

    setTimeout(() => {
      this.props.navigation.navigate("Home")
    }, 300);
  }

  changeColor() {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState })
  }

  buttonPress() {
    this.toggleOpen();
  }

  render() {
    const { toggle } = this.state;
    const buttonBg = toggle ? "#79A3A2" : "#246A5D";

    const scaleInterpolate = this.state.animation.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [0, 50]
      }

    )
    const backgroundStyle = {
      transform: [
        {
          scale: scaleInterpolate,
        }
      ]

    }

    return (
      <View style={styles.container}>

        <Image style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/sched.gif')} />
        <Text style={styles.title}>Stay Organized</Text>
        <Text style={styles.body}>Time management can reduce your stress, </Text>
        <Text style={styles.body}>it just takes a little bit of planning.</Text>
        <Animated.View style={[styles.background, backgroundStyle]} >
        </Animated.View>


        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Home")}>
          <View style={{
            width: 300,
            height: 60,
            backgroundColor: buttonBg,
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
          }}>
            <Text style={styles.text}>Done</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );

  }
}

export default withNavigation(ThirdOnboard);

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