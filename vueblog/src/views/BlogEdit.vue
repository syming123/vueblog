<template>
    <div id=BlogEditMainBox>
        <div id=BlogEditTopBox>
            <el-page-header @back="backToHome()" content="编辑文章" style="float:left;margin-top:5px;"></el-page-header>
            <el-button type="primary" size="small" style="float:right;margin-right:30px;" @click="articleSubmit()">发表</el-button>
            <el-button type="primary" size="small" plain style="float:right;margin-right:20px;" @click="articleSave()">暂存</el-button>
        </div>
        <div id=BlogEditTitleBox>
            <input placeholder="单击此处输入标题" v-model="article.title">
        </div>
        <div>
            <mavon-editor
  	        :placeholder="'开始创作···'"
  	        :toolbars="toolbars"
  	        :toolbarsBackground="'#f9f9f9'"
  	        ref="md"
  	        style="height: 620px"
  	        v-model="article.content"
	        />
        </div>
    </div>
</template>


<script>
    export default {
        name: "BlogEdit",
        data() {
            return {
                article_id: "",
                article:{
                    title : "",
                    content : ""
                },
                //参数
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: false, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    navigation: true, // 导航目录
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: false // 预览
                },
            }
        },
        methods: {
            backToHome(){
                this.$router.push({name:'HomePage',});
            },
            articleSave: function(){
                this.$axios
	                .post("api/article/storageArticletemporarily",{
			            article_id: this.article_id,
                        author_account: localStorage.getItem("user_account"),
                        article_title: this.article.title,
                        article_content: this.article.content,
		            })
	                .then(res=>{
		                var state=res.data.state;
                        if(state==-1)
                        {
                            this.$message.error('文章暂存失败');
                        }
                        else if(state==1)
                        {
                            this.$message({
                                message: '文章暂存成功',
                                type: 'success'
                            });
                        }
                        else
                        {
                            this.$message.error('未知错误');
                        }
	                })
                    .catch(function (error) {
                        console.log("暂存文章出错：\n"+error);
                    });
            },
            articleSubmit: function(){
                this.$axios
	                .post("api/article/storageArticleSolid",{
			            article_id: this.article_id,
                        author_account: localStorage.getItem("user_account"),
                        article_title: this.article.title,
                        article_content: this.article.content,
		            })
	                .then(res=>{
		                var state=res.data.state;
                        if(state==-1)
                        {
                            this.$message.error('文章发表失败');
                        }
                        else if(state==1)
                        {
                            this.$message({
                                message: '文章发表成功，3秒后将返回主页',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.$router.push({name:'HomePage'});
                            }, 3000)
                        }
                        else
                        {
                            this.$message.error('未知错误');
                        }
	                })
                    .catch(function (error) {
                        console.log("发表文章出错：\n"+error);
                    });
            }
        },
        created(){
            this.article_id=this.$route.query.article_id;
            console.log(this.article_id);
            this.$axios
	            .post("api/article/getTemporaryStorageArticle",{
			        article_id: this.article_id,
                    author_account: localStorage.getItem("user_account"),
		        })
	            .then(res=>{
		            var edit_type=res.data.return_type;
                    this.article.title=res.data.article_title;
                    this.article.content=res.data.article_content;
                    if(edit_type==2)
                    {
                        this.$message('已自动为您加载上次暂存内容');
                    }
	            })
                .catch(function (error) {
                    console.log("获取待编辑文章信息出错：\n"+error);
                });
        }
    }
</script>


<style scoped>
    #BlogEditMainBox
    {
        width: 1000px;
        height: 780px;
        margin: auto;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
    }
    #BlogEditTopBox
    {
        width: 960px;
        height: 40px;
        padding-top: 10px;
        padding-left: 40px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: rgb(187, 187, 187);
        margin-bottom: 20px;
    }
    #BlogEditTitleBox
    {
        width: 1000px;
        height: auto;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: rgb(233, 233, 233);
        margin-bottom: 20px;
    }
    input
    {
        border:none;
        outline-style:none;
        width: 880px;
        height: 50px;
        font-size: 28px;
        font-weight: 600;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 50px;
    }

</style>