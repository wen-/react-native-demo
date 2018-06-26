import React, {Component} from 'react'
import {
	Text,
	View,
	Image,
	Linking,
	TouchableHighlight,
	ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Entypo';
import CryptoJS from 'crypto-js/core';
import AES from 'crypto-js/aes';
import {接口配置} from '../request/Domain';
import {crypto_config} from '../config/crypto'
const loading = require('../LoadMinimal/img/loading.gif');


var styles = {
	container: {
		flex: 1
	},
	wrapper: {
		height:200,
		backgroundColor:"red",
	},
	slide: {
		flex: 1,
		backgroundColor: 'transparent'
	},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5'
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9'
	},
	text: {
		color: '#000',
		fontSize: 30,
		fontWeight: 'bold'
	},
	loadingView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.5)'
	},

	loadingImage: {
		width: 60,
		height: 60
	}
}

const Slide = props => {
	return (
		<View style={styles.slide}>
			<TouchableHighlight style={styles.slide} onPress={()=>props.jump(props.link)}>
				<View style={styles.slide}>
					<Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.slide} source={{uri: props.uri}} />
					{!props.loaded && <View style={styles.loadingView}>
						<Image style={styles.loadingImage} source={loading} />
					</View>}
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default class extends Component {
	constructor(props) {
		super(props)
		this.state={
			showSlider:false,
			imgList:[],
			loadQueue: [0, 0, 0, 0]
		}
		this.loadHandle = this.loadHandle.bind(this)
	}
	componentDidMount(){
		// setTimeout(()=>{
		// 	this.setState({
		// 		showSlider:true
		// 	})
		// 	//为了解决安卓轮播图无法显示的bug
		// },100);
		let banner_url = global.配置.域名+接口配置.banner;
		fetch(banner_url).then((response) => {
			return response.json();
		}).then((responseJson) => {
			if(responseJson.status == 200){
				if(responseJson.data){
					let key = crypto_config.AES_KEY;
					let _v = key.substring(0,16);
					key = CryptoJS.enc.Utf8.parse(key);
					let iv = CryptoJS.enc.Utf8.parse(_v);
					let data = AES.decrypt(responseJson.data,key,{"iv":iv,"mode": CryptoJS.mode.CBC,"padding":CryptoJS.pad.Pkcs7});
					data = data.toString(CryptoJS.enc.Utf8);
					try{
						data = JSON.parse(data);
						this.setState({
							showSlider:true,
							imgList:data
						})
					}catch(err){
						console.log("JSON解释出错："+data);
					}
				}
			}
		}).catch((error) =>{
			console.error(error);
		});
	}
	jump = (link)=>{
		//调用系统浏览器打开外部地址
		Linking.canOpenURL(link).then(supported => {
			if (!supported) {
				console.log('不能打开外部地址:' + link);
			} else {
				return Linking.openURL(link);
			}
		}).catch(function(err){
			console.error('打开外部地址出错了:', err);
		});
	};

	loadHandle (i) {
		let loadQueue = this.state.loadQueue
		loadQueue[i] = 1
		this.setState({
			loadQueue
		})
	}
	showSwiper(){
		if(this.state.showSlider){
			return(
				<Swiper loadMinimal loadMinimalSize={3} style={styles.wrapper} height={200} loop>
					{
						this.state.imgList.map((item, i) => <Slide
							loadHandle={this.loadHandle}
							loaded={!!this.state.loadQueue[i]}
							jump={this.jump}
							uri={item.img}
							link={item.link}
							i={i}
							key={i} />)
					}
				</Swiper>
			)
		}else{
			return null;
		}
	}
	render(){
		return(
			<View style={styles.container}>
				<ScrollView>
					<View style={{height:200}}>
						{this.showSwiper()}
					</View>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
					<Text style={{fontSize:30,height:100,borderWidth:2,borderColor:"green",backgroundColor:"yellow"}}>123</Text>
				</ScrollView>
			</View>
		)
	}
}
