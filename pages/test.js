import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet
} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
    createStackNavigator
  } from '@react-navigation/stack';
import HomePage from "./homes";
import Monthly from './monthly'
import * as Permissions from 'expo-permissions';
import CreateTask from './CreateTask';
import CalendarBar from './calendar'
import TodoStore from '../assets/TodoStore';
const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get("window");


function TabStack() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#633689',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          },
        }}>
        <Tab.Screen
          name="FirstPage"
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons
            //       name="home"
            //       color={color}
            //       size={size}
            //     />
            // ),
          }}  />
        <Tab.Screen
          name="SecondPage"
          component={HomePage}
          options={{
            tabBarLabel: 'Setting',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons
            //       name="settings"
            //       color={color}
            //       size={size}
            //     />
            // ),
          }} />
      </Tab.Navigator>
    );
  }

export default class Calendar extends React.Component {

    async componentDidMount() {
        await this._askForCalendarPermissions();
        await this._askForReminderPermissions();
      }

    _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
    };

    _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
        return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
    };

    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };

    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver:true
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver:true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver:true
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver:true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver:true
                }).start()
            ]);
        }
    };
    TabStack = TabStack();

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.circle}/>
                <View style={styles.circle1}/>
                <View style={styles.circle2}/>
                <View
                    style={{
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 60,
                            marginBottom: 20,
                            height: 36,
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#556275",
                                borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }} 
                            
                        />
                        
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#556275",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#556275"
                                }}
                            >
                                Weekly
                            </Text>
                            
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#556275",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 1 ? "#fff" : "#556275"
                                }}
                            >
                                Monthly
                            </Text>

                        </TouchableOpacity>
                        
                    </View>

                    <ScrollView>
                        <Animated.View
                        
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                            
                        >
                            <TodoStore>
                                <CalendarBar/>
                            </TodoStore>
                            
                            <Stack.Navigator
                                initialRouteName="Settings"
                                screenOptions={{
                                headerStyle: { backgroundColor: '#633689' },
                                headerTintColor: '#fff',
                                headerTitleStyle: { fontWeight: 'bold' }
                            }}>
                            <Stack.Screen
                                name="TabStack"
                                component={TabStack}
                                options={{ title: 'Tab Stack' }}
                            />
                            </Stack.Navigator>
                        </Animated.View>

                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                            <View style={{
                                height:345,
                                transform:[{scale:.9}]
                            }}>
                                <Monthly/>
                            </View>
                            
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}






const styles = StyleSheet.create({
    circle:
    {
        height:300,
        width:300,
        borderRadius:300,
        backgroundColor:'white',
        position: 'absolute',
        left:250,
        bottom:200,
        opacity: .3,
    },
    circle1:
    {
        height:600,
        width:600,
        borderRadius:600,
        backgroundColor:'white',
        position: 'absolute',
        right:140,
        bottom: 450,
        opacity: .3,
    },
    circle2:
    {
        height:200,
        width:200,
        borderRadius:100,
        backgroundColor:'white',
        position: 'absolute',
        right:270,
        bottom: 50,
        opacity: 0.3,
    },
});