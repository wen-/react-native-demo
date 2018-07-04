import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter,} from 'react-native'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
	container: {
		height: (Platform.OS === 'ios') ? 44 : 44,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	navBarLeftItem: {
		position:"absolute",
		left:0,
		top:0,
		width:50,
		height:44,
		paddingLeft:10,
		justifyContent: 'center'
	},
	navBarTitleItem:{
		flex:1,
		alignItems:'center',
		justifyContent: 'center',
		paddingLeft:50,
		paddingRight:50,
	},
	navBarRightItem:{
		position:"absolute",
		right:0,
		top:0,
		width:50,
		height:44,
		justifyContent:'center'
	},
	navTitle:{
		color:"#000",
		fontSize:16,
	}
});

export default class CustomNavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			透明度: 0,
		}
	}

	componentWillMount(){
		this.订阅改变导航透明度 = DeviceEventEmitter.addListener('改变导航透明度', (params) => {
			this.setState({
				透明度:params.透明度
			});
		});
	}

	componentWillUnmount() {
		if(this.订阅改变导航透明度) {
			this.订阅改变导航透明度.remove();
		}
	}

	_renderLeft() {
		if (Actions.currentScene === '首页' || Actions.currentScene === '我的') {
			return null;
		} else {
			return (
				<TouchableOpacity
					onPress={Actions.pop}
					style={[styles.navBarLeftItem]}>
					<Icon name={"reply"} size={30} color={'#000'} />
				</TouchableOpacity>
			)
		}
	}

	_renderMiddle() {
		return (
			<View style={styles.navBarTitleItem}>
				<Text style={styles.navTitle}>{ this.props.title }</Text>
			</View>
		)
	}

	_renderRight() {
		if (Actions.currentScene === '搜索') {
			return (
				<View style={[styles.navBarRightItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
					<TouchableOpacity
						onPress={() => {}}
						style={{ paddingRight: 10,justifyContent: 'center' }}>
						<Icon name={"magnifying-glass"} size={30} color={'#000'} />
					</TouchableOpacity>
				</View>
			)
		} else {
			return null;
		}
	}

	render() {
		let dinamicStyle = {};
		let _rgba = 'rgba(255,255,255,'+this.state.透明度+')';
		if (Actions.currentScene === '我的') {
			dinamicStyle = {position:"absolute", width:"100%",top:0, backgroundColor: _rgba}
		} else {
			dinamicStyle = { backgroundColor: '#fff'}
		}

		return (
			<View style={[styles.container, dinamicStyle]}>
				{ this._renderLeft() }
				{ this._renderMiddle() }
				{ this._renderRight() }
			</View>
		)
	}
}