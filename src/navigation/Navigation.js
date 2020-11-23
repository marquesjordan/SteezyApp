import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import HomeStack from './stackNavigators/HomeStack';
import ShopStack from './stackNavigators/ShopStack';
import ChatStack from './stackNavigators/ChatStack';
import FavoriteStack from './stackNavigators/FavoriteStack';
import ProfileStack from './stackNavigators/ProfileStack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    icon: {
      fontSize: 30
    },
});

export default Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Menu"
                tabBarOptions={{
                    
                    labelStyle: {
                        fontSize: 12
                    },
                    activeTintColor: '#F24405',
                    showLabel: false
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}    
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ? <FontAwesome5 style={{fontSize: 30, color: '#F24405', textAlign: 'center'}} name={'fist-raised'} />
                            : <FontAwesome5 style={{fontSize: 30}} name={'fist-raised'} />
                        ),
                    }}            
                />                
                <Tab.Screen
                    name="Shop"
                    component={ShopStack}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ? <FontAwesome5 style={{fontSize: 30, color: '#F24405'}} name={'money-bill-alt'} />
                            : <FontAwesome5 style={{fontSize: 30}} name={'money-bill-alt'} />
                        ),
                    }}  
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoriteStack}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ? <FontAwesome5 style={{fontSize: 30, color: '#F24405'}} name={'gem'} />
                            : <FontAwesome5 style={{fontSize: 30}} name={'gem'} />
                        ),
                    }}  
                />
                <Tab.Screen
                    name="Chat"
                    component={ChatStack}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ? <FontAwesome5 style={{fontSize: 30, color: '#F24405'}} name={'comments'} />
                            : <FontAwesome5 style={{fontSize: 30}} name={'comments'} />
                        ),
                    }}  
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ? <FontAwesome5 style={{fontSize: 30, color: '#F24405'}} name={'id-badge'} />
                            : <FontAwesome5 style={{fontSize: 30}} name={'id-badge'} />
                        ),
                    }}  
                />                
            </Tab.Navigator>
        </NavigationContainer>
    )
} 