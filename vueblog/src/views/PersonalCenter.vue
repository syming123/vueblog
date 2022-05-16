<template>
    <div>
        <div id=PersonalCenterMainBox>
            <div id=PersonalCenterTopBox>
                <personal-center-top :centerData="host_data"></personal-center-top>
            </div>
            <div id=PersonalCenterMiddleBox>
                <personal-center-middle :centerData="host_data"></personal-center-middle>
            </div>
        </div>
    </div>
</template>


<script>
    import PersonalCenterTop from '../components/PersonalCenter/PersonalCenterTop.vue'
    import PersonalCenterMiddle from '../components/PersonalCenter/PersonalCenterMiddle.vue'

    import {doge_base64} from "../assets/js/functions";

    export default {
        components: { 
            "personal-center-top" : PersonalCenterTop,
            "personal-center-middle" : PersonalCenterMiddle
        },
        name: "PersonalCenter",
        data() {
            return{
                host_data: {
                    account: "",
                    name: "user name",
                    img: "",
                    sex: "男",
                    age: 18,
                    email: "123456@email.com",
                    info: "这是个人简介",
                    score: 100,
                },
            }
        },
        methods: {
            
        },
        created(){
            this.host_data.img=doge_base64();
            this.host_data.account=this.$route.query.host;
            this.$axios
	                .post("api/user/getBasicInformation",{
                        user_account: this.host_data.account,
		            })
	                .then(res=>{
                        this.host_data.name=res.data.user.user_name;
                        this.host_data.img=res.data.user.user_img;
                        this.host_data.sex=res.data.user.user_sex;
                        this.host_data.age=res.data.user.user_age;
                        this.host_data.email=res.data.user.user_email;
                        this.host_data.info=res.data.user.user_info;
                        this.host_data.score=res.data.user.user_score;
	                })
                    .catch(function (error) {
                        console.log("获取目标用户信息出错：\n"+error);
                    });
        }
    }
</script>


<style scoped>
    #PersonalCenterMainBox
    {
        width: 900px;
        height: auto;
        margin: auto;
    }
    #PersonalCenterTopBox
    {
        width: 900px;
        height: 200px;
    }
    #PersonalCenterMiddleBox
    {
        width: 900px;
        height: auto;
        margin-top: 10px;
    }


</style>