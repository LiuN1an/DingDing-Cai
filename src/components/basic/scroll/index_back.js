import React from 'react'

export default class ChatScroll extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)
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
		!this.props.isLoading && this.scrollToBottom()
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
		this.last && this.last.scrollIntoView(false)
	}
	
	row = (rowData, rowID) => {
	    return (
	        <div 
				key={rowID}
				ref={ (el) => {
					if(rowID === this.props.lastIndex-1) {
						this.last = el
					}
				}}
			>
				<div style={{float: rowData.float?'left':'right'}}>
					<div>{rowData.user_id}</div>
					<div>{rowData.type}</div>
				</div>
				<div style={{clear: 'both'}}></div>
	        </div>
	    )
	}
	
	renderRow = () => {
		let obj = this.props.dataSource
		let length = obj.length
		// console.log('跑的总量为'+length.toString())
		let loadRows = []
		for(let i=0;i<length;i++){
			loadRows.push(this.row(obj[i], i))
		}
		return loadRows
	}
	
	render() {
		return (
			<div style={{height: this.props.height, width: this.props.width, overflow: 'hidden'}}>
				<div style={{overflow: 'auto', height: '100%'}} ref={el => this.lv=el}>
					{ this.props.isLoading && this.props.loadComponent }
					{ this.renderRow() }
				</div>
			</div>
		)
	}
}