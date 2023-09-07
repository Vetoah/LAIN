import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CalendarPage from './pages/calendarpage';
import Pomodoro from './pages/pomodoro'
import MeditationPage from './pages/meditation'
import MedTimer from './pages/meditationTimer'

import HomePage from './pages/homes'
import Chatbot from './pages/chatbot'
import FirstOnboard from './pages/firstOnboard'
import SecondOnboard from './pages/secondOnboard'
import ThirdOnboard from './pages/thirdOnboard'
import settings from './pages/settings'

const Tab = AnimatedTabBarNavigator();
const Stack = createStackNavigator();

function CreateTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#6c6272",
        activeBackgroundColor: '#B5D1C7',
        keyboardHidesTabBar: true,
      }}

    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          )

        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="calendar-blank-outline"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}

            />
          )
        }}
      />

      <Tab.Screen
        name="Settings"
        component={settings}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons
              name="settings"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}

            />
          )
        }}
      />
    </Tab.Navigator>

  );
}

function App() {
  return (
    <NavigationContainer
      theme={{ colors: { background: 'transparent' } }}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => {
          return {
            headerShown: false,
            detachPreviousScreen: !navigation.isFocused(),
          }
        }}
      >
        <Stack.Screen
          name="FirstOnboard"
          component={FirstOnboard}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="SecondOnboard"
          component={SecondOnboard}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="ThirdOnboard"
          component={ThirdOnboard}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen 
        name="Home" 
        children={CreateTabs} 
        />
        <Stack.Screen 
        name="Chatbot" 
        component={Chatbot} 
        options={{ gestureEnabled: true }} 
        />
        <Stack.Screen 
        name="Pomodoro" 
        component={Pomodoro} 
        />
        <Stack.Screen 
        name="Meditation" 
        component={MeditationPage} 
        />
        <Stack.Screen 
        name="MedTimer" 
        component={MedTimer} 
        />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App;