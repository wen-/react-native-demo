import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    SectionList,
    TouchableOpacity,
    ScrollView,
    Modal,
    Platform,
    Linking,
    Dimensions,
    DeviceEventEmitter,
} from 'react-native'
import {
    Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import {接口配置} from '../request/domain';
import {checkUpdate} from "../request/checkUpdate";
import {c_download_file, c_openfile} from "../utils/common";
import {模态框样式} from "../styles";

var styles = {
    container:{
        flex:1,
        backgroundColor:"#efefef"
    },
}

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            模态框配置:{
                显示:false,
                文本:"test",
                按钮配置:[{"文字":"取消","事件":"隐藏模态框"},{"文字":"确定","事件":"隐藏模态框"}],
            },
            更新内容:{}
        }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    jump = (link)=>{
        //调用系统浏览器打开外部地址
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                console.log('不能打开外部地址:' + link);
            } else {
                return Linking.openURL(link);
            }
        }).catch(function(err){
            console.error('打开外部地址出错了:', err);
        });
    };

    check(){
        let _模态框配置 = this.state.模态框配置;
        _模态框配置.文本 = "正在检查更新...";
        _模态框配置.按钮配置 = null;
        this.state.模态框配置 = _模态框配置;
        this.显示模态框(2000);

        checkUpdate(function (res) {
            console.log("检查更新返回：",res);
            if(res){
                let _模态框配置 = this.state.模态框配置;
                _模态框配置.显示 = true;
                _模态框配置.文本 = "发现新版本：\\n"+ res.更新内容;
                if(res.强制更新 == "是"){
                    _模态框配置.按钮配置 = [{"文字":"立即更新","事件":"立即更新","参数":res.地址}];
                }else{
                    _模态框配置.按钮配置 = [{"文字":"下次再说","事件":"隐藏模态框"},{"文字":"立即更新","事件":"立即更新","参数":res.地址}];
                }
                this.自动隐藏模态框 &&　clearTimeout(this.自动隐藏模态框);
                this.setState({模态框配置:_模态框配置,更新内容:res});
            }
        }.bind(this));
    }
    立即更新(url){
        if(Platform.OS == "ios"){
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('不能打开更新链接' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(function(err){
                console.error('打开更新链接出错了', err);
            });
        }else{
            let _模态框配置 = this.state.模态框配置;
            _模态框配置.文本 = "正在下载...";
            _模态框配置.按钮配置 = null;
            this.state.模态框配置 = _模态框配置;
            this.显示模态框(2000);
            c_download_file(url,function (path,mime) {
                c_openfile(path,mime);
            });
        }
    }
    显示模态框(showtime){
        let _模态框配置 = this.state.模态框配置;
        _模态框配置.显示 = true;
        this.setState({模态框配置:_模态框配置});
        if(showtime && parseInt(showtime) > 0){
            this.自动隐藏模态框 = setTimeout(function () {
                let _模态框配置 = this.state.模态框配置;
                _模态框配置.显示 = false;
                this.setState({模态框配置:_模态框配置});
            }.bind(this),showtime);
        }
    }
    隐藏模态框(){
        this.自动隐藏模态框 &&　clearTimeout(this.自动隐藏模态框);
        if(this.state.更新内容.强制更新 && this.state.更新内容.强制更新 == "是"){
            return;
        }
        let _模态框配置 = this.state.模态框配置;
        _模态框配置.显示 = false;
        this.setState({模态框配置:_模态框配置});
    }
    滚动事件(e){
        console.log(e.nativeEvent);
        if(e.nativeEvent.contentOffset.y <= 110){
            let _透明度 = e.nativeEvent.contentOffset.y/100;
            console.log("透明度：",_透明度);
            DeviceEventEmitter.emit('改变导航透明度',{透明度:_透明度})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView scrollEventThrottle={16} onScroll={this.滚动事件.bind(this)}>
                    <View>
                        <Image style={{width:Dimensions.get('window').width,height:150,resizeMode:'cover'}} source={require('../../assets/images/bg.png')} />
                    </View>
                    <TouchableOpacity style={{backgroundColor:"#fff",height:60,width:60,borderRadius:60,justifyContent: 'center',alignItems: 'center',position:"absolute",top:110,left:"50%",marginLeft:-25,borderWidth:1,borderColor:"#efefef",zIndex:100}}>
                        <View style={{backgroundColor:"#cf560a",height:56,width:56,borderRadius:56,justifyContent: 'center',alignItems: 'center'}}>
                            <Icon name={"github"} size={40} color={'#fff'} />
                        </View>
                    </TouchableOpacity>
                    <View style={{height:80,backgroundColor:"#fff",marginBottom:10,justifyContent: 'flex-end'}}>
                        <View style={{alignItems: 'center',marginBottom:5}}>
                            <Text style={{color:"#333",fontSize:12}}>135****1889</Text>
                        </View>
                        <View style={{flexDirection:"row",marginBottom:5}}>
                            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={{color:"#333"}}>0元</Text>
                                <Text style={{color:"#ccc",fontSize:10}}>信用额度</Text>
                            </View>
                            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={{color:"#333"}}>0元</Text>
                                <Text style={{color:"#ccc",fontSize:10}}>账户余额</Text>
                            </View>
                            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={{color:"red"}}>0元</Text>
                                <Text style={{color:"#ccc",fontSize:10}}>待还款</Text>
                            </View>
                        </View>
                    </View>
                    <SectionList
                        renderItem={({item, index, section}) => (
                            <TouchableOpacity key={index} onPress={()=>{
                                if(item.jump){
                                    Actions[item.jump]();
                                }}} style={{flex:1,backgroundColor:"#fff",borderBottomWidth:.5,borderBottomColor:"#ddd",paddingBottom:8,paddingTop:8,paddingLeft:10,paddingRight:10,flexDirection: 'row',alignItems: 'center',}}>
                                <View style={{marginRight:10,backgroundColor:item.color,borderRadius:30,width:30,height:30,alignItems:"center",justifyContent:"center"}}><Icon name={item.icon} size={20} color={"#fff"}/></View>
                                <Text style={{flex:1,color:"#333",fontSize:12}}>{item.txt}</Text>
                                <Icon name={"chevron-small-right"} size={20} color={"#ccc"}/>
                            </TouchableOpacity>
                        )}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={{height:5}}></View>
                        )}
                        sections={[
                            {title: 'Title1', data: [{txt:'审核进度查询',color:'#ff3726',icon:'new-message'}, {txt:'我的账单',color:'#48a0ff',icon:'open-book'}, {txt:'我的优惠券',color:'#ff3726',icon:'ticket'}, {txt:'我的银行卡',color:'#7232ff',icon:'credit-card'}]},
                            {title: 'Title2', data: [{txt:'检查更新',color:'#13d0ff',icon:'download'}, {txt:'加载效果',color:'#a0ad3d',icon:'circular-graph',jump:"加载页"}, {txt:'联系我们',color:'#a0ad3d',icon:'landline'}, {txt:'更多设置',color:'#ba1d41',icon:'cog'}]},
                        ]}
                        keyExtractor={(item, index) => item + index}
                        style={{marginBottom:40}}
                    />

                </ScrollView>

                <View>
                    <Modal visible={this.state.模态框配置.显示}
                           animationType={'fade'}
                           transparent = {true}
                           onRequestClose={()=> this.隐藏模态框()} >
                        <View style={模态框样式.背景色}>
                            <View style={模态框样式.主体}>
                                <View style={模态框样式.文本框}>
                                    {
                                        this.state.模态框配置.文本.split('\\n').map((item, i)=>{
                                            let marginT = i==1?{marginTop:10}:{};
                                            return(
                                                <Text style={[模态框样式.文本内容,marginT]} key={i}>{item}</Text>
                                            )
                                        })
                                    }
                                </View>

                                {
                                    this.state.模态框配置.按钮配置?
                                        <View style={模态框样式.底部}>
                                            {
                                                this.state.模态框配置.按钮配置.map((item, i) => {
                                                    let s = i>0?{borderLeftWidth:.5,borderColor:"#e5e5e5"}:{};
                                                    return (
                                                        <TouchableOpacity
                                                            style={[模态框样式.按钮,s]}
                                                            underlayColor="#aaa"
                                                            onPress={()=>{this[item.事件](item.参数)}}
                                                            key={i}>
                                                            <Text style={{color:'#555'}}>{item.文字}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>:null
                                }

                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        )
    }

}