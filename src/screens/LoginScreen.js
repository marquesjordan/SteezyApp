import React from 'react';
import {View} from 'react-native';
import AuthForm from '../components/auth/AuthForm';

export default Login = ({ navigation }) => {
    return (
      <View style={{ flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: 'white' }}>
        <AuthForm type="login" text="Register New Account" navigateCallback={() => navigation.navigate('Register')} />
      </View>
    )
}