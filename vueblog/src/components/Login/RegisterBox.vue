<template>
    <div>
        <div id=MainBox>
            <div id=TopBox>
                <p class=Title>请注册</p>
            </div>
            <div id=MainForm>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top" size="small">
                    <p class=FormText>请输入您的用户名:</p>
                    <el-form-item label="" prop="account">
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                    <p class=FormText style="float:left;position:relative;z-index:1;">请输入您的密码:</p>
                    <el-form-item label="" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <p class=FormText>请输入确认密码:</p>
                    <el-form-item label="" prop="verify">
                        <el-input v-model="ruleForm.verify" type="password"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 40px;">
                        <el-button @click="switch_to_login()" size="middle" style="width: 100px;margin-left: 25px;">登录</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" size="middle" style="float: right;width: 100px;margin-right: 25px;">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "RegisterBox",
        data() {
            return{
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
                    verify: [
                        { required: true, message: '请确认密码', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            switch_to_login: function(){
                this.$store.commit('set_Login_loginOrRegister',1);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.registerSubmit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            registerSubmit : function(){
                if(this.ruleForm.password!=this.ruleForm.verify){
                    this.$message.error('请确认两次输入密码相同');
                    return;
                }
                else{
                    this.$axios
	                    //.post(this.$store.getters.GET_IP_ADDRESS+':'+this.$store.getters.GET_PORT+"/",{
                        .post("api/user/register",{
			                user_account: this.ruleForm.account,
			                user_password: this.ruleForm.password,
		                })
	                    .then(res=>{
		                    var ans=res.data.state;
                            if(ans==1)
                            {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                            }
                            else if(ans==-1)
                            {
                                this.$message.error('该用户名已被占用');
                            }
	                    })
                        .catch(function (error) {
                            console.log("注册出现错误：\n"+error);
                        });
                }
            }
        },
        created(){

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


</style>