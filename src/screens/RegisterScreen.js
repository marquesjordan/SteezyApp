import React from 'react';
import {View} from 'react-native';
import AuthForm from '../components/auth/AuthForm';

export default LoginScreen = ({ navigation }) => {
  const styles = {
    container: { 
      flex: 1, 
      paddingTop: 50, 
      alignItems: 'center', 
      backgroundColor: '#fff' 
    }
  }  

  return (
    <View style={styles.container}>
        <AuthForm type="register" text="Already have Account? Log In" navigateCallback={() => navigation.navigate('Login')} />
      </View>
    )
}