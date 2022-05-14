<template>
    <div>
        <div class=OneButtonBox>
            <transition name="boxHovering">
                <div class=OneButtonBackground v-if="hovered==1||selected==1"></div>
            </transition>
            <div class=OneButtonTop @click="setSelected(1)" @mouseenter="hovered=1" @mouseleave="hovered=0">
                <p class=ButtonsText :class="{'SelectedText':selected==1,'UnselectedText':selected!=1}">首页</p>
            </div>
            <transition name="lineSelecting">
                <div class=OneButtonBottom v-if="selected==1"></div>
            </transition>
        </div>
        <div class=OneButtonBox>
            <transition name="boxHovering">
                <div class=OneButtonBackground v-if="hovered==2||selected==2"></div>
            </transition>
            <div class=OneButtonTop @click="setSelected(2)" @mouseenter="hovered=2" @mouseleave="hovered=0">
                <p class=ButtonsText :class="{'SelectedText':selected==2,'UnselectedText':selected!=2}">关注</p>
            </div>
            <transition name="lineSelecting">
                <div class=OneButtonBottom v-if="selected==2"></div>
            </transition>
        </div>
        <div class=OneButtonBox>
            <transition name="boxHovering">
                <div class=OneButtonBackground v-if="hovered==3||selected==3"></div>
            </transition>
            <div class=OneButtonTop @click="setSelected(3)" @mouseenter="hovered=3" @mouseleave="hovered=0">
                <p class=ButtonsText :class="{'SelectedText':selected==3,'UnselectedText':selected!=3}">收藏</p>
            </div>
            <transition name="lineSelecting">
                <div class=OneButtonBottom v-if="selected==3"></div>
            </transition>
        </div>
        <div class=OneButtonBox>
            <transition name="boxHovering">
                <div class=OneButtonBackground v-if="hovered==4||selected==4"></div>
            </transition>
            <div class=OneButtonTop @click="setSelected(4)" @mouseenter="hovered=4" @mouseleave="hovered=0">
                <p class=ButtonsText :class="{'SelectedText':selected==4,'UnselectedText':selected!=4}">我的</p>
            </div>
            <transition name="lineSelecting">
                <div class=OneButtonBottom v-if="selected==4"></div>
            </transition>
        </div>
    </div>
</template>


<script>
    export default {
        name: "TopButtons",
        data() {
            return{
                selected: 1,
                hovered: 0,
            }
        },
        methods: {
            setSelected : function(slc){
                this.selected=slc;
                this.$store.commit('set_HomePage_selected',slc);
            },
        }
    }
</script>


<style scoped>
    /*样式*/
    .OneButtonBox
    {
        width: 70px;
        height: 50px;
        background-color: rgba(128, 128, 128, 0);
        float: left;
    }
    .OneButtonTop
    {
        width: 70px;
        height: 35px;
        padding-top: 12px;
    }
    .OneButtonBottom
    {
        width: 70px;
        height: 3px;
        background-color: #67C23A;
    }
    p.ButtonsText
    {
        font-size: 17px;
        color: black;
        text-align: center;
        user-select: none;
        font-weight: 800;
        letter-spacing: 1px;
        margin: auto;
    }
    .OneButtonBackground
    {
        width: 70px;
        height: 50px;
        position: absolute;
        background-color: rgb(236, 236, 236);
        z-index: -1;
    }
    p.SelectedText
    {
        color: #000;
        font-weight: 800;
    }
    p.UnselectedText
    {
        color: gray;
        font-weight: 520;
    }

    /*动画*/
    /*hover*/
    .boxHovering-enter-active
    {
        animation: box-hovering-in .5s;
    }
    .boxHovering-leave-active
    {
        animation: box-hovering-out .5s;
    }
    @keyframes box-hovering-in
    {
        0% {
            background-color: rgba(255, 255, 255, 0);
        }
        100% {
            background-color: rgb(236, 236, 236);
        }
    }
    @keyframes box-hovering-out
    {
        0% {
            background-color: rgb(236, 236, 236);
        }
        100% {
            background-color: rgba(255, 255, 255, 0);
        }
    }
    /*line*/
    .lineSelecting-enter-active
    {
        animation: line-selecting-in .5s;
    }
    .lineSelecting-leave-active
    {
        animation: line-selecting-out .5s;
    }
    @keyframes line-selecting-in
    {
        0% {
            opacity: 0;
            /*transform: scaleX(0);*/
        }
        100% {
            opacity: 1;
            /*transform: scaleX(1);*/
        }
    }
    @keyframes line-selecting-out
    {
        0% {
            opacity: 1;
            /*background-color: #67C23A;*/
        }
        100% {
            opacity: 0;
            /*background-color: white;*/
        }
    }
</style>