import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors, CommonStyles, Images } from '../constants';
import styles from '../screens/HomeTab/styles';
import StarRating from 'react-native-star-rating';


export const ProductItem = ({ item, rating, uri, onProductPress, product_price, product_name }) => {
    // console.log('uri', uri)
    return (
        <TouchableOpacity style={[CommonStyles.centerStyle, CommonStyles.shadowStyle, styles.productView]} onPress={() => onProductPress()}>
            <Image source={uri != '' ? { uri: uri } : Images.men} style={styles.productImage} resizeMode='cover' />
            <StarRating
                disabled={true}
                maxStars={5}
                rating={rating}
                fullStarColor={'#FCB941'}
                starSize={14}
                emptyStarColor={Colors.grey_text}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.productPrice}>${product_price}</Text>
                <Text style={[styles.productPrice, { textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 12, marginLeft: 5, }]}>{item.previous_price} </Text>
            </View>
            <Text style={styles.productName}>{product_name}</Text>
        </TouchableOpacity>
    )
}