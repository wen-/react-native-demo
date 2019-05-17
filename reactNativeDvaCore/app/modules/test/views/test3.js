import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'tools/dva';
//import Actions from '../actions/test1';

class Test3 extends Component {
  constructor(props) {
    super(props);
    //new Actions(this);
  }

  滚动事件(e){
    console.log(e.nativeEvent);
    if(e.nativeEvent.contentOffset.y <= 200){
      let _透明度 = e.nativeEvent.contentOffset.y/100;
      console.log("透明度：",_透明度);
      DeviceEventEmitter.emit('改变导航透明度',{透明度:_透明度})
    }
  }

  render() {
    //const { title } = this.props;
    return (
      <View style={{flex:1, paddingTop: 44, backgroundColor: '#6cc2ff'}}>
        <ScrollView scrollEventThrottle={16} onScroll={this.滚动事件.bind(this)}>
          <View style={{height: 1000}}>
            <Text>右姓名：{this.props.testData.name}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(({ testData }) => ({ testData, title: '测试页' }))(Test3);
