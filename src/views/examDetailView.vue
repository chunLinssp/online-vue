<template>
  <div :style="{height:scrollerHeight,backgroundColor:'#EEEEEE'}" class="contain-exam">
      <div class="viewExamNum" :class="[hideFlag?'toHide':'']">
          <div class="viewExamNum-container">
            <div class="viewExamNum-top">
            </div>
            <div class="viewExamNum-center" ref="numFather" v-if="questionType == 1">
                <div v-for="(item,index) in MutilQuestions" :key="index" :class="[(((index==activeNum)||(Mutil[index].answer!=='-1')))?'FiveExamA':'']" 
                     @click="chooseSubject(index)">
                    <a >{{index + 1}}</a>
                </div>
            </div>
            
            <div class="viewExamNum-center" ref="numFather" v-if="questionType == 2">
                <div v-for="(item,index) in FullQuestions" :key="index" :class="[(((index==activeNum)||(Full[index].answer!=='')) )?'FiveExamA':'']" 
                     @click="chooseSubject(index)">
                    <a >{{index + 1}}</a>
                </div>
            </div>
            
            <div class="viewExamNum-center" ref="numFather" v-if="questionType == 3">
                <div v-for="(item,index) in JudgeQuestions" :key="index" :class="[((index==activeNum) )?'FiveExamA':'']" 
                     @click="chooseSubject(index)">
                    <a >{{index + 1}}</a>
                </div>
            </div>
            
          </div>
      </div>
      <div class="viewExamTime" :class="[hideFlag?'changeStyle':'']">
        <el-switch
            v-model="hideFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="float:left;margin-top: 15px;"
            >
        </el-switch>
        <div class="timeArea"  >
            <div class="timeArea-left">
                <span>
                    <i class="v-icon-custom icon-icon-test naozhong">{{minute}}:{{second}}</i>
                </span> 
             </div>
             <div class="timeArea-right">
                <el-button type="warning" @click="backFun()">返回</el-button>
             </div>
        </div>
      </div>
      <div class="viewExamContent" :class="[hideFlag?'changeStyle':'']">
        <template v-if="questionType == 1">
            <div class="dati-center">
                <div  v-for="(item,index) in MutilQuestions" :key="index">
                    <div v-if="index==activeNum" >
                        <span>{{item.question}}</span>
                        <div class="daan-center">
                            <el-radio v-model="Mutil[index].answer" label="A">{{item.answerA}}</el-radio><br>
                            <el-radio v-model="Mutil[index].answer" label="B">{{item.answerB}}</el-radio><br>
                            <el-radio v-model="Mutil[index].answer" label="C">{{item.answerC}}</el-radio><br>
                            <el-radio v-model="Mutil[index].answer" label="D">{{item.answerD}}</el-radio>
                        </div>
                        <div class="fun-btn">
                            <el-button type="primary" v-if="lastBtnFlag" icon="el-icon-arrow-left"  @click="lastQuestion()">上一题</el-button>
                            <el-button type="primary"  v-if="nextBtnFlag"  @click="nextQuestion()">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                            <el-button type="primary"  v-if="finishBtnFlag"  @click="finishQuestion()">交卷<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
         <template v-if="questionType == 2">
            <div class="dati-center">
                <div  v-for="(item,index) in FullQuestions" :key="index" >
                    <div v-if="index==activeNum">
                        <span>{{item.question}}</span>
                        <div class="daan-center">
                            <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                clearable>
                            </el-input>
                        </div>
                        <div class="fun-btn">
                            <el-button type="primary"  v-if="lastBtnFlag" icon="el-icon-arrow-left" @click="lastQuestion()">上一题</el-button>
                            <el-button type="primary"  v-if="nextBtnFlag" @click="nextQuestion()">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                            <el-button type="primary"  v-if="finishBtnFlag"  @click="finishFullQuestion()">交卷<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
             <template v-if="questionType == 3">
            <div class="dati-center">
                <div v-for="(item,index) in JudgeQuestions" :key="index">
                    <div v-if="index==activeNum">
                        <span>{{item.question}}</span>
                        <div class="daan-center">
                            <el-radio v-model="Judge[index].answer" label="T">True</el-radio><br>
                            <el-radio v-model="Judge[index].answer" label="F">False</el-radio><br>
                        </div>
                        <div class="fun-btn">
                            <el-button type="primary" v-if="lastBtnFlag" icon="el-icon-arrow-left" @click="lastQuestion()">上一题</el-button>
                            <el-button type="primary"  v-if="nextBtnFlag" @click="nextQuestion()">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                            <el-button type="primary"  v-if="finishBtnFlag"  @click="finishJudgeQuestion()">交卷<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </template>

      </div>
  </div>
</template>

<script>
import {getExamView,getDetailedExam,getExamDetail} from '@/api/examView'
export default {
  data () {
     return {
        hideFlag: false,
        activeNum:0,
        numActice:[],
        minutes:1,
        seconds:0,
        Mutil:[],
        Full:[],
        Judge:[],
        questionType:3,
        JUDGE:'1',
        currentQuestion:1,
        MutilQuestions:[],
        JudgeQuestions:[],
        FullQuestions:[],
        AllQuestions:[],
        ExamItemNumber:0,
        nextBtnFlag:true,
        lastBtnFlag:false,
        finishBtnFlag:false,
        realChoose:0,
        paperId:''
      };
  },
  created(){
       this.getExamData();
       this.initTime();
  },
  computed: {
    scrollerHeight: function() {
        return (document.documentElement.clientHeight) + 'px';
    },
    second:function() {
          return this.num(this.seconds);
      },
    minute:function() {
        return this.num(this.minutes);
    },
  },
  methods: {
      finishFullQuestion() {
        let unFinish = [];  
        let that = this;
        for(var i = 0;i<this.Mutil.length;i++) {
            if(this.Mutil[i].answer === '') {
                unFinish.push(i+1);
            }
        }
        let right = 11;
         if(unFinish.length !== 0) {
            this.$confirm('问题'+unFinish+'题目,还未做完，是否确定交卷?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.FullQuestions.length}})
                 }).catch(() => {
                    ////
                });;
         }else {
             that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.FullQuestions.length}})
         }
      },
      finishJudgeQuestion(){
        let unFinish = [];
        let that = this;
        for(var i = 0;i<this.Judge.length;i++) {
            if(this.Judge[i].answer === '-1') {
                unFinish.push(i+1);
            }
        }
        let right = that.JudgeCheck();
        if(unFinish.length !== 0) {
            this.$confirm('问题'+unFinish+'题目,还未做完，是否确定交卷?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.JudgeQuestions.length}});
            }).catch(() => {
                    ////
                });;;
        }else {
            that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.JudgeQuestions.length}})
        }
      },
      finishQuestion() {
        let unFinish = [];
        let that = this;
        for(var i = 0;i<this.Mutil.length;i++) {
            if(this.Mutil[i].answer === '-1') {
                unFinish.push(i+1);
            }
        }
        let right = that.MutilCheck();
        if(unFinish.length !== 0) {
            this.$confirm('问题'+unFinish+'题目,还未做完，是否确定交卷?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.MutilQuestions.length}});
            }).catch(() => {
                    ////
                });;;
        }else {
            that.$router.push({path:'/finishExam',query:{questionType:that.questionType,paperId:that.paperId,right:right,totalExamNum:that.MutilQuestions.length}})
        }
        console.log(this.Mutil);
      },
      MutilCheck() {
        let right = 0;
        for(var i =0;i<this.MutilQuestions.length;i++) {
            if(this.MutilQuestions[i].rightAnswer === this.Mutil[i].answer) {
                right++;
            }
        }
        return right;
      },
      JudgeCheck() {
        let right = 0;
        console.log(this.Judge);
        for(var i =0;i<this.JudgeQuestions.length;i++) {
            console.log(this.JudgeQuestions[i].answer);
            console.log(this.Judge[i].answer);
            if(this.JudgeQuestions[i].answer === this.Judge[i].answer) {
                right++;
            }
        }
        return right;
      },
      initTime() {
          this.minutes = this.$route.query.totolTime;
      },
      backFun() {
        this.$confirm('还未试卷作答，是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
           this.$router.push('/examView');
        }).catch(() => {
            ////
        });
      },
      getExamData() {
        let that = this;
        this.questionType = this.$route.query.questionType;
        this.paperId = this.$route.query.paperId;
        let data = {
            questionType:this.$route.query.questionType,
            paperId:this.$route.query.paperId
         };
        getDetailedExam(data).then(res=>{
            that.questionsCategory(res);
        }) 
      },
      questionsCategory(res) {
        console.log(res);
        if(this.questionType === '0') {
            this.AllQuestions = res.data;
            this.InitActiveNum(this.AllQuestions);
        }
        if(this.questionType === '1') {
            this.MutilQuestions = res.data;
             this.InitActiveNum(this.MutilQuestions);
        }
        if(this.questionType === '2') {
            this.FullQuestions = res.data;
             this.InitActiveNum(this.FullQuestions);
        }
        if(this.questionType === '3') {
            this.JudgeQuestions = res.data;
             this.InitActiveNum(this.JudgeQuestions);
        }
      },
      InitActiveNum(data) {
        this.numActice = [];
        this.ExamItemNumber = data.length;
        if(this.questionType === '1') {
            for(var i =0;i<data.length;i++) {
                var map = {num:i+1,answer:'-1'};
                this.Mutil.push(map);          
            }
        }else if(this.questionType === '2'){
             for(var i =0;i<data.length;i++) {
                var map = {num:i+1,answer:''};
                this.Full.push(map);          
            }
        }else if(this.questionType === '3') {
            for(var i =0;i<data.length;i++) {
                var map = {num:i+1,answer:'-1'};
                this.Judge.push(map);          
            }
        }
      },
      changeDiv() {
        //   alert(11);
      },
      chooseSubject(index) {
        //   var divs = this.$refs.numFather.getElementsByTagName('div');
        //   console.log(divs[index]);
        this.activeNum = index;
      },
      num(n) {
          if(this.minutes == 0 && this.seconds ===2 ) {
            this.$message.warning('warning');
          }
          if(this.minutes == 0 && this.seconds ===0) {
              this.$message.warning('over');
          }
          return n < 10?'0'+n :''+n;
      },
      timerTask() {
          let that = this;
          let time = window.setInterval(function(){
              if(that.seconds === 0 && that.minutes !== 0 ){
                  that.minutes-=1;
                  that.seconds=59;
              }
              else if(that.minutes ===0 && that.seconds ===0) {
                   that.seconds = 0;
                  that.minutes = 0;
                  that.minutes = 0;
                  window.clearInterval(time);
              }else{
                  that.seconds -= 1;
              }
          },1000)
      },
      nextQuestion() {
          if(this.activeNum + 1 < this.ExamItemNumber) {
              this.activeNum += 1;
              this.nextBtnFlag = true;
          } 
      },
      lastQuestion() {
           if(this.activeNum > 0) {
               this.activeNum -= 1;
                this.lastBtnFlag = true;
           } 
      },
  },
  mounted(){
      this.timerTask();
  },
  watch:{
      hideFlag:{
          handler(newValue,oldValue) {
          }
      },
      activeNum:{
          handler(newValue,oldValue) {
          }
      },
      seconds:{
          handler(newValue) {
              this.num(newValue);
          }
      },
      minutes:{
          handler(newValue) {
              this.num(newValue);
          }
      },
      activeNum:{
          handler(newValue) {
            if(newValue === 0) {
                this.lastBtnFlag = false;
                this.nextBtnFlag = true;
                 this.finishBtnFlag = false;
            }else if(newValue === this.ExamItemNumber - 1) {
                this.nextBtnFlag = false;
                this.lastBtnFlag = true;
                this.finishBtnFlag = true;
            }else {
                this.nextBtnFlag = true;
                this.lastBtnFlag = true;
                this.finishBtnFlag = false;
            }
          }
      } 
  },
  
}

</script>
<style>

.contain-exam{
  padding-top: 60px;
}

.viewExamNum{
    width:30%;
    height: 100%;
    float: left;
}

.viewExamContent{
    width: 70%;
    height: calc(80% - 60px);
    background-color: #ffffff;
    float: right;
}

.viewExamTime{
    width: 70%;
    height: 20%;
    float: right;
    background-color: #ffffff;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}

 
.viewExamNum-container{
    height: 95%;
    margin: 20px;
    background-color: #ffffff;
}

.viewExamNum-top{
    width: 100%;
    height: 120px;
    margin-bottom: 8px;
}

.viewExamNum-center{
    width: 100%;
    height: calc(100% - 128px);
    display: flex;
    flex-wrap: wrap;
    overflow:auto;
}
.viewExamNum-center div{
    width:50px;
    height: 50px;
    margin:8px;
    text-align: center;
    line-height: 46px;
    border:1px solid #eeeeee;
}

 


.viewExamNum-center div:hover{
    cursor: pointer;
}

.toHide{
    display: none;
}

.changeStyle{
    width: 100%;
}



.activeExamA{
    border:1px solid #eeeeee;
}
.activeExamABorder{
   border:1px solid mediumseagreen;
}

.FiveExamA{
    background-color: mediumseagreen;
}

.timeArea{
    padding-top: 74px;
    height:60px;
    width: 100%;
    height: calc(100% - 74px);
}

.timeArea button{
    float:right;
    margin-top: 24px;
}

.timeArea-left{
    width: 40%;
    height:100%;
    float: left;
}

.timeArea-right{
    width: 40%;
    height:100%;
    float: right;
}

.naozhong{
    font-size: 60px;
}

.dati-center{
    width: 60%;
    height: 80%;
    margin:60px auto;
}

.daan-center{
    margin-top: 36px;
}

.dati-center div:nth-child{
    width: 80%;
    height: 80%;
    margin:60px auto;
}

.daan-center label{
    
    margin:19px;

}

.fun-btn{
    margin-top: 8px;
    float:right;
}
/* .viewExamNum-center div:nth-child(1){
   border:1px solid mediumseagreen;
} */

</style>