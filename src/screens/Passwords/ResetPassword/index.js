import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Title, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppComponent from "../../../components/AppComponent";

const ResetPassword = ({ navigation }) => {
  return (
    <AppComponent>
    <View style={styles.container}>
      <View style={styles.resetHeader}>
        <Ionicons name="md-arrow-back" size={28} color="black" onPress={() => navigation.goBack()} />
        <Title style={styles.headerTitle}> Reset password</Title>
      </View>
      <Text style={styles.title}>
        To reset your password enter the new password
      </Text>
      <View>
        <Text style={styles.label}> New Password</Text>
        <View style={styles.dataContainer}>
          <TextInput type="password" placeholder="*********" style={styles.dataText} />
        </View>
      </View>
      <View>
        <Text style={styles.label}> Confirm Password</Text>
        <View style={styles.dataContainer}>
          <TextInput type="password" placeholder="*********" style={styles.dataText} />
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => console.log("Pressed")}
      >
        Reset Password
      </Button>
    </View>
    </AppComponent>
  );
}
export default ResetPassword;
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
  label: {
    marginLeft: 20
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
