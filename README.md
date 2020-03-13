##腚腚

react+router+redux+thunk+axios

###原则
	* 拆分出单独的组件便于复用
	* 唯一状态管理树
	* 统一路由
###插件
	见 package.json
###界面设计逻辑
	* 导航页面(./src/pages)
		* 消息页面  --- :white_check_mark:
		* 文档页面  --- :negative_squared_cross_mark:
		* 新校招页面  --- :negative_squared_cross_mark:
		* 通讯录页面  --- :negative_squared_cross_mark:
		* 发现页面  --- :negative_squared_cross_mark:
	* 不同种类的聊天详情页（./src/pages/chat_detail）
		* 助手界面  --- :negative_squared_cross_mark:
		* 邮件界面  --- :negative_squared_cross_mark:
		* 聊天界面  --- :white_check_mark:
		* 通知界面  --- :negative_squared_cross_mark:
		* 公众号快捷界面  --- :negative_squared_cross_mark:
		* 公众号H5界面  --- :negative_squared_cross_mark:
	* 不同种类内容的聊天框（./src/pages/chat_detail/common/chat_box）
		* 通知内容框  --- :negative_squared_cross_mark:
		* 评论内容框  --- :negative_squared_cross_mark:
		* Ding内容框  --- :negative_squared_cross_mark:
		* 多媒体内容框（延申划分：表情，图片，音频等）  --- :negative_squared_cross_mark:
		* 日程内容框  --- :negative_squared_cross_mark:
		* 任务内容框  --- :negative_squared_cross_mark:
		* 文字内容框（包含表情评价，回复提示，已读提示）  --- :white_check_mark:
		* 分享内容框  --- :negative_squared_cross_mark:
		* 公众号文章框  --- :negative_squared_cross_mark:
	* 不同种类的聊天中间件（./src/pages/chat_detail/common/chat_func)
		* 聊天提示组件（例如："xxx Ding了你一下"）  --- :negative_squared_cross_mark:
		* 长按ToolTip组件  --- :negative_squared_cross_mark:
		* 底部上拉组件（延申划分：回复，评论）  --- :negative_squared_cross_mark:
###封装组件
	* 聊天页-文字和语音输入栏
	* 聊天页-下拉加载滚动列表