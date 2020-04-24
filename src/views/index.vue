<template>
  <div>
    <el-container>
      <el-main class="IndexMain">
        <div :style="{height:scrollerHeight,width:'100%',backgroundImage:'url('+img+')', backgroundRepeat : 'no-repeat',backgroundSize:'100%'}" class="indexBackground">
        </div>
        <div class="mydescribe">
          <div class="functionCenter">
            <div class="functionTop">
              <h1>功能特性</h1>
            </div>
            <div class="Fundetailed">
              <div class="boxOne">
                <div>
                  <i class="v-icon-custom icon-gongneng-kuai"></i>
                </div>
                <div>
                  题库
                  <br>
                  适合教学使用的题目，合理的题目分类
                </div>
              </div>
              <div class="boxTwo">
                <div>
                   <i class="v-icon-custom icon-GitHub"></i>
                </div>
                 <div>
                  考试
                  <br>
                  即使是正规的教学考试，也能轻松应对，准确评判
                </div>
              </div>
              <div class="boxThree">
                <div>
                   <i class="v-icon-custom icon-diannao"></i>
                </div>
                 <div>
                  社区
                  <br>
                  在这里同学可以分享自己的学习体验，解答疑惑
                </div>
              </div>
              <div class="boxFour">
                <div>
                   <i class="v-icon-custom icon-shequ"></i>
                </div>
                <div>
                  技术
                  <br>
                  多样化判题技术，灵活选择判题模式，准确的同时也能近人情
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img:require('@/assets/index6.jpg')
    };
  },
methods:{
   test() {
   }
},
computed: {
  scrollerHeight: function() {
    return (document.documentElement.clientHeight) + 'px';
  },
  scrollerWidth: function() {
    return (document.documentElement.clientWidth) + 'px';
  }
}

}

</script>
<style>
.IndexMain{
  position: relative;
  padding: 0px;
}

.IndexStyle{
}

.functionTop{
  width: 100%;
  height: 53px;
}

.mydescribe{
  width: 100%;
  height: 390px;
  margin-top:50px;
  position: relative;
}

.indexBackground{
   
}

.functionCenter{
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

.functionCenter h1{
  text-align: center;
  font-size: 40px;
}

.Fundetailed{
  width: 100%;
  height: 337px;
  display: flex;
  text-align: center;
}

.boxOne{
  width:25%;
}

.boxOne div{
  padding-top: 40px;
}


.Fundetailed i{
  font-size:125px;
}
.boxTwo{
  width:25%;
}

.boxTwo div{
  padding-top: 40px;
}
.boxThree{
  width:25%;
}

.boxThree div{
  padding-top: 40px;
}
.boxFour{
  width:25%;
}
.boxFour div{
  padding-top: 40px;
}

</style>