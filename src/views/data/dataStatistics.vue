<template>
    <div id="statistics">
        <!-- 地图 -->
        <div id="container"></div>
        <!-- 左侧搜索 -->
        <div :class="{detail:true,detailActive:flag}">
            <div class="title">井下水位</div>
            <div class="address">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">设施地址:</div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <el-input v-model="input1"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">数据来源:</div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">所在区:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple-light">
                            <el-select v-model="value1" placeholder="请选择">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <el-button type="info" plain>查询</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tableDetail">
                <div class="tableTitle">记录总数：102条</div>
                <div class="tablefBorder">
                    <table id="tableContent">
                        <thead>
                            <tr>
                                <th>设备名称</th>
                                <th>监测值</th>
                                <th>上限值</th>
                                <th>报警</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dataList" :key="index" @click="showDetail()">
                                <td class="shebeiName" :title="item.name">{{item.name}}</td>
                                <td>{{item.value}}</td>
                                <td>{{item.maxValue}}</td>
                                <td><span v-show="item.warning" class="warnSpan"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 收起按钮 -->
        <div :class="{divIcon:true,divIconActive:flag}" @click="hideDetail">
            <i class="el-icon-arrow-left" v-show="!flag"></i>
            <i class="el-icon-arrow-right" v-show="flag"></i>
        </div>
        <!-- 弹出框信息 -->
        <div class="dialogDetail" v-show="detailFlag">
            <div class="title">
                <span class="titleH3">平乐大道南宁大桥头液位仪</span>
                <span class="closeDialog" @click="closeDialog">×</span>
            </div>
            <div class="tabs">
                <p :class="{currentWater:true,tabsActive:!tabsActive}" @click="selectTabs(1)">液位高程</p>
                <p :class="{hisWater:true,tabsActive:tabsActive}" @click="selectTabs(2)">历史液位高程</p>
            </div>
            <div class="dialogTable" v-show="!tabsActive">
                <!-- 表格 -->
                <div class="diaTable">
                    <table id="dateAndWater">
                        <thead>
                            <tr>
                                <th>记录时间</th>
                                <th>水位高程</th>
                                <th>警报状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in diaDataList" :key="index">
                                <td>{{item.date}}</td>
                                <td>{{item.water}}</td>
                                <td>
                                    <span v-show="item.warning"><span class="nomalSpan"></span>正常</span>
                                    <span v-show="!item.warning"><span class="warnSpan"></span>危险</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- echart图表 -->
                <div class="diaEchart">
                    <div id="echartContainer" style="width:500px; height:250px"></div>
                </div>
            </div>
            <div class="historyDialogTable" v-show="tabsActive">
                历史纪录
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            flag: false,
            detailFlag: false,
            tabsActive: false,
            input1: "",
            input2: "",
            options: [
                {
                    value: "1",
                    label: "和平大道"
                },
                {
                    value: "2",
                    label: "民族大道"
                },
                {
                    value: "3",
                    label: "关山大道"
                }
            ],
            value: "",
            options1: [
                {
                    value: "1",
                    label: "洪山区"
                },
                {
                    value: "2",
                    label: "武昌区"
                },
                {
                    value: "3",
                    label: "江夏区"
                }
            ],
            value1: "",
            dataList: [
                {
                    name: "平乐大道南宁大桥头液位仪",
                    value: 16.32,
                    maxValue: 15.0,
                    warning: true
                },
                { name: "液位仪", value: 13.22, maxValue: 15.0, warning: true },
                {
                    name: "液位仪",
                    value: 15.342,
                    maxValue: 15.0,
                    warning: true
                },
                {
                    name: "液位仪",
                    value: 152.352,
                    maxValue: 15.0,
                    warning: false
                },
                {
                    name: "液位仪",
                    value: 12.3232,
                    maxValue: 15.0,
                    warning: true
                },
                {
                    name: "液位仪",
                    value: 122.532,
                    maxValue: 15.0,
                    warning: false
                },
                {
                    name: "液位仪",
                    value: 12.632,
                    maxValue: 15.0,
                    warning: false
                },
                {
                    name: "液位仪",
                    value: 142.832,
                    maxValue: 15.0,
                    warning: true
                },
                {
                    name: "液位仪",
                    value: 142.32,
                    maxValue: 15.0,
                    warning: false
                },
                {
                    name: "液位仪",
                    value: 122.32,
                    maxValue: 15.0,
                    warning: false
                },
                { name: "液位仪", value: 12.32, maxValue: 15.0, warning: true },
                {
                    name: "液位仪",
                    value: 12.32,
                    maxValue: 15.0,
                    warning: false
                },
                { name: "液位仪", value: 12.32, maxValue: 15.0, warning: true },
                {
                    name: "液位仪",
                    value: 162.32,
                    maxValue: 15.0,
                    warning: false
                },
                { name: "液位仪", value: 12.32, maxValue: 15.0, warning: true },
                { name: "液位仪", value: 12.32, maxValue: 15.0, warning: true },
                {
                    name: "液位仪",
                    value: 12.32,
                    maxValue: 15.0,
                    warning: false
                },
                {
                    name: "液位仪",
                    value: 12.32,
                    maxValue: 15.0,
                    warning: false
                },
                { name: "液位仪", value: 12.32, maxValue: 15.0, warning: true }
            ],
            diaDataList: [
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-03-11", water: 73.9, warning: false },
                { date: "2018-04-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 75.9, warning: false },
                { date: "2018-07-11", water: 72.9, warning: false },
                { date: "2018-01-11", water: 79.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: false },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: false },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: false },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: true },
                { date: "2018-09-11", water: 72.9, warning: false },
                { date: "2018-09-11", water: 80.9, warning: true }
            ]
        };
    },
    mounted() {
        this.renderMap();
    },
    methods: {
        //渲染地图
        renderMap() {
            let infoWindow;
            let map = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 12,
                center: [113.23, 23.16],
                mapStyle: "amap://styles/blue"
            });
            //点标记
            let position = [
                [113.23, 23.16],
                [113.232, 23.15],
                [113.24, 23.17],
                [113.25, 23.17],
                [113.26, 23.15],
                [113.28, 23.13],
                [113.21, 23.13],
                [113.18, 23.15]
            ];
            for (let i in position) {
                let marker = new AMap.Marker({
                    icon: "../static/img/jiance.png",
                    position: position[i],
                    offset: new AMap.Pixel(-13, -30)
                });
                marker.setMap(map);
                AMap.event.addListener(marker, "click", function(e) {
                    infoWindow.open(map, marker.getPosition());
                });
            }
            let content =
                '<div style="background:#fff;width:200px;height:120px;position:relative;border-radius: 10px;overflow: hidden;">' +
                '<span style="position: absolute;right: 10px;top: 3px;color:#999">×</span>' +
                '<div style="background:#336699;height:30px;line-height:30px;text-align:center;color:#fff;font-size: 17px;">广州市生物岛</div>' +
                '<div style="font-size: 15px;color: #333;padding: 10px 10px;"><span>经度：</span><span>1221.32</span></div>' +
                '<div style="font-size: 15px;color: #333;padding: 10px 10px;"><span>纬度：</span><span>21.32</span></div></div>';

            //实例化信息窗体
            infoWindow = new AMap.InfoWindow({
                isCustom: true, //使用自定义窗体
                content: content,
                offset: new AMap.Pixel(16, -45)
            });
        },
        //点击图标
        hideDetail() {
            this.flag = !this.flag;
        },
        //点击表格
        showDetail() {
            this.detailFlag = true;
            this.renderEchart();
        },
        //关闭弹框
        closeDialog() {
            this.detailFlag = false;
        },
        //切换tabs
        selectTabs(index) {
            if (index == 1) {
                this.tabsActive = false;
            } else {
                this.tabsActive = true;
            }
        },
        //加载echart
        renderEchart() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(
                document.getElementById("echartContainer")
            );
            let option = {
                title: {
                    text: "井下水深实时监控"
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
                    data: ["井盖高度", "管顶高度","水位"]
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
                            "09:00",
                            "09:30",
                            "10:00",
                            "10:30",
                            "11:00",
                            "11:30",
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
                        name: "井盖高度",
                        type: "line",
                        // stack: "总量",
                        // areaStyle: {},
                        data: [79.4, 79.4, 79.4, 79.4, 79.4, 79.4]
                    },
                    {
                        name: "管顶高度",
                        type: "line",
                        // stack: "总量",
                        // areaStyle: {},
                        data: [72.3, 72.3, 72.3, 72.3, 72.3, 72.3]
                    },
                    {
                        name: "水位",
                        type: "line",
                        stack: "总量",
                        areaStyle: {},
                        data: [45.4, 36.4, 56.4, 25.4, 44.4, 33.4]
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
            window.onresize = myChart.resize;
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        }
    }
};
</script>
<style lang="scss">
#statistics {
    height: 100%;
    position: relative;
    #container {
        height: 100%;
        img {
            border-radius: 4px;
            width: 15px;
            height: 19px;
        }
    }
    .detail {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 300px;
        background: #243b52;
        border: 1px solid #666;
        transition: width 0.5s;
        overflow: hidden;
        padding: 5px;
        box-sizing: border-box;
        overflow: auto;
        z-index: 1;
        .title {
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            text-align: center;
            margin-bottom: 10px;
            padding-bottom: 5px;
            font-weight: bold;
            border-bottom: 1px solid #666;
        }
        .address {
            border-bottom: 1px solid #666;
            .el-row {
                margin-bottom: 8px;
                .bg-purple {
                    text-align: left;
                    font-size: 13px;
                    color: #ffffff;
                    line-height: 30px;
                }
                input {
                    height: 30px;
                }
                .el-input__icon {
                    line-height: 30px;
                }
                .el-button {
                    height: 30px;
                    line-height: 0px;
                    margin-left: 10px;
                }
            }
        }
        .tableDetail {
            color: #ffffff;
            .tableTitle {
                font-size: 13px;
                padding: 8px 0;
            }
            .tablefBorder {
                #tableContent {
                    width: 100%;
                    border-collapse: collapse;
                    th,
                    td {
                        font-size: 12px;
                        text-align: center;
                        border: 1px solid #666;
                        height: 27px;
                        line-height: 27px;
                        .warnSpan {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 5px;
                            background: #dc143c;
                        }
                    }
                    .shebeiName {
                        max-width: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .detailActive {
        width: 0;
        border: none;
        padding: 0;
    }
    .divIcon {
        position: absolute;
        top: 46%;
        left: 285px;
        width: 15px;
        height: 34px;
        line-height: 34px;
        background: #ffffff;
        cursor: pointer;
        transition: left 0.5s;
        z-index: 2;
    }
    .divIconActive {
        left: 0px;
    }
    .dialogDetail {
        width: 800px;
        height: 360px;
        border: 1px solid #666;
        position: absolute;
        right: 0;
        bottom: 0;
        background: #ffffff;
        .title {
            height: 30px;
            line-height: 30px;
            background: #00688b;
            padding: 0 10px;
            padding-right: 0;
            border-bottom: 1px solid #ccc;
            .titleH3 {
                font-size: 14px;
                font-weight: bold;
                color: #ffffff;
            }
            .closeDialog {
                color: #fff;
                font-size: 20px;
                float: right;
                cursor: default;
                width: 20px;
                text-align: center;
            }
            .closeDialog:hover {
                color: #dc143c;
            }
        }
        .tabs {
            border: 1px solid #cccccc;
            height: 28px;
            // margin-top: 1px;
            font-size: 13px;
            text-align: center;
            line-height: 28px;
            .currentWater {
                width: 50%;
                float: left;
                border-right: 1px solid #ccc;
                box-sizing: border-box;
                cursor: pointer;
            }
            .hisWater {
                width: 50%;
                float: right;
                cursor: pointer;
            }
            .tabsActive {
                background: #f6f6f6;
                border-bottom: 1px solid #999;
                font-weight: bold;
            }
        }
        .dialogTable {
            height: 295px;
            overflow: hidden;
            .diaTable {
                height: 295px;
                width: 35%;
                float: left;
                overflow: auto;
                margin-right: 5px;
                #dateAndWater {
                    width: 100%;
                    border-collapse: collapse;
                    th,
                    td {
                        font-size: 12px;
                        text-align: center;
                        border: 1px solid #ccc;
                        height: 27px;
                        line-height: 27px;
                        .nomalSpan {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 5px;
                            background: green;
                            margin-right: 5px;
                        }
                        .warnSpan {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 5px;
                            background: #dc143c;
                            margin-right: 5px;
                        }
                    }
                }
            }
            .diaEchart {
                height: 295px;
                width: 64%;
                float: left;
                // border: 1px solid red;
            }
            .diaWarn {
                height: 295px;
                width: 18%;
                float: left;
                border: 1px solid red;
            }
        }
    }
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
}
</style>
