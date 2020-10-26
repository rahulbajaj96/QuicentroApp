import { Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { CartView } from './CartView';
import { Colors, CommonStyles } from '../../constants';
import styles from './styles';
import { Header } from '../../components/HeaderWithoutSearchBar';
import AppComponent from '../../components/AppComponent';
import { get_From_AsyncStorage, save_To_AsyncStorage, remove_from_AsyncStorage } from '../../services/StorageService';
import { connect } from "react-redux";
import * as API from '../../apiCalls';
import { Toast } from '../../components/Toast';

const ProductCart = ({ navigation, route, auth_token, user_data }) => {
    const [cart_array, setcart_array] = useState([])
    const [Total_price, setTotal_price] = useState(0)
    const [totalQuantity, settotalQuantity] = useState(0)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCartList();
        });
        return unsubscribe;
    }, [navigation, route])

    const getCartList = () => {
        get_From_AsyncStorage('@cartList').then(cart => {
            console.log('cart local ', cart)
            if (cart != null) {
                let cartList = JSON.parse(cart);
                setcart_array(cartList)
                let total_price = 0;
                let total_quantity = 0
                for (let i = 0; i < cartList.length; i++) {
                    total_price += parseFloat(cartList[i].total_price)
                    total_quantity += cartList[i].quantity
                }
                console.log('total price ', total_price)
                setTotal_price(total_price)
                settotalQuantity(total_quantity);
            }
            else {
                setcart_array([])
            }
        });
    }
    const showAlertDelete = (item) => {
        Alert.alert(
            `Quicentro`,
            `Are you sure you want to delete this ${item.name} from cart?`,
            [
                {
                    text: "OK",
                    onPress: () => deleteFromCart(item),
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
    const deleteCartItemFromAsyncStorage = (item_to_be_Stored) => {
        get_From_AsyncStorage('@cartList').then(cart => {
            if (cart != null) {
                //we have cart list in storage
                let cartList = JSON.parse(cart);
                if (cartList.length != 0) {

                    for (let i = 0; i < cartList.length; i++) {
                        if (cartList[i].id == item_to_be_Stored.id) {
                            cartList.splice(i, 1);
                        }
                    }
                }
                save_To_AsyncStorage('@cartList', JSON.stringify(cartList));
            }

        })
    }
    const deleteFromCart = (item) => {
        console.log('item to e deleted', item);
        deleteCartItemFromAsyncStorage(item);
        let newTotalPrice = 0;
        let newTotalQuantity = 0
        for (let i = 0; i < cart_array.length; i++) {
            if (cart_array[i].id == item.id) {
                newTotalPrice = Total_price - parseFloat(cart_array[i].total_price)
                newTotalQuantity = totalQuantity - cart_array[i].quantity
                cart_array.splice(i, 1);
            }
        }
        setcart_array([...cart_array]);
        setTotal_price(newTotalPrice);
        settotalQuantity(newTotalQuantity);
    }
    const renderCart = (item) => {
        return (
            <CartView
                item={item}
                quantity={0}
                selected={true}
                onDecrease={() => handleItemValueChange(item, 0)}
                onIncrease={() => handleItemValueChange(item, 1)}
                onIconPressed={() => showAlertDelete(item)}
            />
        )
    }
    const handleItemValueChange = (productDetails, value) => {
        console.log('productDetails', productDetails)
        let item_to_be_Stored = productDetails
        let cartList = []
        get_From_AsyncStorage('@cartList').then(cart => {
            if (cart != null) {
                //we have cart list in storage
                cartList = JSON.parse(cart);
                if (cartList.length != 0) {
                    let item_found_in_cart = false;
                    for (let i = 0; i < cartList.length; i++) {
                        if (cartList[i].id == item_to_be_Stored.id) {
                            if (value == 0) {
                                cartList[i].quantity == --cartList[i].quantity
                                cartList[i].total_price = parseFloat(cartList[i].total_price) - parseFloat(item_to_be_Stored.price)


                            }
                            else {
                                cartList[i].quantity == ++cartList[i].quantity
                                cartList[i].total_price = parseFloat(cartList[i].total_price) + parseFloat(item_to_be_Stored.price)
                                // total_price += parseFloat(item_to_be_Stored.price)
                            }

                            item_found_in_cart = true;
                            break;
                        }
                    }

                }
            }
            else {
                //we need to add the first item in cart list 

            }

            save_To_AsyncStorage('@cartList', JSON.stringify(cartList));


        })

        let total_new_price = Total_price;
        let total_new_quantity = totalQuantity;
        for (let i = 0; i < cart_array.length; i++) {
            if (cart_array[i].id == item_to_be_Stored.id) {
                if (value == 0) {
                    cart_array[i].quantity == --cart_array[i].quantity
                    cart_array[i].total_price = parseFloat(cart_array[i].total_price) - parseFloat(item_to_be_Stored.price)
                    total_new_price = Total_price - parseFloat(item_to_be_Stored.price)
                    total_new_quantity = totalQuantity - 1
                }
                else {
                    cart_array[i].quantity == ++cart_array[i].quantity
                    cart_array[i].total_price = parseFloat(cart_array[i].total_price) + parseFloat(item_to_be_Stored.price)
                    total_new_price = Total_price + parseFloat(item_to_be_Stored.price)
                    total_new_quantity = totalQuantity + 1
                }
            }
        }

        setcart_array([...cart_array])

        settotalQuantity(total_new_quantity)
        setTotal_price(total_new_price);
    }

    const onCheckOut = async () => {

        console.log('userData', user_data)

        let formdata = {
            'api_token': auth_token,
            'personal_name': user_data.name,
            'personal_email': user_data.email,
            'shipping': 'shipto',
            'pickup_location': 'Azampur',
            'name': user_data.name,
            'phone': user_data.phone,
            'email': user_data.email,
            'address': user_data.address,
            'customer_country': 'Algeria',
            'city': 'Washington, DC',
            'zip': '1234',
            'shipping_name': '',
            'shipping_email': '',
            'shipping_phone': '',
            'shipping_address': '',
            'shipping_country': 'Algeria',
            'shipping_city': '',
            'shipping_zip': '',
            'order_notes': '',
            'method': 'Cash On Delivery',
            'shipping_cost': 0,
            'packing_cost': 0,
            'dp': 0,
            'tax': 0,
            'totalQty': totalQuantity,
            'vendor_shipping_id': 0,
            'vendor_packing_id': 0,
            'total': Total_price,
            'coupon_code': '',
            'coupon_discount': '',
            'coupon_id': '',
            'user_id': user_data.id,



        }

        let cart_ = [];
        for (let i = 0; i < cart_array.length; i++) {

            let obj = {}
            obj['id'] = cart_array[i].id
            obj['size'] = 'S'
            obj['color'] = '#851818'
            obj['size_price'] = cart_array[i].price
            obj['qty'] = cart_array[i].quantity
            obj['size_qty'] = 0
            obj['size_key'] = ''
            obj['keys'] = ''
            obj['values'] = ''
            obj['prices'] = ''

            cart_.push(obj);
            // formdata['cart[' + i + '][id]'] = cart_array[i].id,
            // formdata['cart[' + i + '][size]'] = 'S',
            // formdata['cart[' + i + '][color]'] = '#851818',
            // formdata['cart[' + i + '][size_price]'] = cart_array[i].price,
            // formdata['cart[' + i + '][qty]'] = cart_array[i].quantity,
            // formdata['cart[' + i + '][size_qty]'] = cart_array[i].quantity,
            // formdata['cart[' + i + '][size_key]'] = '',
            // formdata['cart[' + i + '][keys]'] = '',
            // formdata['cart[' + i + '][values]'] = '',
            // formdata['cart[' + i + '][prices]'] = ''
        }

        formdata['cart'] = (cart_)
        // let form = {

        //     "api_token": "x6OKL2EyVHjc1X4IrleuMrtlkIEl6HJR1BJWdfWy4LtobszZFidKUjHzSLLyAmcMpMmaDHX7jIvtBNKV1603375543",
        //     "personal_name": "Qwerty",
        //     "personal_email": "Qwerty@yopmail.com",
        //     "shipping": "shipto",
        //     "pickup_location": "Azampur",
        //     "name": "Qwerty",
        //     "phone": "1122336655",
        //     "email": "Qwerty@yopmail.com",
        //     "address": "wwerdtygjjmm",
        //     "customer_country": "Algeria",
        //     "city": "Washington, DC",
        //     "zip": "1234",
        //     "shipping_name": "",
        //     "shipping_email": "",
        //     "shipping_phone": "",
        //     "shipping_address": "",
        //     "shipping_country": "Algeria",
        //     "shipping_city": "",
        //     "shipping_zip": "",
        //     "order_notes": "",
        //     "method": "Cash On Delivery",
        //     "shipping_cost": "0",
        //     "packing_cost": "0",
        //     "dp": "0",
        //     "tax": "0",
        //     "totalQty": 6,
        //     "vendor_shipping_id": "0",
        //     "vendor_packing_id": "0",
        //     "total": 6780,
        //     "coupon_code": "",
        //     "coupon_discount": "",
        //     "coupon_id": "",
        //     "user_id": 55,
        //     'cart[0][id]': 101,
        //     'cart[0][qty]': 2,
        //     'cart[0][size]': 'S',
        //     'cart[0][color]': '#851818',
        //     'cart[0][size_qty]': '2147483645',
        //     'cart[0][size_price]': '20',
        //     'cart[0][size_key]': '0',
        //     'cart[0][keys]': '',
        //     'cart[0][values]': '',
        //     'cart[0][prices]': ''


        // }
        console.log('formdata of cart checkout', JSON.stringify(formdata))

        try {
            let checkout_response = await API.checkoutApi(formdata);
            console.log('response checkout', checkout_response)
            if (checkout_response.status == 1) {
                setTimeout(() => {
                    Toast(checkout_response.message);
                }, 200);
                remove_from_AsyncStorage('@cartList');
                navigation.navigate('Home');
            }
        }
        catch (error) {
            console.log('error of Cart Api ', error);
        }

    }

    return (
        <AppComponent>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header />
                <View style={[CommonStyles.centerStyle]}>
                    <View style={{ paddingVertical: 5, borderBottomWidth: 2, borderColor: Colors.button_color }}>
                        <Text style={CommonStyles.title}>Cart</Text>
                    </View>
                </View>
                {
                    cart_array.length != 0
                        ?
                        <View style={{ flex: 1, backgroundColor: '#fff' }}>
                            <View style={{ flex: 0.8, backgroundColor: '#fff' }}>
                                <FlatList
                                    keyExtractor={(_, index) => index.toString()}
                                    data={cart_array}
                                    renderItem={({ item }) => renderCart(item)}
                                    extraData={cart_array}
                                />
                            </View>
                            <View style={[styles.checkoutView]}>

                                <View style={styles.itemInfo}>
                                    <Text style={{ color: Colors.black_text, fontSize: 18 }}>Selected Item ({totalQuantity}) </Text>
                                    <Text style={{ color: Colors.button_color, fontSize: 18 }}>Total ${Total_price} </Text>
                                </View>
                                <TouchableOpacity style={[styles.checkoutButton, CommonStyles.centerStyle]} onPress={() => onCheckOut()}>
                                    <Text style={styles.checkoutText}>Checkout</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        :
                        <View style={[CommonStyles.centerStyle, CommonStyles.flex1]}>
                            <Text style={{ color: Colors.black_text, fontSize: 16 }}>Your Cart is Empty</Text>
                        </View>
                }

            </View >
        </AppComponent>
    )
}
const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
    user_data: state.loginReducer.user_data
});
export default connect(mapStateToProps, null)(ProductCart);