<template>
    <div >
        <div id=BlogAuthorTopBox>
            <div id=BlogAuthorTopLeft>
                <!--<div id=BlogAuthorImg></div>-->
                <img :src="user_img" style="width:40px;height:40px;">
            </div>
            <div id=BlogAuthorTopRight>
                <p class=BlogAuthorTopText @click="visitAuther()">{{article_data.article_author}}</p>
            </div>
        </div>
        <div id=BlogAuthorMiddleBox>
            <div class=BlogAuthorMiddleOne>
                <p class=BlogAuthorMiddleOneText1>文章数</p>
                <p class=BlogAuthorMiddleOneText2>{{sum_article}}</p>
            </div>
            <div class=BlogAuthorMiddleOne>
                <p class=BlogAuthorMiddleOneText1>获赞数</p>
                <p class=BlogAuthorMiddleOneText2>{{sum_like}}</p>
            </div>
            <div class=BlogAuthorMiddleOne>
                <p class=BlogAuthorMiddleOneText1>评论数</p>
                <p class=BlogAuthorMiddleOneText2>{{sum_comment}}</p>
            </div>
        </div>
        <el-button v-if="watcher_type==0" type="primary" icon="el-icon-plus" style="width:220px;margin-left:40px;" @click="payAttention()">关注他</el-button>
        <el-button v-if="watcher_type==1" type="primary" icon="el-icon-edit-outline" style="width:220px;margin-left:40px;" @click="editMyBlog()">修改文章</el-button>
    </div>
</template>


<script>
import {doge_base64} from "../../assets/js/functions";

    export default {
        name: "BlogAuthor",
        props: {
            article_data: {
            type: [Object],
            },
        },
        data() {
            return {
                sum_article: 0,
                sum_like: 0,
                sum_comment: 0,
                user_img: "",

                watcher_type: 0,//0是别人，1是自己
            }
        },
        methods: {
            visitAuther: function(){
                //this.$store.commit('set_personal_center_host',this.article_data.article_author_account);
                this.$router.push({
                    name:'PersonalCenter',
                    query: {
　　　　                host: this.article_data.article_author_account,
　　                }
                });
            },
            editMyBlog: function(){
                this.$router.push({
                    name:'BlogEdit',
                    query: {
　　　　                article_id: this.article_data.article_id,
　　                }
                });
            },
            payAttention: function(){
                this.$axios
	                .post("api/user/concern",{
                        user_account: localStorage.getItem("user_account"),
                        attention_account: this.article_data.article_author_account,
		            })
	                .then(res=>{
                        var state=res.data.state;
                        if(state==1)
                        {
                            this.$message({
                                message: '关注成功',
                                type: 'success'
                            });
                        }
                        else if(state==-1)
                        {
                            this.$message('您已经关注了这个人');
                        }
                        else
                        {
                            this.$message.error('未知错误');
                        }
	                })
                    .catch(function (error) {
                        console.log("关注别人出错：\n"+error);
                    });
            }
        },
        created(){
            this.user_img=doge_base64();
            if(this.article_data.article_author_account==localStorage.getItem("user_account"))
            {
                this.watcher_type=1;
            }
            else
            {
                this.watcher_type=0;
            }
            this.$axios
	                .post("api/user/getInformation",{
                        user_account: this.article_data.article_author_account
		            })
	                .then(res=>{
                        this.sum_article=res.data.sum_article;
                        this.sum_like=res.data.sum_like;
                        this.sum_comment=res.data.sum_comment;
                        this.user_img=res.data.user_img;
	                })
                    .catch(function (error) {
                        console.log("获取文章作者信息出错：\n"+error);
                    });
        }
    }
</script>
    

<style scoped>
    #BlogAuthorTopBox
    {
        width: 300px;
        height: 74px;
        border-bottom-color: rgb(218, 218, 218);
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    #BlogAuthorTopLeft
    {
        width: 40px;
        height: 40px;
        float: left;
        padding: 17px;
        margin-left: 30px;
    }
    #BlogAuthorImg
    {
        width: 40px;
        height: 40px;
        background-image: url("../../assets/icon/user.svg");
        background-size: 100% 100%;
    }
    #BlogAuthorTopRight
    {
        width: 106px;
        height: 74px;
        float: left;
    }
    p.BlogAuthorTopText
    {
        font-size: 18px;
        font-weight: 600;
        user-select: none;
        cursor: pointer;
        margin-top: 25px;
        margin-left: 15px;
    }
    #BlogAuthorMiddleBox
    {
        height: 70px;
        width: 240px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
    }
    .BlogAuthorMiddleOne
    {
        width: 80px;
        height: 80px;
        float: left;
    }
    p.BlogAuthorMiddleOneText1
    {
        font-size: 17px;
        text-align: center;
    }
    p.BlogAuthorMiddleOneText2
    {
        font-size: 16px;
        text-align: center;
        margin-top: 3px;
    }


</style>