import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Easing, Dimensions, Keyboard, } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

export default class GuideScreen extends React.Component {
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
            nowpage: 0,
        }
    }

    _showKeyboard = () => {
        this.setState({ keyboard: true })
    }

    _hidKeyboard = () => {
        this.setState({ keyboard: false })
    }

    _gotoLoginScreen = () => {
        this.props.navigation.dispatch(
            StackActions.replace('login')
        );
    }

    _gotoRegistereScreen = () => {
        this.props.navigation.dispatch(
            StackActions.replace('registere')
        );
    }

    _onScroll = (event) => {
        x = Math.round(event.nativeEvent.contentOffset.x / this.screenWidth)
        this.setState({ nowpage: x })
    }

    render() {
        const { screenWidth, screenHeight } = this
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', width: screenWidth, height: screenHeight * 0.6, top: 0, backgroundColor: '#E4DBD5' }} />
                <ScrollView style={{}} bounces={false} pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} onScroll={(event) => this._onScroll(event)} scrollEventThrottle={16} >

                    <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ flex: 0.4, width: '65%', alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 30 }} >
                                <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', color: '#818181' }} >屬於你們的專屬家庭空間</Text>
                            </View>
                            <Text style={{ fontSize: 14, lineHeight: 16, color: '#818181', textAlign: 'center' }} >時刻與家人分享自己的生活趣事、想法、感受，增加對彼此的了解</Text>
                        </View>
                        <View style={{ flex: 0.6 }} >
                            <Image style={{ height: '50%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/images/guide1.png')} />
                        </View>
                    </View>

                    <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ flex: 0.4, width: '65%', alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 30 }} >
                                <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', color: '#818181', textAlign: 'center' }} >挑選代表自己的可愛角色</Text>
                            </View>
                            <Text style={{ fontSize: 14, lineHeight: 16, color: '#818181', textAlign: 'center' }} >不好意思當面說出內心的話嗎? 讓小怪物代替你講出來吧!</Text>
                        </View>
                        <View style={{ flex: 0.6, top: 25 }} >
                            <Image style={{ height: '50%', aspectRatio: 1.4, resizeMode: 'contain' }} source={require('../assets/images/guide2.png')} />
                        </View>
                    </View>

                    <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ flex: 0.4, width: '70%', alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ marginBottom: 30 }} >
                                <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', color: '#818181', textAlign: 'center' }} >系統式解決衝突，建立有效溝通</Text>
                            </View>
                            <Text style={{ fontSize: 14, lineHeight: 16, color: '#818181', textAlign: 'center' }} >一起和家人打造你們之間的溝通橋樑， 讓彼此不再有隔閡</Text>
                        </View>
                        <View style={{ flex: 0.6 }} >
                            <Image style={{ height: '60%', aspectRatio: 1, resizeMode: 'contain', top: -30 }} source={require('../assets/images/guide3.png')} />
                        </View>
                    </View>

                </ScrollView >

                <View style={{ position: 'absolute', height: '25%', width: '100%', alignItems: 'center', justifyContent: 'center', bottom: 0 }} >

                    <View style={{ flexDirection: 'row', flex: 0.2, width: 60, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10, }} >
                        <View style={[{ width: 15, height: 15, borderRadius: 8, borderColor: '#8AC4C4', borderWidth: 1 }, this.state.nowpage == 0 && { backgroundColor: '#8AC4C4' }]} />
                        <View style={[{ width: 15, height: 15, borderRadius: 8, borderColor: '#8AC4C4', borderWidth: 1 }, this.state.nowpage == 1 && { backgroundColor: '#8AC4C4' }]} />
                        <View style={[{ width: 15, height: 15, borderRadius: 8, borderColor: '#8AC4C4', borderWidth: 1 }, this.state.nowpage == 2 && { backgroundColor: '#8AC4C4' }]} />
                    </View>

                    <View style={{ flex: 0.8, width: '100%', alignItems: 'center' }} >
                        <TouchableOpacity style={{ width: '80%', flex: 0.4, backgroundColor: '#8AC4C4', alignItems: 'center', justifyContent: 'center', borderRadius: '40%', marginBottom: 10 }} activeOpacity={0.6} onPress={() => this._gotoRegistereScreen()} >
                            <Text style={{ color: 'white' }} >註冊新帳號</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '80%', flex: 0.4, borderColor: '#8AC4C4', borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderRadius: '40%' }} activeOpacity={0.6} onPress={() => this._gotoLoginScreen()} >
                            <Text style={{ color: '#8AC4C4' }} >已經有溫叨帳號嗎?登入</Text>
                        </TouchableOpacity>
                    </View>

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