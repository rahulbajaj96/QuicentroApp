import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Title, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Notifications() {
  return (
  
      

      <View style={styles.dataContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://i.pinimg.com/236x/32/a0/2c/32a02ce7298efa73004622d4451f0153--mens-fashion-styles-men-fashion.jpg",
            width: 45,
            height: 70,
          }}
        />
        <View>
          <Text>Delivered</Text>
          <Text style={styles.disc} ellipsizeMode="tail" numberOfLines={2}>Your Classic shirt women is in Delivered hhjhjkkkl kkl hjhjk</Text>
        </View>
        <View>
            <Title style={styles.date}>8 Oct</Title>
        </View>
      </View>
  
  );
}

const styles = StyleSheet.create({

  dataContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 325,
    height: 90,
    margin: 15,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: "#ebebeb",
    
  },
  image: {
    borderRadius: 5,
    marginLeft: 15,
    marginRight:15
  },
  disc:{
    width:180
  },
  date:{
      fontSize:14,
      fontWeight:"600",
      marginRight:15
  }
});
