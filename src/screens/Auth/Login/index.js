import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { Images, CommonStyles, Colors } from "../../../constants";
import AppComponent from "../../../components/AppComponent";
import { InputField } from "../../../components/InputFields";
import { FAB } from 'react-native-paper';
import styles from "./styles";
import * as API from '../../../apiCalls';
import { Toast } from "../../../components/Toast";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { save_To_AsyncStorage, get_From_AsyncStorage } from "../../../services/StorageService";
import { connect } from 'react-redux';
import { loginUser } from "../../../Redux/actions/loginActions";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "../../../config";
import Spinner from 'react-native-loading-spinner-overlay';

const LogIn = ({ navigation, loginUser, auth_token }) => {
    const [authView, setauthView] = useState(0)


    const [LoginFields, setLoginFields] = useState({
        login_email: '',
        login_pass: ''
    })

    const [RegisterFields, setRegisterFields] = useState({
        reg_email: '',
        reg_pass: '',
        reg_confm_pass: '',
        reg_mobile: '',
        reg_firstName: '',
        reg_address: ''
    })
    const [spinner, setspinner] = useState(false)

    const [showPassword, setshowPassword] = useState(false)
    const [rememberMe, setrememberMe] = useState(false)

    let { login_email, login_pass } = LoginFields;
    let { reg_email, reg_pass, reg_confm_pass, reg_mobile, reg_firstName, reg_address } = RegisterFields;

    useEffect(() => {
        checkAlreadyLogin();
        // hitApi();
    }, []);

    const hitApi = () => {
        let formdata = new FormData();
        formdata.append("email", 'abcdef@gmail.com');
        formdata.append("password", 'login_pass');
        console.log('login formdata ', JSON.stringify(formdata));
        console.log('base url ', 'https://www.jamesdeller.com/api/login');
        fetch(`https://www.jamesdeller.com/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json()).
            then(data => {
                console.log('data', data)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    const checkAlreadyLogin = () => {
        // get_From_AsyncStorage('@User_Token').then(token => {
        //     console.log('token', token)
        console.log('auth_token auth_token', auth_token)
        if (auth_token != null) {
            navigation.navigate('DrawerStack');
        }
        // })
    }
    const handleLogin = async () => {
        if (login_email.length == '') {
            Toast("Email cannot be empty")
            return;
        }
        if (login_pass.length == '') {
            Toast("Password cannot be empty")
            return;
        }

        // let formdata = new FormData();
        // formdata.append("email", login_email);
        // formdata.append("password", login_pass);

        let formdata = {
            "email": login_email,
            "password": login_pass
        }
        console.log('login formdata ', JSON.stringify(formdata));
        setspinner(true);
        try {
            let loginResponse = await loginUser(formdata);
            console.log('login Response', loginResponse);
            if (loginResponse.type == 'Login_Successful') {
                saveUserData(loginResponse.payload.user);
                saveUserToken(loginResponse.payload.token)
                navigation.navigate('DrawerStack');
                setRegisterFields({
                    reg_email: '',
                    reg_pass: '',
                    reg_confm_pass: '',
                    reg_mobile: '',
                    reg_firstName: '',
                    reg_address: ''
                });
                setauthView(0);
                setLoginFields({
                    login_email: '',
                    login_pass: ''
                })
                setspinner(false);

            }
            else {
                console.log('some error occured')
                setspinner(false);

                setTimeout(() => {
                    Toast(loginResponse.payload.message);
                }, 500);

            }

        }
        catch (error) {
            console.log('error of Login Api ', error);
        }
    }
    const saveUserToken = async (token) => {
        save_To_AsyncStorage('@User_Token', JSON.stringify(token))
    }
    const saveUserData = async (data) => {
        save_To_AsyncStorage('@User_Data', JSON.stringify(data))
    }

    const handleRegisteration = async () => {

        if (reg_firstName.length == '') {
            Toast("Name cannot be empty");
            return;
        }
        if (reg_email.length == '') {
            Toast("Email cannot be empty")
            return;
        }
        if (reg_mobile.length != 10) {
            Toast("Please enter a valid phone number")
            return;
        }

        if (reg_pass.length == '') {
            Toast("Password cannot be empty")
            return;
        }

        if (reg_pass != reg_confm_pass) {
            Toast("Password & Confirm Password doesnot match ")
            return;
        }


        // let formdata = new FormData();
        // formdata.append("email", reg_email);
        // formdata.append("password", reg_pass);
        // formdata.append("name", reg_firstName);
        // formdata.append("address", reg_address);
        // formdata.append("password_confirmation", reg_confm_pass);
        // formdata.append("phone", reg_mobile);


        let formdata = {
            'email': reg_email,
            "password": reg_pass,
            "name": reg_firstName,
            "address": reg_address,
            "password_confirmation": reg_confm_pass,
            "phone": reg_mobile
        }
        console.log('register formdata ', JSON.stringify(formdata));
        setspinner(true);
        try {
            let registerResponse = await API.UserRegisteration(formdata);
            console.log('registerResponse', registerResponse);
            if (registerResponse.status == 1) {
                setRegisterFields({
                    reg_email: '',
                    reg_pass: '',
                    reg_confm_pass: '',
                    reg_mobile: '',
                    reg_firstName: '',
                    reg_address: ''
                });
                setauthView(0);
                setLoginFields({
                    login_email: '',
                    login_pass: ''
                })
                setspinner(false);

            }
            else {
                console.log('some error occured')
                setspinner(false);
                setTimeout(() => {
                    Toast(registerResponse.message);

                }, 500);
            }
        }
        catch (error) {
            console.log('error of registerResponse Api ', error);
        }

    }

    const changeView = (value) => {

        setauthView(value)
        setLoginFields({
            login_email: '',
            login_pass: ''
        });
        setRegisterFields({
            reg_email: '',
            reg_pass: '',
            reg_confm_pass: '',
            reg_mobile: '',
            reg_firstName: '',
            reg_address: ''
        });
    }


    return (
        <AppComponent>
            <View style={[{ flex: 0.2, borderWidth: 0 }, CommonStyles.centerStyle]}>
                <Image source={Images.capture} style={{ width: '70%', height: '80%' }} resizeMode='contain' />
            </View>
            <Spinner visible={spinner} />
            <View style={{ flex: 0.8, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: '5%', paddingVertical: '5%', borderWidth: 0 }}>
                <View style={styles.log_reg_view}>
                    <TouchableOpacity style={[{ backgroundColor: authView == 0 ? Colors.button_color : Colors.white_text, }, styles.login_register_button, CommonStyles.centerStyle]} onPress={() => changeView(0)} disabled={authView == 0}>
                        <Text style={{ color: authView == 0 ? Colors.white_text : Colors.grey_text, fontSize: 16 }}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: authView == 1 ? Colors.button_color : Colors.white_text, }, styles.login_register_button, CommonStyles.centerStyle]}
                        onPress={() => changeView(1)} disabled={authView == 1} >
                        <Text style={{ color: authView == 1 ? Colors.white_text : Colors.grey_text, fontSize: 16 }}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
                {
                    authView == 0
                        ?
                        <View style={styles.commonView}>

                            <View style={[styles.loginView, styles.shadowCont, { paddingHorizontal: 15 }]}>
                                <InputField
                                    placeholder={'Email/Mobile'}
                                    onChangeText={text => setLoginFields({ ...LoginFields, login_email: text })}
                                    value={login_email}
                                    keyboardType='email-address'
                                />
                                <InputField
                                    placeholder={'Password'}
                                    onChangeText={text => setLoginFields({ ...LoginFields, login_pass: text })}
                                    value={login_pass}
                                    secureTextEntry={!showPassword}
                                    eye={true}
                                    eyeName={!showPassword ? 'eye' : 'eye-off'}
                                    onPress={() => setshowPassword(!showPassword)}
                                />


                                <TouchableOpacity style={[styles.button_log, CommonStyles.centerStyle]} onPress={() => handleLogin()}>
                                    <Text style={styles.text_log}>LOG IN</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, marginTop: 5, borderWidth: 0, width: '100%', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ color: Colors.black_text, fontSize: 12, marginLeft: 10 }}>Keep me Logged in </Text>
                                    </View>
                                    <Text style={styles.forgotPass} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password? </Text>
                                </View>
                            </View>
                            <Text style={styles.terms}>By creating an account or logging in, you agree</Text>

                            <Text style={{ marginTop: 20, marginBottom: 10, color: Colors.button_color, fontSize: 16 }}>LOGIN with</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    style={{ marginHorizontal: 5 }}
                                    name="google-plus-official"
                                    size={44}
                                    color="#d63729"

                                />

                                <Entypo
                                    style={{ marginHorizontal: 5 }}
                                    name="facebook-with-circle"
                                    size={44}
                                    color="black"

                                />
                                <Entypo
                                    style={{ marginHorizontal: 5 }}
                                    name="twitter-with-circle"
                                    size={44}
                                    color="#61adff"

                                />
                            </View>

                        </View>

                        :
                        <View style={[styles.commonView, { marginVertical: 0 }]}>
                            <View style={[styles.loginView, styles.shadowCont, { flex: 1, paddingHorizontal: 0 }]}>
                                <KeyboardAwareScrollView
                                    extraHeight={-64}
                                    contentContainerStyle={{ paddingHorizontal: 10, borderWidth: 0 }}

                                >
                                    <InputField
                                        placeholder={'Name'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_firstName: text })}
                                        value={reg_firstName}
                                    // keyboardType='email-address'
                                    />
                                    <InputField
                                        placeholder={'Email'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_email: text })}
                                        value={reg_email}
                                        keyboardType='email-address'
                                    />
                                    <InputField
                                        placeholder={'Password'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_pass: text })}
                                        value={reg_pass}
                                        secureTextEntry={true}
                                    />
                                    <InputField
                                        placeholder={'Confirm Password'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_confm_pass: text })}
                                        value={reg_confm_pass}
                                        secureTextEntry={true}
                                    />
                                    <InputField
                                        placeholder={'Mobile'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_mobile: text })}
                                        value={reg_mobile}
                                        keyboardType='numeric'
                                    />
                                    <InputField
                                        placeholder={'Address'}
                                        onChangeText={text => setRegisterFields({ ...RegisterFields, reg_address: text })}
                                        value={reg_address}
                                    // secureTextEntry={true}
                                    />


                                    <TouchableOpacity style={[styles.button_log, CommonStyles.centerStyle]}
                                        onPress={() => handleRegisteration()} >

                                        <Text style={styles.text_log}>REGISTER</Text>
                                    </TouchableOpacity>
                                </KeyboardAwareScrollView>

                            </View>
                            <Text style={styles.terms}>By creating an account or logging in, you agree</Text>
                        </View>
                }


            </View>

        </AppComponent>
    );
}

const mapStateToProps = (state) => ({
    auth_token: state.loginReducer.auth_token,
});
const mapDispatchToProps = { loginUser };
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
