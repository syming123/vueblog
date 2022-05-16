<template>
    <div id=PersonalCenterMyStateMainBox>
        <div v-for="state_message in all_state" :key="state_message.state_id">
            <personal-center-one-state :stateMessage="state_message"></personal-center-one-state>
        </div>
    </div>
</template>


<script>
import PersonalCenterOneState from './PersonalCenterOneState.vue'

    export default {
        components: { 
            "personal-center-one-state" : PersonalCenterOneState,
        },
        name: "PersonalCenterMyState",
        props: {
            hostData: {
            type: [Object],
            },
        },
        data() {
            return {
                state_number: 0,
                all_state: [
                    {
                        state_id: 1,
                        state_title: "这是动态标题",
                        state_content: "这是动态内容",
                        state_publish_time: "2021-11-11",
                    },
                ]
            };
        },
        methods: {
            
        },
        created(){
            this.$axios
	                .post("api/usr/dynamy",{
                        user_account: this.hostData.account,
		            })
	                .then(res=>{
                        this.state_number=res.data.state_number;
                        this.all_state=res.data.all_state;
	                })
                    .catch(function (error) {
                        console.log("获取目标用户个人动态出错：\n"+error);
                    });
        }
    }

</script>


<style scoped>
    #PersonalCenterMyStateMainBox
    {
        position: absolute;
        width: 900px;
        height: auto;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
        padding-top: 10px;
        padding-bottom: 20px;
    }



</style>