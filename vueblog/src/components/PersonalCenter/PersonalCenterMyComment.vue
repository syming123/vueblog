<template>
    <div id=PersonalCenterMyCommentMainBox>
        
    </div>
</template>


<script>
import PersonalCenterOneState from './PersonalCenterOneState.vue'

    export default {
        components: { 
            "personal-center-one-state" : PersonalCenterOneState,
        },
        name: "PersonalCenterMyComment",
        props: {
            hostData: {
            type: [Object],
            },
        },
        data() {
            return {
                
            };
        },
        methods: {
            
        },
    }

</script>


<style scoped>
    #PersonalCenterMyCommentMainBox
    {
        position: absolute;
        width: 900px;
        height: 300px;
        background-color: white;
        box-shadow: 0px 1px 3px 1px rgb(212, 212, 212);
        padding-top: 10px;
        padding-bottom: 20px;
    }


</style>