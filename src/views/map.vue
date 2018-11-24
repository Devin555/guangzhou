<template>
    <div id="demomap">
        <!-- 头部 -->
        <div class="header">

        </div>
        <!-- 地图区 -->
        <div id="container" :class="{right:flag}">
        </div>
        <!-- 右侧数据区 -->
        <div :class="{showMessage:true,active:flag}">
            <!-- <div v-for="(item,index) in makers" :key="index">{{item.position}}---{{item.content}}</div> -->
            <table>
                <thead>
                    <tr>
                        <th>地点名称</th>
                        <th>经度</th>
                        <th>纬度</th>
                        <th>正常水位</th>
                        <th>日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in makers" :key="index">
                        <td>{{item.add}}</td>
                        <td>{{item.position.lat}}</td>
                        <td>{{item.position.lng}}</td>
                        <td>{{item.nomalWater}}</td>
                        <td>{{item.date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <span @click="hideMap" :class="{controlBtn:!flag,controlBtnRight:flag}">{{controlText}}</span>
    </div>
</template>
<script>
import { http } from "../api/api.js";
export default {
  data() {
    return {
      flag: false,
      controlText: "隐藏",
      makers: [],
      map: ""
    };
  },
  mounted() {
    this.getMap();
  },
  methods: {
    getMap() {
      // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
      let map = new AMap.Map("container", {
        resizeEnable: true, //自适应大小
        mapStyle: "amap://styles/blue",
        zoom: 10, //初始视窗
        center: [114.3, 30.6] //中心点
      });
      //   this.map = map;
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
      });

      http
        .get("/map/message")
        .then(data => {
          this.makers = data.data;
          let makers = data.data;
          for (var i = 0; i < makers.length; i++) {
            let marker = new AMap.Marker(makers[i]);
            marker.setMap(map);
            marker.on("click", onMarkerClick);
          }
        })
        .catch(error => {
          console.log(error);
        });

      var onMarkerClick = function(e) {
        var infoWindow = new AMap.InfoWindow({
          //创建信息窗体
          isCustom: true, //使用自定义窗体
          content:
            "<div class='windownTips'>" +
            "<h3 id='clickOff'>" +
            e.target.Ch.add +
            "</h3>" +
            "<div class='address'>经度：" +
            e.target.Ch.position.lng +
            "&nbsp;&nbsp;&nbsp;纬度：" +
            e.target.Ch.position.lat +
            "</div>" +
            "<div class='normalWater'>正常水位：" +
            e.target.Ch.nomalWater +
            "</div>" +
            "</div>",
          //信息窗体的内容可以是任意html片段
          offset: new AMap.Pixel(10, -35)
        });
        infoWindow.open(map, e.target.getPosition()); //打开信息窗体
      };
    },
    hideMap() {
      this.flag = !this.flag;
      if (this.flag) {
        this.controlText = "展开";
      } else {
        this.controlText = "隐藏";
      }
    }
  }
};
</script>
<style lang="scss">
#demomap {
  .header {
    height: 80px;
    background: #243b52;
  }

  #container {
    position: absolute;
    top: 80px;
    left: 0;
    right: 800px;
    bottom: 0;
    overflow: hidden;
  }
  .right {
    right: 0 !important;
  }
  .showMessage {
    border: 1px solid #666;
    position: absolute;
    width: 800px;
    top: 80px;
    right: 0;
    bottom: 0;
    background: #243b52;
    // transition-property: width 0.5s linear 0s;
    // /* Firefox 4 */
    // -moz-transition: width 0.5s linear 0s;
    // /* Safari and Chrome */
    // -webkit-transition: width 0.5s linear 0s;
    // /* Opera */
    // -o-transition: width 0.5s linear 0s;
  }
  .active {
    display: none;
    // width: 0;
  }
  .controlBtn {
    background: #0c253f;
    color: #ffffff;
    position: absolute;
    top: 80px;
    right: 0;
    display: inline-block;
    width: 22px;
    font-size: 10px;
    height: 55px;
    line-height: 21px;
    padding-top: 17px;
    padding-left: 5px;
    position: absolute;
    top: 85px;
    right: 800px;

    transition-property: width 1s linear 0s;
    /* Firefox 4 */
    -moz-transition: width 1s linear 0s;
    /* Safari and Chrome */
    -webkit-transition: width 1s linear 0s;
    /* Opera */
    -o-transition: width 1s linear 0s;
  }
  .controlBtnRight {
    background: #0c253f;
    color: #ffffff;
    position: absolute;
    top: 85px;
    right: 0;
    display: inline-block;
    width: 22px;
    font-size: 10px;
    height: 55px;
    line-height: 21px;
    padding-top: 17px;
    padding-left: 5px;
  }
  .windownTips {
    border: 1px solid #cccccc;
    width: 200px;
    height: 100px;
    background: #ffffff;
    padding: 10px;
  }
  .windownTips h3 {
    padding: 0;
    margin: 0;
    font-size: 15px;
  }
  .windownTips .address {
    font-size: 13px;
  }
  .windownTips .normalWater {
    font-size: 13px;
  }
}
</style>
