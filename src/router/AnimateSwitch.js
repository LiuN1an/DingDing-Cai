import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import './AnimateSwitch.css'


// classNames={props.type || 'fade'}
// timeout={props.duration || 500}
const AnimatedSwitch = (props) => {
    const { children } = props
    return (
        <Route
            render={({ location }) => (
            <TransitionGroup>
                <CSSTransition
                    key={location.pathname}
                    classNames={'fade'}
                    timeout={100}
                >
                    <Switch location={location}>{children}</Switch>
                </CSSTransition>
            </TransitionGroup>
            )}
        />
    )
}

export default AnimatedSwitch