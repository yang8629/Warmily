import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Switch, Easing, ScrollView, Keyboard, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager'

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };


    FireBase = FireBaseManager.getInstance();

    constructor(props) {
        super(props)
        this.state = {
            name: (this.FireBase._getMyName() == null || this.FireBase._getMyName() == '') ? '你誰' : this.FireBase._getMyName(),
            isEnabled: true,
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _gotoHomeScreen = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1 }}>
                    <View style={styles.TopCard}>
                        <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, borderRadius: 20, top: 30, left: 17 }} onPress={() => this._goBack()} >
                            <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/back.png')} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center', height: '60%' }}>
                            <Image style={{ height: '100%', resizeMode: 'contain' }} source={require('../assets/images/monster03_blue.png')} />
                        </View>
                        <View style={{ position: 'absolute', width: '100%', height: '50%', top: '50%', backgroundColor: '#F4EDE9', borderBottomLeftRadius: 58, borderBottomRightRadius: 58, zIndex: -1 }} />
                    </View>

                    <View style={styles.maincontent}>
                        <View style={{ flex: 0.05 }} />
                        <View style={{ flex: 0.14, width: '80%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, }}>
                                <Image style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#F1AC9F' }} source={require('../assets/images/Head.png')} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10 }}>
                                <Text style={styles.maintext}>{this.state.name}</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40 }}>
                                    <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/edit.png')} />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 0.14, width: '80%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, }}>
                                <Image style={{ width: 50, height: 50 }} source={require('../assets/icon/user.png')} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10 }}>
                                <Text style={styles.maintext}>帳號設定</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, }}>
                                    <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../assets/icon/back.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.14, width: '80%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, }}>
                                <Image style={{ width: 50, height: 50 }} source={require('../assets/icon/notify.png')} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10 }}>
                                <Text style={styles.maintext}>通知設定</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Switch onValueChange={(isEnabled) => this.setState({ isEnabled })} value={this.state.isEnabled} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.14, width: '80%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, }}>
                                <Image style={{ width: 50, height: 50 }} source={require('../assets/icon/add_member.png')} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10 }}>
                                <Text style={styles.maintext}>邀請家庭成員</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30 }}>
                                    <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../assets/icon/back.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.14, width: '80%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.2, }}>
                                <Image style={{ width: 50, height: 50 }} source={require('../assets/icon/info.png')} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10 }}>
                                <Text style={styles.maintext}>關於</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30 }}>
                                    <Image style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} source={require('../assets/icon/back.png')} />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 0.25, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ height: '50%', width: '80%', borderRadius: 30, backgroundColor: '#C5C5C5', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._goBack()}>
                                <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>登出</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        lineHeight: 21,
    },
    header: {
        marginTop: 20
    },
    TopCard: {
        flex: 0.40,
        width: '100%',
        backgroundColor: '#E4DBD5',
        borderBottomLeftRadius: 58,
        borderBottomRightRadius: 58,
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    maincontent: {
        flex: 0.60,
    },
    maintext: {
        fontSize: 16,
        lineHeight: 19,
        color: '#6E6E6E',
    }
});
