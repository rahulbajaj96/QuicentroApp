import React from 'react'
import { Text, View, TextInput } from 'react-native';
import { Colors, CommonStyles } from '../constants';
import Ionicons from "react-native-vector-icons/Ionicons";

export const InputField = (props) => {

    return (
        <View style={{ height: 40, width: '100%', borderWidth: 1, flexDirection: 'row', marginVertical: 6, borderColor: Colors.grey_text }}>
            <TextInput
                style={{ width: '90%', fontSize: 16, color: Colors.black_text, paddingLeft: 10 }}
                {...props}
                returnKeyType='done'
                underlineColorAndroid={'transparent'}
            />
            {
                props.eye ?
                    <View style={CommonStyles.centerStyle}>
                        <Ionicons name={props.eyeName} size={24} color="black" onPress={() => props.onPress()} />
                    </View>
                    : null
            }


        </View>
    )
}