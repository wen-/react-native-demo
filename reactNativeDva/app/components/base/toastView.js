import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';

export default class ToastView extends Component {

  static propTypes = {
    message:PropTypes.string,
    duration: PropTypes.number,
  };

  static defaultProps = {
    message: "暂无提示信息",
    duration: 2000,
  };

  opacityAnim = new Animated.Value(0);
  dismissHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      duration: props.duration||2000,
    }
  }

  componentDidMount() {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      },
    ).start(this.timingDismiss);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({
      message: nextProps.message,
      duration: nextProps.duration,
    });
    clearTimeout(this.dismissHandler);
    this.timingDismiss();
  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }

  timingDismiss = () => {
    this.dismissHandler = setTimeout(() => {
      this.dismiss();
    }, this.state.duration);
  };

  dismiss = () => {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      },
    ).start(this.onDismiss);
  };

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  };

  render() {
    return (
      <View style={styles.container} pointerEvents='box-none'>
        <Animated.View style={[styles.textContainer, {opacity: this.opacityAnim, transform: [{ scale: this.opacityAnim }]}]}>
          <Text style={styles.defaultText}>{this.state.message}</Text>
        </Animated.View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin:10,
    maxWidth: 300,
  },
  defaultText: {
    color: "#FFF",
    fontSize: 15,
  },
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  }
});