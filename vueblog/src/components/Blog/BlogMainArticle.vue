<template>
    <div>
        <div id=BlogMainArticleTopBox>
            <p class=BlogTitleText>{{article_data.article_title}}</p>
        </div>
        <div id=BlogMainArticleContentBox>
            <div class=markdown-body v-html="article_data.article_all_content"></div>
        </div>
        <div id=BlogMainArticleBottomBox>
            <p style="color:gray;font-size:15px;float:left;margin-top:3px;">发表于：{{article_data.article_publish_time}}</p>
            <el-button type="primary" :plain='buttons_type[flags[1]]' icon="el-icon-caret-top" size="mini" style="padding-left:8px;padding-right:10px;float:left;margin-left:20px;" @click="operations(1)">{{buttons_text[flags[1]]}} {{article_data.article_like}}</el-button>
            <el-button type="primary" :plain='buttons_type[flags[2]]' icon="el-icon-caret-bottom" size="mini" style="padding-left:8px;padding-right:8px;float:left;" @click="operations(2)"></el-button>
            <el-button type="text" :icon="corn_icon[flags[4]]" style="margin-left:30px;float:right;margin-top:-5px;" @click="operations(4)">{{corn_text[flags[4]]}}</el-button>
            <el-button type="text" :icon="collect_icon[flags[3]]" style="margin-left:30px;float:right;margin-top:-5px;" @click="operations(3)">{{collect_text[flags[3]]}}</el-button>
        </div>
    </div>
</template>


<script>
import "../../../node_modules/github-markdown-css/github-markdown.css"

    export default {
        name: "BlogMainArticle",
        props: {
            article_data: {
                type: [Object],
            },
        },
        data() {
            return {
                theBlog: {
                    title: "",
                    content: "",
                    release_date: "",
                },
                is_like: 0,
                is_dislike: 0,
                is_collect: 0,
                is_corn: 0,
                flags: [0,0,0,0,0],
                buttons_type: [true,false],
                buttons_text: ['赞同','已赞同'],
                collect_icon: ['el-icon-star-off','el-icon-star-on'],
                collect_text: ['收藏','已收藏'],
                corn_icon: ['el-icon-help','el-icon-orange'],
                corn_text: ['投币','已投币'],
            }
        },
        methods: {
           md_render()
           {
               var MarkdownIt=require("markdown-it");
               var md=new MarkdownIt();
               var res=md.render(this.theBlog.content);
               this.theBlog.content=res;
           },
           operations: function(type)
            {
                if(this.flags[type]==1)
                {
                    this.$confirm('确定要取消吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.op_asks(type);
                    }).catch(() => {
         
                    });
                }
                else
                {
                    this.op_asks(type);
                }
            },
            op_asks: function(type)
            {
                console.log(type);
                this.$axios
	                .post("api/giveLlike",{
                        ask_type: type,
                        flag: (this.flags[type]+1)%2,
                        article_id: this.article_data.article_id,
                        user_account: localStorage.getItem("user_account"),
		            })
	                .then(res=>{
                        var state=res.data.state;
                        if(state==1)
                        {
                            this.flags[type]=(this.flags[type]+1)%2;
                        }
	                })
                    .catch(function (error) {
                        console.log("用户点赞等操作出错：\n"+error);
                    });
            }
        },
        created(){
            this.md_render();
            this.$axios
	            .post("api/article/lookIfLike",{
                    user_account: localStorage.getItem("user_account"),
                    article_id: this.article_data.article_id,
		        })
	            .then(res=>{
                    this.flags[1]=res.data.is_like;
                    this.flags[2]=res.data.is_dislike;
                    this.flags[3]=res.data.is_collect;
                    this.flags[4]=res.data.is_corn;
	            })
                .catch(function (error) {
                    console.log("获取用户点赞等信息出错：\n"+error);
                });
        }
    }
</script>
    

<style scoped>
    
    #BlogMainArticleTopBox
    {
        width: 640px;
        height: auto;
        border-bottom-color: rgb(218, 218, 218);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    p.BlogTitleText
    {
        font-size: 26px;
        font-weight: 600;
    }
    #BlogMainArticleContentBox
    {
        width: 640px;
        height: auto;
        padding: 15px 30px;
    }
    #BlogMainArticleBottomBox
    {
        width: 640px;
        height: 30px;
        padding: 10px 30px;
        border-top-color: rgb(218, 218, 218);
        border-top-style: solid;
        border-top-width: 1px;
    }

</style>