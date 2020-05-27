import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements'
import { Video } from 'expo-av';
import FireBaseManager from '../components/FireBaseManager'

export default class CollectScreen extends React.Component {

  backiconsize = 50;
  FireBase = FireBaseManager.getInstance()
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  // random = Math.ceil(Math.random() * 100) % 7;

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      nowcollect: this.FireBase._getCollect(),
      progress: new Animated.Value(-this.screenWidth * 0.36 * 0.9),
      finish: this.FireBase._getFinish(),
    }
    this.FireBase._setFinish(true)
  }

  

  collects = [{
    name: '洗衣機阿立',
    discription: '阿立洗淨了髒汙，讓彼此的心情更加澄淨',
    reason: '深入對話1ㄧ爸爸',
    image: require('../assets/Collect/F1.png'),
    video: require('../assets/Collect/Collect_1.mp4'),
  }, {
    name: '電鍋阿同',
    discription: '阿同煮出的菜餚，溫暖了一家人的胃',
    image: require('../assets/Collect/F2.png'),
    video: require('../assets/Collect/Collect_2.mp4'),
  }, {
    name: '吐司機阿寶',
    discription: '阿寶給予適當的溫暖，讓彼此擁有最佳的風味',
    reason: '深入對話3ㄧ媽媽',
    image: require('../assets/Collect/F3.png'),
    video: require('../assets/Collect/Collect_3.mp4'),
  }, {
    name: '風扇小夏',
    discription: '小夏微風徐徐吹來，燥熱不安的情緒隨之散去',
    image: require('../assets/Collect/F4.png'),
    video: require('../assets/Collect/Collect_4.mp4'),
  }, {
    name: '檯燈小菲',
    discription: '小菲照亮了一家，驅走了所有黑暗',
    image: require('../assets/Collect/F5.png'),
    video: require('../assets/Collect/Collect_5.mp4'),
  }, {
    name: '馬桶阿杜',
    discription: '阿杜大水一沖，沖走了一切堵塞與不愉快',
    image: require('../assets/Collect/F6.png'),
    video: require('../assets/Collect/Collect_6.mp4'),
  }, {
    name: '果汁機阿亞',
    discription: '阿亞把東西巧妙融合，拉近了彼此的距離',
    image: require('../assets/Collect/F7.png'),
    video: require('../assets/Collect/Collect_7.mp4'),
  },]

  _gotoHomeScreem = () => {
    this.props.navigation.navigate('Home')
  }

  _gobackScreen = () => {
    this.props.navigation.goBack()
  }

  _changeCollect = (buffer) => {
    this.collectlist.scrollTo({ x: buffer * 170 - this.screenWidth / 2 + 85 })
  }

  _onScroll = (event) => {
    var x = event.nativeEvent.contentOffset.x
    x += this.screenWidth / 2 + 85

    y = x / 170

    if (y < 1.5) {
      collect = 0
    } else if (y < 2.5) {
      collect = 1
    } else if (y < 3.5) {
      collect = 2
    } else if (y < 4.5) {
      collect = 3
    } else if (y < 5.5) {
      collect = 4
    } else if (y < 6.5) {
      collect = 5
    } else if (y < 7.5) {
      collect = 6
    }

    this.setState({ nowcollect: collect })
  }

  render() {
    const { screenWidth, screenHeight } = this
    const collects = this.collects.map((buffer, index) => {
      return (
        <Collects key={index} style={{ width: 150, height: screenHeight * 0.2, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }} source={buffer.image} onPress={() => this._changeCollect(index)} />
      )
    })
    return (
      <View style={[styles.container, { backgroundColor: '#F4EDE9' }]}>
        <View style={{ position: 'absolute', height: '43%', width: '100%', backgroundColor: '#E4DBD5' }} />

        {/* {this.state.finish ?
          null
          :
          <Video style={{ position: 'absolute', width: screenWidth, height: screenHeight, zIndex: 2, alignSelf: 'center' }} onPlaybackStatusUpdate={x => this.setState({ finish: x.didJustFinish })} resizeMode='contain' shouldPlay={true} source={this.collects[this.random].video} />
        } */}

        <Header progress={this.state.progress} size={this.backiconsize} type={null} onPress={() => this._gobackScreen()} hintPage={() => this._toggleHintpage()} />

        <View style={{ flex: 0.9, alignItems: 'center' }}>

          <View style={{ flex: 0.3, justifyContent: 'flex-end' }} />

          <View style={{ flex: 0.4, width: '100%', alignItems: 'center' }}>
            <View style={{ height: 160, alignItems: 'center' }} >
              <Image style={{}} source={require('../assets/Collect/stage.png')} />
              {this.collects[this.state.nowcollect].reason ?
                <View style={{ position: 'absolute', width: '100%', alignItems: 'center', justifyContent: 'center', top: '66%' }} >
                  <Image style={{ width: '50%', resizeMode: 'contain' }} source={require('../assets/Collect/yellow.png')} />
                  <View style={{ position: 'absolute' }} >
                    <Text style={{ fontSize: 14, lineHeight: 16, color: 'white' }} >{this.collects[this.state.nowcollect].reason || ''}</Text>
                  </View>
                </View>
                :
                null
              }

              <Image style={{ position: 'absolute', top: '-40%', height: '80%', resizeMode: 'contain' }} source={this.collects[this.state.nowcollect].image} />
            </View>
            <View style={{ alignItems: 'center' }} >
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, lineHeight: 21, color: '#767B8F' }}>{this.collects[this.state.nowcollect].name || 'ㄚㄚㄚㄚ'}</Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text style={{ fontSize: 14, lineHeight: 16, color: '#9D9C9B' }}>{this.collects[this.state.nowcollect].discription || '？？？？？'}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.3, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '100%' }} contentInset={{ left: screenWidth / 2 - 85, right: screenWidth / 2 - 85 }} contentOffset={{ x: - screenWidth / 2 + 85 }} snapToInterval={170} snapToAlignment='center' decelerationRate='fast' horizontal={true} showsHorizontalScrollIndicator={false} onScroll={event => this._onScroll(event)} scrollEventThrottle={16} ref={scroll => this.collectlist = scroll} >
              {collects}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header} >
        <View style={{ flex: 0.2 }}>

        </View>
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: '70%', aspectRatio: 1, }} >
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/box.png')} />
          </View>
          <View style={{ width: '60%', height: '35%', borderTopRightRadius: '50%', borderBottomRightRadius: '50%', backgroundColor: '#E3E3E3', overflow: 'hidden' }}>
            <Animated.View style={{ position: 'absolute', left: this.props.progress, width: '100%', height: '100%', borderTopRightRadius: '50%', borderBottomRightRadius: '50%', backgroundColor: '#F8CC73' }} >

            </Animated.View>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1} onPress={this.props.onPress} >
            <Icon name='angle-right' size={this.props.size} color='#6E6E6E' type='font-awesome' />
          </TouchableOpacity>
        </View>
      </View >
    )
  }
}

class Collects extends React.Component {
  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress} activeOpacity={0.8} >
        <Image style={{ height: '80%', aspectRatio: 1, resizeMode: 'contain' }} source={this.props.source} />
      </TouchableOpacity>
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

});
