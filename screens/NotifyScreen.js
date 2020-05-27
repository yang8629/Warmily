import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, StatusBar, Dimensions, } from 'react-native';
import { Icon } from 'react-native-elements'
import { Slider } from "@miblanchard/react-native-slider";
import FireBaseManager from '../components/FireBaseManager';
import What from '../assets/Emoji/What.svg'
import Angry from '../assets/Emoji/Angry.svg'
import NotGood from '../assets/Emoji/NotGood.svg'
import Sad from '../assets/Emoji/Sad.svg'
import Confused from '../assets/Emoji/Confused.svg'
import Shocked from '../assets/Emoji/Shocked.svg'
import Happy from '../assets/Emoji/Happy.svg'
import Good from '../assets/Emoji/Good.svg'

export default class NotifyScreen extends React.Component {

  FireBase = FireBaseManager.getInstance()
  backiconsize = 40;

  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  barheight = this.screenHeight / 10

  static navigationOptions = {
    header: null,
  };

  notifies = [{
    headimg: require('../assets/images/f41.png'),
    text: '姐姐回覆了你的即時錄',
    page: 'story',
    time: {
      hour: 19,
      date: 9,
      month: 5,
      year: 2020,
    },
    new: true,
  }, {
    headimg: require('../assets/images/f51.png'),
    text: '媽媽傳送了一則訊息',
    page: 'chat',
    time: {
      hour: 7,
      date: 9,
      month: 5,
      year: 2020,
    },
    new: false,
  }, {
    headimg: require('../assets/images/f12.png'),
    text: '爸爸回覆了你的小提醒',
    page: 'homestack',
    time: {
      hour: 7,
      date: 7,
      month: 5,
      year: 2020,
    },
    new: false,
  }, {
    headimg: require('../assets/images/f12.png'),
    text: '爸爸回覆了冰山溝通1',
    page: 'chat',
    time: {
      hour: 12,
      date: 5,
      month: 5,
      year: 2020,
    },
    new: false,
  }, {
    headimg: require('../assets/images/f32.png'),
    text: '哥哥回覆了你的即時錄',
    page: 'story',
    time: {
      hour: 7,
      date: 29,
      month: 4,
      year: 2020,
    },
    new: false,
  }, {
    headimg: require('../assets/images/f51.png'),
    text: '媽媽傳送了一則訊息',
    page: 'chat',
    time: {
      hour: 7,
      date: 26,
      month: 4,
      year: 2020,
    },
    new: false,
  }, {
    headimg: require('../assets/images/f12.png'),
    text: '爸爸回覆了你的小提醒',
    page: 'homestack',
    time: {
      hour: 7,
      date: 29,
      month: 3,
      year: 2020,
    },
    new: false,
  },]

  recent = []

  before = []

  constructor(props) {
    super(props)
    this.state = {
      hour: new Date().getHours(),
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
    this._setNotify()
  }

  _setNotify = () => {
    const { year, month, date, hour } = this.state
    this.notifies.map((buffer, index) => {
      if (buffer.time.year == year) {
        if (buffer.time.month == month) {
          if (buffer.time.date == date) {
            if (buffer.time.hour == hour) {
              this.recent.push({
                headimg: buffer.headimg,
                text: buffer.text,
                new: buffer.new,
                page: buffer.page,
                time: '1小時以內',
              })
            } else {
              this.recent.push({
                headimg: buffer.headimg,
                text: buffer.text,
                new: buffer.new,
                page: buffer.page,
                time: (hour - buffer.time.hour) + '小時前',
              })
            }
          } else {
            this.recent.push({
              headimg: buffer.headimg,
              text: buffer.text,
              new: buffer.new,
              page: buffer.page,
              time: (date - buffer.time.date) + '天前'
            })
          }
        } else {
          this.before.push({
            headimg: buffer.headimg,
            text: buffer.text,
            new: buffer.new,
            page: buffer.page,
            time: (month - buffer.time.month) + '月前'
          })
        }
      } else {
        this.before.push({
          headimg: buffer.headimg,
          text: buffer.text,
          new: buffer.new,
          page: buffer.page,
          time: (year - buffer.time.year) + '年前'
        })
      }
    })
  }

  _gotoHomeScreem = () => {
    this.props.navigation.navigate('home')
  }

  _linkPage = (page) => {
    this.props.navigation.navigate(page)
  }


  render() {

    const { screenWidth, screenHeight, barheight } = this

    return (
      <View style={[styles.container, { backgroundColor: '#F4EDE9' }]}>
        <View style={[styles.container, { backgroundColor: 'rgba(123, 121, 121, 0.05)' }]}>
          <View style={styles.container} >

            <View style={{ width: screenWidth, height: screenHeight }}>
              <View style={[styles.header, { justifyContent: 'center' }]} >

                <View style={{ flex: 0.2, justifyContent: 'center' }} >
                  <TouchableOpacity style={{ width: 30, marginLeft: 15 }} activeOpacity={1} onPress={() => this._gotoHomeScreem()} >
                    <Icon name='angle-left' size={this.backiconsize} color='#6E6E6E' type='font-awesome' />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 23, color: '#6E6E6E' }} >通知</Text>
                </View>

                <View style={{ flex: 0.2 }} >
                </View>

              </View>


              <View style={[styles.chatcontainer, { backgroundColor: '#F4EDE9' }]} >
                <ScrollView  >
                  <View style={{ borderBottomWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.15)' }} >

                    <View style={{ height: barheight, justifyContent: 'center' }} >
                      <Text style={{ fontSize: 16, lineHeight: 19, color: '#818181', left: 20 }} >近期</Text>
                    </View>

                    {this.recent.map((buffer, index) => {
                      return (
                        <TouchableOpacity key={index} style={[{ height: barheight, alignItems: 'center', flexDirection: 'row' }, buffer.new && { backgroundColor: 'white' }]} onPress={() => this._linkPage(buffer.page)} activeOpacity={0.8} >
                          <View style={{ flex: 0.2, height: '70%', alignItems: 'flex-end' }} >
                            <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={buffer.headimg} />
                          </View>
                          <View style={{ flex: 0.6, paddingLeft: 20 }} >
                            <Text style={{ color: '#6E6E6E' }} >{buffer.text}</Text>
                          </View>
                          <View style={{ flex: 0.2, alignItems: 'flex-end' }} >
                            <Text style={{ color: '#9D9D9D', fontSize: 12, lineHeight: 14, marginRight: 20 }} >{buffer.time}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                    }

                  </View>

                  <View style={{ borderBottomWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.15)' }} >

                    <View style={{ height: barheight, justifyContent: 'center' }} >
                      <Text style={{ fontSize: 16, lineHeight: 19, color: '#818181', left: 20 }} >稍早</Text>
                    </View>

                    {this.before.map((buffer, index) => {
                      return (
                        <TouchableOpacity key={index} style={[{ height: barheight, alignItems: 'center', flexDirection: 'row' }, buffer.new && { backgroundColor: 'white' }]} onPress={() => this._linkPage(buffer.page)} activeOpacity={0.8} >
                          <View style={{ flex: 0.2, height: '70%', alignItems: 'flex-end' }} >
                            <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={buffer.headimg} />
                          </View>
                          <View style={{ flex: 0.6, paddingLeft: 20 }} >
                            <Text style={{ color: '#6E6E6E' }} >{buffer.text}</Text>
                          </View>
                          <View style={{ flex: 0.2, alignItems: 'flex-end' }} >
                            <Text style={{ color: '#9D9D9D', fontSize: 12, lineHeight: 14, marginRight: 20 }} >{buffer.time}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                    }

                  </View>

                </ScrollView>
              </View>
            </View>

          </View>
        </View>
      </View >
    );
  }

}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header} >
        <View style={{ flex: 0.2, justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, }} activeOpacity={1} onPress={this.props.onPress} >
            <Icon name='angle-left' size={this.props.size} color='#6E6E6E' type='font-awesome' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, justifyContent: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={[styles.leftheadertext, { alignItems: 'center' }]}>通知</Text>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20 }} onPress={this.props.hintPage} activeOpacity={0.5}>
            <Image style={{ width: '100%', height: '100%', }} source={require('../assets/icon/tips.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.08,
    marginTop: 20,
    flexDirection: 'row',
  },
  headerbox: {
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    flexDirection: 'row',
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
  centerheadertext: {
    color: '#818181',
    fontSize: 20,
    fontWeight: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  leftheadertext: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 23,
    color: '#6E6E6E',
  },
  backicon: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  chatcontainer: {
    flex: 0.9,
  },
  chatissue: {
    maxHeight: 220,
  },
  issuecard: {
    width: 190,
    height: 160,
    marginLeft: 0,
    marginRight: 15,
    borderRadius: 18,
    backgroundColor: 'white',
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
  plusissuecard: {
    width: 95,
    height: 160,
    marginLeft: 20,
    marginRight: 15,
    borderRadius: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  chatcontent: {
    flex: 0.5,
  },
  chattop: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  chatbubble: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    minWidth: 60,
    maxWidth: 200,
    minHeight: 60,
    backgroundColor: '#FAC75E',
    borderRadius: 52.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  triangle: {
    position: 'absolute',
    right: -15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#9BD0D0',
    transform: [
      { rotate: '130deg' }
    ]
  },
  triangleL: {
    position: 'absolute',
    left: -15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#9BD0D0',
    transform: [
      { rotate: '-130deg' }
    ]
  },
  chatimage: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  MonsterImgL: {
    width: 123,
    height: 126,
  },
  MonsterImgR: {
    width: 127,
    height: 141,
  },
  imgtext: {
    fontSize: 15,
    lineHeight: 18,
    color: '#6E6E6E',
    alignSelf: 'center',
  },
  bottomcard: {
    position: 'absolute',
    width: '100%',
    height: 360,
    backgroundColor: '#FAC75E',
    borderRadius: 30,
  },
  bottomcardtop: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomcardinput: {
    width: 250,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 10,
    marginRight: 10,
  },
  bottomcardemoji: {
    width: '100%',
    height: 175,
    alignItems: 'center',
  },
  emojilist: {
    flexDirection: 'row',
    flex: 0.5,
    width: '90%',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },
  emojibox: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  chatcard: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: 800,
    backgroundColor: '#FAC75E',
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  chattext: {
    width: '60%',
    minHeight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  smallchatbubble: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  Rsmalltriangle: {
    position: 'absolute',
    right: 0,
    bottom: -4,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E9E9E9',
    alignSelf: 'flex-end',
    transform: [
      { rotate: '130deg' }
    ]
  },
  Lsmalltriangle: {
    position: 'absolute',
    left: 50,
    top: 15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [
      { rotate: '-130deg' }
    ]
  },
  headbox: {
    marginRight: 10,
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
  headimg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  issueblock: {
    marginBottom: 40,
    width: 300,
    height: 160,
    borderRadius: 15,
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

  thoughttitle: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#FAC75E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thoughtinput: {
    width: 250,
    flex: 0.8,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
});
