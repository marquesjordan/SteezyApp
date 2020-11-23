import React, {useState} from 'react';
import {View} from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore'

export default CreateChatRoomScreen = ({navigation}) => {

    const [roomName, setRoomName] = useState('');

    const handleButtonPress = () => {
        if (roomName.length > 0) {
            // create new thread using firebase & firestore
            firestore()
              .collection('MESSAGE_THREADS')
              .add({
                name: roomName,
                latestMessage: {
                  text: `${roomName} created. Welcome!`,
                  createdAt: new Date().getTime()
                }
              })
              .then(() => {
                navigation.navigate('ChatRooms')
              })
              .catch((e) => {
                  console.log(e)
              })
          }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Input
                placeholder='Room Name'
                value={roomName}
                onChangeText={nextValue => setRoomName(nextValue)}
            />
            <Button onPress={handleButtonPress}>
                Create Chat Room
            </Button>
        </View>
    )
}