import React from 'react'
import ReactDOM from 'react-dom'
import { 
	HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import AnimatedSwitch from './router/AnimateSwitch'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import history from './history';
import { Provider } from 'react-redux'
import store from './store/index'

import PersonChat from './pages/chat_detail'
import Message from './pages/message'
import Word from './pages/word'
import New from './pages/new'
import Contact from './pages/contact'
import Discover from './pages/discover'
import Search from './pages/search'

import 'babel-polyfill'
import './mock/mock.js'
import './config/rem'
import './index.css'
// import Routes from './config/route.config'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Message}></Route>
				<Route exact path="/message" component={Message}></Route>
				<Route exact path="/word" component={Word}></Route>
				<Route exact path="/new" component={New}></Route>
				<Route exact path="/contact" component={Contact}></Route>
				<Route exact path="/discover" component={Discover}></Route>
				<Route exact path="/chat" component={PersonChat}></Route>
				<Route exact path="/search" component={Search}></Route>
				<Route exact path="/groupChat" component={Search}></Route>
			</Switch>
		</Router>
	</Provider>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
