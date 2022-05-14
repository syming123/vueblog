<template>
    <div>
        <div id=MainBox>
            <p>忘记密码请联系网站管理员</p>
            <p @click="switch_to_login()" style="user-select:none;cursor:pointer;">点此返回</p>
        </div>
    </div>
</template>


<script>
    export default {
        name: "ForgetPassword",
        data() {
            return{
                
            }
        },
        methods: {
            switch_to_login: function(){
                this.$store.commit('set_Login_loginOrRegister',1);
            }
        }
    }
</script>


<style scoped>
#MainBox
{
    position: absolute;
    margin-left: 20px;
    margin-top: 20px;
}

</style>