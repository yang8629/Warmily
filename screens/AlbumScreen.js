import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import FireBaseManager from '../components/FireBaseManager'
import { render } from 'react-dom';

export default class AlbumScreen extends React.Component {

  firebase = FireBaseManager.getInstance();

  backiconsize = 50;
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;

  static navigationOptions = {
    header: null,
  };

  state = {

  }

  photos = [{
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
  },]

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _gobackScreen = () => {
    this.props.navigation.navigate('home')
    // this.props.navigation.goBack()
  }

  _changeCollect = (buffer) => {
    this.setState({ nowcollect: buffer })
  }

  render() {
    const { screenWidth, screenHeight } = this
    return (
      <View style={[styles.container, { backgroundColor: '#E4DBD5' }]}>

        <Header size={this.backiconsize} type={null} onPress={() => this._gobackScreen()} hintPage={() => this._toggleHintpage()} />

        <View style={{ flex: 0.9, alignItems: 'center' }}>

          <FlatList style={{ backgroundColor: '#E5E5E5' }} data={this.photos} numColumns={2} ListHeaderComponent={() => ListHeader(screenHeight)} keyExtractor={(item, index) => { return index.toString(); }} renderItem={(buffer) => PhotoBlock(buffer.item, screenWidth)} />

          <View style={[styles.shadow, { position: 'absolute', right: '10%', bottom: '10%' }]} >
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}  >
              <Icon name='plus-circle' type='font-awesome' size={60} color='#CCCCCC' />
              <View style={{ position: 'absolute', width: 30, height: 30, backgroundColor: '#FFF', zIndex: -1 }} />
            </TouchableOpacity>
          </View>
          
        </View>

      </View>
    );
  }
}

function ListHeader(screenHeight) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', height: screenHeight * 0.25, backgroundColor: '#E5E5E5' }} >
      <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '70%', borderRadius: '50%', aspectRatio: 1, overflow: 'hidden' }} >
          <Image style={{ width: '100%', height: '100%' }} source={require('../assets/Album/head.png')} />
        </View>
      </View>
      <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' }}>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 18, lineHeight: 21, color: '#818181' }}>阿里山出遊</Text>
        </View>
        <View style={{ width: '80%', marginBottom: 5 }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>我們一家去阿里山看櫻花，阿花第一次坐火車特別興奮，阿力吃了火車便當就徹底愛上了。</Text>
        </View>
        <View style={{ width: '80%', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, lineHeight: 14, color: '#818181' }}>2020/03/19</Text>
        </View>
      </View>
    </View>
  )
}

function PhotoBlock(buffer, screenWidth) {
  return (
    <View style={{ width: screenWidth / 2, aspectRatio: 1, padding: 1 }}>
      <Image style={{ width: '100%', height: '100%' }} source={buffer.photo} />
    </View>
  )
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header} >
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1} onPress={this.props.onPress} >
            <Icon name='angle-left' size={this.props.size} color='#6E6E6E' type='font-awesome' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, lineHeight: 23, fontWeight: 'bold', color: '#818181' }}>回憶錄</Text>
          </View>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 30, marginLeft: 15, justifyContent: 'center' }} activeOpacity={1}>
            <Icon name='ellipsis-h' size={25} color='#AFAFAF' type='font-awesome' />
          </TouchableOpacity>
        </View>
      </View >
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
