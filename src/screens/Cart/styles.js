import { StyleSheet } from "react-native";
import { Colors } from "../../constants";


export default StyleSheet.create({
    cartView: { height: 90, width: '90%', borderWidth: 1, marginHorizontal: '5%', marginVertical: 8, borderRadius: 10, flexDirection: 'row', backgroundColor: '#fff', borderColor: Colors.grey_text },

    checkoutView: {
        flex: 0.2, backgroundColor: '#fff', justifyContent: 'center', borderWidth: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    itemInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingVertical: 10 },
    checkoutButton: { width: '90%', backgroundColor: Colors.button_color, borderRadius: 15, height: 45, marginHorizontal: '5%', marginTop: 10 },
    checkoutText: { color: Colors.white_text, fontSize: 20 }

})