import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Images, Colors, CommonStyles } from '../../constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import Entypo from "react-native-vector-icons/Entypo";
import styles from './styles';
import StarRating from 'react-native-star-rating';
import { ProductItem } from '../../components/ProductItem';
import AppComponent from '../../components/AppComponent';
import { Header } from '../../components/HeaderWithoutSearchBar';
import * as API from '../../apiCalls';
import { IMAGES_URL } from '../../config';
import Spinner from 'react-native-loading-spinner-overlay';

const FULL_WIDTH = Dimensions.get('window').width;

const Home = ({ navigation }) => {

    const [selectedCategory, setselectedCategory] = useState(0)
    const [openFilter, setopenFilter] = useState(false)
    const [featuredProducts, setfeaturedProducts] = useState([])
    const [featuredProductUrl, setfeaturedProductUrl] = useState('')
    const [sliders, setsliders] = useState([])
    const [SliderBaseUrl, setSliderBaseUrl] = useState('')

    const [banners, setbanners] = useState('')
    const [BannersUrl, setBannersUrl] = useState('')

    const [categories, setcategories] = useState([]);
    const [category_url, setcategory_url] = useState('')

    const [spinner, setspinner] = useState(false)

    const selectCategory = (item) => {
        setselectedCategory(item.id)
        navigation.navigate('ProductsList', { categories: item })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // 
            setspinner(true)
            getHomeTabdata();
        });
        return unsubscribe;

    }, [navigation]);

    const getHomeTabdata = async () => {
        let home_data = await API.getHomeData();
        // console.log('home dara ', home_data);
        if (home_data.status == 1) {
            setfeaturedProducts(home_data.feature_products);
            setsliders(home_data.sliders);
            setSliderBaseUrl(home_data.slider_image_base_url);
            setbanners(home_data.bottom_small_banners);
            setBannersUrl(home_data.banner_image_base_url);
            setfeaturedProductUrl(home_data.product_thumbnail_base_url)

        }

        await getCategoriesFromApi();
        setspinner(false)
    }
    const getCategoriesFromApi = async () => {
        try {
            let category_response = await API.getCategories();
            console.log('categories array ', category_response);
            if (category_response.status == 1) {
                setcategory_url(IMAGES_URL + category_response.category_image_base_url)
                setcategories(category_response.categories);
            }

        }
        catch (error) {
            console.log('error', error)
        }
    }
    const renderCategories = (item) => {
        let activeIndex = selectedCategory == item.id
        console.log(`${category_url}${item.photo}`)
        return (
            <TouchableOpacity style={[{ marginHorizontal: 4, borderWidth: 0, width: 60, marginVertical: 2, }, CommonStyles.centerStyle]} onPress={() => selectCategory(item)}>
                <Image source={item.photo == null ? Images.home : { uri: `${category_url}${item.photo}` }}
                    style={{ height: 19, width: 21, tintColor: activeIndex ? Colors.button_color : null, borderWidth: 0 }} resizeMode='contain' />
                <Text style={{ fontSize: 9, marginTop: 3, color: activeIndex ? Colors.button_color : '#000', textAlign: 'center' }} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = (item) => {
        // console.log('`${IMAGES_URL}${featuredProductUrl}${item.photo}`', `${IMAGES_URL}${featuredProductUrl}${item.thumbnail}`)
        return (
            <ProductItem
                item={item}
                rating={parseFloat(item.product_rating)}
                uri={`${IMAGES_URL}${featuredProductUrl}${item.thumbnail}`}
                onProductPress={() => navigation.navigate('ProductDetail', { slugName: item.slug })}
                product_price={item.price}
                product_name={item.name} />
        )
    }
    const renderCraousal = (item, index) => {
        // console.log('`${IMAGES_URL}${SliderBaseUrl}${item.photo}`', `${IMAGES_URL}${SliderBaseUrl}${item.photo}`)
        return (
            <View style={[CommonStyles.shadowStyle, CommonStyles.centerStyle, {
                borderRadius: 10, marginVertical: 2, borderWidth: 0,
                flex: 1,
            }]}>
                <Image
                    resizeMode="cover"
                    source={{ uri: `${IMAGES_URL}${SliderBaseUrl}${item.photo}` }}
                    style={{ width: '99%', height: '100%', borderRadius: 10 }}
                />
            </View>
        )
    }
    const renderFilterCategories = (item) => {
        return (
            <TouchableOpacity style={[{ width: '28%', height: 30, marginHorizontal: '2%', marginVertical: '2%', borderRadius: 15 }, CommonStyles.centerStyle, styles.shadowFilter]}>
                <Text style={styles.filterText}>Dresses</Text>
            </TouchableOpacity>
        )
    }

    const renderFilterSortBy = (item) => {
        return (
            <TouchableOpacity style={[{ width: '28%', height: 30, borderWidth: 0, marginHorizontal: '2%', marginVertical: '2%', borderRadius: 15 }, CommonStyles.centerStyle, styles.shadowFilter]}>
                <Text style={styles.filterText}>Featured</Text>
            </TouchableOpacity>
        )
    }

    const renderFilterSizeBy = (item) => {
        return (
            <TouchableOpacity style={[{ width: '15%', height: 26, borderWidth: 0, marginHorizontal: '2%', marginVertical: '1%', borderRadius: 13 }, CommonStyles.centerStyle, styles.shadowFilter]}>
                <Text style={styles.filterText}>5XL</Text>
            </TouchableOpacity>
        )
    }
    const renderFilterColorBy = (item) => {
        return (
            <TouchableOpacity style={[[{ width: 22, height: 22, borderWidth: 0, marginHorizontal: '2%', marginVertical: '1%', borderRadius: 11, padding: 2, }, CommonStyles.centerStyle, styles.shadowFilter]]}>
                <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'red' }} />
            </TouchableOpacity>
        )
    }

    const renderBanners = (item) => {
        // console.log('${IMAGES_URL}${BannersUrl}${item.photo}', `${IMAGES_URL}${BannersUrl}${item.photo}`)
        return (
            <View style={{ height: '100%', width: FULL_WIDTH * 0.3, borderWidth: 0, paddingVertical: 2, marginHorizontal: 3 }}>
                <Image source={{ uri: `${IMAGES_URL}${BannersUrl}${item.photo}` }} style={{ height: '100%', width: '100%', borderWidth: 0, borderRadius: 5 }} resizeMode='cover' />
            </View>
        )
    }
    return (
        <AppComponent>
            <View style={{ flex: 1, }}>
                <Header navigation={navigation} />
                <Spinner visible={spinner} />
                <View style={{ height: 55, backgroundColor: '#fff' }} >

                    <FlatList
                        data={categories}
                        renderItem={({ item }) => renderCategories(item)}
                        keyExtractor={(_, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    />

                </View>

                <Modal isVisible={openFilter}>
                    <View style={{ flex: 0.9, backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10 }}>
                        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, color: Colors.black_text }}>Filter</Text>
                            <Entypo name="cross" size={26} color="black" style={{ borderWidth: 0 }} onPress={() => setopenFilter(false)} />
                        </View>

                        <View style={{ flex: 0.8, backgroundColor: '#fff', paddingVertical: 10, }}>
                            <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
                                <Text style={styles.filterHeading}>Category</Text>

                                <FlatList
                                    data={[1, 2, 3, 4, 5, 6, 7, 8,]}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={item => renderFilterCategories(item)}
                                    numColumns={3}
                                    style={{ maxHeight: '32%' }}
                                />

                                <Text style={styles.filterHeading}>Sort by</Text>

                                <FlatList
                                    data={[1, 2, 3, 4,]}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={item => renderFilterSortBy(item)}
                                    numColumns={3}
                                    style={{ maxHeight: '25%' }}
                                />

                                <Text style={styles.filterHeading}>Size</Text>

                                <FlatList
                                    data={[1, 2, 3, 4, 5, 6, 7]}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={item => renderFilterSizeBy(item)}
                                    numColumns={5}
                                    style={{ maxHeight: '15%' }}
                                />

                                <Text style={styles.filterHeading}>Color</Text>

                                <FlatList
                                    data={[1, 2, 3, 4, 5, 6, 7]}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={item => renderFilterColorBy(item)}
                                    numColumns={8}
                                    style={{ maxHeight: '16%' }}
                                />
                            </ScrollView>
                        </View>
                        <View style={[{ flex: 0.1, backgroundColor: '#fff' }, CommonStyles.centerStyle]}>
                            <TouchableOpacity style={[{ width: '40%', height: 34, backgroundColor: Colors.button_color, borderRadius: 10 }, CommonStyles.centerStyle]}>
                                <Text style={styles.FilteredDone}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>




                <View style={{ flex: 0.45, backgroundColor: '#fff', paddingVertical: 5 }}>
                    <Carousel
                        data={sliders}
                        renderItem={({ item, index }) => renderCraousal(item, index)}
                        sliderWidth={FULL_WIDTH}
                        itemWidth={FULL_WIDTH * 0.98}
                        autoplay={true}
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        autoplayInterval={1000}
                    />
                </View>
                <View style={{ flex: 0.2, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: '2%' }}>
                    <FlatList
                        data={banners}
                        style={{ flex: 1 }}
                        horizontal={true}
                        renderItem={({ item }) => renderBanners(item)}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.FeaturedView]}>
                    <Text>Featured</Text>
                    <TouchableOpacity style={styles.viewAllButton} onPress={() => setopenFilter(true)}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 0.35, backgroundColor: '#F5F5F5', paddingHorizontal: '2%' }}>
                    <FlatList
                        data={featuredProducts}
                        renderItem={({ item }) => renderItems(item)}
                        keyExtractor={(_, index) => index.toString()}
                        numColumns={2}
                    />
                </View>


            </View>
        </AppComponent>
    )
}

export default Home;
