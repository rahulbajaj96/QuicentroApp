import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Title, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppComponent from "../../../components/AppComponent";

const ForgotPassword = ({ navigation }) => {
  return (
    <AppComponent>
    <View style={styles.container}>
      <View style={styles.resetHeader}>
        <Ionicons name="md-arrow-back" size={28} color="black" onPress={() => navigation.goBack()} />
        <Title style={styles.headerTitle}> Forgot password</Title>
      </View>
      <Text style={styles.title}>
        we can help you to reset your password please enter your registered
        mobile number or email to get the reset link
      </Text>
      <View style={styles.dataContainer}>
        <TextInput style={styles.dataText} placeholder="Email/Mobile" />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => console.log("Pressed")}
      >
        Submit
      </Button>
    </View>
    </AppComponent>
  );
}
export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  resetHeader: {
    margin: 20,
    height:50,
    display: "flex",
    flexDirection: "row",
    alignItems:'center'
  },
  headerTitle: {
    marginTop: -5,
    textAlign: "center",
    marginLeft: "13%",
    borderBottomWidth: 2,
    paddingBottom: 3,
    borderColor: "#2680EB",

  },
  title: {
    fontSize: 16,
    fontWeight: "600",

    padding: 15,
  },
  dataContainer: {
    justifyContent: "center",
    width: 320,
    height: 50,
    margin: 15,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  dataText: {
    paddingLeft: 20,
  },

  button: {
    backgroundColor: "#2680EB",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 3,
    margin: 20,
    borderRadius: 5,
  },
});
