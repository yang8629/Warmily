import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView, Dimensions, Animated, Keyboard, Platform, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Video } from 'expo-av';
import FireBaseManager from '../components/FireBaseManager'

export default class StorysScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    firebase = FireBaseManager.getInstance()
    screenWidth = Dimensions.get('screen').width;
    screenHeight = Dimensions.get('screen').height;
    nextstory = null;
    laststory = null;

    story = [{
        who: 'mom',
        head: require('../assets/images/f11.png'),
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/aa.png'),
            time: 4
        },
            // {
            //     backgroundImage: require('../assets/images/story1.png'),
            //     time: 8
            // }
        ],
        starttimer: null,
        backgroundswitcher: null,
        message: [
            //     {
            //     headImg: '',
            //     text: '我肯定'
            // }, {
            //     headImg: '',
            //     text: '在幾百年前'
            // }, {
            //     headImg: '',
            //     text: '就說過愛你'
            // }, {
            //     headImg: '',
            //     text: '只是你忘了'
            // },
        ]
    }, {
        who: 'dad',
        head: require('../assets/images/f21.png'),
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/story1.png'),
            time: 5,
        }, {
            backgroundImage: require('../assets/images/story.png'),
            time: 4,
        }, {
            backgroundImage: require('../assets/images/aa.png'),
            time: 3,
        }],
        starttimer: null,
        backgroundswitcher: null,
        message: [{
            headImg: '',
            text: '小花會走路了喔!'
        }, {
            headImg: '',
            text: '我帶他去公園玩'
        }, {
            headImg: '',
            text: '我好想看到他'
        }, {
            headImg: '',
            text: '哪裡的公園阿'
        },]
    }, {
        who: 'sister',
        head: require('../assets/images/f31.png'),
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/story.png'),
            time: 5,
        }, {
            backgroundImage: require('../assets/images/story1.png'),
            time: 4,
        }, {
            backgroundImage: require('../assets/images/aa.png'),
            time: 3,
        }],
        starttimer: null,
        backgroundswitcher: null,
        message: [{
            headImg: '',
            text: '只是你忘了'
        }, {
            headImg: '',
            text: '我也沒記起'
        }, {
            headImg: '',
            text: '走過 路過 沒遇過'
        }, {
            headImg: '',
            text: '回頭轉頭還是錯'
        },]
    }, {
        who: 'brother',
        head: require('../assets/images/f41.png'),
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/story1.png'),
            time: 5,
        }, {
            backgroundImage: require('../assets/images/story.png'),
            time: 4,
        }, {
            backgroundImage: require('../assets/images/aa.png'),
            time: 3,
        }],
        starttimer: null,
        backgroundswitcher: null,
        message: [{
            headImg: '',
            text: '你我不曾感受過'
        }, {
            headImg: '',
            text: '相撞在街口'
        }, {
            headImg: '',
            text: '相撞在街口'
        }, {
            headImg: '',
            text: '妳媽沒有告訴你'
        },]
    }, {
        who: 'grandma',
        head: require('../assets/images/f51.png'),
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/story1.png'),
            time: 5,
        }, {
            backgroundImage: require('../assets/images/story.png'),
            time: 4,
        }, {
            backgroundImage: require('../assets/images/aa.png'),
            time: 3,
        }],
        starttimer: null,
        backgroundswitcher: null,
        message: [{
            headImg: '',
            text: '你我不曾感受過'
        }, {
            headImg: '',
            text: '相撞在街口'
        }, {
            headImg: '',
            text: '相撞在街口'
        }, {
            headImg: '',
            text: '妳媽沒有告訴你'
        },]
    },]

    nowstory = 0;
    head_x = -160;
    story_x = 0;
    intervaltime = 0.1;
    scrollEnabled = true;



    _calltimer = null;
    _resettimer = null

    order = [0, 1, 2, 3, 4]


    constructor(props) {
        super(props)
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this._showKeyboard);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this._hidKeyboard);
        this.nowstory = this._reloadMyStory()
        this.state = {
            ondrag: false,
            onpress: false,
            move_y: new Animated.Value(0),
            memberamount: 5,
            reload: false,
            nowindex: 0,
            time: 0,
            count: true,
            stoptimer: false,
        };
    }

    _reloadMyStory = () => {
        const mystory = this.firebase._getStory()
        const first = this.firebase._switchFirst()
        if (mystory) {
            buffer = mystory.length
            mystory.map((buffer, index) => {
                var time = 5
                var video = false
                if (buffer.mediaType == 'video') {
                    time = buffer.duration - 0.3
                    video = true
                }
                this.story[0].storys.push({
                    video: video,
                    uritype: true,
                    backgroundImage: buffer.uri,
                    time: time,
                })
            })
            if (first) {
                return buffer
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

    componentDidMount = () => {
        this.story[0].reading = true
        this._calltimer()
    }

    componentWillUnmount = () => {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        if (this._calltimer != null) {
            clearInterval(this._calltimer)
        }
    }

    _gobackHomeScreen = () => {
        this.props.navigation.navigate('Home');
    }

    _showKeyboard = () => {
        Animated.timing(
            this.state.move_y, {
            toValue: -260,
            duration: 300,
            useNativeDriver: true,
        }
        ).start();
    }

    _hidKeyboard = () => {
        Animated.timing(
            this.state.move_y, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }
        ).start();
        this._stopTimer(false)
    }

    //設定限時的Timer()
    _setTimer = (fun, fun2) => {
        this._calltimer = fun
        this._resettimer = fun2
    }

    //設定當前點擊畫面左右邊控制的對象
    _setPressfun = (fun) => {
        this.setState({ pressfun: fun })
    }

    //設定個人限時切換器
    _setbackgroundSwitcher = (index, fun) => {
        this.story[index].backgroundswitcher = fun
    }

    _ondragStory = (event) => {
        if (this.state.ondrag == false) {
            this.setState({
                ondrag: true,
                onpress: false,
            })
        }
    }
    //滑動換頁
    _enddragStory = (event) => {

        if (this.state.ondrag == true) {
            before = this.state.nowindex
            this.story_x = event.nativeEvent.contentOffset.x;
            this.nowindex = event.nativeEvent.contentOffset.x / this.screenWidth;
            if (this.nowindex != before) {
                this._resettimer(this.story[this.state.nowindex].storys[0].time)
                this._switchBackgroundimage(0)
                this._nextStory(this.nowindex - before)
            }
            this.setState({
                ondrag: false,
                stoptimer: false,
                nowindex: this.nowindex
            })
        }

    }
    //點擊頭像換頁
    _pressHead = (index) => {
        if (index != this.state.nowindex) {
            this._nextStory(index - this.state.nowindex)
        }
    }
    //變換當前播放者
    _switchMember = (index) => {
        if (this.state.nowindex == 0 && index == -1) {
            index = 0
        }
        // else if (this.state.nowindex == this.state.memberamount - 1 && index == 1) {

        //     return null
        //     // return this._gobackHomeScreen()

        // } 
        else if (index != 0) {
            this.story_x += this.screenWidth * index;
            this.ScrollStory.scrollTo({ x: this.story_x, y: 0 });
            this.scrollEnabled = false
            // setTimeout(() => this.scrollEnabled = true, 200)
        }
    }
    //新增留言
    _addMessage = (index, text) => {
        this.story[index].message.push({
            headImg: '',
            text: text,
        })
    }
    //切換下一個撥放者
    _nextStory = async (buffer) => {

        let nowindex = this.state.nowindex + buffer

        if (nowindex < this.story.length && nowindex >= 0) {
            length = this.order.length

            for (let index = 0; index < length; index++) {
                this.order[index] += buffer
                this.order[index] %= this.state.memberamount
                if (this.order[index] < 0) {
                    this.order[index] += 5
                }
            }

            this.story[nowindex - buffer].reading = false
            this.story[nowindex].reading = true

            if (!this.state.ondrag) {
                // this._switchMember(buffer)
                if (this.state.nowindex == 0 && buffer == -1) {
                    buffer = 0
                } else if (buffer != 0) {
                    this.story_x += this.screenWidth * buffer;
                    await this.ScrollStory.scrollTo({ x: this.story_x, y: 0 });
                    this.scrollEnabled = false
                    setTimeout(() => this.scrollEnabled = true, 200)
                }
            }

            this.setState({ nowindex: nowindex })
            this._resettimer(this.story[nowindex].storys[0].time)
            await this._calltimer()
        }
    }

    //點擊觸發
    _pressStory = (buffer) => {
        this.state.pressfun(buffer)
    }

    //切換背景圖
    _switchBackgroundimage = (buffer) => {
        this.story[this.state.nowindex].backgroundswitcher(buffer)
    }

    _stopTimer = (buffer) => {
        this.setState({
            stoptimer: buffer
        })
    }

    render() {
        const { move_y } = this.state;
        const storys = this.story.map((buffer, index) => {
            return (
                <StoryBackGround key={index} index={index} story={buffer} move_y={move_y} screenWidth={this.screenWidth} screenHeight={this.screenHeight} switchStory={(aa) => this._pressStory(aa)} addMessage={(index, text) => this._addMessage(index, text)} setbackgroundSwitcher={(fun) => this._setbackgroundSwitcher(index, fun)} stoptimer={(x) => this._stopTimer(x)} nowstory={this.nowstory} />
            )
        })
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} pagingEnabled={true} decelerationRate='fast' onScroll={() => this.setState({ stoptimer: true })} onMomentumScrollBegin={(event) => { this._ondragStory(event) }} onMomentumScrollEnd={(event) => this._enddragStory(event)} ref={scrollview => { this.ScrollStory = scrollview }} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' scrollEnabled={this.scrollEnabled} scrollEventThrottle={16} >
                    {storys}
                </ScrollView>

                <View style={{ position: 'absolute' }}>
                    <View style={{ width: this.screenWidth, height: 100 }}>
                        <View style={{ flexDirection: 'row', width: '80%', marginTop: 30, zIndex: 1, justifyContent: 'space-around', alignSelf: 'center' }}>

                            <View style={{ flex: 0.1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._pressHead(this.order[3])} activeOpacity={1}>
                                    <View style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: 50, height: 50, }} source={this.story[this.order[3]].head} />
                                        {/* <Text style={{ position: 'absolute', color: 'white' }}> {this.order[3]}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._pressHead(this.order[4])} activeOpacity={1}>
                                    <View style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: 50, height: 50, }} source={this.story[this.order[4]].head} />
                                        {/* <Text style={{ position: 'absolute', color: 'white' }}> {this.order[4]}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <Head index={this.order[0]} nowstory={this.nowstory} style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }} storys={this.story[this.state.nowindex].storys} head={this.story[this.state.nowindex].head} storyamount={this.story[this.state.nowindex].storys.length} stoptimer={this.state.stoptimer} reading={this.story[this.state.nowindex].reading} nextstory={(i) => this._nextStory(i)} setpressfun={(fun) => this._setPressfun(fun)} switchBackgroundimage={(bb) => this._switchBackgroundimage(bb)} settimer={(fun, fun2) => this._setTimer(fun, fun2)} />

                            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._pressHead(this.order[1])} activeOpacity={1}>
                                    <View style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: 50, height: 50, }} source={this.story[this.order[1]].head} />
                                        {/* <Text style={{ position: 'absolute', color: 'white' }}> {this.order[1]}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._pressHead(this.order[2])} activeOpacity={1}>
                                    <View style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: 50, height: 50, }} source={this.story[this.order[2]].head} />
                                        {/* <Text style={{ position: 'absolute', color: 'white' }}> {this.order[2]}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: this.screenWidth / 6, minWidth: 65, height: '100%', alignSelf: 'center', position: 'absolute', borderBottomEndRadius: '50%', borderBottomStartRadius: '50%', zIndex: 0, overflow: 'hidden' }}>
                            <LinearGradient start={[0.8, 0]} end={[0.2, 1]} colors={['rgba(196, 196, 196, 0)', 'rgba(235, 235, 235, 0.44)', '#FFFFFF']} style={{ width: '100%', height: '100%', alignSelf: 'center', paddingTop: 40, }} />
                        </View>
                    </View>
                </View>
                {/* <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, marginLeft: 10, marginTop: 10 }} onPress={() => this._gobackHomeScreen()}>
                    <Icon name='close' size={40} color='white' iconStyle={styles.shadow} />
                </TouchableOpacity> */}
            </View >
        );
    }
}

class StoryBackGround extends React.Component {

    storys = this.props.story.storys;

    constructor(props) {
        super(props)
        if (props.index == 0) {
            this.state = {
                video: this.storys[props.nowstory].video,
                uritype: this.storys[props.nowstory].uritype,
                backgroundImage: this.storys[props.nowstory].backgroundImage,
                text: null,
                longpress: false,
                play: false,
            }
        } else {
            this.state = {
                video: false,
                uritype: false,
                backgroundImage: this.storys[0].backgroundImage,
                text: null,
                longpress: false,
                play: false,
            }
        }
    }

    componentDidMount = () => {
        this.props.setbackgroundSwitcher((buffer) => this._backgroundSwitcher(buffer))
        this.messageScroll.scrollToEnd()
    }

    _inputText = (text) => {
        this.setState({
            text: text,
        })
    }

    _sentText = () => {
        const { index, addMessage } = this.props;
        const { text } = this.state;

        if (text != null) {
            addMessage(index, text);
            this.input.clear();
            this.setState({
                text: null,
            })
        }
    }

    _backgroundSwitcher = (buffer) => {
        this.setState({
            video: this.storys[buffer].video,
            uritype: this.storys[buffer].uritype,
            backgroundImage: this.storys[buffer].backgroundImage,
        })
    }

    _onPress = (buffer) => {
        if (!this.state.longpress) {
            this.props.switchStory(buffer)
        } else {
            this.setState({ longpress: false })
        }
    }

    render() {
        const { move_y, screenWidth, screenHeight } = this.props;
        const { message } = this.props.story;
        const presswidth = screenWidth * 0.4;
        const Messages = message.map((buffer, index) => {
            return (
                <Message key={index} text={buffer.text} />
            )
        })
        return (
            <View>
                {this.state.video ?
                    <View>
                        <Video style={[{ width: screenWidth, height: screenHeight }]} source={{ uri: this.state.backgroundImage }} shouldPlay={this.state.play} onLoad={() => this.setState({ play: true })} />

                        <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: -260, width: screenWidth, zIndex: 2 }}>
                            <Animated.View style={{ transform: [{ translateY: move_y }] }}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={{ height: screenHeight / 3, paddingHorizontal: 40 }}>
                                    <ScrollView style={{ marginBottom: 70 }} onContentSizeChange={() => this.messageScroll.scrollToEnd()} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='none' ref={scroll => this.messageScroll = scroll} bounces={false} >
                                        {Messages}
                                    </ScrollView>
                                    <View style={{ flexDirection: 'row', width: '100%', bottom: 20, position: 'absolute', alignSelf: 'center', zIndex: 4 }}>
                                        <TextInput style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, fontSize: 16, lineHeight: 19, paddingHorizontal: 20, paddingVertical: 10, color: 'white' }} placeholder='請輸入...' placeholderTextColor='white' onChangeText={(text) => this._inputText(text)} onFocus={() => this.props.stoptimer(true)} ref={(inputtext) => { this.input = inputtext }} />
                                        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15 }} onPress={() => this._sentText()} >
                                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/sent.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </LinearGradient>
                                <Animated.View style={{ width: screenWidth, height: 260, backgroundColor: 'rgba(0,0,0,0.6)' }} />
                            </Animated.View>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, left: 0, zIndex: 1 }} onPress={() => this._onPress(-1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                        <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, right: 0, zIndex: 1 }} onPress={() => this._onPress(1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                    </View>
                    :
                    <View>
                        {this.state.uritype ?
                            <ImageBackground style={{ width: screenWidth, height: screenHeight }} source={{ uri: this.state.backgroundImage }} >
                                <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: -260, width: screenWidth, zIndex: 2 }}>
                                    <Animated.View style={{ transform: [{ translateY: move_y }] }}>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={{ height: screenHeight / 3, paddingHorizontal: 40 }}>
                                            <ScrollView style={{ marginBottom: 70 }} onContentSizeChange={() => this.messageScroll.scrollToEnd()} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='none' ref={scroll => this.messageScroll = scroll} bounces={false} >
                                                {Messages}
                                            </ScrollView>
                                            <View style={{ flexDirection: 'row', width: '100%', bottom: 20, position: 'absolute', alignSelf: 'center', zIndex: 4 }}>
                                                <TextInput style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, fontSize: 16, lineHeight: 19, paddingHorizontal: 20, paddingVertical: 10, color: 'white' }} placeholder='請輸入...' placeholderTextColor='white' onChangeText={(text) => this._inputText(text)} onFocus={() => this.props.stoptimer(true)} ref={(inputtext) => { this.input = inputtext }} />
                                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15 }} onPress={() => this._sentText()} >
                                                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/sent.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                        <Animated.View style={{ width: screenWidth, height: 260, backgroundColor: 'rgba(0,0,0,0.6)' }} />
                                    </Animated.View>
                                </View>
                                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, left: 0, zIndex: 1 }} onPress={() => this._onPress(-1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, right: 0, zIndex: 1 }} onPress={() => this._onPress(1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                            </ImageBackground >
                            :
                            <ImageBackground style={{ width: screenWidth, height: screenHeight }} source={this.state.backgroundImage}  >
                                <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: -260, width: screenWidth, zIndex: 2 }}>
                                    <Animated.View style={{ transform: [{ translateY: move_y }] }}>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={{ height: screenHeight / 3, paddingHorizontal: 40 }}>
                                            <ScrollView style={{ marginBottom: 70 }} onContentSizeChange={() => this.messageScroll.scrollToEnd()} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='none' ref={scroll => this.messageScroll = scroll} bounces={false} >
                                                {Messages}
                                            </ScrollView>
                                            <View style={{ flexDirection: 'row', width: '100%', bottom: 20, position: 'absolute', alignSelf: 'center', zIndex: 4 }}>
                                                <TextInput style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, fontSize: 16, lineHeight: 19, paddingHorizontal: 20, paddingVertical: 10, color: 'white' }} placeholder='請輸入...' placeholderTextColor='white' onChangeText={(text) => this._inputText(text)} onFocus={() => this.props.stoptimer(true)} ref={(inputtext) => { this.input = inputtext }} />
                                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 15 }} onPress={() => this._sentText()} >
                                                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../assets/icon/sent.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                        <Animated.View style={{ width: screenWidth, height: 260, backgroundColor: 'rgba(0,0,0,0.6)' }} />
                                    </Animated.View>
                                </View>
                                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, left: 0, zIndex: 1 }} onPress={() => this._onPress(-1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, right: 0, zIndex: 1 }} onPress={() => this._onPress(1)} onLongPress={() => this.setState({ longpress: true, play: false })} onPressIn={() => this.props.stoptimer(true)} onPressOut={() => [this.props.stoptimer(false), this.setState({ longpress: false, play: true })]} />
                            </ImageBackground >
                        }
                    </View>
                }
            </View>
        )
    }
}

class Message extends React.Component {
    render() {
        return (
            <View style={[{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }, this.props.style]}>
                <Image style={{ width: 36, height: 36, borderRadius: 18 }} source={require('../assets/images/f12.png')} />
                <View style={{ marginLeft: 40, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

class Head extends React.Component {

    storyamount = this.props.storyamount
    intervaltime = 0.1

    constructor(props) {
        super(props)
        props.settimer(() => this._setTimer(), (buffer) => this._reSettimer(buffer))
        props.setpressfun((buffer) => this._pressStory(buffer))

        if (props.index == 0) {
            this.state = {
                time: 0,
                nowstory: props.nowstory,
                nowlength: this.props.storys[0].time,
                totaltime: 0,
                reload: false,
                _calltimer: null
            }
        } else {
            this.state = {
                time: 0,
                nowstory: 0,
                nowlength: this.props.storys[0].time,
                totaltime: 0,
                reload: false,
                _calltimer: null
            }
        }
    }

    componentWillUnmount = () => {
        if (this.state._calltimer != null) {
            clearInterval(this.state._calltimer)
        }
    }



    _pressStory = (buffer) => {
        if (buffer == -1) {
            now = this.state.nowstory - 1
            if (now < 0) {
                this.setState({
                    time: 0,
                })
                this.props.nextstory(-1)
            } else {
                this.setState({
                    nowstory: now,
                    nowlength: this.props.storys[now].time,
                    time: 0,
                })
                this.props.switchBackgroundimage(now)
            }
        } else {
            now = this.state.nowstory + 1
            if (now < this.storyamount) {
                this.setState({
                    nowstory: now,
                    nowlength: this.props.storys[now].time,
                    time: 0,
                })
                this.props.switchBackgroundimage(now)
            } else {
                this.props.switchBackgroundimage(0)
                clearInterval(this.state._calltimer)
                this.setState({
                    _calltimer: null,
                    time: 0,
                    nowstory: 0
                })
                this.props.nextstory(1)
            }
        }
    }

    _setTimer = async () => {
        this.state._calltimer = await setInterval(() => this._Timer(), this.intervaltime * 1000)
    }

    _reSettimer = (buffer) => {
        if (this.state._calltimer != null) {

            clearInterval(this.state._calltimer)
            this.setState({
                _calltimer: null,
                time: 0,
                nowstory: 0,
                nowlength: buffer,
            })

        } else {
            this.setState({
                nowlength: buffer,
            })
        }
    }

    _Timer = () => {
        if (!this.props.stoptimer) {
            time = this.state.time
            if (time >= this.state.nowlength) {
                now = this.state.nowstory + 1
                this.setState({
                    time: 0,
                    nowstory: now,
                    totaltime: this.state.totaltime + this.state.nowlength,
                })
                if (now < this.storyamount) {
                    this.props.switchBackgroundimage(now)
                    this.setState({
                        nowlength: this.props.storys[now].time
                    })
                }
            } else {
                this.setState({
                    time: time + this.intervaltime,
                })
            }
            if (now >= this.storyamount) {
                clearInterval(this.state._calltimer)
                this.setState({
                    _calltimer: null,
                    time: 0,
                    nowstory: 0
                })
                this.props.nextstory(1)
            }
        }
    }

    _createBar = (storyamount) => {
        bar = []
        angle = 360 / storyamount - 10
        now = this.state.nowstory
        progress = this.state.time * 100 / this.state.nowlength

        if (this.storyamount != storyamount) {
            this.storyamount = storyamount
        }

        for (let index = 0; index < storyamount; index++) {
            if (index == now) {
                fill = progress
            } else if (index < now) {
                fill = 100
            } else {
                fill = 0
            }
            if (index == 0) {
                bar.push(<AnimatedCircularProgress key={index} rotation={5} arcSweepAngle={angle} lineCap='round' size={60} width={3} fill={fill} tintColor='#E89185' backgroundColor="#C4C4C4" duration={100} >
                    {
                        (fill) => (
                            <TouchableOpacity style={{ width: 57, height: 57, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} activeOpacity={1} >
                                <Image style={{ width: 57, height: 57, }} source={this.props.head} />
                            </TouchableOpacity>
                        )
                    }
                </AnimatedCircularProgress>)
            } else {
                bar.push(<AnimatedCircularProgress key={index} rotation={5 + (angle + 10) * index} arcSweepAngle={angle} lineCap='round' size={60} width={3} fill={fill} tintColor='#E89185' backgroundColor="#C4C4C4" style={{ position: 'absolute' }} duration={100} />)
            }
        }

        return bar
    }

    render() {
        const { reading, storyamount, time } = this.props;
        return (
            <View style={[this.props.style, this.props.index == 0 && { marginLeft: 0 }]}>
                <TouchableOpacity activeOpacity={1}>
                    {this._createBar(storyamount)}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
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
