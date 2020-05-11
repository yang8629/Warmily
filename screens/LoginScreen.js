import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Easing, Dimensions, Keyboard, } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    Firebase = FireBaseManager.getInstance();

    screenWidth = Dimensions.get('screen').width;
    screenHeight = Dimensions.get('screen').height;

    constructor(props) {
        super(props)
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this._showKeyboard);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this._hidKeyboard);
        this.state = {
            keyboard: false,
            email: '',
            password: '',
        }
    }

    _showKeyboard = () => {
        this.setState({ keyboard: true })
    }

    _hidKeyboard = () => {
        this.setState({ keyboard: false })
    }

    _gotoFamilyScreen = () => {
        this.props.navigation.navigate('family')
    }

    _gotoRegisterScreen = () => {
        this.props.navigation.navigate('registere')
    }

    _Login = async () => {
        buffer = await this.Firebase._Login(this.state.email, this.state.password)
        if (buffer) {
            this._gotoFamilyScreen()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.4, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: '70%', resizeMode: 'contain', marginTop: 40 }} source={require('../assets/images/logo.png')} />
                </View>

                <View style={{ flex: 0.6, width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '80%', height: '90%', backgroundColor: '#F4EDE9', borderRadius: '20%' }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-around', paddingTop: '5%' }}>

                            {this.state.keyboard ?
                                < TouchableOpacity style={{ position: 'absolute', bottom: 0, width: this.screenWidth, height: this.screenHeight }} activeOpacity={1} onPress={() => Keyboard.dismiss()} />
                                :
                                null
                            }

                            <View style={{ flex: 0.3, width: '90%', backgroundColor: 'white', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={{ width: '90%', fontSize: 14 }} placeholder='輸入email' placeholderTextColor='#C4C4C4' onChangeText={(text) => this.setState({ email: text })} keyboardType='email-address' />
                            </View>
                            <View style={{ flex: 0.3, width: '90%', backgroundColor: 'white', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={{ width: '90%', fontSize: 14 }} placeholder='輸入密碼' placeholderTextColor='#C4C4C4' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                            <View style={{ width: '70%', marginTop: -5 }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#5CA4DA', fontSize: 12 }}>忘記密碼?</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingBottom: '5%' }}>
                            <TouchableOpacity style={[{ height: '30%', width: '90%', backgroundColor: '#8AC4C4', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }, styles.shadow]} onPress={() => this._Login()}>
                                <Text style={{ color: 'white', fontSize: 17 }}>登入</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, padding: 10 }} onPress={() => this._gotoRegisterScreen()} >
                                <Text style={{ color: '#83BEBA', fontSize: 14, lineHeight: 16 }}>註冊新帳號</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#F4EDE9',
        alignItems: 'center',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 20,
            },
        }),
    },
})