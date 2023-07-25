import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo'

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();




function HomePage() {
    const navigation = useNavigation();
    const [progressOpen, setProgressOpen] = useState(false);
    const [upcomingOpen, setUpcomingOpen] = useState(false);
    const [completedOpen, setCompletedOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const loadFontsAsync = async () => {
        await Font.loadAsync({
            'OpenSemi': require('../assets/fonts/OpenSans-SemiBold.ttf'),
            'OpenReg': require('../assets/fonts/OpenSans-Regular.ttf'),
            'OpenExtra': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
            'OpenBold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'NunitoBold': require('../assets/fonts/NunitoSans-Bold.ttf'),
            'NunitoBlack': require('../assets/fonts/NunitoSans-Black.ttf'),
            'NunitoLight': require('../assets/fonts/NunitoSans-Light.ttf'),
            'NunitoRegular': require('../assets/fonts/NunitoSans-Regular.ttf'),
            'GeorgiaBold': require('../assets/fonts/georgiabold.ttf'),
            'GeorgiaReg': require('../assets/fonts/Georgia.ttf'),
            'CoolBold': require('../assets/fonts/coolvetica-bold.ttf'),
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
                isVisible={progressOpen}
                onSwipeComplete={() => setProgressOpen(false)}
                swipeDirection="down"
                hasBackdrop={false}
                deviceWidth={1}
                deviceHeight={1}>
                <View style={styles.modal}>
                    <View style={styles.modalDragBar} />
                    <Text style={{ alignSelf: 'center' }}>Calendar database must be implemented for this to work</Text>
                    <Image style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/pepe.png')} />
                </View>
            </Modal>

            <Modal
                isVisible={upcomingOpen}
                onSwipeComplete={() => setUpcomingOpen(false)}
                swipeDirection="down" deviceWidth={1}
                deviceHeight={1}>
               <View style={styles.modal}>
                    <View style={styles.modalDragBar} />
                    <Text style={{ alignSelf: 'center' }}>Calendar database must be implemented for this to work</Text>
                    <Image style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/pepe.png')} />

                </View>
            </Modal>

            <Modal
                isVisible={completedOpen}
                onSwipeComplete={() => setCompletedOpen(false)}
                swipeDirection="down" 
                deviceWidth={1}
                deviceHeight={1}>
                <View style={styles.modal}>
                    <View style={styles.modalDragBar} />
                    <Text style={{ alignSelf: 'center' }}>Calendar database must be implemented for this to work</Text>
                    <Image style={{ width: '100%', height: undefined, aspectRatio: 1, }} source={require('../images/pepe.png')} />

                </View>
            </Modal>

            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.name}>Obiwan</Text>


            <Text style={styles.ForYouText}>For you</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity
                    activeOpacity={0.985}
                    style={styles.mental}>
                    <View style={{ position: 'absolute', height: '100%', width: 5, backgroundColor: '#236467', right: 25, zIndex: 1 }} />
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'contain', opacity: 1 }} source={require('../images/braincard.gif')} />
                    <Text style={styles.guideText}> Mental Wellbeing</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.985}
                    style={styles.meditation}
                    onPress={() => navigation.navigate('Meditation')}>
                    <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: '#f5f5f5', position: 'absolute', right: 25, top: 20, opacity: .25 }} />
                    <View style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: '#f5f5f5', position: 'absolute', left: 20, top: 57, opacity: .25 }} />
                    <View style={{ height: 25, width: 25, borderRadius: 100, backgroundColor: '#f5f5f5', position: 'absolute', left: 35, top: 20, opacity: .25 }} />
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'contain', opacity: 0.65 }} source={require('../images/meditation.png')} />
                    <Text style={styles.guideText}> Meditation</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.985}
                    style={styles.studying}
                    onPress={() => navigation.navigate('Pomodoro')}>
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'contain', opacity: .6 }} source={require('../images/book.png')} />
                    <Text style={styles.guideText}> Studying</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.985}
                    style={styles.plans}>
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'contain', opacity: .85 }} source={require('../images/sched.gif')} />
                    <Text style={styles.guideText}> Planning</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.TaskText}>Tasks</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <View style={styles.box}>
                    <TouchableWithoutFeedback
                        onPress={() => setProgressOpen(true)}>
                        <View style={{ height: 75, width: 370, borderRadius: 30, backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: '#D29892', position: 'absolute', left: 10, top: 12.5 }} />
                            <Text style={styles.taskProgressText}>In Progress</Text>
                            <Text style={styles.numberOfTaskText}><Text style={{ color: 'black' }}>0 </Text> tasks are in progress</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => setUpcomingOpen(true)}>
                        <View style={{ marginTop: 15, height: 75, width: 370, borderRadius: 30, backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: '#D2C492', position: 'absolute', left: 10, top: 12.5 }} />
                            <Text style={styles.taskProgressText}>Upcoming</Text>
                            <Text style={styles.numberOfTaskText}><Text style={{ color: 'black' }}>0 </Text> upcoming tasks this week</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => setCompletedOpen(true)}>
                        <View style={{ marginTop: 15, height: 75, width: 370, borderRadius: 30, backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: '#92D299', position: 'absolute', left: 10, top: 12.5 }} />
                            <Text style={styles.taskProgressText}>Completed</Text>
                            <Text style={styles.numberOfTaskText}><Text style={{ color: 'black' }}>0 </Text> tasks completed this week</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <TouchableOpacity
                style={styles.chat}
                onPress={() => navigation.navigate('Chatbot')}>
                <Image
                    source={require('../assets/messageicon.png')}
                    style={{
                        marginTop: 2.5,
                        height: 40,
                        width: 40,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
export default HomePage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    studying: {
        marginTop: 10,
        marginRight: 8,
        width: 180,
        height: 100,
        backgroundColor: '#D8ECE8',
        borderRadius: 20,
    },
    plans: {
        marginTop: 10,
        marginLeft: 8,
        width: 180,
        height: 100,
        backgroundColor: '#76A29E',
        borderRadius: 20,

    },
    meditation: {
        marginTop: 5,
        marginLeft: 8,
        width: 180,
        height: 100,
        backgroundColor: '#E2F0E4',
        borderRadius: 20,
    },
    mental: {
        marginTop: 5,
        marginRight: 8,
        width: 180,
        height: 100,
        backgroundColor: '#236467',
        borderRadius: 20,

    },
    greeting: {
        marginTop: 80,
        marginLeft: 20,
        fontSize: 25,
        fontFamily: 'NunitoBold',
        color: '#6b6b73',
        letterSpacing: -1
    },
    name: {

        marginLeft: 20,
        marginTop: -5,
        fontSize: 40,
        fontFamily: 'Harabara',
        color: '#271D19' //'#35324B' 
    },
    guideText: {
        fontSize: 17,
        fontFamily: 'CoolBold',
        color: 'white',
        position: 'absolute',
        right: 10,
        bottom: 5,
        letterSpacing: 0,
        textShadowColor: 'black', // Main text color
        textShadowOffset: { width: 0, height: 0 }, // Main text offset
        textShadowRadius: 2, // Main text shadow radius,
        zIndex: 2
    },
    circle:
    {
        height: 300,
        width: 300,
        borderRadius: 300,
        backgroundColor: '#292B39',
        position: 'absolute',
        left: 230,
        bottom: 600,
        opacity: .05,
    },
    circle1:
    {
        height: 600,
        width: 600,
        borderRadius: 600,
        backgroundColor: '#292B39',
        position: 'absolute',
        right: 140,
        top: 350,
        opacity: .05,
    },
    circle2:
    {
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: '#292B39',
        position: 'absolute',
        right: 250,
        top: 50,
        opacity: 0.03,
    },
    chat:
    {
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: '#B5D1C7',
        position: 'absolute',
        right: 10,
        top: 710,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    box:
    {
        marginTop: 8,
        width: 375,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    taskProgressText:
    {
        color: '#271D19',
        fontFamily: 'NunitoBold',
        letterSpacing: -0.5,
        fontSize: 17,
        marginLeft: 70
    },
    numberOfTaskText: {
        color: '#808089',
        fontFamily: 'OpenSemi',
        letterSpacing: -1,
        fontSize: 13,
        marginLeft: 70,
        marginBottom: 3
    },
    modal: {
        height: '99%', 
        borderRadius: 30, 
        backgroundColor: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        marginTop: 10
    },
    modalDragBar:
    { 
        height: 7.5, 
        width: 100, 
        borderRadius: 30, 
        backgroundColor: '#A5B0AE', 
        position: 'absolute', 
        top: '2.5%', 
        alignSelf: 'center', 
        opacity: 0.5 
    },
    ForYouText:
    { 
        marginTop: 20, 
        marginLeft: 20, 
        fontSize: 20, 
        fontFamily: 'NunitoBold', 
        color: '#808089', 
        letterSpacing: -1 
    },
    TaskText:
    { 
        marginTop: 40, 
        marginLeft: 20, 
        fontSize: 20, 
        fontSize: 20, 
        fontFamily: 'NunitoBold', 
        color: '#808089', 
        letterSpacing: -1 
    },

});