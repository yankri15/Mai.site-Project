import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserNavbar from './UserNavbar';
import ForumNavigator from '../Navigation/ForumNavigator'

const Drawer = createDrawerNavigator();

const HamburgerNav = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='Home' component={UserNavbar} />
            <Drawer.Screen name='Forum' component={ForumNavigator} />
        </Drawer.Navigator>
    )
}

export default HamburgerNav