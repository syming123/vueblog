<template>
    <div id=HomePage>
        <!--顶栏-->
        <div id=TopMainBox>
            <div id=TopLogoBox>
                <div id=TopLogo></div>
                <p class="LogoAndName">SCY博客</p>
            </div>
            <div id=TopMainMiddleBox>
                <div id=TopMainButtonBox>
                    <top-buttons></top-buttons>
                </div>
                <div id=TopMainSearchingBox>
                    <searching-box></searching-box>
                </div>
                <div id=TopMainUser>
                    <portrait-box></portrait-box>
                </div>
            </div>
        </div>
        <!--中栏-->
        <div id=MiddleMainBoxBlock></div>
        <div id=MiddleMainBox>
            <!--左中-->
            <div id=MiddleLeft>
                <div id=MiddleLeft_1>
                    <home-page-main-left></home-page-main-left>
                </div>
            </div>
            <!--右中-->
            <div id=MiddleRight>
                <div id=middleRight_1>
                    <sign-in></sign-in>
                </div>
                <div id=middleRight_2>
                    <creation></creation>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TopButtons from '../components/HomePage/TopButtons.vue'
import HomePageMainLeft from '../components/HomePage/HomePageMainLeft.vue'
import SearchingBox from '../components/HomePage/SearchingBox.vue'
import PortraitBox from '../components/HomePage/PortraitBox.vue'
import SignIn from '../components/HomePage/SignIn.vue'
import Creation from '../components/HomePage/Creation.vue'


    export default {
        components: { 
            "top-buttons" : TopButtons,
            "home-page-main-left" : HomePageMainLeft, 
            "searching-box" : SearchingBox,
            "portrait-box" : PortraitBox,
            "sign-in" : SignIn,
            "creation" : Creation,
        },
        name: "HomePage",
        data() {
            return{
                user_account : "",
            }
        },
        methods: {
            getUserMessage : function(){
                this.user_account=localStorage.getItem('user_account');
                this.$axios
	                .post("api/user/getBasicInformation",{
			            user_account: this.user_account,
		            })
	                .then(res=>{
                        //获取用户信息存入sessionStorage
		                var user_message=res.data.user;
                        sessionStorage.setItem("user_message",JSON.stringify(user_message));
	                })
                    .catch(function (error) {
                        console.log("获取用户信息出错：\n"+error);
                    });
            },
        },
        created(){
            this.getUserMessage();
        }
    }
</script>


<style scoped>
    @import "../assets/css/HomePage/HomePageTop.css";
    @import "../assets/css/HomePage/HomePageMiddle.css";

    p.LogoAndName
    {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        margin-top: 7px;
        color: rgb(108, 170, 108);
    }

    body
    {
        width: 100%;
        height: 100%;
    }

    #HomePage
    {
        background-color: rgb(235, 235, 235);
        width: 100%;
        height: anto;
    }


    /*响应式布局*/
    @media screen and (max-width: 1390px) 
    {
        #MiddleMainBox
        {
            margin-left: 181px;
            width: 1000px;
        }   
        #TopMainMiddleBox
        {
            margin-left: 180px;
        }
    }
    @media screen and (max-width: 1210px) 
    {
        body
        {
            width: 1200px;
        }
        #MiddleMainBox
        {
            width: 1000px;
        }
        #HomePage
        {
            width: 1191px;
        }
    }
</style>