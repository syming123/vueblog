<template>
    <div>
        <!--top-->
        <div id=BlogTopBar>
            <div id=BlogTopBarLogoBox>
                <div id=TopLogo></div>
                <p class=LogoAndName>SCY博客</p>
            </div>
            <div id=BlogMiddleBox>
            <div id=BlogTopBarBackToHomeBox>
                <el-button plain size="small" icon="el-icon-back" @click="backToHome()">返回首页</el-button>
            </div>
            <div id=BlogTopBarSearchingBox>
                <searching-box></searching-box>
            </div>
            <div id=BlogTopBarPortraitBox>
                <portrait-box></portrait-box>
            </div>
            </div>
        </div>
        <!--middle-->
        <div id=BlogABlock></div>
        <div id=BlogMiddleMainBox>
            <div id=BlogMiddleMainLeft>
                <div id=BlogMiddleMainLeftTop>
                    <blog-main-article :article_data="this_article"></blog-main-article>
                </div>
                <div id=BlogMiddleMainLeftBottom>
                    <blog-comment :article_data="this_article"></blog-comment>
                </div>
            </div>
            <div id=BlogMiddleMainRight>
                <blog-author :article_data="this_article"></blog-author>
            </div>
        </div>
    </div>
</template>


<script>
import SearchingBox from '../components/HomePage/SearchingBox.vue'
import PortraitBox from '../components/HomePage/PortraitBox.vue'
import BlogMainArticle from '../components/Blog/BlogMainArticle.vue'
import BlogComment from '../components/Blog/BlogComment.vue'
import BlogAuthor from '../components/Blog/BlogAuthor.vue'

    export default {
        components: { 
            "searching-box" : SearchingBox,
            "portrait-box" : PortraitBox,
            "blog-main-article" : BlogMainArticle,
            "blog-comment" : BlogComment,
            "blog-author" : BlogAuthor,
        },
        name: "Blog",
        data() {
            return{
                this_article:{
                    article_id: 0,
                    article_title: "这是文章标题",
                    article_author: "AuthorName",
                    article_author_account: "user ac",
                    article_all_content: "这是文章内容",
                    article_publish_time: "2021-11-11",
                    article_like: 0,
                }
            }
        },
        methods: {
            backToHome(){
                this.$router.push({name:'HomePage'});
            }
        },
        created(){
            //this.this_article.article_id=this.$store.getters.get_target_article;
            this.this_article.article_id=this.$route.query.article_id;
            //console.log(this.this_article.article_id);
            this.$axios
	                .post("api/article/getOneArticle",{
                        article_id: this.this_article.article_id
		            })
	                .then(res=>{
                        this.this_article.article_title=res.data.article_title;
                        this.this_article.article_author=res.data.article_author;
                        this.this_article.article_author_account=res.data.article_author_account;
                        this.this_article.article_all_content=res.data.article_all_content;
                        this.this_article.article_publish_time=res.data.article_publish_time;
                        this.this_article.article_like=res.data.article_like;
	                })
                    .catch(function (error) {
                        console.log("获取文章信息出错：\n"+error);
                    });
        }
    }
</script>


<style scoped>

    p.LogoAndName
    {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        margin-top: 7px;
        color: rgb(108, 170, 108);
    }
    #TopLogo
    {
        width: 65px;
        height: 65px;
        float: left;
        background-size: 100% 100%;
        background-image: url("../assets/icon/logo.png");
        margin-top: -10px;
        margin-right: -5px;
        margin-left: 10px;
    }
    #BlogTopBar
    {
        width: 100%;
        height: 50px;
        background-color: rgb(255, 255, 255);
        position: fixed;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #BlogTopBarLogoBox
    {
        width: 180px;
        height: 100%;
        background-color: rgba(245, 222, 179, 0);
        float: left;
    }
    #BlogMiddleBox
    {
        width: 1010px;
        height: 50px;
        margin: auto;
    }
    #BlogTopBarBackToHomeBox
    {
        width: 100px;
        height: 45px;
        float: left;
        padding-top: 9px;
        margin-left: 30px;
    }
    #BlogTopBarSearchingBox
    {
        width: 400px;
        height: 50px;
        float: left;
        margin-left: 90px;
    }
    #BlogTopBarPortraitBox
    {
        width: 190px;
        height: 50px;
        float: left;
        margin-left: 110px;
    }
    #BlogABlock
    {
        height: 60px;
    }
    #BlogMiddleMainBox
    {
        width: 1010px;
        height: 400px;
        margin: auto;
    }
    #BlogMiddleMainLeft
    {
        width: 700px;
        height: auto;
        float: left;
    }
    #BlogMiddleMainLeftTop
    {
        width: 700px;
        height: auto;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #BlogMiddleMainLeftBottom
    {
        width: 700px;
        height: auto;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #BlogMiddleMainRight
    {
        width: 300px;
        height: 250px;
        background-color: white;
        float: right;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }

    /*响应式布局*/
    @media screen and (max-width: 1390px) 
    {
        #BlogMiddleMainBox
        {
            margin-left: 181px;
        }
    }
    @media screen and (max-width: 1210px) 
    {
        #BlogTopBar
        {
            width: 1190px;
        }
    }
</style>