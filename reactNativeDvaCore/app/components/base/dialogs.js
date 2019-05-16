import React from 'react';
import RootView from 'components/base/rootView';
import DialogsView from 'components/base/dialogsView';

/*
* 使用说明：
import Dialogs from 'components/base/dialogs';

Dialogs.alert("11111111");

Dialogs.alert({
  msg: '11111111',
  confirmTxt: 'OK',
  confirmPress: ()=>{
    console.log('点了OK');
  };
});

dialogs.confirm({
  msg: '22222222',
  cancelTxt: 'no',
  confirmTxt: 'yes',
  cancelPress: ()=>{
    console.log('点了no');
  },
  confirmPress: ()=>{
    console.log('点了yes');
  };
});

*/

export default class Dialogs{

  static alert(obj) {
    const msg = (typeof obj == "string")?obj:obj.msg;
    RootView.setView(
      <DialogsView
        type="alert"
        message={msg}
        confirmTxt={obj.confirmTxt}
        confirmPress={() => {
          RootView.setView();
          (typeof obj.confirmPress == 'function') && obj.confirmPress();
        }} />
    );
  }

  static confirm(obj) {
    RootView.setView(
      <DialogsView
        type="confirm"
        message={obj.msg}
        cancelTxt={obj.cancelTxt}
        confirmTxt={obj.confirmTxt}
        cancelPress={() => {
          RootView.setView();
          (typeof obj.cancelPress == 'function') && obj.cancelPress();
        }}
        confirmPress={() => {
          RootView.setView();
          (typeof obj.confirmPress == 'function') && obj.confirmPress();
        }} />
    );
  }

}
