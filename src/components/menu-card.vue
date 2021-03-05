<template>
  <el-row class="menu-card" type="flex" justify="start">
    <el-col 
      v-for="item in info" 
      :key="item._id" 
      style="flex:none;" 
      :style="{'margin-left':marginLeft+'px'}"
    >
    <!-- 卡片组件 -->
      <el-card :body-style="{ padding: '0px' }">
        <!-- 菜谱详情 -->
        <router-link :to="{name: 'detail', query:{menuId: item._id}}">
          <img :src="item.product_pic_url" class="image" style="width: 232px;height: 232px;">
          <div style="padding: 14px;" class="menu-card-detail">
            <strong>{{item.title}}</strong>
            <span>{{item.comments_len}} 评论</span>
            <!-- 菜谱作者空间 -->
            <router-link :to="{name:'space', query: {userId: item.userId}}" tag="em">
            {{item.name}}
            </router-link>
          </div>
        </router-link> 
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'menu-card',
  props:{
    marginLeft: {
      type: Number,
      default: 22
    },
    // 使用info接收外部传的数据，渲染到页面
    info:{
      type: Array,
      default:() => []
    }
  }
}
</script>

<style lang="stylus">
.menu-card 
  flex-wrap wrap
  .el-col-24
    width auto
    margin-bottom 20px
    margin-left: 22px
    
  .menu-card-detail
    > *
      display block
    strong 
      height 24px
      line-height 24px
      font-size 14px
      font-weight bold
      color #333
    span 
      height 26px
      line-height 26px
      font-size 12px
      color #999
    em 
      height 23px
      line-height 23px
      font-size 12px
      color #ff3232
</style>

