import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import CalendarBar from './calendar';
import CreateTask from './CreateTask';
import TodoStore from '../assets/TodoStore';
import { NavigationContainer } from '@react-navigation/native';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

export default class CalendarPage extends Component {
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

  render() {
    return (
        <View style={{backgroundColor:'#F5F5F5', flex:1}} >
            <TodoStore>
        
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                }}>
                    
                    <Stack.Screen name="CreateTask" component={CreateTask} options={{animationEnabled: false,}}/>
                </Stack.Navigator>
        
            </TodoStore>
        </View>
      
    );
  }
}