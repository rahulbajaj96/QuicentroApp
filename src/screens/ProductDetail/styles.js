import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({

    ColorsView: { height: 22, width: 22, borderRadius: 11, borderWidth: 2, marginRight: 10, marginTop: 8, },
    backIcon: { position: 'absolute', left: 10, top: 15, borderWidth: 0, zIndex: 1 },
    likeIcon: { position: 'absolute', right: 20, top: 10, zIndex: 1 },
    quantityPrice: { borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 0.6, },
    bottomView: {
        height: '55%', borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', zIndex: 1, bottom: 0, width: '100%',
        backgroundColor: '#fff',
        // elevation: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
                backgroundColor: '#fff',
            },
            android: {
                elevation: 10,
            }
        }),
    },
    quantityView: { borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 90, height: 30, marginHorizontal: 10, borderRadius: 15 },
    plusSign: { height: 30, width: 30, borderRadius: 15, borderWidth: 0 },
    plusText: { color: Colors.black_text, fontSize: 18 },
    productName: { fontSize: 18, color: Colors.black_text, marginVertical: 5 },
    productDesc: { fontSize: 12, color: Colors.grey_text, marginVertical: 5 },
    review: { flex: 0.4, flexDirection: 'row', alignItems: 'center', borderWidth: 0 },
    reviewText: { color: Colors.grey_text, fontSize: 12, marginLeft: 15 },
    priceTag: { fontSize: 16, color: Colors.button_color, marginRight: 10 },
    addToCartButton: { width: '90%', backgroundColor: Colors.button_color, borderRadius: 10, height: '70%' },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#707070",
                shadowOpacity: 0.5,
                shadowRadius: 2,
                shadowOffset: {
                    height: 0,
                    width: 0
                },
                backgroundColor: '#fff',
            },
            android: {
                elevation: 1,
            }
        }),

    },
    qunatity: { color: Colors.black_text, fontSize: 15 }

})

export default styles;