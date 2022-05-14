<template>
    <div id=AMyrticleMainBox>
        <div id=MyLineBox>
            <p class=MyTitleText @click="goInMyArticle()">{{articleData.article_title}}</p>
            <p class=MyContentText>{{articleData.article_content}}</p>
            <div id=MyBottomBox>
                <el-button type="text" icon="el-icon-chat-dot-round" @click="goInMyArticle()">{{articleData.article_comment}} 条评论</el-button>
                <el-button type="text" icon="el-icon-edit-outline" style="margin-left:30px;" @click="editMyBlog()">编辑</el-button>
                <el-button type="text" style="margin-left:40px;color:#F56C6C;" @click="deleteMyBlog()">删除</el-button>
                <p class=MyContentText style="float:right;margin-right:20px;">发布于：{{articleData.article_publish_time}}</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "HomePageArticle",
        props: {
            articleData: {
            type: [Object],
            },
        },
        data() {
            return{
                goInMyArticle: function()
                {
                    //this.$store.commit('set_target_article',this.articleData.article_id);
                    //this.$router.push({name:'Blog'});
                    this.$router.push({
                        name:'Blog',
                        query: {
　　　　                    article_id: this.articleData.article_id,
　　                    }
                    });
                }
            }
        },
        methods: {
            editMyBlog: function(){
                this.$router.push({
                    name:'BlogEdit',
                    query: {
　　　　                article_id: this.articleData.article_id,
　　                }
                });
            },
            deleteSubmit: function(){
                this.$axios
	                .post("api/article/deleteOneArticle",{
			            article_id: this.articleData.article_id,
                        auther_account: this.articleData.article_author,
		            })
	                .then(res=>{
		                var state=res.data.state;
                        if(state==1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
	                })
                    .catch(function (error) {
                        console.log("删除文章出错：\n"+error);
                    });
            },
            deleteMyBlog: function(){
                this.$confirm('文章一经删除将无法找回，您确定要删除这篇文章吗？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.deleteSubmit()){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.$store.commit('set_HomePage_selected',0);
                        setTimeout(() => {
                            this.$store.commit('set_HomePage_selected',4);
                        }, 10);
                    }
                    else
                    {
                        this.$message.error('删除失败');
                    }
                }).catch(() => {
                            
                });
            }
        }
    }
</script>
    

<style scoped>
    #MyArticleMainBox
    {
        width: 693px;
        /*height: auto;*/
        background-color: rgb(255, 255, 255);
    }
    #MyLineBox
    {
        width: 615px;
        height: auto;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgb(182, 182, 182);
        margin-left: 40px;
    }
    p.MyTitleText
    {
        font-size: 18px;
        margin-top: 20px;
        cursor: pointer;
    }
    p.MyContentText
    {
        font-size: 14px;
        color: gray;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #MyBottomBox
    {
        width: 615px;
        height: 40px;
    }

    

</style>