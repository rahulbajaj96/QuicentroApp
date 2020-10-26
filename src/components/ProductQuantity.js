import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../constants';
import styles from '../screens/ProductDetail/styles';

export const ProductQuantity = ({ onDecrease, onIncrease, quantity,alreadyDisabled }) => {
    return (
        <View style={[styles.quantityView, CommonStyles.shadowStyle, styles.shadow]}>
            <TouchableOpacity style={[styles.plusSign, CommonStyles.centerStyle, styles.shadow]} onPress={() => onDecrease()} disabled={quantity == 1 || alreadyDisabled}>
                <Text style={styles.plusText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qunatity}>{quantity}</Text>
            <TouchableOpacity style={[styles.plusSign, CommonStyles.centerStyle, styles.shadow]} onPress={() => onIncrease()} disabled={alreadyDisabled}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}