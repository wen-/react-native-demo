import React from 'react';
import RootView from 'components/base/rootView';
import ToastView from 'components/base/toastView';

/*
* 使用说明：
import Toast from 'components/base/toast';

Toast.loading();

//type可选参数：'CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'
Toast.loading({
  msg: "加载中",
  type: "Circle",
  size: 30,
  color: '#fff'
});

Toast.info('测试toast提示框');

Toast.info({
  msg: '测试toast提示框',
  duration: 3000,
  onDismiss: ()=>{
    Toast.info('toast提示框')
  }
});

Toast.hide();

*/

export default class Toast{

  static info(obj) {
    const msg = (typeof obj == "string")?obj:obj.msg;
    RootView.setView(
      <ToastView
        toastType="info"
        message={msg}
        duration={obj.duration}
        onDismiss={() => {
          RootView.setView();
          (typeof obj.onDismiss == 'function') && obj.onDismiss();
        }} />
    );
  }

  static loading(obj={}) {
    RootView.setView(
      <ToastView
        toastType="loading"
        loadType={obj.type}
        size={obj.size}
        color={obj.color}
        message={obj.msg}
        onDismiss={() => {
          RootView.setView();
          (typeof obj.onDismiss == 'function') && obj.onDismiss();
        }} />
    );
  }

  static hide() {
    //RootView.setView();
    ToastView.dismiss()
  }

}
