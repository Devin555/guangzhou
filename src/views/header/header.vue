<template>
    <div class="header">
        <span class="logo"><img src="../../../static/img/logo.png"> 广州市生物岛排水管网智慧化管理系统</span>
        <div class="rightControl">
            <span class="signOut" @click="signOut">退出</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "vheader",
    data() {
        return {};
    },
    methods: {
        signOut() {
            this.$confirm("确认退出系统吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    localStorage.removeItem("TOKEN");
                    this.$router.push({
                        path: "/"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消退出"
                    });
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
    width: 100%;
    height: 80px;
    background: #0c203b;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    .logo {
        display: inline-block;
        margin-left: 15px;
        width: 490px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        font-weight: 600;
        user-select: none;
        font-family: monospace;
        img {
            float: left;
            margin-top: 19px;
            margin-right: 6px;
        }
    }
    .rightControl {
        height: 80px;
        line-height: 80px;
        width: 30%;
        float: right;
        .signOut {
            display: inline-block;
            height: 80px;
            float: right;
            padding: 0 20px;
            color: #fff;
            cursor: default;
        }
    }
}
</style>
