<template>
    <div id=BackgroundBox>
        <div id=MainBox>
            <div id=LoginLeftMain>
                <p class=LoginMainText1>欢迎使用</p>
                <p class=LoginMainText2>SCY博客系统</p>
                <p class=LoginMainText2 style="margin-top:60px;">请登录或注册</p>
            </div>
            <div id=LoginMain>
                <login-main-box></login-main-box>
            </div>
        </div>
    </div>
</template>


<script>
import LoginMainBox from '../components/Login/LoginMainBox.vue'

    export default {
        components: { 
            "login-main-box" : LoginMainBox,
        },
        name: "Login"
    }
</script>


<style scoped>
    #BackgroundBox
    {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 128, 0, 0.068);
        position: absolute;
        z-index: -1;
    }
    #MainBox
    {
        width: 740px;
        height: 470px;
        background-color: white;
        margin: auto;
        margin-top: 100px;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #LoginMain
    {
        width: 400px;
        height: 470px;
        background-color: rgb(255, 255, 255);
        float: left;
    }
    #LoginLeftMain
    {
        width: 280px;
        height: 470px;
        background-color: rgb(46, 161, 46);
        float: left;
        box-shadow: 1px 1px 3px 1px rgb(145, 145, 145);
        position: relative;
        z-index: 1;
    }
    p.LoginMainText1
    {
        font-size: 30px;
        color: white;
        letter-spacing: 1px;
        margin-top: 100px;
        margin-left: 50px;
        user-select: none;
    }
    p.LoginMainText2
    {
        font-size: 18px;
        color: white;
        letter-spacing: 1px;
        margin-top: 20px;
        margin-left: 50px;
        user-select: none;
    }

</style>