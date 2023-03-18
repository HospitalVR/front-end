// 标签和材质列表，该数组中每一项都代表着一个场景和场景中的标签
export const sceneList = [
    // 第一个场景-- 大门口
    { 
        image: require("@/assets/vr/Entry.jpg"),
        name: "大门口",
        
        tipList:[
            {
                position:{
                    x:100,
                    y:-10,
                    z:45
                },
                content:{
                    title: "通向前台",
                    tip: "",
                    type: "title",
                    directTo: 1
                },
                
            }
        ]
        
    },
    // 第二个场景-- 前台大厅
    { 
        image: require("@/assets/vr/Hall.jpg"),
        name: "前台大厅",
        desc: ["包括接待挂号、导医咨询、病历档案发出与回收、收费等","前台"],
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
                    y: 0,
                    z: 50
                },
                content: {
                    title: "",
                    tip: "点击查看前台大厅信息",
                    type: "tip",
                }
            },
            {
                position: {
                    x: 110,
                    y: -40,
                    z: -40
                },
                content: {
                    title: "通向手术室",
                    tip: "",
                    type: "title",
                    directTo: 2
                }
            },
            {
                position: {
                    x: -20,
                    y: -60,
                    z: 110
                },
                content: {
                    title: "通向诊室",
                    tip: "",
                    type: "title",
                    directTo: 3
                }
            },
            {
                position:{
                    x: -30,
                    y: -60,
                    z: -100
                },
                content: {
                    type: "title",
                    title: "通向病理剖析室",
                    tip: "",
                    directTo: 4
                }
            },
            {
                position: {
                    x: 30,
                    y: -60,
                    z: 110
                },
                content: {
                    tip: "",
                    title: "通向免疫室",
                    type: "title",
                    directTo: 5
                }
            },
            {
                position:{
                    x: 30,
                    y: -60,
                    z: -110
                },
                content: {
                    tip: "",
                    title: "通向药房",
                    type: "title",
                    directTo: 6
                }
            }

        ]
    },
    // 第三个场景 --手术室
    {
        image: require("@/assets/vr/Operating.jpg"),
        name: "手术室",
        desc: ["1","2"],
        tipList:[
            {
                position: {
                    x: 0,
                    y: -50,
                    z: -100
                },
                content: {
                    title: "",
                    tip: "点击查看手术室信息",
                    type: "tip"
                }
            },
            {
                position: {
                    x: -50,
                    y: -50,
                    z: 10
                },
                content: {
                    title: "通向前台",
                    tip: "",
                    type: "title",
                    directTo: 1
                }
            },
        ]
    }, 
    // 第四个场景 --诊室
    {
        image: require("@/assets/vr/ConsultRoom.jpg"),
        name: "诊室",
        tipList:[
            {
                position: {
                    x: -30,
                    y: -60,
                    z: 50
                },
                content: {
                    title: "通向前台",
                    tip: "",
                    type: "title",
                    directTo: 1
                }
            },
            {
                position: {
                    x: 40,
                    y: -40,
                    z: 30
                },
                content: {
                    tip: "点击查看诊室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第五个场景 --病例剖析室
    {
        image: require("@/assets/vr/PathologicalAutopsyRoom.jpg"),
        name: "病例剖析室",
        tipList: [
            {
                position: {
                    x: 0,
                    y: -60,
                    z: -80
                },
                content: {
                    tip: "点击了解病理剖析室",
                    title: "",
                    type: "tip",
                }
            },
            {
                position: {
                    x: -60,
                    y: -60,
                    z: 50
                },
                content: {
                    tip: "",
                    title: "回到前台",
                    type: "title",
                    directTo: 1
                }
            }
        ]
    },
    // 第六个场景 --免疫室
    {
        image: require("@/assets/vr/ImmunologyRoom.jpg"),
        name: "免疫室",
        tipList:[
            {
                position: {
                    x: -60,
                    y: -60,
                    z: 30
                },
                content: {
                    tip: "",
                    title: "回到前台",
                    type: "title",
                    directTo: 1
                }
            },
            {
                position: {
                    x: -10,
                    y: -40,
                    z: -30
                },
                content: {
                    tip: "点击查看免疫室信息",
                    title: "",
                    type: "tip",
                }
            }
        ]
    },
    // 第七个场景 --药房
    {
        image: require("@/assets/vr/PharmacyRoom.jpg"),
        name: "药房",
        tipList:[
            {
                position: {
                    x: 50,
                    y: -20,
                    z: 40
                },
                content: {
                    tip: "点击查看药房信息",
                    title: "",
                    type: "tip"
                }
            },
            {
                position: {
                    x: 60,
                    y: -30,
                    z: 90
                },
                content: {
                    tip: "",
                    title: "通向手术准备室",
                    type: "title",
                    directTo: 7
                }
            },
            {
                position:{
                    x: -30,
                    y: -60,
                    z: 100
                },
                content: {
                    tip: "",
                    title: "通向专科检查室",
                    type: "title",
                    directTo: 14
                }
            }
        
        ]
    },
    // 第八个场景 --手术准备室
    {
        image: require("@/assets/vr/SurgicalPreparationRoom.jpg"),
        name: "手术准备室",
        tipList:[
            {
                position:{
                    x: -30,
                    y: -90,
                    z: 70
                },
                content:{
                    tip:"",
                    title: "通向手术室",
                    type: "title",
                    directTo: 2
                }
            },
            {
                position:{
                    x: -100,
                    z: -30,
                    y: -60
                },
                content:{
                    tip:"",
                    title: "通向二楼走廊",
                    type: "title",
                    directTo: 8
                }
            },
            {
                position:{
                    x: 60,
                    y: -30,
                    z: 0
                },
                content:{
                    tip:"点击查看手术准备室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第九个场景 --二楼走廊
    {
        image: require("@/assets/vr/Corridor.jpg"),
        name: "二楼走廊",
        tipList:[
            {
                position:{
                    x: -10,
                    y: -60,
                    z: -80
                },
                content: {
                    title: "通向手术准备室",
                    tip: "",
                    type: "title",
                    directTo: 7
                }
            },
            {
                position: {
                    x: 100,
                    y: -60,
                    z: 10
                },
                content: {
                    title: "通向住院部",
                    tip: "",
                    type: "title",
                    directTo: 9
                }
            }
        ]
    },
    // 第十个场景 --住院部
    {
        image: require("@/assets/vr/InpatientDepartment.jpg"),
        name:" 住院部",
        tipList:[
            {
                position: {
                    x: -80,
                    y: -60,
                    z: 0
                },
                content: {
                    tip: "",
                    title: "通向档案室",
                    type: "title",
                    directTo: 10
                }
            },
            {
                position:{
                    x: -90,
                    y: -60,
                    z: 50
                },
                content:{
                    tip:"",
                    title: "通向化验室",
                    type: "title",
                    directTo: 11
                }
            },
            {
                position:{
                    x: 40,
                    y: -40,
                    z: -80
                },
                content: {

                    tip: "点击查看住院部信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第十一个场景 --档案室
    {
        image: require("@/assets/vr/ArchivesRoom.jpg"),
        name: "档案室",
        tipList:[
            {
                position:{
                    x: 120,
                    y: 10,
                    z: 40
                },
                content: {
                    tip: "点击查看档案室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第十二个场景 --化验室
    {
        image: require("@/assets/vr/Laboratory.jpg"),
        name: "化验室",
        tipList:[
            {
                position:{
                    x: 10,
                    z: 80,
                    y: -60
                },
                content: {
                    tip: "",
                    title: "通向影像室",
                    type: "title",
                    directTo: 12
                }
            },
            {
                position:{
                    x: 40,
                    y: -20,
                    z: -80
                },
                content: {
                    tip: "点击查看化验室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第十三个场景 --影像室
    {
        image: require("@/assets/vr/ImageRoom.jpg"),
        name: "影像室",
        tipList:[
            {
                position: {
                    x: 100,
                    z: 0,
                    y: -70
                },
                content: {
                    type: "title",
                    title: "通向处置室",
                    tip: "",
                    directTo: 13
                }
            },
            {
                position: {
                    x: -60,
                    y: -50,
                    z: -10
                },
                content: {
                    type: "title",
                    title: "通向专科检查室",
                    tip: "",
                    directTo: 14
                }
            },
            {
                position:{
                    x: 0,
                    y: -60,
                    z: 40
                },
                content: {
                    tip: "点击查看影像室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第十四个场景 --处置室
    {
        image: require("@/assets/vr/DisposalRoom.jpg"),
        name: "处置室",
        tipList:[
            {
                position:{
                    x: 10,
                    y: -50,
                    z: -60
                },
                content:{
                    tip: "",
                    title: "通向影像室",
                    type: "title",
                    directTo: 12
                }
            },
            {
                position:{
                    x: 40,
                    y: -20,
                    z: 40
                },
                content: {
                    tip: "点击查看处置室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    },
    // 第十五个场景 --专科检查室
    {
        image: require("@/assets/vr/SpecialistExaminationRoom.jpg"),
        name: "专科检查室",
        tipList:[
            {
                position: {
                    x: 20,
                    y: -60,
                    z: -40
                },
                content: {
                    type: "title",
                    title: "通向药房",
                    tip: "",
                    directTo: 6
                }
            },
            {
                position: {
                    x: -30,
                    y: -60,
                    z: 40
                },  
                content: {
                    tip: "",
                    title: "通向影像室",
                    type: "title",
                    directTo: 12
                }
            },
            {
                position:{
                    x: 30,
                    y: -30,
                    z: 20
                },
                content: {
                    tip: "点击查看专科检查室信息",
                    title: "",
                    type: "tip"
                }
            }
        ]
    }      
]