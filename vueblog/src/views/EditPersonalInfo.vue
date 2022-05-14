<template>
    <div id=EditPersonalInfoMainBox>
        <div id=EditPersonalInfoTop>
            <el-page-header @back="goBack" content="修改信息"></el-page-header>
        </div>
        <div id=EditPersonalInfoPhotoBox>
            <div id=EditPersonalInfoPhotoTextBox>
                <p style="font-size:15px;color:rgb(82, 82, 82);">头像</p>
            </div>
            <div id=EditPersonalInfoPhotoBorder v-if="imageUrl==''">
                <!--<div id=EditPersonalPhoto ></div>-->
                <img :src="img_base64" style="width:60px;height:60px;">
            </div>
            <div id=EditPersonalUpload>
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div id=EditPersonalInfoMain>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="用户名">
                        <p>userAccount</p>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                        <el-input v-model="ruleForm.name" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age"  :rules="[
                    { required: true, message: '年龄不能为空'},
                     { type: 'number', message: '年龄必须为数字值'}
                ]">
                        <el-input v-model.number="ruleForm.age" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email" style="width:500px;">
                        <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="individual">
                    <el-input type="textarea" v-model="ruleForm.individual" :rows="6" resize="none" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
import {doge_base64} from "../assets/js/functions";

    export default {
        name: "EditPersonalInfo",
        data() {
            return {
                img_base64: "",
                imageUrl: "",
                
                ruleForm: {
                    name: '',
                    sex: '',
                    age: '',
                    email: '',
                    individual: '',
                    img: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入您的昵称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择您的性别', trigger: 'blur' }
                    ],
                    email: [
                        { message: '', trigger: 'blur' }
                    ],
                    individual: [
                        { message: '', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            postInfo: function(){
                this.$axios
	                .post("api/user/revisePersonalInformation",{
                        user_account: localStorage.getItem("user_account"),
                        user_name: this.ruleForm.name,
                        user_sex: this.ruleForm.sex,
                        user_age: this.ruleForm.age,
                        user_email: this.ruleForm.email,
                        user_info: this.ruleForm.individual,
                        user_img: this.ruleForm.img,
		            })
	                .then(res=>{
                        if(res.dada.state==1)
                        {
                            this.img_base64=this.ruleForm.img;
                            this.$message({
                                message: '修改个人信息成功,3秒后将返回个人主页',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.goBack();
                            }, 3000);
                        }
                        else
                        {
                            this.$message.error('修改失败');
                        }
	                })
                    .catch(function (error) {
                        console.log("提交用户个人信息出错：\n"+error);
                    });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("url:"+this.imageUrl);
                        this.postInfo();
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl='';
                this.ruleForm.img=this.img_base64;
            },
            goBack() {
                this.$router.push({
                    name:'PersonalCenter',
                    query: {
　　　　                host: localStorage.getItem("user_account"),
　　                }
                });
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                //转base64
                var reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    //console.log('file 转 base64结果：\n' + reader.result)
                    this.ruleForm.img = reader.result
                }
                reader.onerror = function (error) {
                    console.log('file转base64异常', error)
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt1M;
            }
        },
        created(){
            this.img_base64=doge_base64();
            this.$axios
	                .post("api/user/getBasicInformation",{
                        user_account: localStorage.getItem("user_account"),
		            })
	                .then(res=>{
                        this.ruleForm.name=res.data.user.user_name;
                        this.img_base64=res.data.user.user_img;
                        this.ruleForm.sex=res.data.user.user_sex;
                        this.ruleForm.age=res.data.user.user_age;
                        this.ruleForm.individual=res.data.user.user_info;
                        this.ruleForm.email=res.data.user.user_email;
	                })
                    .catch(function (error) {
                        console.log("获取用户个人信息出错：\n"+error);
                    });
        }
    }
</script>


<style scoped>
    #EditPersonalInfoMainBox
    {
        width: 800px;
        height: 750px;
        margin: auto;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #EditPersonalInfoTop
    {
        width: 700px;
        height: 40px;
        background-color: rgb(255, 255, 255);
        padding-left: 10px;
        padding-top: 20px;
        margin-left: 30px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: gray;
    }
    #EditPersonalInfoMain
    {
        width: 570px;
        height: auto;
        background-color: rgba(128, 128, 128, 0);
        padding-left: 135px;

    }
    #EditPersonalInfoPhotoBox
    {
        width: 700px;
        height: 80px;
        background-color: rgba(128, 128, 128, 0);
        padding-left: 115px;
        padding-top: 20px;
    }
    #EditPersonalInfoPhotoTextBox
    {
        width: 80px;
        height: 40px;
        background-color: rgba(223, 223, 223, 0);
        float: left;
        margin-left: 20px;
        padding-top: 20px;
    }
    #EditPersonalInfoPhotoBorder
    {
        width: 60px;
        height: 60px;
        background-color: rgb(235, 235, 235);
        float: left;
        margin-left: 20px;
    }
    #EditPersonalPhoto
    {
        width: 50px;
        height: 50px;
        margin-left: 5px;
        margin-top: 5px;
        background-size: 100% 100%;
        /*background-image: url("../assets/icon/user.svg");*/
    }
    #EditPersonalUpload
    {
        width: 60px;
        height: 60px;
        float: left;
        margin-left: 20px;
    }
    #EditPersonalUpload:hover
    {
        background-color: rgb(216, 216, 216);
    }

    /*Upload*/
    .avatar-uploader .el-upload 
    {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon 
    {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    } 
    .avatar {
        width: 60px;
        height: 60px;
        display: block;
    }

</style>