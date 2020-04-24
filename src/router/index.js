import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {getToken} from '@/request/token'

Vue.use(Router)
 
const router =  new Router({
  routes: [
    {
       path:'',
       component: () =>import('@/Home'),
       children:[
         {
          path:'/',
          component: () =>import('@/views/index')
         },
         {
           path:'/doTest',
           component: () =>import('@/views/testView')
         },
         {
           path:'/examView',
           component: () =>import('@/views/examView')
         },
         {
            path:'/examDetailView',
            component: () =>import('@/views/examDetailView')
         },
         {
            path:'/finishExam',
            component: () =>import('@/views/finishExamView')
         },
         {
           path:'/articleView',
           component: () =>import('@/views/articleView')
         },
         {
           path:'/articleDetailView',
           name:'articleDetailView',
           component: () =>import('@/views/articleDetailView')
         },
         {
           path:'/articleWrite',
           component: () =>import('@/views/articleWriteView'),
           meta:{
             requireLogin:true
           }
         }
       ]
    },
    { 
      path: '/admin/login',
      component: () => import ('@/views/login')
    }
  ]
})

router.beforeEach((to,from,next) => {
  
  if(getToken()) {
    if(to.path === '/admin/login') {
      // next({ path: '/'});
      next();
    }else {
      next();
    }
  }else {
    if(to.meta.requireLogin) {
        next( {path:'/admin/login'} )
        console.log(to.fullPath);
    }else {
      next();
    }
  }
})


export default router;


