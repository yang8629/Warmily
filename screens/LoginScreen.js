import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    Dimensions,
    Keyboard,
} from 'react-native';
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
            keyboard: false
        }
    }

    _showKeyboard = () => {
        this.setState({ keyboard: true })
    }

    _hidKeyboard = () => {
        this.setState({ keyboard: false })
    }

    _gotoSelectScreen = () => {
        this.props.navigation.navigate('select')
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

                            <View style={{ flex: 0.3, width: '70%', backgroundColor: 'white', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={{ width: '90%', fontSize: 14 }} placeholder='輸入email' placeholderTextColor='#C4C4C4' ref={input => this.emailinput = input} />
                            </View>
                            <View style={{ flex: 0.3, width: '70%', backgroundColor: 'white', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={{ width: '90%', fontSize: 14 }} placeholder='輸入密碼' placeholderTextColor='#C4C4C4' secureTextEntry={true} ref={input => this.passwordinput = input} />
                            </View>
                            <View style={{ width: '70%', marginTop: -5 }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#5CA4DA', fontSize: 12 }}>忘記密碼?</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: '5%' }}>
                            <TouchableOpacity style={{ flex: 0.3, width: '70%', backgroundColor: '#8AC4C4', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._gotoSelectScreen()}>
                                <Text style={{ color: 'white', fontSize: 17 }}>登入</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 0.3, width: '70%', borderRadius: '40%', alignItems: 'center', justifyContent: 'center' }}>
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
    Logo: {
        width: 10,
        flex: 0.4,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Eye1: {
        width: 175,
        height: 175,
        left: -87.5,
        top: 10,
        borderRadius: 87.5,
        backgroundColor: '#DCDCDC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Eye2: {
        width: 118,
        height: 118,
        borderRadius: 59,
        backgroundColor: '#3C3C3C',
        alignItems: 'center',
    },
    Eye3: {
        width: 34,
        height: 34,
        top: 9,
        borderRadius: 17,
        backgroundColor: '#FFFFFF',
    },
    MainArea: {
        flex: 0.4,
    },
    InputArea: {
        flex: 0.5,
        width: 10,
    },
    Input: {
        width: 250,
        height: 45,
        left: -125,
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#6F6F6F',
    },
    BtnArea: {
        flex: 0.5,
        width: 10,
    },
    Btn: {
        width: 250,
        height: 45,
        left: -125,
        marginTop: 20,
        backgroundColor: '#6F6F6F',
        borderRadius: 20,
    },
    BottomArea: {
        flex: 0.2,
    },
})