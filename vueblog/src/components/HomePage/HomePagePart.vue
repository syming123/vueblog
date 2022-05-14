<template>
    <div id=PartMainBox>
        <div id=TopBox>
            <p class=TopText>{{page_name[dataList.page_id-1]}}</p>
        </div>
        <div v-if="dataList.page_id!=4">
            <div v-for="article_message in articleMessage" :key="article_message.article_id">
                <page-article :articleData="article_message"></page-article>
            </div>
        </div>
        <div v-if="dataList.page_id==4">
            <div v-for="article_message in articleMessage" :key="article_message.article_id">
                <my-article :articleData="article_message"></my-article>
            </div>
        </div>
        <div id=EndBox>
            <el-pagination
            :page-size="10"
            :pager-count="13"
            layout="prev, pager, next"
            :page-count="pageNumber"
            :current-page.sync=currentPage
            @current-change="changePage()">
            </el-pagination>
        </div>
    </div>
</template>


<script>
import PageArticle from './HomePageArticle.vue'
import PageMyArticle from './HomePageMyArticle.vue'

    export default {
        components: { 
            "page-article" : PageArticle,
            "my-article" : PageMyArticle,
        },
        name: "HomePagePart",
        props: {
            dataList: {
            type: [Object],
            },
        },
        data() {
            return{
                page_name: [
                "我的首页",
                "我的关注",
                "我的收藏",
                "我的文章",
                "我的搜索"
                ],
                currentPage: 1,
                /*page_article_data: {
                    article_id: 0,
                    article_title: "这是一个标题",
                    article_content: "这是文章内容",
                    article_like: 0,
                    article_comment: 0,
                    article_author: "UserName",
                },
                my_article_data: {
                    article_id: 0,
                    article_title: "这是标题",
                    article_content: "这是内容",
                    article_comment: 0,
                    article_publish_time: "2021-11-11",
                },*/
                //内容数组
                pageNumber: 12,
                articleMessage:[
                    {
                        article_id: 3,
                        article_title: "这是一个标题",
                        article_content: "这是文章内容",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "UserName",
                        article_publish_time: "2021-11-11",
                    },
                    {
                        article_id: 1,
                        article_title: "这是一个标题2",
                        article_content: "这是文章内容222",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "user01",
                        article_publish_time: "2021-11-11",
                    },
                    {
                        article_id: 4,
                        article_title: "这是一个标题3",
                        article_content: "这是文章内容333",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "user01",
                        article_publish_time: "2021-11-11",
                    },
                    {
                        article_id: 7,
                        article_title: "这是一个标题4",
                        article_content: "这是文章内容444",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "user01",
                        article_publish_time: "2021-11-11",
                    },
                    {
                        article_id: 10,
                        article_title: "这是一个标题5",
                        article_content: "这是文章内容5555",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "user01",
                        article_publish_time: "2021-11-11",
                    },
                    {
                        article_id: 13,
                        article_title: "这是一个标题6",
                        article_content: "这是文章内容66",
                        article_like: 0,
                        article_comment: 0,
                        article_author: "user01",
                        article_publish_time: "2021-11-11",
                    }
                ],
            }
        },
        methods: {
            changePage : function(){
                //alert("page changed"+this.currentPage);
                var the_key_word;
                if(this.dataList.page_id==5) the_key_word= this.$store.getters.get_searching_box_content;
                else the_key_word=localStorage.getItem('user_account');
                //ask2
                this.$axios
	                .post("api/article/getArticles",{
                        ask_type: 2,
                        article_type: this.dataList.page_id,
			            kew_word: the_key_word,
                        page_id: this.currentPage,
		            })
	                .then(res=>{
                        //获取用户信息存入sessionStorage
                        this.articleMessage=res.data.all_article;
	                })
                    .catch(function (error) {
                        console.log("获取新的一页信息出错：\n"+error);
                    });
            },
            getPageMessage : function(){
                var the_key_word;
                if(this.dataList.page_id==5) the_key_word= this.$store.getters.get_searching_box_content;
                else the_key_word=localStorage.getItem('user_account');
                //console.log(this.dataList.page_id+" "+the_key_word);
                //ask1
                this.$axios
	                .post("api/article/getArticlesNumber",{
                        ask_type: 1,
                        article_type: this.dataList.page_id,
			            kew_word: the_key_word,
		            })
	                .then(res=>{
                        this.pageNumber=res.data.page_number;
	                })
                    .catch(function (error) {
                        console.log("获取总页数出错：\n"+error);
                    });
            },
        },
        created(){
            this.changePage();
            this.getPageMessage();
        }
    }
</script>
    

<style scoped>
    #PartMainBox
    {
        width: 693px;
        height: auto;
        background-color: rgb(255, 255, 255);
        position: absolute;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #TopBox
    {
        width: 615px;
        height: 50px;
        padding-top: 30px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgb(182, 182, 182);
        margin-left: 40px;
    }
    p.TopText
    {
        font-size: 20px;
        color: rgb(0, 0, 0);
        font-weight: 550;
    }
    #EndBox
    {
        width: 653px;
        height: 30px;
        background-color: rgba(255, 235, 205, 0);
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 40px;
    }

</style>