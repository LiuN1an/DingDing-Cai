var Mock = require('mockjs')
// import list from './data/message'
let Random = Mock.Random
function random_image(color,text,size='50x50') {
	return Random.image(size,color,text)
}
const chatList =  Mock.mock('/chatList', 'post', {
	code: 200,
	'data|50-70': [{
		"user_id|+1":0,
		"chat_avatar|1": [
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(3)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(4)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(2)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(1)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(5)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(8)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(3)')),
			Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(3)')),
		],
		"chat_name": '@name',
		"date|1": [
			'@date("M月dd日")',
			'@date("HH:mm")',
		],
		"last_content|1": [
			"请教一下大佬，React怎么学?",
			"React现在放弃还来得及么?",
			"为什么不用vue呢？这么好的框架",
			"你说的都对！你说的都对！你说的都对！你说的都对！你说的都对！你说的都对！你说的都对！你说的都对！",
		],
		"function_type|1": [
			0,1,2,3,4,5,6,7
		],
		"type": {
			"color": '@hex()',
			"title|1": [
				'','@string(5)'
			]
		},
		"status|1": [
			'[未读]',
			'[已读]',
			''
		],
		"itemStatus|1":[
			'',
			'@integer(0,100)'
		]
	}]
})

const chatDetail =  Mock.mock('/chatDetail', 'post', {
	code: 200,
	'data': [{
		"content": {
			"recieve|4-10":[{
				"content_id|+2":0,
				"user_id": 1,
				"date": '@date("HH:mm")',
				"content|1": [
					"@cparagraph",
					"@csentence",
					// Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(3)'))
				],
				"content_type|1": [
					6
				],
				"type|1":[
					"已读",
					"未读"
				]
			}],
			"send|4-10":[{
				"content_id|+3":0,
				"user_id": 2,
				"date": '@date("HH:mm")',
				"content|1": [
					"@cparagraph",
					"@csentence(3,5)",
					// Random.image('50x50',Mock.mock('@hex()'),Mock.mock('@string(3)'))
				],
				"content_type|1": [
					6
				],
				"type|1":[
					"已读",
					"未读"
				]
			}]
		},
	}]
})

export {
	chatDetail,
	chatList
}