import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

export default AuthButtons = ({navigation}) => {
  
    return (
      <>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Button 
            style={{ fontSize: 22, color: '#000000' }} appearance='ghost' 
            onPress={() => navigation.navigate('Login')}
            status='basic'
          >
            Login
          </Button>
          <View style={{marginHorizontal: 10}} />
          <Button  
            style={{backgroundColor: '#F24405', fontSize: 22, borderColor: '#F24405' }} 
            onPress={() => navigation.navigate('Register')}
          >
            Join Now
          </Button> 
        </View>
      </>
    )
  }