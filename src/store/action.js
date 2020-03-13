import * as AT from './actionTypes'
import * as API from '../api/request'


const get_chat_list = (user_id) => {
	// 这里写需要传入的form参数
	const data = { id: user_id }
	return (dispatch) => {
		return new Promise(function(resolve, reject) {
			API.getChatList(data).then( res => {
				if(res.data.code === 200) {
					let responseData = res.data.data
					dispatch(save_chat_list(responseData))
					resolve(responseData)
				} else {
					resolve([])
				}
			}).catch( error => {
				reject(error)
			})
		})
		
	}
}

const get_chat_detail = (user_id) => {
	const data = { id: user_id }
	return (dispatch) => {
		return new Promise(function(resolve, reject) {
			API.getChatDetail(data).then( res => {
				if(res.data.code === 200) {
					let responseData = res.data.data
					dispatch(save_chat_detail(responseData))
					resolve(responseData)
				} else {
					resolve([])
				}
			})
		})
	}
}

const get_chat_detail_1 = (user_id, page, size) => {
	const data = { id: user_id, page: page, size: size }
	return (dispatch) => {
		return new Promise(function(resolve, reject) {
			API.getChatDetail(data).then( res => {
				if(res.data.code === 200) {
					let responseData = res.data.data
					dispatch(clear_chat_detail(responseData))
					dispatch(save_chat_detail(responseData))
					resolve(responseData)
				} else {
					resolve([])
				}
			})
		})
	}
}

const submit_word = (value) => {
	return (dispatch) => {
		return new Promise(function(resolve, reject) {
			dispatch(submit_(value))
			resolve('ok')
		})
	}
}
const change_list = (list) => {
	return (dispatch) => {
		dispatch(change_chat_list(list))
	}
}

const not_first = () => {
	return (dispatch) => {
		dispatch(not_first_())
	}
}

const submit_ = (value) => ({
	type: AT.SUBMIT_,
	value
})

const save_chat_list = (list) => ({
	type: AT.SAVE_CHAT_LIST,
	list
})

const save_chat_detail = (list) => ({
	type: AT.GET_CHAT_DETAIL,
	list
})

const clear_chat_detail = (data) => ({
	type: AT.CLEAR_CHAT_DETAIL,
	data
})

const change_chat_list = (list) => ({
	type: AT.CHANGE_CHAT_LIST,
	list
})

const not_first_ = () => ({
	type: AT.NOT_FIRST
})
export {
	get_chat_list,
	get_chat_detail,
	get_chat_detail_1,
	change_list,
	not_first,
	submit_word,
}