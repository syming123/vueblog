<template>
    <div id=PersonalCenterOneState v-if="ifshow">
        <div id=PersonalCenterOneStateMainBox>
            <p class=PersonalCenterOneStateTopText>{{stateMessage.state_title}}</p>
            <p class=PersonalCenterOneStateMiddleText>{{stateMessage.state_content}}</p>
            <div id=PersonalCenterOneStateEndBox>
                <p class=PersonalCenterOneStateEndText>{{stateMessage.state_publish_time}}</p>
                <el-link type="danger" :underline="false" style="float:right;" v-if="isMe()" @click="ifDelete()">删除</el-link>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "PersonalCenterMyState",
        props: {
            stateMessage: {
            type: [Object],
            },
        },
        data() {
            return {
                ifshow:true,
            };
        },
        methods: {
            isMe: function(){
                return this.$route.query.host==localStorage.getItem("user_account");
            },
            ifDelete: function(){
                this.$confirm('您确定要删除这条动态吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteState();
                }).catch(() => {});
            },
            deleteState: function(){
                this.$axios
	                .post("api/user/deleteDynamic",{
                        state_id:this.stateMessage.state_id,
                        user_accout:localStorage.getItem("user_account"),
		            })
	                .then(res=>{
                        var state=res.data.state;
                        if(state==1)
                        {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.ifshow=false;
                        }
                        else
                        {
                            this.$message.error('未知错误');
                        }
	                })
                    .catch(function (error) {
                        console.log("删除动态出错：\n"+error);
                    });
            }
        },
    }

</script>


<style scoped>
    #PersonalCenterOneState
    {
        width: 900px;
        height: auto;
        margin-top: 10px;
    }
    #PersonalCenterOneStateMainBox
    {
        width: 750px;
        height: auto;
        background-color: rgba(255, 235, 205, 0);
        margin-left: 50px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: gray;
        padding-left: 10px;
        padding-right: 10px;
    }
    p.PersonalCenterOneStateTopText
    {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        user-select: none;
        cursor: pointer;
    }
    p.PersonalCenterOneStateTopText:hover
    {
        opacity: 0.7;
    }
    p.PersonalCenterOneStateMiddleText
    {
        margin-top: 8px;
        font-size: 15px;
    }
    #PersonalCenterOneStateEndBox
    {
        width: 750px;
        height: 22px;
        margin-bottom: 10px;
        margin-top: 8px;
    }
    p.PersonalCenterOneStateEndText
    {
        font-size: 15px;
        color: gray;
        float: left;
    }


</style>