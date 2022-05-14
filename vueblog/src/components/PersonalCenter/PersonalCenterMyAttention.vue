<template>
    <div id=PersonalCenterMyAttentionMainBox>
        <div id=PersonalCenterMyAttentionTopBox>
            <p class=PersonalCenterMyAttentionButtonText1 
            :class="{'PersonalCenterMyAttentionButtonText2' : selectOne==1,'PersonalCenterMyAttentionButtonText1' : selectOne==2}" 
            @click="selectChange(1)" style="margin-left:42px;">我关注的人</p>
            <p class=PersonalCenterMyAttentionButtonText1
            :class="{'PersonalCenterMyAttentionButtonText2' : selectOne==2,'PersonalCenterMyAttentionButtonText1' : selectOne==1}" 
            @click="selectChange(2)">关注我的人</p>
        </div>
        <!--<transition name="pageSwitch">-->
            <div v-if="selectOne==1">
                <div v-for="attention_message in all_attention" :key="attention_message.attention_account">
                    <personal-center-one-attention :attentionMessage="attention_message" :selected="1"></personal-center-one-attention>
                </div>
            </div>
        <!--</transition>
        <transition name="pageSwitch">-->
            <div v-if="selectOne==2">
                <div v-for="attention_message in all_attention" :key="attention_message.attention_account">
                    <personal-center-one-attention :attentionMessage="attention_message" :selected="2"></personal-center-one-attention>
                </div>
            </div>
        <!--</transition>-->
    </div>
</template>


<script>
import PersonalCenterOneAttention from './PersonalCenterOneAttention.vue'

import {doge_base64} from "../../assets/js/functions"

    export default {
        components: { 
            "personal-center-one-attention" : PersonalCenterOneAttention
        },
        name: "PersonalCenterMyAttention",
        props: {
            hostData: {
                type: [Object],
            },
        },
        data() {
            return {
                selectOne : 1,
                attention_number: 1,
                all_attention:[
                    {
                        attention_account: "attentioner account",
                        attention_name: "attentioner name1",
                        attention_info: "attentioner info",
                        attention_fans_number: 5,
                        attention_img: "",
                    },
                    {
                        attention_account: "attentioner account2",
                        attention_name: "attentioner name2",
                        attention_info: "attentioner info2",
                        attention_fans_number: 10,
                        attention_img: "",
                    },
                ],
            };
        },
        methods: {
            selectChange(index){
                this.selectOne=index;
                this.get_attentioner(index);
            },
            get_attentioner: function(askType){
                this.$axios
	                .post("api/getFocus",{
                        user_account: this.hostData.account,
                        ask_type: askType,
		            })
	                .then(res=>{
                        this.attention_number=res.data.attention_number;
                        this.all_attention=res.data.all_attention;
	                })
                    .catch(function (error) {
                        console.log("获取目标用户关注者"+askType+"出错：\n"+error);
                    });
            }
        },
        created(){
            this.all_attention[0].attention_img=doge_base64();
            this.get_attentioner(1);
        }
    }

</script>


<style scoped>
@import "../../assets/css/Animations.css";

    #PersonalCenterMyAttentionMainBox
    {
        position: absolute;
        width: 900px;
        height: auto;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #PersonalCenterMyAttentionTopBox
    {
        width: 900px;
        height: 50px;
        background-color: rgba(0, 128, 0, 0);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: rgb(223, 223, 223);
    }
    p.PersonalCenterMyAttentionButtonText1
    {
        font-size: 16px;
        float: left;
        user-select: none;
        cursor: pointer;
        margin-left: 20px;
        margin-top: 15px;
    }
    p.PersonalCenterMyAttentionButtonText1:hover
    {
        opacity: 0.7;
    }
    p.PersonalCenterMyAttentionButtonText2
    {
        font-size: 16px;
        font-weight: 600;
        float: left;
        user-select: none;
        cursor: pointer;
        margin-left: 20px;
        margin-top: 15px;
    }
    p.PersonalCenterMyAttentionButtonText2:hover
    {
        opacity: 1;
        cursor: auto;
    }

</style>