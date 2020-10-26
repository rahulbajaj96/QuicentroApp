import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { CommonStyles, Images, Colors } from '../../constants';
import { ProductQuantity } from '../../components/ProductQuantity';
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from './styles';
export const CartView = ({ onDecrease, onIncrease, quantity, item, selected, onIconPressed }) => {
    console.log('itemin cart', item)
    return (
        <View style={[styles.cartView, CommonStyles.shadowStyle]}>
           
            <View style={[{ flex: 0.15, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <Image source={Images.men} style={{ height: 70, width: '100%' }} resizeMode='contain' />
            </View>
            <View style={{ flex: 0.40, borderWidth: 0, justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={{ color: Colors.black_text, fontSize: 15, width: '90%' }} numberOfLines={2}>{item.name}</Text>
                <Text style={{ color: Colors.grey_text, fontSize: 12, marginBottom: 2,width:'95%' }} numberOfLines={1}>{item.category.name}</Text>
                <Text style={{ color: Colors.button_color, fontSize: 16 }}>${item.price}</Text>
            </View>
            <View style={[{ flex: 0.35, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <ProductQuantity
                    alreadyDisabled={false}
                    quantity={item.quantity}
                    onDecrease={() => onDecrease()}
                    onIncrease={() => onIncrease()}
                />
            </View>
            <View style={[{ flex: 0.1, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <AntDesign name={"delete"} size={20} color={Colors.button_color} onPress={() => onIconPressed()} />
            </View>
        </View>
    )
} 