import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles, Colors, Images } from '../constants';
import { remove_from_AsyncStorage, get_From_AsyncStorage } from '../services/StorageService';
import * as API from '../apiCalls';
import { connect } from 'react-redux';
import { LogoutUser } from '../Redux/actions/loginActions';
import FontAwesome from "react-native-vector-icons/FontAwesome";


const routeArr = [
    { name: 'Home', route: 'Home', },
    { name: 'Shop By Category', route: 'ShopByCategory', },
    { name: 'Sale', route: 'Sale', },
    { name: 'Shopping cart', route: 'Chat', },
    { name: 'My Wishlist', route: 'About', },
    { name: 'Order history', route: 'Goals', },
    { name: 'FAQ', route: 'FAQ', },
    { name: 'CustomerSupport', route: 'CustomerSupport', },
    { name: 'Your Account', route: 'CustomerSupport', },
    { name: 'Sign Out', route: 'Sign Out', },

];
const DrawerComp = (props) => {

    // console.log('navigation',navigation)
    // console.log('state',state)
    // console.log('descriptors',descriptors)
    // console.log('props od Drawer', props)
    let activeIndex = props.state.index;
    let activeRouteName = props.state.routes[activeIndex].name;

    const [userData, setuserData] = useState('')
    const [userToken, setuserToken] = useState('')
    // console.log('activeRouteName', activeRouteName)
    useEffect(() => {
        get_From_AsyncStorage('@User_Data').then(user => {
            console.log('userData', user)
            if (user != null) {
                setuserData(JSON.parse(user))

            }
        })
    }, [])

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={[{ borderColor: Colors.button_color, borderLeftWidth: activeRouteName == item.name ? 5 : 0 }, CommonStyles.drawerItemStyle]}
                onPress={() => props.navigation.navigate(item.name)}
            >
                <Text style={[CommonStyles.drawerItemText, { color: activeRouteName == item.name ? Colors.button_color : Colors.black_text }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const performLogout = async () => {
        Alert.alert(
            `Quicentro`,
            `Are you sure you want to Logout?`,
            [
                {
                    text: "OK",
                    onPress: () => handleLogout(),
                    style: "cancel"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    }
    const handleLogout = async () => {



        // let formdata = new FormData();
        // formdata.append('api_token', props.auth_token);
        let formdata = {
            'api_token': props.auth_token
        }
        console.log('props formdata', formdata);
        try {
            let resultLogout = await props.LogoutUser(formdata);
            if (resultLogout.type == 'Logout_Successful') {
                await remove_from_AsyncStorage("@User_Data");
                await remove_from_AsyncStorage('@User_Token');
                props.navigation.navigate('LogIn');
            }
            else {
                console.log('unscucess error')
            }
        }
        catch (error) {
            console.log('failure error', error)

        }


    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={CommonStyles.drawerProfileView}>
                <View style={[CommonStyles.drawerProfileImageView,CommonStyles.centerStyle]}>
                    <Image source={userData != '' ? userData.photo != null ? { uri: userData.photo } : Images.men : Images.men} style={{ height: 70, width: 70, borderRadius: 35, borderWidth: 0,borderColor:'#000' }} resizeMode='contain'/>

                </View>

                <View style={{ justifyContent: 'center', borderWidth: 0, marginLeft: '5%' }}>
                    <Text style={{ marginBottom: 10, color: '#000', fontSize: 14 }}>Hello</Text>
                    <Text style={{ color: '#000', fontSize: 18 }}>{userData != '' ? userData.name : ''}</Text>
                </View>
                <View style={{ position: 'absolute', right: 5, top: 5, borderWidth: 0, padding: 5 }}>
                    <FontAwesome name="bars" size={18} color="black" onPress={() => props.navigation.closeDrawer()} />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: '10%' }}>
                {
                    props.state.routes.map((route, index) => renderItem(route, index))
                }
                <TouchableOpacity style={[{ borderColor: Colors.button_color, }, CommonStyles.drawerItemStyle]}
                    onPress={() => performLogout()}
                >
                    <Text style={[CommonStyles.drawerItemText, { color: Colors.button_color }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
    user: state.loginReducer.user_data
});
const mapDispatchToProps = { LogoutUser };
export default connect(mapStateToProps, mapDispatchToProps)(DrawerComp);

const styles = StyleSheet.create({

})