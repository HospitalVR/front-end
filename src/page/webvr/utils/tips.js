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
                    type: "title",
                    directTo: 1
                },
                
            }
        ]
        
    },
    { // 第二个场景
        image: require("@/assets/Hall.jpg"),
        tipList: [
            {
                position: {
                    x: -95,
                    y: 0,
                    z: 15
                },
                content:{
                    title: "回到大门",
                    tip: "",
                    type: "title",
                    directTo: 0
                },
            },
            {
                position: {
                    x: 100,
                    y: 10,
                    z: -40
                },
                content: {
                    title: "前台",
                    tip: "这是前台界面",
                    type: "tip",
                }
            }
        ]
    }
]