import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
ViewToast = null;

export default class ToastView extends Component {

  static propTypes = {
    toastType: PropTypes.string,
    loadType: PropTypes.string,
  message:PropTypes.string,
    duration: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    toastType: "loading", //loading、info
    loadType: "Circle", //'CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'
    message: "",
    duration: 2000,
    size: 30,
    color: "#fff"
  };

  opacityAnim = new Animated.Value(0);
  dismissHandler = null;

  constructor(props) {
    super(props);
    ViewToast = this;
    this.state = {
      toastType: props.toastType,
      loadType: props.loadType,
      size: props.size,
      color: props.color,
      message: props.message,
      duration: props.duration,
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
      toastType: nextProps.toastType,
      loadType: nextProps.loadType,
      size: nextProps.size,
      color: nextProps.color,
      message: nextProps.message,
      duration: nextProps.duration,
    },function () {
      this.timingDismiss();
    });
    clearTimeout(this.dismissHandler);

  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }

  timingDismiss = () => {
    (this.state.toastType == 'info') && (this.dismissHandler = setTimeout(() => {
      ToastView.dismiss();
    }, this.state.duration));
  };

  static dismiss = () => {
    Animated.timing(
      ViewToast.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      },
    ).start(ViewToast.onDismiss);
  };

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  };

  render() {
    const { toastType, loadType, size, color, message } = this.state;
    return (
      <View style={styles.container} pointerEvents='box-none'>
        <Animated.View style={[styles.textContainer, {opacity: this.opacityAnim, transform: [{ scale: this.opacityAnim }]}]}>
          {toastType == "loading" && <Spinner style={{margin: 10}} size={size} type={loadType} color={color}/>}
          {!!message && <Text style={styles.defaultText}>{message}</Text>}
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
    alignItems: 'center'
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