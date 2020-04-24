<template>
  <div class="header">
    <div class="header-logo">
        <router-link to="/">
            <img src="@/assets/lgo.png" />
        </router-link>
    </div>
    <div class="header-center">
        <el-menu :default-active="activeIndex" class="el-menu-demo myU" style="border-bottom:solid 0px #e6e6e6" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
            <router-link to="/doTest">
                在线测试
            </router-link>
        </el-menu-item>
        <el-menu-item index="2">
             <router-link to="/examView">
                题库中心
            </router-link>
        </el-menu-item>
            <el-menu-item index="3">
                <router-link to="/articleView">
                  论坛区
               </router-link>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="header-info">
        <template v-if="token===''">
            <el-dropdown>
                <router-link :to="{path:'/admin/login'}">
                    <span class="el-dropdown-link" style="color:white;margin-top:15px">
                        登录
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                </router-link>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>注册</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
        <template v-if="token !==''">
            <el-dropdown>
                    <span class="el-dropdown-link" style="color:white;margin-top:15px">
                        个人中心
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  >
                        <a  @click="TOlogout()">注销</a>
                    </el-dropdown-item>
                    <el-dropdown-item>注册</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
        
    </div>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  methods:{
      TOlogout() {
          let that = this;
          this.$store.dispatch('logout').then(() =>{
              this.$router.push({path:'/'});
          }).catch(error =>{
              if(error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
          })
      }
  },
  computed:{
      token: function(){
          if(typeof(this.$store.state.token) === 'undefined') {
              return '';
          }
          return this.$store.state.token;
      }
  }
};
</script>
<style>

*{
    margin:0;
    padding: 0;
}

.header{
    width: 100%;
    height: 60px;
    background-color:black;
    position: fixed;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
font-size: 12px;
}
.header-logo{
    width:120px;
    height: 100%;
    background-color: seagreen;
    float: left;
}

.header-logo img{
    width:100%;
    height: 100%;
}

.header-center{
    width:calc(100% - 320px);
    height: 100%;
    float: left;
}


.header-info{
    width: 200px;
    height: 100%;
    float: right;
}

.header-info div{
    margin-top:10px;
}

.header-center ul{
    background-color: black;
    border-bottom: solid 0px black;
}
.header-center ul li a{
    text-decoration: none;
}

.el-menu--horizontal>.el-menu-item {
    color: white;
}

.el-menu--horizontal>.el-menu-item.is-active{
    color:white;
}

</style>