<template>
    <div>
        <transition name="pageSwitch">
            <login-box v-if="this.$store.getters.get_Login_loginOrRegister==1"></login-box>
        </transition>
        <transition name="pageSwitch">
            <register-box v-if="this.$store.getters.get_Login_loginOrRegister==2"></register-box>
        </transition>
        <transition name="pageSwitch">
            <forget-password v-if="this.$store.getters.get_Login_loginOrRegister==3"></forget-password>
        </transition>
    </div>
</template>


<script>
import LoginBox from './LoginBox.vue'
import RegisterBox from './RegisterBox.vue'
import ForgetPassword from './ForgetPassword.vue'

    export default {
        components: { 
            "login-box" : LoginBox,
            "register-box" : RegisterBox,
            "forget-password" : ForgetPassword,
        },
        name: "LoginMainBox"
    }
</script>


<style scoped>
@import "../../assets/css/Animations.css";

</style>