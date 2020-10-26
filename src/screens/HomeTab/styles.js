import { StyleSheet,Platform } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({

    shadowFilter: {
    
        ...Platform.select({
            ios: {
                backgroundColor: '#fff',
                shadowColor: "#707070",
                shadowOpacity: 0.7,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                    width: 1
                },
            },
            android: {
                elevation: 1,
            }
        }),
    },
    filterText: { fontSize: 12, color: Colors.black_text },
    filterHeading: { color: Colors.black_text, fontSize: 14, marginVertical: 10 },
    FilteredDone: { color: Colors.white_text, fontSize: 16 },
    productView: {
        height: 300, borderWidth: 0, width: '48%', marginHorizontal: '1%', marginVertical: 5, backgroundColor: '#fff', borderRadius: 5,
    },
    productImage: { height: 180, width: '80%', borderWidth: 0, marginVertical: 10 },
    productPrice: { marginVertical: 1, color: Colors.black_text, fontSize: 14, marginVertical: 5 ,textAlign:'center'},
    productName: { color: Colors.black_text, fontSize: 12,textAlign:'center',width:'80%' },
    viewAllButton: { paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.button_color, borderRadius: 5 },
    viewAllText: { color: '#fff', fontSize: 12 },
    FeaturedView: { height: 50, backgroundColor: '#F5F5F5', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', justifyContent: 'space-between', },

})

export default styles;