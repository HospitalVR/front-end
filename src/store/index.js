import Vue from "vue"

import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        path: [],
        type: "user",
        status: 0 // 0表示用户未登录，1表示用户登录
    }, //存储具体的数据
    mutations: {
        changePath(state, payload) {
            let { index,router,name } = payload;
            let i = state.path.length - 1;
            while(i >= index) {
                state.path.pop();
                i--;
            }
            state.path.push({
                name: name,
                to: router.fullPath
            })
        },
        changeType(state,type) {
            state.type = type;
        },
        changeStatus(state,status) {
            state.status = status;
        }
    },// 只能执行同步操作
    actions: {} //异步操作
})
