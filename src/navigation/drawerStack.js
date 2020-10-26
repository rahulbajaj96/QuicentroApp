import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
const Drawer = createDrawerNavigator();

import { useWindowDimensions, Button } from 'react-native';
import { BottomTabsStack } from './tabStack';
// import { DrawerComp } from './DrawerComp';
import ShopByCategory from '../screens/ShopByCategory';
import ProductDetail from '../screens/ProductDetail';
import DrawerComp from './DrawerComp';
import OrderHistory from '../screens/OrderHistory';
import ProductCart from '../screens/Cart';
import WishList from '../screens/WishList';
import Profile from '../screens/Profile';


export function DrawerStack() {
    const dimensions = useWindowDimensions();
    return (
        <Drawer.Navigator initialRouteName="Home" drawerPosition={'left'}
            drawerStyle={{ width: '70%', }}
            overlaColor='#AEB3C3'
            // hideStatusBar={true}
            drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                // itemStyle: { marginVertical: 30 },
            }}
            backBehavior={'initialRoute'}
            drawerContent={props => <DrawerComp {...props} />}
        >
            <Drawer.Screen name="Home" component={BottomTabsStack} />
            {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
            <Drawer.Screen name="Shop By Category" component={ShopByCategory} />
            {/* <Drawer.Screen name="ProductDetail" component={ProductDetail} /> */}
            <Drawer.Screen name="Shopping Cart" component={ProductCart} />
            <Drawer.Screen name="My WishList" component={WishList} />
            <Drawer.Screen name="Order History" component={OrderHistory} />
            <Drawer.Screen name="My Account" component={Profile} />





        </Drawer.Navigator>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}