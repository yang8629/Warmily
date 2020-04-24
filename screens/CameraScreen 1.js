import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Video } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';

export default class CameraScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        captures: [],
        capturing: false,
        stop: false,
        video: false,
        addtext: false,
        bg: 'white',
        text: [
            {
                key: 1,
                content: 'Haha',
            },
        ],
        textNum: 1,
        textBuffer: '',
    };

    componentDidMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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
                // buffer.exif.Orientation = 1;
                this.setState({
                    captures: buffer,
                    stop: true,
                })
            });
        }
    }

    _takeVideo = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({
            captures: videoData,
            stop: true,
            video: true,
        })
    }

    _deletPhoto = () => {
        this.setState({
            captures: [],
            capturing: false,
            stop: false,
            video: false,
        })
    }

    _onChangeText = (text) => {
        this.setState({
            text: text,
        })
    }

    _AddTextComponent() {
        var key = this.state.textNum;
        var content = this.state.textBuffer;
        var text = this.state.text;

        text.unshift({ key: key, content: content });
        key++;

        this.setState({
            textNum: key,
            textBuffer: '',
        });
    }

    _cancelAddText = () => {
        this.setState({
            addtext: false,
        });
        if (this.state.text != null) {
            this._AddTextComponent();
        }
    }

    _test = () => {
        FileSystem.moveAsync({
            from: this.state.captures.uri,
            to: `${FileSystem.documentDirectory}photos/Photo_${1}.jpg`
        })
    }

    render() {
        const { hasCameraPermission } = this.state;
        const text = this.state.text.map((text) => { return <Text key={text.key} style={{ position: 'absolute', fontSize: 80, alignSelf: 'center' }}> {text.content} </Text> });

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {this.state.stop ?

                        <View style={styles.showPhoto}>

                            {this.state.video ?
                                <View>
                                    <Video style={{ height: '100%', width: '100%' }} source={this.state.captures} shouldPlay isLooping />
                                </View>
                                :
                                <View onStartShouldSetResponder={() => true} onResponderGrant={(event) => { this.setState({ addtext: true, bg: 'red' }) }}>
                                    <Image style={{ height: '100%', width: '100%' }} source={this.state.captures} />
                                </View>
                            }
                            <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, marginLeft: 10, marginTop: 30 }} onPress={() => this._deletPhoto()}>
                                <Icon name='close' size={40} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ position: 'absolute', width: 40, height: 40, right: 10, marginTop: 30 }} onPress={() => this._test()}>
                                <Icon name='done' size={40} color='white' />
                            </TouchableOpacity>
                            {this.state.addtext ?
                                <HoldTextInput onResponderGrant={() => this._cancelAddText()} onChangeText={text => this._onChangeText(text)} />
                                :
                                null
                            }
                            {text}

                        </View>
                        :
                        <Camera style={{ flex: 1, top: 0, left: 0 }} type={this.state.type} ref={(ref) => { this.camera = ref }}>
                            <View style={styles.camerabottom}>
                                <TouchableOpacity style={styles.turned} onPress={() => this._turnedCamera()}>
                                    <Icon name='cached' size={40} color='white' />
                                </TouchableOpacity>
                                <View style={styles.takepictures}>
                                    <TouchableWithoutFeedback onPressIn={() => this._onCaptureIn()} onPressOut={() => this._onCaptureOut()} onPress={() => this._takePhoto()} onLongPress={() => this._takeVideo()} >
                                        <View style={styles.takepictureBtn} opacity={0.8} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </Camera>}

                </View>
            );
        }
    }
}

function HoldTextInput(props) {
    return (
        <View onStartShouldSetResponder={() => true} onResponderGrant={props.onResponderGrant} style={{ position: 'absolute', flex: 1, backgroundColor: 'rgba(130, 130, 130, 0.6)', width: '100%', height: '100%' }} onPress={() => this._cancelAddText()}>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <TextInput
                    style={styles.holdtextinput}
                    autoFocus={true}
                    maxLength={200}
                    allowFontScaling={true}
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
    camerabottom: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    turned: {
        flex: 0.3,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: 40,
    },
    takepictures: {
        flex: 0.4,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    takepictureBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'gray',
        marginBottom: 40,
    },
    showPhoto: {
        flex: 1,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
    },
    holdtextinput: {
        width: '100%',
        minWidth: 50,
        fontSize: 40,
    }
});
