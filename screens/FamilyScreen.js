import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, FlatList, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';
import { render } from 'react-dom';
import { StackActions } from '@react-navigation/native';

export default class FamilyScreen extends React.Component {

  FireBase = FireBaseManager.getInstance();

  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
    this.state = {
      animate: new Animated.Value(this.screenWidth * 0.8),
      Keyboard: false,
    }
  }

  _keyboardWillShow = () => {
    this.setState({ Keyboard: true })
  }

  _keyboardWillHide = () => {
    this.setState({ Keyboard: false })
  }

  _gotoSelectScreen = () => {
    this.props.navigation.navigate('select')
  }

  _pressAdd = () => {
    if (!this.state.show) {
      Animated.timing(this.state.animate, {
        toValue: 50,
        easing: Easing.linear,
        duration: 400,
      }).start()
      this.setState({ show: true })
    } else {
      this._gotoSelectScreen()
    }
  }

  render() {
    const { screenWidth, screenHeight } = this
    return (
      <KeyboardAvoidingView behavior='position' >
        <View style={{ backgroundColor: '#F4EDE9', width: '100%', height: '100%' }}>

          <View style={{ flex: 0.75, alignItems: 'center', justifyContent: 'center' }} >
            <View style={{ marginBottom: 40, height: '40%' }} >
              <Image style={{ height: '100%', resizeMode: 'contain' }} source={require('../assets/images/logo_icon.png')} />
            </View>
            <View>
              <Text style={{ color: '#818181' }} >與家人們共同營造一個家庭幸福空間吧 !</Text>
            </View>
          </View>

          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'space-evenly' }} >

            <TouchableOpacity style={{ flex: 0.3, width: '80%', backgroundColor: '#8AC4C4', alignItems: 'center', justifyContent: 'center', borderRadius: '40%' }} >
              <Text style={{ color: 'white', fontSize: 16 }} >創建家庭群組</Text>
            </TouchableOpacity>

            <View style={{ flex: 0.3, width: '80%', justifyContent: 'center' }} >

              <Animated.View style={{ position: 'absolute', justifyContent: 'center', width: '100%', paddingLeft: 20, height: '100%', backgroundColor: 'white', borderRadius: '40%' }}>
                <TextInput style={{ fontSize: 14, lineHeight: 16, padding: 5 }} placeholder='輸入家庭代碼' />
              </Animated.View>

              <Animated.View style={{ width: this.state.animate, alignSelf: 'flex-end', paddingRight: this.state.animate.interpolate({ inputRange: [50, this.screenWidth * 0.6], outputRange: [5, 0] }), height: this.state.animate.interpolate({ inputRange: [50, this.screenWidth * 0.6], outputRange: [45, screenHeight * 0.25 * 0.3] }) }} >
                <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: '#F8CC73', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} onPress={() => this._pressAdd()} activeOpacity={0.8} >
                  {this.state.show ?
                    <Image style={{ width: 45, height: 45 }} source={require('../assets/icon/enter.png')} />
                    :
                    <Text style={{ color: 'white', fontSize: 16 }} >加入現有家庭群組</Text>
                  }
                </TouchableOpacity>
              </Animated.View>

            </View>

          </View>

        </View>

        {this.state.Keyboard ?
          <TouchableOpacity style={{ position: 'absolute', width: screenWidth, height: screenHeight, }} onPress={() => Keyboard.dismiss()} activeOpacity={1} />
          :
          null
        }

      </KeyboardAvoidingView>
    );
  }
}

function ListHeader(screenHeight) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', height: screenHeight * 0.25, backgroundColor: '#E5E5E5' }} >
      <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '70%', borderRadius: '50%', aspectRatio: 1, overflow: 'hidden' }} >
          <Image style={{ width: '100%', height: '100%' }} source={require('../assets/Album/head.png')} />
        </View>
      </View>
      <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' }}>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 18, lineHeight: 21, color: '#818181' }}>阿里山出遊</Text>
        </View>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>我們一家去阿里山看櫻花，阿花第一次坐火車特別興奮，阿力吃了火車便當就徹底愛上了。</Text>
        </View>
        <View style={{ width: '80%', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>2020/03/19</Text>
        </View>
      </View>
    </View>
  )
}

function PhotoBlock(buffer, screenWidth) {
  return (
    <View style={{ width: screenWidth / 2, aspectRatio: 1, padding: 1 }}>
      <Image style={{ width: '100%', height: '100%' }} source={buffer.photo} />
    </View>
  )
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header} >
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1} onPress={this.props.onPress} >
            <Icon name='angle-left' size={this.props.size} color='#6E6E6E' type='font-awesome' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, lineHeight: 23, fontWeight: 'bold', color: '#818181' }}>回憶錄</Text>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1}>
            <Icon name='ellipsis-h' size={25} color='#AFAFAF' type='font-awesome' />
          </TouchableOpacity>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    marginTop: '5%',
    flexDirection: 'row',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
