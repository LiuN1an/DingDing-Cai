import React from 'react'
import { withRouter } from 'react-router'
import { SearchBar } from 'antd-mobile'

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search_hot: '企业复工指南'
        }
    }
    
    handleCancelSearch() {
        this.props.history.replace({pathname: '/message'})
    }
    
    singleSearchRender() {
		return (
			<div className="focus_search">
					<SearchBar 
						placeholder={this.state.search_hot}
						showCancelButton
						autofocus
						onCancel={this.handleCancelSearch.bind(this)}
						/>
					<div></div>
			</div>
		)
    }
    
    render() {
        return (
            <div className="searchUI">
                { this.singleSearchRender.bind(this)() }
            </div>
        )
    }
}

export default withRouter(Search)