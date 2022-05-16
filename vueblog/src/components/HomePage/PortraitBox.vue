<template>
    <div>
        <div id=MainBox @click="goToPersonalCenter()">
            <!--<div id=MainImg></div>-->
            <img :src="userImg" style="width:30px;height:30px;">
        </div>
        <div id=PersonalCenterBox>
            <p class=CommentBoxText @click="goToPersonalCenter()">个人中心</p>
        </div>
        <div id=CommentBox>
            <p class=CommentBoxText @click="logOut()">退出登录</p>
        </div>
        
    </div>
</template>


<script>
import {doge_base64} from "../../assets/js/functions";

    export default {
        name: "PortraitBox",
        data() {
            return {
                userImg: '',
            }
        },
        methods: {
            goToPersonalCenter : function(){
                //this.$store.commit('set_personal_center_host',localStorage.getItem("user_account"));
                //this.$router.push({name:'PersonalCenter'});
                this.$router.push({
                    name:'PersonalCenter',
　　                query: {
　　　　                host: localStorage.getItem("user_account"),
　　                }
                });
            },
            logOut : function(){
                this.$confirm('您确定要退出吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        localStorage.removeItem('user_account');
                        this.$router.push({name:'Login'});
                    }).catch(() => {});
            },
        },
        created(){
            this.userImg=doge_base64();
            //获取一些用户信息（头像）
            this.$axios
	                .post("api/user/getInformation",{
                        user_account: localStorage.getItem("user_account"),
		            })
	                .then(res=>{
                        this.userImg=res.data.user_img;
	                })
                    .catch(function (error) {
                        console.log("获取用户头像出错：\n"+error);
                    });
        }
    }
</script>
    

<style scoped>
    #MainBox
    {
        width: 30px;
        height: 30px;
        border: #d1d1d1;
        border-style: solid;
        border-radius: 2px;
        border-width: 1px;
        margin-top: 10px;
        background-color: rgb(199, 199, 199);
        cursor: pointer;
        float: left;
        margin-right: 20px;
    }
    #MainImg
    {
        width: 21px;
        height: 21px;
        margin-top: 5px;
        margin-left: 5px;
        background-size: 100% 100%;
        background-image: url("../../assets/icon/user.svg");
    }
    #CommentBox
    {
        width: 65px;
        height: 30px;
        margin-top: 6px;
        float: left;
        margin-left: 10px;
        padding-top: 9px;
    }
    #PersonalCenterBox
    {
        width: 60px;
        height: 30px;
        float: left;
        margin-top: 15px;
    }
    p.CommentBoxText
    {
        font-size: 14px;
        color: gray;
        float: left;
        user-select: none;
        cursor: pointer;
    }
    p.CommentBoxText:hover
    {
        color: green;
    }
    .item 
    {
        margin-top: 10px;
        margin-right: 10px;
    }

</style>