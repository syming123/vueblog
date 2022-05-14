<template>
    <div id=BlogOneCommentMainBox>
        <p class=BlogOneCommentTopText @click="goToOnePersonalCenter()">{{commentData.comment_author}}</p>
        <p class=BlogOneCommentMiddleText>{{commentData.comment_content}}</p>
        <p class=BlogOneCommentEndText>{{commentData.comment_publish_time}}</p>
    </div>
</template>


<script>
    export default {
        name: "BlogOneComment",
        props: {
            commentData: {
            type: [Object],
            },
        },
        data() {
            return {
                
            }
        },
        methods: {
           goToOnePersonalCenter: function(){
               this.$router.push({
                    name:'PersonalCenter',
                    query: {
　　　　                host: this.commentData.comment_author_account,
　　                }
                });
           },
        },
    }
</script>
    

<style scoped>
    #BlogOneCommentMainBox
    {
        width: 640px;
        height: auto;
        padding: 10px 30px;
        border-bottom-color: rgb(218, 218, 218);
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    p.BlogOneCommentTopText
    {
        font-size: 16px;
        font-weight: 600;
        user-select: none;
        cursor: pointer;
    }
    p.BlogOneCommentMiddleText
    {
        font-size: 15px;
        color: gray;
        margin-top: 3px;
    }
    p.BlogOneCommentEndText
    {
        font-size: 15px;
        color: rgb(201, 201, 201);
        margin-top: 8px;
    }


</style>