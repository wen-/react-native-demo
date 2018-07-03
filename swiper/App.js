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
import storage from './components/Utils/StorageUtil';

import Basic from './components/Basic/'
import Dynamic from './components/Dynamic/'
import LoadMinimal from './components/LoadMinimal/'
import Phone from './components/Phone/'
import Swiper from './components/Swiper/'  // working but no title displayed
import SwiperNumber from './components/SwiperNumber/'
import SplashPage from "./components/SplashPage"; // working but no title displayed

const TabIcon = ({ focused, title, icontext }) => {
	return (
		<Icon name={icontext} size={30} color={focused ? '#07f' :'#b57830'} />
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
								activeBackgroundColor="white"
								inactiveBackgroundColor="white"
							>
								<Stack key="Basic标签" tabBarLabel="Basic" initial icon={TabIcon} icontext="add-user">
									<Scene key="Basic" component={Basic} title="Basic"/>
								</Stack>
								{/*<Stack key="Dynamic标签" tabBarLabel="Dynamic" icon={TabIcon} icontext="address">*/}
									{/*<Scene key="Dynamic" component={Dynamic} title="Dynamic"/>*/}
								{/*</Stack>*/}
								{/*<Stack key="LoadMinimal标签" tabBarLabel="LoadMinimal" icon={TabIcon} icontext="adjust">*/}
									{/*<Scene key="LoadMinimal" component={LoadMinimal} title="LoadMinimal"/>*/}
								{/*</Stack>*/}
								{/*<Stack key="Phone标签" tabBarLabel="Phone" icon={TabIcon} icontext="air">*/}
									{/*<Scene key="Phone" component={Phone} title="Phone"/>*/}
								{/*</Stack>*/}
								{/*<Stack key="Swiper标签" tabBarLabel="Swiper" icon={TabIcon} icontext="aircraft">*/}
									{/*<Scene key="Swiper" component={Swiper} title="Swiper"/>*/}
								{/*</Stack>*/}
								{/*<Stack key="SwiperNumber标签" tabBarLabel="SwiperNumber" icon={TabIcon} icontext="archive">*/}
									{/*<Scene key="SwiperNumber" component={SwiperNumber} title="SwiperNumber"/>*/}
								{/*</Stack>*/}
								<Stack key="我的标签" tabBarLabel="我的" icon={TabIcon} icontext="user">
									<Scene key="我的" component={user} title="我的"/>
								</Stack>
							</Tabs>

						</Scene>
					</Scene>
				</Overlay>
			</Router>
		);
	}
}

AppRegistry.registerComponent('examples', () => App);
