<template>
    <div id="control">
        <div class="searchTable">
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple">设施地址:</div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input" placeholder="请输入设施地址"></el-input>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">设施类型:</div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <el-button type="primary">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="controlBtn">
            <el-button type="primary" size="small" @click="add()">新增</el-button>
        </div>
        <div class="echartBorder">
            <table id="chartTable">
                <thead>
                    <tr>
                        <th>设施地址</th>
                        <th>设施类型</th>
                        <th>设备数量</th>
                        <th>所在道路</th>
                        <th>建立日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td>{{item.address}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.road}}</td>
                        <td>{{item.date}}</td>
                        <td style="width:180px">
                            <el-button size="mini" @click="handleEdit()">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete()">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="paginationBotton">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
        <div class="myDialog">
            <!-- 删除弹出框 -->
            <el-dialog title="删除" :visible.sync="centerDialogVisible" width="30%" center>
                <span>确认删除此设备吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog :title="dialogTitle" :visible.sync="editDialogVisible" width="40%" center>
                <div>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">设施地址:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input1" placeholder="请输入设施地址"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">设施类型:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input2" placeholder="请输入设施类型"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">设备数量:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input3" placeholder="请输入设备数量"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">所在道路:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input4" placeholder="请输入所在道路"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">建立日期:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-date-picker v-model="date1" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            centerDialogVisible: false,
            editDialogVisible: false,
            dialogTitle:'',
            date1: "",
            input:'',
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            value1: "",
            options: [
                {
                    value: "1",
                    label: "设备类型一"
                },
                {
                    value: "2",
                    label: "设备类型二"
                },
                {
                    value: "3",
                    label: "设备类型三"
                }
            ],
            tableData: [
                {
                    address: "万秀北路",
                    type: "水文雨量站",
                    number: 1,
                    road: "民族大道122号",
                    date: "2016-05-02"
                },
                {
                    address: "万秀北路",
                    type: "水文雨量站",
                    number: 1,
                    road: "民族大道122号",
                    date: "2016-05-02"
                },
                {
                    address: "万秀北路",
                    type: "水文雨量站",
                    number: 1,
                    road: "民族大道122号",
                    date: "2016-05-02"
                },
                {
                    address: "万秀北路",
                    type: "水文雨量站",
                    number: 1,
                    road: "民族大道122号",
                    date: "2016-05-02"
                },
                {
                    address: "万秀北路",
                    type: "水文雨量站",
                    number: 1,
                    road: "民族大道122号",
                    date: "2016-05-02"
                }
            ],
            currentPage4: 3
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        add(){
            this.editDialogVisible = true;
            this.dialogTitle = '新增'
        },
        handleEdit() {
            this.editDialogVisible = true;
            this.dialogTitle = '编辑'
        },
        handleDelete() {
            this.centerDialogVisible = true;
        }
    }
};
</script>
<style lang="scss">
#control {
    .searchTable {
        border: 1px solid #cccccc;
        background: #ffffff;
        margin: 10px;
        .el-row {
            padding: 15px 30px 15px 0;
            .bg-purple {
                line-height: 40px;
                text-align: center;
            }
            .el-select {
                width: 100%;
            }
            .el-date-editor--date {
                width: 49%;
            }
        }
    }
    .controlBtn {
        background: #ffffff;
        border: 1px solid #cccccc;
        margin: 0 10px;
        padding: 10px;
    }
    .echartBorder {
        background: #ffffff;
        margin: 10px;
        #chartTable {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 35px;
            th,
            td {
                border: 1px solid #ccc;
                height: 35px;
                text-align: center;
            }
            th {
                font-size: 14px;
                font-weight: 500;
                background: #00688b;
                color: #ccc;
            }
            td {
                font-size: 13px;
                color: #666;
            }
        }
        .paginationBotton {
            background: #ffffff;
            position: fixed;
            text-align: right;
            border: 1px solid #cccccc;
            left: 210px;
            bottom: 0;
            right: 10px;
        }
    }
    .myDialog {
        .el-row {
            margin-bottom: 5px;
            .bg-purple {
                line-height: 30px;
                text-align: center;
            }
            .el-input {
                input {
                    height: 30px;
                }
            }
            .el-icon-date {
                line-height: 30px;
            }
            .el-date-editor{
                width: 100%;
            }
        }
    }
}
</style>
