import { createStackNavigator, creatSwitchNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Dimensions } from 'react-native';


import CollectScreen from '../screens/CollectScreen';
import StoryScreen from '../screens/StoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import CameraScreen from '../screens/CameraScreen';
import LoginScreen from '../screens/LoginScreen';
import ShareScreen from '../screens/ShareScreen';
import RegistereScreen from '../screens/RegistereScreen';
import IssueScreen from '../screens/IssueScreen';
import IcebergScreen from '../screens/IcebergScreen';
import SettingScreen from '../screens/SettingScreen';
import LoadingScreen from '../screens/LoadingScreen';
import SelectScreen from '../screens/SelectScreen';
import MemoirScreen from '../screens/MemoirScreen';
import IDScreen from '../screens/IDScreen';
import GuideScreen from '../screens/GuideScreen';
import FamilyScreen from '../screens/FamilyScreen';
import NotifyScreen from '../screens/NotifyScreen';
import QuestScreen from '../screens/QuestScreen';

import FireBaseManager from '../components/FireBaseManager';


const mainStack = createStackNavigator();
const loginStack = createStackNavigator();
const homeStack = createStackNavigator();
const FireBase = FireBaseManager.getInstance()
var firsttime = FireBase._getFirsttime()
const INITIAL_ROUTE_NAME = firsttime ? 'firstscreen' : 'loginstack'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function StackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });


  return (
    <mainStack.Navigator initialRouteName={'loginstack'} headerMode='none'>
      <mainStack.Screen
        name="loginstack"
        component={LoginStackNavigator}
      />
      <mainStack.Screen
        name="homestack"
        component={HomeStackNavigator}
      />
      <mainStack.Screen
        name="loading"
        component={LoadingScreen}
      />
      <mainStack.Screen
        name="collect"
        component={CollectScreen}
      />
      <mainStack.Screen
        name="chat"
        component={ChatScreen}
      />
      <mainStack.Screen
        name="setting"
        component={SettingScreen}
      />
      <mainStack.Screen
        name="iceberg"
        component={IcebergScreen}
      />
      <mainStack.Screen
        name="notify"
        component={NotifyScreen}
      />
      <mainStack.Screen
        name="quest"
        component={QuestScreen}
      />
    </mainStack.Navigator>
  );
}

function LoginStackNavigator({ navigation, route }) {
  return (
    <loginStack.Navigator initialRouteName={'guide'} headerMode='none' >
      <loginStack.Screen
        name="share"
        component={ShareScreen}
      />
      <loginStack.Screen
        name="registere"
        component={RegistereScreen}
      />
      <loginStack.Screen
        name="family"
        component={FamilyScreen}
      />
      <loginStack.Screen
        name="guide"
        component={GuideScreen}
      />
      <loginStack.Screen
        name="login"
        component={LoginScreen}
      />
      <loginStack.Screen
        name="select"
        component={SelectScreen}
      />
      <loginStack.Screen
        name="id"
        component={IDScreen}
      />
    </loginStack.Navigator>
  )
}

function HomeStackNavigator({ navigation, route }) {
  return (
    <homeStack.Navigator initialRouteName={'home'} headerMode='none' mode='modal' >
      <homeStack.Screen
        name="home"
        component={HomeScreen}
      />
      <homeStack.Screen
        name="story"
        component={StoryScreen}
        options={{
          gestureResponseDistance: { horizontal: 0, vertical: screenHeight * 0.6 }
        }}
      />
      <homeStack.Screen
        name="memoir"
        component={MemoirScreen}
      />
      <mainStack.Screen
        name="camera"
        component={CameraScreen}
      />
    </homeStack.Navigator>
  )
}

// function getHeaderTitle(route) {
//   const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case 'Home':
//       return 'How to get started';
//     case 'Links':
//       return 'Links to learn more';
//   }
// }
