/**
 *  author: Peter
 *  time: 2020-03-11
 * 
 *  
 *  尚未解决：
 *  1、Narbar的render中报错key不唯一
 */
import React from 'react'
import { withRouter } from 'react-router'

import NormalChat from './component/normal_chat'
import Assistent from './component/assistent'
import Email from './component/email'
import Notify from './component/notify'
import OfficalAccountH5 from './component/offical_account_h5'
import OfficalAccountQuick from './component/offical_account_quick'
import ErrorPage from './component/error_page'

import { NavBar, Icon, Toast } from 'antd-mobile'

import './index.css'

// 聊天页面 FUNCTION 宏定义
const NORMAL_CHAT = 0 // 普通聊天页面
const NOTIFY = 1    // 通知页面
const OFFICAL_ACCOUNT_QUICK = 2 // 公众号便捷回复页面
const ASSISTENT = 3 // 小助手页面
const OFFICAL_ACCOUNT_H5 = 4 // 公众号H5页面
const EMAIL = 5 //  邮件页面

class PersonChat extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
       if(this.props.location.state === undefined) {
        Toast.offline('页面信息丢失，请重新打开聊天室',1)
        this.props.history.replace({pathname: '/message'})
       }
    }
    
    clickToLeft = () => {
		this.props.history.replace({pathname: '/message'})
    }

    dispatch_page = () => {
        const settings = {
            user_id: this.props.location.state.user_id,
            name: this.props.location.state.name,
            company: this.props.location.state.company
        }
        switch(this.props.location.state.function_type) {
            case NORMAL_CHAT:
                return <NormalChat settings={settings} />
            case ASSISTENT:
                return <Assistent settings={settings} />
            case EMAIL:
                return <Email settings={settings} />
            case OFFICAL_ACCOUNT_H5:
                return <OfficalAccountH5 settings={settings} />
            case OFFICAL_ACCOUNT_QUICK:
                return <OfficalAccountQuick settings={settings} />
            case NOTIFY:
                return <Notify settings={settings} />
            default:
                return <ErrorPage settings={settings} />
        }
    }

	narbar = () => {
        // 根据打开的页面功能指定导航栏右侧选项配置
        const right = () => {
            switch(this.props.location.state.function_type) {
                case NORMAL_CHAT:
                    return [<div style={{fontSize: '1rem'}}>普通聊天</div>]
                case NOTIFY:
                    return [<div style={{fontSize: '1rem'}}>通知</div>]
                case OFFICAL_ACCOUNT_QUICK:
                    return [<div style={{fontSize: '1rem'}}>公众号便捷回复</div>]
                case ASSISTENT:
                    return [<div style={{fontSize: '1rem'}}>助手</div>]
                case OFFICAL_ACCOUNT_H5:
                    return [<div style={{fontSize: '1rem'}}>公众号h5</div>]
                case EMAIL:
                    return [<div style={{fontSize: '1rem'}}>邮件</div>]
                default:
                    return [<div style={{fontSize: '1rem'}}>未开发界面</div>]
            }
        }
        
		return (
			<div className="page_narbar">
				<NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={this.clickToLeft}
                    rightContent={right()}
				>
					<div>
                        <div>{this.props.location.state.name}</div>
                        <div>{this.props.company}</div>
                    </div>
				</NavBar>
            </div>
		)
	}
    render() {
        return (
            this.props.location.state !== undefined &&
            <div style={{width: '100vw', height: '100vh'}}>
                { this.narbar() }
                { this.dispatch_page() }
            </div>
        )
    }
}

export default withRouter(PersonChat)