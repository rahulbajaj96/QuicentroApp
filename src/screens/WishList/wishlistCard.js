import React from "react";
import { Text, View, Image ,TouchableOpacity} from "react-native";
import { Images, Colors, CommonStyles } from "../../constants";
import StarRating from 'react-native-star-rating';
import { Button } from "react-native-paper";
import styles from "./styles";
import Entypo from "react-native-vector-icons/Entypo";

export const WishlistCard = ({ item, deletePressed,imageUrl,onWishListItemPress }) => {
  console.log('item', item)
  return (
    <TouchableOpacity style={styles.orderhistorycard} onPress={onWishListItemPress}>
      <View style={[{ flex: 0.2, borderWidth: 0,paddingHorizontal:2}, CommonStyles.centerStyle]}>
        <Image
          source={item.thumbnail != '' || null ?{uri:`${imageUrl}${item.thumbnail}`} :Images.men}
          style={{ height: 70, width: "100%" }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 0.6,
          borderWidth: 0,
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        <Text style={{ color: Colors.black_text, fontSize: 14 }} numberOfLines={1}>
         {item.name}
        </Text>
        <Text
          style={{ color: Colors.grey_text, fontSize: 12, marginBottom: 2 }}
        >
          Men category
        </Text>
        <View style={styles.review}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={parseFloat(item.product_rating)}
            fullStarColor={'#FCB941'}
            starSize={12}
            emptyStarColor={Colors.grey_text}
          // selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Text style={styles.reviewText}>(26 Reviews)</Text>
        </View>
        <Text style={{ color: Colors.button_color, fontSize: 16, marginTop: 5 }}>${item.price}</Text>
      </View>
      <View style={[{ flex: 0.2, borderWidth: 0 }, CommonStyles.centerStyle]}>
        <Entypo name="squared-cross" size={24} color={Colors.button_color} onPress={() => deletePressed()} />
        {/* <Button
          mode="contained"
          onPress={() => HandleAddToCart("12suj3")}
          titleStyle={{
            color: "white",
            fontSize: 9,
          }}
          style={{
            backgroundColor: "#2680EB",
            width: '90%',
            borderRadius: 20,
            fontSize: 11,
          }}
        >
          <Text style={{ fontSize: 7, color: Colors.white_text }}> Add to cart</Text>
        </Button> */}

      </View>
    </TouchableOpacity>
  );
};
