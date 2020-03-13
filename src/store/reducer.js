import * as AT from './actionTypes'
import { combineReducers } from 'redux'

const app_init = {
	first: true
}

const app = (state=app_init, action) => {
	switch(action.type){
		case AT.NOT_FIRST:
			return {
				...state,
				first: false
			}
		default:
			return state
	}
}

const user_init = {
	avatar: "http://www.bouncin.net/upload/NEWS/2019_0108_1/nike_epic_react_flyknit_2_03.jpg"
}

const user = (state=user_init, action) => {
	switch(action.type) {
		default:
			return state
	}
}

const chat_init = {
    list: [],
    current_chat: [],
}

const chat = (state=chat_init, action) => {
    switch(action.type) {
        case AT.SAVE_CHAT_LIST:
            return {
                ...state,
                list: [...state.list,...action.list],
            }
        case AT.CHANGE_CHAT_LIST:
            return {
                ...state,
                list: action.list,
            }
        case AT.GET_CHAT_DETAIL:
            // 无法保证下次请求的数据的时间低于上次的时间，所以这里就简化处理，无论下次请求时间多晚，都合并到原数组中
            let receive = action.list[0].content.recieve
            let send = action.list[0].content.send
            let newA = [...send,...receive]
            newA.sort((a,b) => {
                return a.date < b.date
            })
            return {
                ...state,
                current_chat: [...newA, ...state.current_chat],
            }
        case AT.CLEAR_CHAT_DETAIL:
            return {
                ...state,
                current_chat: [],
            }
		case AT.SUBMIT_:
			return {
				...state,
				current_chat: [...state.current_chat, action.value]
			}
        default:
            return state
    }
}

const allReducer = combineReducers({
    chat: chat,
	user: user,
	app: app
})

export default allReducer