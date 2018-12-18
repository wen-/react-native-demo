import React from 'react';
import RootView from 'components/base/rootView';
import ToastView from 'components/base/toastView';

export default class Toast{

  static show(obj) {
    const msg = (typeof obj == "string")?obj:obj.msg;
    RootView.setView(
      <ToastView
      message={msg}
      duration={obj.duration}
      onDismiss={() => {
        RootView.setView();
      }} />
    );
  }

}
