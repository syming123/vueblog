<template>
    <div id=CreationMainBox>
        <div id=CreationTopBox>
            <div id=CreationLeftBox>
                <p class=creationText1>开始您的创作</p>
                <p class=creationText2>发布您的博客，开始您的创作之旅吧</p>
            </div>
            <div id=CreationRightBox>
                <div id=CreationImg></div>
            </div>
        </div>
        <el-button type="primary" plain icon="el-icon-edit" style="width:235px;margin-top:20px" @click="creationOnclick()">开始创作</el-button>
    </div>
</template>


<script>
    export default {
        name: "SignInx",
        data() {
            return {

            }
        },
        methods: {
            creationOnclick : function(){
                this.$router.push({
                    name:'BlogEdit',
                    query: {
　　　　                article_id: 0,
　　                }
                });
            },
        },
    }
</script>
    

<style scoped>
    #CreationMainBox
    {
        width: 240px;
        padding-top: 30px;
        padding-left: 30px;
    }
    #CreationTopBox
    {
        width: 235px;
        height: 80px;
        background-color: rgba(233, 252, 242, 0.493);
    }
    #CreationLeftBox
    {
        width: 140px;
        height: 70px;
        float: left;
        padding-top: 10px;
        padding-left: 15px;
        padding-right: 10px;
    }
    #CreationRightBox
    {
        width: 70px;
        height: 80px;
        float: left;
    }
    p.creationText1
    {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 3px;
    }
    p.creationText2
    {
        font-size: 14px;
        color: gray;
    }
    #CreationImg
    {
        width: 45px;
        height: 45px;
        background-image: url("../../assets/icon/creation.svg");
        background-size: 100% 100%;
        margin-top: 18px;
        margin-left: 12px;
    }


</style>