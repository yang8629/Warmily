import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager';
import { render } from 'react-dom';
import { StackActions } from '@react-navigation/native';

export default class IDScreen extends React.Component {

  FireBase = FireBaseManager.getInstance();

  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      id: null
    }
  }

  _choseID = (id) => {
    this.setState({ id })
  }

  _nextstep = () => {
    this.FireBase._setID(this.state.id)
    this.props.navigation.dispatch(
      StackActions.replace('homestack')
    );
  }

  render() {
    const { screenWidth, screenHeight } = this
    return (
      <View style={[styles.container, { backgroundColor: '#F4EDE9' }]}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flex: 0.4, width: '80%' }} >
            <View style={{ flex: 0.2, justifyContent: 'flex-end' }} >
              <Text style={{ fontSize: 18, lineHeight: 21, color: '#6E6E6E' }} >你的身分:</Text>
            </View>
            <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ flex: 0.5 }} >
                <TouchableOpacity style={{ width: '90%', aspectRatio: 0.9, borderRadius: 20, backgroundColor: this.state.id == 2 ? '#9BD0D0' : 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._choseID(2)} activeOpacity={0.8} >

                  <Image style={{ height: '60%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/images/id1.png')} />
                  <View style={{ alignItems: 'center', marginTop: '5%' }} >
                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#6E6E6E' }} >家長</Text>
                  </View>

                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }} >
                <TouchableOpacity style={{ width: '90%', aspectRatio: 0.9, borderRadius: 20, backgroundColor: this.state.id == 1 ? '#9BD0D0' : 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._choseID(1)} activeOpacity={0.8} >

                  <Image style={{ height: '60%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/images/id2.png')} />
                  <View style={{ alignItems: 'center', marginTop: '5%' }} >
                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#6E6E6E' }} >小孩</Text>
                  </View>

                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        <TouchableOpacity style={{ position: 'absolute', width: '80%', height: '8%', borderRadius: '50%', backgroundColor: '#8AC4C4', bottom: '5%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.8} onPress={() => this._nextstep()} >
          <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }} >開始</Text>
        </TouchableOpacity>

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
