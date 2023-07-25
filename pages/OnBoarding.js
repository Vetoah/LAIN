import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import * as Font from 'expo-font';


const fetchFonts = () => {
    return Font.loadAsync({
        'georgia-bold': require('../assets/fonts/georgia-bold.ttf'),
        'georgia-italic': require('../assets/fonts/georgia-italic.ttf')
    });
};

const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal:15}}
    {...props}>
        <Image source={require('../images/check.png')}/>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal:15}}
    {...props}>
        <Image source={require('../images/button.png')}/>
    </TouchableOpacity>

);

const Skip = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal:15}}
    {...props}>
        <Image source={require('../images/skip.png')}/>
    </TouchableOpacity>
  );


const dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(255,255,255, 0.9)': 'rgba(0,0,0,0.3)';
    return (
        <View
            style={{
                width:20,
                height:3,
                marginHorizontal:3,
                borderRadius: 50,
                backgroundColor
            }}
        />
    );
}


const OnBoardingScreen = ({navigation}) => {

    return (
        <Onboarding
        bottomBarHighlight={false}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={dots}
        titleStyles={false}
        subTitleStyles={false}
        onDone={() => navigation.navigate("Home")}
        pages={[
            {
                backgroundColor: '#385159',
                image: <Image source={require('../images/braincard.png')} />,   
            },
            {
                backgroundColor: '#385159',
                image: <Image source={require('../images/AIcard.png')} />,
         
            },
            {
                backgroundColor: '#385159',
                image: <Image source={require('../images/schedcard.png')} />,
            },

        ]}
        />
    )   
}

export default OnBoardingScreen;
      
      
const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
}
});
