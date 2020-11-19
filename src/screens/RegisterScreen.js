import React from 'react';
import {View} from 'react-native';
import AuthForm from '../components/auth/AuthForm';

export default Register = ({ navigation }) => {
    return (
      <View style={{ flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: 'white' }}>
        <AuthForm type="register" text="Already have Account? Log In" navigateCallback={() => navigation.navigate('Login')} />
      </View>
    )
}