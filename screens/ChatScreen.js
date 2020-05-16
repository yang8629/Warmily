import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements'
import { Slider } from "@miblanchard/react-native-slider";
import { StackActions } from '@react-navigation/native';
import { Video } from 'expo-av'
import FireBaseManager from '../components/FireBaseManager';
import What from '../assets/Emoji/What.svg'
import Angry from '../assets/Emoji/Angry.svg'
import NotGood from '../assets/Emoji/NotGood.svg'
import Sad from '../assets/Emoji/Sad.svg'
import Confused from '../assets/Emoji/Confused.svg'
import Shocked from '../assets/Emoji/Shocked.svg'
import Happy from '../assets/Emoji/Happy.svg'
import Good from '../assets/Emoji/Good.svg'
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class ChatScreen extends React.Component {

  FireBase = FireBaseManager.getInstance()
  backiconsize = 40;
  box = 260;
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  family = this.FireBase._getFamily();
  monstergif = this.FireBase._getMyMonstergif()
  monsterpng = this.FireBase._getMyMonster()
  random = Math.ceil(Math.random() * 100) % 7;

  color = [
    {
      backgroundColor: '#FAC75E'
    },
    {
      backgroundColor: '#87C5C0'
    }
  ]

  static navigationOptions = {
    header: null,
  };

  speak = [{
    text: '你今天下午要幹嘛',
    img: require('../assets/images/f32.png'),
    type: 1,
  }, {
    text: '怎麼了',
    type: 0,
  }, {
    text: '要去看電影嗎?',
    img: require('../assets/images/f32.png'),
    type: 1,
  },]

  issues = this.family.issues

  // issues = [{
  //   type: null,
  //   protocol: [{
  //     text: null,
  //     recent: [{
  //       text: null,
  //     }]
  //   }],
  //   thought: [],
  // },]

  // issues = [{
  //   type: '生活態度',
  //   title: '沒收我的手機，限制我使用的時間',
  //   finish: false,
  //   time: '2020.4.4',
  //   input1: '希望我不要過度沉迷於手機',
  //   input2: '自行有效控管使用手機的時間',
  //   input3: '多信任我一點,不要沒收我的手機',
  //   from: {
  //     head: require('../assets/images/f31.png'),
  //     input1: '晚上12點要做什麼事情?',
  //     input2: '抱佛腳',
  //     input3: '因為零時抱佛腳',
  //     emoji: [{
  //       type: 'Happy',
  //       text: '黑皮',
  //       color: '#ed9c8a',
  //       textinput: '因為自己不被信任',
  //       image: require('../assets/Emoji/Sad.png'),
  //       value: 4,
  //     },],
  //   },
  //   emoji: [{
  //     type: 'Sad',
  //     text: '哭哭',
  //     color: '#ed9c8a',
  //     textinput: '因為自己不被信任',
  //     image: require('../assets/Emoji/Sad.png'),
  //     value: 4,
  //   },],
  //   thought: [{
  //     from: 0,//媽媽
  //     title: '我覺得你沒有辦法控制自己手機使用的時間......',
  //   },
  //   {
  //     from: 1,//自己
  //     title: '我希望你能多相信我一些，給我自己分配管理的空間。',
  //   }, {
  //     from: 0,//媽媽
  //     title: '我覺得你沒有辦法自己控制手機使用的時間，因為每次我請你去做功課或是幫忙的時候你都沒做到，而且你最近的功課也一直在退步，所以我很不放心讓你自己控制手機。',
  //   }],
  //   protocol: [{
  //     text: '我會自發性地寫完作業後再拿出手機',
  //     confirm: true,
  //     modify: false,
  //     recent: [{
  //       text: '阿拉花呱',
  //       img: require('../assets/images/f51.png'),
  //     }],
  //   },
  //   {
  //     text: '如果發現我未完成作業就玩手機，手機才交由媽媽保管',
  //     confirm: false,
  //     modify: true,
  //     recent: [{
  //       text: '你才不會',
  //       img: require('../assets/images/f51.png'),
  //     }],
  //   },
  //   {
  //     text: '傅紫恩很醜',
  //     confirm: true,
  //     modify: true,
  //     recent: [{
  //       text: null,
  //     }],
  //   },
  //   {
  //     text: '過度使用手機被警告三次以上，手機沒收一個禮拜',
  //     confirm: false,
  //     modify: false,
  //     recent: [{
  //       text: null,
  //     }],
  //   },
  //   ],
  // }, {
  //   type: '生活態度',
  //   title: '參加社團影響課業嗎?',
  //   finish: false,
  //   time: '2019.12.24',
  //   input1: '希望我不要過度沉迷於手機',
  //   input2: '自行有效控管使用手機的時間',
  //   input3: '多信任我一點,不要沒收我的手機',
  //   from: null,
  //   emoji: [{
  //     type: 'Sad',
  //     text: '哭哭',
  //     color: '#ed9c8a',
  //     textinput: '因為自己不被信任',
  //     image: require('../assets/Emoji/Sad.png'),
  //     value: 4,
  //   },],
  //   thought: [{
  //     from: 1,
  //     title: '你一個禮拜應該整理一次房間',
  //   }, {
  //     from: 0,
  //     title: '等我覺得亂就會整理了',
  //   }],
  //   protocol: [{
  //     text: null,
  //     check: true,
  //     recent: [{
  //       text: null
  //     }],
  //   },],
  // },]

  collects = [{
    video: require('../assets/Collect/Collect_1.mp4'),
  }, {
    video: require('../assets/Collect/Collect_2.mp4'),
  }, {
    video: require('../assets/Collect/Collect_3.mp4'),
  }, {
    video: require('../assets/Collect/Collect_4.mp4'),
  }, {
    video: require('../assets/Collect/Collect_5.mp4'),
  }, {
    video: require('../assets/Collect/Collect_6.mp4'),
  }, {
    video: require('../assets/Collect/Collect_7.mp4'),
  },]

  emoji = [{
    show: true,
    type: 'Angry',
    text: '生氣',
    color: '#F4F187',
    image: require('../assets/Emoji/Angry.png'),
  }, {
    show: false,
    type: 'Confused',
    text: '困惑',
    color: '#F4F187',
    image: require('../assets/Emoji/Confused.png'),
  }, {
    show: false,
    type: 'Good',
    text: '很棒',
    color: '#efcd89',
    image: require('../assets/Emoji/Good.png'),
  }, {
    show: false,
    type: 'Happy',
    text: '黑皮',
    color: '#ed9c8a',
    image: require('../assets/Emoji/Happy.png'),
  }, {
    show: false,
    type: 'NotGood',
    text: '不太好',
    color: '#879cf4',
    image: require('../assets/Emoji/NotGood.png'),
  }, {
    show: false,
    type: 'Sad',
    text: '哭哭',
    color: '#ed9c8a',
    image: require('../assets/Emoji/Sad.png'),
  }, {
    show: false,
    type: 'Shocked',
    text: '驚訝',
    color: '#879cf4',
    image: require('../assets/Emoji/Shocked.png'),
  }, {
    show: false,
    type: 'What',
    text: '黑人?',
    color: '#efcd89',
    image: require('../assets/Emoji/What.png'),
  },]

  constructor(props) {
    super(props)
    this._subscribe = this.props.navigation.addListener('focus', () => {
      reload = !this.state.reload;
      this.setState({ reload: reload });
    });
    this.state = {
      issuepage: false,
      hintPage: false,
      thoughtpage: false,
      protocolpage: false,
      finalprotocol: false,
      protocoladd: false,
      checkprotocol: false,
      reprotocol: false,
      icebergdetail: false,
      showvideo: false,
      detailpage: 0,
      thoughtorder: null,
      issuenumber: 0,
      changeheight: new Animated.Value(-305),
      chatheight: new Animated.Value(-750),
      mainheight: new Animated.Value(0),
      openbottom: false,
      onFocus: false,
      openemoji: false,
      openchat: false,
      inputtext: null,
      protocolorder: 0,
      speakamount: 2,
      reload: false,
      id: this.FireBase._getID()
    }
  }

  _setHint = () => {
    order = null
    if (this.state.id > this.family.id) {
      order = 0
    } else if (this.state.id == this.family.id) {
      order = 1
    } else {
      order = 2
    }
    this.hintorder = order
  }

  _onFocus = () => {
    this.setState({
      onFocus: !this.state.onFocus,
    })
  }

  _gotoHomeScreem = () => {
    this.props.navigation.navigate('homestack')
  }

  _gotoIcebergScreen = () => {
    this.props.navigation.navigate('iceberg')
  }

  _taggleChat = () => {

    if (!this.state.openbottom) {
      Animated.timing(this.state.chatheight, {
        toValue: -187.5,
        easing: Easing.elastic(1),
        duration: 400,
      }).start();
    } else {
      Animated.timing(this.state.chatheight, {
        toValue: -800,
        easing: Easing.elastic(1),
        duration: 400,
      }).start();
    }

    openbottom = !this.state.openbottom
    openchat = !this.state.openchat
    this.setState({
      openbottom,
      openchat,
    })

  }

  _taggleText = () => {

    if (!this.state.onFocus) {
      Animated.timing(this.state.changeheight, {
        toValue: -40,
        easing: Easing.linear,
        duration: 250,
      }).start();

      Animated.timing(this.state.mainheight, {
        toValue: 0,
        easing: Easing.linear,
        duration: 200,
      }).start();

      this.box = 530;
      this.setState({
        openemoji: false,
      });
    } else {
      if (this.state.openemoji) {
        Animated.timing(this.state.changeheight, {
          toValue: -145,
          easing: Easing.linear,
          duration: 200,
        }).start();

        Animated.timing(this.state.mainheight, {
          toValue: -170,
          easing: Easing.linear,
          duration: 200,
        }).start();

        this.box = 430;
      } else {
        Animated.timing(this.state.changeheight, {
          toValue: -305,
          easing: Easing.linear,
          duration: 200,
        }).start();
        this.box = 260;
        this.setState({
          openemoji: false,
        })
      }
    }

    this.setState({
      onFocus: !this.state.onFocus,
    })
  }

  _toggleEmoji = () => {

    if (!this.state.openemoji) {
      if (this.state.onFocus) {
        Keyboard.dismiss();
      }
      else {
        Animated.timing(this.state.changeheight, {
          toValue: -145,
          easing: Easing.linear,
          duration: 250,
        }).start();

        Animated.timing(this.state.mainheight, {
          toValue: -170,
          easing: Easing.linear,
          duration: 250,
        }).start();
        this.box = 430;
      }
    } else {
      Animated.timing(this.state.changeheight, {
        toValue: -305,
        easing: Easing.linear,
        duration: 200,
      }).start();

      Animated.timing(this.state.mainheight, {
        toValue: 0,
        easing: Easing.linear,
        duration: 200,
      }).start();
      this.box = 260;
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

    if (text != null) {
      this.speak.push({
        text: text,
        type: 0,
      })

      this.textInput.clear();
      this.scrollView.scrollToEnd();

      speakamount = this.state.speakamount + 1

      this.setState({
        inputtext: null,
        speakamount: speakamount
      })
    }
  }

  _scrollEnd = () => {
    this.scrollView.scrollToEnd();
  }

  _openIssue = (number) => {
    this.setState({
      issuepage: true,
      issuenumber: number,
    })
  }

  _issueGoBack = () => {
    this.setState({
      issuepage: false,
    })
  }

  _toggleThought = () => {
    this.setState({
      thoughtpage: !this.state.thoughtpage,
    })
  }

  _addThought = () => {
    const newthought = this.state.inputtext;
    if (newthought != null) {
      const { issuenumber } = this.state;

      this.issues[issuenumber].thought.push({
        from: 1,
        title: newthought,
      })


      this.setState({
        thoughtpage: false,
        inputtext: null,
      })
    }
  }

  _toggleProtocol = () => {
    this.setState({
      protocolpage: !this.state.protocolpage,
    })
  }

  _toggleProtocolAdd = () => {
    this.setState({
      protocoladd: !this.state.protocoladd,
    })
  }

  _protocolAdd = () => {
    const text = this.state.inputtext;
    if (text != null) {
      if (this.issues[this.state.issuenumber].protocol[0].text == null) {
        this.issues[this.state.issuenumber].protocol[0].text = text
        this.issues[this.state.issuenumber].protocol[0].confirm = false
        this.issues[this.state.issuenumber].protocol[0].modify = false
      } else {
        this.issues[this.state.issuenumber].protocol.push({
          text: text,
          confirm: false,
          modify: false,
          recent: [{
            text: null,
          }]
        })
      }
      this.InputProtocol.clear();

      this.setState({
        inputtext: null,
        protocoladd: !this.state.protocoladd,
      })
    }
  }

  _toggleProtocolFinal = () => {
    this.setState({
      finalprotocol: !this.state.finalprotocol,
    })
  }

  _finishProtocol = () => {

    this.issues[this.state.issuenumber].finish = true

    this.setState({
      showvideo: true,
    })

    // this.setState({
    //   issuepage: false,
    //   thoughtpage: false,
    //   protocolpage: false,
    //   finalprotocol: false,
    //   showvideo: true,
    // })
    // this.FireBase._setFinish(false)
    // this.props.navigation.dispatch(
    //   StackActions.pop(1)
    // )
    // this.props.navigation.navigate('collect')
  }

  _videoFinish = () => {
    this.setState({
      issuepage: false,
      thoughtpage: false,
      protocolpage: false,
      finalprotocol: false,
      showvideo: true,
    })
    this.FireBase._setFinish(false)
    this.props.navigation.dispatch(
      StackActions.pop(1)
    )
    this.props.navigation.navigate('collect')
  }

  _checkProtocol = (buffer) => {
    var checkprotocol = this.state.checkprotocol
    this.setState({
      checkprotocol: !checkprotocol,
      protocolorder: buffer,
    })
  }

  _confirmProtocol = () => {
    this.issues[this.state.issuenumber].protocol[this.state.protocolorder].confirm = true;
    this.setState({ checkprotocol: false })
  }

  _toggleReProtocol = () => {
    buffer = this.state.reprotocol
    this.setState({
      reprotocol: !buffer
    })
  }

  _newProtocol = () => {
    const text = this.state.inputtext;
    if (text != null) {
      if (this.state.id == 1) {
        buffer = this.issues[this.state.issuenumber].protocol[this.state.protocolorder]

        if (this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].text == null) {
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].text = buffer.text
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].img = require('../assets/icon/cancel.png')
        } else {
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent.unshift({
            text: buffer.text,
            img: require('../assets/icon/cancel.png')
          })
        }

        this.issues[this.state.issuenumber].protocol[this.state.protocolorder].text = text
        this.issues[this.state.issuenumber].protocol[this.state.protocolorder].confirm = true
        this.issues[this.state.issuenumber].protocol[this.state.protocolorder].modify = true

        this.setState({
          inputtext: null,
          checkprotocol: false,
          reprotocol: false,
        })
      } else {

        buffer = this.issues[this.state.issuenumber].protocol[this.state.protocolorder]

        if (this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].text == null) {
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].text = text
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent[0].img = require('../assets/images/f11.png')
        } else {
          this.issues[this.state.issuenumber].protocol[this.state.protocolorder].recent.unshift({
            text: text,
            img: require('../assets/images/f51.png'),
          })
        }

        this.issues[this.state.issuenumber].protocol[this.state.protocolorder].confirm = false
        this.issues[this.state.issuenumber].protocol[this.state.protocolorder].modify = true

        this.setState({
          inputtext: null,
          checkprotocol: false,
          reprotocol: false,
        })
      }
    }
  }

  _toggleHintpage = () => {
    this._setHint()
    buffer = this.state.hintPage
    this.setState({ hintPage: !buffer })
  }

  _sentEmoji = (buffer) => {
    this.speak.push({
      order: buffer,
      type: 2,
    })
    this.scrollView.scrollToEnd();
    speakamount = this.state.speakamount + 1;
    this.setState({ speakamount: speakamount })
  }

  _getOrder = (buffer) => {
    switch (buffer) {
      case 0:
        return '條例一';
      case 1:
        if (this.issues[this.state.issuenumber].protocol[0].text == null) {
          return '條例一';
        } else {
          return '條例二';
        }
      case 2:
        return '條例三';
      case 3:
        return '條例四';
      case 4:
        return '條例五';
      case 5:
        return '條例六';
      case 6:
        return '條例七';
      case 7:
        return '條例八';
      case 8:
        return '條例九';
      case 9:
        return '條例十';
    }
  }

  _deletProtocol = () => {

    if (this.issues[this.state.issuenumber].protocol.length == 1) {
      this.issues[this.state.issuenumber].protocol[0].text = null
    } else {
      this.issues[this.state.issuenumber].protocol.splice(this.state.protocolorder, 1)
    }

    this.setState({
      checkprotocol: false,
      protocolorder: 0,
    })
  }

  _toggleIcebergdetail = () => {
    buffer = this.state.icebergdetail
    this.setState({ icebergdetail: !buffer })
  }

  _switchDetailpage = (buffer) => {
    x = Math.round(buffer.nativeEvent.contentOffset.x / this.screenWidth)
    this.setState({ detailpage: x })
  }

  render() {
    const { issuenumber, protocolorder, speakamount, id } = this.state
    const { screenWidth, screenHeight } = this

    // if ((a = this.FireBase._getIssue()) != null) {
    //   if (this.issues[0].type == null) {
    //     this.issues[0] = a
    //   } else {
    //     this.issues.unshift(a)
    //   }
    //   this.FireBase._clearIssue()
    // }

    const issues = this.issues.map((buffer, index) => {
      if (buffer.type == null) {
        return (
          <View key={index} style={{ backgroundColor: 'white', width: screenWidth * 0.9, marginLeft: screenWidth * 0.05, height: '60%', borderRadius: '55%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }} >
              <View style={{ height: '70%', aspectRatio: 1, backgroundColor: '#F5F5F5', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: '80%', aspectRatio: 1, resizeMode: 'contain', }} source={require('../assets/icon/iceberg_icon.png')} />
              </View>
            </View>
            <View style={{ flex: 0.7, alignItems: 'flex-start' }} >
              <View style={{ marginBottom: 4, marginLeft: '2%' }} >
                <Text style={{ fontSize: 15, lineHeight: 25, color: '#9D9C9B', textAlign: 'center' }} >有什麼想法想跟對方分享的嗎?{'\n'}有什麼說不出口的話嗎?</Text>
              </View>
              <View style={{ alignSelf: 'center', marginLeft: '-10%' }} >
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#89C4C4', borderRadius: '10%', alignItems: 'center', justifyContent: 'center', paddingVertical: 4, paddingLeft: 5, paddingRight: 5 }} onPress={() => this._gotoIcebergScreen()} >
                  <Image style={{ alignSelf: 'center', width: 20, aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/icon/pencil.png')} />
                  <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }} >深入對話</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      } else {
        return (
          <Issue key={index} order={index} type={buffer.type} title={buffer.title} time={buffer.time} finish={buffer.finish} onPress={() => this._openIssue(index)} />
        )
      }
    })

    const speak = this.speak.map((buffer, index) => {
      if (buffer.type == 1) {
        return (
          <GetSpeak key={index} text={buffer.text} img={buffer.img} />
        )
      } else if (buffer.type == 0) {
        return (
          <MySpeak key={index} text={buffer.text} />
        )
      } else if (buffer.type == 2) {
        return (
          <Emoji key={index} order={buffer.order} />
        )
      }
    })

    const protocol = this.issues[issuenumber].protocol.map((buffer, index) => {
      if (buffer.text != null) {
        if (index == this.issues[issuenumber].protocol.length - 1) {
          var final = true
        } else {
          var final = false
        }
        return (
          <Protocol key={index} order={index} final={final} text={buffer.text} confirm={buffer.confirm} modify={buffer.modify || false} onPress={() => this._checkProtocol(index)} />
        )
      } else {
        return (
          <View key={index} style={{ marginLeft: 10 }}  >
            {id == 1 ?
              <Text style={{ fontSize: 20, color: 'white' }}>創立你們的第一個條例吧!</Text>
              :
              <Text style={{ fontSize: 20, color: 'white' }}>等待對方創立你們的第一個條例吧!</Text>
            }
          </View>

        )
      }
    });

    const finalprotocol = this.issues[issuenumber].protocol.map((buffer, index) => {
      if (buffer.text != null) {
        return (
          <FinalProtocol key={index} order={index} text={buffer.text} />
        )
      } else {
        return (null)
      }
    });

    const protocolamount = this._getOrder(this.issues[issuenumber].protocol.length);

    const block = this.issues[issuenumber].thought.map((buffer, index) => {
      if (buffer != null) {
        if (buffer.from == 0) {
          return (
            <View key={index} style={{ flexDirection: 'row', width: this.screenWidth * 0.8, minHeight: 80, borderRadius: '10%', backgroundColor: '#609DB8' }} activeOpacity={1} >
              <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../assets/images/f51.png')} />
              </View>
              <View style={{ flex: 0.8, justifyContent: 'center', paddingTop: 10, paddingRight: 10, paddingBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, lineHeight: 23 }}>{buffer.title}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View key={index} style={{ flexDirection: 'row', width: this.screenWidth * 0.8, minHeight: 80, borderRadius: '10%', backgroundColor: '#7EC9E0' }} activeOpacity={1} >
              <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../assets/images/f31.png')} />
              </View>
              <View style={{ flex: 0.8, justifyContent: 'center', paddingTop: 10, paddingRight: 10, paddingBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, lineHeight: 23 }}>{buffer.title}</Text>
              </View>
            </View>
          )
        }
      }
    })

    const recentprotocol = this.issues[issuenumber].protocol[protocolorder].recent[0].text == null ?
      null
      :
      this.issues[issuenumber].protocol[protocolorder].recent.map((buffer, index) => {
        if (buffer.text != null) {
          return (
            <View key={index} style={{ flexDirection: 'row', width: '70%', marginVertical: 10 }}>
              <Image style={{ width: 40, aspectRatio: 1 }} source={buffer.img} />
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }} >{buffer.text}</Text>
              </View>
            </View>
          )
        } else {
          return null
        }
      })

    return (
      <View style={styles.container} >
        {this.state.issuepage ?
          <View style={styles.container}>
            {this.state.thoughtpage ?
              <View style={styles.container} >
                {this.state.hintPage ?
                  <View style={[styles.container, { backgroundColor: '#4A7A99', alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={{ width: '80%', height: '70%', borderRadius: 15, backgroundColor: '#FFF', paddingVertical: 30, paddingHorizontal: 30 }} >
                      <TouchableOpacity style={{ position: 'absolute', marginLeft: 10, marginTop: 10 }} onPress={() => this._toggleHintpage()}>
                        <Icon name='clear' color='#447291' size={40} type='material' />
                      </TouchableOpacity>
                      <View style={{ flex: 0.1, alignSelf: 'center' }} >
                        <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', color: '#FAC75E' }}>溝通小提醒</Text>
                      </View>

                      <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>1</Text>
                        </View>
                        <View style={{ flex: 0.84 }} >
                          <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][1]}</Text>
                        </View>
                      </View>

                      <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>2</Text>
                        </View>
                        <View style={{ flex: 0.84 }} >
                          <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][2]}</Text>
                        </View>
                      </View>

                      <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>3</Text>
                        </View>
                        <View style={{ flex: 0.84 }} >
                          <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][3]}</Text>
                        </View>
                      </View>

                      <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>4</Text>
                        </View>
                        <View style={{ flex: 0.84 }} >
                          <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][4]}</Text>
                        </View>
                      </View>

                      <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>5</Text>
                        </View>
                        <View style={{ flex: 0.84 }} >
                          <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][5]}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  :
                  //回覆頁面
                  <View style={[styles.container, { backgroundColor: '#D0E4EC' }]}>

                    <Header size={this.backiconsize} type={this.issues[issuenumber].type} onPress={() => this._toggleThought()} hintPage={() => this._toggleHintpage()} rightimg={require('../assets/icon/tips.png')} />

                    <View style={{ flex: 0.92, alignItems: 'center' }}>

                      <View style={{ flex: 0.3, width: '100%', justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: '#D0E4EC' }}>
                        <Image style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain', bottom: -25 }} source={require('../assets/images/Iceberg_02.png')} />

                        <View style={{ backgroundColor: '#FAC75E', width: '65%', alignSelf: 'center', paddingVertical: 20, paddingHorizontal: 30, borderRadius: '50%', left: 40, bottom: -50, }} >
                          <Text style={{ color: 'white', fontSize: 16, lineHeight: 21 }} >試著讓孩子理解你的顧慮，但不要引導往自己期望的方向或直接給予解決辦法，這樣才能更增添他的想法跟創造力喔。</Text>
                        </View>
                        <Image style={{ height: '45%', resizeMode: 'contain', bottom: 5 }} source={require('../assets/images/pg_Right.png')} />

                        <View style={{ position: 'absolute', left: '22%', bottom: '40%', width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 0, borderRightWidth: 20, borderBottomWidth: 40, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FAC75E', transform: [{ rotate: '-120deg' }] }} />

                      </View>

                      <View style={{ flex: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4A7A99' }}>
                        {this.state.onFocus ?
                          <TouchableOpacity style={{ position: 'absolute', width: 500, height: 500, left: -100, top: -200 }} onPress={() => [Keyboard.dismiss(), this._onFocus()]} />
                          :
                          null
                        }

                        <View style={styles.thoughtinput}>
                          <TextInput style={{ height: '80%', fontSize: 14, lineHeight: 16, color: '#447291' }} multiline placeholder='請輸入...' onChangeText={(text) => this._inputText(text)} onFocus={() => this._onFocus()} />
                        </View>
                      </View>

                      <View style={{ flex: 0.2, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4A7A99' }}>
                        <TouchableOpacity style={{ width: 250, flex: 0.4, borderRadius: 25, backgroundColor: '#FAC75E', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.8} onPress={() => this._addThought()} >
                          <Text style={{ fontSize: 18, lineHeight: 21, color: '#F2F2F2' }}>回覆</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                }
              </View>
              :
              <View style={styles.container}>
                {this.state.protocolpage ?
                  //協議頁面
                  <View style={[styles.container, { backgroundColor: '#4A7A99' }]}>

                    <View style={[styles.header, { backgroundColor: '#4A7A99' }]} >

                      <View style={{ flex: 0.2, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1} onPress={() => this._toggleProtocol()} >
                          <Icon name='angle-left' size={this.backiconsize} color='#FFFFFF' type='font-awesome' />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 0.6, justifyContent: 'center' }}>
                        <View style={{ alignSelf: 'center' }}>
                          <Text style={[styles.leftheadertext, { alignItems: 'center', color: '#F2F2F2' }]}>關於{this.issues[issuenumber].type}事件</Text>
                        </View>
                      </View>
                      <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }} />
                    </View>


                    <View style={{ flex: 0.92, alignItems: 'center', justifyContent: 'center' }}>
                      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.8, marginTop: 10, paddingTop: 20, width: '80%' }}  >

                        {protocol}

                        {this.issues[issuenumber].protocol[0].text != null ?
                          <TouchableOpacity style={{ width: '60%', aspectRatio: 3.8, borderRadius: '30%', backgroundColor: '#C8E6FA', alignSelf: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 120 }} onPress={() => this._toggleProtocolFinal()} activeOpacity={0.8} >
                            <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291', alignSelf: 'center' }}>完成</Text>
                          </TouchableOpacity>
                          :
                          null
                        }

                      </ScrollView>

                      {id == 1 ?
                        <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', width: '14%', aspectRatio: 1, bottom: 15, right: 20 }} onPress={() => this._toggleProtocolAdd()} activeOpacity={0.8} >
                          <View style={{ position: 'absolute', backgroundColor: 'white', height: '50%', aspectRatio: 1 }} />
                          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/add.png')} />
                        </TouchableOpacity>
                        :
                        null
                      }
                    </View>

                    {this.state.protocoladd ?
                      //新增條例頁面
                      <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', backgroundColor: '#4A7A99' }} >

                        {this.state.onFocus ?
                          <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} activeOpacity={1} onPress={() => { Keyboard.dismiss(), this._onFocus() }} />
                          :
                          null
                        }

                        <View style={{ width: '80%', height: '60%', top: '5%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 30 }}>
                          <View style={{ flex: 0.2, marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.headbox, { width: 40, height: 40, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }]} >
                              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/circle.png')} />
                            </View>
                            <View style={{ alignSelf: 'center', marginLeft: 10 }}>
                              <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291' }}>{protocolamount}</Text>
                            </View>
                          </View>
                          <View style={{ flex: 0.8, justifyContent: 'space-between' }} >
                            <TextInput multiline style={{ flex: 0.7, alignSelf: 'center', width: '100%', fontSize: 16, lineHeight: 19, color: '#447291', backgroundColor: '#EDEDED', borderRadius: 10, paddingHorizontal: 10, paddingTop: 20, paddingBottom: 20 }} placeholder='請輸入...' value={this.state.inputtext} onChangeText={(text) => this._inputText(text)} ref={input => { this.InputProtocol = input }} onFocus={() => this._onFocus()} />

                            <View style={{ flex: 0.22, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                              <TouchableOpacity style={{ flex: 0.35, height: '100%', borderRadius: 20, backgroundColor: '#C5C5C5', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleProtocolAdd()} activeOpacity={0.8} >
                                <Text style={{ fontSize: 18, lineHeight: 21, color: '#F2F2F2' }}>取消</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={{ flex: 0.35, height: '100%', borderRadius: 20, backgroundColor: '#87C5C0', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._protocolAdd()} activeOpacity={0.8} >
                                <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291' }}>新增</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                      </View>
                      : null
                    }

                    {this.state.checkprotocol ?
                      //確認條例頁面
                      <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', backgroundColor: '#4A7A99' }} >

                        <View style={{ flex: 0.1, marginTop: '5%', flexDirection: 'row', backgroundColor: '#4A7A99' }} >
                          <View style={{ flex: 0.2, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1} onPress={() => this._checkProtocol(1)} >
                              <Icon name='angle-left' size={this.backiconsize} color='#FFFFFF' type='font-awesome' />
                            </TouchableOpacity>
                          </View>
                          <View style={{ flex: 0.6, justifyContent: 'center' }}>
                          </View>
                          <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                        {id == 1 ?
                          <View style={{ flex: 0.9, justifyContent: 'center' }} >
                            <View style={[{ width: '70%', backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 20 }, this.issues[issuenumber].protocol[protocolorder].recent[0].text == null && { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }]}>

                              <View style={{ width: '70%', marginVertical: 10, flexDirection: 'row' }}>

                                {HeadIcon(this.issues[issuenumber].protocol[protocolorder].confirm, this.issues[issuenumber].protocol[protocolorder].modify)}

                                <View style={{ alignSelf: 'center' }}>
                                  <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291' }}>{this._getOrder(protocolorder)}</Text>
                                </View>
                              </View>

                              <View style={{ width: '70%', marginTop: 10 }}>
                                <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }} >{this.issues[issuenumber].protocol[protocolorder].text}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', width: '70%', marginVertical: 30, justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.4, alignItems: 'flex-end' }} >
                                  <TouchableOpacity style={{ width: '100%', aspectRatio: 2, borderRadius: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C5C5C5' }} onPress={() => this._toggleReProtocol()} activeOpacity={0.8} >
                                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>修改</Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={{ flex: 0.4, alignItems: 'flex-end' }} >
                                  <TouchableOpacity style={{ width: '100%', aspectRatio: 2, borderRadius: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8E6FA' }} activeOpacity={0.8} onPress={() => this._deletProtocol()} >
                                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>刪除</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>

                            </View>
                            {this.issues[issuenumber].protocol[protocolorder].recent[0].text == null ?
                              null
                              :
                              <View style={{ width: '70%', paddingBottom: 10, minHeight: 80, alignSelf: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#C8E6FA', alignItems: 'center', justifyContent: 'center' }} >
                                {recentprotocol}
                              </View>
                            }
                          </View>
                          :
                          <View style={{ flex: 0.9, justifyContent: 'center' }} >
                            <View style={[{ width: '70%', backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 20 }, this.issues[issuenumber].protocol[protocolorder].recent[0].text == null && { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }]}>
                              <View style={{ width: '70%', marginVertical: 10, flexDirection: 'row' }}>

                                {HeadIcon(this.issues[issuenumber].protocol[protocolorder].confirm, this.issues[issuenumber].protocol[protocolorder].modify)}

                                <View style={{ alignSelf: 'center' }}>
                                  <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291' }}>{protocolamount}</Text>
                                </View>
                              </View>

                              <View style={{ width: '70%', marginTop: 10 }}>
                                <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }} >{this.issues[issuenumber].protocol[protocolorder].text}</Text>
                              </View>

                              <View style={{ flexDirection: 'row', width: '70%', marginVertical: 30, justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.2, alignItems: 'flex-end' }} >
                                  <TouchableOpacity style={{ width: '100%', aspectRatio: 1, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleReProtocol()} activeOpacity={0.8} >
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/x_protocal.png')} />
                                  </TouchableOpacity>
                                </View>

                                <View style={{ flex: 0.2, alignItems: 'flex-start' }}>
                                  <TouchableOpacity style={{ width: '100%', aspectRatio: 1, borderRadius: '50%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._confirmProtocol()} activeOpacity={0.8} >
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/check1.png')} />
                                  </TouchableOpacity>
                                </View>
                              </View>

                            </View>
                            {this.issues[issuenumber].protocol[protocolorder].recent[0].text == null ?
                              null
                              :
                              <View style={{ width: '70%', paddingBottom: 10, minHeight: 80, alignSelf: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#C8E6FA', alignItems: 'center', justifyContent: 'center' }} >
                                {recentprotocol}
                              </View>
                            }
                          </View>
                        }
                      </View>
                      :
                      null
                    }

                    {this.state.reprotocol ?
                      //重提條例頁面
                      <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', backgroundColor: '#4A7A99' }} >
                        <View style={{ flex: 0.1 }} />

                        <View style={{ flex: 0.9, justifyContent: 'center' }} >

                          <View style={{ position: 'absolute', justifyContent: 'flex-end', width: '100%', height: '22%', top: '-1%' }} >

                            <View style={{ backgroundColor: '#FAC75E', right: 30, top: 40, paddingVertical: 15, paddingHorizontal: 25, width: '60%', borderRadius: '60%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} >
                              {id == 1 ?
                                <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }} >試著理解父母的顧慮，盡量想出能符合兩方需求的辦法。</Text>
                                :
                                <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }} >試著讓孩子理解你的顧慮，但不要引導往自己期望的方向或直接給予解決辦法，這樣才能更增添他的想發跟創造力喔。</Text>
                              }
                            </View>

                            <Image style={{ resizeMode: 'contain', right: '9%', height: '50%', alignSelf: 'flex-end', transform: [{ rotate: '-15deg' }] }} source={require('../assets/images/pg_Left.png')} />

                            <View style={{ position: 'absolute', right: '30%', bottom: '20%', width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 0, borderRightWidth: 20, borderBottomWidth: 40, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FAC75E', zIndex: -1, transform: [{ rotate: '130deg' }] }} />

                          </View>

                          <View style={{ width: '70%', minHeight: '50%', backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 20 }}>
                            <View style={{ width: '70%', marginVertical: 10, flexDirection: 'row' }}>
                              {HeadIcon(this.issues[issuenumber].protocol[protocolorder].confirm, this.issues[issuenumber].protocol[protocolorder].modify)}
                              <View style={{ alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18, lineHeight: 21, color: '#447291' }}>{protocolamount}</Text>
                              </View>
                            </View>

                            <View style={{ width: '70%', marginVertical: 10 }}>
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }} >{this.issues[issuenumber].protocol[protocolorder].text}</Text>
                            </View>

                            <View style={{ width: '70%', marginVertical: 10 }}>
                              <TextInput multiline style={{ backgroundColor: '#EDEDED', minHeight: 150, borderRadius: 10, padding: 10, color: '#447291', fontSize: 16, lineHeight: 19 }} placeholder='例如：但是這樣我會擔心你晚上在外的安危.......' onFocus={() => this._onFocus()} value={this.state.inputtext} onChangeText={(text) => this._inputText(text)} />
                            </View>

                            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'space-between', marginVertical: 10 }}>
                              <View style={{ flex: 0.4, alignItems: 'flex-end' }} >
                                <TouchableOpacity style={{ width: '100%', aspectRatio: 2, borderRadius: '15%', backgroundColor: '#C5C5C5', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleReProtocol()} activeOpacity={0.8} >
                                  <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>取消</Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{ flex: 0.4, alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ width: '100%', aspectRatio: 2, borderRadius: '15%', backgroundColor: '#C8E6FA', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._newProtocol()} activeOpacity={0.8} >
                                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>送出</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                          </View>

                          {this.state.onFocus ?
                            <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} activeOpacity={1} onPress={() => { Keyboard.dismiss(), this._onFocus() }} />
                            :
                            null
                          }
                        </View>

                      </View>
                      :
                      null
                    }

                    {this.state.finalprotocol ?
                      //最終合約頁面
                      <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#4A7A99', alignItems: 'center' }}>
                        <View style={{ flex: 0.1 }} />
                        <View style={{ flex: 0.55, width: '80%', backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 20 }}>
                          <View style={{ alignSelf: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, lineHeight: 23, fontWeight: 'bold', color: '#4A5C6D' }}>關於 {this.issues[issuenumber].type} 條約</Text>
                          </View>
                          <ScrollView showsVerticalScrollIndicator={false}>
                            {finalprotocol}
                          </ScrollView>
                          <TouchableOpacity style={{ position: 'absolute', marginLeft: 10, marginTop: 10 }} onPress={() => this._toggleProtocolFinal()}>
                            <Icon name='clear' size={30} type='material' />
                          </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.35, width: '80%' }}>
                          <View style={{ width: '100%', height: '80%', borderRadius: 15, backgroundColor: '#C8E6FA', paddingHorizontal: 20, paddingVertical: 10 }}>
                            <View style={{ flex: 0.1 }}>
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#4A5C6D' }}>立約人簽章</Text>
                            </View>

                            <View style={{ flex: 0.6, flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                              <View style={{ borderRadius: '50%', borderWidth: 3, borderColor: '#4A5C6D' }}>
                                <Image style={{ width: 40, height: 40, borderRadius: 20, }} source={require('../assets/images/f11.png')} />
                              </View>
                              <View style={{ width: 60, height: 60 }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/handshake.png')} />
                              </View>
                              <View style={{ borderRadius: '50%', borderWidth: 3, borderColor: '#4A5C6D' }}>
                                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../assets/images/f12.png')} />
                              </View>
                            </View>

                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                              <TouchableOpacity style={{ width: '50%', height: '80%', backgroundColor: '#4A5C6D', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => this._finishProtocol()}>
                                <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>握手</Text>
                              </TouchableOpacity>
                            </View>

                          </View>
                        </View>

                        {this.state.showvideo ?
                          <Video style={{ position: 'absolute', width: screenWidth, height: screenHeight, alignSelf: 'center' }} onPlaybackStatusUpdate={x => this.setState({ finish: x.didJustFinish })} resizeMode='contain' shouldPlay={true} source={this.collects[this.random].video} />
                          :
                          null
                        }

                        {this.state.finish ? this._videoFinish() : null}

                      </View>
                      :
                      null}

                  </View>
                  :
                  <View style={styles.container}>

                    {this.state.hintPage ?
                      //提示頁面
                      <View style={[styles.container, { backgroundColor: '#4A7A99', alignItems: 'center', justifyContent: 'center' }]}>
                        <View style={{ width: '80%', height: '70%', borderRadius: 15, backgroundColor: '#FFF', paddingVertical: 30, paddingHorizontal: 30 }} >
                          <TouchableOpacity style={{ position: 'absolute', marginLeft: 10, marginTop: 10 }} onPress={() => this._toggleHintpage()}>
                            <Icon name='clear' color='#447291' size={40} type='material' />
                          </TouchableOpacity>
                          <View style={{ flex: 0.1, alignSelf: 'center' }} >
                            <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', color: '#FAC75E' }}>溝通小提醒</Text>
                          </View>

                          <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>1</Text>
                            </View>
                            <View style={{ flex: 0.84 }} >
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][1]}</Text>
                            </View>
                          </View>

                          <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>2</Text>
                            </View>
                            <View style={{ flex: 0.84 }} >
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][2]}</Text>
                            </View>
                          </View>

                          <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>3</Text>
                            </View>
                            <View style={{ flex: 0.84 }} >
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][3]}</Text>
                            </View>
                          </View>

                          <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>4</Text>
                            </View>
                            <View style={{ flex: 0.84 }} >
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][4]}</Text>
                            </View>
                          </View>

                          <View style={{ flex: 0.18, borderTopWidth: 1, borderColor: '#C8E6FA', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <View style={{ flex: 0.14, width: '100%', marginRight: 10, aspectRatio: 1, borderRadius: 10, backgroundColor: '#5CA4DA', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>5</Text>
                            </View>
                            <View style={{ flex: 0.84 }} >
                              <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>{this.hints[this.hintorder][5]}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      :
                      <View style={styles.container} >
                        {this.state.icebergdetail ?
                          //冰山細節
                          <View style={[styles.container, { backgroundColor: '#447291', alignContent: 'center', justifyContent: 'center' }]}>

                            <ScrollView style={{ width: this.screenWidth, height: this.screenHeight }} showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center' }} horizontal={true} bounces={false} pagingEnabled={true} onScroll={(event) => this._switchDetailpage(event)} scrollEventThrottle={16} >

                              <View style={{ width: this.screenWidth, height: this.screenHeight, justifyContent: 'center' }}>

                                <ScrollView style={{ width: '70%', marginLeft: '15%' }} bounces={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
                                  <View style={{ height: '30%' }} />
                                  <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={require('../assets/images/f21.png')} />
                                  <View style={{ padding: 10, marginBottom: 30 }} >
                                    <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>我</Text>
                                  </View>
                                  <View style={{ padding: 5 }}>
                                    <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>{this.issues[issuenumber].title}。這件事讓我覺得 :</Text>
                                  </View>
                                  <View style={{ width: '100%', padding: 10, backgroundColor: '#7EC9E0', borderRadius: 20, alignContent: 'center', marginBottom: 20 }}>
                                    {this.issues[issuenumber].emoji.map((buffer, index) => Emojiblock(buffer, index))}
                                  </View>

                                  <View style={{ alignSelf: 'flex-start', width: '100%' }} >
                                    <View style={{ padding: 10 }}>
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >媽媽對我的期待 :</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].input1}</Text>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >我期待我可以 :</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].input2}</Text>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >我希望媽媽能 :</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                      <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].input3}</Text>
                                    </View>
                                  </View>

                                </ScrollView>

                              </View>

                              <View style={{ width: this.screenWidth, height: this.screenHeight, justifyContent: 'center' }}>

                                {this.issues[issuenumber].from == null ?
                                  <View style={{ width: '70%', marginLeft: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, color: 'white' }} >對方還沒回覆喔!</Text>
                                  </View>
                                  :
                                  <ScrollView style={{ width: '70%', marginLeft: '15%' }} bounces={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
                                    <View style={{ height: '30%' }} />
                                    <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={this.issues[issuenumber].from.head} />
                                    <View style={{ padding: 10, marginBottom: 30 }} >
                                      <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>{this.family.name}</Text>
                                    </View>
                                    <View style={{ padding: 5 }}>
                                      <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>{this.issues[issuenumber].title}。這件事讓我覺得 :</Text>
                                    </View>
                                    <View style={{ width: '100%', padding: 10, backgroundColor: '#7EC9E0', borderRadius: 20, alignContent: 'center', marginBottom: 20 }}>
                                      {this.issues[issuenumber].emoji.map((buffer, index) => Emojiblock(buffer, index))}
                                    </View>

                                    <View style={{ alignSelf: 'flex-start', width: '100%' }} >
                                      <View style={{ padding: 10 }}>
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >小孩對我的期待 :</Text>
                                      </View>
                                      <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].from.input1}</Text>
                                      </View>

                                      <View style={{ padding: 10 }}>
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >我期待我可以 :</Text>
                                      </View>
                                      <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].from.input2}</Text>
                                      </View>

                                      <View style={{ padding: 10 }}>
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >我希望小孩能 :</Text>
                                      </View>
                                      <View style={{ backgroundColor: '#7EC9E0', width: '100%', padding: 10, borderRadius: 10 }} >
                                        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{this.issues[issuenumber].from.input3}</Text>
                                      </View>
                                    </View>

                                  </ScrollView>
                                }

                              </View>

                            </ScrollView>

                            <View style={{ position: 'absolute', flexDirection: 'row', bottom: '5%', width: 50, left: this.screenWidth / 2 - 25, justifyContent: 'space-between' }}>
                              <View style={[{ width: 15, height: 15, borderRadius: 8, borderWidth: 1, borderColor: 'white' }, this.state.detailpage == 0 && { backgroundColor: 'white' }]} />

                              <View style={[{ width: 15, height: 15, borderRadius: 8, borderWidth: 1, borderColor: 'white' }, this.state.detailpage == 1 && { backgroundColor: 'white' }]} />
                            </View>

                            <View style={{ position: 'absolute', width: 40, height: 40, left: 10, top: 30 }}>
                              <TouchableOpacity onPress={() => this._toggleIcebergdetail()} >
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/X.png')} />
                              </TouchableOpacity>
                            </View>

                          </View>
                          :
                          //雙方想法頁面
                          <View style={[styles.container, { backgroundColor: '#D0E4EC' }]}>

                            <Header size={this.backiconsize} type={this.issues[issuenumber].type} onPress={() => this._issueGoBack()} hintPage={() => this._toggleProtocol()} rightimg={require('../assets/icon/deal.png')} show={true} />

                            <View style={{ flex: 0.92, backgroundColor: '#4A7A99' }} >

                              <View style={{ flex: 0.3, width: '100%', justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: '#D0E4EC' }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', bottom: -25 }} source={require('../assets/images/Iceberg_02.png')} />
                                <View style={{ position: 'absolute', height: '80%', justifyContent: 'flex-end', left: 20, bottom: 20 }} >
                                  <View style={{ aspectRatio: 1.2, height: '30%', borderRadius: '50%', backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleHintpage()} >
                                      <Image style={{ resizeMode: 'contain', height: '80%' }} source={require('../assets/icon/tips.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.triangle_w} />
                                  </View>
                                  <Image style={{ resizeMode: 'contain', right: '9%', height: '50%', transform: [{ rotate: '0deg' }] }} source={require('../assets/images/pg_Left.png')} />
                                </View>
                              </View>

                              <View style={{ flex: 0.58, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4A7A99' }}>
                                <ScrollView style={{ width: '80%', marginTop: 20, alignSelf: 'center' }} contentContainerStyle={{ alignSelf: 'center' }} showsVerticalScrollIndicator={false}>
                                  {block}
                                </ScrollView>
                                <View style={{ position: 'absolute', alignSelf: 'flex-end', top: -14, right: 15, padding: 6 }}>
                                  <TouchableOpacity style={{ width: 60, height: 20, backgroundColor: 'white', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleIcebergdetail()} >
                                    <Text style={{ fontSize: 12, lineHeight: 14, color: '#447291' }}>查看冰山</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={{ position: 'absolute', width: '100%', height: '6%', top: 0, backgroundColor: '#6593AE', zIndex: -1 }} />
                              </View>

                              <View style={{ flex: 0.12, backgroundColor: '#4A7A99', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <View style={{ height: '100%', marginRight: 30, flexDirection: 'row' }} >
                                  <TouchableOpacity style={{ height: '65%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleThought()} activeOpacity={0.5} >
                                    <View style={{ position: 'absolute', height: '50%', aspectRatio: 1, backgroundColor: 'white' }} />
                                    <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/add.png')} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        }
                      </View>
                    }
                  </View>
                }
              </View>
            }
          </View>
          :
          //對話頁面
          <View style={[styles.container, { backgroundColor: '#F4EDE9' }]}>
            <View style={[styles.container, { backgroundColor: 'rgba(123, 121, 121, 0.05)' }]}>
              <View style={styles.container} >
                <KeyboardAvoidingView behavior='position' >

                  <Animated.View style={{ top: this.state.mainheight }} >

                    <View style={{ width: this.screenWidth, height: screenHeight }}>
                      <View style={[styles.header, { justifyContent: 'center' }]} >

                        <View style={{ flex: 0.2, justifyContent: 'center' }} >
                          <TouchableOpacity style={{ width: 30, marginLeft: 15 }} activeOpacity={1} onPress={() => this._gotoHomeScreem()} >
                            <Icon name='angle-left' size={this.backiconsize} color='#6E6E6E' type='font-awesome' />
                          </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.6, justifyContent: 'center' }}>
                          <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.leftheadertext}>{this.family.name}</Text>
                          </View>
                        </View>

                        <View style={{ flex: 0.2 }} >
                        </View>

                      </View>


                      <View style={[styles.chatcontainer, { backgroundColor: '#F4EDE9' }]} >
                        <View style={{ flex: 0.45 }} >
                          <View style={{ flex: 0.2, width: '90%', alignSelf: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }} >
                              <View style={{ height: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: '80%', aspectRatio: 1, resizeMode: 'contain', }} source={require('../assets/icon/iceberg_icon.png')} />
                              </View>
                              <View>
                                <Text style={{ fontWeight: 'bold', lineHeight: 21, fontSize: 18, color: '#818181' }}>冰山溝通</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 0.8 }}>
                            <ScrollView style={styles.chatissue} horizontal={true} bounces={false} showsHorizontalScrollIndicator={false} ref={scroll => this.issuesScroll = scroll} >
                              {this.issues[0].type == null ?
                                null
                                :
                                <TouchableOpacity style={styles.plusissuecard} onPress={() => this._gotoIcebergScreen()} activeOpacity={0.6} >
                                  <Icon name='plus-circle' type='font-awesome' size={60} color='#CCCCCC' />
                                </TouchableOpacity>
                              }
                              {issues}
                            </ScrollView>
                          </View>
                        </View>

                        <View style={styles.chatcontent}>

                          {this.speak[speakamount].type == 0 ?
                            <View style={styles.chattop}>
                              <View style={{ alignSelf: 'center', justifyContent: 'flex-end', right: '-5%' }}>
                                <View style={styles.triangle} />
                                <View style={[styles.chatbubble, { backgroundColor: '#9BD0D0' }]}>
                                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#FFFFFF' }}>{this.speak[speakamount].text}</Text>
                                </View>
                              </View>
                            </View>
                            :
                            null
                          }

                          {this.speak[speakamount].type == 1 ?
                            <View style={styles.chattop}>
                              <View style={{ alignSelf: 'center', justifyContent: 'flex-end', left: '-5%' }}>
                                <View style={styles.triangleL} />
                                <View style={[styles.chatbubble, { backgroundColor: '#9BD0D0' }]}>
                                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#FFFFFF' }}>{this.speak[speakamount].text}</Text>
                                </View>
                              </View>
                            </View>
                            :
                            null
                          }

                          {this.speak[speakamount].type == 2 ?
                            <View style={styles.chattop}>
                              <View style={{ alignSelf: 'center', justifyContent: 'flex-end', right: '-5%' }}>
                                <View style={styles.triangle} />
                                <View style={[styles.chatbubble, { backgroundColor: '#9BD0D0' }]}>
                                  <Emoji order={this.speak[speakamount].order} />
                                </View>
                              </View>
                            </View>
                            :
                            null
                          }

                          <View style={styles.chatimage}>
                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                              <View style={{ height: '60%' }}>
                                {this.speak[speakamount].type == 1 ?
                                  <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={this.family.monstergif} />
                                  :
                                  <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={this.family.monsterpng} />
                                }
                              </View>
                              <Text style={{ fontSize: 15, lineHeight: 18, color: '#6E6E6E', marginTop: 10 }}>{this.family.name}</Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                              <View style={{ height: '60%', alignItems: 'center' }}>
                                {this.speak[speakamount].type == 0 || this.speak[speakamount].type == 2 ?
                                  <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={this.monstergif} />
                                  :
                                  <Image style={{ height: '100%', aspectRatio: 1, resizeMode: 'contain' }} source={this.monsterpng} />
                                }
                              </View>
                              <Text style={{ fontSize: 15, lineHeight: 18, color: '#6E6E6E', alignSelf: 'center', marginTop: 10 }}>我</Text>
                            </View>
                          </View>

                          <View style={{ position: 'absolute', width: '100%', height: '50%', bottom: '-10%', backgroundColor: '#E4DBD5', zIndex: -1 }} />
                        </View>
                      </View>

                    </View>
                  </Animated.View>
                </KeyboardAvoidingView>
              </View>

              {
                this.state.onFocus ?
                  <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={Keyboard.dismiss} />
                  :
                  null
              }

              {this.state.openemoji ?
                <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={() => this._toggleEmoji()} />
                :
                null
              }

              <Animated.View style={[styles.chatcard, { bottom: this.state.chatheight }]}>
                <ScrollView style={{ paddingHorizontal: 10 }} ref={scroll => { this.scrollView = scroll }} onContentSizeChange={() => this.scrollView.scrollToEnd()} >
                  <View style={{ justifyContent: 'flex-start' }}>
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }} >
                      <Text style={{ fontSize: 14, lineHeight: 16, color: '#8F8F8F' }} >下午14:00</Text>
                    </View>
                    {speak}
                  </View>
                </ScrollView>

                <Animated.View style={{ width: '100%', height: this.box }} />
                <View style={{ position: 'absolute', top: 10, right: 45 }}>
                  {/* {this.state.openbottom ? */}
                  <Icon name='angle-down' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._taggleChat()} underlayColor='#FAC75E' />
                  {/* :
                      <Icon name='angle-up' size={40} color='#6E6E6E' type='font-awesome' onPress={() => this._taggleChat()} underlayColor='#FAC75E' />
                    } */}
                </View>
              </Animated.View>

              <Animated.View style={[styles.bottomcard, { bottom: this.state.changeheight }]} >
                <View style={styles.bottomcardtop}>
                  <View style={{ width: '70%', backgroundColor: 'white', flexDirection: 'row', height: 35, borderRadius: 15, alignItems: 'center' }}>
                    <TextInput style={styles.bottomcardinput} placeholder='請輸入...' onChangeText={(text) => this._inputText(text)} onFocus={() => { this._taggleText(), this.setState({ openbottom: true }) }} onBlur={() => { this._taggleText(), this.setState({ openbottom: this.state.openchat ? true : false }) }} ref={input => { this.textInput = input }} />
                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 5, borderRadius: '50%' }} onPress={() => this._toggleEmoji()} >
                      <Image style={{ width: '100%', height: '100%' }} source={require('../assets/icon/face.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginLeft: 10, width: 40, marginTop: -5 }}>
                    {(this.state.openbottom || this.state.inputtext != null) ?
                      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }} onPress={() => this._sentText()} activeOpacity={0.8} >
                        <Image style={{ width: 30, height: 30 }} source={require('../assets/icon/sent.png')} />
                        {/* <Icon name='angle-right' size={40} color='#6E6E6E' type='font-awesome' underlayColor='#FAC75E' /> */}
                      </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={() => this._taggleChat()} activeOpacity={0.8} >
                        <Icon name='angle-up' size={40} color='#6E6E6E' type='font-awesome' underlayColor='#FAC75E' />
                      </TouchableOpacity>
                    }
                  </View>
                </View>

                <View style={[styles.bottomcardemoji, {}]} >
                  <View style={styles.emojilist}>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(1)} activeOpacity={0.6} >
                        <What width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(2)} activeOpacity={0.6} >
                        <Angry width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(3)} activeOpacity={0.6} >
                        <NotGood width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(4)} activeOpacity={0.6} >
                        <Sad width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.emojilist}>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(5)} activeOpacity={0.6} >
                        <Confused width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(6)} activeOpacity={0.6} >
                        <Shocked width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(7)} activeOpacity={0.6} >
                        <Happy width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emojibox}>
                      <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30 }} onPress={() => this._sentEmoji(8)} activeOpacity={0.6} >
                        <Good width='100%' height='100%' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Animated.View>

              {/* <View style={{ position: 'absolute', width: '100%', height: '25%', bottom: 0, backgroundColor: '#E4DBD5', zIndex: -1 }} /> */}

            </View>
          </View>

        }
      </View >
    );
  }

  hints = [{
    1: '避免使用為什麼，改為關心',
    2: '引導孩子自行想出解決辦法，多問問還能怎麼辦呢',
    3: '以我為出發點敘述，少用你指責',
    4: '和孩子的人生劃清界線，不要寄託施壓在孩子身上',
    5: '對於他們的傾訴多給予鼓勵，並讓他們知道不要怕，我會一直陪著你。',
  }, {
    1: '嘗試跟家人說你的感受與想法 在乎自己、情境、對方三要素',
    2: '試著尋找能同時滿足雙方期待解決辦法',
    3: '以我為出發點敘述，少用你指責',
    4: '語氣不要太過強烈，明確表達自己需求',
    5: '不使用攻擊或武裝的方式，盡可能保持心態開放，「互相」表達和討論。'
  }, {
    1: '嘗試跟家人說你的感受與想法 在乎自己、情境、對方三要素',
    2: '試著尋找能同時滿足雙方期待解決辦法',
    3: '以我為出發點敘述，少用你指責',
    4: '語氣不要太過強烈，明確表達自己需求',
    5: '適時的向他們表達感謝，不要視一切為理所當然',
  }]
}

function Emojiblock(buffer, index) {
  return (
    <View key={index} style={{}}>
      <View style={{ width: '100%', flexDirection: 'row', marginBottom: 10 }}>
        <Slider containerStyle={{ width: '70%', height: 50, justifyContent: 'center' }} trackStyle={{ height: 15, borderRadius: '50%', backgroundColor: '#C4C4C4' }} minimumTrackTintColor={buffer.color} thumbStyle={{ width: 50, height: 50, backgroundColor: null, alignItems: 'center', justifyContent: 'center' }} thumbImage={buffer.image} minimumValue={0} disabled={true} maximumValue={5} step={1} value={buffer.value} />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
          <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{buffer.text}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 5 }}  >
        <Text style={{ color: 'white', lineHeight: 19, fontSize: 16 }} >{buffer.textinput}</Text>
      </View>
    </View>
  )
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
            <Text style={[styles.leftheadertext, { alignItems: 'center' }]}>關於{this.props.type}事件</Text>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={this.props.hintPage} activeOpacity={0.5}>
            {this.props.show ?
              <View style={{ position: 'absolute', height: '50%', aspectRatio: 1, backgroundColor: 'white' }} />
              :
              null
            }
            <Image style={{ width: '100%', height: '100%', }} source={this.props.rightimg} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class Issue extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.issuecard, this.props.order % 2 && { backgroundColor: '#FFD173' }]} activeOpacity={1} onPress={this.props.onPress}>

        <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }} >
          <View style={{ flex: 0.3, width: '80%' }} >
            <Text style={[{ fontSize: 16, lineHeight: 19, fontWeight: 'bold', color: '#91B0C4' }, this.props.order % 2 && { color: '#fff' }]}>{this.props.type}</Text>
            {this.props.finish ?
              <View style={{ position: 'absolute', width: 40, height: 40, right: -10, top: -15 }} >
                <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../assets/icon/star_y.png')} />
              </View>
              :
              null
            }
          </View>
          <View style={{ flex: 0.5, width: '80%' }} >
            <Text style={{ fontSize: 16, lineHeight: 19, color: '#818181' }} >{this.props.title}</Text>
          </View>
          <View style={{ flex: 0.2, width: '80%', alignItems: 'flex-end', justifyContent: 'flex-end' }} >
            <Text style={{ fontSize: 14, lineHeight: 16, color: '#818181' }}> {this.props.time}</Text>
          </View>
        </View>

      </TouchableOpacity>
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
      <View style={[styles.chattext, { justifyContent: 'flex-start', flexDirection: 'row', alignSelf: 'flex-start' }]}>
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

class Protocol extends React.Component {

  render() {
    const { confirm, modify, final } = this.props;

    var order;

    switch (this.props.order) {
      case 0:
        order = '條例一';
        break;
      case 1:
        order = '條例二';
        break;
      case 2:
        order = '條例三';
        break;
      case 3:
        order = '條例四';
        break;
      case 4:
        order = '條例五';
        break;
      case 5:
        order = '條例六';
        break;
      case 6:
        order = '條例七';
        break;
      case 7:
        order = '條例八';
        break;
      case 8:
        order = '條例九';
        break;
      case 9:
        order = '條例十';
        break;
    }

    return (
      <View style={{ marginBottom: 30 }}>

        {final ?
          null
          :
          <View style={{ marginLeft: 18, marginTop: 27, position: 'absolute', width: 4, height: '110%', backgroundColor: '#C4C4C4' }} />
        }

        <View style={{ flexDirection: 'row', alignItems: 'center' }} >

          {HeadIcon(confirm, modify)}

          <Text style={{ fontSize: 18, lineHeight: 20, color: 'white' }} >{order}</Text>

        </View>

        <TouchableOpacity style={{ minHeight: 70, marginLeft: 45, marginTop: 10, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10 }} activeOpacity={1} onPress={this.props.onPress} >
          <Text style={{ fontSize: 16, lineHeight: 18, color: '#447291' }}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function HeadIcon(confirm, modify) {
  if (modify) {
    if (confirm) {
      return (
        <View style={[styles.headbox, { width: 40, height: 40 }]}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/modify.png')} />
        </View>
      )
    } else {
      return (
        <View style={[styles.headbox, { width: 40, height: 40, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }]}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/cancel.png')} />
        </View>
      )
    }
  } else {
    if (confirm) {
      return (
        <View style={[styles.headbox, { width: 40, height: 40 }]}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/check.png')} />
        </View>
      )
    } else {
      return (
        <View style={[styles.headbox, { width: 40, height: 40, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }]}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/circle.png')} />
        </View>
      )
    }
  }
}

class FinalProtocol extends React.Component {

  render() {

    var order;
    switch (this.props.order + 1) {
      case 1:
        order = '條例一';
        break;
      case 2:
        order = '條例二';
        break;
      case 3:
        order = '條例三';
        break;
      case 4:
        order = '條例四';
        break;
      case 5:
        order = '條例五';
        break;
      case 6:
        order = '條例六';
        break;
      case 7:
        order = '條例七';
        break;
      case 8:
        order = '條例八';
        break;
      case 9:
        order = '條例九';
        break;
      case 10:
        order = '條例十';
        break;
    }

    return (
      <View style={{ marginBottom: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <View style={[styles.headbox, { justifyContent: 'center' }]}>
            <Icon name='check-circle' color='#C8E6FA' size={40} />
            <View style={{ position: 'absolute', alignSelf: 'center', width: 30, height: 30, borderRadius: '50%', zIndex: -1, backgroundColor: 'white' }} />
          </View>
          <View style={{ marginLeft: -15, width: '100%', height: 1, backgroundColor: '#C8E6FA' }} />
        </View>
        <View style={{ marginLeft: 40, marginTop: -10, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 16, lineHeight: 19, color: '#4A5C6D' }} >{order}</Text>
          <Text style={{ fontSize: 16, lineHeight: 19, color: '#4A5C6D' }} >{this.props.text}</Text>
        </View>

      </View >
    )
  }
}

class Emoji extends React.Component {
  _show = () => {
    var emoji
    switch (this.props.order) {
      case 1:
        emoji = <What width={50} height={50} />
        break;
      case 2:
        emoji = <Angry width={50} height={50} />
        break;
      case 3:
        emoji = <NotGood width={50} height={50} />
        break;
      case 4:
        emoji = <Sad width={50} height={50} />
        break;
      case 5:
        emoji = <Confused width={50} height={50} />
        break;
      case 6:
        emoji = <Shocked width={50} height={50} />
        break;
      case 7:
        emoji = <Happy width={50} height={50} />
        break;
      case 8:
        emoji = <Good width={50} height={50} />
        break;
      default:
        break;
    }
    return emoji
  }

  render() {
    return (
      <View style={{ alignSelf: 'flex-end', justifyContent: 'center', marginVertical: 5, marginRight: 5 }} >
        {this._show()}
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
  triangle_w: {
    position: 'absolute',
    bottom: -15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    zIndex: -1,
    transform: [
      { rotate: '-160deg' }
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
    backgroundColor: '#FFD173',
    borderRadius: 30,
  },
  bottomcardtop: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomcardinput: {
    width: '80%',
    height: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 10,
    marginRight: 20,
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
    backgroundColor: '#FFD173',
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
        shadowOpacity: 0.2,
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
