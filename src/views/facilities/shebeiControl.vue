<template>
    <div id="control">
        <!-- 查询 -->
        <div class="searchTable">
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple">设备名称:</div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input" placeholder="请输入设备名称"></el-input>
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
            <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
        </div>
        <!-- 表格 -->
        <div class="echartBorder">
            <table id="chartTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" @click="checkedBox" v-model="flag"></th>
                        <th>序号</th>
                        <th>设备名称</th>
                        <th>排序</th>
                        <th>监控项数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td><input type="checkbox" :value='item.id' v-model="checkboxList"></td>
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.sort}}</td>
                        <td>{{item.number}}</td>
                        <td style="width:180px">
                            <el-button size="mini" @click="handleEdit()" type="primary" plain>编辑</el-button>
                            <el-button size="mini" @click="watchDialogVisible = true" type="primary" plain>监控项</el-button>
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
            <!-- 删除弹出框 -->
            <el-dialog title="删除" :visible.sync="centerDialogVisible" width="30%" center>
                <span>确认删除所选项吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog :title="dialogTitle" :visible.sync="editDialogVisible" width="40%" center>
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
            <!-- 监控项弹出框 -->
            <el-dialog title="监控项" :visible.sync="watchDialogVisible" width="40%" center>
                <div>
                    监控项内容
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="watchDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="watchDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: false,
            checkboxList: [],
            centerDialogVisible: false,
            editDialogVisible: false,
            watchDialogVisible: false,
            dialogTitle: "",
            date1: "",
            input: "",
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            tableData: [
                {
                    id: 11,
                    name: "视频",
                    sort: 2,
                    number: 1
                },
                {
                    id: 121,
                    name: "视频",
                    sort: 2,
                    number: 1
                },
                {
                    id: 113,
                    name: "液位仪",
                    sort: 2,
                    number: 1
                },
                {
                    id: 1123,
                    name: "视频",
                    sort: 4,
                    number: 1
                },
                {
                    id: 111,
                    name: "视频",
                    sort: 2,
                    number: 1
                },
                {
                    id: 151,
                    name: "视频",
                    sort: 2,
                    number: 1
                },
                {
                    id: 1145,
                    name: "视频",
                    sort: 2,
                    number: 1
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
        add() {
            this.editDialogVisible = true;
            this.dialogTitle = "新增";
        },
        handleEdit() {
            this.editDialogVisible = true;
            this.dialogTitle = "编辑";
        },
        handleDelete() {
            this.centerDialogVisible = true;
        },
        checkedBox() {
            if (this.flag) {
                //实现反选
                this.checkboxList = [];
            } else {
                //实现全选
                this.checkboxList = [];
                this.tableData.forEach(item => {
                    this.checkboxList.push(item.id);
                });
            }
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
            .el-date-editor {
                width: 100%;
            }
        }
    }
}
</style>
