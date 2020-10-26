import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Images } from "../constants";
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Header = () => {
  const navigation = useNavigation();
  return (

    <View style={[styles.headerContainer, styles.container]}>
      <View style={styles.headerSubConatiner}>
          <FontAwesome name="bars" size={24} color="black" onPress={() => navigation.openDrawer()} style={{borderWidth:0,padding:5}} />
          <Image
            style={styles.logoImage}
            source={Images.capture}
          />
        </View>

        <View style={styles.headerSubConatiner}>
          <MaterialIcons name="notifications-none" size={28} color="#0E0E0E" />
          <AntDesign name="shoppingcart" size={28} color="#0E0E0E" />
        </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE2C1",

  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    borderWidth: 0,
    paddingHorizontal: 5,
    alignItems: 'center'

  },
  headerSubConatiner: {
    // display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  logoImage: {
    height: 28,
    width: 100,
    borderWidth:0,
    marginLeft:10,
    borderColor:'#000'
  },


});
