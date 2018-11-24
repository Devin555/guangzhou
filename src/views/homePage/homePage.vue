<template>
    <div id="homePage">
        <div id="container"></div>
        <div :class="{detail:true,detailActive:flag}">

        </div>
        <div :class="{hideIcon:true,hideIconActive:flag}" @click="hideDetail">
            <img src="../../../static/img/hide.png" v-show="!flag">
            <img src="../../../static/img/show.png" v-show="flag">
        </div>
    </div>
</template>
<script>
import { http } from "../../api/api.js";
export default {
    data() {
        return {
            flag: true
        };
    },
    mounted() {
        this.renderMap();
        http.post("/api/monitorAllData").then(res => {
            
        });
    },
    methods: {
        renderMap() {
            let map = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 10,
                center: [113.23, 23.16],
                mapStyle: "amap://styles/blue"
            });
            //点标记
            let listData = [
                {
                    position: [113.23, 23.16],
                    address: "富力桃园",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.232, 23.15],
                    address: "富力桃园",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.24, 23.17],
                    address: "同德围",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.25, 23.17],
                    address: "广州站",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.26, 23.15],
                    address: "广州站",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.23, 23.16],
                    address: "松北工业园",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.28, 23.13],
                    address: "地点14",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.21, 23.13],
                    address: "广州白沙小学",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                },
                {
                    position: [113.18, 23.15],
                    address: "广州万科四季花城",
                    guanwang: "122.0",
                    water: "12.22",
                    yuliang: 1.01
                }
            ];
            var infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -30)
            });
            for (let i = 0; i < listData.length; i++) {
                let item = listData[i];
                let marker = new AMap.Marker({
                    position: item.position,
                    map: map,
                    title: "北京"
                });
                let content =
                    '<div style="background:#fff;position:relative;overflow: hidden;">' +
                    '<div style="height:30px;line-height:34px;margin-bottom: 3px;text-align:center;color:#666;font-size: 15px;border-bottom:1px solid #ccc">' +
                    item.address +
                    "</div>" +
                    '<div style="overflow:hidden;padding-bottom:10px;margin:0 auto">' +
                    '<div style="float:left;width:60px;height:60px">' +
                    '<img src="../static/img/city.png" style="width:100%;height:100%">' +
                    "</div>" +
                    '<div style="float:left;width:130px;margin-left:10px;line-height: 20px;">' +
                    '<div style="font-size: 13px;color: #666"><span>管网流量：</span><span>' +
                    item.guanwang +
                    "米</span></div>" +
                    '<div style="font-size: 13px;color: #666"><span>液位：</span><span>' +
                    item.water +
                    "米</span></div>" +
                    '<div style="font-size: 13px;color: #666"><span>雨量：</span><span>' +
                    item.yuliang +
                    "米</span></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                marker.content = content;
                marker.on("click", markerClick);
                marker.emit("click", { target: marker });
            }

            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            map.setFitView();
        },
        hideDetail() {
            this.flag = !this.flag;
        }
    }
};
</script>
<style lang="scss">
#homePage {
    height: 100%;
    width: 100%;
    #container {
        height: 100%;
    }
    .detail {
        position: absolute;
        top: 80px;
        right: 0px;
        bottom: 0px;
        width: 500px;
        border: 1px solid #666;
        background: #243b52;
        overflow: hidden;
        z-index: 120;
        transition: width 0.5s;
    }
    .detailActive {
        width: 0px;
        border: none;
    }
    .hideIcon {
        position: absolute;
        z-index: 120;
        top: 90px;
        right: 501px;
        width: 26px;
        height: 75px;
        transition: right 0.5s;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .hideIconActive {
        right: 0px;
    }
}
</style>
