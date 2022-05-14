<template>
    <div>
        <transition name="pageSwitch">
            <page-part :dataList="PagePartData_1" v-if="this.$store.getters.get_HomePage_selected==1"></page-part>
        </transition>
        <transition name="pageSwitch">
            <page-part :dataList="PagePartData_2" v-if="this.$store.getters.get_HomePage_selected==2"></page-part>
        </transition>
        <transition name="pageSwitch">
            <page-part :dataList="PagePartData_3" v-if="this.$store.getters.get_HomePage_selected==3"></page-part>
        </transition>
        <transition name="pageSwitch">
            <page-part :dataList="PagePartData_4" v-if="this.$store.getters.get_HomePage_selected==4"></page-part>
        </transition>
        <transition name="pageSwitch">
            <page-part :dataList="PagePartData_5" v-if="this.$store.getters.get_HomePage_selected==5"></page-part>
        </transition>
    </div>
</template>


<script>
import PagePart from './HomePagePart.vue'

    export default {
        components: { 
            "page-part" : PagePart,
        },
        name: "HomePageMainLeft",
        data() {
            return{
                PagePartData_1:{
                    page_id : 1,
                },
                PagePartData_2:{
                    page_id : 2,
                },
                PagePartData_3:{
                    page_id : 3,
                },
                PagePartData_4:{
                    page_id : 4,
                },
                PagePartData_5:{
                    page_id : 5,
                },
            }
        },
        methods: {
            
        }
    }
</script>


<style scoped>
    @import "../../assets/css/Animations.css";

</style>