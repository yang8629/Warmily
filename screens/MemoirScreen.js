import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, Dimensions, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import FireBaseManager from '../components/FireBaseManager'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';

export default class MemoirScreen extends React.Component {

  firebase = FireBaseManager.getInstance();

  backiconsize = 50;
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;
  resize = this.screenWidth / 414;

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.getPermissionAsync();
    this.state = {
      albumheight: new Animated.Value(this.screenHeight),
      imagebrowerheight: new Animated.Value(this.screenHeight),
      addheight: new Animated.Value(this.screenHeight),
      order: 0,
      photos: '',
      title: '',
      description: '',
      imageheight: new Animated.Value(0),
      scaleimage: null,
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  memoirs = [{
    image: require('../assets/Album/1.png'),
    description: '出門探險',
  }, {
    image: require('../assets/Album/3.png'),
    description: '大手拉小手',
  }, {
    image: require('../assets/Collect/F1.png'),
    description: '姊姊和媽媽深入對話1',
  }, {
    image: require('../assets/Album/5.png'),
    description: '姐妹合照',
  }, {
    image: require('../assets/Album/head.png'),
    description: '阿里山山遊',
  }, {
    image: require('../assets/Collect/F2.png'),
    description: '一起成功收集阿同電鍋',
  }, {
    image: require('../assets/Album/2.png'),
    description: '跑跑跑',
  }, {
    image: require('../assets/Album/6.png'),
    description: '游泳',
  },]


  photos = [{
    photos: [{
      photo: require('../assets/Album/1.png'),
    }, {
      photo: require('../assets/images/story1.png'),
    }, {
      photo: require('../assets/Album/6.png'),
    }, {
      photo: require('../assets/Album/2.png'),
    }, {
      photo: require('../assets/Album/5.png'),
    }, {
      photo: require('../assets/Album/4.png'),
    },],
    header: {
      title: '大手拉小手',
      description: '一同去郊遊',
      headimg: require('../assets/Album/3.png'),
      time: '2020/2/30',
    },
  }, {
    photos: [{
      photo: require('../assets/images/story.png'),
    }, {
      photo: require('../assets/images/story1.png'),
    }, {
      photo: require('../assets/Album/1.png'),
    }, {
      photo: require('../assets/Album/2.png'),
    }, {
      photo: require('../assets/Album/3.png'),
    }, {
      photo: require('../assets/Album/4.png'),
    },],
    header: {
      title: '阿里山出遊',
      description: '我們一家去阿里山看櫻花，阿花第一次坐火車特別興奮，阿力吃了火車便當就徹底愛上了。',
      headimg: require('../assets/Album/head.png'),
      time: '2020/3/19',
    }
  }, {
    photos: [{
      photo: require('../assets/Album/6.png'),
    }, {
      photo: require('../assets/images/story1.png'),
    }, {
      photo: require('../assets/Album/1.png'),
    }, {
      photo: require('../assets/Album/2.png'),
    }, {
      photo: require('../assets/Album/5.png'),
    }, {
      photo: require('../assets/Album/4.png'),
    },],
    header: {
      title: '游泳',
      description: '消毒水自助吧',
      headimg: require('../assets/Album/6.png'),
      time: '2019/9/31',
    },
  }]

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _gobackScreen = () => {
    this.props.navigation.navigate('home')
  }

  _toggleAlbum = (buffer, order) => {
    if (buffer) {
      Animated.timing(this.state.albumheight, {
        toValue: 0,
        easing: Easing.ease,
        duration: 300,
      }).start()
      this.setState({ order: order })
    } else {
      Animated.timing(this.state.albumheight, {
        toValue: this.screenHeight,
        easing: Easing.ease,
        duration: 300,
      }).start()
    }
  }

  _toggleImageBrower = (buffer) => {
    if (buffer) {
      Animated.timing(this.state.imagebrowerheight, {
        toValue: 0,
        easing: Easing.ease,
        duration: 300,
      }).start()
    } else {
      Animated.timing(this.state.imagebrowerheight, {
        toValue: this.screenHeight,
        easing: Easing.ease,
        duration: 300,
      }).start()
    }
  }

  _toggleAdd = (buffer) => {
    if (buffer) {
      Animated.timing(this.state.addheight, {
        toValue: 0,
        easing: Easing.ease,
        duration: 300,
      }).start()
    } else {
      Animated.timing(this.state.addheight, {
        toValue: this.screenHeight,
        easing: Easing.ease,
        duration: 300,
      }).start()
      this._toggleImageBrower(false)
      this.setState({ photos: '', title: '', description: '' })
      this.titleinput.clear()
      this.descripinput.clear()
    }
  }

  _imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        photos
      })
      if (this.state.photos == '' || this.state.photos == 'cancel') {
        this._toggleImageBrower(false)
      } else {
        this._toggleAdd(true)
      }
    }).catch((e) => alert(e))
  }

  _addMemoirs = () => {
    var amount = this.photos.length
    var photos = []
    this.state.photos.map((buffer) => photos.push({ photo: buffer.uri }))
    var title = this.state.title || '標題'
    var description = this.state.description || '你很懶'

    this.photos.push({
      photos: photos,
      header: {
        title: title,
        description: description,
        headimg: photos[0].photo,
        time: '2020/4/22',
      }
    })

    this.memoirs.push({
      image: photos[0].photo,
      description: title,
    })

    this.setState({ photos: '', title: '', description: '' })
    this._toggleAdd(false)
  }

  _scaleImage = async (img) => {
    await this.setState({ scaleimage: img })
    Animated.timing(this.state.imageheight, {
      toValue: this.screenHeight,
      easing: Easing.ease,
      duration: 400,
    }).start()
  }

  _closeImage = () => {
    Animated.timing(this.state.imageheight, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300,
    }).start()
    this.setState({ scaleimage: null })
  }

  render() {
    const { screenWidth, screenHeight, resize } = this
    const { order } = this.state
    return (
      <View style={[styles.container, { backgroundColor: '#E4DBD5' }]}>

        <View style={[styles.container, { position: 'absolute', width: screenWidth, height: screenHeight }]} >
          <Header size={this.backiconsize} type={null} onPress={() => this._gobackScreen()} />

          <View style={{ flex: 0.92, alignItems: 'center', backgroundColor: '#F4EDE9' }}>

            <ScrollView style={{ width: '100%' }} bounces={false} ref={scroll => this.mainscroll = scroll} onContentSizeChange={() => this.mainscroll.scrollTo({ x: 0, y: 0, animated: true })} showsVerticalScrollIndicator={false} >

              <View style={{ position: 'absolute', right: 0, bottom: 0 }} >
                <Image style={{}} source={require('../assets/icon/sofa.png')} />
              </View>
              <View style={{ position: 'absolute', left: 20, bottom: 0 }} >
                <Image style={{}} source={require('../assets/icon/lamp.png')} />
              </View>

              <View style={{ position: 'absolute', left: 0, bottom: screenHeight * 0.4 }} >
                <Image style={{}} source={require('../assets/icon/flower.png')} />
              </View>
              <View style={{ position: 'absolute', right: 0, bottom: screenHeight * 0.6 }} >
                <Image style={{}} source={require('../assets/icon/book.png')} />
              </View>

              {this.photos.length > 5 ?
                <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {this.photos.length > 6 ?
                    <Block style={{ backgroundColor: '#F1AC9F', bottom: 5 }} change={true} image={this.memoirs[11].image} description={this.memoirs[11].description} onPress={() => this._toggleAlbum(true, 6)} />
                    :
                    null
                  }

                  <Block style={{ backgroundColor: '#A9D0CD', left: 35, top: 15 }} change={true} image={this.memoirs[10].image} description={this.memoirs[10].description} onPress={() => this._toggleAlbum(true, 5)} />

                  <View style={{ position: 'absolute', width: screenWidth * 0.15, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                  <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 150 * resize, bottom: 75, borderBottomWidth: 10, borderLeftWidth: 10, borderBottomLeftRadius: '85%', borderColor: '#FFF', zIndex: -1 }} />
                  <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 220 * resize, top: 75, borderTopWidth: 10, borderRightWidth: 10, borderTopRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />

                </View>
                :
                null
              }


              {this.photos.length > 3 ?
                <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                  <Block style={{ backgroundColor: '#FFD784', right: 30 }} change={true} image={this.memoirs[8].image} description={this.memoirs[8].description} onPress={() => this._toggleAlbum(true, 3)} />

                  {this.photos.length > 4 ?
                    <Block style={{ backgroundColor: '#A9D0CD', left: 65, bottom: 15 }} change={true} image={this.memoirs[9].image} description={this.memoirs[9].description} onPress={() => this._toggleAlbum(true, 4)} />
                    :
                    null
                  }
                  <View style={{ position: 'absolute', width: screenWidth * 0.4, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                  <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 220 * resize, bottom: 75, borderBottomWidth: 10, borderRightWidth: 10, borderBottomRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />
                  <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 230 * resize, top: 75, borderTopWidth: 10, borderLeftWidth: 10, borderTopLeftRadius: '85%', borderColor: '#FFF', zIndex: -1 }} />
                </View>
                :
                null
              }

              <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                <Block style={{ backgroundColor: '#F1AC9F', right: 80, bottom: 20 }} image={this.memoirs[0].image} description={this.memoirs[0].description} onPress={() => this._toggleAlbum(true, 0)} />
                <Block style={{ backgroundColor: '#A9D0CD', right: 45 }} image={this.memoirs[1].image} description={this.memoirs[1].description} onPress={() => this._toggleAlbum(true, 0)} />

                <View style={{ position: 'absolute', width: screenWidth * 0.4, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 230 * resize, bottom: 75, borderBottomWidth: 10, borderLeftWidth: 10, borderBottomLeftRadius: '85%', borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 200 * resize, top: 75, borderTopWidth: 10, borderRightWidth: 10, borderTopRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />
              </View>

              <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                <Block style={{ backgroundColor: '#FFD784', right: 20, bottom: 10 }} image={this.memoirs[2].image} description={this.memoirs[2].description} />
                <Block style={{ backgroundColor: '#F1AC9F', left: 50 }} image={this.memoirs[3].image} description={this.memoirs[3].description} onPress={() => this._toggleAlbum(true, 1)} />

                <View style={{ position: 'absolute', width: screenWidth * 0.5, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 200 * resize, bottom: 75, borderBottomWidth: 10, borderRightWidth: 10, borderBottomRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 230 * resize, top: 75, borderTopWidth: 10, borderLeftWidth: 10, borderTopLeftRadius: '85%', borderColor: '#FFF', zIndex: -1 }} />
              </View>
              <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                <Block style={{ backgroundColor: '#F1AC9F', right: 40, top: 20 }} image={this.memoirs[4].image} description={this.memoirs[4].description} onPress={() => this._toggleAlbum(true, 1)} />
                <Block style={{ backgroundColor: '#A9D0CD', left: 20 }} image={this.memoirs[5].image} description={this.memoirs[5].description} />

                <View style={{ position: 'absolute', width: screenWidth * 0.5, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 230 * resize, bottom: 75, borderBottomWidth: 10, borderLeftWidth: 10, borderBottomLeftRadius: '85%', borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 180 * resize, top: 75, borderTopWidth: 10, borderRightWidth: 10, borderTopRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />
              </View>
              <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                <Block style={{ backgroundColor: '#FFD784', right: 30 }} image={this.memoirs[6].image} description={this.memoirs[6].description} onPress={() => this._toggleAlbum(true, 2)} />

                <View style={{ position: 'absolute', width: screenWidth * 0.2, borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 180 * resize, bottom: 75, borderBottomWidth: 10, borderRightWidth: 10, borderBottomRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 170 * resize, top: 75, borderTopWidth: 10, borderLeftWidth: 10, borderTopLeftRadius: '90%', borderColor: '#FFF', zIndex: -1 }} />
              </View>

              <View style={{ width: '100%', paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                <Block style={{ backgroundColor: '#F1AC9F' }} image={this.memoirs[7].image} description={this.memoirs[7].description} onPress={() => this._toggleAlbum(true, 2)} />

                <View style={{ position: 'absolute', width: '20%', borderWidth: 5, borderColor: '#FFF', zIndex: -1 }} />
                <View style={{ position: 'absolute', height: 160, aspectRatio: 1, right: 170 * resize, bottom: 75, borderBottomWidth: 10, borderLeftWidth: 10, borderBottomLeftRadius: '90%', borderColor: '#FFF', zIndex: -1 }} />
                {/* <View style={{ position: 'absolute', height: 160, aspectRatio: 1, left: 180 * resize, top: 75, borderTopWidth: 10, borderRightWidth: 10, borderTopRightRadius: '80%', borderColor: '#FFF', zIndex: -1 }} /> */}
                <View style={{ position: 'absolute', height: 80, top: 80, borderLeftWidth: 10, borderColor: '#FFF', zIndex: -1 }} />
              </View>
            </ScrollView>

            <View style={[styles.shadow, { position: 'absolute', right: '10%', bottom: '10%' }]} >
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleImageBrower(true)} >
                <Image style={{ width: 60, height: 60, }} source={require('../assets/icon/add2.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View style={{ position: 'absolute', width: screenWidth, height: screenHeight, top: this.state.albumheight, backgroundColor: '#E4DBD5' }}>

          <Header size={this.backiconsize} type={null} onPress={() => this.setState({ album: false })} onPress={() => this._toggleAlbum(false)} />

          <View style={{ flex: 0.9, alignItems: 'center' }}>

            <FlatList style={{ backgroundColor: '#E5E5E5', width: '100%', }} data={this.photos[order].photos} numColumns={2} ListHeaderComponent={() => ListHeader(this.photos[order].header, screenHeight, order)} keyExtractor={(item, index) => { return index.toString(); }} renderItem={(buffer) => PhotoBlock(buffer.item, screenWidth, this.state.order, () => this._scaleImage(buffer.item.photo))} />

            <View style={[styles.shadow, { position: 'absolute', right: '10%', bottom: '10%' }]} >
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this._toggleImageBrower(true)}  >
                <Image style={{ width: 60, height: 60, }} source={require('../assets/icon/add2.png')} />
              </TouchableOpacity>
            </View>

          </View>
        </Animated.View>

        <Animated.View style={[styles.container, { top: this.state.imagebrowerheight, backgroundColor: '#E4DBD5' }]} >
          <ImageBrowser style={{ backgroundColor: 'E4DBD5' }} headerDoneText='完成' headerCloseText='關閉' callback={(callback) => this._imageBrowserCallback(callback)} />
        </Animated.View>

        <Animated.View style={{ position: 'absolute', width: screenWidth, height: screenHeight, top: this.state.addheight, backgroundColor: '#FFF' }}>

          <View style={{ marginTop: 20, height: 60, justifyContent: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', marginLeft: 20, marginTop: 10 }} onPress={() => this._toggleAdd(false)} >
              <Icon name='clear' color='#447291' size={30} type='material' />
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: 'flex-end', right: '10%' }} activeOpacity={0.8} onPress={() => this._addMemoirs()} >
              <Text style={{ fontSize: 18, lineHeight: 24, fontWeight: 'bold' }}>建立回憶錄</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 200, alignItems: 'center' }} >
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }} >
              <View style={{ width: '90%', alignItems: 'center', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10 }} >
                <TextInput style={{ width: '100%', fontSize: 24, color: 'gray' }} onChangeText={(text) => this.setState({ title: text })} placeholder='標題' ref={input => this.titleinput = input} />
              </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }} >
              <View style={{ width: '90%', alignItems: 'center', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10 }} >
                <TextInput multiline style={{ width: '100%', maxHeight: 130, minHeight: 28, fontSize: 18, color: 'gray', paddingTop: 5, paddingBottom: 5 }} onChangeText={(text) => this.setState({ description: text })} placeholder='描述' ref={input => this.descripinput = input} />
              </View>
            </View>
          </View>

          <FlatList data={this.state.photos} numColumns={3} keyExtractor={(item, index) => { return index.toString(); }} renderItem={(buffer) => AddBlock(buffer.item, screenWidth, () => this._scaleImage())} />

        </Animated.View>

        <Animated.View style={{ position: 'absolute', width: this.state.imageheight.interpolate({ inputRange: [0, screenHeight], outputRange: [0, screenWidth] }), height: this.state.imageheight, top: this.state.imageheight.interpolate({ inputRange: [0, screenHeight], outputRange: [screenWidth / 2, 0] }), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#E5E5E5', }} >
          {/* <Animated.View style={{ position: 'absolute', alignSelf: 'center', width: screenWidth, height: screenHeight }} > */}
          <TouchableOpacity onPress={() => this._closeImage()} activeOpacity={0.8}>
            {/* <Image style={{ position: 'absolute', alignSelf: 'center', width: 200, height: 200 }} resizeMode='contain' source={require('../assets/icon/loading.gif')} /> */}
            <Image style={{ width: screenWidth, height: screenHeight }} resizeMode='contain' defaultSource={require('../assets/icon/loading.gif')} source={this.state.scaleimage} />
          </TouchableOpacity>
        </Animated.View>

      </View >
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header} >
        <View style={{ flex: 0.2, justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15 }} activeOpacity={1} onPress={this.props.onPress} >
            <Icon name='angle-left' size={this.props.size} color='#6E6E6E' type='font-awesome' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, lineHeight: 23, fontWeight: 'bold', color: '#818181' }}>回憶錄</Text>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>

        </View>
      </View >
    )
  }
}

function ListHeader(header, screenHeight, order) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', height: screenHeight * 0.25, backgroundColor: '#E5E5E5' }} >
      <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '70%', borderRadius: '50%', aspectRatio: 1, overflow: 'hidden' }} >
          {order > 2 ?
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: header.headimg }} />
            :
            <Image style={{ width: '100%', height: '100%' }} source={header.headimg} />
          }
        </View>
      </View>
      <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' }}>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 18, lineHeight: 21, color: '#818181' }}>{header.title}</Text>
        </View>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>{header.description}</Text>
        </View>
        <View style={{ width: '80%', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>{header.time}</Text>
        </View>
      </View>
    </View>
  )
}

function PhotoBlock(buffer, screenWidth, order, fun) {
  if (order < 3) {
    return (
      <View style={{ width: screenWidth / 2, aspectRatio: 1, padding: 1 }}>
        <TouchableOpacity onPress={fun}>
          <Image style={{ width: '100%', height: '100%' }} source={buffer.photo} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={{ width: screenWidth / 2, aspectRatio: 1, padding: 1 }}>
        <TouchableOpacity onPress={fun}>
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: buffer.photo }} />
        </TouchableOpacity>
      </View>
    )
  }
}

class Block extends React.Component {
  render() {
    const { style, image, description } = this.props
    return (
      <TouchableOpacity style={[{ width: 90, height: 120, alignItems: 'center', borderRadius: '40%' }, style]} activeOpacity={1} onPress={this.props.onPress} >
        <View style={{ width: 70, marginTop: 5, aspectRatio: 1, borderRadius: '50%', overflow: 'hidden' }}>
          {this.props.change ?
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: image }} />
            :
            <Image style={{ width: '100%', height: '100%' }} source={image} />
          }
        </View>
        <View style={{ padding: 5, width: 80, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#FFF' }} >{description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

function AddBlock(buffer, screenWidth) {
  return (
    <View style={{ width: screenWidth / 3, aspectRatio: 1, padding: 1 }}>
      <Image style={{ width: '100%', height: '100%' }} source={{ uri: buffer.uri }} />
    </View>
  )
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
