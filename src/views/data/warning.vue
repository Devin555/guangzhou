<template>
    <div id="warning">
        <div class="searchTable">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">设备类型:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">权属单位:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">监控类型:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">时间范围:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-date-picker v-model="date1" type="date" placeholder="选择日期">
                        </el-date-picker>
                        <el-date-picker v-model="date2" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>&nbsp;</span></div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-button type="primary">查询</el-button>
                        <el-button type="success" @click="export2Excel">导出Excel</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="echartBorder">
            <table id="chartTable">
                <thead>
                    <tr>
                        <th>设施地址</th>
                        <th>设备名称</th>
                        <th>监控项名称</th>
                        <th>监控值</th>
                        <th>监控日期</th>
                        <th>监控类型</th>
                        <th>预警</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td>{{item.address}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.namejk}}</td>
                        <td>{{item.line}}</td>
                        <td>{{item.date}}</td>
                        <td>{{item.type}}</td>
                        <td>
                            <span v-show="item.warning"><span class="nomalSpan"></span>正常</span>
                            <span v-show="!item.warning"><span class="warnSpan"></span>危险</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="paginationBotton">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
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
            value1: "",
            value2: "",
            value3: "",
            date1: "",
            date2: "",
            tableData: [
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: false
                },
                {
                    address: "万秀北路",
                    name: "液位仪",
                    namejk: "井下水位",
                    line: "4.12米",
                    date: "2016-05-02",
                    type: "超越井盖",
                    warning: true
                }
            ],
            currentPage4: 4
        };
    },
    mounted() {},
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        export2Excel() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require("../../vendor/Export2Excel");
                const tHeader = [
                    "设施地址",
                    "设备名称",
                    "监控项名称",
                    "监控值",
                    "监控日期",
                    "监控类型",
                    "预警"
                ];
                const filterVal = [
                    "address",
                    "name",
                    "namejk",
                    "line",
                    "date",
                    "type",
                    "warning"
                ];
                const list = this.tableData;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, "监控数据预警");
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        }
    }
};
</script>
<style lang="scss">
#warning {
    background: #f6f6f6;
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
                .warnSpan {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background: #dc143c;
                    margin-right: 5px;
                }
                .nomalSpan {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background: green;
                    margin-right: 5px;
                }
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
}
</style>
