<template>
    <div>
        <div id=MainBox>
            <div id=TopBox>
                <p class=Title>请登录</p>
            </div>
            <div id=MainForm>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top" size="small">
                    <p class=FormText>请输入您的用户名:</p>
                    <el-form-item label="" prop="account">
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                    <p class=FormText style="float:left;position:relative;z-index:1;">请输入您的密码:</p>
                    <p class=blueText style="float:right;font-size:14px;cursor:pointer;" @click="switch_to_forget()">忘记密码?</p>
                    <el-form-item label="" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <p class=FormText>请输入验证码:</p>
                    <el-form-item label="" prop="verify">
                        <el-input v-model="ruleForm.verify" style="width: 120px;"></el-input>
                        <p class=blueText style="float:right;" @click="change_verify()">看不清?换一张</p>
                        <div id=VerifyCodeBox @click="change_verify()">
                            <p class=verifyStyle>{{verify_code}}</p>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-top: 40px;">
                        <el-button type="primary" @click="submitForm('ruleForm')" size="middle" style="width: 100px;margin-left: 25px;">登录</el-button>
                        <el-button @click="switch_to_register()" size="middle" style="float: right;width: 100px;margin-right: 25px;">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "LoginBox",
        data() {
            return{
                verify_code : '',
                ruleForm: {
                    account: '',
                    password: '',
                    verify: '',
                },
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    /*verify: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],*/
                },
            }
        },
        created: function(){
            this.change_verify();
        },
        methods: {
            switch_to_register: function(){
                this.$store.commit('set_Login_loginOrRegister',2);
            },
            switch_to_forget: function(){
                this.$store.commit('set_Login_loginOrRegister',3);
            },
            change_verify: function(){
                var code="";
                var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'); 
                for (var i = 0; i < 4; i++)
                {
                    var charNum = Math.floor(Math.random() * 62);
                    code += codeChars[charNum];
                }
                this.verify_code=code;
            },
            loginSuccess(){
                this.$message({
                    message: '登录成功,3秒后将跳转到主页',
                    type: 'success'
                });
                localStorage.setItem('user_account',this.ruleForm.account);
                setTimeout(() => {
                    this.$router.push({name:'HomePage'});
                }, 3000);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.verify_code.toLowerCase()!=this.ruleForm.verify.toLowerCase()){
                            this.$message.error('验证码错误，请输入正确的验证码');
                            return;
                        }
                        else{
                            this.$axios
	                            //.post(this.$store.getters.GET_IP_ADDRESS+':'+this.$store.getters.GET_PORT+"/",{
                                .post("api/user/login",{
			                        user_account: this.ruleForm.account,
			                        user_password: this.ruleForm.password,
		                        })
	                            .then(res=>{
		                            var ans=res.data.state;
                                    if(ans==1)
                                    {
                                        this.loginSuccess();
                                    }
                                    else if(ans==-1)
                                    {
                                        this.$message.error('密码错误');
                                    }
                                    else if(ans==-2)
                                    {
                                        this.$message.error('该用户不存在');
                                    }
                                    else
                                    {
                                        this.$message.error('未知错误');
                                    }
	                            })
                                .catch(function (error) {
                                    console.log("登录出现错误：\n"+error);
                                });
                        }
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>


<style scoped>
    #MainBox
    {
        position: absolute;
    }
    p.Title
    {
        font-size: 20px;
        color: rgb(27, 27, 27);
    }
    #TopBox
    {
        width: 400px;
        height: 40px;
        padding-top: 40px;
        padding-left: 60px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: gray;
    }
    #MainForm
    {
        width: 320px;
        height: 440px;
        padding-left: 60px;
        padding-right: 40px;
        margin-top: 40px;
    }
    p.FormText
    {
        size: 13px;
        color: gray;
    }
    p.blueText
    {
        size: 13px;
        color: blue;
        user-select: none;
        cursor: pointer;
        position: relative;
        z-index: 1;
    }
    #VerifyCodeBox
    {
        width: 80px;
        height: 30px;
        background-color: burlywood;
        float: right;
        margin-right: 5px;
        margin-top: 2px;
        cursor: pointer;
    }
    p.verifyStyle
    {
        font-size: 18px;
        font-weight: 800;
        margin-left: 6px;
        letter-spacing: 3px;
        user-select: none;
    }

</style>