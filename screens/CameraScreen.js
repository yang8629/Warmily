import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, TextInput, PanResponder, Animated, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';
import FireBaseManager from '../components/FireBaseManager'

export default class CameraScreen extends React.Component {

    firebase = FireBaseManager.getInstance()

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        captures: [],
        capturing: false,
        stop: false,
        video: false,
        addtext: false,
        modifytext: false,
        modifyid: null,
        bg: 'white',
        text: [],
        textNum: 0,
        textBuffer: null,
        top: 100,
        left: 0,
        zoom: 0,
        panResponse: null,
    };

    componentDidMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    constructor(props) {
        super(props)
        this._panResponse = PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, ges) => this._onPanResponderMove(event, ges),
            onPanResponderRelease: () => this.onPanResponderRelease(),
        })
    }

    _onPanResponderMove = (event, ges) => {
        var dy = Math.floor((ges.dy / -350) * 1000) / 1000;
        dy = dy > 0 ? dy : 0;
        dy = dy < 1 ? dy : 1;

        if (this.state.capturing) {
            this.setState({ zoom: dy })
        }
    }

    onPanResponderRelease = () => {
        if (this.state.capturing) {
            this.camera.stopRecording()
        }
        this.setState({
            panResponse: null,
        })
    }

    _turnedCamera = () => {
        this.setState({
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
        })
    }

    _onCaptureIn = () => {
        this.setState({
            capturing: true,
        })
    }

    _onCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    }

    _takePhoto = async () => {
        if (this.camera) {
            const options = {
                quality: 1,
                base64: true,
                fixOrientation: true,
                exif: true,
            };
            await this.camera.takePictureAsync(options).then(buffer => {
                buffer.exif.Orientation = 1;
                this.setState({
                    captures: buffer,
                    stop: true,
                })
            });
        }
    }

    _takeVideo = async () => {
        this.setState({
            video: true,
            panResponse: this._panResponse.panHandlers,
        })
        const videoData = await this.camera.recordAsync();
        this.setState({
            captures: videoData,
            stop: true,
        })
    }

    _saveFile = async () => {
        // await FileSystem.moveAsync({
        //     from: this.state.captures.uri,
        //     to: `${FileSystem.documentDirectory}photos/Photo_1.jpg`,
        // })

        const buffer = await MediaLibrary.createAssetAsync(this.state.captures.uri);
        const asset = await MediaLibrary.getAssetInfoAsync(buffer)
        this.firebase._saveStory(asset)
        this.props.navigation.replace('story')
    }

    _deletFile = async () => {
        // await FileSystem.deleteAsync({
        //     fileUri: this.state.captures.uri,
        // })

        this.setState({
            captures: [],
            capturing: false,
            stop: false,
            video: false,
            textBuffer: null,
            textNum: 0,
            text: [],
            zoom: 0,
            panResponse: null,
        })
    }

    _onChangeText = (text) => {
        this.setState({
            textBuffer: text,
        })
    }

    _AddTextComponent = () => {
        var key = this.state.textNum;
        var content = this.state.textBuffer;
        var text = this.state.text;

        text.push({ key: key, content: content });
        key++;

        this.setState({
            textNum: key,
            textBuffer: '',
        });
    }

    _onModify = (now) => {

        this.setState({ modifytext: true, modifyid: now.key, textBuffer: now.content })

        this.state.text.splice(now.key, 1, { key: now.key, content: null })

    }

    _ModifyTextComponent = () => {
        var key = this.state.modifyid;
        var content = this.state.textBuffer;
        var text = this.state.text;
        if (content == null) {
            text.splice(key, 1);
        } else {
            text.splice(key, 1, { key: key, content: content });
        }
        this.setState({
            textBuffer: null,
            modifyid: null,
        })
    }

    _cancelAddText = () => {
        if (this.state.textBuffer != null) {
            if (this.state.addtext) {
                this._AddTextComponent();
            } else if (this.state.modifytext) {
                this._ModifyTextComponent();
            }
        }

        this.setState({
            addtext: false,
            modifytext: false,
            modifyid: null,
            textBuffer: null,
        });
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { hasCameraPermission } = this.state;
        const text = this.state.text.map((now) => {
            return (
                <View key={now.key} onStartShouldSetResponder={() => true} onResponderGrant={() => this._onModify(now)} style={styles.textcomponent}>
                    <Text style={styles.showText}> {now.content} </Text>
                </View>
            )
        });

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar hidden={true} />

                    {this.state.stop ?

                        <View style={styles.showPhoto}>

                            {this.state.video ?
                                <View>
                                    <Video style={[{ height: '100%', width: '100%' }, this.state.type == Camera.Constants.Type.front && { transform: [{ rotateY: '180deg' }] }]} source={this.state.captures} shouldPlay isLooping />
                                </View>
                                :
                                <View onStartShouldSetResponder={() => true} onResponderGrant={(event) => { this.setState({ addtext: true }) }}>
                                    <Image style={[{ height: '100%', width: '100%' }, this.state.type == Camera.Constants.Type.front && { transform: [{ rotateY: '180deg' }] }]} source={this.state.captures} />
                                </View>
                            }
                            <TouchableHighlight style={[{ position: 'absolute', marginLeft: 20, marginTop: 30, zIndex: 2, borderRadius: 22, padding: 2, alignItems: 'center', justifyContent: 'center' }, styles.shadow]} onPress={() => this._deletFile()} underlayColor='rgba(150,150,150,0.5)' >
                                <Icon name='close' size={40} color='white' />
                            </TouchableHighlight>
                            <TouchableHighlight style={[{ position: 'absolute', right: 20, marginTop: 30, borderRadius: 22, padding: 2 }, styles.shadow]} onPress={() => this._saveFile()} underlayColor='rgba(150,150,150,0.5)' >
                                <Icon name='done' size={40} color='white' />
                            </TouchableHighlight>

                            {text}

                            {this.state.addtext ?
                                <HoldTextInput onResponderGrant={() => this._cancelAddText()} onChangeText={(text) => this._onChangeText(text)} />
                                :
                                null
                            }

                            {this.state.modifytext ?
                                <ModifyText textBuffer={this.state.textBuffer} onResponderGrant={() => this._cancelAddText()} onChangeText={(text) => this._onChangeText(text)} />
                                :
                                null
                            }
                        </View>
                        :
                        <Camera style={{ flex: 1, top: 0, left: 0 }} type={this.state.type} zoom={this.state.zoom} ref={(ref) => { this.camera = ref }} >
                            <View style={styles.takepictures} >
                                <View {...this.state.panResponse}>
                                    <TouchableOpacity activeOpacity={1} onPressIn={() => this._onCaptureIn()} onPressOut={() => this._onCaptureOut()} onPress={() => this._takePhoto()} onLongPress={() => this._takeVideo()} >
                                        {this.state.video ?
                                            <View style={styles.takevideoBtn} opacity={0.8} />
                                            :
                                            <View style={styles.takepictureBtn} opacity={0.8} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                {/* <View style={[styles.takepictureBtn, { width: 80, height: 80, borderRadius: 40, backgroundColor: 'red' }]} opacity={0.8} /> */}
                            </View>
                            <TouchableHighlight style={[styles.turned, styles.shadow, { borderRadius: 22, padding: 2 }]} onPress={() => this._turnedCamera()} underlayColor='rgba(150,150,150,0.5)' >
                                <Icon name='cached' size={40} color='white' />
                            </TouchableHighlight>
                            <TouchableHighlight style={[{ position: 'absolute', marginLeft: 20, marginTop: 30, borderRadius: 22, padding: 2 }, styles.shadow]} onPress={() => this._goBack()} underlayColor='rgba(150,150,150,0.5)' >
                                <Icon name='close' size={40} color='white' />
                            </TouchableHighlight>
                        </Camera>
                    }

                </View>
            );
        }
    }
}

function HoldTextInput(props) {
    return (
        <View onStartShouldSetResponder={() => true} onResponderGrant={props.onResponderGrant} style={styles.addtextBG} onPress={() => this._cancelAddText()}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={styles.holdtextinput}
                    autoFocus={true}
                    maxLength={40}
                    allowFontScaling={true}
                    onChangeText={props.onChangeText}
                />
            </View>
        </View>
    );
}

function ModifyText(props) {
    const buffer = props.textBuffer;

    return (
        <View onStartShouldSetResponder={() => true} onResponderGrant={props.onResponderGrant} style={styles.addtextBG} onPress={() => this._cancelAddText()}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={styles.holdtextinput}
                    autoFocus={true}
                    maxLength={40}
                    allowFontScaling={true}
                    value={buffer}
                    onChangeText={props.onChangeText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    turned: {
        position: 'absolute',
        marginTop: 600,
        marginLeft: 60,
    },
    takepictures: {
        width: '50%',
        height: '50%',
        marginTop: 300,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    takepictureBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'gray',
        top: -10,
    },
    takevideoBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'red',
        top: 0,
    },
    showPhoto: {
        flex: 1,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
    },
    holdtextinput: {
        fontSize: 40,
        color: 'red',
        marginBottom: 200,
    },
    addtextBG: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(130, 130, 130, 0.6)',
        width: '100%', height: '100%'
    },
    textcomponent: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 245,
    },
    showText: {
        fontSize: 40,
        color: 'red',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
            },
            android: {
                elevation: 20,
            },
        }),
    },
});