import Colors from "../colors";
import { Platform } from 'react-native';
const CommonStyles = {
    flex1: { flex: 1, },
    centerStyle: { justifyContent: 'center', alignItems: 'center', },
    shadowStyle: {


        ...Platform.select({
            ios: {
                shadowColor: Colors.black_text,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            }
        }),
    },

    //drawerStyles
    drawerItemStyle: { height: 30, marginHorizontal: '8%', justifyContent: 'center', backgroundColor: '#fff', marginVertical: 8, paddingVertical: 2, },
    drawerItemText: { marginHorizontal: 15, color: Colors.button_color, fontSize: 16 },

    drawerProfileView: { height: 100, flexDirection: 'row', borderWidth: 0, alignItems: 'center', paddingHorizontal: '5%', marginTop: 10, },
    drawerProfileImageView: { height: 90, width: 90, borderRadius: 45, borderWidth: 2, padding: 2, borderColor: Colors.button_color },

    title: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        padding: 10,
    },


}

export default CommonStyles;