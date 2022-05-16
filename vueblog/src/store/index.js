import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:
  {
    /*全局常量*/
    IP_ADDRESS : "localhost",
    PORT : "8080",




    /*Login*/
    Login_loginOrRegister : 1, //1为登录，2为注册



    /*HomePage*/
    HomePage_selected : 1, //选择的页面

    /*searching box*/
    searching_box_content : "", //搜索框输入内容



    /*go to article*/
    target_article: 0,


    /*go to personal center*/
    personal_center_host: "",

    

  },
  mutations:
  {
    /*Login*/
    set_Login_loginOrRegister(state,choice){
      state.Login_loginOrRegister=choice;
    },
    /*HomePage*/
    set_HomePage_selected(state,selected){
      state.HomePage_selected=selected;
    },
    /*searching box*/
    set_searching_box_content(state,content){
      state.searching_box_content=content;
    },
    /*go to article*/
    set_target_article(state,target){
      state.target_article=target;
    },
    /*go to personal center*/
    set_personal_center_host(state,host)
    {
      state.personal_center_host=host;
    },

  },
  getters:
  {
    /*全局常量*/
    GET_IP_ADDRESS : state => state.IP_ADDRESS,
    GET_PORT : state => state.PORT,



    /*Login*/
    get_Login_loginOrRegister : state => state.Login_loginOrRegister,
    /*HomePage*/
    get_HomePage_selected : state => state.HomePage_selected,
    /*searching box*/
    get_searching_box_content : state => state.searching_box_content,
    /*go to article*/
    get_target_article : state => state.target_article,
    /*go to personal center*/
    get_personal_center_host : state => state.personal_center_host,

  },
  actions:
  {

  },
  modules:
  {

  }
})
