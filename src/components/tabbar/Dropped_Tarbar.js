/**
 * author Peter
 * time 2020-03-05
 * 
 * 此标签栏的方法在切换时会导致所有页面全部重新渲染，性能欠考虑，
 * 但却能实现向子组件传递事件的办法来触发子组件事件隐藏底部标签栏
 * 
 * 把嵌套式的tabbar改为在每个有tab的页面调用式的
 */

import React from 'react';
import { TabBar } from 'antd-mobile';
import tabbar_config from '../../config/tabbar'
import history from '../../history';
import PageDispatch from '../pageDispatch'
import Message from '../../pages/message'
import Word from '../../pages/word'
import New from '../../pages/new'
import Contact from '../../pages/contact'
import Discover from '../../pages/discover'

export default class TabBarOwn extends React.Component {
  constructor(props,context) {
    super(props)
    this.state = {
      selectedTab: '消息',
      hidden: false,
      fullScreen: true,
    };
  }
  
  controlTarbarHidden = () => {
	this.setState({
		hidden: true
	})
  }
  
  controlTarbarShow = () => {
	  this.setState({
		  hidden: false
	  })
  }
  
  renderSubComponent(path) {
	  if(path === '/meaasge') {
		  return (
			<>
				<Message 
					tabbarHidden={this.controlTarbarHidden}
					tabbarShow={this.controlTarbarShow}
				/>
			</>
		  )
	  }
	  if(path === '/word') {
		  return (
			<>
				<Word />
			</>
		  )
	  }
	  if(path === '/new') {
		  return (
			<>
				<New />
			</>
		  )
	  }
	  if(path === '/contact') {
	  		  return (
	  			<>
	  				<Contact />
	  			</>
	  		  )
	  }
	  if(path === '/discover') {
	  		  return (
	  			<>
	  				<Discover />
	  			</>
	  		  )
	  }
  }
  
//   renderContent(pageText) {
//     return (
//       <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
//         <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
//         <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               hidden: !this.state.hidden,
//             });
//           }}
//         >
//           Click to show/hide tab-bar
//         </a>
//         <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               fullScreen: !this.state.fullScreen,
//             });
//           }}
//         >
//           Click to switch fullscreen
//         </a>
//       </div>
//     );
//   }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
		
		  {
			tabbar_config.map((item,key) => {
				return (
					<TabBar.Item
						title={item.title}
						key={key}
						icon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(' + `${item.icon?item.icon:item.local_icon}` + ') center center /  21px 21px no-repeat'}}
							/>
						}
						selectedIcon={
							<div style={{
								width: '22px',
								height: '22px',
								background: 'url(' + `${item.selected_icon?item.selected_icon:item.local_selected_icon}` + ') center center /  21px 21px no-repeat'}}
							/>
						}
						selected={this.state.selectedTab === item.title}
						dot={item.dot}
						onPress={() => {
						  this.setState({
						    selectedTab: item.title,
						  });
						//   history.replace(item.path)
						}}
					>	
						<div style={{backgroundColor: 'white', height: '100%', overflowX: 'hidden'}}>
							{ this.renderSubComponent(item.path) }
						</div>
						{/* {this.props.children} */}
						{/* {React.cloneElement(this.props.children, { props: {tabbarHidden: this.controlTarbarHidden, tabbarShow:this.controlTarbarShow} })} */}
					</TabBar.Item>
				)
			})
		  }
          
        </TabBar>
      </div>
    );
  }
}
