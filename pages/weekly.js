import * as React from "react";
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
import {
    NavigationContainer
  } from '@react-navigation/native';
  import {
    createStackNavigator
  } from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomePage from "./homes";






function createTabs() {
    return (
      
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#6c6272",
          activeBackgroundColor: '#839BB7'
          
          
        }}
        appearence={{
          floating:true,
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
                  color={color}
              />
          )
            
          }}
        />
      
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                  name="calendar-blank-outline"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
          }}
        />
        <Tab.Screen
          name="Study"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo
                  name="open-book"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
            
          }}
        />
        <Tab.Screen
          name="Settings"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icons
                  name="settings"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
          }}
        />
      </Tab.Navigator>
      
    );
  }