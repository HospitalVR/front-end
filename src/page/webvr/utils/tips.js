// 标签和材质列表，该数组中每一项都代表着一个场景和场景中的标签
export const sceneList = [
    { //第一个场景
        image: require("@/assets/entry.jpg"),
        tipList:[
            {
                position:{
                    x:120,
                    y:0,
                    z:30
                },
                content:{
                    title: "进入医院",
                    tip: "",
                    image: 0,
                    type: "title",
                    directTo: 1
                },
                
            }
        ]
        
    },
    { // 第二个场景
        image: require("@/assets/Hall.jpg"),
        // tipList: [

        // ]
    }
]