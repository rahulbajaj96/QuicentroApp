import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react'
import { CommonStyles, Colors, Images } from '../../constants';
import AntDesign from "react-native-vector-icons/AntDesign";
import { OrderHistoryCard } from './OrderHistoryCard';
import { Header } from '../../components/HeaderWithoutSearchBar';
import AppComponent from '../../components/AppComponent';
const OrderHistory = ({ navigation }) => {
    const [orderHisory, setorderHisory] = useState([1, 2, 3])

    const renderOrderHistory = (item) => {
        return (
            <OrderHistoryCard
                item={item}
            />
        )
    }
    return (
        <AppComponent>
        <View style={{ flex: 1,backgroundColor:'#fff' }}>
            <Header />
            {
                orderHisory.length == 0
                    ?
                    <View style={[{ flex: 0.9, backgroundColor: '#fff', }, CommonStyles.centerStyle]}>
                        <Text style={{ color: Colors.black_text, fontSize: 16 }}>Your Order History is Empty</Text>
                    </View>
                    :
                    <View style={{ flex: 0.9, backgroundColor: '#fff', }}>
                        <FlatList
                            data={orderHisory}
                            renderItem={item => renderOrderHistory(item)}
                            extraData={orderHisory}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
            }


        </View>
        </AppComponent>
    )
}

export default OrderHistory;