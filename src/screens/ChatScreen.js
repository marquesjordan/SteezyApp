import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const user = auth().currentUser.toJSON()

export default ChatScreen = ({navigation, route}) => {
    const { thread } = route.params
    const [messages, setMessages] = useState([
        {
          _id: 0,
          text: 'thread created',
          createdAt: new Date().getTime(),
          system: true
        },
        {
          _id: 1,
          text: 'hello!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Demo'
          }
        }
    ]);

    useEffect(() => {
        const unsubscribeListener = firestore()
          .collection('MESSAGE_THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()
      
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              }
      
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.displayName
                }
              }
      
              return data
            })
      
            setMessages(messages)
          })
      
        return () => unsubscribeListener()
      }, [])

    const handleSend = async (newMessage = []) => {
        const text = newMessage[0].text
        firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                _id: user.uid,
                displayName: user.displayName
                }
            })

        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .set(
              {
                latestMessage: {
                  text,
                  createdAt: new Date().getTime()
                }
              },
              { merge: true }
            )

        setMessages(GiftedChat.append(messages, newMessage))
    }

      return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{
                _id: user.uid
            }}
        />
      )

}