<template>
  <div :style="{height:scrollerHeight,backgroundColor:'#EEEEEE'}" class="contain-write">
    <div class="write-container">
      <div class="write-container-wrapper">
        <div class="write-container-center">
          <div class="write-center">
            <div class="write-top">
                <el-input v-model="article.articleTitle" placeholder="文章标题"></el-input>
                <el-input v-model="article.articleSummary" placeholder="文章概要"></el-input>
                 
            </div>
            <mavon-editor v-model="article.articleBody" ref="md" @change="change" @imgAdd="imgAddFun" style="min-height: 600px" />
            <el-button class="write-btn" type="primary" @click="saveArticle">发布</el-button>
            <el-button class="write-btn" type="warning" @click="backOperate">返回</el-button>
            <el-dialog
                title="文章详细"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-divider content-position="left">分类</el-divider>
                  <el-radio-group v-model="article.categoryId">
                    <el-radio :label="item.id" v-for="(item,index) in articleCategory" :key="index">{{item.categoryname}}</el-radio>
                  </el-radio-group>
                  <br>
                     <el-divider content-position="left">标签</el-divider>
                     <div class="checkBoxDiv">
                           <el-checkbox v-model="article.tagId" :label="item.id" v-for="(item,index) in articleTag" :key="index">{{item.tagName}}</el-checkbox>
                     </div>
                        <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="ToSaveArticle()">确 定</el-button>
                </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组件 及 组件样式
// import "mavon-editor/dist/css/index.css";
import { mavonEditor } from "mavon-editor";
import {getArticleCategory,getArticleTag,saveArticle,saveArticleContent} from '@/api/ArticleView' 

export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      content: "", // 输入的markdown
      html: "" ,// 及时转的html
      article:{
        articleTitle:'',
        articleSummary:'',
        categoryId:-1,
        tagId:[],
        articleBody:'',
        articleBodyHtml:''
      },
      dialogVisible: false,
      articleCategory:[],
      articleTag:[],
      categoryId:'',
      tagId:[]
      
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.article.articleBodyHtml = render;
    },
    // 提交
    saveArticle() {
      console.log(this.content);
      console.log(this.html);
  
      console.log(this.article.articleTitle.trim());
      if(this.article.articleTitle.trim().length == 0) {
         this.$message({
          message: '请填写文章标题哦',
          type: 'warning'
        });
        return;
      }
      if(this.article.articleSummary.trim().length == 0) {
         this.$message({
          message: '请填写文章概要哦',
          type: 'warning'
        });
        return;
      }
       if(this.article.articleBody.trim().length == 0) {
         this.$message({
          message: '正文还没写呢！',
          type: 'warning'
        });
        return;
      }
      this.dialogVisible = true; 
      this.getAllCategory();
      this.getAllTag();
    },
    backOperate() {
      this.$router.push('/articleWrite');
    },
    getAllCategory() {
      let that = this;
      getArticleCategory().then(res =>{
        console.log(res);
        that.articleCategory = res.data;
      })
    },
    getAllTag() {
      let that = this;
      getArticleTag().then(res =>{
        console.log(res);
        that.articleTag = res.data;
      })
    },
    ToSaveArticle() {
      console.log(this.article);
      console.log(this.article.categoryId);
      if(this.article.categoryId=== -1) {
         this.$message({
          message: '请选择类别',
          type: 'warning'
        });
        return ;
      }
      saveArticleContent(this.article).then(res =>{
        console.log(res);
      })
    },
    imgAddFun(pos,$file) {
      console.log('pos:' + pos);
      console.log('$file:' + $file);
      let that = this;
       let formdata = new FormData();
       formdata.append('images',$file);
      saveArticle(formdata).then(res =>{
        console.log(res);
        that.$refs.md.$img2Url(pos,res.data);
      })
    }
  },

  computed: {
    scrollerHeight: function() {
      return document.documentElement.clientHeight + "px";
    },
    scrollerWidth: function() {
      return document.documentElement.clientWidth + "px";
    }
  }
};
</script>
<style >
/**初始化**/
.contain-write {
  padding-top: 60px;
}
.write-container {
  width: 80%;
  height: calc(100% - 80px);
  margin: 0 auto;
}
.write-container-wrapper {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.write-container-center {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.write-center {
  width: 80%;
  height: calc(100% - 80px);
  margin: 80px auto;
}
/** 初始化结束**/
.write-top{
  margin-bottom: 8px;
}

.write-btn{
  float: right;
  margin:8px;
}

.checkBoxDiv{
  display: flex;
  flex-wrap:wrap;
  flex-direction:column ;
  margin:4px;
}
.checkBoxDiv label{
  margin:5px;
}

</style>