import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TestScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>Cart Screen</Text>
    </View>
  )
}

export default CartStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Bag" component={TestScreen} />
    </Stack.Navigator>
  );
}


            