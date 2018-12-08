import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class Test2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, justifyItems: 'center', alignItems: 'center', backgroundColor: 'blue'}}>
        <Text>test2</Text>
      </View>
    );
  }
}
