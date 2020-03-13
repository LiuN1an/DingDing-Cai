import React from 'react'
import { fintDOMNode } from 'react-dom'

import './index.css'
import cs from 'classnames'

export default class TextContent extends React.Component {
    constructor(props) {
        super(props)
		
    }
	
	longTouch = (e) => {
		var this_ = this
		setTimeout(function() {
			this_.longToggle()
		},1000)
		// console.log(e)
	}
	
	longToggle = () => {
		// console.log(this.el)
	}
	
    render() {
        return (
            <div 
				className={cs({'self-backend': this.props.settings.isSelf,'noself-backend': !this.props.settings.isSelf},'text-content-container')}
				onTouchStart={this.longTouch}
			>
				<div ref={(e) => this.el=e} className="text-content">{this.props.settings.content}</div>
			</div>
        )
    }
}