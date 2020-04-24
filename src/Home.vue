<template>
  <div class="home">
    <MyHeader class="myHeader"></MyHeader>
    <router-view />      
     <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from '@/components/common/BaseFooter'
import MyHeader from '@/components/common/BaseHeader'

export default {
  data () {
    return {
    };
  },

  components: {
      'MyFooter':MyFooter,
      'MyHeader':MyHeader
  },

 
}

</script>
<style>

header{
  margin:0;
  padding: 0;
}

.myHeader{
  z-index: 99;
}

.home{
}

</style>