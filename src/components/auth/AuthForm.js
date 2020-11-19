import React, { useState } from 'react';
import {Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import { Input, Button } from '@ui-kitten/components';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");

export default AuthForm = ({type, text, navigateCallback}) => {
    const loc = 'Profile'
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const [valid, setValid] = useState(true);

    const __isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const __doSingIn = async () => {

        console.log(email)
        console.log(password)

        try {
          let response = await auth().signInWithEmailAndPassword(email, password)
          if (response && response.user) {
            console.log("Success ✅", "Authenticated successfully")
            navigation.reset({
                index: 1,
                routes: [
                  {
                    name: loc
                  },
                ],
              })
          }
        } catch (e) {
          console.error(e.message)
        }
      }

    const __doSignUp = () => {
        console.log(email);
        console.log(password)

        if (!email || email === '') {
            setError("Email required *")
            setValid(false)
            return
        } else if (!password && password.trim() && password.length > 6) {
            setError("Weak password, minimum 5 chars")
            setValid(false)
            return
        } else if (!__isValidEmail(email)) {
            setError("Invalid Email")
            setValid(false)
            return
        }
      
        __doCreateUser(email, password)
      }
      
    const __doCreateUser = async (email, password) => {
        try {
          let response = await auth().createUserWithEmailAndPassword(email, password)
          if (response) {
            console.log(response)
            setEmail('');
            setPassword('');
            setError('');
            navigation.navigate('Profile')
          }
        } catch (e) {
          console.error(e.message)
        }
    }

    return (
        <View style={{flex:1, width}}>

            <View style={{flexGrow: 2, justifyContent: 'flex-end'}}>
                <View style={{justifyContent: 'center',borderWidth:22, flex: 1, alignItems: 'center'}}>
                    <Image
                        source={require('../../../assets/steezy-logo.png')}
                    />
                </View>
                <View style={{margin: 20}}>
                    <View style={{justifyContent: 'center', marginBottom: 20}}>
                        <Text style={{
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            textAlign: "center",
                            fontFamily: "Allerta-Stencil"
                        }}>
                            {type === 'login' ? "Sign In" : "Register"}
                        </Text>
                    </View>
                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                    <View style={{marginVertical: 5}} />
                    <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <View style={{marginTop: 20, marginHorizontal: 10, alignItems: 'flex-end'}}>
                        <View style={{marginHorizontal: 10}}>
                            <Button 
                                status='basic'
                                appearance='ghost' 
                                onPress={type === 'login' ? () => __doSingIn() : () => __doSignUp()}
                            >
                                {type === 'login' ? "Sign In" : "Continue"}
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{height: 35, justifyContent: 'center'}}>
                    <Text style={{color: 'red', fontFamily: 'Allerta-Stencil', fontWeight: 'bold', textAlign: 'center'}}>{error}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'flex-end', flexGrow: 1, paddingVertical: 20 }}>
                <TouchableOpacity onPress={navigateCallback}>
                    <View style={{marginTop: 20, marginHorizontal: 20, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, color: '#F24405', fontFamily: "Allerta-Stencil", fontWeight: 'bold', textAlign: 'center'}}>
                            {text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>

    )
}