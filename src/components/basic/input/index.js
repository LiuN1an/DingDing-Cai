// TODO textarea换行时，输入框父组件高度监听变化
import React from 'react'

import cs from 'classnames'

import './index.css'

export default class Input extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
			touch: false,
			value: ''
		}
    }
	
	start = () => {
		this.setState({
			touch: true
		})
	}
	
	end = () => {
		this.setState({
			touch: false
		})
	}
	
	getValue = (val) => {
		this.setState({
			value: val
		})
	}
	submitChat = (e) => {
		e.preventDefault()
		this.props.submit_(this.state.value)
		this.setState({
			value: ''
		})
	}
	
    render() {
        return (
            <>
                {
                    !this.props.change &&
                    <div className="input_container">
						<form onSubmit={(e) => this.submitChat(e)}>
							<input className="input" placeholder="记录一下" onChange={(e) => this.getValue(e.target.value)} value={this.state.value}/>
						</form>
						<img src={this.props.icon} className="input-icon"/>
                    </div>  
                }
                {
                    this.props.change &&
                    <div className={cs({input_container: true, input_click: this.state.touch})} onTouchStart={this.start} onTouchEnd={this.end}>
                        <div className="input-text">
                            <div>{this.state.touch?"松开发送":"按住  说话"}</div>
                        </div>
						{
							this.state.touch &&
							<div className="record-box">
								<div style={{marginTop: "30%"}}>
									正在录音...
								</div>
								<div>
									别想着取消
								</div>
							</div>
						}
                    </div>
                }
            </>
        )
    }
}