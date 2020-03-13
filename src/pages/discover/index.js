import React from 'react'

import Tabbar from '../../components/tabbar/tabbar'
export default class Discover extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				发现
				<Tabbar {...this.props}/>
			</div>
		)
	}
}