const http_service = require('./http')
const Ctrip = require('../models/ctrip')
const utils = require('./utils')
const define = require('./../config/define')

const getQueryList = async(list, pageindex) => {

    let url = define.flighthotel_query_list_url.replace('{pageindex}', pageindex);

    let query_list = [];
    try {
        query_list = await http_service.getQueryList(url)
    } catch (e) {
        console.log(e)
        return [];
    }

    if (query_list.length > 0) {
        //获取房屋列表地址
        list = list.concat(query_list);
        return getQueryList(list, pageindex + 1);
    } else {
        return list;
    }
}

module.exports.getFlightHotelQueryList = async() => {

    let list = await getQueryList([], 1);

    return list;
}

module.exports.getFlightHotelDetail = async(ctrip) => {

    // let detail;
    // try {
    //     detail = await http_service.getDetailInfo(room.id, true);
    // } catch (e) {
    //     throw new Error(e)
    // }

    // if (!detail.toString()) {
    //     throw new Error()
    // }

    //保存数据
    return await Ctrip.Add({
        type: ctrip.type === 'flighthotel' ? '自由行' : '跟团游',
        code: ctrip.code,
        name: ctrip.word,
        price: parseInt(ctrip.price),
        commentScore: parseFloat(ctrip.commentScore),
        commentCount: parseInt(ctrip.commentCount),
        sales: parseInt(ctrip.sales),
        isHot: ctrip.isHot,
        create_time: new Date().getTime()
    })
}