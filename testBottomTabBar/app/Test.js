import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, justifyItems: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>test</Text>
        <TouchableOpacity onPress={() => Actions.test()}>
          <Text>跳转</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
