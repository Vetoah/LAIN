import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import React, { useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Awesome from 'react-native-vector-icons/FontAwesome'
import AwesomeFive from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function Pomodoro() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [clockOn, setClockOn] = useState(0);
    const [breakCount, setBreakCount] = useState(5);
    const [key, setKey] = useState(0);
    const [countdown, setCountdown] = useState(1500);
    const timerProps = {
        size: 250,
        strokeWidth: 10
    }
    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60

        return `${minutes}:${seconds}`
    }

    function increment() {
        setCountdown(countdown => countdown + 300)
        setKey(prevKey => prevKey + 1)
    }
    function decrement() {
        setCountdown(countdown => countdown - 300)
        setKey(prevKey => prevKey + 1)
    }
    const loadFontsAsync = async () => {
        await Font.loadAsync({
            'NunitoBold': require('../assets/fonts/NunitoSans-Bold.ttf'),
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

        <View style={{ backgroundColor: '#F5F5F5', flex: 1 }} onLayout={onLayoutRootView}>
            <Modal
                isVisible={menuOpen}
                onSwipeComplete={() => setMenuOpen(false)}
                swipeDirection="down"
                hasBackdrop={true}
                deviceWidth={1}
                >
                <View style={styles.modal}>
                    <View style={{ height: 7.5, width: 100, borderRadius: 30, backgroundColor: '#A5B0AE', position: 'absolute', top: '7.5%', alignSelf: 'center', opacity: 0.5 }} />
                    <View style={{ position: 'absolute', top: '25%', flexDirection: 'row', left: 10, alignItems:'center', alignContent:'center' }}>
                        
                        <Text style={{ fontSize: 20, fontFamily: 'NunitoBold',  color: '#6b6b73' }}> <Text style={{ fontSize: 90, color: '#271D19', fontFamily: 'Harabara', bottom: 30 }}>
                            {breakCount}
                        </Text> minute breaks</Text>
                        

                        <TouchableOpacity
                            style={{
                                opacity: clockOn === 0
                                    ? 1
                                    : 0,
                            }}
                            onPress={() => setBreakCount(breakCount + 1)}>
                            <Icon name="ios-add-circle-outline" color='#6b6b73' size={50} style={{ alignSelf: 'center', marginLeft: '10%', marginRight: '10%' }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                elevation: clockOn === 0
                                    ? 0
                                    : 0,
                            }}
                            onPress={() => setBreakCount(breakCount - 1)}>
                            <Icon name="ios-remove-circle-outline" color={breakCount === 5
                                ? 'rgba(46, 102, 231,0)'
                                : '#6b6b73'} size={50} style={{ alignSelf: 'center', }} />
                        </TouchableOpacity>

                    </View>


                </View>
            </Modal>
            <View style={{position:'absolute', top: '7.5%', right: '7.55%', zIndex: 5}}>
                <TouchableOpacity
                    onPress={() => setMenuOpen(!menuOpen)}>
                    <Entypo name="dots-three-horizontal" color="#6b6b73" size={30} />
                </TouchableOpacity>

            </View>


            <View style={{
                position: 'absolute',
                width: 3000,
                height: clockOn === 0 ? 0 : 3000,
                elevation: 2,
                backgroundColor: 'black',
            }} />

            <View style={styles.lowerContainer}>
                <View style={{ height: '20%' }} />
                <CountdownCircleTimer
                    {...timerProps}
                    {...children}
                    key={key}
                    isPlaying={clockOn}
                    duration={countdown}
                    trailColor={'#1C1C28'}
                    colors={[
                        ['#DB5866', .33],
                        ['#D3863F', .33],
                        ['#23AE81', .33],
                    ]}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{ color: animatedColor, fontSize: 30, fontFamily: 'Harabara'}}>
                            {children({ remainingTime })}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>

                <View style={{width: '100%', height: 100, borderRadius: 15, shadowOpacity: 0, marginTop: 0, elevation: clockOn === 0 ? 0 : 3, flexDirection: 'row', justifyContent: 'center', marginTop: 150,}}>
                    <TouchableOpacity
                        onPress={() => setClockOn(0)}>
                        <Awesome name="pause" color="#6b6b73" size={30} style={{ top: 30, }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setClockOn(1)}>
                        <Awesome name="play" color="#6b6b73" size={30} style={{ top: 30, marginLeft: 35 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setKey(prevKey => prevKey + 1)}>
                        <AwesomeFive name="redo-alt" color="#6b6b73" size={30} style={{ top: 30, alignSelf: 'center', marginLeft: 25 }} />
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', bottom: 0, width: 'auto'}}>
                    <TouchableOpacity
                        style={styles.incrementButton}
                        onPress={() => increment()}
                    >
                        <Text style={styles.decrementButtonText}>
                            Increment
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.decrementButton}
                        onPress={() => decrement()}>
                        <Text style={styles.decrementButtonText}>
                            Decrement
                        </Text>
                    </TouchableOpacity>
                </View>



            </View>
           

        </View>
    )



}
export default Pomodoro

const styles = StyleSheet.create({
    modal: {
        height: '30%',
        width:'100%',
        borderRadius: 30,
        backgroundColor: 'white',
        display: 'flex',
        alignSelf: 'center',
        marginTop: '150%'
    },
    decrementButtonText: 
    {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'NunitoBold',
    },
    decrementButton:
    {
        height: 50,
        width: 150,
        borderRadius: 15,
        marginLeft: 15,
        borderColor: '#464455',
        justifyContent: 'center',
        backgroundColor: '#DA644E',
        elevation: 1
    },
    incrementButton: 
    {
        height: 50,
        width: 150,
        marginRight: 15,
        borderRadius: 15,
        backgroundColor: '#59C08C',
        borderColor: '#464455',
        display:'flex',
        justifyContent: 'center',
        elevation: 1,
    },

    lowerContainer:
    {
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
    },

});
