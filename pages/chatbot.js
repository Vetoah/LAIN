import React, {Component, setState} from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import SendIcon from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Send, Bubble, InputToolbar, Avatar} from 'react-native-gifted-chat'
import { StyleSheet, View,} from 'react-native';

import { renderInputToolbar, renderActions, renderComposer} from './InputToolbar';

import io from 'socket.io-client'

const Stack = createStackNavigator();
const ChatbotStack = createStackNavigator();

var url = "http://192.168.0.12:80";

function Chatbot({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: '#B5D1C7',
      elevation:3
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      },
    }}
    animation='fade'>
    <Stack.Screen name="chatbotPage" component={ChatbotPage} options={{
      title:'',
      headerLeft: () => (
        <Icon.Button 
          name="angle-left" 
          size={35} 
          color="white" 
          backgroundColor="#B5D1C7" 
          
          onPress={() => navigation.goBack()}>
        </Icon.Button>
      ),
      headerRight: () => (
        <Icons.Button 
          name="dots-horizontal" 
          size={30} 
          color="white" 
          backgroundColor="#B5D1C7" 
          
          onPress={() => navigation.goBack()}>
        </Icons.Button>
        )
        
      }} />
    </Stack.Navigator>
  )
}

export default Chatbot;

class ChatbotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
  }

    componentDidMount(messages) {
      setTimeout(() => {this.setState({
        messages: [
        {
          _id: 1,
          text: 'Heyo! This is a test output message!!!',
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: 'https://cdn.discordapp.com/attachments/443894395981266966/768561770674782218/brain.png'}
        },
      ]})}, 2500)

    }

    onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    
    }

    renderInputToolbar(props){
      return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    )}

    renderAvatar(props){
      return(<Avatar
        {...props}
        containerStyle={{ left: {marginBottom:15}, right: {} }}
        imageStyle={{ left: {}, right: {} }}
      />
      )
    }

    renderBubble(props){
      return (
        <Bubble
          {...props}
  
          wrapperStyle={{
            right: { borderTopRightRadius: 15, backgroundColor:'#4b506c' },
            left: { borderTopLeftRadius: 15, backgroundColor:'#ffff' },
          }}
  
          containerToPreviousStyle={{
            right: { borderTopRightRadius: 15 },
            left: { borderTopLeftRadius: 15 },
          }}
          containerToNextStyle={{
            right: { borderTopRightRadius: 15 },
            left: { borderTopLeftRadius: 15 },
          }}
          containerStyle={{
            right: { borderTopRightRadius: 15,marginBottom:10 },
            left: { borderTopLeftRadius: 15,marginBottom:10 },
          }}

        />
      );
    }

    renderSend(props){
      return(
        <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
          width: 44,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}
      >
        <View style={{width:60,height:'100%',borderRadius:1,backgroundColor:'#B5D1C7',justifyContent:'center',alignItems:'center'}}>
          <SendIcon
              name='md-send'
              size={24} 
              color="white" 
          />
        </View>

          </Send>
      )}

    render() {
      return (
        
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderSend={this.renderSend}
          user={{
            _id: 1,
          }}
          renderBubble={this.renderBubble}
          renderAvatar={this.renderAvatar}
          renderInputToolbar={this.renderInputToolbar}
          renderActions={this.renderActions}
          renderComposer={this.renderComposer}
          alwaysShowSend
          placeholder='Type a message here...'
        />
      );
    }
}