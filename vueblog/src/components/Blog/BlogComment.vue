<template>
    <div>
        <div id=BlogCommentTop>
            <p>{{sumComment}}条评论</p>
        </div>
        <div id=BlogCommentMiddle>
            <div v-for="comments in allComment" :key="comments.comment_author_account">
                <blog-one-comment :commentData="comments"></blog-one-comment>
            </div>
        </div>
        <div id=BlogCommentBottom>
            <el-input
            type="textarea"
            :rows="4"
            placeholder="写下你的评论..."
            v-model="myComment"
            resize="none">
            </el-input>
            <el-button type="primary" size="small" style="float:right;margin-top:10px;" @click="submitComment()">发表</el-button>
            <p style="float:right;margin-right:20px;font-size:14px;color:rgb(190, 190, 190);margin-top:17px;">
                字数限制：{{myComment.length}}/500
            </p>
        </div>
    </div>
</template>


<script>
import BlogOneComment from './BlogOneComment.vue'

    export default {
        components: { 
            "blog-one-comment" : BlogOneComment,
        },
        name: "BlogComment",
        props: {
            article_data: {
            type: [Object],
            },
        },
        data() {
            return {
                sumComment: 2,
                allComment:[
                    {
                        comment_author: "user1",
                        comment_author_account: "user1ac",
                        comment_content: "com1",
                        comment_publish_time: "2021-11-11",
                    },
                    {
                        comment_author: "user2",
                        comment_author_account: "user2ac",
                        comment_content: "com2",
                        comment_publish_time: "2022-12-12",
                    },
                ],
                myComment: "",
            }
        },
        methods: {
            getComment: function(){
                this.$axios
	                .post("api/article/getComment",{
                        article_id: this.article_data.article_id,
		            })
	                .then(res=>{
                        this.sumComment=res.data.comment_number;
                        this.allComment=res.data.all_comment;
	                })
                    .catch(function (error) {
                        console.log("获取文章评论出错：\n"+error);
                    });
            },
            submitComment: function(){
                if(this.myComment.length>500)
                {
                    this.$message.error('评论字数不能超过500');
                }
                else if(this.myComment=="")
                {
                    this.$message.error('评论不能为空');
                }
                else
                {
                    this.$axios
	                    .post("api/user/makeComment",{
                            comment_user: localStorage.getItem("user_account"),
                            comment_article: this.article_data.article_id,
                            comment_content: this.myComment,
		                })
	                    .then(res=>{
                            var state=res.data.state;
                            if(state==1)
                            {
                                this.$message({
                                    message: '评论发表成功',
                                    type: 'success'
                                });
                                this.myComment='';
                                this.getComment();
                            }
                            else
                            {
                                this.$message.error('评论失败');
                            }
	                    })
                        .catch(function (error) {
                            console.log("发表评论出错：\n"+error);
                        });
                }
            }
        },
        created(){
            this.getComment();
        }
    }
</script>
    

<style scoped>
    #BlogCommentTop
    {
        width: 640px;
        height: 20px;
        padding: 15px 30px;
        border-bottom-color: rgb(218, 218, 218);
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    #BlogCommentMiddle
    {
        width: 700px;
        height: auto;
    }
    #BlogCommentBottom
    {
        width: 640px;
        height: 140px;
        padding: 15px 30px;
    }


</style>