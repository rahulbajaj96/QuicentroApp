import React from 'react'
import { Text, View, Image } from 'react-native';
import { Images, Colors, CommonStyles } from '../../constants';
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from './styles';

export const OrderHistoryCard = ({ item }) => {
    return (
        <View style={styles.orderhistorycard}>
            <View style={[{ flex: 0.20, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <Image source={Images.men} style={{ height: 70, width: '100%' }} resizeMode='contain' />
            </View>
            <View style={{ flex: 0.35, borderWidth: 0, justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={{ color: Colors.black_text, fontSize: 15 }}>ASOS weather</Text>
                <Text style={{ color: Colors.grey_text, fontSize: 12, marginBottom: 2 }}>Men category</Text>
                <Text style={{ color: Colors.button_color, fontSize: 16 }}>$78.55</Text>
            </View>
            <View style={[{ flex: 0.35, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <Text style={[styles.deliverDate, { marginVertical: 2 }]}>Delivered</Text>
                <Text style={styles.deliverDate}>20 Aug 2020</Text>
            </View>
            <View style={[styles.rightView, CommonStyles.centerStyle]}>
                <AntDesign name="caretright" size={16} color={Colors.white_text} />
            </View>
        </View>
    )
}