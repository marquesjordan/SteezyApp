import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TestScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>Shop Screen</Text>
    </View>
  )
}

export default ShopStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Shop" component={TestScreen} />
    </Stack.Navigator>
  );
}


            