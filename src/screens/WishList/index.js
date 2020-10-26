import { Text, View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { CommonStyles, Colors } from '../../constants';
import { WishlistCard } from './wishlistCard'
import { Header } from '../../components/HeaderWithoutSearchBar';
import AppComponent from '../../components/AppComponent';
import * as API from '../../apiCalls';
import { connect } from 'react-redux';
import styles from './styles';
import { IMAGES_URL } from '../../config';
import Spinner from 'react-native-loading-spinner-overlay';

const Wishlist = ({ navigation, user_data, auth_token }) => {
    const [Wishlist, setWishlist] = useState([])
    const [wishlist_thumbnail_url, setwishlist_thumbnail_url] = useState('')
    const [wishlist_product_Image__url, setwishlist_product_Image__url] = useState('')
    const [spinner, setspinner] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setspinner(true)
            getWishListProducts();
        });
        return unsubscribe;
    }, [navigation]);

    const getWishListProducts = async () => {
        let apiUrl = `api_token=${auth_token}&sort=price_desc&page=1`
        try {
            let wishList_prod = await API.getWishList(apiUrl);
            console.log('wishList pro', wishList_prod);
            if (wishList_prod.status == 1) {
                setWishlist(wishList_prod.wishlists.data);
                setwishlist_thumbnail_url(wishList_prod.product_thumbnail_base_url);
                setwishlist_product_Image__url(wishList_prod.product_image_base_url)
                setspinner(false)
            }
            else {
                setWishlist([])
                setspinner(false)
            }
        }
        catch (error) {
            console.log('error of WishList products', error)
        }
    }
    const removeFromWishListAlert = (item) => {
        Alert.alert(
            `Quicentro`,
            `Are you sure you want to delete this ${item.name} from your wishList?`,
            [
                {
                    text: "OK",
                    onPress: () => deleteItemFromWishList(item),
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
    const deleteItemFromWishList = async (item) => {
        let apiUrl = `${item.wishlist_id}?api_token=${auth_token}&sort=price_desc&page=1`;
        console.log('apiUrl', apiUrl)
        try {
            let delete_from_wishlist = await API.RemoveFromWishList(apiUrl);
            console.log('delete_from_wishlist', delete_from_wishlist);
            getWishListProducts();
            // if (delete_from_wishlist.status == 1) {

            // }
        }
        catch (error) {
            console.log('error of WishList Delete Item Api ', error);
        }

    }
    const goToProductdetail = (item) => {
        navigation.navigate('ProductDetail', { slugName: item.slug })
    }

    return (
        <AppComponent>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header />
                <Spinner visible={spinner} />
                <View style={[CommonStyles.centerStyle]}>
                    <View style={{ paddingVertical: 5, borderBottomWidth: 2, borderColor: Colors.button_color }}>
                        <Text style={styles.title}>My WishList</Text>
                    </View>
                </View>
                {
                    Wishlist.length == 0
                        ?
                        <View style={[{ flex: 0.9, backgroundColor: '#fff', }, CommonStyles.centerStyle]}>
                            <Text style={{ color: Colors.black_text, fontSize: 16 }}>Your Order Wishlist is Empty</Text>
                        </View>
                        :
                        <View style={{ flex: 0.9, backgroundColor: '#fff', }}>

                            <FlatList
                                data={Wishlist}
                                renderItem={({ item }) => <WishlistCard item={item}
                                    deletePressed={() => removeFromWishListAlert(item)}
                                    imageUrl={`${IMAGES_URL}${wishlist_thumbnail_url}`}
                                    onWishListItemPress={() => goToProductdetail(item)}
                                />}
                                extraData={Wishlist}
                                keyExtractor={(_, index) => index.toString()}
                            />
                        </View>
                }


            </View>
        </AppComponent>
    )
}
const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
    user_data: state.loginReducer.user_data
});
export default connect(mapStateToProps, null)(Wishlist);