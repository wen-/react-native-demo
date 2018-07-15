import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'

import {CustomModal} from './customModal'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            模态框配置:{
                显示:false,
                显示方式:'fade',
                文本:"test",
                按钮配置:[{"文字":"取消","事件":"隐藏模态框"},{"文字":"确定","事件":"隐藏模态框"}]
            }
        };
    }

    componentDidMount(){
        this.state.模态框配置.文本 = "测试模态框";
        this.state.模态框配置.按钮配置 = [{"文字":"取消","事件":this.隐藏模态框.bind(this)},{"文字":"确定","事件":this.隐藏模态框.bind(this)}];
    }

    显示模态框(showtime){
        let _模态框配置 = this.state.模态框配置;
        _模态框配置.显示 = true;
        this.setState({模态框配置:_模态框配置});
        if(showtime && parseInt(showtime) > 0){
            this.自动隐藏模态框 = setTimeout(function () {
                let _模态框配置 = this.state.模态框配置;
                _模态框配置.显示 = false;
                this.setState({模态框配置:_模态框配置});
            }.bind(this),showtime);
        }
    }
    隐藏模态框(){
        this.自动隐藏模态框 &&　clearTimeout(this.自动隐藏模态框);
        let _模态框配置 = this.state.模态框配置;
        _模态框配置.显示 = false;
        this.setState({模态框配置:_模态框配置});
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:"#000"}}>测试模态弹窗</Text>

                <TouchableOpacity style={{width:50,height:30,backgroundColor:"#13d0ff"}} onPress={()=>{
                    this.显示模态框(6000)
                }}>
                    <Text style={{color:"#000"}}>显示</Text>
                </TouchableOpacity>

                <CustomModal {...this.state.模态框配置} 隐藏模态框={this.隐藏模态框.bind(this)} />
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1
    },
}