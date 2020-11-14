import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import HomeStack from './stackNavigators/HomeStack';
import ShopStack from './stackNavigators/ShopStack';
import CartStack from './stackNavigators/CartStack';
import FavoriteStack from './stackNavigators/FavoriteStack';
import ProfileStack from './stackNavigators/ProfileStack';

const Tab = createBottomTabNavigator();

export default Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Menu"
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 14
                    },
                    activeTintColor: '#F24405',
                    showLabel: true
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}                
                />                
                <Tab.Screen
                    name="Shop"
                    component={ShopStack}
                
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoriteStack}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartStack}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                />                
            </Tab.Navigator>
        </NavigationContainer>
    )
} 