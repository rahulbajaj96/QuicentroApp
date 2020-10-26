import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Images } from "../constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useNavigation } from '@react-navigation/native';

export const Header = ({ onChangeText, value, onSearchBarPressed }) => {
  const navigation = useNavigation();
  // console.log('navigation', navigation)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubConatiner}>
          <FontAwesome name="bars" size={24} color="black" onPress={() => navigation.openDrawer()} />
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
      <View style={[styles.headerSubConatiner, { alignItems: 'center', paddingHorizontal: '5%', borderWidth: 0, height:70 }]} >
        <TextInput style={styles.textInput} placeholder="Search for products brand and more"
          returnKeyType='done'
          onChangeText={text => onChangeText(text)}
          onSubmitEditing={() => onSearchBarPressed()}
          value={value}
        />
        <MaterialIcons style={styles.searchIcon} name="search" size={28} color="black" onPress={() => onSearchBarPressed()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE2C1",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 10

  },
  headerSubConatiner: {
    flexDirection: "row",
    borderWidth: 0,
   
  },
  logoImage: {
    height: 28,
    width: 100
  },
  textInput: {
    borderWidth: 0,
    width: "88%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 4,
    fontSize: 12

  },
  searchIcon: {

    backgroundColor: "#2680EB",
    marginVertical: 15,
    marginLeft: -2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#FFFFFF",



  }
});
