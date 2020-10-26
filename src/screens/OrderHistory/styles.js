import { StyleSheet } from "react-native";
import { Colors } from "../../constants";


export default StyleSheet.create({
    orderhistorycard: { height: 90, width: '90%', borderWidth: 1, marginHorizontal: '5%', marginVertical: 8, borderRadius: 10, flexDirection: 'row', backgroundColor: '#fff', borderColor: Colors.grey_text },
    rightView: { flex: 0.1, borderWidth: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: Colors.button_color },
    deliverDate:{ color: Colors.black_text, fontSize: 14 }
})