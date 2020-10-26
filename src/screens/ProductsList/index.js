import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { CommonStyles, Images, Colors } from '../../constants';
import { ProductItem } from '../../components/ProductItem';
import AppComponent from '../../components/AppComponent';
import { Header } from '../../components/Header';
import * as API from '../../apiCalls'
import { IMAGES_URL } from "../../config";
import Spinner from 'react-native-loading-spinner-overlay';

const ProductsList = ({ route, navigation }) => {

    const [seachText, setseachText] = useState('')
    const [productList, setproductList] = useState([])
    const [thumbnailUrl, setthumbnailUrl] = useState('')
    const [PicUrl, setPicUrl] = useState('')
    const [spinner, setspinner] = useState(false)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setspinner(true)
            setproductList([]);

            getProductsByCategory();
        });
        return unsubscribe;

    }, [route]);

    const getProductsByCategory = async () => {
        console.log('route.params.categories.slug', route.params.categories.slug)
        console.log('route.params.categories.name', route.params.categories.name)

        try {
            setproductList([]);

            let productListResponse = await API.getProductsByCategory(route.params.categories.slug);
            console.log('data of Produlct List', productListResponse);
            let productList = []
            if (productListResponse.status == 1) {
                let dataItem = productListResponse.data.prods.data;
                for (let i = 0; i < dataItem.length; i++) {
                    console.log('data Item', dataItem[i])
                    productList.push(dataItem[i]);
                }
                setproductList([...productList]);
                setthumbnailUrl(productListResponse.product_thumbnail_base_url)
                setPicUrl(productListResponse.product_featured_image_base_url)

                setspinner(false)

            }
            else {
                setproductList([]);
                setspinner(false)

            }



        }
        catch (error) {
            console.log('error of get Category Products ', error)
        }
    }

    const renderItems = (item) => {
        console.log('item of Product List ', item)
        return (
            <ProductItem
                item={item}
                rating={parseFloat(item.product_rating)}
                uri={`${IMAGES_URL}${thumbnailUrl}${item.thumbnail}`}
                onProductPress={() => navigation.navigate('ProductDetail', { slugName: item.slug })}
                product_price={item.price}
                product_name={item.name}
            />
        )
    }
    const performSearch = async () => {
        console.log('item to be searched', seachText)
        //https://www.jamesdeller.com/api/category/fashion-and-Beauty/women?search=jeans
        let APiURL = `${route.params.categories.slug}?search=${seachText}`
        try {
            let product_search_By_category = await API.productSearchByCategory(APiURL);

            console.log('response ', product_search_By_category);
            if (product_search_By_category.status == 1) {
                setproductList(product_search_By_category.data.prods.data)
                setPicUrl(product_search_By_category.product_thumbnail_base_url)
            }
            else {
                setproductList([]);
            }
        }
        catch (error) {
            console.log('error from Search Api ', error)
        }
        Keyboard.dismiss()
    }
    return (
        <AppComponent>
            <Header value={seachText} onChangeText={text => setseachText(text)} onSearchBarPressed={() => performSearch()} />
            <Spinner visible={spinner} />
            <View style={[CommonStyles.flex1, { backgroundColor: '#F5F5F5', }]}>
                <Text style={{ fontSize: 16, color: Colors.black_text, margin: 10 }}>{route.params.categories.name}</Text>
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

export default ProductsList;