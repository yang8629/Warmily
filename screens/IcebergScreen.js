import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ScrollView, Keyboard, TextInput, Dimensions, ImageBackground, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Svg, Line } from 'react-native-svg'
import { Slider } from "@miblanchard/react-native-slider";
import FireBaseManager from '../components/FireBaseManager'
import Angry from '../assets/Emoji/Angry.svg'
import Confused from '../assets/Emoji/Confused.svg'
import Good from '../assets/Emoji/Good.svg'
import Happy from '../assets/Emoji/Happy.svg'
import NotGood from '../assets/Emoji/NotGood.svg'
import Sad from '../assets/Emoji/Sad.svg'
import Shocked from '../assets/Emoji/Shocked.svg'
import What from '../assets/Emoji/What.svg'

export default class IcebergScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  FireBase = FireBaseManager.getInstance();
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  topbarWidth = this.screenWidth * 0.35;
  first = this.FireBase._getFirsttime();

  state = {
    buffer: true,
    onselect: null,
    scroll: false,
    scrollable: true,
    topbar: new Animated.Value(-this.topbarWidth),
    bg: new Animated.Value(0),
    reload: false,
    containerHeight: 0,
    nowpage: 0,
  };

  closecolor = '#447291';

  issue = {
    type: '生活態度',
    title: '留白?',
    finish: false,
    time: '2020.4.24',
    input1: '',
    input2: '',
    input3: '',
    from: null,
    thought: [{
      from: 1,//自己
      title: '我是空白',
    }],
    emoji: [],
    protocol: [{
      text: null,
      recent: [{
        text: null,
      }]
    }]
  }

  emoji = [{
    show: true,
    height: new Animated.Value(0),
    type: 'Angry',
    text: '生氣',
    color: '#F4F187',
    textinput: null,
    image: require('../assets/Emoji/Angry.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'Confused',
    text: '困惑',
    color: '#F4F187',
    textinput: null,
    image: require('../assets/Emoji/Confused.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'Good',
    text: '很棒',
    color: '#efcd89',
    textinput: null,
    image: require('../assets/Emoji/Good.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'Happy',
    text: '黑皮',
    color: '#ed9c8a',
    textinput: null,
    image: require('../assets/Emoji/Happy.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'NotGood',
    text: '不太好',
    color: '#879cf4',
    textinput: null,
    image: require('../assets/Emoji/NotGood.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'Sad',
    text: '哭哭',
    color: '#ed9c8a',
    textinput: null,
    image: require('../assets/Emoji/Sad.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'Shocked',
    text: '驚訝',
    color: '#879cf4',
    textinput: null,
    image: require('../assets/Emoji/Shocked.png'),
    ref: null,
    value: 0,
  }, {
    show: false,
    height: new Animated.Value(0),
    type: 'What',
    text: '黑人?',
    color: '#efcd89',
    textinput: null,
    image: require('../assets/Emoji/What.png'),
    ref: null,
    value: 0,
  },]

  constructor(props) {
    super(props)
    _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
  }

  _keyboardWillShow = (e) => {
    this.setState({ scrollable: false })
  }

  _keyboardWillHide = (e) => {
    this.setState({ scrollable: true })
  }

  _gotoChatScreen = async (buffer) => {
    await this.emoji.map((buffer) => {
      if (buffer.show) {
        if (buffer.textinput != '' || buffer.textinput != null) {
          this.issue.emoji.push({
            type: buffer.type,
            text: buffer.text,
            color: buffer.color,
            textinput: buffer.textinput,
            image: buffer.image,
            value: buffer.value,
          })
        }
      }
    })
    if (buffer) {
      this.FireBase._setIssue(this.issue)
    }
    this.props.navigation.navigate('chat')
  }

  _onSelect = (select) => {
    this.setState({
      onselect: select,
    })
    this.mainScroll.scrollTo({ y: this.screenHeight })
  }

  _scrollBegin = () => {
    this.setState({
      scroll: true,
    })
  }

  _scrollEnd = (event) => {
    this.setState({
      scroll: false
    })

    var page = event.nativeEvent.contentOffset.y / this.screenHeight;
    if (page != this.state.nowpage) {
      Animated.timing(
        this.state.topbar, {
        toValue: -this.topbarWidth + this.topbarWidth / 3 * (page),
        easing: Easing.linear,
        duration: 300,
      }).start();
    }

    this.setState({
      nowpage: page,
    })
  }

  _pressScroll = (buffer) => {
    this.mainScroll.scrollTo({ x: 0, y: (this.state.nowpage + buffer) * this.screenHeight });
  }

  _switchEmoji = (buffer) => {
    a = !this.emoji[buffer].show

    if (a) {
      this.emoji[buffer].ref.measure((fx, fy) => {
        if (this.state.containerHeight - fy > this.screenHeight / 2) {
          this.emojiScroll.scrollTo({ x: 0, y: fy - this.screenHeight * 5 / 16 })
        } else {
          this.emojiScroll.scrollTo({ x: 0, y: fy })
        }
      })
    }

    this.emoji[buffer].show = a

    this.setState({ reload: !this.state.reload })
  }

  _changeEmojitext = (text, index) => {
    this.emoji[index].textinput = text
  }

  _handleScroll = (event) => {
    x = event.nativeEvent.contentOffset.y / 6;
    Animated.timing(this.state.bg, {
      toValue: - x,
      duration: 0,
    }).start()
  }

  _emojiAnimate = (value) => {
    x = 0
    time = 200

    Animated.timing(value, {
      toValue: 6,
      easing: Easing.linear,
      duration: time,
    }).start()

    setTimeout(() =>
      Animated.timing(value, {
        toValue: -5,
        easing: Easing.linear,
        duration: time,
      }).start(), time)

    setTimeout(() =>
      Animated.timing(value, {
        toValue: 4,
        easing: Easing.linear,
        duration: time,
      }).start(), time * 2)

    setTimeout(() =>
      Animated.timing(value, {
        toValue: -3,
        easing: Easing.linear,
        duration: time,
      }).start(), time * 3)

    // setTimeout(() =>
    //   Animated.timing(value, {
    //     toValue: 2,
    //     easing: Easing.linear,
    //     duration: time,
    //   }).start(), time * 4)

    // setTimeout(() =>
    //   Animated.timing(value, {
    //     toValue: -2,
    //     easing: Easing.linear,
    //     duration: time,
    //   }).start(), time * 5)

    setTimeout(() =>
      Animated.timing(value, {
        toValue: 0,
        easing: Easing.linear,
        duration: time,
      }).start(), time * 4)
  }

  render() {
    const { screenWidth, screenHeight } = this;
    var issue;

    switch (this.state.onselect) {
      case 1:
        issue = '社交生活';
        this.issue.type = '社交生活';
        break;
      case 2:
        issue = '家庭關係';
        this.issue.type = '家庭關係';
        break;
      case 3:
        issue = '學校生活';
        this.issue.type = '學校生活';
        break;
      case 4:
        issue = '價值信仰';
        this.issue.type = '價值信仰';
        break;
      case 5:
        issue = '生活態度';
        this.issue.type = '生活態度';
        break;
      case 6:
        issue = '其他方面';
        this.issue.type = '其他方面';
        break;
    }

    const emoji = this.emoji.map((buffer, index) => {
      var x = new Animated.Value(0);
      if (buffer.show && buffer.height !== 400) {
        Animated.timing(buffer.height, {
          toValue: 400,
          duration: 50,
        }).start()
      } else {
        if (buffer.height !== 0) {
          Animated.timing(buffer.height, {
            toValue: 0,
            duration: 100,
          }).start()
        }
      }

      return (
        <View key={index} style={{ width: '60%' }} ref={a => buffer.ref = a} >
          <Animated.View style={{ width: '100%', height: 'auto', alignItems: 'center', transform: [{ translateX: x }] }} onLayout={() => this._emojiAnimate(x)} >
            <Animated.View style={{ width: '100%', maxHeight: buffer.height, overflow: 'hidden' }}  >
              <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, paddingHorizontal: 10 }}>
                <Slider containerStyle={{ width: '70%', height: 50, justifyContent: 'center' }} trackStyle={{ height: 15, borderRadius: '50%', backgroundColor: '#C4C4C4' }} minimumTrackTintColor={buffer.color} thumbStyle={{ width: 50, height: 50, backgroundColor: null, alignItems: 'center', justifyContent: 'center' }} thumbImage={buffer.image} minimumValue={0} maximumValue={5} step={1} onSlidingStart={() => this.setState({ scrollable: false })} onValueChange={(value) => buffer.value = value} onSlidingComplete={() => this.setState({ scrollable: true })} />
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                  <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{buffer.text}</Text>
                </View>
              </View>
              <TextInput multiline style={{ width: '100%', minHeight: 80, color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' onChangeText={(text) => this._changeEmojitext(text, index)} />
            </Animated.View>
          </Animated.View>
        </View>
      )

    })

    return (

      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <View style={[styles.container, { backgroundColor: '#F2F2F2' }]} >
          <Animated.View style={{ width: screenWidth, position: 'absolute', top: this.state.bg }} >
            <Image style={{ width: screenWidth, height: screenHeight * 1.5, resizeMode: 'contain', top: 0 }} source={require('../assets/images/Iceberg2.png')} />
          </Animated.View>
          {/* {screenWidth},{screenHeight} */}
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-this.screenHeight / 10} >
            <ScrollView pagingEnabled={true} canCancelContentTouches={this.state.scrollable} keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false} bounces={false} decelerationRate='fast' ref={mainScroll => this.mainScroll = mainScroll} onMomentumScrollBegin={() => this._scrollBegin()} onMomentumScrollEnd={(event) => this._scrollEnd(event)} onScroll={(event) => this._handleScroll(event)} scrollEventThrottle={16}  >

              {/* 第一頁 */}
              <View style={{ width: screenWidth, height: screenHeight }}>
                <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center' }}>
                  <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>想開啟哪方面的討論?</Text>
                  </View>
                  <View style={{ flex: 0.5, width: '60%' }}>
                    <View style={{ flex: 0.7, justifyContent: 'space-between', marginTop: '10%' }}>
                      <View style={{ width: '100%', flexDirection: 'row', height: '27%', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 1 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(1)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 1 && { color: 'white' }]}>社交生活</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 2 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(2)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 2 && { color: 'white' }]}>家庭關係</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: '100%', flexDirection: 'row', height: '27%', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 3 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(3)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 3 && { color: 'white' }]}>學校生活</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 4 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(4)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 4 && { color: 'white' }]}>價值信仰</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: '100%', flexDirection: 'row', height: '27%', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 5 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(5)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 5 && { color: 'white' }]}>生活態度</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.issueBtn, this.state.onselect == 6 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(6)}>
                          <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 6 && { color: 'white' }]}>其他方面</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* 第二頁 */}
              <View style={{ width: screenWidth, height: screenHeight }} >
                <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center' }}>
                  <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 18, lineHeight: 24, color: 'white' }}>最近在{issue}上發生了什麼事呢? (試著簡單描述)</Text>
                  </View>
                  <View style={{ flex: 0.5, width: '60%' }}>
                    <View style={{ width: '100%', height: '80%', paddingTop: '10%' }}>
                      <TextInput multiline style={{ width: '100%', height: '100%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='沒收我的手機，限制我使用的時間......' onChangeText={(text) => this.issue.title = text} />
                    </View>
                  </View>
                </View>
              </View>

              {/* 第三頁 */}
              <View style={{ width: screenWidth, height: screenHeight }}>
                <View style={{ height: screenHeight / 8 }} />
                <ScrollView style={{ width: screenWidth, height: screenHeight }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='none' bounces={false} onScrollBeginDrag={() => this.setState({ scrollable: false })} onScrollEndDrag={() => this.setState({ scrollable: true })} ref={scroll => this.emojiScroll = scroll} onContentSizeChange={(w, h) => { const height = h; const { containerHeight } = this.state; if (containerHeight != height) { this.setState({ containerHeight: height }) } }} scrollEventThrottle={16} >

                  <View style={{ height: screenHeight > 700 ? screenHeight / 5 : screenHeight / 6 }} />

                  <View style={{ width: '60%', height: 100, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>這件事讓我覺得:</Text>
                  </View>

                  <View style={{ width: '60%', height: 150, justifyContent: 'space-around', alignSelf: 'center' }}>
                    <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(0)} activeOpacity={0.8} ref={a => this.angry = a} >
                        <Angry width='100%' height='100%' style={!this.emoji[0].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(1)} activeOpacity={0.8} >
                        <Confused width='100%' height='100%' style={!this.emoji[1].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(2)} activeOpacity={0.8} >
                        <Good width='100%' height='100%' style={!this.emoji[2].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(3)} activeOpacity={0.8} >
                        <Happy width='100%' height='100%' style={!this.emoji[3].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(4)} activeOpacity={0.8} >
                        <NotGood width='100%' height='100%' style={!this.emoji[4].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(5)} activeOpacity={0.8} >
                        <Sad width='100%' height='100%' style={!this.emoji[5].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(6)} activeOpacity={0.8} >
                        <Shocked width='100%' height='100%' style={!this.emoji[6].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this._switchEmoji(7)} activeOpacity={0.8} >
                        <What width='100%' height='100%' style={!this.emoji[7].show && { opacity: 0.5 }} />
                      </TouchableOpacity>
                    </View>

                  </View>

                  {emoji}

                  <View style={{ height: screenHeight * 0.04 }} />
                </ScrollView>
                <View style={{ width: '100%', height: 40 }} />
              </View>

              {/* 第四頁 */}
              <View style={{ width: screenWidth, height: screenHeight }} >
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                  <View style={{ width: '60%', height: screenHeight * 0.35, justifyContent: 'flex-end' }}>

                  </View>
                  <View style={{ width: '60%' }}>

                    <View style={{ marginVertical: 5 }} >
                      <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 21, color: 'white' }}>媽媽對我的期待</Text>
                      </View>
                      <View style={{ width: '100%', justifyContent: 'center', marginTop: 5 }}>
                        <TextInput multiline style={{ width: '100%', minHeight: 70, color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10, fontSize: 16, lineHeight: 19 }} placeholder='因為...' onChangeText={text => this.issue.input1 = text} />
                      </View>
                    </View>

                    <View style={{ marginVertical: 5 }} >
                      <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 21, color: 'white' }}>我期待我可以......</Text>
                      </View>
                      <View style={{ width: '100%', justifyContent: 'center', marginTop: 5 }}>
                        <TextInput multiline style={{ width: '100%', minHeight: 70, color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10, fontSize: 16, lineHeight: 19 }} placeholder='因為...' onChangeText={text => this.issue.input2 = text} />
                      </View>
                    </View>

                    <View style={{ marginVertical: 5 }} >
                      <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 21, color: 'white' }}>我希望媽媽能...... </Text>
                      </View>
                      <View style={{ width: '100%', justifyContent: 'center', marginTop: 5 }}>
                        <TextInput multiline style={{ width: '100%', minHeight: 70, color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10, fontSize: 16, lineHeight: 19 }} placeholder='因為...' onChangeText={text => this.issue.input3 = text} />
                      </View>
                    </View>
                  </View>

                  <View style={{ width: '60%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '5%' }}>
                    <TouchableOpacity style={{ width: '60%', height: screenHeight * 0.08, borderRadius: 25, backgroundColor: '#FAC75E', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.5} onPress={() => this._gotoChatScreen(true)} >
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>送出</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ height: screenHeight * 0.05 }} />
                </ScrollView>
              </View>

            </ScrollView >

          </KeyboardAvoidingView>


          <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, top: 30, right: 10 }} onPress={() => this._gotoChatScreen(false)} >
            <Icon name='close' size={40} color={this.closecolor} />
          </TouchableOpacity>

          <View style={{ position: 'absolute', width: '50%', height: '8%', top: 20, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 0.3, height: '100%', zIndex: 2 }}>
              <View style={{ left: '8%', width: screenHeight * 0.08, height: '100%', backgroundColor: 'white', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', height: '90%', backgroundColor: '#D0E6F5', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} >
                  <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={require('../assets/icon/iceberg_icon.png')} />
                </View>
                <View style={{ left: '92%', width: '10%', height: '27%', position: 'absolute', backgroundColor: '#D0E6F5', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
              </View>
            </View>

            <View style={{ flex: 0.7, height: '40%', backgroundColor: 'white', justifyContent: 'center', overflow: 'hidden', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }}>
              <Animated.View style={{ width: '98%', height: '70%', left: this.state.topbar, backgroundColor: '#D0E6F5', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
            </View>
          </View>

          <KeyboardAvoidingView behavior='position' >
            {this.state.nowpage < 3 ?
              <TouchableOpacity style={{ position: 'absolute', width: '100%', height: 40, bottom: 0, backgroundColor: '#4a6972' }} onPress={() => this._pressScroll(1)}  >
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => this._pressScroll(1)} >
                  {/* <Icon name='keyboard_arrow_up' size={40} color='white' type='material-design' /> */}
                  <Svg width='40' height='20' >
                    <Line x1='0' y1='0' x2='20' y2='20' stroke="white" strokeWidth='3' />
                    <Line x1='20' y1='20' x2='40' y2='0' stroke="white" strokeWidth='3' />
                  </Svg>
                </TouchableOpacity>
              </TouchableOpacity>
              :
              null
            }
          </KeyboardAvoidingView>

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

  issueBtn: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

