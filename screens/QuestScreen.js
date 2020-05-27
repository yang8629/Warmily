import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ScrollView, Keyboard, TextInput, Dimensions, Slider } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager'
import { StackActions } from '@react-navigation/native';

export default class QuestScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  FireBase = FireBaseManager.getInstance();
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  topbarWidth = this.screenWidth * 0.4;
  first = this.FireBase._getFirsttime();

  constructor(props) {
    super(props)
    this.state = {
      buffer: true,
      identity: this.FireBase._getID(),
      onselect: null,
      refresh: false,
    };
  }

  nowpage = 0;
  closecolor = '#447291';

  _gotoChatScreen = () => {
    this.props.navigation.navigate('chat')
  }

  _onSelect = (select) => {
    this.setState({
      onselect: select,
    })
  }

  _firstQuest = () => {
    if (this.state.onselect != null) {
      this.first = this.FireBase._setFirsttime(false);
      // this.props.navigation.dispatch(
      //   StackActions.pop(1)
      // )
      this.props.navigation.navigate('iceberg')
    } else {
      alert('記得選反應喔!')
    }
  }

  _scrollEnd = (event) => {
    var page = event.nativeEvent.contentOffset.x / this.screenWidth;
    this.nowpage = page;
    this.setState({
      refresh: !this.state.refresh,
    })
  }

  render() {
    const { screenWidth, screenHeight } = this;

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: '#F2F2F2' }]} >

          <Image style={{ position: 'absolute', width: screenWidth, height: screenHeight, resizeMode: 'contain' }} source={require('../assets/images/Iceberg_01.png')} />

          <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} bounces={false} decelerationRate='fast' onMomentumScrollEnd={(event) => this._scrollEnd(event)} >

            <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 0.2, width: '50%', marginTop: '-10%' }}>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>每個人都是一座冰山，水平面下才是人真正的內在，透過冰山的探索，讓人與人擁有更好的溝通</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-end', marginTop: '20%' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>---- {'<薩提爾>'}</Text>
                </View>
              </View>
            </View>


            <View style={{ width: screenWidth, height: screenHeight }}>
              <View style={{ position: 'absolute', width: screenWidth, height: screenHeight, backgroundColor: '#5587A8', opacity: 0.3 }} />

              <View style={{ flex: 1 }}>

                {this.state.identity == 2 ?
                  <View style={{ alignSelf: 'center', width: '75%', height: '80%', marginTop: 80 }}>
                    <View style={{ flex: 0.25 }}>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>情境題</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>假設孩子因為臨時有事，在未告知的情況下晚歸。當他一進家門，詢問他的原因時，孩子通常會有什麼反應?</Text>
                      </View>
                    </View>
                    <View style={{ flex: 0.55 }}>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center' }, this.state.onselect == 1 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(1)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 1 && { color: 'white' }]} >{'對不起啦!我下次會注意時間><'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 2 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(2)}>
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 2 && { color: 'white' }]} >好煩喔，每次都要問東問西，就不能多信任我一點嗎?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 3 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(3)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 3 && { color: 'white' }]} >我臨時有報告要做，太趕了所以忘記事先告訴你。</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 4 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(4)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 4 && { color: 'white' }]} >沒事啦!好餓喔，冰箱還有吃的嗎?</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'flex-end' }}>
                      <TouchableOpacity style={{ width: '50%', height: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#FAC75E' }} activeOpacity={0.9} onPress={() => this._firstQuest()}>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>開始</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  <View style={{ alignSelf: 'center', width: '75%', height: '80%', marginTop: 80 }}>
                    <View style={{ flex: 0.25 }}>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>情境題</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>假設你因為臨時有事，在未告知的情況下晚歸。一進家門，你媽通常會有什麼反應?</Text>
                      </View>
                    </View>
                    <View style={{ flex: 0.55 }}>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center' }, this.state.onselect == 1 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(1)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 1 && { color: 'white' }]} >這麼晚回家，是不是很累了?趕快去休息吧 !</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 2 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(2)}>
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 2 && { color: 'white' }]} >現在都幾點了， 又跑去哪裡玩了?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 3 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(3)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 3 && { color: 'white' }]} >為了安全著想，晚歸的話應該要事先告知。</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[{ width: '100%', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }, this.state.onselect == 4 && { backgroundColor: '#4896CA' }]} activeOpacity={0.8} onPress={() => this._onSelect(4)} >
                        <Text style={[{ fontSize: 16, lineHeight: 19, color: '#447291' }, this.state.onselect == 4 && { color: 'white' }]} >回家了喔，啊 ! 電視劇要開始了</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'flex-end' }}>
                      <TouchableOpacity style={{ width: '50%', height: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#FAC75E' }} activeOpacity={0.8} onPress={() => this._firstQuest()} >
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>開始</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>
            </View>

          </ScrollView >


          <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, top: 30, left: 15 }} onPress={() => this._gotoChatScreen()} >
            <Icon name='close' size={40} color={this.closecolor} />
          </TouchableOpacity>

          <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: '5%' }}>
            <View style={[{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 0 && { backgroundColor: 'white' }]} />
            <View style={[{ marginLeft: 10, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 1 && { backgroundColor: 'white' }]} />
            {/* <View style={[{ marginLeft: 10, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 2 && { backgroundColor: 'white' }]} /> */}
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
