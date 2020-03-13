腚腚
===
react+router+redux+thunk+axios


### 原则
* 拆分出单独的组件便于复用
* 唯一状态管理树
* 统一路由
  
### 插件  
  
见 package.json
  
### 界面设计逻辑
  
* 导航页面(./src/pages)
	* 消息页面  :heavy_check_mark:
	* 文档页面  :heavy_multiplication_x:
	* 新校招页面  :heavy_multiplication_x:
	* 通讯录页面  :heavy_multiplication_x:
	* 发现页面  :heavy_multiplication_x:
* 不同种类的聊天详情页（./src/pages/chat_detail）
	* 助手界面  :heavy_multiplication_x:
	* 邮件界面  :heavy_multiplication_x:
	* 聊天界面  :heavy_check_mark:
	* 通知界面  :heavy_multiplication_x:
	* 公众号快捷界面  :heavy_multiplication_x:
	* 公众号H5界面  :heavy_multiplication_x:
* 不同种类内容的聊天框（./src/pages/chat_detail/common/chat_box）
	* 通知内容框  :heavy_multiplication_x:
	* 评论内容框  :heavy_multiplication_x:
	* Ding内容框  :heavy_multiplication_x:
	* 多媒体内容框（延申划分：表情，图片，音频等）:heavy_multiplication_x:
	* 日程内容框  :heavy_multiplication_x:
	* 任务内容框  :heavy_multiplication_x:
	* 文字内容框（包含表情评价，回复提示，已读提示）:heavy_check_mark:
	* 分享内容框 :heavy_multiplication_x:
	* 公众号文章框  :heavy_multiplication_x:
* 不同种类的聊天中间件（./src/pages/chat_detail/common/chat_func)
	* 聊天提示组件（例如："xxx Ding了你一下"）  :heavy_multiplication_x:
	* 长按ToolTip组件  :heavy_multiplication_x:
	* 底部上拉组件（延申划分：回复，评论）  :heavy_multiplication_x:
  
### 封装的组件  
	聊天页-文字和语音输入栏
	聊天页-下拉加载滚动列表
