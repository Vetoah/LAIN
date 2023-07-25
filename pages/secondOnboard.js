import React, { Component } from "react";
import { StyleSheet, View, Animated, Text, TouchableWithoutFeedback, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';


let customFonts = {
  'OpenSemi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
  'OpenReg': require('../assets/fonts/OpenSans-Regular.ttf'),
  'OpenExtra': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  'OpenBold': require('../assets/fonts/OpenSans-Bold.ttf'),
};

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0)
  }
  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }
  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [.85, 1]
                })
              }
            ]
          },
          this.props.style
        ]} />
    )
  }
}



class SecondOnboard extends Component {
  state = {
    toggle: true,
    animation: new Animated.Value(0),
    fontsLoaded: false,

  }

  async componentDidMount() {
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
      duration: 10,

    }).start()
    setTimeout(() => {
      this.props.navigation.navigate("ThirdOnboard")
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
    const buttonBg = toggle ? "#246A5D" : "#76A29E";

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
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <ImageLoader style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/AI.png')} />
          <Text style={styles.title}>Artificial Intelligence</Text>
          <Text style={styles.body}>Eases the stress away by doing the thinking for you.</Text>
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
    } else {
      return <AppLoading />;
    }
  }
}

export default withNavigation(SecondOnboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#246A5D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#76A29E',
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