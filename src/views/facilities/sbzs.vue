<template>
    <div id="statistics">
        <!-- 地图 -->
        <div id="container"></div>
        <!-- 详细信息 -->
        <div class="dialogDetail" v-show="detailFlag">
            <div class="title">
                <span class="titleH3">平乐大道南宁立交桥</span>
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
            detailFlag: true,
            tabsActive: false,
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
        this.renderEchart();
    },
    methods: {
        //渲染地图
        renderMap() {
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
            var infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -30)
            });
            for (var i = 0, marker; i < position.length; i++) {
                var marker = new AMap.Marker({
                    position: position[i],
                    map: map
                });
                marker.content = "经纬度：" + position[i];
                marker.on("click", markerClick);
                marker.emit("click", { target: marker });
            }
            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            map.setFitView();
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
                    data: ["井盖高度", "管顶高度", "水位"]
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
                            "11:30"
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
