import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import Modal from 'react-native-modal';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();


function MeditationPage() {
    const navigation = useNavigation();
    const [focusOpen, setFocusOpen] = useState(false);
    const [mindfulOpen, setMindfulOpen] = useState(false);
    const [relaxOpen, setRelaxOpen] = useState(false);
    const [visualOpen, setVisualOpen] = useState(false);
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
                isVisible={focusOpen}
                onSwipeComplete={() => setFocusOpen(false)}
                swipeDirection="down"
                deviceWidth={1}
                hasBackdrop={false}>
                <View style={styles.modal}>

                    <View style={{ height: 7.5, width: 100, borderRadius: 30, backgroundColor: '#A5B0AE', position: 'absolute', top: '2.5%', alignSelf: 'center', opacity: 0.5 }} />
                    <View style={{ width: '85%' }}>
                        <Text style={{ color: '#74A56D', fontFamily: 'Harabara', fontSize: 45, marginLeft: 10, marginTop: 10 }}>Focus</Text>

                        <Text style={styles.meditationExpoText}>Focused meditation involves paying attention to the thoughts passing through your mind without judgment or engagement. You simply observe and take note of any recurring patterns, combining concentration with awareness.</Text>

                        <Text style={styles.meditationExpoText}>You can choose to focus on an object or your breath while remaining mindful of bodily sensations, thoughts, and feelings. This type of meditation is particularly suitable for those practicing alone, as it does not require a teacher's guidance and can be easily incorporated into daily routines. </Text>

                        <Text style={styles.meditationExpoText}>With regular practice, focused meditation can lead to enhanced tranquility, self-awareness, and a deeper understanding of your inner world.</Text>
                    </View>

                </View>
            </Modal>

            <Modal
                isVisible={mindfulOpen}
                onSwipeComplete={() => setMindfulOpen(false)}
                swipeDirection="down"
                deviceWidth={1}
                hasBackdrop={false}>
                <View style={styles.modal}>
                    <View style={{ height: 7.5, width: 100, borderRadius: 30, backgroundColor: '#A5B0AE', position: 'absolute', top: '2.5%', alignSelf: 'center', opacity: 0.5 }} />
                    <View style={{ width: '85%' }}>
                        <Text style={{ color: '#74A56D', fontFamily: 'Harabara', fontSize: 45, marginLeft: 10, marginTop: 10, }}>Mindfulness </Text>

                        <Text style={styles.meditationExpoText}>In mindfulness meditation you pay attention to your thoughts as they pass through your mind. You don’t judge the thoughts or become involved with them. You simply observe and take note of any patterns.</Text>

                        <Text style={styles.meditationExpoText}>This practice combines concentration with awareness. You may find it helpful to focus on an object or your breath while you observe any bodily sensations, thoughts, or feelings.</Text>

                        <Text style={styles.meditationExpoText}>This type of meditation is good for people who don’t have a teacher to guide them, as it can be easily practiced alone.</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                isVisible={visualOpen}
                onSwipeComplete={() => setVisualOpen(false)}
                swipeDirection="down"
                deviceWidth={1}
                hasBackdrop={false}>
                <View style={styles.modal}>
                    <View style={{ height: 7.5, width: 100, borderRadius: 30, backgroundColor: '#A5B0AE', position: 'absolute', top: '2.5%', alignSelf: 'center', opacity: 0.5 }} />
                    
                    <View style={{ width: '85%' }}>
                        <Text style={{ color: '#74A56D', fontFamily: 'Harabara', fontSize: 45, marginLeft: 10, marginTop: 10 }}>Visualization </Text>

                        <Text style={styles.meditationExpoText}>In visualization meditation, you immerse yourself in the power of your imagination to create a serene mental landscape. With closed eyes, you form vivid and detailed images in your mind, engaging all your senses to make the experience come alive. By focusing your attention on these mental scenes, you foster a profound sense of presence and concentration, transcending the external distractions.</Text>

                        <Text style={styles.meditationExpoText}>This practice blends the art of visualization with mindfulness, as you observe the images without judgment or attachment, allowing them to flow naturally. You might choose to visualize a calming natural setting, a personal goal achieved, or an affirming scenario. Whatever the visualization, the key is to be fully present within it, absorbing every detail and emotion it evokes.</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                isVisible={relaxOpen}
                onSwipeComplete={() => setRelaxOpen(false)}
                swipeDirection="down"
                deviceWidth={1}
                hasBackdrop={false}>
                <View style={styles.modal}>
                    <View style={{ height: 7.5, width: 100, borderRadius: 30, backgroundColor: '#A5B0AE', position: 'absolute', top: '2.5%', alignSelf: 'center', opacity: 0.5 }} />
                    
                    <View style={{ width: '85%' }}>
                        <Text style={{ color: '#74A56D', fontFamily: 'Harabara', fontSize: 45, marginLeft: 10, marginTop: 10 }}>Progressive Relaxation </Text>
                        <Text style={styles.meditationExpoText}>Progressive relaxation meditation is a transformative practice that takes you on a journey of deep relaxation and heightened self-awareness. By methodically tensing and releasing different muscle groups throughout your body, you embark on a profound exploration of inner tranquility. The process allows you to attune to the sensations in each muscle, consciously letting go of any tension you encounter, and experiencing a gentle release of stress and tightness.</Text>
                    </View>
                </View>
            </Modal>

            <Text style={styles.medTitle}>Meditation Techniques</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <View style={styles.box}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback
                            onPress={() => setMindfulOpen(true)}>
                            <View style={styles.rightMeditationCard}>
                                <Text style={styles.meditationCardsText}>Mindfulness Meditation</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => setFocusOpen(true)}>
                            <View style={styles.leftMeditationCard}>
                                <Text style={styles.meditationCardsText}>Focused Meditation</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 100 }}>
                        <TouchableWithoutFeedback
                            onPress={() => setRelaxOpen(true)}>
                            <View style={styles.rightMeditationCard}>
                                <Text style={styles.meditationCardsText}>Progressive Relaxation</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => setVisualOpen(true)}>
                            <View style={styles.leftMeditationCard}>

                                <Text style={styles.meditationCardsText}>Visualization Meditation</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.begin}
                onPress={() => navigation.navigate('MedTimer')}>
                <Text
                    style={styles.beginButtonText}>
                    Begin Session
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default MeditationPage


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },

    medTitle: {

        marginLeft: '10%',
        marginTop: 120,
        fontSize: 50,
        fontFamily: 'Harabara',
        color: '#271D19' //'#35324B' 
    },

    begin:
    {
        height: 60,
        width: 370,
        borderRadius: 100,
        backgroundColor: '#D0EBE1',
        position: 'absolute',
        alignSelf: 'center',
        top: 760,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:0
    },
    box:
    {
        height: 650,
        width: 415,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modal: {
        height: '99%',
        width: '90%',
        borderRadius: 30,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
        // marginTop: '100%'
    },
    meditationModalText:
    {
        color: 'grey',
        fontFamily: 'OpenSemi',
        letterSpacing: -1,
        fontSize: 17,
        marginLeft: 10,
        marginTop: 10
    },
    beginButtonText:
    {
        fontSize: 25,
        fontFamily: 'Harabara',
        color: 'white',
        textShadowColor: 'grey',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3
    },
    meditationCardsText:
    {
        color: 'white',
        fontFamily: 'Harabara',
        fontSize: 23,
        textAlign: 'center',
        textShadowColor: 'grey',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3
    },
    leftMeditationCard:
    { 
        height: 175, 
        width: 150, 
        borderRadius: 20, 
        marginLeft: 10, 
        backgroundColor: 
        '#DDEBE6', borderWidth: 2, 
        borderColor: 'white', 
        elevation: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    rightMeditationCard: 
    { 
        height: 175, 
        width: 150, 
        borderRadius: 20, 
        backgroundColor: '#DDEBE6', 
        borderWidth: 2, 
        borderColor: 'white', 
        elevation: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    meditationExpoText:
    { 
        color: 'grey', 
        fontFamily: 'OpenSemi', 
        letterSpacing: -1, 
        fontSize: 17, 
        marginLeft: 10, 
        marginTop: 10 
    },
});

