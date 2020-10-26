import { StyleSheet } from 'react-native'
import { Colors } from '../../../constants';

export default StyleSheet.create({
    log_reg_view: { height: 40, width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
    login_register_button: { borderRadius: 25, width: '48%', height: '100%' },
    commonView: { borderWidth: 0, width: '100%', paddingHorizontal: 15, paddingVertical: 20, alignItems: 'center', marginVertical: 10, flex: 1, },
    loginView: { paddingVertical: 10, borderWidth: 0, alignItems: 'center', width: '110%', borderRadius: 10 },
    forgotPass: { color: Colors.button_color, fontSize: 12, },
    terms: { color: Colors.black_text, fontSize: 12, marginTop: 10 },
    button_log: { width: '100%', height: 40, borderRadius: 10, backgroundColor: Colors.button_color, marginVertical: 10 },
    text_log: { color: Colors.white_text, fontSize: 16 },
    shadowCont: {
        backgroundColor: '#fff',
        shadowColor: "#707070",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})