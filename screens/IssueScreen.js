import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { ChatScreen } from './ChatScreen'

export default class IssueScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    issues: [{
      key: 0
    }, {
      key: 1
    }, {
      key: 2
    }, {
      key: 3
    },],
    changeheight: new Animated.Value(-305),
    chatheight: new Animated.Value(-750),
    openbottom: false,
    onFocus: false,
    openemoji: false,
    inputtext: null,
    key: 3,
    speak: [
      {
        key: 1,
        text: 'foodpanda',
        img: require('../assets/images/Monster1.png'),
        type: 1,
      }, {
        key: 2,
        text: '夫胖達',
        type: 2,
      },
    ],
    bgc: 'red',
    box: 260,
  }

  pic = {

  }

  _gotoHomeScreem = () => {
    this.props.navigation.navigate('Home')
  }

  _gotoCameraScreen = () => {
    this.props.navigation.navigate('Camera')
  }

  _taggleChat = () => {

    if (!this.state.openbottom) {
      Animated.timing(this.state.chatheight, {
        toValue: -187.5,
        easing: Easing.elastic(1),
        duration: 400,
      }).start();
      this.scrollView.scrollToEnd();
    } else {
      Animated.timing(this.state.chatheight, {
        toValue: -800,
        easing: Easing.elastic(1),
        duration: 400,
      }).start();
    }

    this.setState({
      openbottom: !this.state.openbottom,
    })

  }

  _taggleText = () => {

    if (!this.state.onFocus) {
      Animated.timing(this.state.changeheight, {
        toValue: -35,
        easing: Easing.linear,
        duration: 250,
      }).start();
      this.setState({
        openemoji: false,
        box: 530,
      });
    } else {
      if (this.state.openemoji) {
        Animated.timing(this.state.changeheight, {
          toValue: -135,
          easing: Easing.linear,
          duration: 200,
        }).start();
        this.setState({
          box: 430,
        });
      } else {
        Animated.timing(this.state.changeheight, {
          toValue: -305,
          easing: Easing.linear,
          duration: 200,
        }).start();
        this.setState({
          openemoji: false,
          box: 260,
        })
      }
    }

    this.setState({
      onFocus: !this.state.onFocus,
    })

  }

  _taggleEmoji = () => {

    if (!this.state.openemoji) {
      if (this.state.onFocus) {
        Keyboard.dismiss();
      }
      else {
        Animated.timing(this.state.changeheight, {
          toValue: -135,
          easing: Easing.linear,
          duration: 250,
        }).start();
        this.setState({
          box: 430,
        })
      }
    } else {
      Animated.timing(this.state.changeheight, {
        toValue: -305,
        easing: Easing.linear,
        duration: 200,
      }).start();
      this.setState({
        box: 260,
      })
    }

    this.setState({
      openemoji: !this.state.openemoji,
    })
  }

  _inputText = (text) => {
    this.setState({
      inputtext: text,
    })
  }

  _sentText = () => {
    const text = this.state.inputtext;
    var key = this.state.key;
    key++;

    if (text != null) {

      this.state.speak.push({
        key: key,
        text: text,
        type: 2,
      })

      this.setState({
        inputtext: null,
        key: key,
        bgc: 'green',
      })

      this.textInput.clear();
      this.scrollView.scrollToEnd();
    }
  }

  _scrollEnd = () => {
    this.scrollView.scrollToEnd();
  }

  render() {
    const issues = this.state.issues.map((buffer) => {
      return (
        <Issue key={buffer.key} />
      )
    })
    const speak = this.state.speak.map((buffer) => {
      if (buffer.type == 1) {
        return (
          <GetSpeak key={buffer.key} text={buffer.text} img={buffer.img} />
        )
      } else {
        return (
          <MySpeak key={buffer.key} text={buffer.text} />
        )
      }
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>爸爸</Text>
          <TouchableOpacity style={styles.headericon} activeOpacity={1} onPress={() => this._gotoHomeScreem()} >
            <Icon name='angle-left' size={40} type='font-awesome' />
          </TouchableOpacity>
        </View>
        <View style={styles.chatcontainer} >
          <ScrollView style={styles.chatissue} horizontal={true} showsHorizontalScrollIndicator={false}>
            {issues}
          </ScrollView>
          <View style={styles.chatcontent}>
            <View style={styles.chattop}>
              <View style={styles.triangle} />
              <View style={styles.chatbubble}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#6E6E6E' }}>今天要去看電影嗎?</Text>
              </View>
            </View>
            <View style={styles.chatimage}>
              <View style={{ marginTop: 25 }}>
                <Image style={styles.MonsterImgL} source={require('../assets/images/Monster1.png')} />
                <Text style={styles.imgtext}>我</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Image style={styles.MonsterImgR} source={require('../assets/images/Monster2.png')} />
                <Text style={styles.imgtext}>媽媽</Text>
              </View>
            </View>
          </View>
        </View>



        {
          this.state.onFocus ?
            <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={Keyboard.dismiss} />
            :
            null
        }

        <Animated.View style={[styles.chatcard, { bottom: this.state.chatheight }]}>
          <ScrollView ref={scroll => { this.scrollView = scroll }}>
            <View style={{ justifyContent: 'flex-start' }}>
              <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }} >
                <Text style={{ fontSize: 14, lineHeight: 16, color: '#8F8F8F' }} >下午14:00</Text>
              </View>
              {speak}
            </View>
          </ScrollView>

          {/* this.state.changeheight.interpolate({ inputRange: [-305, -135, -35], outputRange: [250, 430, 530] }) */}
          <Animated.View style={{ backgroundColor: 'blue', width: '100%', height: this.state.box, }} />
          <View style={{ marginLeft: 5, position: 'absolute', top: 10, right: 30 }}>
            {this.state.openbottom ?
              <Icon name='angle-down' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._taggleChat()} underlayColor='#FAC75E' />
              :
              <Icon name='angle-up' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._taggleChat()} underlayColor='#FAC75E' />
            }
          </View>
        </Animated.View>

        <Animated.View style={[styles.bottomcard, { bottom: this.state.changeheight }]} >
          <View style={styles.bottomcardtop}>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 50, borderRadius: 15, alignItems: 'center' }}>
              <TextInput style={styles.bottomcardinput} placeholder='請輸入...' onChangeText={(text) => this._inputText(text)} onFocus={() => this._taggleText()} onBlur={() => this._taggleText()} ref={input => { this.textInput = input }} />
              <TouchableOpacity style={{ width: 35, height: 35, backgroundColor: this.state.bgc, marginRight: 5, borderRadius: 17.5 }} onPress={() => this._taggleEmoji()} />
            </View>
            <View style={{ marginLeft: 5 }}>
              {this.state.openbottom ?
                <View style={{ marginLeft: 12 }} >
                  <Icon name='angle-right' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._sentText()} underlayColor='#FAC75E' />
                </View>
                :
                <Icon name='angle-up' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._taggleChat()} underlayColor='#FAC75E' />
              }
            </View>
          </View>
          <View style={styles.bottomcardemoji} >
            <View style={styles.emojilist}>
              <View style={styles.emojibox}>
                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._gotoCameraScreen()}>
                  <Icon name='camera' type='evilicon' color='#494848' size={50} />
                </TouchableOpacity>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
            </View>
            <View style={styles.emojilist}>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
              <View style={styles.emojibox}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'yellow' }}></View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

class Issue extends React.Component {
  render() {
    return (
      <View style={styles.issuecard} />
    )
  }
}

class MySpeak extends React.Component {
  render() {
    return (
      <View style={[styles.chattext, { alignItems: 'flex-end' }]}>
        <View style={[styles.smallchatbubble, { backgroundColor: '#E9E9E9' }]}>
          <View style={styles.Rsmalltriangle} />
          <Text style={{ fontSize: 16, lineHeight: 19 }} >
            {this.props.text}
          </Text>
        </View>
      </View>
    )
  }
}

class GetSpeak extends React.Component {
  render() {
    const img = this.props.img;
    return (
      <View style={[styles.chattext, { justifyContent: 'flex-start', flexDirection: 'row' }]}>
        <View style={styles.headbox}>
          <Image source={img} style={styles.headimg} />
        </View>
        <View style={styles.Lsmalltriangle} />
        <View style={[styles.smallchatbubble, { backgroundColor: 'white', alignSelf: 'center' }]}>
          <Text style={{ fontSize: 16, lineHeight: 19 }}>
            {this.props.text}
          </Text>
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
    flex: 0.1,
  },
  headertext: {
    marginTop: 30,
    color: 'black',
    fontSize: 20,
    fontWeight: 23,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headericon: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
  },
  chatcontainer: {
    flex: 0.9,
    paddingTop: 20,
  },
  chatissue: {
    maxHeight: 220,
  },
  issuecard: {
    width: 140,
    height: 180,
    backgroundColor: '#F5F5F5',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 18,
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
  chatcontent: {
    flex: 2,
  },
  chattop: {
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  chatbubble: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 130,
    height: 60,
    right: 130,
    backgroundColor: '#FAC75E',
    borderRadius: 52.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  triangle: {
    position: 'absolute',
    right: 125,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FAC75E',
    alignSelf: 'flex-end',
    transform: [
      { rotate: '130deg' }
    ]
  },
  chatimage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  MonsterImgL: {
    width: 106,
    height: 126,
  },
  MonsterImgR: {
    width: 127,
    height: 141,
  },
  imgtext: {
    fontSize: 18,
    lineHeight: 21,
    color: '#6E6E6E',
    alignSelf: 'center',
  },
  bottomcard: {
    position: 'absolute',
    width: '100%',
    height: 375,
    backgroundColor: '#FAC75E',
    borderRadius: 58,
  },
  bottomcardtop: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomcardinput: {
    width: 250,
    height: 40,
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
    borderRadius: 58,
    paddingLeft: 15,
    paddingRight: 15,
  },
  chattext: {
    width: '100%',
    height: 40,
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
    top: 10,
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
});
