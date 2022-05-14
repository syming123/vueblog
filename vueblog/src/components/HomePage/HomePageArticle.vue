<template>
    <div id=ArticleMainBox>
        <div id=LineBox>
            <p class=TitleText @click="goInTheArticle()">{{articleData.article_title}}</p>
            <p class=ContentText>{{articleData.article_content}}</p>
            <div id=BottomBox>
                <el-button type="primary" :plain='buttons_type[flags[1]]' icon="el-icon-caret-top" size="mini" style="padding-left:8px;padding-right:10px;" @click="operations(1)">{{buttons_text[flags[1]]}} {{articleData.article_like}}</el-button>
                <el-button type="primary" :plain='buttons_type[flags[2]]' icon="el-icon-caret-bottom" size="mini" style="padding-left:8px;padding-right:8px;" @click="operations(2)"></el-button>
                <el-button type="text" icon="el-icon-chat-dot-round" style="margin-left:30px;" @click="goInTheArticle()">{{articleData.article_comment}} 条评论</el-button>
                <el-button type="text" :icon="collect_icon[flags[3]]" style="margin-left:30px;" @click="operations(3)">{{collect_text[flags[3]]}}</el-button>
                <el-button type="text" :icon="corn_icon[flags[4]]" style="margin-left:30px;" @click="operations(4)">{{corn_text[flags[4]]}}</el-button>
                <p class=ContentText style="float:right;margin-right:25px;cursor:pointer;" @click="goToAuthor()">{{articleData.article_author}}</p>
                <p class=ContentText style="float:right;margin-right:8px;">作者:</p>
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
            goInTheArticle: function()
            {
                //this.$store.commit('set_target_article',this.articleData.article_id);
                this.$router.push({
                    name:'Blog',
                    query: {
　　　　                article_id: this.articleData.article_id,
　　                }
                });
            },
            goToAuthor: function(){
                this.$router.push({
                    name:'PersonalCenter',
                    query: {
　　　　                host: this.articleData.article_author,
　　                }
                });
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
                        article_id: this.articleData.article_id,
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
            this.$axios
	                .post("api/article/lookIfLike",{
                        user_account: localStorage.getItem("user_account"),
                        article_id: this.articleData.article_id,
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
    #ArticleMainBox
    {
        width: 693px;
        /*height: auto;*/
        background-color: rgb(255, 255, 255);
    }
    #LineBox
    {
        width: 615px;
        height: auto;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgb(182, 182, 182);
        margin-left: 40px;
    }
    p.TitleText
    {
        font-size: 18px;
        margin-top: 20px;
        cursor: pointer;
    }
    p.ContentText
    {
        font-size: 14px;
        color: gray;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #BottomBox
    {
        width: 615px;
        height: 40px;
    }

    

</style>