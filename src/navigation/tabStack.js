import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import images from '../constants/images';
import { Image, Button, View } from 'react-native';
import SearchProduct from '../screens/Search';
import ProductCart from '../screens/Cart';
import Profile from '../screens/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeTab';
import ProductsList from '../screens/ProductsList';
import Wishlist from '../screens/WishList';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { Colors } from '../constants';
import ProductDetail from '../screens/ProductDetail';
const BottomTabs = createBottomTabNavigator();

const HomeNavigator = createStackNavigator();



export function HomeStack() {
    return (
        <HomeNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
            <HomeNavigator.Screen name="HomeScreen" component={Home} />
            <HomeNavigator.Screen name="ProductsList" component={ProductsList} />
            <HomeNavigator.Screen name="ProductDetail" component={ProductDetail} />
        </HomeNavigator.Navigator>
    );
}

export function BottomTabsStack() {
    return (
        <BottomTabs.Navigator
            tabBarOptions={{
                activeTintColor: Colors.button_color,
                inactiveTintColor: 'rgba(42, 46, 40, 0.5)',
                labelStyle: { fontSize: 10, marginBottom: 5, borderWidth: 0, },
            }}
            backBehavior={'initialRoute'}
            >
            <BottomTabs.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <SimpleLineIcons name="home" size={18}  color={focused ? color : "black"} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Search"
                component={SearchProduct}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="md-search" size={24} color={focused ? color : "black"} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Wishlist"
                component={Wishlist}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Entypo name="heart-outlined" size={24} color={focused ? color : "black"} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Cart"
                component={ProductCart}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <SimpleLineIcons name="handbag" size={22} color={focused ? color : "black"} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather name="user" size={24} color={focused ? color : "black"} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}