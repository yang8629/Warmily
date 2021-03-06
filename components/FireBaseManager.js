import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import { Alert } from 'react-native'


const firebaseConfig = {
    apiKey: "AIzaSyCIZL1qODYpj00yn8_GQj_Z3SGMNiesc_w",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    storageBucket: "<YOUR-STORAGE-BUCKET>",
    projectId: "wen-dau"
}

export default class FireBaseManager {
    static FireBase = null;

    ready = false;
    remindamount = 6;
    data = null;
    storgeref = null;
    auth = null;
    remind = [];
    remind1 = [{
        content: [{
            checkblock: false,
            text: '冰箱的晚餐記得拿出來微波喔。',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: false,
    }, {
        content: [{
            checkblock: false,
            text: '我今天會晚一點回家喔，有一個會要開。冰箱的晚餐記得拿出來微波，湯也在冰箱裡記得熱來喝。',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: true,
    }, {
        content: [{
            checkblock: false,
            text: '我明天要去朋友家玩喔!',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: false,
    }, {
        content: [{
            checkblock: false,
            text: '我這禮拜六要去朋友的生日派對',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: false,
    }, {
        content: [{
            checkblock: false,
            text: '我這禮拜六要去朋友的生日派對',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: true,
    }, {
        content: [{
            checkblock: false,
            text: '冰箱的晚餐記得拿出來微波喔。',
        }, {
            checkblock: true,
            check: false,
            text: '晚餐'
        }, {
            checkblock: true,
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
        importent: false,
    }];

    storys = []

    static getInstance = () => {
        if (!firebase.apps.length) {
            this.FireBase = new FireBaseManager();
            firebase.initializeApp(firebaseConfig);
            storgeref = firebase.firestore().collection('Authen').doc('id');
            buffer = storgeref.collection('Remind').get().then(querySnapshot => {
                querySnapshot.forEach(doc => { this.FireBase._initialData(doc.data()) })
            }).catch(error => alert(error.message))
            // buffer = setTimeout(() => { this.ready = true }, 2000);
            this.FireBase._setStorgeref(storgeref);
            this.FireBase._resetChat();
            this.FireBase._setReady(true);
        }
        return this.FireBase;
    }

    //註冊帳號
    _Registere = async (email, password) => {
        x = null
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('註冊成功')
                x = true
            })
            .catch((error) => {
                switch (error.message) {
                    case 'The email address is badly formatted.':
                        alert('Email格式錯誤')
                        break;
                    case 'The password must be 6 characters long or more.':
                        alert('密碼格式錯誤,至少要六個字')
                        break;
                    default:
                        alert(error.message);
                        break;
                }
                x = false
            });

        return x
    }

    _Login = async (email, password) => {
        x = null
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('登入成功')
                x = true
            })
            .catch((error) => {
                switch (error.message) {
                    case 'The email address is badly formatted.':
                        alert('Email格式錯誤')
                        break;
                    case 'The password is invalid or the user does not have a password.':
                        alert('密碼錯誤')
                        break;
                    default:
                        alert(error.message);
                        break;
                }
                x = false
            });

        return x
    }

    _checkUser = () => {
        return firebase.auth().currentUser
    }


    name = '';
    monster = require('../assets/images/monster03_blue.png');
    monstergif = require('../assets/gif/monster03_blue.gif');

    _setMyName = (buffer) => {
        this.name = buffer;
    }

    _getMyName = () => {
        return this.name;
    }

    _setMyMonster = (buffer, aa) => {
        this.monster = buffer
        this.monstergif = aa
    }

    _getMyMonster = () => {
        return this.monster
    }

    _getMyMonstergif = () => {
        return this.monstergif
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

    _initialData = (doc) => {
        var contents = [], messages = []

        doc.content.forEach(content => {
            contents.push({
                checkblock: content.checkblock,
                text: content.text,
                check: content.check || null,
            })
        })

        doc.messages.forEach(message => {
            messages.push({
                text: message.text,
            })
        })

        this.remind.push({
            content: contents,
            messages: messages,
            who: doc.who,
            time: doc.time,
            importent: doc.importent,
        })
    }


    first = true;

    _getFirsttime = () => {
        return this.first;
    }

    _setFirsttime = (buffer) => {
        this.first = buffer;
    }

    finish = true;

    _setFinish = (buffer) => {
        this.finish = buffer;
    }

    _getFinish = () => {
        return this.finish;
    }

    id = 1;     //1:小孩 2:家長

    _getID = () => {
        return this.id;
    }

    _setID = (id) => {
        this.id = id == null ? 1 : id
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
            messages: [],
            who: '我',
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

    _resetRemind = (amount) => {
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

        if (this.allfamily[this.nowfamily].issues.type == null) {
            this.allfamily[this.nowfamily].issues[0] = buffer
        } else {
            this.allfamily[this.nowfamily].issues.unshift(buffer)
        }

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

    nowfamily = 0

    allfamily = [{
        name: '媽媽',
        id: 2,
        monstergif: require('../assets/gif/monster02_purple.gif'),
        monsterpng: require('../assets/images/monster02_purple.png'),
        monsterhead: require('../assets/images/f51.png'),
        issues: [{
            type: '生活態度',
            title: '沒收我的手機，限制我使用的時間',
            finish: false,
            time: '2020.4.4',
            input1: '希望我不要過度沉迷於手機',
            input2: '自行有效控管使用手機的時間',
            input3: '多信任我一點,不要沒收我的手機',
            from: {
                head: require('../assets/images/f31.png'),
                input1: '晚上12點要做什麼事情?',
                input2: '抱佛腳',
                input3: '因為零時抱佛腳',
                emoji: [{
                    type: 'Happy',
                    text: '黑皮',
                    color: '#ed9c8a',
                    textinput: '因為自己不被信任',
                    image: require('../assets/Emoji/Sad.png'),
                    value: 4,
                },],
            },
            emoji: [{
                type: 'Sad',
                text: '哭哭',
                color: '#ed9c8a',
                textinput: '因為自己不被信任',
                image: require('../assets/Emoji/Sad.png'),
                value: 4,
            },],
            thought: [{
                from: 0,//媽媽
                title: '我覺得你沒有辦法控制自己手機使用的時間......',
            },
            {
                from: 1,//自己
                title: '我希望你能多相信我一些，給我自己分配管理的空間。',
            }, {
                from: 0,//媽媽
                title: '我覺得你沒有辦法自己控制手機使用的時間，因為每次我請你去做功課或是幫忙的時候你都沒做到，而且你最近的功課也一直在退步，所以我很不放心讓你自己控制手機。',
            }],
            protocol: [{
                text: '我會自發性地寫完作業後再拿出手機',
                confirm: true,
                modify: false,
                recent: [{
                    text: '阿拉花呱',
                    img: require('../assets/images/f51.png'),
                }],
            },
            {
                text: '如果發現我未完成作業就玩手機，手機才交由媽媽保管',
                confirm: false,
                modify: true,
                recent: [{
                    text: '你才不會',
                    img: require('../assets/images/f51.png'),
                }],
            },
            {
                text: '我會自我管理時間，保證成績能維持在班級前五',
                confirm: true,
                modify: true,
                recent: [{
                    text: null,
                }],
            },
            {
                text: '過度使用手機被警告三次以上，手機沒收一個禮拜',
                confirm: false,
                modify: false,
                recent: [{
                    text: null,
                }],
            },
            ],
        }, {
            type: '生活態度',
            title: '參加社團影響課業嗎?',
            finish: false,
            time: '2019.12.24',
            input1: '希望我不要過度沉迷於手機',
            input2: '自行有效控管使用手機的時間',
            input3: '多信任我一點,不要沒收我的手機',
            from: null,
            emoji: [{
                type: 'Sad',
                text: '哭哭',
                color: '#ed9c8a',
                textinput: '因為自己不被信任',
                image: require('../assets/Emoji/Sad.png'),
                value: 4,
            },],
            thought: [{
                from: 1,
                title: '你一個禮拜應該整理一次房間',
            }, {
                from: 0,
                title: '等我覺得亂就會整理了',
            }],
            protocol: [{
                text: null,
                check: true,
                recent: [{
                    text: null
                }],
            },],
        }],
    }, {
        name: '爸爸',
        id: 2,
        monstergif: require('../assets/gif/monster03_pink.gif'),
        monsterpng: require('../assets/images/monster03_pink.png'),
        monsterhead: require('../assets/images/f12.png'),
        issues: [{
            type: null,
            protocol: [{
                text: null,
                recent: [{
                    text: null,
                }]
            }],
            thought: [],
        },],
    }, {
        name: '姐姐',
        id: 1,
        monstergif: require('../assets/gif/monster05_yellow.gif'),
        monsterpng: require('../assets/images/monster05_yellow.png'),
        monsterhead: require('../assets/images/f41.png'),
        issues: [{
            type: null,
            protocol: [{
                text: null,
                recent: [{
                    text: null,
                }]
            }],
            thought: [],
        },],
    }, {
        name: '哥哥',
        id: 1,
        monstergif: require('../assets/gif/monster04_purple.gif'),
        monsterpng: require('../assets/images/monster04_purple.png'),
        monsterhead: require('../assets/images/f32.png'),
        issues: [{
            type: null,
            protocol: [{
                text: null,
                recent: [{
                    text: null,
                }]
            }],
            thought: [],
        },],
    }]


    _setFamily = (buffer) => {
        this.nowfamily = buffer
    }

    _getFamily = () => {
        return this.allfamily[this.nowfamily]
    }


    collect = 0

    _setCollect = (buffer) => {
        this.collect = buffer
    }

    _getCollect = () => {
        return this.collect
    }

    chat = []
    aa = null

    _initialChat = (doc) => {
        this.chat.push(doc)
    }

    _resetChat = async () => {

        buffer = await this.storgeref.collection('Chat').doc('Target').collection('Mom').get().then(querySnapshot => {
            querySnapshot.forEach(doc => { this._initialChat(doc.data()) })
        }).catch(error => alert(error.message))


        for (let index = 0; index < this.chat.length; index++) {
            this.storgeref.collection('Chat').doc('Target').collection('Mom').doc(index.toString()).delete()
        }

        all = [{
            text: '你今天下午要幹嘛',
            img: require('../assets/images/f32.png'),
            type: 1,
            from: 2,
        }, {
            text: '怎麼了',
            img: require('../assets/images/f12.png'),
            type: 0,
            from: 1,
        }, {
            text: '要去看電影嗎?',
            img: require('../assets/images/f32.png'),
            type: 1,
            from: 2,
        },]

        all.forEach((x, index) =>
            this.storgeref.collection('Chat').doc('Target').collection('Mom').doc(index.toString()).set(x)
        )

        this.chat = all
    }

    _getChat = () => {
        return this.chat
    }

    _setChat = (buffer) => {
        this.storgeref.collection('Chat').doc('Target').collection('Mom').doc(this.chat.length.toString()).set(buffer)
        this.chat.push(buffer)
        return this.chat
    }
}



//git status
//git commit -m "V"
//git push origin master
