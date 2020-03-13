import React from 'react'

import Alert from './component/alert'
import Comment from './component/comment'
import Ding from './component/ding'
import Schedule from './component/schedule'
import Task from './component/task'
import TextContent from './component/text_content'
import Media from './component/media'
import Share from './component/share'
import OfficalAccountContent from './component/offical_account_content'

// 聊天内容框 FUNCTION 宏定义
const ALERT = 1 // 通知框
const COMMENT = 2 // 评论框
const DING = 3 // Ding框
const SCHEDULE = 4 // 日程框
const TASK = 5 // 任务框
const TEXT_CONTENT =6 // 文字框
const MEDIA = 7 // 多媒体框(表情，图片，视频等) 
const SHARE = 8 // 分享，转发框
const OFFICALACCOUNTCONTENT = 9 // 公众号文章框

export default class ContentBox extends React.Component {
    constructor(props) {
        super(props)
    }

    dispatch_page = () => {
        switch(this.props.settings.function_type) {
            case ALERT:
                return <Alert settings={this.props.settings}/>
            case COMMENT:
                return <Comment settings={this.props.settings}/>
            case DING:
                return <Ding settings={this.props.settings}/>
            case SCHEDULE:
                return <Schedule settings={this.props.settings}/>
            case TASK:
                return <Task settings={this.props.settings}/>
            case TEXT_CONTENT:
                return <TextContent settings={this.props.settings}/>
            case MEDIA:
                return <Media settings={this.props.settings}/>
            case SHARE:
                return <Share settings={this.props.settings}/>
            case OFFICALACCOUNTCONTENT:
                return <OfficalAccountContent settings={this.props.settings}/>
            default:
                return <div>没有对应窗口插件</div>
        }
    }

    render() {
        return (
            this.dispatch_page() 
        )
    }
}