import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter,} from 'react-native'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo';
const h = (Platform.OS === 'ios') ? 64 : 44;
const pt = (Platform.OS === 'ios') ? 20 : 0;
const styles = StyleSheet.create({
    container: {
        height: h,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: pt
    },
    navBarLeftItem: {
        position:"absolute",
        zIndex:10,
        left:0,
        top:0,
        width:50,
        height:h,
        paddingLeft:10,
        paddingTop: pt,
        justifyContent: 'center'
    },
    navBarTitleItem:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        paddingLeft:50,
        paddingRight:50,
    },
    navBarRightItem:{
        position:"absolute",
        zIndex:10,
        right:0,
        top:0,
        width:50,
        height:h,
        paddingTop: pt,
        justifyContent:'center'
    },
    navTitle:{
        color:"#000",
        fontSize:16,
    }
});

export default class CustomNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            透明度: 0,
            currentScene: props.initialRouteName,
        }
    }

    componentWillMount(){
        this.订阅改变导航透明度 = DeviceEventEmitter.addListener('改变导航透明度', (params) => {
            // this.setState({
            //     透明度:params.透明度
            // });

          //两种方式改变导航背景色。
          let _rgba = 'rgba(255,255,255,'+params.透明度+')';
          this.navBar.setNativeProps({
            backgroundColor: _rgba
          });
        });
    }

    componentWillUnmount() {
        if(this.订阅改变导航透明度) {
            this.订阅改变导航透明度.remove();
        }
    }

    _renderLeft() {
        if (['首页', '中间', '我的'].includes(this.state.currentScene)) {
            return null;
        } else {
            return (
                <TouchableOpacity
                    onPress={()=>{
                        Actions.pop()
                    }}
                    style={[styles.navBarLeftItem]}>
                    <Icon name={"reply"} size={20} color={'#000'} />
                </TouchableOpacity>
            )
        }
    }

    _renderMiddle() {
        return (
            <View style={styles.navBarTitleItem}>
                <Text style={styles.navTitle}>{ this.props.title }</Text>
            </View>
        )
    }

    _renderRight() {
        if (this.state.currentScene === '我的') {
            return (
                <View style={[styles.navBarRightItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{ paddingRight: 10,justifyContent: 'center' }}>
                        <Icon name={"new-message"} size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        let dinamicStyle = {};
        if (this.state.currentScene === '我的') {
            let _rgba = 'rgba(255,255,255,'+this.state.透明度+')';
            dinamicStyle = {position:"absolute", width:"100%",top:0, backgroundColor: _rgba}
            if(this.state.透明度 > 0.5){
                dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
                dinamicStyle.borderBottomColor = "#ddd";
                dinamicStyle.shadowOffset = {width:0,height:1};
                dinamicStyle.shadowColor = "#ddd";
                dinamicStyle.shadowOpacity = .5;
            }else{
                dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
                dinamicStyle.borderBottomColor = "transparent";
                dinamicStyle.shadowOffset = {width:0,height:1};
                dinamicStyle.shadowColor = "#ddd";
                dinamicStyle.shadowOpacity = .5;
            }
        } else {
            dinamicStyle.backgroundColor = '#fff';
            dinamicStyle.borderBottomWidth = StyleSheet.hairlineWidth;
            dinamicStyle.borderBottomColor = "#ddd";
            dinamicStyle.shadowOffset = {width:0,height:1};
            dinamicStyle.shadowColor = "#ddd";
            dinamicStyle.shadowOpacity = .5;
        }

        return (
            <View style={[styles.container, dinamicStyle]} ref={(nav)=>{this.navBar = nav}}>
                { this._renderLeft() }
                { this._renderMiddle() }
                { this._renderRight() }
            </View>
        )
    }
}