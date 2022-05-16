<template>
    <div id=SignInMainBox>
        <p class=calendarText style="font-size:18px;margin-left:0px;text-align:center;margin-bottom:20px;">每日签到</p>
        <div id=CalendarMainBox>
            <div id=CalendarLeftBox>
                <div id=CalendarImg></div>
            </div>
            <div id=CalenderRightBox>
                <p class=calendarText style="margin-top:7px;font-weight:400;">今天是：</p>
                <p class=calendarText>{{this.Date}}</p>
            </div>
            <el-button type="primary" plain icon="el-icon-coin" style="width:235px;margin-top:15px" @click="signIn">立即签到</el-button>
        </div>
    </div>
</template>


<script>
    export default {
        name: "SignInx",
        data() {
            return {
                Date: "9999年99月99日",
            }
        },
        methods: {
            getNowDate: function(){
                var nowDate=new Date();
                this.Date=nowDate.getFullYear()+"年"+(nowDate.getMonth()+1)+"月"+nowDate.getDate()+"日";
            },
            signIn: function(){
                this.$axios
                    .post("api/user/sign",{
                        user_account: localStorage.getItem("user_account"),
		            })
	                .then(res=>{
		                var state=res.data.state;
                        if(state==1)
                        {
                            this.$message({
                                message: '签到成功',
                                type: 'success'
                            });
                        }
                        else if(state==-1)
                        {
                            this.$message.error('您今天已经签到过了');
                        }
                        else
                        {
                            this.$message.error('未知错误');
                        }
	                })
                    .catch(function (error) {
                        console.log("签到出现错误：\n"+error);
                    });
            }
        },
        created(){
            this.getNowDate();
        }
    }
</script>
    

<style scoped>
    #SignInMainBox
    {
        width: 240px;
        padding-top: 10px;
        padding-left: 30px;

    }
    #CalendarMainBox
    {
        width: 235px;
        height: 60px;
        background-color: rgba(168, 248, 148, 0.384);
        
    }
    #CalendarLeftBox
    {
        width: 50px;
        height: 50px;
        background-color: #67C23A;
        padding-top: 10px;
        padding-left: 10px;
        float: left;
    }
    #CalendarImg
    {
        width: 40px;
        height: 40px;
        background-image: url("../../assets/icon/calendar.svg");
        background-size: 100% 100%;
    }
    #CalenderRightBox
    {
        width: 160px;
        height: 60px;
        float: left;
    }
    p.calendarText
    {
        font-size: 15px;
        font-weight: 600;
        margin-left: 15px;
        margin-top: 5px;
        letter-spacing: 1px;
    }


</style>