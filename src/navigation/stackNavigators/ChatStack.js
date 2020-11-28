import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from '../../screens/ChatScreen';
import ChatRoomsScreen from '../../screens/ChatRoomsScreen';
import CreateChatRoomScreen from '../../screens/CreateChatRoomScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator();


export default ChatStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="ChatRooms" component={ChatRoomsScreen} />
        <Stack.Screen name="CreateChatRoom" component={CreateChatRoomScreen} />
        <Stack.Screen name="ChatRoom" component={ChatScreen} />
    </Stack.Navigator>
  );
}


            