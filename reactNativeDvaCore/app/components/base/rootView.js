import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
viewRoot = null;

class RootView extends Component {

  constructor(props) {
    super(props);
    viewRoot = this;
    this.state = {
      element: null,
    }
  }

  static setView = (view) => {
    viewRoot.setState({element: view||null});
  };

  render() {
    return (
      this.state.element
    );
  }
}
const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, component) => {

  return originRegister(appKey, function () {
    const OriginAppComponent = component();

    return class extends Component {
      render() {
        return (
          <View style={styles.container}>
            <OriginAppComponent/>
            <RootView/>
          </View>
        );
      };
    };
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default RootView;
