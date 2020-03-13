import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Message from '../pages/message'

export default () => (
	<Switch>
		<Route exact path="/" component={Message}></Route>
		<Route exact path="/message" component={Message}></Route>
	</Switch>
)