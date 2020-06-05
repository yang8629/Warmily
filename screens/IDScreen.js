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

  _goBack = () => {
    this.props.navigation.goBack()
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
        <View style={{ marginTop: 20 }} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.2 }}>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={1} onPress={() => this._goBack()} >
                  <Icon name='angle-left' size={40} color='#6E6E6E' type='font-awesome' />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.6, alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#6E6E6E', fontSize: 18 }}>選擇你的身分</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.6, width: '80%', alignSelf: 'center', alignItems: 'center', }} >
            <View style={{ flex: 0.5, justifyContent: 'flex-end' }} >
              <TouchableOpacity style={[{ flexDirection: 'row', width: '90%', aspectRatio: 2, borderRadius: 20, marginBottom: '5%', backgroundColor: this.state.id == 2 ? '#9BD0D0' : 'white', alignItems: 'center', justifyContent: 'center' }, styles.shadow]} onPress={() => this._choseID(2)} activeOpacity={0.8} >
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ height: '60%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/images/id1.png')} />
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-start' }} >
                  <Text style={{ marginLeft: '10%', fontSize: 16, lineHeight: 19, color: this.state.id == 2 ? 'white' : '#6E6E6E' }} >家長</Text>
                </View>

              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'flex-start' }} >
              <TouchableOpacity style={[{ flexDirection: 'row', width: '90%', aspectRatio: 2, borderRadius: 20, marginTop: '5%', backgroundColor: this.state.id == 1 ? '#9BD0D0' : 'white', alignItems: 'center', justifyContent: 'center' }, styles.shadow]} onPress={() => this._choseID(1)} activeOpacity={0.8} >
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} >
                  <Image style={{ height: '60%', aspectRatio: 1, resizeMode: 'contain' }} source={require('../assets/images/id2.png')} />
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-start' }} >
                  <Text style={{ marginLeft: '10%', fontSize: 16, lineHeight: 19, color: this.state.id == 1 ? 'white' : '#6E6E6E' }} >小孩</Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 0.2 }} >

          </View>

        </View>

        <TouchableOpacity style={[{ position: 'absolute', width: '80%', height: '8%', borderRadius: '50%', backgroundColor: '#8AC4C4', bottom: '5%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }, styles.shadow]} activeOpacity={0.8} onPress={() => this._nextstep()} >
          <Text style={{ fontSize: 18, lineHeight: 21, color: 'white' }} >開始</Text>
        </TouchableOpacity>

      </View>
    );
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
