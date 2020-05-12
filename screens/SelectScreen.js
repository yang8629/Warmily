import React from 'react';
import { Image, KeyboardAvoidingView, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ScrollView, Keyboard, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import FireBaseManager from '../components/FireBaseManager';
import { StackActions } from '@react-navigation/native';
import { Alert } from 'react-native';

export default class SelectScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;

  characterWidth = this.screenWidth / 4;

  characterImage = [{
    nowcolor: 'right',
    left: {
      color: '#f9a9c5',
      gif: require('../assets/gif/monster01_pink.gif'),
      png: require('../assets/images/monster01_pink.png'),
    },
    right: {
      color: '#7ad9bb',
      gif: require('../assets/gif/monster01_blue.gif'),
      png: require('../assets/images/monster01_blue.png'),
    }
  }, {
    nowcolor: 'right',
    left: {
      color: '#76c7c7',
      gif: require('../assets/gif/monster02_green.gif'),
      png: require('../assets/images/monster02_green.png'),
    },
    right: {
      color: '#cc96f3',
      gif: require('../assets/gif/monster02_purple.gif'),
      png: require('../assets/images/monster02_purple.png'),
    }
  }, {
    nowcolor: 'right',
    left: {
      color: '#F4ABC3',
      gif: require('../assets/gif/monster03_pink.gif'),
      png: require('../assets/images/monster03_pink.png'),
    },
    right: {
      color: '#96D7D7',
      gif: require('../assets/gif/monster03_blue.gif'),
      png: require('../assets/images/monster03_blue.png'),
    }
  }, {
    nowcolor: 'right',
    left: {
      color: '#f2bbf6',
      gif: require('../assets/gif/monster04_purple.gif'),
      png: require('../assets/images/monster04_purple.png'),
    },
    right: {
      color: '#b2e664',
      gif: require('../assets/gif/monster04_green.gif'),
      png: require('../assets/images/monster04_green.png'),
    }
  }, {
    nowcolor: 'right',
    left: {
      color: '#73e8f0',
      gif: require('../assets/gif/monster05_blue.gif'),
      png: require('../assets/images/monster05_blue.png'),
    },
    right: {
      color: '#ffe871',
      gif: require('../assets/gif/monster05_yellow.gif'),
      png: require('../assets/images/monster05_yellow.png'),
    }
  }]

  constructor(props) {
    super(props);
    this.FireBase = FireBaseManager.getInstance();
  }

  componentDidMount = () => {
    _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
  }

  componentWillUnmount = () => {
    _keyboardWillShowSubscription.remove();
    _keyboardWillHideSubscription.remove();
  }

  _keyboardWillShow = (e) => {
    Animated.timing(this.state.inputheigh, {
      toValue: e.endCoordinates.height,
      easing: Easing.linear,
      duration: 100,
    }).start()
    this.setState({
      onFocus: true
    })
  }

  _keyboardWillHide = (e) => {
    Animated.timing(this.state.inputheigh).stop();
    if (this.state.onFocus) {
      this._disFocus();
    }
  }

  state = {
    inputheigh: new Animated.Value(0),
    scrollposi: 0,
    onFocus: false,
    nowselect: 2,
    nowcolor: 'right',
    nowgif: require('../assets/gif/monster03_blue.gif'),
    colorleft: this.characterImage[2].left.color,
    colorright: this.characterImage[2].right.color,
  };

  _gotoHomeScreen = () => {
    this.FireBase._setMyName(this.state.textinput)
    this.FireBase._setMyMonster(this.state.nowcolor == 'right' ? this.characterImage[this.state.nowselect].right.png : this.characterImage[this.state.nowselect].left.png, this.state.nowcolor == 'right' ? this.characterImage[this.state.nowselect].right.gif : this.characterImage[this.state.nowselect].left.gif)
    this.props.navigation.navigate('id')
  }

  _onChangeText = (text) => {
    this.setState({
      textinput: text,
    })
  }

  _sentMessage = () => {
    this.textinput.clear()
  }

  _disFocus = () => {

    this.setState({
      onFocus: false
    })

    Keyboard.dismiss();

    Animated.timing(this.state.inputheigh, {
      toValue: 0,
      easing: Easing.linear,
      duration: 200,
    }).start()

  }

  _onScroll = (event) => {
    var x = event.nativeEvent.contentOffset.x
    var select = 0;

    if (-this.characterWidth * 3 / 2 - 30 < x && x <= -this.characterWidth / 2 - 10) {
      select = 0
    } else if (-this.characterWidth / 2 - 10 < x && x <= this.characterWidth / 2 + 10) {
      select = 1
    } else if (this.characterWidth / 2 + 10 < x && x <= this.characterWidth * 3 / 2 + 30) {
      select = 2
    } else if (this.characterWidth * 3 / 2 + 30 < x && x <= this.characterWidth * 5 / 2 + 50) {
      select = 3
    } else if (x > this.characterWidth * 5 / 2 + 50) {
      select = 4
    }

    // if (this.state.nowselect != select) {
    //   alert(select)
    // }

    this.setState({
      scrollposi: x,
      nowselect: select,
      nowcolor: this.characterImage[select].nowcolor,
      nowgif: this.state.nowcolor == 'right' ? this.characterImage[select].right.gif : this.characterImage[select].left.gif,
      colorleft: this.characterImage[select].left.color,
      colorright: this.characterImage[select].right.color,
    })

  }

  _choceColor = (buffer) => {

    var gif = buffer == 'right' ? this.characterImage[this.state.nowselect].right.gif : this.characterImage[this.state.nowselect].left.gif;

    this.characterImage[this.state.nowselect].nowcolor = buffer;

    this.setState({
      nowcolor: buffer,
      nowgif: gif,
    })
  }

  _pressMonster = (index) => {
    this.scroll.scrollTo({ x: (this.characterWidth + 20) * (index - 1) })
  }

  render() {
    const character = this.characterImage.map((buffer, index) => {
      return <Character key={index} index={index} select={this.state.nowselect} characterWidth={this.characterWidth} scrollposi={this.state.scrollposi} png={buffer.nowcolor == 'left' ? buffer.left.png : buffer.right.png} onPress={() => this._pressMonster(index)} />
    })
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container} >
          <View style={styles.header} />
          <View style={{ flex: 0.6 }}>
            <View style={{ marginTop: 30, marginLeft: 30 }}>
              <Text style={{ color: '#6E6E6E', fontSize: 18 }}>角色選擇</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ height: this.screenHeight * 2 / 5 }} >
                <Image style={{ height: '100%', resizeMode: 'contain' }} source={this.state.nowgif} />
              </View>
            </View>
            <View style={{ width: '25%', marginTop: '5%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', }}>
              <TouchableOpacity style={[{ width: 30, height: 30, backgroundColor: this.state.colorleft, borderRadius: '50%' }, this.state.nowcolor == 'left' ? { width: 34, height: 34, borderWidth: 2, borderColor: 'white' } : null]} onPress={() => this._choceColor('left')} />
              <TouchableOpacity style={[{ width: 30, height: 30, backgroundColor: this.state.colorright, borderRadius: '50%' }, this.state.nowcolor == 'right' ? { width: 34, height: 34, borderWidth: 2, borderColor: 'white' } : null]} onPress={() => this._choceColor('right')} />
            </View>
          </View>
          <View style={{ flex: 0.4, zIndex: 1 }}>
            <View style={{ flex: 1 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentInset={{ left: this.screenWidth / 2 - 20 - this.characterWidth / 2, right: this.screenWidth / 2 - this.characterWidth / 2 }} contentOffset={{ x: this.characterWidth + 20 }} snapToInterval={this.characterWidth + 20} snapToAlignment='start' onScroll={(scrollevent) => this._onScroll(scrollevent)} ref={scroll => this.scroll = scroll} scrollEventThrottle={30} >
                {character}
              </ScrollView>
            </View>
            <Animated.View style={{ position: 'absolute', height: '40%', width: '100%', bottom: this.state.inputheigh, justifyContent: 'center' }}>
              <View style={{ width: '70%', height: '60%', backgroundColor: 'white', borderRadius: '45%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#8AC4C4' }}>
                <TextInput style={{ flex: 0.75, fontSize: 18, lineHeight: 21, paddingLeft: 20 }} placeholder={'輸入暱稱'} placeholderTextColor={'#8AC4C4'} clearButtonMode='while-editing' onChangeText={(text) => this._onChangeText(text)} />
                <View style={{ flex: 0.25, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ width: '70%', aspectRatio: 1, borderRadius: '50%', backgroundColor: '#8AC4C4', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._gotoHomeScreen()} >
                    <Image style={{ width: '60%', height: '60%', resizeMode: 'contain' }} source={require('../assets/icon/arrow_w.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>

          {this.state.onFocus ?
            <TouchableOpacity style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => this._disFocus()} activeOpacity={1} />
            :
            null}

        </View>
      </View >
    );
  }
}

class Character extends React.Component {

  bb = this.props.scrollposi - (this.props.characterWidth + 20) * (this.props.index - 1)

  state = {
    height: new Animated.Value(10),
  }

  render() {

    const { characterWidth, scrollposi, index } = this.props
    var aa = scrollposi - (characterWidth + 20) * (index - 1);


    return (
      <Animated.View style={[{ width: characterWidth, aspectRatio: 1, borderRadius: '50%', backgroundColor: 'white', marginLeft: 20, alignItems: 'center', justifyContent: 'center', top: new Animated.Value(aa).interpolate({ inputRange: [-characterWidth * 3, -characterWidth * 2, -characterWidth, 0, characterWidth, characterWidth * 2, characterWidth * 3], outputRange: [160, 80, 20, 0, 20, 80, 160] }) }, this.props.index == 0 && { marginLeft: 30 }, this.props.select == this.props.index && { borderWidth: 3, borderColor: '#9BD0D0' }]} >
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.8} >
          <Image style={{ width: characterWidth * 3 / 5, resizeMode: 'contain', }} source={this.props.png} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4DBD5',
    lineHeight: 21,
  },
  header: {
    marginTop: 20
  },
});
