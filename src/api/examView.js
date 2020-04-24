import request from '@/request'

export function getExamView(data,page) {
    return request({
        url: '/system/examView',
        method:'get',
        params:{
            source:data.name,
            pageNum:page.pageNum,
            pageSize:page.pageSize,
            questionType:data.questionType
        }
    })
}

/**
 * 分类查询Api 
 */
export function getExamDetail(type) {
    return request({
        url: '/system/typeDetailedExam',
        method:'get',
        params:{
            type:type
        }
    })
}


/**
 * 答题api 
 */
export function getDetailedExam(data) {
    return request({
        url: '/system/detailedExam',
        method:'get',
        params:{
            paperId:data.paperId,
            questionType:data.questionType
        }
    })
}




