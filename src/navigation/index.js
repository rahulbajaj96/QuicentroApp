import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DrawerStack } from './drawerStack';
import Home from '../screens/HomeTab';
import ProductDetail from '../screens/ProductDetail';
import SearchProduct from '../screens/Search';
import ProductCart from '../screens/Cart';
import OrderHistory from '../screens/OrderHistory';
import LogIn from '../screens/Auth/Login';

const Stack = createStackNavigator();

import { Provider } from 'react-redux';
import store from '../Redux/store';
import Address from '../screens/Address';
import ForgotPassword from '../screens/Passwords/ForgotPassword';
import ResetPassword from '../screens/Passwords/ResetPassword';
import ShopByCategory from '../screens/ShopByCategory';

import { connect } from 'react-redux';


function AppNavigation({ auth_token }) {
    console.log('auth_token', auth_token)
    return (
       
            <NavigationContainer >
                <Stack.Navigator initialRouteName='LogIn' headerMode='none'>

                    {/* //Auth */}
                    {/* {
                        auth_token ?
                            ( */}
                                <Stack.Screen name='DrawerStack' component={DrawerStack} />
                            {/* )
                            :
                            (
                                <> */}
                                    <Stack.Screen name='LogIn' component={LogIn} />
                                    <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                                    <Stack.Screen name='ResetPassword' component={ResetPassword} />
                                {/* </> */}
                            {/* ) */}
                    {/* } */}




                    {/* <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='ProductDetail' component={ProductDetail} />
                    <Stack.Screen name='SearchProduct' component={SearchProduct} />
                    <Stack.Screen name='ProductCart' component={ProductCart} />
                    <Stack.Screen name='OrderHistory' component={OrderHistory} /> */}


                </Stack.Navigator>

            </NavigationContainer>
        // </Provider>
    )
}

const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
});

export default connect(mapStateToProps, null)(AppNavigation);