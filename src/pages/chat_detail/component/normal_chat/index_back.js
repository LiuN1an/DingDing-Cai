/**
 * author: Peter
 * time: 2020-03-11 
 * 
 * TODO 监听Input组件换行，自适应高度变化
 */
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { NavBar, Icon, Toast } from 'antd-mobile'
import { InfiniteScroll } from 'react-infinite-scroll-component'
import { ChatBox } from '../../common/chat_box'
import Input from '../../../../components/basic/input'
import ChatScroll from '../../../../components/basic/scroll'

import { get_chat_detail_1, get_chat_detail } from '../../../../store/action'

import './index.css'

var total = 5 // 测试，最多加载五轮
var data = []
var float_ = 0
for(let i=0;i<100;i++) {
	data.push({
		"id": i,
		"name": "dzcasd",
		"float": float_
	})
	float_ = float_?0:1
}
class NormalChat extends React.Component {
    constructor(props) {
        super(props)
   //      const dataSource = new ListView.DataSource({
			// rowHasChanged: (row1, row2) => JSON.stringify(row1) !== JSON.stringify(row2)
   //      })
        this.state = {
            // dataSource: dataSource,
            isLoading: false,
            hasMore: true,
            changeMode: false,
			chatData: [],
			old_length: 0,
			current_length: 0,
        }
        this.emotion = require('../../../../assets/common/emotion.png')
        this.add = require('../../../../assets/common/add.png')
        this.input = require('../../../../assets/common/like.png')
    }

    componentDidMount() {
        this.props.get_chat_detail_1(this.props.location.state.user_id).then( data => {
            let old = this.state.old_length
			console.log('request: ')
			console.log(this.props.data)
			this.setState({
                chatData: this.props.data,
				current_length: this.props.data.length-old,
				old_length: this.props.data.length,
                isLoading: false,
            })
        })
    }

  //   onEndReached = (event) => {
		// if(this.state.isLoading && !this.state.hasMode) {
		// 	return 
		// }
		// this.setState({
		// 	isLoading: true
		// })
		// if(total >= 0) {
		// 	this.props.get_chat_detail(this.props.location.state.user_id).then( data => {
		// 		this.setState({
		// 			dataSource: this.state.dataSource.cloneWithRows(this.props.data),
		// 			isLoading: false
		// 		})
		// 	})
		// 	total -= 1
		// } else {
		// 	this.setState({
		// 		isLoading: false,
		// 		hasMore: true
		// 	})
		// }
  //   }

    touchPhone = () => {
        this.setState({
            changeMode: !this.state.changeMode,
        })
    }
	
	bindLastRef = (el,rowID) => {
		// console.log(el)
		if(rowID === this.state.current_length-1) {
			this.last = el
		}
	}
    
	getNewData() {
		let newD = []
		var float_ = 0
		for(let i=0;i<100;i++) {
			newD.push({
				"id": i,
				"name": "dzcasd",
				"float": float_
			})
			float_ = float_?0:1
		}
		return newD
	}
	
	updateData = () => {
		this.props.get_chat_detail(this.props.location.state.user_id).then( data => {
		    let old = this.state.old_length
		    this.setState({
		        chatData: this.props.data,
		    	current_length: this.props.data.length-old,
		    	old_length: this.props.data.length,
		        isLoading: false,
		    })
		})
	}
	
	updateLoading = (e) => {
		this.setState({
			isLoading: e
		})
	}
    render() {
		
        return (
		<>
			<ChatScroll
				height={'80%'}
				width={'100%'}
				isLoading={this.state.isLoading}
				loadComponent={<div style={{textAlign: 'center'}}>正在加载</div>}
				updateLoading={this.updateLoading}
				dataSource={this.state.chatData}
				lastIndex={this.state.current_length}
				updateData={this.updateData}
				threshold={5}
			/>
            <div className="normal-bottom-container">
                <img onClick={this.touchPhone} src={this.state.changeMode?require('../../../../assets/common/keyboard.png'):require('../../../../assets/common/phone.png')} alt="" width="30px" height="30px" />
                {/* { TODO input } */}
                <div className="normal-bottom-content">
                    <Input icon={this.input} change={this.state.changeMode}/>
                </div>
                {/* { TODO input } */}
                <img src={this.emotion} width="30px" height="30px" alt=""/>
                <img src={this.add} width="30px" height="30px" alt=""/>
            </div>
			</>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.chat.current_chat
    }
}

const mapDispatchToProps = { get_chat_detail, get_chat_detail_1 }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NormalChat))