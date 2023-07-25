import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import React, { useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Awesome from 'react-native-vector-icons/FontAwesome'
import AwesomeFive from 'react-native-vector-icons/FontAwesome5'
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function MedTimer() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [clockOn, setClockOn] = useState(0);
    const [key, setKey] = useState(0);
    const [countdown, setCountdown] = useState(180);
    const timerProps = {
        size: 150,
        strokeWidth: 10
    }

    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        return `${minutes}:${seconds}`
    }

    function increment() {
        setCountdown(180)
        setKey(prevKey => prevKey + 1)
    }

    function decrement() {
        setCountdown(300)
        setKey(prevKey => prevKey + 1)
    }

    const loadFontsAsync = async () => {
        await Font.loadAsync({
            'Harabara': require('../assets/fonts/HarabaraMaisDemo.otf'),
        });
    };

    useEffect(() => {
        async function prepare() {
            try {
                await loadFontsAsync();

                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setDataLoaded(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (dataLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [dataLoaded]);

    if (!dataLoaded) {
        return null;
    }

    return (

        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1C1C28' }} onLayout={onLayoutRootView}>
            <View style={styles.timerButtons}>
                <TouchableOpacity
                    onPress={() => setClockOn(0)}>
                    <Awesome name="pause" color="white" size={50} style={{ top: 30, alignSelf: 'center', marginRight: 40, marginLeft: 90, }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setClockOn(1)}>
                    <Awesome name="play" color="white" size={50} style={{ top: 30, alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setKey(prevKey => prevKey + 1)}>
                    <AwesomeFive name="redo-alt" color="white" size={50} style={{ top: 30, alignSelf: 'center', marginLeft: 25 }} />
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 250, position: 'absolute', top: 0 }}>
                <View style={{ height: 200, width: 200, borderRadius: 300, borderColor: '#f7f9fb', borderWidth: 1, opacity: .05, position: 'absolute' }} />
                <View style={{ height: 290, width: 290, borderRadius: 300, borderColor: '#f7f9fb', borderWidth: 1, opacity: .05, position: 'absolute' }} />

                <CountdownCircleTimer

                    {...timerProps}
                    {...children}
                    key={key}
                    isPlaying={clockOn}
                    duration={countdown}
                    colors={[
                        ['#f7f9fb', 1],
                    ]}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{ color: animatedColor, fontSize: 30, fontFamily: 'Harabara', }}>
                            {children({ remainingTime })}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
            </View>


            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 80 }}>
                <TouchableOpacity
                    style={styles.incrementButton}
                    onPress={() => increment()}
                >
                    <Text style={styles.breakText}>
                        3 min
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.decrementButton}
                    onPress={() => decrement()}
                >
                    <Text style={styles.breakText}>
                        5 min
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MedTimer

const styles = StyleSheet.create({
    incrementButton: 
    {
        height: 50,
        width: 150,
        marginRight: 15,
        borderRadius: 15,
        borderColor: '#464455',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#f7f9fb'
    },

    decrementButton:
    {
        height: 50,
        width: 150,
        borderRadius: 15,
        marginLeft: 15,

        borderColor: '#464455',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#f7f9fb'

    },
    breakText: 
    {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#f7f9fb',
        fontFamily: 'Harabara',
    },
    timerButtons: 
    {
        width: 375,
        height: 100,
        borderRadius: 15,
        shadowOpacity: 0,
        marginTop: 620,
        flex: 1,
        flexDirection: 'row'

    }

});