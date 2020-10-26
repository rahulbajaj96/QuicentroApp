import { Text, View, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { CommonStyles, Colors, Images } from '../../constants';
import StarRating from 'react-native-star-rating';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from './styles';
import { ProductQuantity } from '../../components/ProductQuantity';
import { getProductdetail } from '../../services/Productdetail';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppComponent from '../../components/AppComponent';
import { Header } from '../../components/HeaderWithoutSearchBar';
import { BASE_URL, IMAGES_URL } from '../../config';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import * as API from '../../apiCalls';
import { Toast } from '../../components/Toast';
import Spinner from 'react-native-loading-spinner-overlay';

import { get_From_AsyncStorage, save_To_AsyncStorage, remove_from_AsyncStorage } from '../../services/StorageService';

const ProductDetail = ({ navigation, route, user_data, auth_token }) => {
    const [selectedColor, setselectedColor] = useState(0)
    const [productLike, setproductLike] = useState(0)

    const [productDetails, setproductDetails] = useState('')
    const [ProductRating, setProductRating] = useState(0)
    const [ProductImages, setProductImages] = useState([])
    const [ProductGalleryUrl, setProductGalleryUrl] = useState('')

    const [quantityItem, setquantityItem] = useState(0)
    const [ItemPrice, setItemPrice] = useState(0)
    const [alreadyInCart, setalreadyInCart] = useState(false)
    const [spinner, setspinner] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setspinner(true)
            fetchProductDetail();
        });
        return unsubscribe;
    }, [navigation, route]);

    const fetchProductDetail = async () => {
        try {
            let productinfo = `${user_data.id}/${route.params.slugName}`
            console.log('productinfo', productinfo)
            let api_res = await getProductdetail(productinfo);
            console.log('api res', api_res)
            if (api_res.status == 1) {
                setProductRating(parseFloat(api_res.product_rating))
                setproductDetails(api_res.productt)
                setProductImages(api_res.productt.galleries)
                setProductGalleryUrl(api_res.product_gallery_image_base_url)
                setproductLike(api_res.is_liked)
                checkAlreadyAddedToCart(api_res.productt);
            }
            setspinner(false)

        }
        catch (error) {
            conosle.log('errror', errro)
        }

    }
    const checkAlreadyAddedToCart = (productDetails) => {
        get_From_AsyncStorage('@cartList').then(cart => {
            console.log('cart is ', (cart))
            console.log('prodct is ', (productDetails.price))

            let cartList = []
            if (cart != null) {
                let ItemFound = false
                cartList = JSON.parse(cart);
                for (let i = 0; i < cartList.length; i++) {

                    if (cartList[i].id == productDetails.id) {
                        setquantityItem(cartList[i].quantity);
                        setItemPrice(cartList[i].total_price);
                        ItemFound = true;
                        setalreadyInCart(true)
                        break;
                    }
                }
                if (ItemFound == false) {
                    setquantityItem(1);
                    setItemPrice(productDetails.price);
                    setalreadyInCart(false)

                }
            }
            else {
                setquantityItem(1);
                setItemPrice(productDetails.price);
                setalreadyInCart(false)
            }

        })
    }
    const renderColors = (item) => {
        const activeColor = selectedColor == item.index
        return (
            <TouchableOpacity style={[styles.ColorsView, { borderColor: activeColor ? Colors.button_color : Colors.black_text }]}
            />
        )
    }
    const renderCraousal = (item, index) => {
        return (
            <View style={[CommonStyles.centerStyle, {
                borderRadius: 4, marginVertical: 2,
                flex: 1,
            }]}>
                <Image
                    resizeMode="contain"
                    source={{ uri: `${IMAGES_URL}${ProductGalleryUrl}${item.photo}` }}
                    style={{ height: '90%', width: '80%' }}
                />
            </View>
        )
    }

    const handleProductLike = async () => {
        setspinner(true)

        let APiUrl = `${productDetails.id}?api_token=${auth_token}`
        // if (productLike == 0) {
        try {
            let productLike_res = await API.AddToWishList(APiUrl);
            console.log('productLike_res', productLike_res)
            // setproductLike(!productLike)
            if (productLike_res.status == 1) {


                setproductLike(!productLike)
                setspinner(false)
                
                setTimeout(() => {
                    Toast(productLike_res.message);
                }, 500);
            }
            else {
                setspinner(false)

                setTimeout(() => {
                    Toast(productLike_res.message);
                }, 500);
            }
        }
        catch (error) {
            console.log('error', error);
        }
        // }
    }
    const handleItemValueChange = (value) => {
        console.log('productDetails', productDetails)
        let item_to_be_Stored = productDetails
        let cartList = []
        // get_From_AsyncStorage('@cartList').then(cart => {
        //     if (cart != null) {
        //         //we have cart list in storage
        //         cartList = JSON.parse(cart);
        //         if (cartList.length != 0) {
        //             let item_found_in_cart = false;
        //             for (let i = 0; i < cartList.length; i++) {
        //                 if (cartList[i].id == item_to_be_Stored.id) {
        //                     if (value == 0) {
        //                         cartList[i].quantity == --cartList[i].quantity
        //                         cartList[i].total_price = parseFloat(cartList[i].total_price) - parseFloat(item_to_be_Stored.price)
        //                     }
        //                     else {
        //                         cartList[i].quantity == ++cartList[i].quantity
        //                         cartList[i].total_price = parseFloat(cartList[i].total_price) + parseFloat(item_to_be_Stored.price)
        //                     }

        //                     item_found_in_cart = true;
        //                     break;
        //                 }
        //             }
        //             if (item_found_in_cart == false) {
        //                 item_to_be_Stored['quantity'] = 1;
        //                 item_to_be_Stored['total_price'] = parseFloat(item_to_be_Stored.price)
        //                 cartList.push(item_to_be_Stored)
        //             }
        //         }
        //     }
        //     else {
        //         //we need to add the first item in cart list 
        //         item_to_be_Stored['quantity'] = 1;
        //         item_to_be_Stored['total_price'] = parseFloat(item_to_be_Stored.price)
        //         cartList.push(item_to_be_Stored)
        //     }

        //     save_To_AsyncStorage('@cartList', JSON.stringify(cartList));

        // })



        if (value == 0) {
            //decrease qauntity
            setquantityItem(quantityItem - 1)
            setItemPrice(parseFloat((quantityItem - 1) * parseFloat(productDetails.price)))
        }
        else {
            //increase quantity
            setquantityItem(quantityItem + 1)
            setItemPrice(parseFloat((quantityItem + 1) * parseFloat(productDetails.price)))

        }
    }
    const addToCart = () => {
        get_From_AsyncStorage('@cartList').then(cart => {
            console.log('cart is ', JSON.parse(cart))
            let cartList_array = []
            if (cart != null) {
                cartList_array = JSON.parse(cart)
            }
            else {
                cartList_array = []
            }
            let item_to_be_Stored = productDetails;
            item_to_be_Stored['quantity'] = quantityItem;
            item_to_be_Stored['total_price'] = ItemPrice
            cartList_array.push(item_to_be_Stored);

            save_To_AsyncStorage('@cartList', JSON.stringify(cartList_array));
            navigation.navigate('Cart');
        })
    }
    const checkLocalStorage = () => {
        get_From_AsyncStorage('@cartList').then(cart => {
            console.log('cart is ', JSON.parse(cart))

        })
    }
    const removeCart = () => {
        remove_from_AsyncStorage('@cartList');
    }
    return (
        <AppComponent>
            <Header />
            <Spinner visible={spinner} />
            <View style={[CommonStyles.flex1]}>
                <View style={[{ flex: 0.6, backgroundColor: '#fff', borderWidth: 0 }, CommonStyles.centerStyle]}>
                    <MaterialIcons name="arrow-back" size={25} color="black" style={styles.backIcon} onPress={() => navigation.goBack()} />
                    <Carousel
                        data={ProductImages}
                        renderItem={({ item, index }) => renderCraousal(item, index)}
                        sliderWidth={400}
                        itemWidth={400}
                        autoplay={true}
                        // enableMomentum={false}
                        // lockScrollWhileSnapping={true}
                        autoplayInterval={1000}
                    />

                </View>
                <View style={[styles.bottomView,]}>
                    <View style={{ flex: 1, borderWidth: 0, paddingVertical: 10, }}>
                        <View style={{ height: 70, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 0, }}>
                            <Text style={{ color: Colors.black_text, fontSize: 16, }}>Color</Text>
                            <FlatList
                                data={[1, 2, 3]}
                                horizontal={true}
                                renderItem={item => renderColors(item)}
                                keyExtractor={(_, index) => index.toString()}
                                scrollEnabled={false}
                            />

                            <AntDesign name={productLike ? "heart" : 'hearto'} size={20} color="black" style={styles.likeIcon} onPress={() => handleProductLike()} />
                        </View>

                        <ScrollView contentContainerStyle={{ borderWidth: 0, paddingHorizontal: 10 }}>

                            <Text style={styles.productName}>{productDetails.name}</Text>

                            <View style={{ borderWidth: 0 }}>
                                {/* <HTML html={productDetails.details} /> */}
                            </View>
                            <View style={{ paddingTop: 4, height: 100 }}>
                                <View style={styles.review}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={ProductRating}
                                        fullStarColor={'#FCB941'}
                                        starSize={18}
                                        emptyStarColor={Colors.grey_text}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                    <Text style={styles.reviewText}>(26 Reviews)</Text>
                                </View>
                                <View style={[styles.quantityPrice]}>
                                    <ProductQuantity
                                        alreadyDisabled={alreadyInCart}
                                        quantity={quantityItem}
                                        onDecrease={() => handleItemValueChange(0)}
                                        onIncrease={() => handleItemValueChange(1)}
                                    />

                                    <Text style={styles.priceTag}>${ItemPrice}</Text>

                                </View>
                            </View>
                            {
                                !alreadyInCart
                                    ?
                                    <View style={[{ backgroundColor: '#fff', borderWidth: 0, height: 60 }, CommonStyles.centerStyle]}>
                                        <TouchableOpacity style={[styles.addToCartButton, CommonStyles.centerStyle]} onPress={() => addToCart()}>
                                            <Text style={{ color: Colors.white_text, fontSize: 18 }}>Add to Cart</Text>
                                        </TouchableOpacity>

                                    </View>
                                    :
                                    <View style={[{ backgroundColor: '#fff', borderWidth: 0, height: 60 }, CommonStyles.centerStyle]}>
                                        <TouchableOpacity style={[styles.addToCartButton, CommonStyles.centerStyle]} onPress={() => navigation.navigate('Cart')}>
                                            <Text style={{ color: Colors.white_text, fontSize: 18 }}>Already Added to Cart</Text>
                                        </TouchableOpacity>

                                    </View>
                            }


                            {/* <View style={[{ backgroundColor: '#fff', borderWidth: 0, height: 60 }, CommonStyles.centerStyle]}>
                                <TouchableOpacity style={[styles.addToCartButton, CommonStyles.centerStyle]} onPress={() => checkLocalStorage()}>
                                    <Text style={{ color: Colors.white_text, fontSize: 18 }}>View Cart</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={[{ backgroundColor: '#fff', borderWidth: 0, height: 60 }, CommonStyles.centerStyle]}>
                                <TouchableOpacity style={[styles.addToCartButton, CommonStyles.centerStyle]} onPress={() => removeCart()}>
                                    <Text style={{ color: Colors.white_text, fontSize: 18 }}>Remove Cart</Text>
                                </TouchableOpacity>

                            </View> */}
                            <View style={{ height: 2 }} />
                        </ScrollView>
                    </View>

                </View>
            </View>
        </AppComponent >
    )
}
const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
    user_data: state.loginReducer.user_data
});
export default connect(mapStateToProps, null)(ProductDetail);