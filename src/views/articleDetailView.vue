<template>
  <div  :style="{height:scrollerHeight}" class="contain-articleDetailView">
    <div class="breadStyle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/articleView' }"><span style="cursor:pointer">讨论区</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }"><span >文章详情</span></el-breadcrumb-item>
      </el-breadcrumb>      
    </div>
    <div class="center-wrappe-articleDetailViewr">
        <div class="center-container-articleDetailViewr">
            <div class="articleDetailViewr-wrapper-center">
                 <el-card class="articleCard">
                     <div class="personinf-div">
                         <h1>{{articleData.title}}</h1>
                         <div>
                             <!-- <img :src="articleData.sysUser.avatar" > -->
                             <span style="margin-left: 85px;">
                                <a href="" >
                                    {{articleData.sysUser.userName}}
                                </a>
                              </span>
                              <div class="personinf-article">
                                 <div>
                                     <span>编辑于 {{articleData.createTime | formatDate}}</span>
                                 </div>
                                 <div>
                                    <span>评论</span>
                                     <span>{{articleData.commentCounts}}</span>
                                    <span>|</span>
                                    <span>浏览</span>
                                    <span>{{articleData.viewCounts}}</span>
                                 </div>
                             </div>
                          </div>   
                     </div>
                     <el-divider></el-divider>
                     <article v-html="articleData.articleBody.contentHtml" class="articleStyle" ref="articleContent" >
                         {{articleData.articleBody.content}}
                     </article>
                 </el-card>
                <div>
                    <el-card class="comment-card">
                        <div  class="clearfix-huifu">
                            <span>13条回复</span>
                             <el-button type="primary">评论</el-button>
                        </div>
                        <div class="item-comment">
                            <img src="~@/assets/logo.png" />
                            <div class="comment-container">
                                <p>name</p>
                                <div>
                                    sss
                                    <br><br><br><br>
                                </div>
                                <div class="comment-bottom">
                                    发表于 2020-04-14 20:55:05
                                    <a href="">回复</a>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div class="selfDeticalArticle">
                <el-card class="selfDeticalArticle-card">
                    <div slot="header" class="clearfix">
                        <span>作者文章</span>
                    </div>
                    <div v-for="(item,index) in userArticle" :key="index" class="titileDiv">
                         <a @click="ReadArticleDetail(item.id,item.sysUser.userId)">{{item.title}} </a>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getArticleViewWithParams,getArticleByUid} from  '@/api/ArticleView' 

export default {
  data () {
    return {
        page:{
           pageNum:1,
           pageSize:5,
           orderByColumn:'',
           isAsc:'desc'
         },
         articleData:{},
         userArticle:[]
    };
  },

  computed: {
    scrollerHeight: function() {
        return (document.documentElement.clientHeight + 800) + 'px';
    }
  },
  created(){
    this.getArticleDetail();
    this.getArticleByUid(this.$route.query.uid);
     
  },
  watch:{
      '$route'(to,from) {
        this.getArticleDetail();
        this.getArticleByUid(this.$route.query.uid);
      }
  },
  methods: {
      getArticleDetail() {
           
          let that = this;
          this.pageNum = this.$route.query.pageNum;
          let data = {
              id:this.$route.query.id,
              categoryId:this.$route.query.categoryId
          }
          getArticleViewWithParams(this.page,data).then(res =>{
              console.log(res);
              that.articleData = res.data[0];
              console.log( that.articleData.sysUser);
              console.log(res);
          })
      },
      getArticleByUid(uid) {
          let that = this;
          getArticleByUid(uid).then(res =>{
              console.log(res);
              that.userArticle = res.data;
          })
      },
        ReadArticleDetail(id,uid) {
           let pageNum = this.$route.query.pageNum;
           let times = Math.floor(Math.random()*305 + 1);
           this.$router.push({path:'articleDetailView',query:{id:id,pageNum:pageNum,uid:uid,which:times}});
       }
  },
     filters:{
        formatDate:function (val) {
        var value=new Date(val);
        var year=value.getFullYear();
        var month = value.getMonth()+1;
        var day = value.getDate();
        return year+'-'+month+'-'+day;
    }
   }
}

</script>
<style>

/* 
---------------面包屑
*/
.breadStyle{
  width: 80%;
  margin: 20px auto;
  font-size: 13px;
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
  font-size: 25px;
  cursor: pointer;
}
 
 .el-breadcrumb {
    width: 80%;
    margin: 0 auto;
}
/* 
------------
*/
.contain-articleDetailView{
    padding-top: 60px;
}

.center-wrappe-articleDetailViewr{
  width: 80%;
  height: 50%;
  margin: 0 auto;
}

.center-container-articleDetailViewr{
    width: 80%;
    height: 100%;
    margin:0 auto;
    display: flex;
}

.articleDetailViewr-wrapper-center{
    width: 70%;
    margin:0 auto;
}
.selfDeticalArticle{
    width: 30%;
    margin-left: 13px;
}
.selfDeticalArticle-card{
    width: 100%;
}

.box-card {
    width: 480px;
}

.articleCard{
    width: 100%;
    height: 100%;
}

.personinf-div img{
    width: 60px;
    height: 60px;
    position: absolute;
}

.personinf-article div:nth-child(1) {
    width:60%;
    float: left;
}

.personinf-article div:nth-child(2) {
    float: right;
}

.personinf-article{
    width:360px;
    height: 30px;
    margin-top:6px;
    margin-left: 80px;
    margin-top: 13px;
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 6px 0;
}

.clearfix-huifu{
    margin-bottom: 10px;
    height:48px;
    font-size: 26px;
}

.clearfix-huifu button{
    float: right;
}

.comment-card{
    margin-top: 9px;
}

.item-comment img{
    width: 60px;
    height: 60px;
    display: flex;
}

.item-comment{
    display: flex;
}

.comment-container{
    margin-left: 8px;
    width:100%;
}

.comment-bottom{
    margin-top:8px;
    width: 100%;
}
.comment-bottom a{
    float:right
}

.comment-container p{
    color:maroon;
    font-size: 18px;
}

.comment-container div:nth-child(2){
    margin-top:8px;
}

.titileDiv{
    margin:8px;
}

.articleStyle img{
    width: 100px;
    height:100px;
}

</style>