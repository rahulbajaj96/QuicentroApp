import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Images, CommonStyles, Colors } from "../../constants";
import AppComponent from "../../components/AppComponent";
import { Header } from "../../components/HeaderWithoutSearchBar";
import * as API from '../../apiCalls'
import { IMAGES_URL } from "../../config";
import Spinner from 'react-native-loading-spinner-overlay';

const ShopByCategory = ({ navigation, route }) => {

  const [categories, setcategories] = useState([]);
  const [category_url, setcategory_url] = useState('')
  const [spinner, setspinner] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setspinner(true)
      getCategoriesFromApi();
    });
    return unsubscribe;
  }, [navigation, route]);

  const getCategoriesFromApi = async () => {
    try {
      let category_response = await API.getCategories();
      console.log('categories array ', category_response);
      if (category_response.status == 1) {
        setcategory_url(IMAGES_URL + category_response.category_image_base_url)
        setcategories(category_response.categories);
      }
      setspinner(false)


    }
    catch (error) {
      console.log('error', error)
    }
  }

  const renderCategories = (item) => {
    return (
      <TouchableOpacity style={[styles.categoryView, CommonStyles.centerStyle]}
        onPress={() => navigation.navigate('ProductsList', { categories: item })}
      >
        <Image
          style={{ height: 30, width: 30, borderWidth: 0 }}
          source={item.photo == null ? Images.home : { uri: `${category_url}${item.photo}` }}
          resizeMode='contain'
        />
        <Text style={styles.categories_name}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <AppComponent>
      <Header />
      <Spinner visible={spinner} />
      <View style={styles.container}>
        <View style={[CommonStyles.centerStyle]}>
          <View style={{ paddingVertical: 5, borderBottomWidth: 2, borderColor: Colors.button_color }}>
            <Text style={styles.title}>Shop by Categroy </Text>
          </View>
        </View>

        {
          categories.length != 0
            ?
            <View style={{ flex: 1, marginTop: 5 }}>
              <FlatList
                style={{ paddingHorizontal: 5 }}
                renderItem={({ item }) => renderCategories(item)}
                keyExtractor={(_, index) => index.toString()}
                data={categories}
                numColumns={2}
                extraData={categories}
              />
            </View>
            :
            <View style={[CommonStyles.centerStyle, CommonStyles.flex1]}>
              <Text>No Categories found </Text>
            </View>
        }

      </View>
    </AppComponent>
  );
}
export default ShopByCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  categoryView: { height: 120, width: '48%', marginHorizontal: '1%', borderWidth: 1, marginVertical: '1%', backgroundColor: Colors.white_text, borderRadius: 5, borderColor: Colors.grey_text },
  categories_name: { marginTop: 5, fontSize: 14, color: Colors.black_text, textAlign: 'center' },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  textButtomLine: {
    width: 130,
    borderBottomWidth: 2,
    marginLeft: "32%",
    marginTop: -20,
    borderColor: "#2680EB",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  item: {
    width: 150,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    margin: 10,
  },
});
