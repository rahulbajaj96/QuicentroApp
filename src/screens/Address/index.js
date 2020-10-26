import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Title, FAB } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import Addres from "../../components/Addres";
export default function Address() {
  return (
    <View style={styles.container}>
      <View style={styles.resetHeader}>
        <Ionicons name="md-arrow-back" size={28} color="black" />
        <Title style={styles.headerTitle}>Address</Title>
      </View>
      <Addres/>
      <Addres/>
      <Addres/>
      <FAB
    style={styles.fab}
    
    icon="plus"
    label="Add New"
    onPress={() => console.log('Pressed')}
  /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resetHeader: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
  },
  headerTitle: {
    marginTop: -5,
    textAlign: "center",
    marginLeft: "25%",
    borderBottomWidth: 2,
    paddingBottom: 3,
    borderColor: "#2680EB",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right:"25%",
    bottom: "5%",
    backgroundColor:"#2680EB",
  },


});
