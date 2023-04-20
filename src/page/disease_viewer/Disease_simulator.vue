<template>
    <div id="Disease_simulator">
        <div id="header">
            <h1>模拟诊断</h1>
            <el-button size="small" @click="() => this.$router.replace('/home/case_list')"
                style="margin-left:30px">返回</el-button>
        </div>
        <el-card class="box-card">
            <h2>基础信息</h2><br>
            <el-col class="list-title">
                <p>疾病名称:</p>
            </el-col>
            <el-col class="list-body">
                <p>{{ (disease_name == "") ? "请选择疾病名以进行后续操作" : disease_name }}</p>
            </el-col>
            <el-button type="primary" size="mini" @click="openDialog3('选择病例')">选择病例</el-button>
            <el-button type="primary" size="mini" @click="checkTable('查看档案')"
                :disabled="(disease_name == '') ? true : false">查看档案</el-button>
            <el-button type="primary" size="mini" @click="checkTable('查看住院信息')"
                :disabled="(disease_name == '') ? true : false">住院信息</el-button><br><br>

            <el-col class="list-title">
                <p>主治医师:</p>
            </el-col>
            <el-col class="list-body">
                <p>{{ (staff == "") ? "未选择主治医师" : staff }}</p>
            </el-col>
            <el-button type="primary" size="mini" @click="openDialog3('选择医师')"
                :disabled="(disease_name == '') ? true : false">选择医师</el-button><br><br>

            <el-col class="list-title">
                <p>主要责任科室:</p>
            </el-col>
            <el-col class="list-body">
                <p>{{ (department == "") ? "未选择主要责任科室" : department }}</p>
            </el-col>
            <el-button type="primary" size="mini" @click="openDialog3('选择科室')"
                :disabled="(disease_name == '') ? true : false">选择科室</el-button><br><br>

            <el-col class="list-title">
                <p>共需费用:</p>
            </el-col>
            <el-col class="list-body">
                <p>{{ count_price() }}</p>
            </el-col>
            <br>
        </el-card>

        <el-card class="box-card">
            <h2>收费项目</h2>
            <el-table :data="chargeData" stripe style="width: 100%" max-height="300">
                <el-table-column prop="name" label="名称" width="380"></el-table-column>
                <el-table-column prop="price" label="费用" width="250"></el-table-column>
                <el-table-column label="数量" prop="num">
                    <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.num" :min="1"
                            :max="100"></el-input-number></template>
                </el-table-column>
                <el-table-column width="120">
                    <template slot="header" slot-scope="scope">
                        <el-button type="primary" size="small" @click.native.prevent="add('收费项目')"
                            :disabled="(disease_name == '') ? true : false">添加</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="danger" size="small"
                            @click.native.prevent="deleteRow(scope.$index, chargeData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card class="box-card">
            <h2>化验项目</h2>
            <el-table :data="assayData" stripe style="width: 100%" max-height="300">
                <el-table-column prop="name" label="名称" width="380"></el-table-column>
                <el-table-column prop="price" label="费用" width="250"></el-table-column>
                <el-table-column label="数量" prop="num">
                    <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.num" :min="1"
                            :max="100"></el-input-number></template>
                </el-table-column>
                <el-table-column width="120">
                    <template slot="header" slot-scope="scope">
                        <el-button type="primary" size="small" @click.native.prevent="add('化验项目')"
                            :disabled="(disease_name == '') ? true : false">添加</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="danger" size="small"
                            @click.native.prevent="deleteRow(scope.$index, assayData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card class="box-card">
            <h2>疫苗注射</h2>
            <el-table :data="vaccinumData" stripe style="width: 100%" max-height="300">
                <el-table-column prop="name" label="名称" width="380"></el-table-column>
                <el-table-column prop="price" label="费用" width="250"></el-table-column>
                <el-table-column label="数量" prop="num">
                    <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.num" :min="1"
                            :max="100"></el-input-number></template>
                </el-table-column>
                <el-table-column width="120">
                    <template slot="header" slot-scope="scope">
                        <el-button type="primary" size="small" @click.native.prevent="add('疫苗注射')"
                            :disabled="(disease_name == '') ? true : false">添加</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="danger" size="small"
                            @click.native.prevent="deleteRow(scope.$index, vaccinumData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card class="box-card">
            <h2>药物处方</h2>
            <el-table :data="medicineData" stripe style="width: 100%" max-height="300">
                <el-table-column prop="name" label="名称" width="380"></el-table-column>
                <el-table-column prop="price" label="费用" width="250"></el-table-column>
                <el-table-column label="数量" prop="num">
                    <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.num" :min="1"
                            :max="100"></el-input-number></template>
                </el-table-column>
                <el-table-column width="120">
                    <template slot="header" slot-scope="scope">
                        <el-button type="primary" size="small" @click.native.prevent="add('药物处方')"
                            :disabled="(disease_name == '') ? true : false">添加</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="danger" size="small"
                            @click.native.prevent="deleteRow(scope.$index, medicineData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <br>





        <el-dialog width="80%" style="" :title="'选择' + dialogTitle" :visible.sync="dialogTableVisible">
            <el-table ref="multipleTable"
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%" @selection-change="handleSelectionChange" max-height="300">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="name" label="名称" width="180"></el-table-column>
                <el-table-column v-if="dialogTitle != '疫苗注射'" property="description" label="介绍" width="480"></el-table-column>
                <el-table-column v-if="dialogTitle == '疫苗注射'" property="type" label="疫苗类型" width="240"></el-table-column>
                <el-table-column property="price" label="价格" width="90"></el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入以查询" />
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(dialogTitle)">确认</el-button>
            </span>
        </el-dialog>

        <el-dialog width="80%" style="" :title="dialogTitle" :visible.sync="dialogTableVisible2">
            <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%" max-height="300px">
                <el-table-column width="240" fixed="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入以查询" />
                    </template>
                </el-table-column>
                <template v-if="dialogTitle == '查看档案'">
                    <el-table-column property="disease" label="疾病名称" width="150"></el-table-column>
                    <el-table-column property="name" label="宠物名称" width="120"></el-table-column>
                    <el-table-column property="breed" label="宠物品种" width="120"></el-table-column>
                    <el-table-column property="gender" label="宠物性别" width="120"></el-table-column>
                    <el-table-column property="doctor" label="主治医生" width="120"></el-table-column>
                    <el-table-column property="department" label="主要责任科室" width="120"></el-table-column>
                    <el-table-column property="charge" label="付费项目" width="240"></el-table-column>
                    <el-table-column property="drug" label="使用药物" width="240"></el-table-column>
                    <el-table-column property="vaccine" label="使用疫苗" width="240"></el-table-column>
                    <el-table-column property="assay" label="化验项目" width="240"></el-table-column>
                    <el-table-column property="inpatient" label="是否住院" width="120"></el-table-column>
                </template>
                <template v-else>
                    <el-table-column property="reason" label="住院原因" width="120"></el-table-column>
                    <el-table-column property="name" label="宠物名字" width="120"></el-table-column>
                    <el-table-column property="breed" label="宠物品种" width="150"></el-table-column>
                    <el-table-column property="day" label="住院天数" width="120"></el-table-column>
                </template>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel2">返回</el-button>
            </span>
        </el-dialog>

        <el-dialog width="80%" style="" :title="dialogTitle" :visible.sync="dialogTableVisible3">
            <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                highlight-current-row @current-change="handleSingleChange" style="width: 100%" max-height="300px">
                <el-table-column align="right" fixed="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入以查询" />
                    </template>
                </el-table-column>
                <template v-if="dialogTitle == '选择病例'">
                    <el-table-column property="type" label="疾病种类" width="350"></el-table-column>
                    <el-table-column property="name" label="疾病名称" width="350"></el-table-column>
                </template>
                <template v-else-if="dialogTitle == '选择医师'">
                    <el-table-column property="name" label="姓名" width="90"></el-table-column>
                    <el-table-column property="age" label="年龄" width="90"></el-table-column>
                    <el-table-column property="gender" label="性别" width="90"></el-table-column>
                    <el-table-column property="position" label="职位" width="150"></el-table-column>
                    <el-table-column property="experience" label="工作经验" width="90"></el-table-column>
                    <el-table-column property="phone" label="电话号码" width="200"></el-table-column>
                </template>
                <template v-else-if="dialogTitle == '选择科室'">
                    <el-table-column property="name" label="科室名称" width="120"></el-table-column>
                    <el-table-column property="description" label="科室介绍" width="650"></el-table-column>
                </template>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel3">取消</el-button>
                <el-button type="primary" @click="confirm3(dialogTitle)">确认</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
    name: "Disease_simulator",
    data() {
        return {
            dialogTableVisible: false,
            dialogTableVisible2: false,
            dialogTableVisible3: false,
            dialogTitle: "",
            disease_name: "",
            staff: "",
            department: "",
            chargeData: [],
            assayData: [],
            vaccinumData: [],
            medicineData: [],
            tableData: [],
            search: "",
            multipleSelection: [],
            currentRow: {}
        };
    },
    methods: {
        count_price() {
            let total = 0
            for (let index in this.chargeData) {
                if (this.chargeData[index].price == null) {
                    continue
                }
                total = total + this.chargeData[index].price * this.chargeData[index].num
            }
            for (let index in this.assayData) {
                if (this.assayData[index].price == null) {
                    continue
                }
                total = total + this.assayData[index].price * this.assayData[index].num
            }
            for (let index in this.medicineData) {
                if (this.medicineData[index].price == null) {
                    continue
                }
                total = total + this.medicineData[index].price * this.medicineData[index].num
            }
            for (let index in this.vaccinumData) {
                if (this.vaccinumData[index].price == null) {
                    continue
                }
                total = total + this.vaccinumData[index].price * this.vaccinumData[index].num
            }
            return total
        },
        checkTable: async function (title) {
            this.dialogTableVisible2 = true
            this.dialogTitle = title
            this.tableData = []
            let table_url = ""
            this.search = ""
            let loader = new NetLoader("test")
            if (title == "查看档案") {
                table_url = "/record"
                let url = "http://127.0.0.1:8888" + table_url + "/findAllByDisease?disease=" + this.disease_name
                loader.get(url).then((value) => {
                    for (let index in value.data) {
                        this.tableData.push(value.data[index])
                    }
                })
            } else if (title == "查看住院信息") {
                table_url = "/inpatient"
                let url = "http://127.0.0.1:8888" + table_url + "/findAllByReason?reason=" + this.disease_name
                loader.get(url).then((value) => {
                    for (let index in value.data) {
                        this.tableData.push(value.data[index])
                    }
                })
            }
        },
        openDialog3(title) {
            this.dialogTitle = title
            this.tableData = []
            this.search = ""
            let table_url = ""
            let loader = new NetLoader("test")
            if (title == "选择病例") {
                table_url = "/case"
            } else if (title == "选择医师") {
                table_url = "/staff"
            } else if (title == "选择科室") {
                table_url = "/department"
            }
            let url = "http://127.0.0.1:8888" + table_url + "/findAll"
            loader.get(url).then((value) => {
                for (let index in value.data) {
                    if (title == "选择病例") {
                        let obj = {}
                        obj.type = value.data[index].type
                        obj.name = value.data[index].name1
                        this.tableData.push(obj)
                    } else {
                        this.tableData.push(value.data[index])
                    }
                }
            })
            this.dialogTableVisible3 = true
        },
        confirm3(title) {
            if (title == "选择病例") {
                this.disease_name = this.currentRow.name
            } else if (title == "选择医师") {
                this.staff = this.currentRow.name
            } else if (title == "选择科室") {
                this.department = this.currentRow.name
            }
            this.dialogTableVisible3 = false
        },
        cancel2() {
            this.dialogTableVisible2 = false
        },
        cancel3() {
            this.dialogTableVisible3 = false
        },
        confirm(title) {
            if (title == "收费项目") {
                for (let index in this.multipleSelection) {
                    let flag = true
                    for (let key in this.chargeData) {
                        if (this.multipleSelection[index].name == this.chargeData[key].name) {
                            flag = false
                            break
                        }
                    }
                    if (!flag) {
                        continue
                    }
                    let obj = { ... this.multipleSelection[index] }
                    obj.num = 1
                    this.chargeData.push(obj)
                }
            } else if (title == "化验项目") {
                for (let index in this.multipleSelection) {
                    let flag = true
                    for (let key in this.assayData) {
                        if (this.multipleSelection[index].name == this.assayData[key].name) {
                            flag = false
                            break
                        }
                    }
                    if (!flag) {
                        continue
                    }
                    let obj = { ... this.multipleSelection[index] }
                    obj.num = 1
                    this.assayData.push(obj)
                }
            } else if (title == "疫苗注射") {
                for (let index in this.multipleSelection) {
                    let flag = true
                    for (let key in this.vaccinumData) {
                        if (this.multipleSelection[index].name == this.vaccinumData[key].name) {
                            flag = false
                            break
                        }
                    }
                    if (!flag) {
                        continue
                    }
                    let obj = { ... this.multipleSelection[index] }
                    obj.num = 1
                    this.vaccinumData.push(obj)
                }
            } else if (title == "药物处方") {
                for (let index in this.multipleSelection) {
                    let flag = true
                    for (let key in this.medicineData) {
                        if (this.multipleSelection[index].name == this.medicineData[key].name) {
                            flag = false
                            break
                        }
                    }
                    if (!flag) {
                        continue
                    }
                    let obj = { ... this.multipleSelection[index] }
                    obj.num = 1
                    this.medicineData.push(obj)
                }
            }

            this.dialogTableVisible = false
        },
        cancel() {
            this.dialogTableVisible = false
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        add: async function (title) {
            this.dialogTableVisible = true
            this.search = ""
            this.dialogTitle = title
            let table_url = "/charge"
            switch (title) {
                case "收费项目": table_url = "/charge"; break;
                case "化验项目": table_url = "/assay"; break;
                case "疫苗注射": table_url = "/vaccine"; break;
                case "药物处方": table_url = "/drug"; break;
            }
            this.tableData = []
            let url = "http://127.0.0.1:8888" + table_url + "/findAll"
            let loader = new NetLoader("test")
            loader.get(url).then((value) => {
                for (let index in value.data) {
                    this.tableData.push(value.data[index])
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSingleChange(val) {
            this.currentRow = val;
        }
    },
    components: {},
}
</script>

<style scoped lang="less">
#disease_simulator {
    width: 100%;
    height: wrap-content;
    margin: 0;
    margin-left: 2%;
}

.list-title {
    color: #606266;
    width: 110px;
}

.list-body {
    color: #909399;
    width: 400px;
}

.box-card {
    width: 80%;
    margin-top: 15px;
    margin-left: 10%;
}

#header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>