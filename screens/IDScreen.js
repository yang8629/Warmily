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
