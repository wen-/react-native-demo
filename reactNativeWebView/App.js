/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, WebView} from 'react-native';
//import { WebView } from 'react-native-webview';
//独立包：
// yarn add react-native-webview;
// react-native link react-native-webview

const patchPostMessageJsCode = `(${String(function() {
  // 可不用重写postMessage
  // var originalPostMessage = window.postMessage
  // var patchedPostMessage = function(message, targetOrigin, transfer) {
  //   originalPostMessage(message, targetOrigin, transfer)
  // }
  // patchedPostMessage.toString = function() {
  //   return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
  // }
  // window.postMessage = patchedPostMessage;
  setTimeout(function() {
    //自动调整webView高度
    //react-native-webview方式调用
    //window.ReactNativeWebView.postMessage(JSON.stringify({type: 'setHeight', height: document.body.scrollHeight}));
    window.postMessage(JSON.stringify({type: 'setHeight', height: document.body.scrollHeight}));
  },500)
})})();`;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      webViewH: 100,
    }
    this.webViewRef = React.createRef();
  }

  _htmlString(){
    return `
      <!DOCTYPE html>
      <html lang="zh">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
          <title>Title</title>
      </head>
      <body>
        <h1>这是webView，自动调整webView高度</h1>
        <p><img src="http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg" /></p>
        <p><img src="http://pic40.nipic.com/20140331/9469669_142840860000_2.jpg" /></p>
        <p><img src="http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg" /></p>
        <p><img src="http://pic.lvmama.com/uploads/pc/place2/2014-10-10/1412923703560.jpg" /></p>
        <style type="text/css">
            img{
                max-width: 100%;
            }
        </style>
      </body>
      </html>
    `
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={{height: 300, backgroundColor: '#ff0000', justifyContent: 'center'}} >
          <Text style={{color: '#000', textAlign: 'center'}}>其它内容</Text>
        </View>
        <WebView
          style={{height: this.state.webViewH, backgroundColor: 'green'}}
          ref={this.webViewRef}
          //originWhitelist={['*']}
          source={{html: this._htmlString(), /*解决安卓中文乱码*/baseUrl: ''/*end*/}}
          startInLoadingState={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          // onLoadStart={this.onLoadStart.bind(this)}
          // onLoad={this.onLoad}
          // onLoadEnd={this.onLoadEnd}
          onMessage={event => {
            console.log(event.nativeEvent.data);
            if(event.nativeEvent.data){
              let data = JSON.parse(event.nativeEvent.data);
              this.setState({
                webViewH: data.height
              });

            }
          }}
          // renderLoading={this.renderLoading}
          // renderError={this.renderError}
          // onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          injectedJavaScript={patchPostMessageJsCode}
          // injectFilterInterceptArray={过滤地址}
          allowInterceptUrl={true}
          mixedContentMode={'always'}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#ff0000"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
