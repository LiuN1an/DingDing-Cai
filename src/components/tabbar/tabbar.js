import React from 'react'
import { Link } from 'react-router-dom'
import tabbar_config from '../../config/tabbar'

import cs from 'classnames'
import './index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'
import 'antd-mobile/lib/badge/style/index.css'

export default class Tabbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectTab: this.props.location.pathname.substring(1)?this.props.location.pathname.substring(1):'message',
			hidden: false,
		}
	}
	
	componentDidMount() {
	}

	changeTab = (tab) => {
		this.setState({
			selectTab: tab
		})
	}
	
	componentWillReceiveProps(nextProps) {
		let pathName = nextProps.location.pathname
		if(pathName === '/' ||
		   pathName === '/message' ||
		   pathName === '/word' ||
		   pathName === '/new' ||
		   pathName === '/contact' ||
		   pathName === '/discover') 
		{	
			this.setState({
				hidden: false,
			})
		} else {
			this.setState({
				hidden: true
			})
		}
	}
	//{cs({'am-tabs-tab-bar-wrap':true},Styles.container)}
	render() {
		return (
		<div className={cs({'am-tabs-tab-bar-wrap':true,},"container")} style={{display: this.state.hidden?"none":"block",zIndex: 20}} id="tabbar">
				<div className="am-tab-bar-bar" style={{backgroundColor: "#fff"}}>
					{
					tabbar_config.map((item,index) => (
						<div key={index} className="am-tab-bar-tab">
							<Link to={item.path} replace onClick={this.changeTab.bind(this,item.key)}>
								<div className="am-tab-bar-tab-icon">
									<span className="am-badge am-tab-bar-tab-badge tab-badge">
										{
											this.state.selectTab === item.key?
											<div style={{width: "22px",height: "22px",background: 'url(' + `${item.local_selected_icon}` + ') center center /  21px 21px no-repeat'}}></div>
											:
											<div style={{width: "22px",height: "22px",background: 'url(' + `${item.local_icon}` + ') center center /  21px 21px no-repeat'}}></div>
										}
									</span>
								</div>
								<p className="am-tab-bar-tab-title" style={{color: this.state.selectTab === item.key?item.selectColor:item.unselectColor}}>
									{item.title}
								</p>
							</Link>
						</div>
					))
				}
				</div>
		</div>
		)
	}
}
