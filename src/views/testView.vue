<template>
  <div :style="{height:scrollerHeight}" class="contain-test">
    <div class="breadStyle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/doTest' }"><span style="cursor:pointer">在线测试</span></el-breadcrumb-item>
      </el-breadcrumb>      
    </div>
    <div class="test-center-wrapper">
          
    </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
  computed:{
      scrollerHeight: function() {
      return (document.documentElement.clientHeight) + 'px';
    }
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}

</script>
<style>
.contain-test{
  padding-top: 60px;
}

.test-center-wrapper{
  width: 80%;
  height: 80%;
  margin: 0 auto;
  
}

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

.pageFooter{
  width:80%;
  margin:0 auto;
  display: block;
}

.pageFooter div{
  position: relative;
  margin-top: 10px;
}

.Mytable{
  width:80%;
  height: auto;
}


</style>