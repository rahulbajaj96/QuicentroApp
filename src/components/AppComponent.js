import React from 'react'
import { Text,View,StatusBar,SafeAreaView,Platform} from 'react-native';
import { CommonStyles, Colors } from '../constants';

const AppComponent = (props) => {
    return (
        <SafeAreaView style={[CommonStyles.flex1,{backgroundColor:Colors.header_color,height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight}]}>
            {/* <StatusBar translucent barStyle='dark-content' backgroundColor={Colors.header_color} /> */}
            <View style={CommonStyles.flex1}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}
export default  AppComponent;