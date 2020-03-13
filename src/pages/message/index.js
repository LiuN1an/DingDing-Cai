/**
 * author: Peter
 * Time: 2020-03-06
 * 
 * 尚未解决:
 * 	1、没有针对遮盖层阻止事件冒泡，exp：在点击右上角时仍然可以触发搜索框点击事件
 * 	2、没有采用rem布局，在antd的布局下采用静态布局（除了字体，字体采用的勾股式rem）
 *  3、离开页面时没有将数据和滚动位置存放在缓存中
 * 	4、头部div和快捷键div没有联合吸顶（思路：头部可以保持一直fixed，监听滚动条滑过搜索框div高度的时候触发快捷键div吸顶样式）
 * 	5、antd的PullToRefresh容器内放置ListView的时候，在向上滚动ListView的同时会触发父组件的滚动（具体表现在transform的translate的变化），从而导致无法将ListView上拉至顶
 * 	6、在滚动条滚出ListView的区域时，滚动条的区域变成了（搜索框+快捷键+ListView）的作用区域
 */

import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Popover, Icon, Modal } from 'antd-mobile'
import { SearchBar } from 'antd-mobile'
// import { PullToRefresh } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import Chatlist from '../../components/chatList'
import Tabbar from '../../components/tabbar/tabbar'

import { not_first } from '../../store/action'


import './index.css'

const Item = Popover.Item;
class Message extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			avatar: 'http://www.bouncin.net/upload/NEWS/2019_0108_1/nike_epic_react_flyknit_2_03.jpg',
			visible: false,
			search_hot: '企业复工指南',
			direct: false
		}
	}
	
	componentDidMount() {
		// console.log(this.el)
		// this.el.onTouchMove = function(e) {
		// 	if(e.preventDefault) {
		// 		e.preventDefault()
		// 	} else {
		// 		window.event.returnValue = false
		// 	}
		// }
		// var tabbar = document.getElementById('tabbar')
		// let first = this.props.first
		// document.addEventListener('touchmove', function(e) {
		// 	if(first) {
		// 		e.preventDefault()
		// 	}
		// },false)
		// axios.post('/chatList').then( res => {
		// 	this.setState({
		// 		data: res.data,
		// 		getData: true
		// 	})
		// 	// console.log(res)
		// })
		// this.props.getList(1)
	}

	onSelect = (opt) => {
	    this.setState({
	      visible: false,
	      selected: opt.props.value,
	    });
	 };

	handleVisibleChange = (visible) => {
		this.setState({
			visible,
		})
	}
	
	handleFocusSearch() {
		this.props.history.replace({pathname: '/search'})
		// this.focus_search.className = "focus_search"
	}

	
	shortcutRender() {
		return (
				<Sticky>
					{
						({
							style,
						}) => (
							<div className="short-container" style={style}>
								<div style={{width:'32%',height:'100%',textAlign:'center',float: "left"}}>
									<div style={{width:'100%',borderRight:'1px solid #eee',marginTop: '10px'}}>
										<img style={{width:'15px', height:'15px',display: "inline"}} src={require('../../assets/header/message/calender.png')} alt=""/>
										<div style={{display: "inline"}}>日历</div>
									</div>
								</div>
								<div style={{width:'36%',textAlign:'center',float: "left"}}>
									<div style={{width:'100%',borderRight:'1px solid #eee',marginTop: '10px'}}>
										<img style={{width:'15px', height:'15px',display: "inline"}} src={require('../../assets/header/message/todo.png')} alt=""/>
										<div style={{display: "inline"}}>待办</div>
									</div>
								</div>
								<div style={{width:'32%',textAlign:'center',float: "left"}}>
									<div style={{width:'100%',marginTop: '10px'}}>
										<img style={{width:'15px', height:'15px',display: "inline"}} src={require('../../assets/header/message/ding.png')} alt=""/>
										<div style={{display: "inline"}}>DING</div>
									</div>
								</div>
							</div>
						)
					}
					
				</Sticky>
		)
	}

	searchRender() {
		return (
			<div className="search_box" onClick={this.handleFocusSearch.bind(this)}>
				<div className="search_input">
					<div className="search_content">
						<div style={{marginTop: '6px', float: 'left'}}>
							<Icon type="search" size="xs"/>
						</div>
						<span style={{float: 'left', marginTop: '7px', marginLeft: '10px'}}>{this.state.search_hot}</span>
					</div>
				</div>
					
			</div>
		)
	}

	directRender() {
		return (
			this.state.direct &&
			<div className="direct">
				<div style={{float:'left','margin-top':'7px'}}>
					
				</div>
				<div style={{float:'right','margin-top':'7px'}}>
					<Icon type="ellipsis"/>
				</div>
			</div>
			
		)
	}

	popRender() {
		return (
			<div>
				<Popover mask
					visible={this.state.visible}
					overlay={[
						(<Item key="1" value="扫一扫" icon={<img src={require('../../assets/header/message/scan.png')} className="popImg" alt="" />}>扫一扫</Item>),
						(<Item key="2" value="投屏" icon={<img src={require('../../assets/header/message/screen.png')} className="popImg" alt="" />}>投屏</Item>),
						(<Item key="3" value="发起群聊" icon={<img src={require('../../assets/header/message/chat.png')} className="popImg" alt="" />}>发起群聊</Item>),
						(<Item key="4" value="添加好友" icon={<img src={require('../../assets/header/message/addF.png')} className="popImg" alt="" />}>添加好友</Item>),
						(<Item key="5" value="交换名片" icon={<img src={require('../../assets/header/message/exchange.png')} className="popImg" alt="" />}>交换名片</Item>),
						(<Item key="6" value="新建文档" icon={<img src={require('../../assets/header/message/newW.png')} className="popImg" alt="" />}>新建文档</Item>)
					]}
					align={{
							overflow: { adjustY: 0, adjustX: 0 },
							offset: [5, 15],
					}}
					onVisibleChange={this.handleVisibleChange}
					onSelect={this.onSelect}
				>	
						<img src={require('../../assets/header/message/add.png')} className="icon" alt=""/>
				</Popover>
			</div>
		)
	}
	
	handleClose_ = () => {
		this.props.not_first()
	}
	render() {
		return (		
			<>	
				<Modal
					ref={(e) => this.el=e}
					visible={this.props.first}
					transparent
					maskCloseable={false}
					onClose={this.handleClose_}
					title="腚腚工作量"
					footer={[{text: '知道了', onPress: () => {this.handleClose_()}}]}
					
				>
					<div style={{ height:'200px', overflow:'scroll', textAlign: 'left'}}>
						<div style={{color: 'red'}}>设计:</div>
						<div>&nbsp; 1) react-router进行路由管理,react-redux进行状态管理,异步action进行数据请求,mock进行假数据模拟</div>
						<div>&nbsp; 2) 组件化.</div>
						<div style={{color: 'red'}}>页面:</div>
						<div>&nbsp; 1) 消息页面</div>
						<div>&nbsp; 2) 聊天部分页面</div>
						<div style={{color: 'red'}}>功能:</div>
						<div>&nbsp; 1) 消息页-滚动获取列表项</div>
						<div>&nbsp; 2) 消息页-置顶删除列表项</div>
						<div>&nbsp; 3) 聊天页-滚动获取聊天列表项(点击带有背景色的消息页列表项进入)</div>
						<div>&nbsp; 3) 聊天页-聊天内容发送</div>
						<div style={{color: 'red'}}>组件:</div>
						<div>&nbsp; 1) 底部标签导航栏(<span style={{color: '#108ee9'}}>自行封装</span>)</div>
						<div>&nbsp; 2) 快捷键吸顶栏(react-Sticky)</div>
						<div>&nbsp; 3) 气泡栏(AntdMobile-Popup)</div>
						<div>&nbsp; 4) 消息页内容滚动列表(AntdMobile-ListView)</div>
						<div>&nbsp; 5) 消息页列表项滑动(AntdMobile-SwiperAction)</div>
						<div>&nbsp; 6) 聊天页输入栏(<span style={{color: '#108ee9'}}>自行封装</span>)</div>
						<div>&nbsp; 7) 聊天页顶部导航栏(AntdMobile-Narbar)</div>
						<div>&nbsp; 8) 聊天页内容滚动列表(没加惯性)(<span style={{color: '#108ee9'}}>自行封装</span>)</div>
						<div style={{color: 'blue', textAlign: 'center'}}>架构思路</div>
						<div>&nbsp; 1) 消息页中不同类型的列表项点击后分别去向各自的聊天界面,通过后台传来的<strong>functionId</strong>决定,这样可以更好的封装各个页面的容器.</div>
						<div>&nbsp; 2) 聊天页中根据不同的内容属性构建不同的内容种类渲染不同的内容边框,通过后台传来的<strong>contentId</strong>决定.</div>
						<div style={{color: 'pink', textAlign: 'center'}}>详情请见README</div>
					</div>
				</Modal>
				<div className="Header1">
					<div className="Header1-left-container">
						<div className="Header1-left">
							<img src={this.state.avatar} className="Header1-left-img" alt=""/>
						</div>
					</div>
					<div className="Header1-right">
						<img src={require('../../assets/header/message/secret.png')} className="icon" alt=""/>
						<img src={require('../../assets/header/message/contact.png')} className="icon" alt=""/>
						{ this.popRender.bind(this)() }
					</div>
				</div>
				{ this.searchRender.bind(this)() }
				<StickyContainer>
					{ this.shortcutRender.bind(this)() }
					{ this.directRender.bind(this)() }
					<Chatlist/>
				</StickyContainer>
				<Tabbar {...this.props}/>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		first: state.app.first
	}
}

const mapDispatchToProps = { not_first }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Message))