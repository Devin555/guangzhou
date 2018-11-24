<template>
 <div class="bscroll" ref="bscroll">
    <div class="bscroll-container">
        <p>a</p>
        <p>2</p>
        <p>b3</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
    </div>
</div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      msg: "asd"
    };
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDom = this.$refs.bscroll;
      this.aBScroll = new BScroll(bscrollDom, {});
    });
  }
};
</script>
<style type="text/css">
.bscroll {
  width: 100%;
  height: 5vh;
  overflow: hidden;
}
</style>