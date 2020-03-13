import React from 'react'

import Tabbar from '../../components/tabbar/tabbar'
export default class Word extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				文档
				<Tabbar {...this.props}/>
			</div>
		)
	}
}