import React from 'react'

import Tabbar from '../../components/tabbar/tabbar'
export default class New extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				新校招
				<Tabbar {...this.props}/>
			</div>
		)
	}
}