import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView, Dimensions, Animated, Keyboard, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Easing } from 'react-native';


export default class StorysScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    screenWidth = Dimensions.get('screen').width;
    screenHeight = Dimensions.get('screen').height;
    nextstory = null;
    laststory = null;


    storys = [{
        onWatch: true,
        backgroundImage: require('../assets/images/aa.png'),
        message: [{
            headImg: '',
            text: '我肯定'
        }, {
            headImg: '',
            text: '在幾百年前'
        }, {
            headImg: '',
            text: '就說過愛你'
        }, {
            headImg: '',
            text: '只是你忘了'
        },]
    }, {
        onWatch: false,
        backgroundImage: require('../assets/images/story.png'),
        message: [{
            headImg: '',
            text: '我也沒記起'
        }, {
            headImg: '',
            text: '我肯定'
        }, {
            headImg: '',
            text: '在幾百年前'
        }, {
            headImg: '',
            text: '就說過愛你'
        },]
    }, {
        onWatch: false,
        backgroundImage: require('../assets/images/story.png'),
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
        onWatch: false,
        backgroundImage: require('../assets/images/aa.png'),
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

    story = [{
        who: 'mom',
        head: require('../assets/images/f11.png'),
        storyamount: 2,
        reading: false,
        storys: [{
            backgroundImage: require('../assets/images/aa.png'),
            time: 4
        }, {
            backgroundImage: require('../assets/images/story1.png'),
            time: 3
        }],
        starttimer: null,
        backgroundswitcher: null,
        message: [{
            headImg: '',
            text: '我肯定'
        }, {
            headImg: '',
            text: '在幾百年前'
        }, {
            headImg: '',
            text: '就說過愛你'
        }, {
            headImg: '',
            text: '只是你忘了'
        },]
    }, {
        who: 'dad',
        head: require('../assets/images/f21.png'),
        storyamount: 3,
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
            text: '我也沒記起'
        }, {
            headImg: '',
            text: '我肯定'
        }, {
            headImg: '',
            text: '在幾百年前'
        }, {
            headImg: '',
            text: '就說過愛你'
        },]
    }, {
        who: 'sister',
        head: require('../assets/images/f31.png'),
        storyamount: 3,
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
        storyamount: 3,
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
        storyamount: 3,
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

    state = {
        ondrag: false,
        onpress: false,
        move_y: new Animated.Value(0),
        storyamount: 4,
        reload: false,
        backgroundImage: require('../assets/images/aa.png'),
        order: [3, 4, 0, 1, 2]
    };

    componentWillMount = () => {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this._showKeyboard);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this._hidKeyboard);
    }

    componentDidMount = () => {
        this.story[0].reading = true
        this.story[0].starttimer()
    }

    componentWillUnmount = () => {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
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
    }

    //設定每一個人限時的Timer()
    _setTimer = (index, fun) => {
        this.story[index].starttimer = fun
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

            this.storys[this.nowstory].onWatch = false;
            this.story_x = event.nativeEvent.contentOffset.x;
            this.nowstory = event.nativeEvent.contentOffset.x / this.screenWidth;
            this.head_x = -160 + 90 * this.nowstory;
            this.storys[this.nowstory].onWatch = true;
            // this.ScrollHead.scrollTo({ x: this.head_x, y: 0 });
            this.setState({
                ondrag: false,
            })

        }
    }
    //點擊頭像換頁
    _pressHead = (index) => {
        if (index != this.nowstory) {

            this.story_x = index * this.screenWidth;
            this.ScrollStory.scrollTo({ x: this.story_x, y: 0 });

            this.head_x = -160 + 90 * index;
            // this.ScrollHead.scrollTo({ x: this.head_x, y: 0 });

            this.storys[this.nowstory].onWatch = false;
            this.nowstory = index;
            this.storys[this.nowstory].onWatch = true;

            this.setState({
                onpress: !this.state.onpress,
            })
        }
    }
    //變換當前播放者
    _switchMember = (index) => {
        if (this.nowstory == 0 && index == -1) {
            index = 0
        } else if (this.nowstory == this.state.storyamount - 1 && index == 1) {

            // return this._gobackHomeScreen()

        } else if (index != 0) {

            this.story_x += this.screenWidth * index;
            this.ScrollStory.scrollTo({ x: this.story_x, y: 0 });

            this.head_x += 90 * index;
            // this.ScrollHead.scrollTo({ x: this.head_x, y: 0 });

            this.storys[this.nowstory].onWatch = false;
            this.nowstory += index;
            this.storys[this.nowstory].onWatch = true;

            this.setState({
                onpress: !this.state.onpress,
            })
        };
    }
    //新增留言
    _addMessage = (index, text) => {
        this.story[index].message.push({
            headImg: '',
            text: text,
        })
    }

    _nextStory = (index) => {
        if (index < this.story.length) {
            length = this.state.order.length
            this.story[index - 1].reading = false
            this.story[index].reading = true
            this.story[index].starttimer()

            // this.state.order.map((buffer, index) => {
            //     aa = (this.state.order[index] + 1) % length
            //     this.state.order[index] = aa
            // })

            this.setState({
                reload: !this.state.reload
            })
        }
    }

    //設定當前點擊畫面左右邊控制的對象
    _setPressfun = (fun) => {
        this.setState({ pressfun: fun })
    }

    //點擊觸發
    _pressStory = (buffer) => {
        this.state.pressfun(buffer)
        // this._switchMember(buffer)
    }

    //切換背景圖
    _switchBackgroundimage = (index, buffer) => {
        this.story[index].backgroundswitcher(buffer)
    }


    render() {
        const { move_y } = this.state;
        const storys = this.story.map((buffer, index) => {
            return (
                <StoryBackGround key={index} index={index} story={buffer} move_y={move_y} screenWidth={this.screenWidth} screenHeight={this.screenHeight} switchStory={(aa) => this._pressStory(aa)} addMessage={(index, text) => this._addMessage(index, text)} setbackgroundSwitcher={(fun) => this._setbackgroundSwitcher(index, fun)} />
            )
        })
        const heads = this.state.order.map((buffer, index) => {
            var aa = this.state.order[index]
            return (
                <Head key={index} index={buffer} style={{ flex: 0.15 }} storys={this.story[buffer].storys} storyamount={this.story[buffer].storyamount} reading={this.story[buffer].reading} nextstory={(i) => this._nextStory(i)} starttimer={(fun) => this._setTimer(buffer, fun)} setpressfun={(fun) => this._setPressfun(fun)} switchBackgroundimage={(bb) => this._switchBackgroundimage(buffer, bb)} switchMember={(bb) => this._switchMember(bb)} />
            )
        })
        return (
            <View style={{ flex: 1 }} >
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} pagingEnabled={true} decelerationRate='fast' onMomentumScrollBegin={(event) => { this._ondragStory(event) }} onMomentumScrollEnd={(event) => this._enddragStory(event)} ref={scrollview => { this.ScrollStory = scrollview }} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'  >
                    {storys}
                </ScrollView>
                <View style={{ position: 'absolute' }}>
                    <View style={{ width: this.screenWidth, height: 100 }}>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 30, zIndex: 1, justifyContent: 'space-around' }}>
                            {heads}
                        </View>
                        <View style={{ width: this.screenWidth / 5, height: '100%', backgroundColor: 'green', alignSelf: 'center', position: 'absolute', paddingTop: 40, borderBottomEndRadius: '50%', borderBottomStartRadius: '50%', zIndex: 0 }}></View>
                        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: this.screenWidth, height: 100, alignSelf: 'center', paddingTop: 40 }} contentInset={{ left: this.screenWidth / 2 - 60 / 2, right: this.screenWidth / 2 - 60 / 2 }} contentOffset={{ x: - this.screenWidth / 2 + 60 / 2 }} decelerationRate='fast' snapToAlignment={'center'} snapToInterval={80} ref={scrollview => { this.ScrollHead = scrollview }} > */}
                        {/* </ScrollView> */}
                    </View>
                </View>
                {/* <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, marginLeft: 10, marginTop: 30 }} onPress={() => this._gobackHomeScreen()}>
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
        this.state = {
            backgroundImage: this.storys[0].backgroundImage,
        }
    }

    state = {
        text: null,
    }

    componentDidMount = () => {
        this.props.setbackgroundSwitcher((buffer) => this._backgroundSwitcher(buffer))
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
            backgroundImage: this.storys[buffer].backgroundImage,
        })
    }

    render() {
        const { move_y, screenWidth, screenHeight, switchStory } = this.props;
        const { message } = this.props.story;
        const presswidth = screenWidth * 0.3;
        const Messages = message.map((buffer, index) => {
            return (
                <Message key={index} text={buffer.text} />
            )
        })
        return (
            <ImageBackground style={{ width: screenWidth, height: screenHeight }} source={this.state.backgroundImage} >
                <View style={{ position: 'absolute', justifyContent: 'flex-end', bottom: -260, width: screenWidth, zIndex: 2 }}>
                    <Animated.View style={{ transform: [{ translateY: move_y }] }}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={{ maxHeight: 300, paddingHorizontal: 40 }}>
                            <ScrollView style={{ marginBottom: 70 }} onContentSizeChange={() => this.messageScroll.scrollToEnd()} showsVerticalScrollIndicator={false} pagingEnabled={true} keyboardShouldPersistTaps='handled' keyboardDismissMode='none' ref={scroll => this.messageScroll = scroll} >
                                {Messages}
                            </ScrollView>
                            <View style={{ flexDirection: 'row', width: '100%', bottom: 20, position: 'absolute', alignSelf: 'center', zIndex: 4 }}>
                                <TextInput style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, fontSize: 16, lineHeight: 19, paddingHorizontal: 20, paddingVertical: 10, color: 'white' }} placeholder='請輸入...' placeholderTextColor='white' onChangeText={(text) => this._inputText(text)} ref={(inputtext) => { this.input = inputtext }} />
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'green', borderRadius: 15 }} onPress={() => this._sentText()} />
                                </View>
                            </View>
                        </LinearGradient>
                        <Animated.View style={{ width: screenWidth, height: 260, backgroundColor: 'rgba(0,0,0,0.6)' }} />
                    </Animated.View>
                </View>
                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, left: 0, zIndex: 1 }} onPress={() => switchStory(-1)} />
                <TouchableOpacity style={{ position: 'absolute', width: presswidth, height: screenHeight, right: 0, zIndex: 1 }} onPress={() => switchStory(1)} />
            </ImageBackground >
        )
    }
}

class Message extends React.Component {
    render() {
        return (
            <View style={[{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }, this.props.style]}>
                <Image style={{ width: 36, height: 36, borderRadius: 18 }} source={require('../assets/images/Monster1.png')} />
                <View style={{ marginLeft: 40, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, lineHeight: 19 }}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

class Head extends React.Component {

    storyamount = this.props.storyamount
    length = 5
    intervaltime = 0.1

    componentDidMount = () => {
        this.props.starttimer(() => this._setTimer())
        this.setState({ nowlength: this.props.storys[this.state.nowstory].time })
    }

    componentWillUnmount = () => {
        clearInterval(this.state._calltimer)
    }

    state = {
        _calltimer: null,
        nowstory: 0,
        nowlength: 0,
        totaltime: 0,
        time: 0,
        reload: false,
    }

    _pressStory = (buffer) => {
        if (buffer == -1) {
            now = this.state.nowstory - 1
            if (now < 0) {
                this.setState({
                    time: 0,
                })
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
                this.setState({
                    time: 100,
                })
                clearInterval(this.state._calltimer)
                this.props.switchMember(1)
                this.props.nextstory(this.props.index + 1)
            }
        }
    }

    _setTimer = () => {
        this.state._calltimer = setInterval(() => this._Timer(), this.intervaltime * 1000)
        this.props.setpressfun((buffer) => this._pressStory(buffer))
        // alert(this.props.index)
    }

    _Timer = () => {
        if (this.props.reading) {
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
                this.props.nextstory(this.props.index + 1)
                this.props.switchMember(1)
            }
        }
    }

    _createBar = () => {
        bar = []
        angle = 360 / this.storyamount - 10
        now = this.state.nowstory
        progress = this.state.time * 100 / this.state.nowlength

        for (let index = 0; index < this.storyamount; index++) {
            if (index == now) {
                fill = progress
            } else if (index < now) {
                fill = 100
            } else {
                fill = 0
            }
            if (index == 0) {
                bar.push(<AnimatedCircularProgress key={index} rotation={5} arcSweepAngle={angle} lineCap='round' size={60} width={3} fill={fill} tintColor='red' backgroundColor="#3d5875" duration={100} >
                    {
                        (fill) => (
                            <TouchableOpacity style={{ width: 57, height: 57, borderRadius: '50%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} activeOpacity={1} >
                                <Text style={{ color: 'white' }}>{this.props.index + 1}</Text>
                            </TouchableOpacity>
                        )
                    }
                </AnimatedCircularProgress>)
            } else {
                bar.push(<AnimatedCircularProgress key={index} rotation={5 + (angle + 10) * index} arcSweepAngle={angle} lineCap='round' size={60} width={3} fill={fill} tintColor='red' backgroundColor="#3d5875" style={{ position: 'absolute' }} duration={100} />)
            }
        }

        // this.setState({ reload: true })

        return bar
    }

    render() {
        const { reading } = this.props;
        return (
            <View style={[this.props.style, this.props.index == 0 && { marginLeft: 0 }]}>
                {reading ?
                    <TouchableOpacity activeOpacity={1}>
                        {this._createBar()}
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} activeOpacity={1} >
                        <Text style={{ color: 'white' }}>{this.props.index + 1}</Text>
                    </TouchableOpacity>
                }
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

 // const heads = this.storys.map((buffer, index) => {
        //     return (
        //         <View key={index}>
        //             <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: `rgb(${index * 20},${index * 20},${index * 20})`, marginHorizontal: 20, zIndex: 99 }} onPress={() => this._pressHead(index)} activeOpacity={1} />
        //             {buffer.onWatch ?
        //                 <View style={{ position: 'absolute', width: 56, height: 56, borderRadius: 28, backgroundColor: 'red', alignSelf: 'center', top: -3 }} />
        //                 :
        //                 null
        //             }
        //         </View>
        //     )
        // })