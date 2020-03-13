import React from 'react'

import Tabbar from '../../components/tabbar/tabbar'

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				通讯录
				<Tabbar {...this.props}/>
			</div>
		)
	}
}