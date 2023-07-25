import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Switch} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();



export default function Settings(){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
    return(
        <View style={{backgroundColor:'#F5F5F5', flex:1}} onLayout={onLayoutRootView}>
            <Text style={styles.settingTitle}> Settings </Text>
            <Text style={styles.account}>Account</Text>
            <Text style={styles.email}>Email</Text>
            <Text style={styles.text}>First Name</Text>
            <Text style={styles.text}>Last Name</Text>

            <View
                style={{
                    marginTop:25,
                 
                }}
            />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
                <Text style={styles.notification}>Notifications</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.allow}>Allow Push Notifications</Text>
                    <Switch
                        style={{ transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }], marginLeft: 90 }}
                        trackColor={{ false: "#767577", true: "#29B263" }}
                        thumbColor={isEnabled ? "#2BD29B" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white'
    },
    studying: {
        marginTop:10,
        marginRight:8,
        width: 180,
        height: 100,
        backgroundColor: '#368b93',
        borderRadius: 17,
        elevation:4
    },
    plans: {
        marginTop:10,
        marginLeft:8,
        width: 180,
        height: 100,
        backgroundColor: '#f3e6aa',
        borderRadius: 17,
        elevation:4
        
    },
    meditation:{
        marginTop:5,
        marginLeft:8,
        width: 180,
        height: 100,
        backgroundColor: '#eaa16e',
        borderRadius: 17,
        elevation:4
    },
    email:{
        marginTop:10,
        marginLeft:25,
        fontSize:18,
        fontFamily: 'NunitoRegular',
        color:'#565275'

    },
    text:{
        marginTop:20,
        marginLeft:25,
        fontSize:18,
        fontFamily: 'NunitoRegular',
        color:'#565275'

    },
    allow:{
        marginTop:5,
        marginLeft:25,
        fontSize:18,
        fontFamily: 'NunitoRegular',
        color:'#565275'

    },
    account: {
        marginTop:30,
        marginLeft:25,
        fontSize:25,
        fontFamily: 'NunitoBold',
        color:'#6b6b73',
        letterSpacing: -1
    },
    notification: {
        marginTop:10,
        marginLeft:25,
        fontSize:25,
        fontFamily: 'NunitoBold',
        color:'#6b6b73',
        letterSpacing: -1
    },
    settingTitle: {
        marginTop:120,
        fontSize:45,
        fontFamily: 'CoolBold',
        color:'#271D19'
    },
    


  });