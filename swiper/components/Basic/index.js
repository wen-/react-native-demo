import React, {Component} from 'react'
import {
  Text,
  View,
    ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Entypo';

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

export default class extends Component {
    constructor(props) {
        super(props)
        this.state={
            showSlider:false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                showSlider:true
            })
            //为了解决安卓轮播图无法显示的bug
        },100)

    }
    jump = ()=>{
        console.log(123);
    }
    showSwiper(){
        if(this.state.showSlider){
            return(
                <Swiper style={styles.wrapper} showsButtons height={200}>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>simple</Text>
                        <Icon.Button name="area-graph" size={30} onPress={this.jump}/>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={[styles.text,{color:"red"}]}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
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
