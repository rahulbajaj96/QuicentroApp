import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CommonStyles, Images, Colors } from '../../constants';
import { ProductItem } from '../../components/ProductItem';
import { Header } from '../../components/Header';
import AppComponent from '../../components/AppComponent';
import * as API from '../../apiCalls';
import { IMAGES_URL } from '../../config';
import Spinner from 'react-native-loading-spinner-overlay';

const SearchProduct = ({ navigation }) => {
    const [seachText, setseachText] = useState('')
    const [productList, setproductList] = useState([])
    const [PicUrl, setPicUrl] = useState('')
    const [spinner, setspinner] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           
            performSearch();
        });
        return unsubscribe;

    }, [navigation]);


    const renderItems = (item) => {
        // console.log('`${IMAGES_URL}${PicUrl}${item.photo}`',`${IMAGES_URL}${PicUrl}${item.photo}`)
        return (
            <ProductItem
                item={item}
                rating={parseFloat(item.product_rating)}
                uri={`${IMAGES_URL}${PicUrl}${item.thumbnail}`}
                onProductPress={() => navigation.navigate('ProductDetail', { slugName: item.slug })}
                product_price={item.price}
                product_name={item.name}
            />
        )
    }
    const performSearch = async () => {
        console.log('item to be searched', seachText)
        setspinner(true)
        try {
            let product_global_search = await API.productSearchGlobal(seachText);

            console.log('response ', product_global_search);
            if (product_global_search.status == 1) {
                setproductList(product_global_search.data.prods.data)
                setPicUrl(product_global_search.product_thumbnail_base_url)
                setspinner(false)
            }
            else {
                setproductList([]);
                setspinner(false)

            }
        }
        catch (error) {
            console.log('error from Search Api ', error)
        }
        Keyboard.dismiss()
    }
    return (
        <AppComponent>
            <View style={[CommonStyles.flex1, { backgroundColor: '#fff' }]}>
                <Header value={seachText} onChangeText={text => setseachText(text)} onSearchBarPressed={() => performSearch()} />
                <Spinner visible={spinner} />

                {
                    productList.length != 0
                        ?
                        <View style={{ flex: 1, paddingHorizontal: '2%' }}>
                            <FlatList
                                data={productList}
                                renderItem={({ item }) => renderItems(item)}
                                keyExtractor={(_, index) => index.toString()}
                                numColumns={2}
                            />
                        </View>
                        :
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={[CommonStyles.centerStyle, CommonStyles.flex1]}>
                                <Text style={{ color: Colors.black_text, fontSize: 16 }}>No Product found</Text>
                            </View>
                        </TouchableWithoutFeedback>
                }

            </View>
        </AppComponent>
    )
}

export default SearchProduct;