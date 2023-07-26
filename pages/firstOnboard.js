import React, { Component } from "react";
import { StyleSheet, View, Animated, Image, LogBox, TouchableWithoutFeedback, Text } from "react-native";
import { withNavigation } from 'react-navigation';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(['expo-app-loading', '[SECURITY] node-uuid', 'expo-permissions']);

let customFonts = {
  'NunitoBlack': require('../assets/fonts/NunitoSans-Black.ttf'),
  'NunitoLight': require('../assets/fonts/NunitoSans-Light.ttf'),
  'NunitoRegular': require('../assets/fonts/NunitoSans-Regular.ttf'),
};

class FirstOnboard extends Component {
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
      duration: 700,

    }).start()

    setTimeout(() => {
      this.props.navigation.navigate("SecondOnboard")
    }, 300);
  }

  changeColor() {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState })
  }

  buttonPress() {
    this.toggleOpen();
    this.changeColor();
  }

  render() {
    const { toggle } = this.state;
    const buttonBg = toggle ? "#236467" : "#246A5D";

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
        <Image style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/braincard.gif')} />
        <Text style={styles.title}>Mental Wellness</Text>
        <Text style={styles.body}>Your self-care journey begins here.</Text>
        <Animated.View style={[styles.background, backgroundStyle]} >
        </Animated.View>

        <TouchableWithoutFeedback onPress={() => this.buttonPress()}>
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
            <Text style={styles.text}>Next</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );

  }
}

export default withNavigation(FirstOnboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#236467',
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