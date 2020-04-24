import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ScrollView, Keyboard, TextInput, Dimensions, Slider } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager'

export default class QuestScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  FireBase = FireBaseManager.getInstance();
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  topbarWidth = this.screenWidth * 0.4;
  first = this.FireBase._getFirsttime();

  state = {
    buffer: true,
    identity: null,
    onselect: null,
    scroll: false,
    scrollable: true,
    topbar: new Animated.Value(-this.topbarWidth),
  };

  nowpage = 0;
  closecolor = '#447291';

  componentDidMount = () => {
    if (this.first == false) {
      this.firstquest.scrollTo({ x: this.screenWidth * 3, y: 0 })
    }
  }

  _gotoChatScreen = () => {
    this.props.navigation.navigate('Chat')
  }

  _chooseID = (id) => {

    this.setState({
      identity: id,
      onselect: null,
    })

    this.firstquest.scrollTo({ x: this.screenWidth * 2, y: 0 })
  }

  _onSelect = (select) => {
    this.setState({
      onselect: select,
    })
  }

  _firstQuest = () => {
    if (this.state.onselect != null) {
      this.setState({
        onselect: null,
      })
      this.first = this.FireBase._setFirsttime(false);
      this.nowpage = 3;
      this.firstquest.scrollTo({ x: this.screenWidth * 3, y: 0 });
      this.closecolor = 'white';
    }
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

    var page = event.nativeEvent.contentOffset.x / this.screenWidth;
    if (this.first == false) {
      if (page != this.nowpage) {
        Animated.timing(
          this.state.topbar, {
          toValue: -this.topbarWidth + this.topbarWidth / 3 * (page - 3),
          easing: Easing.cubic,
          duration: 300,
        }).start();
      }
    }
    this.nowpage = page;
  }

  _handleScroll = (event) => {
    var new_x = event.nativeEvent.contentOffset.x;

    if (this.nowpage == 3 && this.first == false && new_x < this.nowpage * this.screenWidth) {
      this.setState({
        scrollable: false,
      })
      this.firstquest.scrollTo({ x: this.screenWidth * (this.nowpage), y: 0 });
    } else if (this.nowpage == 2 && this.first == true && new_x > this.nowpage * this.screenWidth) {
      this.setState({
        scrollable: false,
      })
      this.firstquest.scrollTo({ x: this.screenWidth * (this.nowpage), y: 0 });
    } else {
      this.setState({
        scrollable: true,
      })
    }
  }

  // _scrollRowEnd = (event) => {
  //   this.scrollrow_y = event.nativeEvent.contentOffset.y;
  //   var page = this.scrollrow_y / this.screenHeight;
  //   if (page != this.rowpage) {
  //     this.rowpage = page;
  //     Animated.timing(
  //       this.state.topbar, {
  //       toValue: -this.topbarWidth + this.topbarWidth / 3 * this.rowpage,
  //       easing: Easing.easing,
  //       duration: 300,
  //     }).start();
  //   }
  // }

  _scrollRight = () => {
    this.firstquest.scrollTo({ x: (this.nowpage + 1) * this.screenWidth, y: 0 });
  }

  render() {
    const { screenWidth, screenHeight } = this;
    var issue;
    switch (this.state.onselect) {
      case 1:
        issue = '社交生活';
        break;
      case 2:
        issue = '家庭關係';
        break;
      case 3:
        issue = '學校生活';
        break;
      case 4:
        issue = '價直信仰';
        break;
      case 5:
        issue = '生活態度';
        break;
      case 6:
        issue = '其他方面';
        break;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: '#F2F2F2' }]} >
          <ScrollView horizontal={true} pagingEnabled={true} scrollEnabled={this.state.scrollable} showsHorizontalScrollIndicator={false} bounces={false} decelerationRate='fast' ref={firstquest => this.firstquest = firstquest} contentOffset={{ x: this.first ? 0 : this.screenWidth * 3 }} onMomentumScrollBegin={() => this._scrollBegin()} onMomentumScrollEnd={(event) => this._scrollEnd(event)} onScroll={(event) => this._handleScroll(event)} >

            <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 0.2, width: '50%', marginTop: '-10%' }}>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>每個人都是一座冰山，水平面下才是人真正的內在，透過冰山的探索，讓人與人擁有更好的溝通</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-end', marginTop: '20%' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>---- {'<薩提爾>'}</Text>
                </View>
              </View>
              <View style={{ position: 'absolute', width: '100%', height: '20%', bottom: 0, backgroundColor: '#447291' }} />
            </View>


            <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#5587A8', opacity: 0.62 }}>
              <View style={{ alignSelf: 'center', width: '80%', height: '50%', alignItems: 'center', marginTop: '30%' }}>
                <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>你的身分:</Text>
                </View>
                <View style={{ flex: 0.3, width: '80%', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ width: '100%', height: '50%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._chooseID(1)} activeOpacity={0.8}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>家長</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.3, width: '80%', justifyContent: 'flex-start' }}>
                  <TouchableOpacity style={{ width: '100%', height: '50%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._chooseID(2)} activeOpacity={0.8} >
                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#447291' }}>小孩</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>


            {this.first ?
              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#5587A8', opacity: 0.62 }}>

                {this.state.identity == null ?
                  <View style={{ alignSelf: 'center', width: '75%', height: '80%', marginTop: 80 }}>
                    <View style={{ flex: 0.25 }}>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>情境題</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>請先選擇身分喔!</Text>
                      </View>
                    </View>
                    <View style={{ flex: 0.55 }}>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    </View>
                  </View>
                  :

                  <View style={{ flex: 1 }}>
                    {this.state.identity == 1 ?
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
                          <TouchableOpacity style={{ width: '50%', height: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#FAC75E' }} activeOpacity={0.8} onPress={() => this._firstQuest()}>
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
                }
              </View>
              :
              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#5587A8', opacity: 0.62 }}>
              </View>
            }

            {this.first ?
              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#447291', alignItems: 'center' }}>
              </View>
              :
              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#447291', alignItems: 'center' }}>
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
            }

            <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#447291', alignItems: 'center' }}>
              <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>最近在{issue}上發生了什麼事呢? (試著簡單描述)</Text>
              </View>
              <View style={{ flex: 0.5, width: '60%' }}>
                <View style={{ width: '100%', height: '80%', paddingTop: '10%' }}>
                  <TextInput multiline style={{ width: '100%', height: '100%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='沒收我的手機，限制我使用的時間......' />
                </View>
              </View>
            </View>


            <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', backgroundColor: '#447291' }}>
              <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 18, lineHeight: 21, color: 'white', marginBottom: '10%' }}>這件事讓我覺得:</Text>
              </View>
              <View style={{ flex: 0.5, width: '100%' }}>
                <View style={{ flex: 0.4, width: '60%', justifyContent: 'space-around', alignSelf: 'center' }}>
                  <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                  </View>
                  <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                  </View>
                </View>
                <View style={{ flex: 0.6 }}>
                  <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Slider style={{ width: 200, height: 40 }} minimumValue={0} maximumValue={1} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" />
                    <TextInput multiline style={{ width: '60%', minHeight: 80, color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                  </ScrollView>
                </View>
              </View>
            </View>


            <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', backgroundColor: '#447291' }}>
              <View style={{ flex: 0.4, width: '60%', justifyContent: 'flex-end' }}>

              </View>
              <View style={{ flex: 0.6, width: '60%' }}>
                <View style={{ flex: 0.26, width: '100%' }}>

                  <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>媽媽對我的期待</Text>
                  </View>
                  <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                    <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                  </View>

                </View>
                <View style={{ flex: 0.26, width: '100%' }}>

                  <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>我期待我可以......</Text>
                  </View>
                  <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                    <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                  </View>

                </View>
                <View style={{ flex: 0.26, width: '100%' }}>

                  <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}> 我希望媽媽能...... </Text>
                  </View>
                  <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                    <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                  </View>

                </View>
                <View style={{ flex: 0.22, width: '100%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '5%' }}>

                  <TouchableOpacity style={{ width: '60%', height: '50%', borderRadius: 25, backgroundColor: '#FAC75E', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>送出</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>


          </ScrollView >


          <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, top: 30, right: 10 }} onPress={() => this._gotoChatScreen()} >
            <Icon name='close' size={40} color={this.closecolor} />
          </TouchableOpacity>

          {this.first ?
            <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: '5%' }}>
              <View style={[{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 0 && { backgroundColor: 'white' }]} />
              <View style={[{ marginLeft: 10, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 1 && { backgroundColor: 'white' }]} />
              <View style={[{ marginLeft: 10, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white' }, this.nowpage == 2 && { backgroundColor: 'white' }]} />
            </View>
            :
            <View style={{ position: 'absolute', width: '60%', height: '10%', top: '10%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 0.3, height: '100%', zIndex: 2 }}>
                <View style={{ left: '8%', width: screenHeight * 0.1, height: '100%', backgroundColor: 'white', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: '90%', height: '90%', backgroundColor: '#C8E6FA', borderRadius: '50%' }}>
                    <Text style={{ fontSize: 16, color: 'black' }}></Text>
                  </View>
                  <View style={{ left: '92%', width: '10%', height: '32%', position: 'absolute', backgroundColor: '#C8E6FA', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
                </View>
              </View>
              <View style={{ flex: 0.7, height: '40%', backgroundColor: 'white', justifyContent: 'center', overflow: 'hidden', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }}>
                <Animated.View style={{ width: '98%', height: '80%', left: this.state.topbar, backgroundColor: '#C8E6FA', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
              </View>
            </View>
          }

          {this.first ?
            null
            :
            <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, bottom: 30, left: 30 }} onPress={() => this._scrollRight()} >
              <Icon name='chevron-right' size={40} color='white' type='font-awesome' />
            </TouchableOpacity>
          }
        </View>



        {/* <View style={styles.container}>
            <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false} bounces={false} ref={scroll => this.scrollRow = scroll} onMomentumScrollEnd={(event) => this._scrollRowEnd(event)}>
              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#447291', alignItems: 'center' }}>
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

              <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#447291', alignItems: 'center' }}>
                <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }}>最近在{issue}上發生了什麼事呢? (試著簡單描述)</Text>
                </View>
                <View style={{ flex: 0.5, width: '60%' }}>
                  <View style={{ width: '100%', height: '80%', paddingTop: '10%' }}>
                    <TextInput multiline style={{ width: '100%', height: '100%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='沒收我的手機，限制我使用的時間......' />
                  </View>
                </View>
              </View>

              <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', backgroundColor: '#447291' }}>
                <View style={{ flex: 0.5, width: '60%', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 18, lineHeight: 21, color: 'white', marginBottom: '10%' }}>這件事讓我覺得:</Text>
                </View>
                <View style={{ flex: 0.5, width: '60%' }}>
                  <View style={{ flex: 0.4, width: '100%', justifyContent: 'space-around' }}>
                    <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    </View>
                    <View style={{ flex: 0.35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                      <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'gray', borderRadius: '50%' }} />
                    </View>
                  </View>
                  <View style={{ flex: 0.6 }}>
                    <Slider style={{ width: 200, height: 40 }} minimumValue={0} maximumValue={1} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" />
                    <TextInput multiline style={{ width: '100%', height: '40%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                  </View>
                </View>
              </View>

              <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center', backgroundColor: '#447291' }}>
                <View style={{ flex: 0.4, width: '60%', justifyContent: 'flex-end' }}>

                </View>
                <View style={{ flex: 0.6, width: '60%' }}>
                  <View style={{ flex: 0.26, width: '100%' }}>

                    <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>媽媽對我的期待</Text>
                    </View>
                    <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                      <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                    </View>

                  </View>
                  <View style={{ flex: 0.26, width: '100%' }}>

                    <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>我期待我可以......</Text>
                    </View>
                    <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                      <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                    </View>

                  </View>
                  <View style={{ flex: 0.26, width: '100%' }}>

                    <View style={{ flex: 0.25, width: '100%', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}> 我希望媽媽能...... </Text>
                    </View>
                    <View style={{ flex: 0.75, width: '100%', justifyContent: 'center' }}>
                      <TextInput multiline style={{ width: '100%', height: '80%', color: '#447291', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, lineHeight: 19 }} placeholder='因為...' />
                    </View>

                  </View>
                  <View style={{ flex: 0.22, width: '100%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '5%' }}>

                    <TouchableOpacity style={{ width: '60%', height: '50%', borderRadius: 25, backgroundColor: '#FAC75E', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>送出</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>



            </ScrollView>

            <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, top: 30, right: 10 }} onPress={() => this._gotoChatScreen()} >
              <Icon name='close' size={40} color='white' />
            </TouchableOpacity>

            <View style={{ position: 'absolute', width: '60%', height: '10%', top: '10%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 0.3, height: '100%', zIndex: 2 }}>
                <View style={{ left: '8%', width: screenHeight * 0.1, height: '100%', backgroundColor: 'white', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: '90%', height: '90%', backgroundColor: '#C8E6FA', borderRadius: '50%' }}>
                    <Text style={{ fontSize: 16, color: 'black' }}></Text>
                  </View>
                  <View style={{ left: '92%', width: '10%', height: '32%', position: 'absolute', backgroundColor: '#C8E6FA', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
                </View>
              </View>
              <View style={{ flex: 0.7, height: '40%', backgroundColor: 'white', justifyContent: 'center', overflow: 'hidden', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }}>
                <Animated.View style={{ width: '98%', height: '80%', left: this.state.topbar, backgroundColor: '#C8E6FA', borderTopRightRadius: '10%', borderBottomRightRadius: '10%' }} />
              </View>
            </View>

          </View> */}

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
