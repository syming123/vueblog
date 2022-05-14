<template>
    <div>
        <div id=PersonalCenterTopMainBox>
            <div id=PersonalTopTop></div>
            <div id=PersonTopLeft>
                <div id=PersonalTopImgBox>
                    <!--<div id=PersonalTopImg></div>-->
                    <img :src="centerData.img" style="width:100px;height:100px;">
                </div>
            </div>
            <div id=PersonTopRight>
                <div id=PersonalTopTextBox>
                    <p class=PersonalTopText1>{{centerData.name}}</p>
                </div>
                <div id=PersonalTopTextBox style="width:260px;margin-top:5px;">
                    <i class="el-icon-coin" style="float:left;margin-top:4px;margin-right:3px;"></i>
                    <p style="color:gray;">积分：{{centerData.score}}</p>
                </div>
                <p class=PersonalTopText2>个人简介：{{centerData.info}}</p>
            </div>
            <div id=PersonalTopButtonBox>
                <el-button v-if="isMe==1" type="primary" plain icon="el-icon-edit-outline" @click="goToEditPersonalInfo()">编辑资料</el-button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "PersonalCenterTop",
        props: {
            centerData: {
            type: [Object],
            },
        },
        data() {
            return{
                isMe: 0,//0是别人，1是自己
            }
        },
        methods: {
            goToEditPersonalInfo: function(){
                this.$router.push({name:'EditPersonalInfo'});
            },

        },
        created(){
            if(this.centerData.account==localStorage.getItem("user_account"))
            {
                this.isMe=1;
            }
            else
            {
                this.isMe=0;
            }
        }
    }
</script>


<style scoped>
    #PersonalCenterTopMainBox
    {
        width: 900px;
        height: 200px;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #PersonalTopTop
    {
        width: 900px;
        height: 80px;
        background-color: rgba(0, 255, 13, 0.075);
        position: absolute;
        z-index: 0;
    }
    #PersonTopLeft
    {
        width: 160px;
        height: 180px;
        background-color: rgba(255, 255, 0, 0);
        position: relative;
        z-index: 1;
        padding-top: 20px;
        padding-left: 50px;
        float: left;
    }
    #PersonalTopImgBox
    {
        width: 100px;
        height: 100px;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
    }
    #PersonalTopImg
    {
        width: 100px;
        height: 100px;
        background-image: url("../../assets/icon/user.svg");
        background-size: 100% 100%;
        border-radius: 8px;
    }
    #PersonTopRight
    {
        width: 450px;
        height: 160px;
        background-color: rgba(172, 255, 47, 0);
        float: left;
        padding-top: 40px;
    }
    p.PersonalTopText1
    {
        font-size: 22px;
        font-weight: 600;
    }
    p.PersonalTopText2
    {
        font-size: 15px;
        color: grey;
        margin-top: 25px;
        letter-spacing: 1px;
    }
    #PersonalTopTextBox
    {
        height: 30px;
        width: 180px;
        float: left;
        margin-bottom: 20px;
    }
    #PersonalTopButtonBox
    {
        width: 150px;
        height: 100px;
        background-color: rgba(128, 128, 128, 0);
        float: left;
        padding-left: 70px;
        padding-top: 94px;
    }


</style>