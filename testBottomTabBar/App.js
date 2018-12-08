import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import Test from './app/Test';
import Test1 from './app/Test1';
import Test2 from './app/Test2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


const TabIcon = ({ focused, title, icontext }) => {
  let elem;
  if(icontext == "paper-plane"){
    elem = <View style={{position:"absolute",zIndex:100,marginTop:-80,width:80,height:80,alignItems:"center",justifyContent:"center",backgroundColor:"#fff",borderRadius:50,borderColor:"rgba(0, 0, 0, .3)",borderWidth: StyleSheet.hairlineWidth}}>
      <Icon name={icontext} size={50} color={focused ? '#07f' :'#cccccc'} />
    </View>
  }else{
    elem = <Icon name={icontext} size={20} color={focused ? '#07f' :'#cccccc'} />
  }
  return (
    elem
  );
};

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forHorizontal,
});

const App = () => (
  <Router createReducer={reducerCreate} onStateChange={stateHandler} getSceneStyle={getSceneStyle} uriPrefix={prefix}>
    <Overlay key="overlay">
      <Scene
        key="root"
        hideNavBar
        gesturesEnabled={true}
        transitionConfig={transitionConfig}
      >
            <Tabs
              key="标签组"
              showLabel={true}
              tabBarPosition="bottom"
              swipeEnabled={true}
              lazy={false}
              legacy={true}
              activeBackgroundColor="white"
              inactiveBackgroundColor="white"
            >
              <Stack key="首页标签" tabBarLabel="首页" initial icon={TabIcon} icontext="dropbox">
                <Scene key="首页" component={Test} title="首页" />
              </Stack>

              <Stack key="中间标签" tabBarLabel=" " showLabel={false} icon={TabIcon} icontext="paper-plane">
                <Scene key="中间" component={Test1} title="中间"/>
              </Stack>

              <Stack key="我的标签" tabBarLabel="我的" icon={TabIcon} icontext="user">
                <Scene key="我的" component={Test2} title="我的" />
              </Stack>

            </Tabs>

          <Scene key="test" component={Test2} title="Test2" />
      </Scene>


    </Overlay>
  </Router>
);

export default App;
