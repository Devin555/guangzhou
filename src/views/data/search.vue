<template>
    <div id="search">
        <div class="searchTable">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">设备名称:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input1" placeholder="请输入设备名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">设备地点:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input2" placeholder="请输入设备地点"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">设备类型:</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="input3" placeholder="请输入设备类型"></el-input>
                    </div>
                </el-col>
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
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>&nbsp;</span></div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-button type="primary">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="echartBorder">
            <div id="echartContainer" style="width:100%; height:400px"></div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            input1: "",
            input2: "",
            input3: "",
            date1: "",
            date2: ""
        };
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("echartContainer"));
        let option = {
            title: {
                text: "监测数据图"
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985"
                    }
                }
            },
            legend: {
                data: ["液位", "流量", "流速"]
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "2018-11-1",
                        "2018-11-3",
                        "2018-11-5",
                        "2018-11-7",
                        "2018-11-9",
                        "2018-11-11",
                        "2018-11-13",
                    ]
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "液位",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "流量",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: "流速",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        // 绘制图表
        myChart.setOption(option);
        window.onresize = myChart.resize;
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    },
    methods: {}
};
</script>
<style lang="scss">
#search {
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
        }
    }
    .echartBorder {
        border: 1px solid #cccccc;
        background: #ffffff;
        margin: 10px;
        height: 400px;
        padding: 10px;
    }
}
</style>
