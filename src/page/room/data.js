export const rooms = {
    "前台大厅": {
        image: require("@/assets/room/Hall/Hall.jpg"),
        desc: "包括接待挂号、导医咨询、病历档案发出与回收、收费等。",
        "设备信息":[
            {
                image:require("@/assets/room/Hall/Computer.jpg"),
                name: "电脑"
            },
            {
                image:require("@/assets/room/Hall/Print.jpg"),
                name: "打印机"
            },
            {
                image: require("@/assets/room/Hall/Charge.jpg"),
                name: "收费机"
            }
        ]
    },
    "手术室": {
        image: require("@/assets/room/Operating/Operating.jpg"),
        desc: "主要功能包括手术室的布局介绍，手术室消毒流程，手术无菌要求，常规手术、特殊手等的操作规范。主要负责人为执业兽医师",
        "设备信息":[
            {
                image: require("@/assets/room/Operating/mazuiji.jpg"),
                name: "麻醉机"
            },
            {
                image: require("@/assets/room/Operating/jianhuyi.jpg"),
                name: "手术监护仪"
            },
            {
                image: require("@/assets/room/Operating/shuyebeng.png"),
                name: "输液泵"
            },
            {
                image: require("@/assets/room/Operating/neikuijing.jpg"),
                name: "内窥镜"
            }
        ]
    },
    "诊室": {
        image: require("@/assets/room/Consulting/Consulting.jpg"),
        desc: "主要功能包括包括诊室的布局介绍；对宠物进行临床基本检查（视、听、触、嗅等）、疾病诊断；与宠物主人交流并根据情况开具处方。主要负责人为执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/Consulting/xueyaji.jpg"),
                name: "血压计"
            },
            {
                image: require("@/assets/room/Consulting/xuetangyi.jpg"),
                name: "血糖仪"
            },
            {
                image: require("@/assets/room/Consulting/tingzhengqi.jpg"),
                name: "听诊器"
            },
            {
                image: require("@/assets/room/Consulting/weichangjing.jpg"),
                name: "胃肠镜"
            }
        ]
    },
    "病例剖析室": {
        image: require("@/assets/room/CaseAnalysis/CaseAnalysis.jpg"),
        desc: "主要功能包括包括对病死动物剖解的流程，病理剖检室的消毒流程，病历剖检过程的人员要求，病理剖检过程中的人道关怀。主要负责人为执业兽医师",
        "设备信息":[
            {
                image: require("@/assets/room/CaseAnalysis/CT.jpg"),
                name: "CT"
            },
            {
                image: require("@/assets/room/CaseAnalysis/MRI.jpg"),
                name: "MRI"
            },
            {
                image: require("@/assets/room/CaseAnalysis/超声.jpg"),
                name: "超声"
            }
        ]
    },
    "免疫室": {
        image: require("@/assets/room/Immune/免疫室.jpg"),
        desc: "主要功能包括为健康宠物接种疫苗的流程，对常见并发症的处理流程，对常见免疫相关问题的解答等。主要负责人为助理和执业兽医师",
        "设备信息":[
            {
                image: require("@/assets/room/Immune/活体显微镜.jpg"),
                name: "活体显微镜"
            },
            {
                image: require("@/assets/room/Immune/ELISA检测仪.png"),
                name: "ELISA检测仪"
            },
            {
                image: require("@/assets/room/Immune/离心机.jpg"),
                name: "离心机"
            },
            {
                image: require("@/assets/room/Immune/液氮罐.jpg"),
                name: "液氮罐"
            },
            {
                image: require("@/assets/room/Immune/酶标记试剂.jpg"),
                name: "酶标记试剂"
            }
        ]
    },
    "药房": {
        image: require("@/assets/room/Drug/Drug.jpg"),
        desc: "主要功能包括对各种药物的存放要求、处方的审核流程、药物的发放流程、常见药物的使用说明等。主要负责人为助理和执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/Drug/药液混合机.jpg"),
                name: "药液混合机"
            },
            {
                image: require("@/assets/room/Drug/药片分装机.jpg"),
                name: "药片分装机"
            },
            {
                image: require("@/assets/room/Drug/药品废液收集桶.png"),
                name: "药品废液收集桶"
            },
        ]
    },
    "手术准备室": {
        image: require("@/assets/room/SurgicalPreparationRoom/SurgicalPreparationRoom.jpg"),
        desc: "主要功能包括术前对宠物进行麻前给药、注射麻醉、吸入麻醉的流程，保定、剃毛、消毒的流程，常见手术器械的介绍，手术器械包的准备、灭菌流程，手术人员的消毒、穿戴手术衣流程等。主要负责人为助理和执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/SurgicalPreparationRoom/手术灯.jpg"),
                name: "手术灯"
            },
            {
                image: require("@/assets/room/SurgicalPreparationRoom/手术器械准备台.jpg"),
                name: "手术器械准备台"
            },
            {
                image: require("@/assets/room/SurgicalPreparationRoom/洗手池.jpg"),
                name: "洗手池"
            }
        ]
    },
    "住院部": {
        image: require("@/assets/room/InpatientDepartment/InpatientDepartment.jpg"),
        desc: "主要功能包括包括对需要住院的病例进行护理分级，不同护理级别的要求，住院部的工作流程，住院部的消毒流程等。主要负责人为住院执业兽医师或助理执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/InpatientDepartment/心电监护仪.jpg"),
                name: "心电监护仪"
            },
            {
                image: require("@/assets/room/InpatientDepartment/输液器.jpg"),
                name: "输液器"
            },
            {
                image: require("@/assets/room/InpatientDepartment/吸氧机.jpg"),
                name: "吸氧机"
            },
        ]
    },
    "档案室": {
        image: require("@/assets/room/ArchivesCenter/ArchivesCenter.jpg"),
        desc: "主要功能包括包括病例档案的合理保存与数据统计等。主要负责人为前台",
        "设备信息": [
            {
                image: require("@/assets/room/ArchivesCenter/文件盒.jpg"),
                name: "文件盒"
            },
            {
                image: require("@/assets/room/ArchivesCenter/扫描仪.jpg"),
                name: "扫描仪"
            },
            {
                image: require("@/assets/room/ArchivesCenter/复印机.jpg"),
                name: "复印机"
            },
        ]
    },
    "化验室": {
        image: require("@/assets/room/Laboratory/Laboratory.jpg"),
        desc: "主要功能包括包括对送检本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程。主要负责人为助理和执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/Laboratory/离心机.jpg"),
                name: "离心机"
            },
            {
                image: require("@/assets/room/Laboratory/电泳仪.jpg"),
                name: "电泳仪"
            },
            {
                image: require("@/assets/room/Laboratory/移液枪.png"),
                name: "移液枪"
            },
        ]
    },
    "影像室": {
        image: require("@/assets/room/ImagingRoom/ImagingRoom.jpg"),
        desc: "主要功能包括X线检查、B超检查以及CT、MRI检查。如X线检查：X光机的结构功能介绍、全身各部位的摆位、拍摄条件的选择、拍摄流程、洗片的操作流程。B超检查：扫查探头的选择、全身各个部位扫查的摆位、腹部扫查流程。主要负责人为助理和执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/ImagingRoom/X线摄影机.jpg"),
                name: "X线摄影机"
            },
            {
                image: require("@/assets/room/ImagingRoom/超声诊断仪.jpg"),
                name: "超声诊断仪"
            },
            {
                image: require("@/assets/room/ImagingRoom/核磁共振成像仪.jpg"),
                name: "核磁共振成像仪"
            },
        ]
    },
    "处置室": {
        image: require("@/assets/room/DisposalRoom/DisposalRoom.jpg"),
        desc: "主要功能包括口服投药、换药、清洗耳道、挤肛门腺、修剪指甲、鼻饲管放置、灌肠、安乐死等基本处置操作流程。主要负责人为助理和执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/DisposalRoom/除颤器.jpg"),
                name: "除颤器"
            },
            {
                image: require("@/assets/room/DisposalRoom/急救器械.jpg"),
                name: "急救器械"
            },
        ]
    },
    "专科检查室": {
        image: require("@/assets/room/ExaminationRoom/ExaminationRoom.jpg"),
        desc: "包括对眼科、骨科、神经科、心脏科等专科疾病的检查，如眼科（检眼镜检查、眼压检查、裂隙灯检查、眼底检查、泪液分泌量检查等）、心脏科检查（心脏听诊、心电图检查等）、神经学检查（步态检查、各种反射检查等）等。主要负责人为执业兽医师",
        "设备信息": [
            {
                image: require("@/assets/room/ExaminationRoom/心电图仪.jpg"),
                name: "心电图仪"
            },
            {
                image: require("@/assets/room/ExaminationRoom/内窥镜.jpg"),
                name: "内窥镜"
            },
        ]
    }
}