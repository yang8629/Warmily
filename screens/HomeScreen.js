import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ScrollView, Keyboard, TextInput, Vibration } from 'react-native';
import { Icon } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import FireBaseManager from '../components/FireBaseManager'

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  FireBase = FireBaseManager.getInstance();
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  inputwidth = this.screenWidth * 0.56;

  constructor(props) {
    super(props);
    this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
  }

  // componentWillUnmount = () => {
  //   _keyboardWillHideSubscription.remove();
  // }

  _keyboardWillHide = (e) => {
    if (this.state.textinput == '') {
      Animated.timing(this.state.inputanimate, {
        toValue: this.inputwidth,
        easing: Easing.bounce,
        duration: 100,
      }).start()
    }
  }

  state = {
    TagglebottomCard: true,
    changeheight: new Animated.Value(-330),
    inputanimate: new Animated.Value(this.inputwidth),
    textinput: '',
    addremind: false,
    showkey: 0,
    showremind: false,
    check: false,
    dirtydata: false,
    importent: false,
  };

  _gotoChatScreen = () => {
    this.props.navigation.navigate('chat')
  }

  _gotoCameraScreen = () => {
    this.props.navigation.navigate('camera')
  }

  _gotoStoryScreen = () => {
    this.props.navigation.navigate('story')
  }

  _gotoSettingScreen = () => {
    this.props.navigation.navigate('setting');
  }

  _gotoNotifyScreen = () => {
    this.remind = this.FireBase._reSet(this.remind.length);
    this._DeletRemind();
  }

  _gotoMemoirScreen = () => {
    this.props.navigation.navigate('memoir')
  }

  _gotoCollectScreen = () => {
    this.props.navigation.navigate('collect')
  }

  _onChangeText = (text) => {
    this.setState({
      textinput: text,
    })
  }

  _reloadRemind = () => {
    this.remind = this.FireBase._getRemindcontent();
    this.remindamount = this.FireBase._getRemindamount();
  }

  remind = [{
    content: '冰箱的晚餐記得拿出來微波喔。',
    checks: [{
      check: false,
      text: '晚餐'
    }, {
      check: false,
      text: '午餐'
    }],
    messages: [{
      text: '好的了解',
    }, {
      text: '哈哈哈哈哈哈',
    }, {
      text: '剛已經微波了',
    }],
    who: '媽媽',
    time: '1小時',
    headimg: require('../assets/images/f32.png')
  },];
  remindamount = [null];
  remind = this.FireBase._getRemindcontent();
  remindamount = this.FireBase._getRemindamount();

  _AddRemind = () => {
    const Remind = {
      content: this.state.textinput,
      importent: this.state.importent,
    }

    if (Remind.content != '' && Remind.content != ' ') {

      this.remind = this.FireBase._addRemindcontent(Remind)

      this.remindamount = this.FireBase._setRemindamount(1);

      this.setState({
        textinput: '',
        importent: false,
      })

      this._RemindPopup();
    } else {
      alert('請勿空白')
    }

  }

  _CheckRemind = async (buffer, index) => {
    if (await buffer != null) {
      this.setState({
        showkey: index,
        showcontent: buffer.content,
        showcheck: buffer.check,
      });
    }
    var key = this.state.showkey;
    var content = this.state.showcontent;
    var check = this.state.showcheck;
    var who = this.state.showwho;
    var time = this.state.showtime;
    var headimg = this.state.headimg;

    this.remind.splice(key, 1, { content: content, check: !check, who: who, time: time, headimg: headimg });
    this.setState({
      showcheck: !check,
    });

  }

  _DeletRemind = () => {
    aa = !this.state.dirtydata
    this.setState({
      addremind: false,
      showremind: false,
      dirtydata: aa,
    });

  }

  _RemindPopup = () => {
    addremind = this.state.addremind
    this.setState({
      addremind: !addremind,
    })
  }

  _RemindShow = (props, index) => {
    this.setState({
      showcontent: props.content,
      showcheck: props.check,
      showkey: index,
      showwho: props.who,
      showtime: props.time,
      showheadimg: props.headimg,
      showremind: true,
      showimportent: props.importent || false,
    });
  }

  _RemindClose = () => {
    this.setState({
      showremind: false,
    })
  }

  _checkCheckBox = (index) => {
    this.remind[this.state.showkey].checks[index].check = !this.remind[this.state.showkey].checks[index].check;
    this.setState({
      check: !this.state.check,
    })
  }

  _sentMessage = () => {
    Animated.timing(this.state.inputanimate, {
      toValue: this.inputwidth,
      easing: Easing.bounce,
      duration: 100,
    }).start()

    this.remind[this.state.showkey].messages.unshift({
      text: this.state.textinput
    })
    this.textinput.clear()
    this.setState({ textinput: '' })
  }

  _onFocus = () => {
    this.setState({ Keyboard: true });
    Animated.timing(this.state.inputanimate, {
      toValue: this.inputwidth - 20,
      easing: Easing.bounce,
      duration: 300,
    }).start()
  }

  _disFocus = () => {
    Keyboard.dismiss();
    this.setState({ Keyboard: false });
  }

  _toggleImportent = () => {
    buffer = this.state.importent
    this.setState({ importent: !buffer })
  }


  render() {
    const remind = this.remind.map((buffer, index) => {
      if (buffer.content == null) {
        return null;
      } else {
        return (
          <Remind key={index} index={index} content={buffer.content} who={buffer.who} time={buffer.time} check={buffer.check} importent={buffer.importent || false} onPress={() => this._RemindShow(buffer, index)} CheckRemind={() => this._CheckRemind(buffer, index)} />
        )
      }
    })

    const allcheck = this.remind[this.state.showkey].checks.map((buffer, index) => {
      if (buffer.check == null) {
        return null
      } else {
        return (
          <CheckBox key={index} check={buffer.check} text={buffer.text} style={{ width: 20, height: 20, borderRadius: 5, borderColor: 'white', borderWidth: 1 }} onPress={() => this._checkCheckBox(index)} size={30} />
        )
      }
    })

    const message = this.remind[this.state.showkey].messages.map((buffer, index) => {
      if (buffer.text == null) {
        return null
      } else {
        return (
          <View key={index} style={[{ width: '90%', padding: 10, borderColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }, index > 0 && { borderTopWidth: 1, }]}>
            <View styly={{ width: '20%' }}>
              <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../assets/images/f22.png')} />
            </View>
            <View style={{ justifyContent: 'center', width: '75%' }}>
              <Text style={{ color: 'white', fontSize: 16 }}>{buffer.text}</Text>
            </View>
          </View>
        )
      }
    })
    return (
      <View style={styles.container} >
        <View style={{ flex: 1 }}>
          <View style={styles.TopCard}>
            <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, borderRadius: 20, top: 30, left: 17 }} onPress={() => this._gotoCollectScreen()} >
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/box.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.SettingBtn, { width: 40, height: 40, borderRadius: 20, }]} onPress={() => this._gotoNotifyScreen()}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/notify.png')} />
            </TouchableOpacity>
            <View style={styles.ImgArea}>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', width: 130, overflow: 'hidden' }} onPress={() => this._gotoSettingScreen()} activeOpacity={1} >
                  <Image style={{ width: 150, height: 110, }} resizeMode='contain' source={require('../assets/gif/monster01_blue.gif')} />
                  <Text style={{ color: '#818181' }} >我</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', width: 130, overflow: 'hidden' }} onPress={() => this._gotoChatScreen()} activeOpacity={1} >
                  <Image style={{ width: 150, height: 110, }} resizeMode='contain' source={require('../assets/gif/monster05_yellow.gif')} />
                  <Text style={{ color: '#818181' }}>媽媽</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', width: 130, overflow: 'hidden' }} onPress={() => this._gotoChatScreen()} activeOpacity={1} >
                  <Image style={{ width: 150, height: 110, }} resizeMode='contain' source={require('../assets/gif/monster03_pink.gif')} />
                  <Text style={{ color: '#818181' }}>爸爸</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }} >
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => this._gotoChatScreen()} activeOpacity={1} >
                  <Image style={styles.MonsterImgR} resizeMode='contain' source={require('../assets/gif/monster02_green.gif')} />
                  <Text style={{ color: '#818181' }}>姐姐</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => this._gotoChatScreen()} activeOpacity={1} >
                  <Image style={styles.MonsterImgR} resizeMode='contain' source={require('../assets/gif/monster04_purple.gif')} />
                  <Text style={{ color: '#818181' }}>哥哥</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ position: 'absolute', width: '100%', height: '50%', top: '50%', backgroundColor: '#F4EDE9', borderBottomLeftRadius: 58, borderBottomRightRadius: 58, zIndex: 0 }} />
          </View>

          <View style={styles.maincontent}>
            <View style={styles.RemindText}>
              <Text style={{ flex: 0.2, fontSize: 20, lineHeight: 23, color: '#6E6E6E' }}>小提醒</Text>
              <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._RemindPopup()}>
                <Icon name='plus-circle' type='font-awesome' size={30} color='#CCCCCC' />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.horizontalScroll} horizontal={true} showsHorizontalScrollIndicator={false} >
              {remind}
            </ScrollView>
            <View style={{ flex: 0.6, width: '100%', flexDirection: 'row' }}>
              <View style={{ flex: 0.3, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => this._gotoCameraScreen()}>
                  <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/camera.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.4, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                  <TouchableOpacity style={[{ borderRadius: 35, width: 70, height: 70, borderRadius: 35, zIndex: 2, borderWidth: 5, borderColor: '#8AC4C4' }, styles.shadow]} activeOpacity={1} onPress={() => this._gotoStoryScreen()}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/images/f22.png')} />
                  </TouchableOpacity>
                  <View style={[{ position: 'absolute', width: 50, height: 50, borderRadius: 25, zIndex: 1, left: 15, borderWidth: 5, borderColor: '#8AC4C4' }, styles.shadow]} >
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/images/f32.png')} />
                  </View>
                  <View style={[{ position: 'absolute', width: 50, height: 50, borderRadius: 25, zIndex: 1, right: 15, borderWidth: 5, borderColor: '#8AC4C4' }, styles.shadow]} >
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/images/f12.png')} />
                  </View>
                </View>
              </View>
              <View style={{ flex: 0.3, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => this._gotoMemoirScreen()}>
                  <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/memory.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity style={styles.tabBarLeftBtn} onPress={() => this._test()}>
            <Icon name="menu" size={40} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBarCenterBtn} onPress={() => this._tagglebottomCard()}>
            <Icon name="add" size={64} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBarRightBtn} onPress={() => this._gotoChatScreen()}>
            <Icon name="comment" type='font-awesome' size={36} color="gray" />
          </TouchableOpacity>
        </View> */}

        {/* {
          this.state.TagglebottomCard ? null :
            <Animated.View style={{ position: 'absolute', width: 420, height: 750, opacity: this.state.changeheight.interpolate({ inputRange: [-330, -187.5], outputRange: [0, 0.5] }) }}>
              <TouchableOpacity style={styles.bottomCardBG} onPress={() => this._tagglebottomCard()} activeOpacity={1} />
            </Animated.View >
        } */}

        {/* <Animated.View style={[styles.bottomCard, { bottom: this.state.changeheight }]}>
          <View style={styles.bottomCardBtn}>
            {this.state.TagglebottomCard ?
              <TouchableOpacity style={[{ backgroundColor: '#DCDCDC' }, styles.bottomCardRoundBtn]} activeOpacity={1} onPress={() => this._tagglebottomCard()}>
                <View style={styles.Eye2}>
                  <View style={styles.Eye3} />
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[{ backgroundColor: '#DCDCDC' }, styles.bottomCardRoundBtn]} onPress={() => this._gotoCameraScreen()}>
                <Icon name='camera' type='evilicon' color='#494848' size={50} />
              </TouchableOpacity>
            }
          </View>
          <View style={styles.EmotionBtn}>
            <View style={styles.EmotionTop}>
              <View style={{ flex: 0.3, }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
              <View style={{ flex: 0.3 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
              <View style={{ flex: 0.3 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
            </View>
            <View style={styles.EmotionBottom}>
              <View style={{ flex: 0.2 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
              <View style={{ flex: 0.2 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
              <View style={{ flex: 0.2 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
              <View style={{ flex: 0.2 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'green' }} />
              </View>
            </View>
          </View>
        </Animated.View> */}

        {
          this.state.addremind ?
            <TouchableOpacity style={[styles.RemindBG, {}]} onPress={() => Keyboard.dismiss()} activeOpacity={1} >
              <View onStartShouldSetResponder={() => true} onResponderGrant={Keyboard.dismiss} style={[styles.RemindPage, this.state.importent && { backgroundColor: '#EC8D7B' }]}>
                <View style={{ flex: 0.8, width: '80%', justifyContent: 'flex-end' }}>
                  <View style={{ width: '100%', height: '70%', marginBottom: '10%', borderRadius: 5, padding: 18, paddingTop: 20, backgroundColor: this.state.importent ? '#F1AC9F' : '#F9D998' }}>
                    <TextInput multiline style={{ width: '100%', height: '100%', fontSize: 18, lineHeight: 21, color: 'white' }} placeholder='提醒家人....' placeholderTextColor='white' onChangeText={(text) => [this._onChangeText(text)]} />
                  </View>
                </View>
                <View style={{ flex: 0.2, width: '80%', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flex: 0.1 }}>
                    <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }} onPress={() => this._toggleImportent()} activeOpacity={0.5} >
                      <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/star.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }} activeOpacity={0.5}>
                      <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/checkbox.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.1 }} />
                  <View style={{ flex: 0.3 }}>
                    <TouchableOpacity style={{ width: '100%', height: 40, borderRadius: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._AddRemind()} activeOpacity={0.8} >
                      <Text style={{ fontSize: 18, lineHeight: 21, color: '#6E6E6E' }}>新增</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, top: 10, right: 10 }} onPress={() => this._RemindPopup(0)}>
                  <Icon name='close' size={40} color='white' iconStyle={styles.shadow} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            :
            null
        }

        {
          this.state.showremind ?
            <View style={styles.RemindBG}>
              <View style={{ width: '80%', height: '80%', backgroundColor: this.state.showimportent ? '#EC8D7B' : '#FFD173', borderRadius: 27, zIndex: 1, alignItems: 'center' }} >

                <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, left: 20, top: 20, alignSelf: 'flex-start' }} onPress={() => this._RemindClose()} >
                  <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/X.png')} />
                </TouchableOpacity>
                <View style={{ flex: 0.7, width: '70%', alignItems: 'center' }}>
                  <View style={{ flex: 0.3, paddingTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.4, alignItems: "center" }}>
                      <Image style={{ width: 60, height: 60, borderRadius: 30, marginRight: '20%' }} source={this.state.showheadimg} />
                      {/* <Text>{this.state.showheadimg}</Text> */}
                    </View>
                    <View style={{ flex: 0.6, alignItems: 'flex-start' }}>
                      <Text style={{ fontSize: 20, lineHeight: 23, fontWeight: 'bold', color: 'white', marginLeft: '5%' }}>{this.state.showwho}</Text>
                    </View>
                  </View>

                  <ScrollView style={{ flex: 0.7, width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ marginTop: 30, width: '95%', justifyContent: 'center' }}>
                      <ScrollView>
                        <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>{this.state.showcontent}</Text>
                      </ScrollView>
                    </View>
                    <View style={{ marginTop: 20, width: '90%', justifyContent: 'flex-start' }}>
                      {allcheck}
                    </View>
                    <View style={{ marginTop: 30, width: '100%', flexDirection: 'row' }}>
                      <Animated.View style={{ width: this.state.inputanimate }} >
                        <TextInput style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, fontSize: 16, lineHeight: 19, padding: 10, paddingLeft: 14 }} placeholder='請輸入...' placeholderTextColor='#A3A3A3' onFocus={() => this._onFocus()} onChangeText={(text) => this._onChangeText(text)} ref={input => this.textinput = input} />
                      </Animated.View>
                      <TouchableOpacity style={{ width: 20, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }} onPress={() => this._sentMessage()}>
                        <Icon name='caret-right' size={30} color='white' type='font-awesome' />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
                <View style={{ flex: 0.3, width: '100%', backgroundColor: this.state.showimportent ? '#F1AC9F' : '#F9D998', borderBottomLeftRadius: 27, borderBottomRightRadius: 27, alignItems: 'center' }}>
                  <ScrollView style={{ width: '80%' }} contentContainerStyle={{ alignItems: 'center' }} contentInset={{ bottom: 10 }} >
                    {message}
                  </ScrollView>
                </View>
              </View>
              <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 0 }} onPress={() => this._RemindClose()} activeOpacity={1} />
              {this.state.Keyboard ?
                <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 0 }} onPress={() => this._disFocus()} activeOpacity={1} />
                :
                null
              }
            </View>
            :
            null
        }

      </View >
    );
  }
}

class Remind extends React.Component {
  backgroundColor = [{
    color: '#EC8D7B',
  }, {
    color: '#FAC75E'
  }]

  _longPress = () => {
    Vibration.vibrate(2000)
  }

  render() {
    const { index, importent } = this.props;
    const backgroundColor = importent ? this.backgroundColor[0].color : this.backgroundColor[1].color;
    return (
      <TouchableOpacity style={[styles.RemindBlock, { backgroundColor: backgroundColor, paddingHorizontal: 20, paddingVertical: 30 }]} activeOpacity={1} onPress={this.props.onPress} onLongPress={() => this._longPress()} >
        <View style={[styles.RemindBlockContent, { flex: 0.8 }]}>
          <Text style={{ fontSize: 14, lineHeight: 16, color: 'white', }}>{this.props.content}</Text>
        </View >

        <View style={{ flex: 0.2, alignSelf: 'flex-end', }} >
          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{ fontSize: 12, lineHeight: 14, color: 'white', fontWeight: 'bold' }}>{this.props.who}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, lineHeight: 14, color: 'white' }}>{this.props.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CheckBox extends React.Component {
  render() {
    const text = this.props.text
    return (
      <View style={{ marginTop: 10, flexDirection: 'row', paddingTop: 5 }}>
        {this.props.check ?
          <TouchableOpacity style={{ position: 'absolute' }} onPress={this.props.onPress} style={{ position: 'absolute', top: -5, }}>
            <Icon name='check' size={this.props.size} color='white' />
          </TouchableOpacity>
          :
          null
        }
        <TouchableOpacity style={this.props.style} onPress={this.props.onPress} activeOpacity={0.8} />
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={1} style={{ marginLeft: 10 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>{text}</Text>
        </TouchableOpacity>
      </View >
    )
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
    flex: 0.45,
    width: '100%',
    backgroundColor: '#E4DBD5',
    borderBottomLeftRadius: 58,
    borderBottomRightRadius: 58,
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
  ImgArea: {
    flex: 0.5,
    marginTop: '30%',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  MonsterImgL: {
    width: 150,
    height: 110,
  },
  MonsterImgR: {
    width: 150,
    height: 110,
  },
  SettingBtn: {
    position: 'absolute',
    top: 30,
    right: 17,
  },
  maincontent: {
    flex: 0.55,
  },
  RemindText: {
    flex: 0.2,
    flexDirection: 'row',
    marginLeft: 20,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    flex: 0.2,
    paddingTop: 15,
  },
  RemindBlock: {
    width: 140,
    height: 170,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 27,
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
  RemindBlockContent: {
    alignSelf: 'center',
    width: '100%',
    height: '50%',
  },
  RemindBlockText: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: 'flex-start',
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

  RemindBG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RemindPage: {
    flex: 1,
    position: 'absolute',
    width: '80%',
    height: '60%',
    backgroundColor: '#FFD173',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 27,
  },
  RemindPageHead: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: 90,
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
  RemindBtn: {
    flex: 0.4,
    height: 45,
    backgroundColor: 'yellow',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RemindBtnText: {
    color: '#F2F2F2',
    fontSize: 18,
  },
  RemindHeader: {
    width: '80%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  bottomCard: {
    position: 'absolute',
    backgroundColor: '#87C5C0',
    width: 375,
    height: 375,
    borderRadius: 187.5,
    alignSelf: 'center',
  },
  bottomCardBtn: {
    top: -30,
    alignSelf: 'center',
  },
  bottomCardRoundBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Eye2: {
    width: 40,
    height: 40,
    backgroundColor: '#3C3C3C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Eye3: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    top: -11,
  },
  EmotionBtn: {
    width: '80%',
    height: 150,
    top: -5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  EmotionTop: {
    width: 200,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  EmotionBottom: {
    marginTop: 20,
    width: 300,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomCardBG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
  },
  CheckBoxS: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#87C5C0'
  },

});
