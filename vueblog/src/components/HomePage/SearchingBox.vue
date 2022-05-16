<template>
    <div>
        <div id=InputBox>
            <el-input placeholder="请输入搜索内容" v-model="searching_input" size="small">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div id=ButtonBox>
            <el-button type="primary" plain icon="el-icon-search" size="small" @click="searching()">搜索</el-button>
        </div>
    </div>
</template>


<script>
    export default {
        name: "SearchingBox",
        data() {
            return {
                searching_input: '',
            }
        },
        methods: {
            searching(){
                if(this.searching_input=="")
                {
                    this.$message.error('请输入搜索内容');
                    return;
                }
                this.$store.commit('set_HomePage_selected',0);
                this.$store.commit('set_searching_box_content',this.searching_input);
                setTimeout(() => {
                    if(this.$route.path!='/HomePage'){
                        this.$router.push({path:'/HomePage',})
                    }
                    this.$store.commit('set_HomePage_selected',5);
                }, 1);
            }
        }
    }
</script>
    

<style scoped>
    #InputBox
    {
        width: 220px;
        height: 42px;
        padding-top: 8px;
        float: left;
        margin-left: 50px;
    }
    #ButtonBox
    {
        width: 100px;
        height: 42px;
        padding-top: 8px;
        margin-left: 10px;
        float: left;
    }


</style>