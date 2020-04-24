<template>
    <div :style="{height:scrollerHeight,backgroundColor:'#EEEEEE'}" class="contain-test">
        <div :style="{height:'380px',marginBottom:'30px',width:'100%',backgroundImage:'url('+img+')', backgroundRepeat : 'no-repeat',backgroundSize:'100%'}">
        </div>
        <div class="article-center-wrapper">    
            <div class="article-container">
                <el-card >
                    <div slot="header" class="clearfix">
                        <a @click="newestArticleView()" :class="[NewEstArticle?'activeA':'']">最新发布</a>
                        <a @click="hotArticleView()" :class="[HotEstArticle?'activeA':'']" style="border-left:1px solid #888888;padding-left:8px">经典文章</a>
                        <el-button style="float:right" type="primary" @click="pulishArticle()">发布文章</el-button>
                    </div>
                        <div v-for="(item,index) in articleData" :key="index">
                            <div class="content-top">
                                <img src="@/assets/articleV.png"/>
                                <a >
                                   {{item.sysUser.userName}}
                                </a>
                                <span style="float:right">{{item.createTime | formatDate}}</span>
                            </div>
                            <div class="content-center">
                                <a @click="ReadArticleDetail(item.id,item.sysUser.userId,item.articleCategory.id)">
                                    {{item.title}}
                                </a>
                                <h3>{{item.summary}}</h3>
                            </div>
                            <div class="content-bottom">
                                <div>
                                    <span>来自:{{item.articleCategory.categoryname}}</span>
                                </div>
                                <div>
                                    <span>
                                        <i class="v-icon-custom icon-pinglun"></i>
                                        评论:{{item.commentCounts}}
                                    </span>
                                    <span>
                                        <i class="v-icon-custom icon-liulan"></i>
                                         浏览:{{item.viewCounts}}
                                    </span>
                                </div>
                            </div>
                           <el-divider></el-divider>   
                        </div>
                </el-card>
            </div>
            <div class="module-left">
                <div>
                    <el-card  >
                         <div slot="header" class="clearfix">
                            <strong>分类</strong>
                        </div>
                        <div class="module-narbar">
                            <div v-for="(item,index) in articleCategory" :key="index">
                                <img :src="item.avatar" />
                                <br>
                                <a @click="categoryView(item.id)">{{item.categoryname}}</a>
                            </div>
                        </div>
                     </el-card>
                </div>
                <div>
                    <el-card >
                        <div slot="header" class="clearfix">
                            <strong>标签</strong>
                        </div>
                        <div class="module-narbar">
                            <div v-for="(item,index) in articleTagData" :key="index">
                                <img :src="item.avatar" />
                                <br>
                                <a @click="tagView(item.id)">{{item.tagName}}</a>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getArticleView,getArticleCategory,getArticleTag,getArticleAllList,getArticleViewWithParams} from '@/api/ArticleView' 
export default {
  data () {
    return {
        img:require('@/assets/examsahead.jpg'),
        page:{
           pageNum:1,
           pageSize:5,
           orderByColumn:'',
           isAsc:'desc'
         },
         articleData:[],
         articleTagData:[],
         articleCategory:[],
         NewEstArticle:true,
         HotEstArticle:false,
         scrollerHeight:''
    };
  },
  computed: {
    scrollerHeight:  {
        get() {
            let leng = this.articleData.length;
            return (document.documentElement.clientHeight+leng *160 ) + 'px';
        } 
    },
    scrollerWidth: function() {
        return (document.documentElement.clientWidth) + 'px';
    }   
  },
  watch:{
      scrollerHeight:{
          handler(newValue,oldValue) {
              console.log('wwwwwwwwwwwwwwwwwww::new' + newValue);
              console.log('wwwwwwwwwwwwwwwwwww::old' + oldValue);
              var newIndex =  newValue.indexOf('px');
              var newVal = newValue.substr(0,newIndex);
              var oldIndex =  oldValue.indexOf('px');
              var newVal = newValue.substr(0,newIndex);
              var oldVal = oldValue.substr(0,oldIndex);
              console.log(newVal);
              console.log(oldVal);
              if(oldVal <= newVal) {
                  this.scrollerHeight = oldValue;
              }
          }
      }
  },
  created(){
    this.getArticleVo();
    this.getArticleTagVo();
    this.getArticleCategoryVo();
   },
   methods:{
       getArticleVo(){
        let that = this;
        getArticleView(this.page).then(res =>{
            console.log(res);
            that.articleData = res.data;
        });
       },
       getArticleTagVo(){
        let that = this;
        getArticleTag().then(res =>{
            that.articleTagData = res.data;
        });
       },
       getArticleCategoryVo(){
        let that = this;
        getArticleCategory().then(res =>{
            that.articleCategory = res.data;
        });
       },
       newestArticleView() {
        let that = this;
        this.NewEstArticle = true;
        this.HotEstArticle = false;
        this.page.orderByColumn='create_time';
        this.page.isAsc='desc';
        getArticleView(this.page).then(res =>{
            console.log(res);
            that.articleData = res.data;
        })
       },
       hotArticleView() {
        let that = this;
        this.HotEstArticle = true;
        this.NewEstArticle = false;
        this.page.orderByColumn='weight';
        this.page.isAsc='desc';
        getArticleView(this.page).then(res =>{
            console.log(res);
              that.articleData = res.data;
        })
       },
       categoryView(id) {
           let that = this;
           var data = {
                categoryId:id
           };
           getArticleViewWithParams(this.page,data).then(res =>{
                that.articleData = res.data;
                console.log(res.data);
           })    
       },
       tagView(id) {
            let that = this;           
           getArticleAllList(this.page,id).then(res=>{
                that.articleData = res.data;
           })
       },
       ReadArticleDetail(id,uid,categoryId) {
        //    alert(categoryId);
           console.log(this.articleData);
           this.$router.push({path:'articleDetailView',query:{id:id,pageNum:this.page.pageNum,uid:uid,categoryId:categoryId}});
       },
       pulishArticle() {
           //作登录判断：
           
           this.$router.push({path:'/articleWrite'})

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
<style >

/**初始化**/
.contain-test{
  padding-top: 60px;
}
.article-center-wrapper{
  width: 70%;
  margin:  0 auto;
  position: relative;
  display: flex;
}

.breadStyle{
  width: 80%;
  margin: 20px auto;
  font-size: 13px;
}

.article-container{
    width: 70%;
    height: 100%;
    margin:12px;
}
/***/

.module-left{
    width:30%;
margin:12px;
}

.module-left div{
    margin-bottom: 15px;
}

.content-top img{
    width: 50px;
    height: 50px;
    border-radius: 30px;
    float:left
}
.activeA{
    border: 1px solid #000;
    border-radius: 5px;
}

.content-bottom{
    display: flex;
    justify-content:space-between;
}

.content-bottom div{
    float: right;
}

h3{
    color: #888888;
}

.content-top{
    width: 100%;
    height: 52px;
}

.content-top a{
    margin-left: 20px;
     float: left;
     margin-top: 20px;
     text-decoration: none;
    color: #000;
}

.content-center a{
    font-size: 26px;
    text-decoration: none;
    color: #000;
}

.content-center{
    margin-top:10px;
}

.clearfix a{
    text-decoration: none;
    color: #888888;
    font-size: 26px;
    cursor: pointer;
    padding:3px;
}
.article-container a:hover{
    color:mediumblue;
}

.module-left strong{
    color: #000;
    font-size: 26px;
}

.module-narbar{
    display: flex;
    flex-wrap:wrap
}

.module-narbar div{
    margin: 6px;
    text-align: center;
}

.module-narbar img{
    width:80px;
    height: 70px;
}

 



</style>