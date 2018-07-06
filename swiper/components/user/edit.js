import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {字体样式,布局样式} from "../styles";

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
            姓名:"",
            年龄:"",
            性别:""
        }
    }

    componentWillMount() {

    };

    componentWillUnmount() {

    }

    componentDidMount(){

    }

    滚动事件(e){
        console.log(e.nativeEvent);
        if(e.nativeEvent.contentOffset.y <= 110){

        }
    }

    trim (str) {
        if(str){
            return str.replace(/^\s+/, '').replace(/\s+$/, '');
        }else{
            return "";
        }
    }

    输入框文字改变 = (关键词,elem) =>{
        let code = this.trim(关键词);
        let data = {};
        data[elem] = code;
        this.setState(data);
    };

    nextInput(输入框){
        if(输入框 === "最后一项"){
            //this.保存();
        }else{
            this.refs[输入框].focus();
        }
    }

    内容节点(){
        return(
            <ScrollView scrollEventThrottle={16} onScroll={this.滚动事件.bind(this)} keyboardShouldPersistTaps={"handled"}>

                <Text>以下SectionList节点</Text>
                <SectionList  keyboardShouldPersistTaps={"handled"}
                              renderItem={({item, index, section}) => (
                                  <View key={index} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderBottomWidth:.5,borderBottomColor:"#ddd"}}>
                                      <Text style={[字体样式.黑色,{width:80,textAlign:"right"}]}>{item.txt}：</Text>
                                      <TextInput style={[布局样式.f1,字体样式.黑色,{height:40,}]} ref={item.txt+"输入框"} underlineColorAndroid="transparent" onChangeText={(t)=>{this.输入框文字改变(t,item.txt)}} placeholder={"请输入"+item.txt} value={this.state[item.txt]}/>
                                      <TouchableOpacity onPress={()=>{console.log(123) }} style={{width:80}}>
                                          <Text style={字体样式.黑色}>按钮测试</Text>
                                      </TouchableOpacity>
                                  </View>
                              )}
                              sections={[
                                  {title: '个人资料', data: [{txt:'手机号'},{txt:'邮箱'},{txt:'地址'}, {txt:'身份证'}, {txt:'信用卡'}, {txt:'芝麻分'},{txt:'邮箱'},{txt:'地址'}, {txt:'身份证'}, {txt:'信用卡'}, {txt:'芝麻分'}]},
                              ]}
                              keyExtractor={(item, index) => item + index}
                              style={{}}
                />

                <Text>以下常规节点</Text>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderBottomWidth:.5,borderBottomColor:"#ddd"}}>
                    <Text style={[字体样式.黑色,{width:80,textAlign:"right"}]}>姓名：</Text>
                    <TextInput style={[布局样式.f1,字体样式.黑色,{height:40,}]} ref="姓名输入框" underlineColorAndroid="transparent" onChangeText={(t)=>{this.输入框文字改变(t,"姓名")}} placeholder={"请输入姓名"} value={this.state.姓名} onSubmitEditing={() => this.nextInput("性别输入框")}/>
                    <TouchableOpacity onPress={()=>{console.log(123) }} style={{width:80}}>
                        <Text>按钮测试</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderBottomWidth:.5,borderBottomColor:"#ddd"}}>
                    <Text style={[字体样式.黑色,{width:80,textAlign:"right"}]}>性别：</Text>
                    <TextInput style={[布局样式.f1,字体样式.黑色,{height:40,}]} ref="性别输入框" underlineColorAndroid="transparent" onChangeText={(t)=>{this.输入框文字改变(t,"性别")}} placeholder={"请输入性别"} value={this.state.性别} onSubmitEditing={() => this.nextInput("年龄输入框")}/>
                </View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderBottomWidth:.5,borderBottomColor:"#ddd"}}>
                    <Text style={[字体样式.黑色,{width:80,textAlign:"right"}]}>年龄：</Text>
                    <TextInput style={[布局样式.f1,字体样式.黑色,{height:40,}]} ref="年龄输入框" underlineColorAndroid="transparent" onChangeText={(t)=>{this.输入框文字改变(t,"年龄")}} placeholder={"请输入年龄"} value={this.state.年龄}/>
                </View>

            </ScrollView>
        )
    }

    render(){
        //ScrollView加入属性keyboardShouldPersistTaps={"handled"}，常规节点TextInput切换，键盘不收起；
        //SectionList节点TextInput切换，键盘会收起；(发现SectionList节点也有keyboardShouldPersistTaps属性，设置即可)
        //多输入建议使用常规节点
        //TextInput确定、提交事件onSubmitEditing（如果multiline={true}，此属性不可用） ，ios可定义按钮文字returnKeyType
        //安卓下测试不存在被键盘遮挡，ios会遮挡
        return(
            <View style={styles.container}>
                {(Platform.OS === 'ios')?<KeyboardAwareScrollView>{this.内容节点()}</KeyboardAwareScrollView>:this.内容节点()}

            </View>
        )
    }

}