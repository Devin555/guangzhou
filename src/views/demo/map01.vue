<template>
  <div id="map">
    <div class="header">
      <div class="logo">
        <img src="../../static/img/logo.png" alt="" srcset=""> 东湖高新区智慧水务系统
      </div>
      <div class="meather">
        <div class="address">
          <p class="topadd">{{meatherData.address}}</p>
          <p>七日天气</p>
        </div>
        <div class="pic">
          <img src="../../static/img/tq.png">
        </div>
        <div class="address">
          <p class="topadd">今天</p>
          <p>{{meatherData.todayTemperature}}</p>
        </div>
        <div class="pic">
          <img src="../../static/img/tq.png">
        </div>
        <div class="address">
          <p class="topadd">明天</p>
          <p>{{meatherData.tomorowTemperature}}</p>
        </div>
      </div>
    </div>
    <div :class="{amapWrapper:true,amapWrapperActive:!flag}">
      <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :mapStyle="mapStyle" :plugin="plugin">
        <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :events="marker.events" :icon="marker.icon" :key="index"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
      </el-amap>
    </div>
    <div :class="{amapContent:true,amapContentActive:!flag}">
      <div class="messageTable">
        <h3>监测点信息</h3>
        <div class="tableTop">
          <p class="title">水库</p>
          <p class="title">长江</p>
          <p class="title">易渍水点</p>
          <p class="title">涵闸</p>
          <p class="title">政务中心</p>
        </div>
        <div class="allMessage">
          <div id="slide" class="eachMessage">
            <div id="slide1">
              <div class="detail" v-for="(item,index) in dataList.sk" :key="index">
                <h5>{{item.add}}</h5>
                <p>实时水位：{{item.sssw}}</p>
                <p>正常水位：{{item.zcsw}}</p>
                <p>总库容：{{item.zkr}}</p>
                <p>雨量：{{item.yl}}</p>
                <p>监测时间：{{item.date}}</p>
              </div>
            </div>
            <div id="slide2"></div>
          </div>
          <div id="slide_cj" class="eachMessage">
            <div id="slide1_cj">
              <div class="detail" v-for="(item,index) in dataList.cj" :key="index">
                <h5>{{item.add}}</h5>
                <p>实时水位：{{item.sssw}}</p>
                <p>设防水位：{{item.sfsw}}</p>
                <p>警戒水位：{{item.jjsw}}</p>
                <p>保证水位：{{item.bzsw}}</p>
                <p>监测时间：{{item.date}}</p>
              </div>
            </div>
            <div id="slide2_cj"></div>
          </div>
          <div id="slide_yzsd" class="eachMessage">
            <div id="slide1_yzsd">
              <div class="detail" v-for="(item,index) in dataList.yzsd" :key="index">
                <h5>{{item.add}}</h5>
                <p>实时水位：{{item.sw}}</p>
                <p>监测时间：{{item.date}}</p>
              </div>
            </div>
            <div id="slide2_yzsd"></div>
          </div>
          <div id="slide" class="eachMessage">
            <div id="slide1">
              <div class="detail" v-for="(item,index) in dataList.hz" :key="index">
                <h5>{{item.add}}</h5>
                <p>内水位：{{item.nsw}}</p>
                <p>外常水位：{{item.wsw}}</p>
              </div>
            </div>
            <div id="slide2"></div>
          </div>
          <div id="slide" class="eachMessage">
            <div id="slide1">
              <div class="detail" v-for="(item,index) in dataList.zwzx" :key="index">
                <h5>{{item.add}}</h5>
                <p>实时雨量：{{item.ssyl}}</p>
                <p>半小时雨量：{{item.bxsyl}}</p>
                <p>日雨量：{{item.ryl}}</p>
              </div>
            </div>
            <div id="slide2"></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <h3>报警预警信息</h3>
        <div class="warnMessage">
        </div>
      </div>
      <div class="botton">
        <h3>四水共治</h3>
        <div class="warnMessage">
  
        </div>
      </div>
    </div>
    <span :class="{controlBtn:true,controlBtnActive:!flag}" @click="controlBtn">
              <img :src="imgUrl">
          </span>
  </div>
</template>

<script>
import { http } from "../api/api.js";
export default {
  data() {
    return {
      flag: true,
      imgUrl: "../../static/img/hide.png",
      dataList: "",
      zoom: 10,
      mapStyle: "amap://styles/blue",
      center: [114.31, 30.52],
      plugin: ["ToolBar"],
      markers: [],
      windows: [],
      window: "",
      //天气
      meatherData: {}
    };
  },
  mounted() {
    this.getData();
    this.getMeather();
    this.scroll();
  },
  methods: {
    scroll() {
      var speed = 100;
      // 水库
      var slide = document.getElementById("slide");
      var slide2 = document.getElementById("slide2");
      var slide1 = document.getElementById("slide1");
      slide2.innerHTML = slide1.innerHTML;

      function Marquee() {
        if (slide1.offsetHeight - slide.scrollTop <= slide.offsetHeight) {
          slide.scrollTop -= slide1.offsetHeight;
        } else {
          slide.scrollTop++;
        }
      }
      var MyMar = setInterval(Marquee, speed);
      slide.onmouseover = function(e) {
        clearInterval(MyMar);
      };
      slide.onmouseout = function() {
        MyMar = setInterval(Marquee, speed);
      };
      // 长江
      var slide_cj = document.getElementById("slide_cj");
      var slide2_cj = document.getElementById("slide2_cj");
      var slide1_cj = document.getElementById("slide1_cj");
      slide2_cj.innerHTML = slide1_cj.innerHTML;

      function Marquee_cj() {
        if (
          slide1_cj.offsetHeight - slide_cj.scrollTop <=
          slide_cj.offsetHeight
        ) {
          slide_cj.scrollTop -= slide1_cj.offsetHeight;
        } else {
          slide_cj.scrollTop++;
        }
      }
      var MyMar_cj = setInterval(Marquee_cj, speed);
      slide_cj.onmouseover = function(e) {
        clearInterval(MyMar_cj);
      };
      slide_cj.onmouseout = function() {
        MyMar_cj = setInterval(Marquee_cj, speed);
      };
      //易渍水点
      var slide_yzsd = document.getElementById("slide_yzsd");
      var slide2_yzsd = document.getElementById("slide2_yzsd");
      var slide1_yzsd = document.getElementById("slide1_yzsd");
      slide2_yzsd.innerHTML = slide1_yzsd.innerHTML;

      function Marquee_yzsd() {
        if (
          slide1_yzsd.offsetHeight - slide_yzsd.scrollTop <=
          slide_yzsd.offsetHeight
        ) {
          slide_yzsd.scrollTop -= slide1_yzsd.offsetHeight;
        } else {
          slide_yzsd.scrollTop++;
        }
      }
      var MyMar_yzsd = setInterval(Marquee_yzsd, speed);
      slide_yzsd.onmouseover = function(e) {
        clearInterval(MyMar_yzsd);
      };
      slide_yzsd.onmouseout = function() {
        MyMar_yzsd = setInterval(Marquee_yzsd, speed);
      };
    },
    controlBtn() {
      this.flag = !this.flag;
      if (this.flag) {
        this.imgUrl = "../../static/img/hide.png";
      } else {
        this.imgUrl = "../../static/img/show.png";
      }
    },
    // 天气数据
    getMeather() {
      http.get("/meather/message").then(data => {
        this.meatherData = data.data;
      });
    },
    // 地图数据
    getData() {
      http
        .get("/map/message")
        .then(data => {
          this.dataList = data.data;
          let markers = [];
          let windows = [];
          let self = this;
          for (let i = 0; i < data.data.sk.length; i++) {
            markers.push({
              position: data.data.sk[i].position,
              events: {
                click() {
                  self.windows.forEach(window => {
                    window.visible = false;
                  });
                  self.window = self.windows[i];
                  self.$nextTick(() => {
                    self.window.visible = true;
                  });
                }
              }
              // icon: new AMap.Icon({
              //   size: new AMap.Size(80, 60), //图标大小
              //   image: data.data.sk[0].image,
              //   imageOffset: new AMap.Pixel(0, 0)
              // })
            });

            windows.push({
              position: data.data.sk[i].position,
              content:
                '<div class="prompt">' +
                '<div class="title">详细信息' +
                "</div>" +
                '<div class="allCont" style="margin-top:15px"><span class="leftCont">水库位置：</span><span class="rightCont">' +
                data.data.sk[i].add +
                "</span></div>" +
                '<div class="allCont"><span class="leftCont">实时水位:</span><span class="rightCont">' +
                data.data.sk[i].sssw +
                "</span></div>" +
                '<div class="allCont"><span class="leftCont">正常水位:</span><span class="rightCont">' +
                data.data.sk[i].zcsw +
                "</span></div>" +
                '<div class="allCont"><span class="leftCont">总库容:</span><span class="rightCont">' +
                data.data.sk[i].zkr +
                "</span></div>" +
                '<div class="allCont"><span class="leftCont">雨量:</span><span class="rightCont">' +
                data.data.sk[i].yl +
                "</span></div>" +
                '<div class="allCont"><span class="leftCont">监测时间:</span><span class="rightCont">' +
                data.data.sk[i].date +
                "</span></div>" +
                "</div>",
              visible: false
            });
          }
          this.markers = markers;
          this.windows = windows;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
#map {
  .amap-info-content,
  .amap-info-outer,
  .amap-menu-outer {
    padding: 0;
    border-radius: 5px;
  }
  .prompt {
    width: 280px;
    height: 180px;
    .title {
      width: 100%;
      padding-left: 10px;
      height: 25px;
      line-height: 25px;
      background: #444444;
      color: #ffffff;
      font-size: 14px;
      box-sizing: border-box;
    }
    .allCont {
      font-size: 13px;
      height: 21px;
      line-height: 21px;
      padding-left: 20px;
      .leftCont {
        color: #999;
        display: inline-block;
        width: 80px;
        margin-right: 10px;
      }
      .rightCont {
        color: #666;
      }
    }
  }
  .header {
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #ffffff;
    background: #243b52;
    padding-left: 30px;
    user-select: none;
    .logo {
      float: left;
      img {
        float: left;
        margin: 21px 12px 0 0;
      }
    }
    .meather {
      height: 80px;
      line-height: 21px;
      font-size: 13px;
      width: 350px;
      float: right;
      padding-top: 19px;
      box-sizing: border-box;
      .address {
        width: 80px;
        float: left;
        p {
          height: 21px;
          display: inline-block;
          width: 80px;
        }
        .topadd {
          font-weight: bold;
        }
      }
      .pic {
        width: 50px;
        float: left;
      }
    }
  }
  .amapWrapper {
    position: absolute;
    top: 80px;
    left: 0px;
    right: 800px;
    bottom: 0px;
    transition: right 1s;
    -moz-transition: right 1s;
    /* Firefox 4 */
    -webkit-transition: right 1s;
    /* Safari and Chrome */
    -o-transition: right 1s;
    /* Opera */
  }
  .amapWrapperActive {
    right: 0px;
  }
  .amapContent {
    position: absolute;
    width: 800px;
    top: 80px;
    right: 0px;
    bottom: 0px;
    background: #243b52;
    border: 1px solid #333;
    padding: 10px;
    box-sizing: border-box;
    // 过渡
    transition: width 1s;
    -moz-transition: width 1s;
    /* Firefox 4 */
    -webkit-transition: width 1s;
    /* Safari and Chrome */
    -o-transition: width 1s;
    /* Opera */
    overflow: hidden; //不加会出现横向滚动条
    .messageTable {
      border: 1px solid #0d75d8;
      height: 58%;
      border-radius: 10px;
      background: #535152;
      h3 {
        color: #ffffff;
        height: 6%;
        line-height: 1.5rem;
        padding-left: 10px;
        font-weight: normal;
        font-size: 17px;
      }
      .tableTop {
        border: 1px solid #0b94b8;
        border-bottom: none;
        overflow: hidden;
        width: 760px;
        margin: 0 6px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .title {
          width: 151px;
          border-right: 1px solid #0b94b8;
          float: left;
          color: #0b94b8;
          font-weight: 900;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .title:last-child {
          border: none;
        }
      }
      .allMessage {
        margin: 0 6px;
        width: 760px;
        background: #333639;
        height: 84%;
        border: 1px solid #0b94b8;
        overflow: hidden;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .eachMessage {
          // position: absolute;
          overflow: hidden;
          height: 102%;
          border-right: 1px solid #0b94b8;
          width: 151px;
          float: left;
          .detail {
            border-bottom: 1px solid #0b94b8;
            padding-bottom: 5px;
            padding-left: 5px;
            h5 {
              text-align: center;
              color: #ffffff;
              padding: 2px 0;
            }
            p {
              color: #ffffff;
              border: none;
              height: 16px;
              line-height: 16px;
              font-size: 8px;
              text-align: left;
              font-weight: normal;
            }
          }
        }
        .eachMessage:last-child {
          border: none;
          flex-grow: 1;
        }
      }
    }
    .middle {
      border: 1px solid #0d75d8;
      height: 20%;
      margin: 1% 0;
      border-radius: 10px;
      background: #535152;
      box-sizing: border-box;
      h3 {
        color: #ffffff;
        height: 17%;
        line-height: 1.5rem;
        padding-left: 10px;
        font-weight: normal;
        font-size: 17px;
      }
      .warnMessage {
        margin: 0 6px;
        background: #333639;
        height: 78%;
        border: 1px solid #0b94b8;
        border-radius: 10px;
      }
    }
    .botton {
      border: 1px solid #0d75d8;
      height: 20%;
      border-radius: 10px;
      background: #535152;
      h3 {
        color: #ffffff;
        height: 17%;
        line-height: 1.5rem;
        padding-left: 10px;
        font-weight: normal;
        font-size: 17px;
      }
      .warnMessage {
        margin: 0 6px;
        background: #333639;
        height: 78%;
        border: 1px solid #0b94b8;
        border-radius: 10px;
      }
    }
  }
  .amapContentActive {
    padding: 0px;
    width: 0px;
    overflow: hidden;
  }
  .controlBtn {
    position: absolute;
    top: 85px;
    right: 800px;
    cursor: default;
    transition: right 1s;
    -moz-transition: right 1s;
    /* Firefox 4 */
    -webkit-transition: right 1s;
    /* Safari and Chrome */
    -o-transition: right 1s;
    /* Opera */
  }
  .controlBtnActive {
    right: 0px;
  }
}
</style>