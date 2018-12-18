import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

export default class BasePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  }
});

BasePage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

BasePage.defaultProps = {
  children: null,
};
