<template>
  <div id="gmap">
        <div class="header">

        </div>
        <div class="amap-page-container">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" :mapStyle="mapStyle" class="amap-demo" :plugin="plugin">
            <el-amap-info-window  :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
            <el-amap-marker v-for="(marker,index) in makers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :key="index"></el-amap-marker>

        </el-amap>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: "",
      center: [121.5273285, 31.21515044],
      mapStyle: "amap://styles/blue",
      plugin: [
        {
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ],
      makers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: e => {
              this.mywindow.position = [];
              this.mywindow.position.push(e.lnglat.lng);
              this.mywindow.position.push(e.lnglat.lat);
              this.mywindow.visible = true;
            }
          },
          visible: true,
          draggable: false
        },
        {
          position: [121.4, 31.33],
          events: {
            click: e => {
              this.mywindow.position = [];
              this.mywindow.position.push(e.lnglat.lng);
              this.mywindow.position.push(e.lnglat.lat);
              this.mywindow.visible = true;
            }
          },
          visible: true,
          draggable: false
        }
      ],
      mywindow: {
        position: [121.2, 31.0],
        content:
          '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
        visible: false,
        events: {
          //   close() {
          //     // console.log(this.mywindow);
          //     this.mywindow.visible = false;
          //   }
        }
      }
    };
  },
  mounted() {
    this.zoom = 10;
  }
};
</script>

<style lang="scss">
#gmap {
  .header {
    height: 80px;
    background: #243b52;
  }
  .amap-page-container {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid red;
  }
}
</style>