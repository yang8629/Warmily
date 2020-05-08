import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import { Alert } from 'react-native'


const firebaseConfig = {
    apiKey: "<AIzaSyCIZL1qODYpj00yn8_GQj_Z3SGMNiesc_w>",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    storageBucket: "<YOUR-STORAGE-BUCKET>",
    projectId: "wen-dau"
}

export default class FireBaseManager {
    static FireBase = null;

    first = false;
    ready = false;
    id = 1;     //1:小孩 2:家長
    remindamount = 6;
    data = null;
    storgeref = null;
    remind = [];
    remind1 = [{
        content: '冰箱的晚餐記得拿出來微波喔。',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '媽媽',
        time: '1小時',
        headimg: require('../assets/images/f32.png'),
        importent: false,
    }, {
        content: '還有湯在冰箱裡記得熱來喝。',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '爸爸',
        time: '4小時',
        headimg: require('../assets/images/f41.png'),
        importent: true,
    }, {
        content: '我明天要去朋友家玩喔!',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '姐姐',
        time: '15小時',
        headimg: require('../assets/images/f52.png'),
        importent: false,
    }, {
        content: '我這禮拜六要去朋友的生日派對',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '我',
        time: '20小時',
        headimg: require('../assets/images/f22.png'),
        importent: false,
    }, {
        content: '我這禮拜六要去朋友的生日派對',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '媽媽',
        time: '1天前',
        headimg: require('../assets/images/f32.png'),
        importent: true,
    }, {
        content: '冰箱的晚餐記得拿出來微波喔。',
        checks: [{
            check: false,
            text: '晚餐'
        }, {
            check: false,
            text: '午餐'
        }],
        messages: [{
            text: '好的了解',
        }, {
            text: '哈哈哈哈哈哈',
        }, {
            text: '剛已經微波了',
        }],
        who: '媽媽',
        time: '2天前',
        headimg: require('../assets/images/f32.png'),
        importent: false,
    }];

    storys = []

    static getInstance = () => {

        if (this.FireBase == null) {
            this.FireBase = new FireBaseManager();
            firebase.initializeApp(firebaseConfig);
            storgeref = firebase.firestore().collection('Authen').doc('id');
            buffer = storgeref.collection('Remind').get().then(querySnapshot => {
                querySnapshot.forEach(doc => { this.FireBase._setData(doc.data()) })
            }).catch(() => alert('error'))
            // buffer = setTimeout(() => { this.ready = true }, 2000);
            this.FireBase._setStorgeref(storgeref);
            this.FireBase._setReady(true);
        }

        // alert('getInstance')

        return this.FireBase;
    }

    // test = () => {
    //     for (let index = 0; index < 6; index++) {
    //         firebase.firestore().collection('Authen').doc('id').collection('Remind').doc(index.toString()).set(
    //             this.remind[index]
    //         ).then(() => alert('Document successfully written!'))
    //             .catch(error => Alert('Error writing document: ', error))
    //     }
    //     // this.remind.forEach((aa, index) =>
    //     //     firebase.firestore().collection('Authen').doc('test').collection('Remind').doc(index.toString()).set({ aa })
    //     //         .then(() => alert('Document successfully written!'))
    //     //         .catch(error => Alert('Error writing document: ', error))
    //     // )

    //     // firebase.firestore().collection('Remind').doc('1').set({
    //     //     test: '111',
    //     // }).then(() => {
    //     //     console.log('set data successful');
    //     // });
    // }

    name = '';
    _setMyName = (buffer) => {
        this.name = buffer;
    }

    _getMyName = () => {
        return this.name;
    }

    _setStorgeref = (buffer) => {
        this.storgeref = buffer;
    }

    _setReady = (buffer) => {
        this.ready = buffer;
    }

    _getReady = () => {
        return this.ready;
    }

    _setData = (doc) => {
        var checks = [], messages = []

        // for (let index = 0; index < doc.checks.length; index++) {
        //     checks.push({
        //         check: doc.checks[index].check,
        //         text: doc.checks[index].text,
        //     })
        // }

        doc.checks.forEach(check => {
            checks.push({
                check: check.check,
                text: check.text,
            })
        })

        // for (let index = 0; index < doc.messages.length; index++) {
        //     messages.push({
        //         text: doc.messages[index].text,
        //     })
        // }

        doc.messages.forEach(message => {
            messages.push({
                text: message.text,
            })
        })

        this.remind.push({
            content: doc.content,
            checks: checks,
            messages: messages,
            who: doc.who,
            time: doc.time,
            headimg: doc.headimg,
            importent: doc.importent,
        })
    }

    _getFirsttime = () => {
        return this.first;
    }

    _setFirsttime = (buffer) => {
        this.first = buffer;
        return this.first
    }

    _getID = () => {
        return this.id;
    }

    _setID = (id) => {
        this.id = id
        return this.id
    }

    _getDatabase = () => {
        return firebase.firestore();
    }

    _getRemindamount = () => {
        return this.remindamount;
    }

    _setRemindamount = (x) => {
        this.remindamount += x;
        return this.remindamount;
    }

    _getRemindcontent = () => {
        if (this.remind != null) {
            return this.remind
        } else {
            return null
        }
    }

    _addRemindcontent = (buffer) => {

        this.remind.unshift({
            content: buffer.content,
            checks: [{
                check: false,
                text: '晚餐'
            }, {
                check: false,
                text: '午餐'
            }],
            messages: [{
                text: '真的假的',
            }, {
                text: '哈哈哈哈哈哈',
            },],
            who: '我',
            headimg: require('../assets/images/f11.png'),
            time: '現在',
            importent: buffer.importent,
        })

        this.remind.forEach((x, index) =>
            this.storgeref.collection('Remind').doc(index.toString()).set(x)
        )

        return this.remind;
    }

    _deletRemindcontent = (buffer) => {

        this.storgeref.collection('Remind').doc(buffer.toString()).delete();
        this.remind.splice(buffer, 1);

        for (let index = buffer; index < this.remind.length; index++) {
            this.storgeref.collection('Remind').doc(index.toString()).set(
                this.remind[index]
            )
            this.storgeref.collection('Remind').doc((index + 1).toString()).delete();
        }

        return this.remind
    }

    _reSet = (amount) => {
        for (let index = 0; index < amount; index++) {
            this.storgeref.collection('Remind').doc(index.toString()).delete()
        }
        this.remind1.forEach((buffer, index) =>
            this.storgeref.collection('Remind').doc(index.toString()).set(buffer)
        )
        this.remind = this.remind1
        return this.remind1
    }

    issue = null
    _setIssue = (buffer) => {
        this.issue = buffer
    }

    _getIssue = () => {
        return this.issue
    }

    _clearIssue = () => {
        this.issue = null
    }


    //story
    newstory = false

    _switchFirst = () => {
        buffer = this.newstory
        this.newstory = false
        return buffer
    }

    _saveStory = (buffer) => {
        this.newstory = true
        this.storys.push(buffer)
    }

    _getStory = () => {
        if (this.storys.length > 0) {
            return this.storys
        } else {
            return null
        }
    }

    family = {
        name: '媽媽',
        id: 2,
        monstergif: require('../assets/gif/monster02_purple.gif'),
        monsterpng: require('../assets/images/monster02_purple.png'),
        monsterhead: require('../assets/images/f51.png'),
    };

    _setFamily = (buffer) => {
        call = ''
        gif = ''
        png = ''

        switch (buffer) {
            case 0:
                call = '媽媽'
                id = 2
                gif = require('../assets/gif/monster02_purple.gif')
                png = require('../assets/images/monster02_purple.png')
                monsterhead = require('../assets/images/f51.png')
                break;
            case 1:
                call = '爸爸'
                id = 2
                gif = require('../assets/gif/monster03_pink.gif')
                png = require('../assets/images/monster03_pink.png')
                monsterhead = require('../assets/images/f12.png')
                break;
            case 2:
                call = '姐姐'
                id = 1
                gif = require('../assets/gif/monster05_yellow.gif')
                png = require('../assets/images/monster05_yellow.png')
                monsterhead = require('../assets/images/f41.png')
                break;
            case 3:
                call = '哥哥'
                id = 1
                gif = require('../assets/gif/monster04_purple.gif')
                png = require('../assets/images/monster04_purple.png')
                monsterhead = require('../assets/images/f32.png')
                break;

            default:
                break;
        }

        this.family.name = call
        this.family.id = id
        this.family.monstergif = gif
        this.family.monsterpng = png
        this.family.monsterhead = monsterhead
    }

    _getFamily = () => {
        return this.family
    }
}



//git status
//git commit -m "V"
//git push origin master
