// 标签和材质列表，该数组中每一项都代表着一个场景和场景中的标签
export const sceneList = [
    { //第一个场景--大门口
        image: require("@/assets/entry.jpg"),
        name: "大门口",
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
    { // 第二个场景-- 前台大厅
        image: require("@/assets/Hall.jpg"),
        name: "前台大厅",
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
                    title: "",
                    tip: "这是前台界面",
                    type: "tip",
                }
            },
            {
                position: {
                    x: 90,
                    y: 0,
                    z: -80
                },
                content: {
                    title: "手术室",
                    tip: "",
                    type: "title",
                    directTo: 2
                }
            }
        ]
    },
    // 第三个场景 --手术室
    {
        image: require("@/assets/Operating.jpg"),
        name: "手术室",
        tipList:[
            {
                position: {
                    x: 100,
                    y: -50,
                    z: 50
                },
                content: {
                    title: "",
                    tip: "手术台，点击进行手术",
                    type: "tip"
                }
            },
            {
                position: {
                    x: -50,
                    y: 0,
                    z: -10
                },
                content: {
                    title: "前台",
                    tip: "",
                    type: "title",
                    directTo: 1
                }
            },
            {
                position: {
                    x: 100,
                    y: 0,
                    z: 0
                },
                content: {
                    title: "处置室",
                    tip: "",
                    type: "title",
                    directTo: 3
                }
            }
        ]
    }, // 第四个场景 -- 处置室
    {
        image: require("@/assets/Disposal.jpg"),
        name: "处置室",
        tipList:[
            {
                position: {
                    x: -50,
                    y: 0,
                    z: 80
                },
                content: {
                    title: "化验室",
                    tip: "",
                    type: "title",
                    directTo: 4
                }
            }
        ]
    },
    // 第五个场景 -- 化验室
    {
        image: require("@/assets/Laboratory.jpg"),
        tipList:[
            {
                position: {
                    x: 50,
                    y: 0,
                    z: -50
                },
                content: {
                    title: "",
                    tip: "",
                    type:" title",
                    
                }
            }
        ]
    }
]