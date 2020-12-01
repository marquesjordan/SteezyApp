import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

export default AuthReminder = ({navigation}) => {

    const styles = {
      text: {
        fontSize: 30,
        color: '#fff',
        fontFamily: "Allerta-Stencil",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        
      }
    }

    return (
      <>
        <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#ffffff66' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Login To Chat</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }