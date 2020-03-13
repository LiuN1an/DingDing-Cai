/**
 * author: Peter
 * time: 2020-03-08
 * 
 * 多余文字省略的处理目前是采用的固定width，而不是根据字符串的长度
 */
import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { SwipeAction, List, Badge } from 'antd-mobile'
import { PullToRefresh, ListView } from 'antd-mobile'
import history from '../../history';
import './index.css'
import {get_chat_list} from '../../store/action'

class Chatlist extends React.Component {
	constructor(props) {
		super(props)
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		})
		this.state = {
			dataSource,
			isLoading: false,
			hasMore: true,
		}
	}

	componentDidMount() {
		this.props.get_chat_list(1).then( data => {
			this.rData = data
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false
			})
		})
		// axios.post('/chatList').then( res => {
		// 	this.data = res.data
		// 	this.setState({
		// 		dataSource: this.state.dataSource.cloneWithRows(this.data),
		// 		isLoading: false
		// 	})
		// 	console.log(res)
		// })
		
		// this.setState({
		// 	dataSource: this.state.dataSource.cloneWithRows(data),
		// 	isLoading: false
		// })
	}
	
	onEndReached = (event) => {
		if(this.state.isLoading && !this.state.hasMode) {
			return 
		}
		console.log('reach end');
		this.setState({
			isLoading: true
		})
		this.props.get_chat_list(1).then( data => {
			console.log('加好了')
			this.rData = {...this.rData, ...data}
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false
			})
			console.log('加好了')
		})

	}
	
	handleClick = () => {
		this.props.history.push({pathname: '/chat'})
	}
	
	SwipeActionTop = () => {
		console.log('置顶')
	}
	
	SwipeActionDelete = () => {
		console.log('删除')
	}
	render() {
		// const separator = (sectionID, rowID) => (
		// 	<div
		// 		key={`${sectionID}-${rowID}`}
		// 		style={{
		// 			backgroundColor: '#F5F5F9',
		// 			height: 8,
		// 			borderTop: '1px solid #ECECED',
		// 			borderBottom: '1px solid #ECECED',
		// 		}}
		// 	/>
		// )
		var index = this.props.data.length - 1
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = this.props.data.length - 1;
			  }
			// console.log(this.props.data)
			const obj = this.props.data[index--]
			//const obj = rowData
			// console.log(rowID)
			return (
			<div key={rowID}>
				<SwipeAction
					style={{backgroundColor: 'gray'}}
					autoClose
					right={[
						{
							text: '置顶',
							onPress: this.SwipeActionTop,
							style: {backgroundColor: '#0055ff', color: 'white'}
						},
						{
							text: '删除',
							onPress: this.SwipeActionDelete,
							style: {backgroundColor: '#dd1c0a', color: 'white'}
						}
					]}
					onOpen={() => console.log('open')}
					onClose={() => console.log('close')}
				>
						<div className="list-item" onClick={this.handleClick}>
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
								<div className="item-right-type" style={{color: obj.type.color, border: '1px solid '+obj.type.color }}>
									{ obj.type.title }
								</div>
								<div className="item-right-time">
									{ obj.date }
								</div>
							</div>
							<div className="item-right-bottom">
								<div className="item-right-status" style={{display: 'inline-block',verticalAlign: 'top'}}>
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
		//{this.props.getData &&}
		return (
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderRow={row}
					renderFooter={() => (<div style={{textAlign: 'center'}}>
						{this.state.isLoading?'正在加载...':'加载完毕'}
					</div>)}
					pageSize={5}
					useBodyScroll
					onScroll={() => console.log('开始滚动了')}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
				/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.chat.list,
		loading: state.chat.loading,
		getData: state.chat.getData
	}
}

const mapDispatchToProps = { get_chat_list }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		// getList(user_id) {
// 		// 	dispatch(actionCreater.get_chat_list(user_id))
// 		// }
// 		get_chat_list
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chatlist))