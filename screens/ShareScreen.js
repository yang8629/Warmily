import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Easing, Dimensions, Keyboard, } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';

export default class ShareScreen extends React.Component {
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

    _gotoFamilyScreen = () => {
        this.props.navigation.navigate('family')
    }

    _gotoSelectScreen = () => {
        this.props.navigation.navigate('select')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ marginBottom: 40 }} >
                        <Text style={{ fontSize: 18, color: '#6E6E6E' }} >分享代碼以邀請成員加入</Text>
                    </View>
                    <View style={{ width: '70%', padding: 20, borderRadius: '30%', backgroundColor: 'white', marginBottom: 30 }} >
                        <Text style={{ fontSize: 18, color: '#B9B7B7' }} >https://www.figma.com/file/MAH0A4Mohxu6VGcRfClAcS/Untitled?node-id=1011%3A3X</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'space-evenly', alignItems: 'center' }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 15, width: 60, aspectRatio: 1, backgroundColor: '#C4C4C4', borderRadius: '10%' }} >
                                <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/icon/link1.png')} />
                            </View>
                            <Text style={{ color: '#6E6E6E' }} >複製連結</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 15, width: 60, aspectRatio: 1, backgroundColor: '#C4C4C4', borderRadius: '10%' }} >
                                <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/icon/link2.png')} />
                            </View>
                            <Text style={{ color: '#6E6E6E' }} >LINE</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 15, width: 60, aspectRatio: 1, backgroundColor: '#C4C4C4', borderRadius: '10%' }} >
                                <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/icon/link3.png')} />
                            </View>
                            <Text style={{ color: '#6E6E6E' }} >EMAIL</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 15, width: 60, aspectRatio: 1, backgroundColor: '#C4C4C4', borderRadius: '10%' }} >
                                <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/icon/link4.png')} />
                            </View>
                            <Text style={{ color: '#6E6E6E' }} >其他</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.2, width: '100%', alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity style={[{ width: '70%', height: '40%', backgroundColor: '#8AC4C4', alignItems: 'center', justifyContent: 'center', borderRadius: '40%' }, styles.shadow]} onPress={() => this._gotoSelectScreen()} activeOpacity={0.8} >
                        <Text style={{ color: 'white' }} >下一步</Text>
                    </TouchableOpacity>
                </View>
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