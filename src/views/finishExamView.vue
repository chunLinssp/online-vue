<template>
    <div :style="{height:scrollerHeight,backgroundColor:'#EEEEEE'}" class="contain-finish">
         <div class="finish-container">
             <div class="finish-container-wrapper">
                 <div class="finish-container-center">
                     <div class="finish-center">
                         <el-progress type="circle" :percentage="percentage" :status="status" style="position:absolute"></el-progress>
                        <span style=" margin-left: 134px;margin-top:30px ">
                            一共{{totalNum}}道题目，您做对了{{right}}道题！！！
                        </span>
                     </div>
                 </div>
             </div>
         </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        percentage:0,
        status:'',
        right:0,
        total:0
    };
  },
  computed: {
    scrollerHeight: function() {
      return (document.documentElement.clientHeight ) + 'px';
    },
    scrollerWidth: function() {
        return (document.documentElement.clientWidth) + 'px';
    }  
  },
  created() {
      let totalNum = this.$route.query.totalExamNum;
      let right = this.$route.query.right;
      this.right = right;
      this.totalNum = totalNum;
      let percentage = right / totalNum * 100;
      console.log(percentage);
      this.percentage = percentage;
      if(percentage > 80) {
          this.status = 'success';
      }else if (percentage > 60) {
          this.status = 'warning';
      }else {
          this.status = 'exception';
      }
    }

}

</script>
<style>

/**初始化**/
.contain-finish{
  padding-top: 60px;
}
.finish-container{
    width:80%;
    height: calc(100% - 80px);
    margin:0 auto;
}
.finish-container-wrapper{
    width:80%;
    height: 100%;
    margin:0 auto;
}
.finish-container-center{
    width:80%;
    height: 100%;
    margin:0 auto;
}
.finish-center{
    width:80%;
    height: calc(100% - 80px);
    margin:80px auto;
    background-color: #ffffff
}
/** 初始化结束**/

.finish-center span{
    line-height: 128px;
}
</style>