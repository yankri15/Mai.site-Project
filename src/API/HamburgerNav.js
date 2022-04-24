import React, { useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import UserNavbar from './UserNavbar';
import ForumNavigator from '../Navigation/ForumNavigator';
import { useAuth } from '../AuthProvider/AuthProvider';
import { View } from 'react-native-web';

const Drawer = createDrawerNavigator();

const HamburgerNav = () => {

    const { logout } = useAuth();
    const [error, setError] = useState("");

    async function handleLogout() {
        try {
            setError("");
            await logout();
            //alert('User logged out')
        } catch (err) {
            setError("Failed to logout");
            console.log(error + ":\n " + err);
        }
    }

    function DrawerContent(props) {
        return (
            <View>
                {/* <DrawerContentScrollView >

                </DrawerContentScrollView>
                <Drawer.Section label='Logout' onPress={handleLogout}>
                    <Text>Logout</Text>
                </Drawer.Section> */}
                <Text>Fuck</Text>
            </View>
        );
    }

    //drawerContent={props => <DrawerContent {...props} />}
    // screenOptions={{ headerShown: false }}
    return (
        <Drawer.Navigator >
            <Drawer.Screen name='Home' component={UserNavbar} />
            <Drawer.Screen name='Forum' component={ForumNavigator} />
        </Drawer.Navigator>
    )
}

export default HamburgerNav