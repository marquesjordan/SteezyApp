import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import HomeStack from './stackNavigators/HomeStack';
import ShopStack from './stackNavigators/ShopStack';
import CartStack from './stackNavigators/CartStack';
import FavoriteStack from './stackNavigators/FavoriteStack';
import ProfileStack from './stackNavigators/ProfileStack';

import { Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    icon: {
      width: 32,
      height: 32,
    },
});

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
                    showLabel: false
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}    
                    options={{
                        tabBarLabel: "Routes",
                        tabBarIcon: ({ focused, color }) => (
                            focused
                            ?   <Icon
                                  style={styles.icon}
                                  fill='red'
                                  name='star'
                                />
                            : <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='star'
                            />
                        ),
                    }}            
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