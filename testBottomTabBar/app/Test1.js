import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class Test1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, justifyItems: 'center', alignItems: 'center', backgroundColor: 'green'}}>
        <Text>test1</Text>
      </View>
    );
  }
}
