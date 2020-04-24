<template>
  <div class="myfooter">
    <div class="footer-container">
       <div class="footer-left">
          项目介绍
          在线考试系统是一个在线测试学习系统，并用于辅助课程教学和学生学习。
      </div>
      <div class="footer-center">
          联系我
          <br>
          如有问题请发邮件到 934883425@qq.com
      </div>
      <div class="footer-right">
        服务器时间:
        <br>
        {{date | formatDate}}
      </div>
    </div>
  </div>
</template>

<script>
import {formatTimeToStr} from '@/utils/date.js';
export default {
  data () {
    return {
      date:new Date()
    }
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  filters: {
   formatDate: function(time) {
    if(time!=null&&time!="")
    {
      var date = new Date(time);
      return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
    }else{
      return "";
    }
   }
  }
}
 
</script>
<style>
.myfooter{
    width: 100%;
    height: 150px;
    background-color: black;
    text-align: center;
    line-height: 50px;
   
}

.footer-container{
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  color: white;
}


.footer-left{
  width: 33%;
  height: 100%;
  text-align: left;
}


.footer-center{
  width: 33%;
  height: 100%;
}


.footer-right{
  width: 33%;
  height: 100%;
}


</style>