<template>
  <div class="edit">
    <div class="edit-item">
      <span class="label">修改头像</span>
<<<<<<< HEAD
      <upload-img
        action = '/api/upload?type=user'  
        :imageUrl="avatar"
        imgMaxWidth="210"
        @res-url="(data) => {avatar=data.resImgUrl}"
=======
      <upload-img 
        action="/api/upload?type=user"
        :image-url="avatar"
        img-max-width="210"
        @res-url="(data) => {avatar = data.resImgUrl;}"
>>>>>>> again2
      ></upload-img>
    </div>
    <div class="edit-item">
      <span class="label">修改名称</span>
      <div>
<<<<<<< HEAD
        <el-input v-model="name" class="create-input" placeholder="请输入内容"></el-input>
=======
        <el-input class="create-input" placeholder="请输入内容" v-model="name"></el-input>
>>>>>>> again2
      </div>
    </div>
    <div class="edit-item">
      <span class="label">个人简介</span>
      <div>
<<<<<<< HEAD
        <el-input  v-model="sign"  type="textarea" class="create-input" placeholder="请输入内容"></el-input>
=======
        <el-input v-model="sign" type="textarea" class="create-input" placeholder="请输入内容"></el-input>
>>>>>>> again2
      </div>
    </div>
    <div>
      <el-button 
      class="send" 
      type="primary" 
      size="medium"
<<<<<<< HEAD
      @click="save"
=======
      @click="changeUserInfo"
>>>>>>> again2
    >保存</el-button>
    </div>
  </div>
</template>
<script>
<<<<<<< HEAD
import UploadImg from '@/components/upload-img'
import {userEdit} from '@/service/api'
=======
import UploadImg from '@/views/create/upload-img'
import {userEdit} from '@/service/api.js'
>>>>>>> again2
export default {
  components: {UploadImg},
  data(){
    const userInfo = this.$store.state.userInfo;
    return {
      avatar: userInfo.avatar,
      name: userInfo.name,
<<<<<<< HEAD
      sign:userInfo.sign
    }
  },
  methods:{
    async save(){
      let data = await userEdit({avatar: this.avatar, name: this.name, sign: this.sign});
      if(data.code === 0){
        this.$router.push({
          name: 'space'
        })
      }
=======
      sign: userInfo.sign
    }
  },
  methods:{
    async changeUserInfo(){
      const data = await userEdit({name: this.name,avatar: this.avatar, sign: this.sign});
      this.$router.push({
        name: 'space'
      })
>>>>>>> again2
    }
  }
}
</script>
<style lang="stylus">
.edit
  background-color #fff
  padding 10px 0 20px 20px
  .edit-item 
    display flex
    margin-bottom 20px
    .label
      margin-right 10px
</style>