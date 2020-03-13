/**
 * author: Peter
 * time: 2020-03-08
 * 尚未解决:
 *  1、多余文字省略的处理目前是采用的固定width，而不是根据字符串的长度
 *  2、滚动条没有修改样式
 *  3、滚动条默认全body滚动，没有筛出底部导航栏的高度
 *  4、若第一波数据长度短于当前可滚动区域长度，则无法通过滚动触发后续加载
 * 	5、聊天框内的聊天对象和聊天对象类型没有指定长度省略文字，导致若数据过长会把时间div挤下去（时间div采用float:right）
 * 	6、没有做到：对方消息未读时，显示badge，己方消息未读时不显示
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import cs from 'classnames'
import { SwipeAction, Badge, ListView, PullToRefresh } from 'antd-mobile'

import './index.css'

import { get_chat_list, change_list } from '../../store/action'

var total = 5 // 测试，最多加载五轮
class Chatlist extends React.Component {
	constructor(props) {
		super(props)
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => JSON.stringify(row1) !== JSON.stringify(row2)
		})
		this.state = {
			dataSource: dataSource,
			isLoading: false,
			hasMore: true,
			height: document.documentElement.clientHeight * 3 / 4, // 官网例子，在bodyScroll下无用
		}
		this.rData = []
	}

	// 测试this.props.data
	componentDidMount() {
		const h = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop // 同上一个注释一样，用于在自定义容器中计算容器的高度
		this.props.get_chat_list(1).then( data => { // 1 为本机用户的key值，用来请求列表数据信息
			// this.rData = this.props.data
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.data),
				isLoading: false,
				height: h-100,
			})
		})
	}
	
	onEndReached = (event) => {
		if(this.state.isLoading && !this.state.hasMode) {
			return 
		}
		this.setState({
			isLoading: true
		})
		if(total >= 0) {
			this.props.get_chat_list(1).then( data => {
				// this.rData = [...this.rData, ...data]
				// this.rData = this.props.data
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.props.data),
					isLoading: false
				})
			})
			total -= 1
		} else {
			this.setState({
				isLoading: false,
				hasMore: true
			})
		}
	}
	
	handleClick = (obj) => {
		this.props.history.push({pathname: '/chat', state: {
			name: obj.chat_name,
			avatar: obj.chat_avatar,
			my_avatar: this.props.my_avatar,
			user_id: obj.user_id,
			function_type: obj.function_type
		}})
	}
	
	SwipeActionSetting = () => {
		console.log('群设置')
	}
	
	SwipeActionTop = () => {
		this.setState({
			isLoading: true
		})
		let number = parseInt(this.current_id)
		let newData = this.props.data.slice()
		// let newData = this.rData.slice()
		let item = JSON.parse(JSON.stringify(newData.splice(number, 1)[0]))		
		item.top = true
		newData.unshift(item)
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
			isLoading: false
		})
		this.props.change_list(newData)
		// this.rData = newData
	}
	
	SwipeActionCancelTop = () => {
		let insert_point = this.props.data.length
		for(let i in this.props.data) {
			if(this.props.data[i]["top"] !== true){
				if(this.user_id <= this.props.data[i]["user_id"]) {
					insert_point = i
					break
				}
			}
		}
		let number = parseInt(this.current_id)
		let newData = this.props.data.slice()
		// let newData = this.rData.slice()
		let item = JSON.parse(JSON.stringify(newData.splice(number, 1)[0]))
		item['top'] = undefined
		if(insert_point === this.props.data.length){
			newData.push(item)
		} else {
			newData.splice(insert_point-1, 0, item)
		}
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
			isLoading: false
		})
		// this.rData = newData
		this.props.change_list(newData)
	}
	
	SwipeActionDelete = () => {
		this.setState({
			isLoading: true
		})
		let number = parseInt(this.current_id)
		let newData = this.props.data.slice()
		// let newData = this.rData.slice()
		newData.splice(number, 1)
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
			isLoading: false
		})
		// this.rData = newData
		this.props.change_list(newData)
	}

	controlScroll = (event) => {
		// console.log(window.pageYOffset)
	}

	openSwiperAction = (id, user_id) => {
		this.current_id = id
		this.user_id = user_id
	}
	
	right_ = (obj) => {
		let array_fun1 = [
			{
				text: '置顶',
				onPress: this.SwipeActionTop.bind(this),
				style: {backgroundColor: '#0055ff', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '删除',
				onPress: this.SwipeActionDelete.bind(this),
				style: {backgroundColor: '#dd1c0a', color: 'white', fontSize: '.8rem'}
			}
		]
		let array_fun2 = [
			{
				text: '群设置',
				onPress: this.SwipeActionSetting.bind(this),
				style: {backgroundColor: '#666666', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '置顶',
				onPress: this.SwipeActionTop.bind(this),
				style: {backgroundColor: '#0055ff', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '删除',
				onPress: this.SwipeActionDelete.bind(this),
				style: {backgroundColor: '#dd1c0a', color: 'white', fontSize: '.8rem'}
			}
		] 
		let array_fun3 = [
			{
				text: '群设置',
				onPress: this.SwipeActionSetting.bind(this),
				style: {backgroundColor: '#666666', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '消置',
				onPress: this.SwipeActionCancelTop.bind(this),
				style: {backgroundColor: '#aaaaff', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '删除',
				onPress: this.SwipeActionDelete.bind(this),
				style: {backgroundColor: '#dd1c0a', color: 'white', fontSize: '.8rem'}
			}
		]
		let array_fun4 = [
			{
				text: '消置',
				onPress: this.SwipeActionCancelTop.bind(this),
				style: {backgroundColor: '#aaaaff', color: 'white', fontSize: '.8rem'}
			},
			{
				text: '删除',
				onPress: this.SwipeActionDelete.bind(this),
				style: {backgroundColor: '#dd1c0a', color: 'white', fontSize: '.8rem'}
			}
		]
		if(obj.top === true) {
			return obj.function_type%2 === 0 ? array_fun3 : array_fun4
		} else {
			return obj.function_type%2 === 0 ? array_fun2 : array_fun1
		}
	}
	render() {
		
		const row = (rowData, sectionID, rowID) => {
			const obj = rowData
			let id = rowID
			let user_id = obj.user_id
			return (
			<div key={rowID}>
				<SwipeAction
					autoClose
					right={this.right_.bind(this)(obj)}
					onOpen={this.openSwiperAction.bind(this,id,user_id)}
					onClose={() => console.log('close')}
				>
						<div className="list-item" onClick={this.handleClick.bind(this, obj)} key={id.toString()} className={cs({normal: obj.function_type===0})}>
						<div className="item-left">
							<div className="item-left-img-container">
								<img src={obj.chat_avatar} className="item-left-img" alt="" />
							</div>
						</div>
						<div className="item-right">
							<div className="item-right-top">
								<div className="item-right-title">
									{ obj.chat_name }
								</div>
								{
									obj.type.title !== '' &&
									<div className="item-right-type" style={{color: obj.type.color, border: '1px solid '+obj.type.color }}>
										{ obj.type.title }
									</div>
								}
								<div className="item-right-time">
									{ obj.date }
								</div>
								{obj.top === true && <div className="top"></div>}
							</div>
							<div className="item-right-bottom">
								<div className="item-right-status" style={{display: 'inline-block',verticalAlign: 'top',color: obj.status === '[未读]'?"#096DD9":""}}>
									{ obj.status !== '' && obj.status } 
								</div>
								<div className="item-right-last" style={{display: 'inline-block',verticalAlign: 'top'}}>
									{ obj.last_content }
								</div>
								{ obj.itemStatus !== '' &&
									<div className="item-right-itemStatus" style={{display: 'inline-block',verticalAlign: 'top',float: 'right'}}>
										<Badge text={obj.itemStatus} hot overflowCount={99}/>
									</div>		
								}
							</div>
						</div>
					</div>
				</SwipeAction>
			</div>
			)
		}
		return (
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderRow={row}
					renderFooter={() => (<div style={{paddingBottom: '10px',textAlign: 'center'}}>
						{this.state.isLoading?'正在加载...':'加载完毕'}
					</div>)}
					useBodyScroll
					pageSize={4}
					onScroll={this.controlScroll}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
					pullToRefresh={
						<PullToRefresh></PullToRefresh>
					}
				/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.chat.list,
		my_avatar: state.user.avatar
	}
}

const mapDispatchToProps = { get_chat_list, change_list }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		// getList(user_id) {
// 		// 	dispatch(actionCreater.get_chat_list(user_id))
// 		// }
// 		get_chat_list
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chatlist))