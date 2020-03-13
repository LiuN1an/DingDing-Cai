import React from 'react'

export default class ChatScroll extends React.Component {
	constructor(props) {
		super(props)
		// console.log(props)
	}
	
	componentDidMount() {
		this.lv.addEventListener("scroll", this.handleScroll)
		this.scrollToBottom()
	}
	
	componentWillUnmount() {
		this.lv.removeEventListener("scroll", this.handleScroll)
	}
	
	componentWillReceiveProps(nextProps) {
		// console.log('周期：')
		// console.log(nextProps)
	}
	
	componentDidUpdate() {
		!this.props.isLoading && this.scrollToTop()
	}
	
	scrollBottomDueToNewAdd = (dom) => {
		dom.scrollIntoView(false)
	}
	handleScroll = () => {
		if(this.lv.scrollTop < this.props.threshold) {
			if(!this.props.isLoading){
				this.props.updateData()
				// let newData = this.props.requestMore()
				// let data = [...newData,...this.props.dataSource]
				// this.props.dispatchState(data,newData.length)
			}
			this.props.updateLoading(true)
		}
	}
	
	scrollToBottom = () => {
		// console.log(this.props.last().current)
		this.props.last().current && this.props.last().current.scrollIntoView(false)
		// this.props.last().current &&this.lv.scrollTo(0, this.props.last().current.offsetTop)
	}
	
	scrollToTop = () => {
		// console.log(this.props.last().current)
		this.props.last().current && this.props.last().current.scrollIntoView(true)
		// this.props.last().current &&this.lv.scrollTo(0, this.props.last().current.offsetTop)
	}
	
	
	render() {
		return (
			<div style={{height: this.props.height, width: this.props.width, overflow: 'hidden'}}>
				<div style={{overflow: 'auto', height: '100%'}} ref={el => this.lv=el}>
					{ this.props.isLoading && this.props.loadComponent }
					{ this.props.renderRow().length !== 0 && this.props.renderRow() }
					{ this.props.renderRow().length === 0 && <div>正在加载</div> }
				</div>
			</div>
		)
	}
}