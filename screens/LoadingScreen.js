import React from 'react';
import { Image, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';

export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    static page = 'Home';

    Firebase = FireBaseManager.getInstance();



    constructor(props) {
        super(props)
        this.state._interval = setInterval(() => this._finishLoad(), 2000)
        this.state = {
            _interval: null,
            ready: true
        }
    }

    _gotoHomeScreen = () => {
        setTimeout(() => this.props.navigation.navigate('homestack'), 1000)
    }

    _gotoLoginScreen = () => {
        setTimeout(() => this.props.navigation.navigate('Login'), 1000)
    }

    _finishLoad = () => {
        ready = this.Firebase._getReady();
        if (ready) {
            clearInterval(this.state._interval);
            if (LoadingScreen.page == 'Home') {
                this._gotoHomeScreen();
            } else {
                this._gotoLoginScreen();
            }
        }
    }

    render() {
        var { image, image2 } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#EFDED2', justifyContent: 'center', alignItems: 'center' }} >
                <Image style={{ height: '30%', resizeMode: 'contain' }} source={require('../assets/images/logo_icon.png')} />
                <Image style={{ width: '80%', resizeMode: 'contain' }} source={require('../assets/images/logo.png')} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    MonsterImg: {
        width: 140,
        height: 109,
        left: 15,

    }
});