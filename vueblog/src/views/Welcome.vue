<template>
    <div>
        <el-container>
            <el-header>本页面仅供调试使用</el-header>
            <el-main>
                <div>
                    <el-button @click="f1()">login</el-button>
                    <el-button @click="f2()">home page</el-button>
                    <el-button @click="f3()">personal center</el-button>
                    <el-button @click="f4()">blog</el-button>
                    <el-button @click="f5()">blog edit</el-button>
                    <el-button @click="f6()">edit personal info</el-button>
                </div>
            </el-main>
            <el-footer>
                <p>axios调试 post请求</p>
                <el-input v-model="axios_url" placeholder="请输入内容"></el-input>
                <el-button @click="ajax_1()">go</el-button>
                <p>{{info}}</p>
            </el-footer>
        </el-container>
    </div>
</template>


<script>
    export default {
        name: "Welcome",
        data() {
            return{
                info: null,
                axios_url: "api/",
            }
        },
        methods: {
            f1(){
                this.$router.push({name:'Login'});
            },
            f2(){
                this.$router.push({name:'HomePage'});
            },
            f3(){
                this.$router.push({name:'PersonalCenter'});
            },
            f4(){
                this.$router.push({name:'Blog'});
            },
            f5(){
                this.$router.push({name:'BlogEdit'});
            },
            f6(){
                this.$router.push({name:'EditPersonalInfo'});
            },
            ajax_1(){
                this.$axios
                    .post(this.axios_url,{
                        //这里填参数
                        user_account: 'aaaa',
                    })
                    .then(response => (this.info = response.data))
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created(){
            //将以下几行取消注释即可屏蔽调试页面
            /*if(localStorage.getItem("user_account")==null)
            {
                this.$router.push({name:'Login'});
            }
            else
            {
                this.$router.push({name:'HomePage'});
            }*/
        }
    }
</script>
    

<style scoped>
    .el-header, .el-footer 
    {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
  
    .el-aside 
    {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
  
    .el-main 
    {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
  
    body > .el-container 
    {
        margin-bottom: 40px;
    }
  
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside 
    {
        line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside 
    {
        line-height: 320px;
    }
</style>
