import _ from 'undercore';
import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  ActivityIndicator
} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Drawer, DrawerGroup, DrawerItem, Input, Button } from '@ui-kitten/components';
import AuthReminder from '../components/auth/AuthReminder';
import Header from '../components/header/Header';

const Separator = () => {
    return <View style={styles.separator} />
}

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
     const key = obj[property];
     if (!acc[key]) {
        acc[key] = [];
     }
     // Add object to list for given key's value
     acc[key].push(obj);
     return acc;
  }, {});
}

export default ChatRoomsScreen = ({navigation}) => {

    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const __isTheUserAuthenticated = () => {
      console.log(auth().currentUser);

      if (loading) {
        setLoading(false)
      }
      let user = auth().currentUser;
      if (user !== null) {
        console.log(user);
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }

    };

    useEffect(() => {
      const authUnsubscribe = navigation.addListener('focus', () => {
        __isTheUserAuthenticated();
      });
  

      const unsubscribe = firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('latestMessage.createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const threads = querySnapshot.docs.map(documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              latestMessage: { text: '' },
              ...documentSnapshot.data()
            }
          })
  
          setThreads(groupBy(threads, 'category'))
          console.log(groupBy(threads, 'category'))
          if (loading) {
            setLoading(false)
          }
        })
  
      
      return () => {
        unsubscribe()
        authUnsubscribe();
      }
    }, [auth().currentUser])
  
    if (loading) {
      return <ActivityIndicator size='large' color='#555' />
    }

    return (
        <>

          {authenticated && (
            <View style={styles.container}>
              
              <Drawer
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                  {
                    Object.keys(threads).map((key) => {
                      return (
                        <DrawerGroup key={key} title={() => {
                          return <Text style={styles.category} >
                            {key.toUpperCase()}
                          </Text>
                        }}>
                          {
                            threads[key].map(item => {
                              return (
                                
                                <DrawerItem key={item.name} onPress={() => navigation.navigate('ChatRoom', { thread: item })} title={() => {
                                  return (
                                    <Text style={styles.room} >
                                      {item.name}
                                    </Text>)
                                }}/>
                              )
                            })
                          }
                        </DrawerGroup>
                      )
                    })
                  }
              </Drawer>
                <Button onPress={() => navigation.navigate('CreateChatRoom')}>
                    +
                </Button>
            </View>
          )}
          {!authenticated && (
            <View style={styles.authContainer}>
              <ImageBackground source={require('../../assets/party.jpeg')} style={styles.image}>
                <AuthReminder navigation={navigation} />
              </ImageBackground>
            </View>
          )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dee2eb',
    },
    authContainer: {
      flex: 1,
      backgroundColor: '#dee2eb',
      justifyContent: 'center',
      alignItems: 'center'
    },
    category: {
      fontSize: 20, 
      fontFamily: 'Allerta-Stencil', 
      fontWeight: 'bold'
    },  
    room: {
      fontSize: 18, 
      fontFamily: 'Allerta-Stencil', 
      fontWeight: 'bold',
      color: '#f24405'
    },  
    title: {
      marginTop: 20,
      marginBottom: 30,
      fontSize: 28,
      fontWeight: '500'
    },
    row: {
      paddingRight: 10,
      paddingLeft: 5,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    content: {
      flexShrink: 1
    },
    header: {
      flexDirection: 'row'
    },
    nameText: {
      fontWeight: '600',
      fontSize: 18,
      color: '#000'
    },
    dateText: {},
    contentText: {
      color: '#949494',
      fontSize: 16,
      marginTop: 2
    },
    separator: {
        backgroundColor: '#555',
        height: 0.5,
        flex: 1
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      borderWidth: 1,
      width: '100%',
      alignItems: 'center'
    }
  })