/**
 * author: Peter
 * time: 2020-03-11 
 * 
 * TODO 监听Input组件换行，自适应高度变化
 */
import React from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { NavBar, Icon, Toast } from 'antd-mobile'
import { InfiniteScroll } from 'react-infinite-scroll-component'
import ChatBox from '../../common/chat_box'
import Input from '../../../../components/basic/input'
import ChatScroll from '../../../../components/basic/scroll'

import { get_chat_detail_1, get_chat_detail, submit_word } from '../../../../store/action'

import cs from 'classnames'
import './index.css'

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
		this.lastELem = React.createRef()
    }

    componentDidMount() {
        this.props.get_chat_detail_1(this.props.location.state.user_id).then( data => {
            let old = this.state.old_length
			// console.log(old.toString()+" "+this.props.data.length.toString())
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
	
	updateData = () => {
		this.props.get_chat_detail(this.props.location.state.user_id).then( data => {
			let old = this.state.old_length
			// console.log(old.toString()+" "+this.props.data.length.toString())
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
	
	getLast = () => {
		return this.lastELem
	}
	
	row = (rowData, rowID) => {
		const settings = {
			content: rowData.content,
			isSelf: rowData.user_id === 1,
			type: rowData.type,
			function_type: rowData.content_type,
			date: rowData.date,
			id: rowData.content_id
		}
		// console.log(rowID.toString() + " " + this.state.current_length.toString())
	    return (
				rowID === this.state.current_length-1 ? 
				<div
					key={rowID}
					ref={this.lastELem}
					className="normal-item"
				>
					<div style={{float: rowData.user_id===1?'right':'left'}}>
						<div style={{float: rowData.user_id===1?'right':'left'}} className="img_container">
							<img src={rowData.user_id===1?this.props.location.state.my_avatar:this.props.location.state.avatar} width="30px" height="30px"/>
						</div>
						<div style={{float: rowData.user_id===1?'right':'left'}}>
							<ChatBox settings={settings} />
						</div>

					</div>
					<div style={{clear: 'both'}}
						ref={(e) => this.newAdd = e}
					></div>
				</div>
				:
				<div
					key={rowID}
					className="normal-item"
				>
					<div style={{float: rowData.user_id===1?'right':'left'}}>
						<div style={{float: rowData.user_id===1?'right':'left'}} className="img_container">
							<img src={rowData.user_id===1?this.props.location.state.my_avatar:this.props.location.state.avatar} width="30px" height="30px"/>
						</div>
						<div style={{float: rowData.user_id===1?'right':'left'}}>
							<ChatBox settings={settings} />
						</div>
					</div>
					<div style={{clear: 'both'}}
						ref={(e) => this.newAdd = e}
					></div>
				</div>
	    )
	}
	
	renderRow = () => {
		let obj = this.state.chatData
		let length = obj.length
		// console.log('跑的总量为'+length.toString())
		let loadRows = []
		for(let i=0;i<length;i++){
			// console.log(obj[i].user_id.toString()+" "+this.props.location.state.user_id)
			loadRows.push(this.row(obj[i], i))
		}
		return loadRows
	}
	
	handleKeyDown = (e) => {
		if(e.key === 'enter') {
			console.log('回车了')
		}
	}
	
	submitChat = (val) => {
		const data = {
			'content_id': 10000,
			'user_id': 1,
			'content': val,
			'type': '未读',
			'content_type': 6,
			'date': new Date().getHours().toString() + ":" + new Date().getMinutes().toString()
		}
		this.props.submit_word(data).then( () => {
			this.setState({
				chatData: this.props.data,
			})
			setTimeout(() => {
				this.scrollRef.scrollBottomDueToNewAdd(this.newAdd)
			},0)
			
		})
	}
    render() {
		
        return (
		<>
			<ChatScroll
				ref={(e) => this.scrollRef=e}
				height={'85%'}
				width={'100%'}
				isLoading={this.state.isLoading}
				loadComponent={<div style={{textAlign: 'center'}}>正在加载</div>}
				updateLoading={this.updateLoading}
				dataSource={this.state.chatData}
				last={this.getLast.bind(this)}
				updateData={this.updateData}
				renderRow={this.renderRow}
				threshold={5}
				
			/>
            <div className="normal-bottom-container">
                <img onClick={this.touchPhone} src={this.state.changeMode?require('../../../../assets/common/keyboard.png'):require('../../../../assets/common/phone.png')} alt="" width="30px" height="30px" />
                {/* { TODO input } */}
                <div className="normal-bottom-content">
                    <Input icon={this.input} change={this.state.changeMode} onKeyDown={this.handleKeyDown} submit_={this.submitChat}/>
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
        data: state.chat.current_chat,
		chat_avatar: state.user.avatar
    }
}

const mapDispatchToProps = { get_chat_detail, get_chat_detail_1, submit_word }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NormalChat))