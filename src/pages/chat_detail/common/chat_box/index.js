import React from 'react'
import ContentBox from './component/content_box'

import cs from 'classnames'

class ChatBox extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <ContentBox settings={this.props.settings}></ContentBox>
                {
                    this.props.settings.isSelf && 
                    <div style={{float: 'right'}}>
                        <span style={{color: this.props.settings.type === '未读'?'rgb(9, 109, 217)':'#666'}}>
                            {
                                this.props.settings.type
                            }
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default ChatBox