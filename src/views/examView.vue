<template>
  <div :style="{height:scrollerHeight}" class="contain-test">
     <div class="breadStyle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/doTest' }"><span style="cursor:pointer">试题中心</span></el-breadcrumb-item>
      </el-breadcrumb>      
    </div>
    <div class="center-wrapper">
        <div class="center-container">
            <div class="exam-wrapper-center">
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="所有题型" name="first"></el-tab-pane>
                    <el-tab-pane label="选择题型" name="second"></el-tab-pane>
                    <el-tab-pane label="填空题型" name="third"></el-tab-pane>
                    <el-tab-pane label="判断题型" name="fourth"></el-tab-pane>
                 </el-tabs>
            </div>
            <div class="exam-wrapper-center">
                <el-card class="box-card" v-for="(item,index) in cardData" :key="index">
                <div slot="header" class="clearfix">
                  难度系数
                    <span v-for="(it,i) in item.level" :key="i">
                        <span class="v-icon-custom icon-icon-"></span>
                    </span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="startExam(item.totalTime,item.paperId,item.totalTime)">开始答卷</el-button>
                </div>
                <div >
                    <div class="top-view">
                        <span>
                            {{item.source}}
                        </span>
                    </div>
                    <el-divider></el-divider>
                    <div class="bottom-view">
                        <i class="v-icon-custom icon-4leixing"></i>
                        <span v-if="activeName === 'first'">
                           综合题
                        </span>
                        <span v-if="activeName === 'second'">
                           选择题
                        </span>
                        <span v-if="activeName === 'third'">
                           填空题
                        </span>
                         <span v-if="activeName === 'fourth'">
                           判断题
                        </span>
                    </div>
                </div>
                </el-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getExamView,getDetailedExam,getExamDetail} from '@/api/examView'

export default {
  data () {
    return {
         activeName: 'first',
         page:{
           pageNum:1,
           pageSize:5
         },
         subject:'',
         cardData:[],
         JUDGE_EXAM_CATEGORY:3,
         FULL_EXAM_CATEGORY:2,
         MULTI_EXAM_CATEGORY:1,
         ALL_EXAM_CATEGORY:0,
         tabIndex:1
    };
  },

  computed: {
    scrollerHeight: function() {
      return (document.documentElement.clientHeight) + 'px';
    }
  },

  methods: {
       handleClick(tab, event) {
        // console.log(tab, event);
        let index = tab.$vnode.componentInstance.index;
        console.log(index);
        this.tabIndex = tab.$vnode.componentInstance.index;
        switch(index){
          case '1':{
            let that = this;
            let data = {
              name : this.subject,
              questionType:this.MULTI_EXAM_CATEGORY
            }
            this.getAllExamView(data);
             break;
          }
          case '2':{
            let that = this;
            let data = {
              name : this.subject,
              questionType:this.FULL_EXAM_CATEGORY
            }
            this.getAllExamView(data);
            break;
          }
          case '3':{
            let that = this;
            let data = {
              name : this.subject,
              questionType:this.JUDGE_EXAM_CATEGORY
            }
            this.getAllExamView(data);
            break;
          }
          case '0':{
            let that = this;
            let data = {
              name : this.subject,
              questionType:this.ALL_EXAM_CATEGORY
            }
            this.getAllExamView(data);
            break;
          }
        }
      },
      startExam(totolTime,paperId,time) {
        let that = this;
        let questionType = this.tabIndex;
        let data = {
          questionType:questionType,
          paperId:paperId
        }
        that.$router.push({path:'/examDetailView',query:{questionType:questionType,paperId:paperId,totolTime:totolTime}});
        // getDetailedExam(data).then(res=>{
        //   console.log(res);
        //   that.$router.push({path:'/examDetailView',query:{questionType:questionType,paperId:paperId}})
        // })
      },
      getExamDetailed(type) {
        getExamDetail(type).then(res =>{
          console.log(res);
        })
      },
      getAllExamView(data) {
        console.log(data);
        let that = this;
        getExamView(data,this.page).then(res =>{
          console.log(res);
          that.cardData = res.data;
        })
      }
  },
  created() {
    let that = this;
    let data = {
      name : this.subject,
      questionType:this.ALL_EXAM_CATEGORY
    }
    this.getAllExamView(data);
  }
}

</script>
<style >
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
.contain-test{
  padding-top: 60px;
}


.center-wrapper{
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

.center-container{
    width: 80%;
    margin:0 auto;
}

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 320px;
    height: 280px;
    margin:8px;
  }

  .bottom-view{
      text-align: right;
  }

  .top-view span{
      font-size: 30px;
      color:mediumblue;
  }

  .exam-wrapper-center{
    display: flex;
  }
 .exam-wrapper-center{
    display: flex;
  }


</style>