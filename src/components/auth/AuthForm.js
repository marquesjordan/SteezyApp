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
          console.log('xs ', response)
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
          setError('Somethings is off! Try Again.')
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
            navigation.reset({
                index: 1,
                routes: [
                  {
                    name: 'Profile'
                  },
                ],
              })
        }
        } catch (e) {
          console.error(e.message)
        }
    }

    const styles = {
        container: {flex:1, width},
        wrapper: {flexGrow: 2, justifyContent: 'flex-end'},
        header: {justifyContent: 'center',borderWidth:22, flex: 1, alignItems: 'center'},
        form: {margin: 20},
        formHeader: {justifyContent: 'center', marginBottom: 20},
        formHeaderText: {fontSize: 30, fontWeight: 'bold',textAlign: "center", fontFamily: "Allerta-Stencil" },
        formButton: {marginTop: 20, marginHorizontal: 10, paddingHorizontal: 10, alignItems: 'flex-end'},
        errorContainer: {height: 35, justifyContent: 'center'},
        errorText: {color: 'red', fontFamily: 'Allerta-Stencil', fontWeight: 'bold', textAlign: 'center'},
        footer: {justifyContent: 'flex-end', flexGrow: 1, paddingVertical: 20 },
        footerText: {fontSize: 16, color: '#F24405', fontFamily: "Allerta-Stencil", fontWeight: 'bold', textAlign: 'center'}
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/steezy-logo.png')}
                    />
                </View>
                <View style={styles.form}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formHeaderText}>
                            {type === 'login' ? "Sign In" : "Register"}
                        </Text>
                    </View>
                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => {
                            setError('');
                            setEmail(text);
                        }}
                    />

                    <View style={{marginVertical: 5}} />
                    <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => {
                            setError('');
                            setPassword(text);
                        }}
                    />
                    <View style={styles.formButton}>
                        <Button 
                            status='basic'
                            appearance='ghost' 
                            onPress={type === 'login' ? () => __doSingIn() : () => __doSignUp()}
                        >
                            {type === 'login' ? "Sign In" : "Continue"}
                        </Button>
                    </View>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={navigateCallback}>
                    <Text style={styles.footerText}>
                        {text}
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>

    )
}