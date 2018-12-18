import BaseActions from 'tools/baseActions'

export default class Actions extends BaseActions{

  changeName(name) {
    this.props.dispatch({ type: 'testData/setOrdersDetail', data: { name } });
  }

}
