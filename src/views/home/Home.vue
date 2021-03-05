<template>
  <div class="home">
    <!-- 轮播 start -->
    <el-carousel :interval="5000" type="card" height="300px">
      <el-carousel-item v-for="item in banners" :key="item._id">
<<<<<<< HEAD
        <router-link :to="{name: 'detail', query: {menuId: item._id}}">
          <img 
            :src="item.product_pic_url" 
            width="100%"
            alt=""
          >
        </router-link>
=======
        <img 
          :src="item.product_pic_url" 
          width="100%"
          alt=""
        >
>>>>>>> again2
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播 end -->
    <!-- 内容精选 瀑布流形式 start -->
    <div>
      <h2>内容精选</h2>
<<<<<<< HEAD
      <waterfall ref="waterfall" @view="loadingMenuHandle">
        <menu-card :margin-left="13" :info="menuList"></menu-card>
=======
      <!-- :info='info' -->
      <waterfall @view="viewHandle" ref="waterfall">
        <menu-card :margin-left="13" :info="list"></menu-card>
>>>>>>> again2
      </waterfall>
    </div>
  </div>
</template>

<script>
import MenuCard from '@/components/menu-card.vue'
import Waterfall from '@/components/waterfall.vue'
import {getBanner, getMenus} from '@/service/api.js'

export default {
  name: 'home',
  components: {
    MenuCard: MenuCard,
    Waterfall
  },
  data(){
    return {
<<<<<<< HEAD
      banners: [],
      menuList: [],
      page: 1
    }
  },
  mounted(){

    // 菜谱图片
    getBanner().then((data) => {
      this.banners = data.data.list;
    })
    // 具体菜谱的详情
    getMenus({page: this.page}).then((data) => {
      this.menuList = data.data.list;
      // 总页数，向上取整
      this.pages = Math.ceil(data.data.total/data.data.page_size);
    })
  },
  methods:{
    loadingMenuHandle(){
      console.log('在外监听的，已到可视区')
      this.page++;
      // 当前页大于总页数，停止
      if(this.page > this.pages){
        // 通过ref拿到组件的实例并改变isLoading
        this.$refs.waterfall.isLoading = false;
        return;
      }
      this.$refs.waterfall.isLoading = true;
      // 获取下一页的getMenus
      getMenus({page: this.page}).then((data) => {
        this.menuList.push(...data.data.list);
        this.$refs.waterfall.isLoading = false;
      })

=======
      list: [],
      banners:[],
      page: 1,
      totalPages: 0
    }
  },
  mounted(){
    getBanner().then((data) => {
      this.banners = data.data.list;
    })
    getMenus({page: this.page}).then((data) => {
      const {total,page_size} = data.data;
      this.list = data.data.list;
      this.totalPages = Math.ceil(total/page_size);
    })
  },
  methods:{
    viewHandle(){
      this.page++;
      if(this.page > this.totalPages ) {
        this.$refs.waterfall.isLoading = false;
        return;
      }
      
      getMenus({page: this.page}).then((data) => {
        this.list.push(...data.data.list);
        this.$refs.waterfall.isLoading = false;
      })
>>>>>>> again2
    }
  }
}
</script>
<style lang="stylus">
.home 
  h2
    text-align center
    padding 20px 0;

  .el-carousel__item h3 
    color #475669
    font-size 14px
    opacity 0.75
    line-height 200px
    margin 0
  

  .el-carousel__item:nth-child(2n) 
    background-color #99a9bf
  

  .el-carousel__item:nth-child(2n+1) 
    background-color #d3dce6
  
</style>

