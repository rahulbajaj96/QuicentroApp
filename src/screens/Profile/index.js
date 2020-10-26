import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Title, Button, } from "react-native-paper";
import AppComponent from "../../components/AppComponent";
import { Header } from "../../components/HeaderWithoutSearchBar";
import { CommonStyles, Colors, Images } from "../../constants";
import * as API from '../../apiCalls';
import { connect } from 'react-redux';
const Profile = ({ navigation, auth_token }) => {
  const [User_data, setUser_data] = useState('');
  const [baseUrlPhoto, setbaseUrlPhoto] = useState('')
  useEffect(() => {
    getProfileData();
  }, [])

  const getProfileData = async () => {
    let APIURL = `api_token=${auth_token}`
    try {
      let profileResponse = await API.UserProfile(APIURL);
      console.log('profile Response', profileResponse);
      if (profileResponse.status == 1) {
        setbaseUrlPhoto(profileResponse.photo_base_url)
        setUser_data(profileResponse.user);
      }
    }
    catch (error) {
      console.log('error of Profile', error)
    }
  }

  return (
    <AppComponent>
      <Header />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={[CommonStyles.centerStyle, { paddingBottom: 10, borderWidth: 0, backgroundColor: '#fff' }]}>
          <View style={{ paddingVertical: 5, borderBottomWidth: 2, borderColor: Colors.button_color }}>
            <Text style={CommonStyles.title}>Profile</Text>
          </View>
        </View>

        <View style={styles.container}>

          <View style={styles.image}>
            <Image
              style={{
                borderRadius: 60, height: 120,
                width: 120, borderWidth: 0, borderColor: '#000',
              }}
              source={User_data.photo != null ? {
                uri:
                  `${baseUrlPhoto}${User_data.photo}`,

              } : Images.men}
              resizeMode='contain'
            />
            <Title>{User_data.name}</Title>

          </View>
          <TouchableOpacity onPress={() => console.log("Pressed")} style={styles.dataContainer}>


            <Text style={styles.dataText}>Orders</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Pressed")} style={styles.dataContainer}>


            <Text style={styles.dataText}>Address</Text>

          </TouchableOpacity>
          <View style={styles.dataContainer}>

            <Text style={styles.dataText}>Account details</Text>
          </View>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => console.log("Pressed")}
          >
            Sign Out
        </Button>

        </View>
      </View>


    </AppComponent >
  );
}
const mapStateToProps = (state) => ({
  auth_token: state.loginReducer.auth_token,
  user_data: state.loginReducer.user_data
});
export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    marginTop: 10
  },
  profileText: {
    paddingBottom: 3,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#2680EB",
    fontSize: 18,
    fontWeight: "600"
  },
  image: {
    alignItems: "center",
  },
  dataContainer: {
    justifyContent: "center",
    width: '80%',
    height: 50,
    marginHorizontal: '10%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.grey_text,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  dataText: {
    paddingLeft: 20,
    color: Colors.black_text,
    fontSize: 14
  },
  button: {
    backgroundColor: "#2680EB",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 3,
    margin: 25,
    borderRadius: 30
  }
});
