<template>
    <div id=PersonalCenterOneAttention v-if="ifshow">
        <div id=PersonalCenterOneAttentionMainBox>
            <div id=PersonalCenterOneAttentionLeftBox>
                <!--<div id=PersonalCenterOneAttentionImg></div>-->
                <img :src="attentionMessage.attention_img" style="width:80px;height:80px;">
            </div>
            <div id=PersonalCenterOneAttentionMiddleBox>
                <p class=PersonalCenterOneAttentionText1 @click="visitHe()">{{attentionMessage.attention_name}}</p>
                <p class=PersonalCenterOneAttentionText2>{{attentionMessage.attention_info}}</p>
                <p class=PersonalCenterOneAttentionText2 style="font-size:16px;color:black;">{{attentionMessage.attention_fans_number}} 关注者</p>
            </div>
            <div id=PersonalCenterOneAttentionRightBox>
                <el-button type="danger" v-if="isMe()&&selected==1" @click="ifDelete()">取消关注</el-button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "PersonalCenterOneAttention",
        props: {
            attentionMessage: {
                type: [Object],
            },
            selected: {
                type: Number,
            }
        },
        data() {
            return {
                ifshow: true,
                thisMan_img: "",
            };
        },
        methods: {
            isMe: function(){
                return this.$route.query.host==localStorage.getItem("user_account");
            },
            ifDelete: function(){
                this.$confirm('您确定要取消对他的关注吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteAttention();
                }).catch(() => {});
            },
            deleteAttention: function(){
                this.$axios
	                .post("api/user/cancelConcern",{
                        user_account: localStorage.getItem("user_account"),
                        attention_account: this.attentionMessage.attention_account,
		            })
	                .then(res=>{
                        var state=res.data.state;
                        if(state==1)
                        {
                            this.$message({
                                message: '取消关注成功',
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
                        console.log("取消关注出错：\n"+error);
                    });
            },
            visitHe: function(){
                this.$router.push({
                    name:'PersonalCenter',
                    query: {
　　　　                host: this.attentionMessage.attention_account,
　　                }
                });
                this.$router.go(0);
            }
        },
        created(){
            //console.log(this.attentionMessage.attention_img);
        }
    }

</script>


<style scoped>
    #PersonalCenterOneAttention
    {
        width: 900px;
        height: 100px;
        margin-top: 10px;
    }
    #PersonalCenterOneAttentionMainBox
    {
        width: 800px;
        height: 100px;
        margin-left: 50px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: gray;
    }
    #PersonalCenterOneAttentionLeftBox
    {
        width: 100px;
        height: 90px;
        padding-top: 10px;
        float: left;
    }
    #PersonalCenterOneAttentionImg
    {
        width: 80px;
        height: 80px;
        margin-left: 10px;
        background-image: url("../../assets/icon/user.svg");
        background-size: 100% 100%;
        border-radius: 5px;
    }
    #PersonalCenterOneAttentionMiddleBox
    {
        width: 480px;
        height: 80px;
        float: left;
        padding-top: 10px;
        padding-left: 20px;
    }
    #PersonalCenterOneAttentionRightBox
    {
        width: 150px;
        height: 50px;
        float: left;
        padding-left: 50px;
        padding-top: 25px;
    }
    p.PersonalCenterOneAttentionText1
    {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        user-select: none;
        cursor: pointer;
    }
    p.PersonalCenterOneAttentionText2
    {
        font-size: 15px;
        color: gray;
    }


</style>