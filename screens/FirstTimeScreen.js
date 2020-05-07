import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Animated, Easing, Keyboard, TextInput, StatusBar, Dimensions, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import FireBaseManager from '../components/FireBaseManager'
import { render } from 'react-dom';

export default class FirstTimeScreen extends React.Component {

  firebase = FireBaseManager.getInstance();

  backiconsize = 50;
  screenWidth = Dimensions.get('screen').width;
  screenHeight = Dimensions.get('screen').height;

  static navigationOptions = {
    header: null,
  };

  state = {

  }

  render() {
    const { screenWidth, screenHeight } = this
    return (
      <View style={[styles.container, { backgroundColor: '#F4EDE9' }]}>

        <ScrollView horizontal={true} bounces={false} pagingEnabled={true} showsHorizontalScrollIndicator={false} >

          <View style={{ width: screenWidth, height: '80%' }} >
            <View style={{ width: screenWidth, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
              <Image style={{ width: screenWidth, resizeMode: 'contain' }} source={require('../assets/images/loading.png')} />
            </View>

          </View>

          <View style={{ width: screenWidth }} >
            <Text>2</Text>
          </View>

        </ScrollView>

        <View style={{ position: 'absolute', width: screenWidth, height: '25%', bottom: 0 }} >
          <View style={{ flex: 0.2 }} >

          </View>
          <View style={{ flex: 0.4, alignItems: 'center', }} >
            <TouchableOpacity style={{ width: '90%', height: '80%', backgroundColor: '#8AC4C4', borderRadius: '50%' }} activeOpacity={0.8} >
              <Text></Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.4, alignItems: 'center', }} >
            <TouchableOpacity style={{ width: '90%', height: '80%', backgroundColor: '#C4C4C4', borderRadius: '50%' }} activeOpacity={0.8} >
              <Text></Text>
            </TouchableOpacity>
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
