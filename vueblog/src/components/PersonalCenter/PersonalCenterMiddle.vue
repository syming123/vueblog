<template>
    <div>
        <div id=PersonalCenterMiddleMainBox>
            <div id=PersonalCenterMiddleTopBar>
                <div id=PersonalCenterMiddleBackToHome>
                    <el-link :underline="false" icon="el-icon-back" style="font-size:18px;" @click="goToHomePage()">返回主页</el-link>
                </div>
                <div id=PersonalCenterMiddleSelectBox>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="changePage" 
                     style="">
                        <el-menu-item index="1">{{IandHe[isMe]}}的动态</el-menu-item>
                        <el-menu-item index="2">{{IandHe[isMe]}}的关注</el-menu-item>
                        <!--<el-menu-item index="3">最新评论</el-menu-item>-->
                    </el-menu>
                </div>
            </div>
            <transition name="pageSwitch">
                <personal-center-my-state v-if="activeIndex==1" :hostData="centerData"></personal-center-my-state>
            </transition>
            <transition name="pageSwitch">
                <personal-center-my-attention v-if="activeIndex==2" :hostData="centerData"></personal-center-my-attention>
            </transition>
            <!--<transition name="pageSwitch">
                <personal-center-my-comment v-if="activeIndex==3" :hostData="centerData"></personal-center-my-comment>
            </transition>-->
        </div>
    </div>
</template>


<script>
import PersonalCenterMyAttention from './PersonalCenterMyAttention.vue'
import PersonalCenterMyState from './PersonalCenterMyState.vue'
import PersonalCenterMyComment from './PersonalCenterMyComment.vue'

    export default {
        components: { 
            "personal-center-my-attention" : PersonalCenterMyAttention,
            "personal-center-my-state" : PersonalCenterMyState,
            "personal-center-my-comment" : PersonalCenterMyComment,
        },
        name: "PersonalCenterMiddle",
        props: {
            centerData: {
            type: [Object],
            },
        },
        data() {
            return {
                activeIndex: '1',
                isMe: 0,//0是别人，1是自己
                IandHe: ["他","我"],
            };
        },
        methods: {
            changePage(index){
                this.activeIndex=index;
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            goToHomePage: function(){
                this.$router.push({name:'HomePage'});
            }
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
    #PersonalCenterMiddleMainBox
    {
        width: 900px;
        height: auto;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #PersonalCenterMiddleTopBar
    {
        width: 900px;
        height: 70px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: rgb(233, 233, 233);
    }
    #PersonalCenterMiddleBackToHome
    {
        width: 120px;
        height: 34px;
        float: left;
        padding-left: 20px;
        padding-top: 6px;
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: gray;
        margin-top: 20px;
    }
    #PersonalCenterMiddleSelectBox
    {
        width: 700px;
        height: 60px;
        float: left;
        margin-top: 10px;
        margin-left: 20px;
    }
    #PersonalCenterMiddleBottom
    {
        width: 900px;
        height: 50px;
        background-color: gray;
    }


</style>