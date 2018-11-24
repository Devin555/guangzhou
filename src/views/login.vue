<template>
    <dir id="login">
        <div class="loginBox">
            <h1>后台登录管理系统</h1>
            <input id="username" type="text" v-model="username" placeholder="请输入账号">
            <input id="password" type="password" v-model="password" placeholder="请输入密码">
            <div class="loginBtn" @click="login">登录</div>
        </div>
    </dir>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
            localStorage.setItem("TOKEN", true);
            this.$router.push({
                path: "/main/homePage"
            });
        }
    }
};
</script>
<style lang="scss">
#login {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
    background: url("../../static/img/login.png") no-repeat center;
    background-size: 100% 100%;
    .loginBox {
        width: 380px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -130px;
        margin-left: -190px;
        background: #ffffff;
        h1 {
            background: #1e243c;
            height: 35px;
            font-size: 17px;
            line-height: 35px;
            color: #ffffff;
            font-weight: normal;
            text-align: center;
            margin: 0;
        }
        #username,
        #password {
            border: none;
            outline: none;
            border: 1px solid #cccccc;
            width: 80%;
            height: 30px;
            margin-left: 29px;
            margin-top: 25px;
            padding: 10px 10px;
            box-sizing: border-box;
            color: #333;
        }
        .loginBtn {
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #ffffff;
            width: 80%;
            margin: 0 auto;
            background: #009acd;
            border-radius: 3px;
            margin: 30px 29px;
            cursor: pointer;
        }
    }
}
</style>
