<template>
    <div id="main">
        <!-- 顶部 -->
        <vheader></vheader>
        <!-- 菜单栏 -->
        <div :class="{slider:true,sliderActive:sliderFlag}">
            <p class="topicon" @click="closeSlider">
                <i class="iconfont icon-collapse-left1"></i>
            </p>
            <!-- 菜单栏 -->
            <div v-for="(item,index) in sliderList" :key="index">
                <p class="oneSlider" @click="hideTwoSlider(index)">
                    <i :class="[iconfont,item.icon]">
                    </i>{{item.oneSliderName}}
                    <i class="el-icon-arrow-right" v-show="second !== index"></i>
                    <i class="el-icon-arrow-down" v-show="second == index"></i>
                </p>
                <div :class="{twoSlider:true}" v-show="second == index">
                    <router-link :to="itemTwo.path" @click.native="link(index)" v-for="(itemTwo,indexTwo) in item.child" :key="indexTwo">{{itemTwo.twoSliderName}}</router-link>
                </div>
            </div>
        </div>
        <!--内容区-->
        <div :class="{content:true,contentActive:sliderFlag}" ref="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import vheader from "./header/header.vue";
export default {
    data() {
        return {
            flag: false,
            sliderFlag: false,
            second: 0,
            iconfont: "iconfont",
            sliderList: [
                {
                    oneSliderName: "首页",
                    icon: "icon-xitong",
                    child: [
                        {
                            twoSliderName: "监测点展示",
                            path: "/main/homePage",
                            id: 1
                        }
                    ]
                },
                {
                    oneSliderName: "监测信息",
                    icon: "icon-zujian1",
                    child: [
                        {
                            twoSliderName: "数据统计",
                            path: "/main/dataStatistics",
                            id: 1
                        },
                        {
                            twoSliderName: "数据查询",
                            path: "/main/search",
                            id: 2
                        },
                        {
                            twoSliderName: "监控数据预警",
                            path: "/main/warning",
                            id: 1
                        }
                    ]
                },
                {
                    oneSliderName: "管理子系统",
                    icon: "icon-Excel",
                    child: [
                        {
                            twoSliderName: "设施管理",
                            path: "/main/control",
                            id: 1
                        },
                        {
                            twoSliderName: "设备管理",
                            path: "/main/shebeiControl",
                            id: 1
                        },
                        {
                            twoSliderName: "设备信息展示",
                            path: "/main/sbzs",
                            id: 1
                        },
                        {
                            twoSliderName: "设备日志管理",
                            path: "/main/daily",
                            id: 1
                        }
                    ]
                },
                // {
                //     oneSliderName: "监测预警",
                //     icon: "icon-chart",
                //     child: [
                //         {
                //             twoSliderName: "监测预警",
                //             path: "/main/table",
                //             id: 1
                //         }
                //     ]
                // }
            ]
        };
    },
    methods: {
        hideTwoSlider(index) {
            if (this.second == index) {
                this.second = -1;
            } else {
                this.second = index;
            }
        },
        closeSlider() {
            // this.sliderFlag = !this.sliderFlag;
            // this.second = -1;
        },
        link(index) {}
    },
    components: {
        vheader
    }
};
</script>
<style lang="scss">
#main {
    height: 100%;
    .slider {
        border-top: 1px solid #243b52;
        background: #243b52;
        width: 200px;
        position: fixed;
        top: 80px;
        left: 0px;
        bottom: 0px;
        transition: width 0.5s;
        -moz-transition: width 1s;
        -webkit-transition: width 0.5s;
        -o-transition: width 1s;
        z-index: 150;
        .topicon {
            color: #ffffff;
            text-align: center;
            background: #0c203b;
            height: 35px;
            line-height: 35px;
            margin-bottom: 1px;
            cursor: pointer;
        }
        .oneSlider {
            overflow: hidden;
            color: #ffffff;
            text-align: center;
            background: #0c203b;
            height: 35px;
            line-height: 35px;
            margin-bottom: 1px;
            font-size: 16px;
            cursor: default;
            user-select: none;
            .el-icon-arrow-right,
            .el-icon-arrow-down {
                float: right;
                margin: 10px;
            }
            .icon-xitong,
            .icon-zujian1,
            .icon-chart,
            .icon-Excel {
                float: left;
                margin-left: 10px;
            }
        }
        .twoSlider {
            //   height: 300px;
            //   transition: height 3s;
            //   -moz-transition: height 1s;
            //   -webkit-transition: height 3s;
            //   -o-transition: height 1s;
            overflow: hidden;
            a {
                text-decoration: none;
                // text-align: center;
                padding-left: 75px;
                box-sizing: border-box;
                color: #ffffff;
                display: inline-block;
                width: 200px;
                font-size: 14px;
                height: 34px;
                line-height: 34px;
                margin-bottom: 1px;
                background: #0c203b;
                cursor: default;
            }
            .router-link-active{
                color: #3399cc;
            }
        }
    }
    .sliderActive {
        width: 35px;
    }
    .content {
        height: 100%;
        margin-left: 200px;
        border-top: none;
        padding-top: 80px;
        background: #f6f6f6;
        box-sizing: border-box;
        transition: margin-left 0.5s;
        -moz-transition: margin-left 1s;
        -webkit-transition: margin-left 0.5s;
        -o-transition: margin-left 1s;
    }
    .contentActive {
        // margin-left: 35px;
    }
}
</style>



