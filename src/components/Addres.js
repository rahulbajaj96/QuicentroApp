import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function Addres() {
  return (
    <View style={styles.dataContainer}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/home.png",
          width: 45,
          height: 70,
        }}
      />
      <View>
        <Text style={styles.titleAddress}>Home</Text>
        <Text style={styles.disc} ellipsizeMode="tail" numberOfLines={2}>
          Your Classic shirt women is in Delivered hhjhjkkkl kkl hjhjk
        </Text>
      </View>
      <View style={styles.sideButton}>
        <AntDesign
          style={styles.details}
          name="caretright"
          size={18}
          color="black"
        />
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
    marginRight: 15,
  },
  disc: {
    width: 180,
  },
  details: {
    marginTop: 30,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#2680EB",
  },
  titleAddress: {
    color: "#2680EB",
    fontSize: 14,
    fontWeight: "700",
  },
  sideButton: {
    height: "102%",
    width: 25,
    backgroundColor: "#2680EB",
    marginRight: -10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
