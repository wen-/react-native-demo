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
import {接口配置} from '../request/Domain';
const loading = require('../LoadMinimal/img/loading.gif');

var styles = {
	container: {
		flex: 1
	},
	wrapper: {
		height:200,
		backgroundColor:"red",
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
	}
}

const Slide = props => {
	return (<View style={styles.slide}>
		<TouchableHighlight onPress={props.jump}>
			<Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}} />
			{
				!props.loaded && <View style={styles.loadingView}>
					<Image style={styles.loadingImage} source={loading} />
				</View>
			}
		</TouchableHighlight>
	</View>)
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
		banner_url = "https://wen-1.github.io/api/data/swiper_banner.json";
		fetch(banner_url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => {
			return response.json();
		}).then((responseJson) => {
			if(responseJson.status == 200){
				this.setState({
					showSlider:true,
					imgList:responseJson.data
				})
			}
			// this.setState({
			// 	isLoading: false,
			// 	dataSource: responseJson.movies,
			// }, function(){
			//
			// });

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
				<Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} height={200}>
					{
						this.state.imgList.map((item, i) => <Slide
							loadHandle={this.loadHandle}
							loaded={!!this.state.loadQueue[i]}
							jump={function(){this.jump(item.link)}.bind(this)}
							uri={item.img}
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
