import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from '../../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button, Text } from '@ui-kitten/components';


const Stack = createStackNavigator();

const ProfileScreen = ({ navigation }) => {
  const [authenticated, setAuthenticated] = useState(false)


  useEffect(() => {
    __isTheUserAuthenticated()
  }, [auth().currentUser]);

  const __isTheUserAuthenticated = () => {
    console.log('Check Auth')
    let user = auth().currentUser;
    if (user) {
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


  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>
      
      {auth().currentUser && (
        <View>
          <Text>Welcome {auth().currentUser.email}</Text>
          <TouchableOpacity onPress={__signOut}>
            <Text style={{ fontSize: 30, color: 'blue' }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {!auth().currentUser && (
        <AuthButtons navigation={navigation} />
      )}

    </View>
  )
}

const AuthButtons = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Button appearance='filled' style={{ fontSize: 22, color: '#F24405' }} appearance='ghost' onPress={() => navigation.navigate('SignIn')}>
          Login
        </Button>
        <Button  style={{backgroundColor: '#F24405', fontSize: 22 }} onPress={() => navigation.navigate('SignUp')}>
          Join Now
        </Button> 
      </View>
    </>
  )
}

const SignIn = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: 'white' }}>
      <AuthForm type="login" text="Register New Account" navigateCallback={() => navigation.navigate('SignUp')} />
    </View>
  )
}

const SignUp = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: 'white' }}>
      <AuthForm type="register" text="Already have Account? Log In" navigateCallback={() => navigation.navigate('SignIn')} />
    </View>
  )
}


export default ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Profile" component={ProfileScreen} />
      <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}


