import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    Overlay,
    Tabs,
    Stack,
} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';
import storage from './components/utils/storageUtil';

import User from './components/user/'
import Edit from './components/user/edit'
import Example from './components/spinner/'
import Basic from './components/basic/'
import CustomNavBar from './components/customNav/'
import CustomTabBarComponent from './components/customTabs/'
import testModal from './components/utils/testModal'
import SplashPage from "./components/splashPage"; // working but no title displayed


import ViewOverflow from 'react-native-view-overflow';

const TabIcon = ({ focused, title, icontext }) => {
    let elem;
    if(icontext == "paper-plane"){
        elem = <View style={{position:"absolute",zIndex:100,marginTop:-80,width:80,height:80,alignItems:"center",justifyContent:"center",backgroundColor:"#fff",borderRadius:50,borderColor:"#efefef",borderWidth:1}}>
            <Icon name={icontext} size={50} color={focused ? '#07f' :'#cccccc'} />
        </View>
    }else{
        elem = <Icon name={icontext} size={20} color={focused ? '#07f' :'#cccccc'} />
    }
    return (
        elem
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
    navigationBar:{
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        elevation: 0,
        height: 44,
    },
    navigationBarTitle:{
        fontSize: 18,
        fontWeight: 'normal',
        color: '#222',
        textAlign: 'center',
        alignSelf: 'center',
        flex:1
    }
});

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
});

export default class App extends Component{

    constructor(props) {
        super(props);
        if(Platform.OS == 'ios') {
            global.配置 = props.配置?props.配置:{};
        }else{
            global.配置 = props.配置?JSON.parse(props.配置):{};
        }

        this.项目名 = props.配置.项目名称||"";
    }

    render() {
        return (
            <Router
                createReducer={reducerCreate}
                getSceneStyle={getSceneStyle}>

                <Overlay key="overlay">
                    <Scene key="root" hideNavBar gesturesEnabled={false}
                           transitionConfig={() => ({
                               screenInterpolator: (props) => {
                                   switch (props.scene.route.params.direction) {
                                       case 'vertical':
                                           return CardStackStyleInterpolator.forVertical(props);
                                       case 'fade':
                                           return CardStackStyleInterpolator.forFade(props);
                                       case 'none':
                                           return CardStackStyleInterpolator.forInitial
                                       case 'horizontal':
                                       default:
                                           return CardStackStyleInterpolator.forHorizontal(props)
                                   }
                               }
                           })}
                    >
                        <Scene key="启动页" component={SplashPage} title="启动" initial direction="fade"/>
                        <Scene key="主界面" title="swiper" hideNavBar direction="fade" navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationBarTitle}>
                            <Tabs
                                key="标签组" showLabel={true}
                                tabBarPosition="bottom"
                                swipeEnabled={false}
                                lazy={true}
                                tabBarComponent={Platform.OS == 'ios'?null:CustomTabBarComponent}
                                activeBackgroundColor="white"
                                inactiveBackgroundColor="white"
                            >
                                <Stack key="首页标签" tabBarLabel="首页" initial icon={TabIcon} icontext="dropbox">
                                    <Scene key="首页" component={Basic} title="首页" />
                                </Stack>

                                <Stack key="中间标签" tabBarLabel=" " showLabel={false} icon={TabIcon} icontext="paper-plane">
                                    <Scene key="中间" component={User} title="中间"/>
                                </Stack>

                                <Stack key="我的标签" tabBarLabel="我的" icon={TabIcon} icontext="user">
                                    <Scene key="我的" component={User} title="我的" navBar={CustomNavBar}/>
                                </Stack>

                            </Tabs>

                        </Scene>

                        <Scene key="加载页" component={Example} title="加载效果" hideNavBar={false} navBar={CustomNavBar} />
                        <Scene key="编辑个人资料" component={Edit} title="键盘遮挡测试" hideNavBar={false} navBar={CustomNavBar} />
                        <Scene key="测试模态框组件" component={testModal} title="测试模态框组件" hideNavBar={false} navBar={CustomNavBar} />

                    </Scene>
                </Overlay>
            </Router>
        );
    }
}

AppRegistry.registerComponent('examples', () => App);
