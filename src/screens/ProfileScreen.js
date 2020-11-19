import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Text } from '@ui-kitten/components';

import AuthButtons from '../components/auth/AuthButtons';

export default ProfileScreen = ({ navigation }) => {
    const [authenticated, setAuthenticated] = useState(false)
    
    useEffect(() => {
      __isTheUserAuthenticated()
    }, [auth().currentUser]);
  
    const __isTheUserAuthenticated = () => {
      console.log(auth().currentUser);
      let user = auth().currentUser;
      if (user !== null) {
        console.log(user);
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    };
  
    const __signOut = async () => {
      let user = auth().currentUser;
      if (user) {
        await auth().signOut();
      }
      
      __isTheUserAuthenticated();
    }

    const styles =  {
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center'
        },
        text: {
            fontSize: 30,
            color: 'blue'
        }
    }
  
  
    return (
      <View style={styles.container}>
        
        {authenticated && (
          <View>
            <Text>Welcome {auth().currentUser.email}</Text>
            <TouchableOpacity onPress={__signOut}>
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {!authenticated && (
          <AuthButtons navigation={navigation} />
        )}
  
      </View>
    )
  }
  