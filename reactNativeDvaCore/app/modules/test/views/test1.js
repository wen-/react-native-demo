import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  DeviceEventEmitter, Animated, Easing,
} from 'react-native';
import { connect } from 'tools/dva';
import Toast from 'components/base/toast';
import Actions from '../actions/test1';

class Test1 extends Component {
  constructor(props) {
    super(props);
    new Actions(this);
  }

  componentDidMount() {
    this.init();
    //Toast.info('测试toast提示框');
    //Toast.info({msg: '测试toast提示框', duration: 3000, onDismiss: ()=>{Toast.info('toast提示框')}});
    //Toast.loading({msg: "加载中"});
  }

  render() {
    const { title } = this.props;
    return (
        <View style={{flex:1}}>
          <Text>左姓名：{this.props.testData&&this.props.testData.name}</Text>
          <TouchableOpacity onPress={()=>{
            this.changeName(123);
            //Toast.info({msg: "加载成功"});
            Toast.hide();
          }}>
            <Text>修改姓名为：123</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
//此处不推荐用装饰器
export default connect(({ testData }) => ({ testData, title: '测试页' }))(Test1);
