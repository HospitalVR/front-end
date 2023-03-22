import Vue from "vue"

import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        path: [],
        type: "user"
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
        }
    },// 只能执行同步操作
    actions: {} //异步操作
})
