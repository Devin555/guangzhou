<template>
    <div id="control">
        <div class="topSlider">
            <div>运行信息</div>
            <div>实时日志</div>
            <div>历史日志</div>
            <div>报错信息</div>
        </div>
        <!-- 查询 -->
        <div class="searchTable">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">事件名称:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input" placeholder="请输入事件名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">运行结果:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="value2" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">时间:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-date-picker v-model="date1" type="date" placeholder="选择日期">
                        </el-date-picker>
                        <el-date-picker v-model="date2" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <div class="echartBorder">
            <table id="chartTable">
                <thead>
                    <tr>
                        <th>作业</th>
                        <th>记录数</th>
                        <th>运行结果</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.result}}</td>
                        <td>{{item.date}}</td>
                        <td style="width:180px">
                            <el-button size="mini" @click="handleEdit()" type="primary" plain>日志</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="paginationBotton">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
        <!-- 弹出框 -->
        <div class="myDialog">
            <!-- 新增弹出框 -->
            <el-dialog title="日志" :visible.sync="editDialogVisible" width="40%" center>
                <div>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">设施名称:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input1" placeholder="请输入设施名称"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">监控数量:</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="input2" placeholder="请输入监控数量"></el-input>
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
            editDialogVisible: false,
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
            input:'',
            input1:'',
            input2:'',
            value2: "",
            date1:'',
            date2:'',
            tableData: [
                {
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },
                {
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },{
                    id: 11,
                    name: "气象预警转换",
                    number: 2233,
                    result: 1,
                    date:'2018-9-12'
                },
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
        handleEdit() {
            this.editDialogVisible = true;
        }
    }
};
</script>
<style lang="scss">
#control {
    .topSlider {
        border: 1px solid #cccccc;
        background: #999;
        margin: 10px;
        display: flex;
        div {
            flex-grow: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ffffff;
            font-size: 16px;
            border-right: 1px solid #ccc;
            cursor: default;
        }
        div:last-child {
            border: none;
        }
    }
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
            .el-date-editor--date {
                width: 49%;
            }
            .el-select {
                width: 100%;
            }
        }
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
            .el-date-editor {
                width: 100%;
            }
        }
    }
}
</style>
