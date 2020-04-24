import request from '@/request'

export function getArticleView(page) {
    console.log('***************' + page)
    return request({
        url:'/system/article',
        method:'get',
        params:{
            pageNum:page.pageNum,
            pageSize:page.pageSize,
            orderByColumn:page.orderByColumn,
            isAsc:page.isAsc
        }
    })
}

export function getArticleViewWithParams(page,data) {
    console.log('***************' + page)
    return request({
        url:'/system/article',
        method:'get',
        params:{
            pageNum:page.pageNum,
            pageSize:page.pageSize,
            orderByColumn:page.orderByColumn,
            isAsc:page.isAsc,
            categoryId: data.categoryId,
            id:data.id
        }
    })
}


export function getArticleCategory() {
    return request({
        url:'/system/articleCategoryView',
        method:'get'
    })
}

export function getArticleTag() {
    return request({
        url:'/system/articleTagView',
        method:'get'
    })
}


export function getArticleByUid(uid) {
    return request({
        url:'/system/UserArticleView',
        method:'get',
        params:{
            id:uid
        }
    })
}

/**
 * 通过tag_id 查询 
 */
export function getArticleAllList(page,tagId) {
    return request({
        url:'/system/ArticleTagView',
        method:'get',
        params:{
            pageNum:page.pageNum,
            pageSize:page.pageSize,
            orderByColumn:page.orderByColumn,
            isAsc:page.isAsc,
            tagId:tagId
        }
    })
}


export function saveArticle(formdata) {
    return request({
        url:'/system/saveArticle',
        method:'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data:formdata
    })
}



/**
 * 上传文章
 */
export function saveArticleContent(article) {
    return request({
        url:'/system/saveArticleContent',
        method:'post',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data:article
    })
}





















