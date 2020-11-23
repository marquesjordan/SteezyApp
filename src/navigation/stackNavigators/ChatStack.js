import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatRoomsScreen from '../../screens/ChatRoomsScreen';
import CreateChatRoomScreen from '../../screens/CreateChatRoomScreen';

import firestore from '@react-native-firebase/firestore'

const Stack = createStackNavigator();


export default ChatStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="ChatRooms" component={ChatRoomsScreen} />
        <Stack.Screen name="CreateChatRoom" component={CreateChatRoomScreen} />
    </Stack.Navigator>
  );
}


            